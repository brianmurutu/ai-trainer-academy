"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getValidTrainerToken, createGoogleMeetEvent } from "@/lib/google";

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
      .order("session_date", { ascending: true });

    if (error || !bookings) {
      console.error("[getLearnerSessions] Error fetching bookings:", error?.message);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return bookings.map((b: any) => {
      const [topic, meetingUrl] = b.session_topic?.split(" || ") ?? [b.session_topic, null];
      const topicStr = topic || "";

      const trainerName = b.trainers?.full_name || "Trainer";
      const initials = trainerName.split(" ").map((n: string) => n[0]).slice(0, 2).join("");

      // Date formatting fallback if session_date is not set
      let dateLabel = "TBD";
      let timeLabel = "TBD";
      if (b.session_date) {
        const d = new Date(b.session_date);
        dateLabel = d.toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric" });
        timeLabel = d.toLocaleTimeString("en-KE", { hour: "numeric", minute: "2-digit" });
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
        meetingUrl: meetingUrl || null,
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
        dateLabel = d.toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric" });
        timeLabel = d.toLocaleTimeString("en-KE", { hour: "numeric", minute: "2-digit" });
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
