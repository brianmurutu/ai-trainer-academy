"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getValidTrainerToken, createGoogleMeetEvent } from "@/lib/google";
import { sendSessionBookingConfirmationEmail, sendTrainerBookingNotificationEmail } from "@/lib/email";

export type SessionWithTrainer = {
  id: string;
  topic: string;
  meetingUrl: string | null;
  trainerName: string;
  trainerTitle: string;
  trainerInitials: string;
  trainerColor: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  notes: string | null;
};

export type TrainerBookingMapped = {
  id: string;
  learnerName: string;
  learnerEmail: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  payoutKsh: number;
  meetingUrl: string | null;
};

// Map hex colors for trainer initials
const COLORS = ["#6366F1", "#EC4899", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6"];
function getTrainerColor(name: string): string {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return COLORS[sum % COLORS.length];
}

/**
 * Get all confirmed/upcoming sessions for the currently logged-in learner.
 */
export async function getLearnerSessions(): Promise<SessionWithTrainer[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(`
        id,
        session_topic,
        session_date,
        session_duration_hrs,
        status,
        trainers (
          full_name,
          tagline,
          avatar_url
        )
      `)
      .eq("learner_id", user.id)
      .not("trainer_id", "is", null)
      .order("session_date", { ascending: true });

    if (error || !bookings) {
      console.error("[getLearnerSessions] Error fetching bookings:", error?.message);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return bookings.map((b: any) => {
      const [topic, meetingUrl] = b.session_topic?.split(" || ") ?? [b.session_topic, null];
      const topicStr = topic || "";
      const validMeetingUrl = (meetingUrl && (meetingUrl.startsWith("http://") || meetingUrl.startsWith("https://"))) ? meetingUrl : null;

      const trainerName = b.trainers?.full_name || "Trainer";
      const initials = trainerName.split(" ").map((n: string) => n[0]).slice(0, 2).join("");

      // Date formatting fallback if session_date is not set
      let dateLabel = "TBD";
      let timeLabel = "TBD";
      if (b.session_date) {
        const d = new Date(b.session_date);
        dateLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        timeLabel = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
      } else if (topicStr.includes(" — ")) {
        // Fallback from topic string: Topic — Date Time
        const parts = topicStr.split(" — ")[1]?.split(" ");
        if (parts) {
          dateLabel = parts.slice(0, 3).join(" ");
          timeLabel = parts.slice(3).join(" ");
        }
      }

      return {
        id: b.id,
        topic: topicStr.split(" — ")[0] || "1-on-1 Consultation",
        meetingUrl: validMeetingUrl,
        trainerName,
        trainerTitle: b.trainers?.tagline || "Consultant",
        trainerInitials: initials,
        trainerColor: getTrainerColor(trainerName),
        date: dateLabel,
        time: timeLabel,
        duration: `${b.session_duration_hrs || 1} hour${b.session_duration_hrs !== 1 ? "s" : ""}`,
        status: b.status,
        notes: null
      };
    });
  } catch (err) {
    console.error("[getLearnerSessions] Unexpected error:", err);
    return [];
  }
}

/**
 * Get all incoming bookings (pending + confirmed) for the currently logged-in trainer.
 */
export async function getTrainerBookings(): Promise<TrainerBookingMapped[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // Find the trainer row associated with the logged-in user
    const { data: trainer, error: trainerErr } = await supabase
      .from("trainers")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (trainerErr || !trainer) {
      return [];
    }

    const { data: bookings, error: bookingsErr } = await supabase
      .from("bookings")
      .select("*")
      .eq("trainer_id", trainer.id)
      .order("created_at", { ascending: false });

    if (bookingsErr || !bookings) {
      console.error("[getTrainerBookings] Error fetching bookings:", bookingsErr?.message);
      return [];
    }

    const adminDb = createAdminClient();
    const mapped: TrainerBookingMapped[] = [];

    for (const b of bookings) {
      let learnerName = "Learner";
      let learnerEmail = "learner@example.com";

      if (b.learner_id) {
        try {
          const { data: userData } = await adminDb.auth.admin.getUserById(b.learner_id);
          if (userData?.user) {
            learnerName = userData.user.user_metadata?.full_name || userData.user.email?.split("@")[0] || "Learner";
            learnerEmail = userData.user.email || "learner@example.com";
          }
        } catch (err) {
          console.error("[getTrainerBookings] Failed to fetch learner profile:", err);
        }
      }

      const [topic, meetingUrl] = b.session_topic?.split(" || ") ?? [b.session_topic, null];
      const topicStr = topic || "";

      let dateLabel = "TBD";
      let timeLabel = "TBD";
      if (b.session_date) {
        const d = new Date(b.session_date);
        dateLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        timeLabel = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
      } else if (topicStr.includes(" — ")) {
        const parts = topicStr.split(" — ")[1]?.split(" ");
        if (parts) {
          dateLabel = parts.slice(0, 3).join(" ");
          timeLabel = parts.slice(3).join(" ");
        }
      }

      mapped.push({
        id: b.id,
        learnerName,
        learnerEmail,
        topic: topicStr.split(" — ")[0] || "Consultation Slot",
        date: dateLabel,
        time: timeLabel,
        duration: `${b.session_duration_hrs || 1} hr${b.session_duration_hrs !== 1 ? "s" : ""}`,
        status: b.status,
        payoutKsh: Math.round(Number(b.amount_ksh || 0) * 0.8),
        meetingUrl: meetingUrl || null
      });
    }

    return mapped;
  } catch (err) {
    console.error("[getTrainerBookings] Unexpected error:", err);
    return [];
  }
}

/**
 * Accept a booking slot and assign a Google Meet/Jitsi meeting link.
 */
export async function acceptTrainerBooking(bookingId: string, meetingUrl: string): Promise<{ success: boolean; error?: string; meetingUrl?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const { data: trainer } = await supabase
      .from("trainers")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!trainer) return { success: false, error: "Trainer profile not found" };

    const adminDb = createAdminClient();
    const { data: booking } = await adminDb
      .from("bookings")
      .select("session_topic, trainer_id, session_date, session_duration_hrs, learner_id")
      .eq("id", bookingId)
      .single();

    if (!booking || booking.trainer_id !== trainer.id) {
      return { success: false, error: "Booking not found or access denied" };
    }

    let finalMeetingUrl = meetingUrl;

    // Check if Google Calendar is connected
    const accessToken = await getValidTrainerToken(trainer.id);

    if (accessToken) {
      let learnerEmail = "learner@example.com";
      let learnerName = "Learner";

      if (booking.learner_id) {
        try {
          const { data: userData } = await adminDb.auth.admin.getUserById(booking.learner_id);
          if (userData?.user) {
            learnerName = userData.user.user_metadata?.full_name || userData.user.email?.split("@")[0] || "Learner";
            learnerEmail = userData.user.email || "learner@example.com";
          }
        } catch (err) {
          console.error("[acceptTrainerBooking] Failed to fetch learner profile details:", err);
        }
      }

      const originalTopic = booking.session_topic?.split(" || ")[0] || booking.session_topic || "1-on-1 Session";
      const sessionDate = booking.session_date || new Date().toISOString();
      const durationHrs = booking.session_duration_hrs || 1;

      try {
        finalMeetingUrl = await createGoogleMeetEvent({
          accessToken,
          learnerEmail,
          learnerName,
          topic: originalTopic,
          sessionDate,
          durationHrs,
          bookingId
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (googleErr: any) {
        console.error("[acceptTrainerBooking] Google Meet event generation failed, falling back to Jitsi/manual:", googleErr);
        // Fallback to Jitsi link if Google Meet generation fails
        if (!finalMeetingUrl) {
          finalMeetingUrl = `https://meet.jit.si/ATA-Session-${bookingId}`;
        }
      }
    }

    const originalTopic = booking.session_topic?.split(" || ")[0] || booking.session_topic || "";
    const updatedTopic = `${originalTopic} || ${finalMeetingUrl.trim()}`;

    const { error } = await adminDb
      .from("bookings")
      .update({
        status: "confirmed",
        session_topic: updatedTopic
      })
      .eq("id", bookingId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/trainer/bookings");
    revalidatePath("/dashboard/sessions");
    return { success: true, meetingUrl: finalMeetingUrl };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to accept booking" };
  }
}

/**
 * Decline a booking request.
 */
export async function declineTrainerBooking(bookingId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const { data: trainer } = await supabase
      .from("trainers")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!trainer) return { success: false, error: "Trainer profile not found" };

    const adminDb = createAdminClient();
    const { data: booking } = await adminDb
      .from("bookings")
      .select("trainer_id")
      .eq("id", bookingId)
      .single();

    if (!booking || booking.trainer_id !== trainer.id) {
      return { success: false, error: "Booking not found or access denied" };
    }

    const { error } = await adminDb
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/trainer/bookings");
    revalidatePath("/dashboard/sessions");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to decline booking" };
  }
}

/**
 * Automatically generate a meeting link (Google Meet or Jitsi fallback)
 * and deliver it via email to learner and trainer when a session booking is confirmed.
 */
export async function generateMeetingLinkAndNotify(bookingId: string): Promise<{ success: boolean; error?: string; meetingUrl?: string }> {
  try {
    const adminDb = createAdminClient();

    // 1. Fetch booking details
    const { data: booking, error: bookingErr } = await adminDb
      .from("bookings")
      .select("id, session_topic, trainer_id, session_date, session_duration_hrs, learner_id, course_id")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      console.error(`[generateMeetingLinkAndNotify] Booking ${bookingId} not found:`, bookingErr?.message);
      return { success: false, error: "Booking not found" };
    }

    // If it's a course purchase rating (contains course_id) or trainer_id is null, skip meeting generation
    if (booking.course_id || !booking.trainer_id) {
      return { success: true };
    }

    // 2. Check if a meeting URL is already present in session_topic
    const topicParts = booking.session_topic?.split(" || ") ?? [];
    const originalTopic = topicParts[0] || booking.session_topic || "1-on-1 Consultation";
    const existingMeetingUrl = topicParts[1];

    if (existingMeetingUrl && existingMeetingUrl.startsWith("http")) {
      console.log(`[generateMeetingLinkAndNotify] Meeting URL already exists for booking ${bookingId}: ${existingMeetingUrl}`);
      return { success: true, meetingUrl: existingMeetingUrl };
    }

    // 3. Fetch trainer details
    const { data: trainer, error: trainerErr } = await adminDb
      .from("trainers")
      .select("id, user_id, full_name")
      .eq("id", booking.trainer_id)
      .single();

    if (trainerErr || !trainer) {
      console.error(`[generateMeetingLinkAndNotify] Trainer ${booking.trainer_id} not found:`, trainerErr?.message);
      return { success: false, error: "Trainer not found" };
    }

    // 4. Fetch learner details
    let learnerEmail = "learner@example.com";
    let learnerName = "Learner";
    if (booking.learner_id) {
      try {
        const { data: userData } = await adminDb.auth.admin.getUserById(booking.learner_id);
        if (userData?.user) {
          learnerName = userData.user.user_metadata?.full_name || userData.user.email?.split("@")[0] || "Learner";
          learnerEmail = userData.user.email || "learner@example.com";
        }
      } catch (err) {
        console.error("[generateMeetingLinkAndNotify] Failed to fetch learner profile details:", err);
      }
    }

    // 5. Fetch trainer's user email
    let trainerEmail = "trainer@example.com";
    if (trainer.user_id) {
      try {
        const { data: trainerUserData } = await adminDb.auth.admin.getUserById(trainer.user_id);
        if (trainerUserData?.user) {
          trainerEmail = trainerUserData.user.email || "trainer@example.com";
        }
      } catch (err) {
        console.error("[generateMeetingLinkAndNotify] Failed to fetch trainer user details:", err);
      }
    }

    let finalMeetingUrl = "";

    // 6. Check if Google Calendar is connected
    const accessToken = await getValidTrainerToken(trainer.id);

    if (accessToken) {
      const sessionDate = booking.session_date || new Date().toISOString();
      const durationHrs = booking.session_duration_hrs || 1;

      try {
        finalMeetingUrl = await createGoogleMeetEvent({
          accessToken,
          learnerEmail,
          learnerName,
          topic: originalTopic,
          sessionDate,
          durationHrs,
          bookingId
        });
      } catch (googleErr) {
        console.error("[generateMeetingLinkAndNotify] Google Meet event generation failed, falling back to Jitsi:", googleErr);
      }
    }

    // Fallback to Jitsi if Google Meet URL wasn't generated
    if (!finalMeetingUrl) {
      finalMeetingUrl = `https://meet.jit.si/ATA-Session-${bookingId}`;
    }

    // 7. Update booking with meeting URL
    const updatedTopic = `${originalTopic} || ${finalMeetingUrl.trim()}`;
    const { error: updateErr } = await adminDb
      .from("bookings")
      .update({
        session_topic: updatedTopic
      })
      .eq("id", bookingId);

    if (updateErr) {
      console.error(`[generateMeetingLinkAndNotify] Failed to update booking ${bookingId} with meeting URL:`, updateErr.message);
      return { success: false, error: updateErr.message };
    }

    // 8. Deliver meeting links to learners and trainers via email
    try {
      const formattedDate = booking.session_date
        ? new Date(booking.session_date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
        : "TBD";
      const formattedTime = booking.session_date
        ? new Date(booking.session_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" })
        : "TBD";

      // Send confirmation to Learner
      await sendSessionBookingConfirmationEmail({
        recipientEmail: learnerEmail,
        recipientName: learnerName,
        trainerName: trainer.full_name,
        sessionTopic: originalTopic,
        sessionDate: `${formattedDate} at ${formattedTime}`,
        duration: `${booking.session_duration_hrs || 1} hour${booking.session_duration_hrs !== 1 ? "s" : ""}`,
        meetingUrl: finalMeetingUrl
      });

      // Send notification to Trainer
      await sendTrainerBookingNotificationEmail({
        recipientEmail: trainerEmail,
        trainerName: trainer.full_name,
        learnerName: learnerName,
        learnerEmail: learnerEmail,
        sessionTopic: originalTopic,
        sessionDate: `${formattedDate} at ${formattedTime}`,
        duration: `${booking.session_duration_hrs || 1} hour${booking.session_duration_hrs !== 1 ? "s" : ""}`,
        meetingUrl: finalMeetingUrl
      });
    } catch (emailErr) {
      console.error("[generateMeetingLinkAndNotify] Failed to send email confirmation/notification:", emailErr);
    }

    revalidatePath("/trainer/bookings");
    revalidatePath("/dashboard/sessions");

    return { success: true, meetingUrl: finalMeetingUrl };
  } catch (err: any) {
    console.error("[generateMeetingLinkAndNotify] Unexpected error:", err);
    return { success: false, error: err.message || "Failed to generate meeting link and notify" };
  }
}

/**
 * Send a direct message to a trainer for a given booking.
 */
export async function messageTrainerAction({
  bookingId,
  message,
}: {
  bookingId: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const adminDb = createAdminClient();

    // 1. Fetch booking and verify user is the learner
    const { data: booking, error: bookingErr } = await adminDb
      .from("bookings")
      .select("id, trainer_id, learner_id, session_topic")
      .eq("id", bookingId)
      .single();

    if (bookingErr || !booking) {
      return { success: false, error: "Booking not found" };
    }

    if (booking.learner_id !== user.id) {
      return { success: false, error: "You are not authorized to message this trainer." };
    }

    if (!booking.trainer_id) {
      return { success: false, error: "No trainer assigned to this booking." };
    }

    // 2. Fetch trainer details
    const { data: trainer, error: trainerErr } = await adminDb
      .from("trainers")
      .select("id, user_id, full_name")
      .eq("id", booking.trainer_id)
      .single();

    if (trainerErr || !trainer) {
      return { success: false, error: "Trainer not found" };
    }

    // 3. Fetch trainer's user email
    let trainerEmail = "";
    if (trainer.user_id) {
      const { data: trainerUserData } = await adminDb.auth.admin.getUserById(trainer.user_id);
      if (trainerUserData?.user) {
        trainerEmail = trainerUserData.user.email || "";
      }
    }

    if (!trainerEmail) {
      return { success: false, error: "Trainer email not found." };
    }

    // 4. Send email
    const learnerName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Learner";
    const learnerEmail = user.email || "";
    const sessionTopic = booking.session_topic?.split(" || ")[0] || "1-on-1 Consultation";

    const { sendDirectMessageToTrainer } = await import("@/lib/email");

    await sendDirectMessageToTrainer({
      trainerName: trainer.full_name,
      trainerEmail,
      learnerName,
      learnerEmail,
      subject: `Regarding session: ${sessionTopic}`,
      message,
    });

    return { success: true };
  } catch (err: any) {
    console.error("[messageTrainerAction] Error:", err);
    return { success: false, error: err.message || "Failed to send message." };
  }
}
