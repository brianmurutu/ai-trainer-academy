"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  sendApprovalEmail,
  sendRejectionEmail,
  sendSuspensionEmail,
  sendAdminMessageEmail,
  sendDirectUserEmail,
  sendConfirmationResendEmail,
  sendTicketStatusUpdateEmail,
} from "@/lib/email";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


// ---------------------------------------------------------------------------
// Guard — must be admin to call these actions
// ---------------------------------------------------------------------------
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || (user.user_metadata?.role as string) !== "admin") {
    redirect("/login");
  }
  return user;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type Application = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  country: string | null;
  specialities: string[];
  experience: string | null;
  bio: string | null;
  hourly_rate_ksh: number | null;
  hourly_rate_usd: number | null;
  linkedin_url: string | null;
  github_url: string | null;
  sample_work_url: string | null;
  status: "pending" | "approved" | "rejected";
  is_suspended: boolean;
  reviewer_note: string | null;
  reviewed_at: string | null;
  created_at: string;
};

export type AdminActionState =
  | { success: true; message: string; error?: never }
  | { error: string; success?: never }
  | undefined;

// ---------------------------------------------------------------------------
// Fetch applications
// ---------------------------------------------------------------------------
export async function getApplications(status?: string): Promise<Application[]> {
  await requireAdmin();
  const db = createAdminClient();

  let query = db
    .from("trainer_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Application[];
}

// ---------------------------------------------------------------------------
// Fetch single application
// ---------------------------------------------------------------------------
export async function getApplication(id: string): Promise<Application | null> {
  await requireAdmin();
  const db = createAdminClient();

  const { data, error } = await db
    .from("trainer_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Application;
}

// ---------------------------------------------------------------------------
// Approve application
// ---------------------------------------------------------------------------
export async function approveApplication(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const admin = await requireAdmin();
  const id = formData.get("id") as string;
  const message = (formData.get("message") as string) || undefined;

  if (!id) return { error: "Missing application ID" };

  const db = createAdminClient();

  // Fetch the application first to get the trainer's contact info
  const { data: app, error: fetchError } = await db
    .from("trainer_applications")
    .select("full_name, email, status")
    .eq("id", id)
    .single();

  if (fetchError || !app) return { error: "Application not found" };
  if (app.status !== "pending") return { error: "Application is not pending" };

  // Update status in DB
  const { error: updateError } = await db
    .from("trainer_applications")
    .update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
      reviewed_by: admin.id,
      reviewer_note: message ?? null,
    })
    .eq("id", id);

  if (updateError) return { error: updateError.message };

  revalidatePath("/admin/applications");
  revalidatePath("/admin");

  // Initialize Paystack checkout for the activation fee (one-time KSH 1,000)
  let activationUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/login`;
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (secretKey) {
      const reference = `act-${id}-${Date.now()}`;
      const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/paystack/verify?reference=${reference}`;
      
      const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: app.email,
          amount: 100000, // KSH 1,000 in lowest unit (kobo/cents equivalent)
          currency: "KES",
          reference,
          callback_url: callbackUrl,
          metadata: {
            payment_type: "trainer_activation",
            application_id: id,
            amount_ksh: "1000",
          },
        }),
      });
      
      const data = await paystackRes.json();
      if (data.status && data.data?.authorization_url) {
        activationUrl = data.data.authorization_url;
      }
    }
  } catch (err) {
    console.error("Failed to initialize Paystack for trainer activation:", err);
  }

  // Send approval email to trainer
  let emailError: string | null = null;
  try {
    await sendApprovalEmail({
      trainerName: app.full_name,
      trainerEmail: app.email,
      activationUrl,
      message,
    });
  } catch (emailErr) {
    const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
    console.error("Approval email failed:", msg);
    emailError = msg;
  }

  if (emailError) {
    return {
      success: true,
      message: `${app.full_name} approved ✓ — but the notification email FAILED: ${emailError}. Check your Resend domain verification.`,
    };
  }

  return { success: true, message: `${app.full_name} has been approved and notified by email.` };
}

// ---------------------------------------------------------------------------
// Reject application
// ---------------------------------------------------------------------------
export async function rejectApplication(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const admin = await requireAdmin();
  const id = formData.get("id") as string;
  const reason = formData.get("reason") as string;

  if (!id) return { error: "Missing application ID" };
  if (!reason?.trim()) return { error: "A rejection reason is required" };

  const db = createAdminClient();

  const { data: app, error: fetchError } = await db
    .from("trainer_applications")
    .select("full_name, email, status")
    .eq("id", id)
    .single();

  if (fetchError || !app) return { error: "Application not found" };
  if (app.status !== "pending") return { error: "Application is not pending" };

  const { error: updateError } = await db
    .from("trainer_applications")
    .update({
      status: "rejected",
      reviewed_at: new Date().toISOString(),
      reviewed_by: admin.id,
      reviewer_note: reason,
    })
    .eq("id", id);

  if (updateError) return { error: updateError.message };

  revalidatePath("/admin/applications");
  revalidatePath("/admin");

  try {
    await sendRejectionEmail({
      trainerName: app.full_name,
      trainerEmail: app.email,
      reason,
    });
  } catch (emailErr) {
    console.error("Rejection email failed:", emailErr);
  }

  return { success: true, message: `${app.full_name} has been notified of the decision.` };
}

// ---------------------------------------------------------------------------
// Suspend a trainer (sets is_suspended = true on the application + trainers table)
// ---------------------------------------------------------------------------
export async function suspendTrainer(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdmin();
  const id = formData.get("id") as string;
  const reason = formData.get("reason") as string;

  if (!id) return { error: "Missing application ID" };
  if (!reason?.trim()) return { error: "A suspension reason is required" };

  const db = createAdminClient();

  const { data: app, error: fetchError } = await db
    .from("trainer_applications")
    .select("full_name, email, user_id, status")
    .eq("id", id)
    .single();

  if (fetchError || !app) return { error: "Application not found" };
  if (app.status !== "approved") return { error: "Only approved trainers can be suspended" };

  // Flag the application
  const { error: appUpdateError } = await db
    .from("trainer_applications")
    .update({ is_suspended: true })
    .eq("id", id);

  if (appUpdateError) return { error: appUpdateError.message };

  // Also hide them from the public trainers directory
  if (app.user_id) {
    await db
      .from("trainers")
      .update({ available: false })
      .eq("user_id", app.user_id);
  }

  revalidatePath("/admin/applications");
  revalidatePath("/admin");
  revalidatePath("/trainers");

  try {
    await sendSuspensionEmail({
      trainerName: app.full_name,
      trainerEmail: app.email,
      reason,
    });
  } catch (emailErr) {
    console.error("Suspension email failed:", emailErr);
  }

  return { success: true, message: `${app.full_name} has been suspended and notified by email.` };
}

// ---------------------------------------------------------------------------
// Unsuspend / reinstate a trainer
// ---------------------------------------------------------------------------
export async function unsuspendTrainer(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdmin();
  const id = formData.get("id") as string;

  if (!id) return { error: "Missing application ID" };

  const db = createAdminClient();

  const { data: app, error: fetchError } = await db
    .from("trainer_applications")
    .select("full_name, email, user_id")
    .eq("id", id)
    .single();

  if (fetchError || !app) return { error: "Application not found" };

  const { error: appUpdateError } = await db
    .from("trainer_applications")
    .update({ is_suspended: false })
    .eq("id", id);

  if (appUpdateError) return { error: appUpdateError.message };

  // Restore their directory listing
  if (app.user_id) {
    await db
      .from("trainers")
      .update({ available: true })
      .eq("user_id", app.user_id);
  }

  revalidatePath("/admin/applications");
  revalidatePath("/admin");
  revalidatePath("/trainers");

  return { success: true, message: `${app.full_name} has been reinstated.` };
}

// ---------------------------------------------------------------------------
// Resend the approval / activation email (for trainers who never got it)
// ---------------------------------------------------------------------------
export async function resendApprovalEmail(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return { error: "Missing application ID" };

  const db = createAdminClient();

  const { data: app, error: fetchError } = await db
    .from("trainer_applications")
    .select("full_name, email, status")
    .eq("id", id)
    .single();

  if (fetchError || !app) return { error: "Application not found" };
  if (app.status !== "approved") return { error: "Can only resend for approved trainers" };

  // Generate a fresh Paystack activation link
  let activationUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-trainer-academy.top"}/login`;
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (secretKey) {
      const reference = `act-${id}-${Date.now()}`;
      const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-trainer-academy.top"}/api/paystack/verify?reference=${reference}`;
      const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          email: app.email,
          amount: 100000,
          currency: "KES",
          reference,
          callback_url: callbackUrl,
          metadata: { payment_type: "trainer_activation", application_id: id, amount_ksh: "1000" },
        }),
      });
      const data = await paystackRes.json();
      if (data.status && data.data?.authorization_url) {
        activationUrl = data.data.authorization_url;
      }
    }
  } catch (err) {
    console.error("Paystack re-init failed:", err);
  }

  try {
    await sendApprovalEmail({
      trainerName: app.full_name,
      trainerEmail: app.email,
      activationUrl,
    });
  } catch (emailErr) {
    const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
    return { error: `Email failed: ${msg}` };
  }

  return { success: true, message: `Approval email resent to ${app.email}.` };
}

// ---------------------------------------------------------------------------
// Admin sends a direct message to any trainer/applicant
// ---------------------------------------------------------------------------
export async function sendAdminMessage(
  _prevState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdmin();
  const id      = formData.get("id") as string;
  const subject = (formData.get("subject") as string)?.trim();
  const body    = (formData.get("body") as string)?.trim();

  if (!id)      return { error: "Missing application ID" };
  if (!subject) return { error: "Subject is required" };
  if (!body)    return { error: "Message body is required" };

  const db = createAdminClient();

  const { data: app, error: fetchError } = await db
    .from("trainer_applications")
    .select("full_name, email")
    .eq("id", id)
    .single();

  if (fetchError || !app) return { error: "Trainer not found" };

  try {
    await sendAdminMessageEmail({
      trainerName: app.full_name,
      trainerEmail: app.email,
      subject,
      body,
    });
  } catch (emailErr) {
    const msg = emailErr instanceof Error ? emailErr.message : String(emailErr);
    return { error: `Failed to send message: ${msg}` };
  }

  return { success: true, message: `Message sent to ${app.full_name} (${app.email}).` };
}

// ---------------------------------------------------------------------------
// Learner Account Management
// ---------------------------------------------------------------------------
export type LearnerAccount = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  lastSignIn: string | null;
  isBanned: boolean;
};

export async function getLearners(): Promise<LearnerAccount[]> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    // 1. Fetch all users from Auth
    const { data: { users }, error: authErr } = await db.auth.admin.listUsers();
    if (authErr) throw authErr;

    // 2. Fetch all trainers to exclude their user IDs
    const { data: trainersList, error: trainerErr } = await db
      .from("trainers")
      .select("user_id");
    
    const trainerUserIds = new Set(
      trainersList?.map(t => t.user_id).filter(Boolean) || []
    );

    // 3. Filter out trainers and admins
    const learners = users
      .filter(u => {
        const isTrainer = u.user_metadata?.role === "trainer" || trainerUserIds.has(u.id);
        const isAdmin = u.user_metadata?.role === "admin" || u.email === "murutubrian@gmail.com";
        return !isTrainer && !isAdmin;
      })
      .map(u => {
        const isBanned = !!u.user_metadata?.is_banned || (!!u.banned_until && new Date(u.banned_until) > new Date());
        return {
          id: u.id,
          email: u.email || "",
          fullName: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "Learner",
          createdAt: u.created_at,
          lastSignIn: u.last_sign_in_at || null,
          isBanned,
        };
      });

    return learners;
  } catch (err) {
    console.error("[getLearners] Error:", err);
    return [];
  }
}

export async function toggleBanLearner(learnerId: string, ban: boolean): Promise<AdminActionState> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    // Ban for 10 years (87600 hours) or lift ban ("none")
    const { error } = await db.auth.admin.updateUserById(learnerId, {
      ban_duration: ban ? "87600h" : "none",
      user_metadata: { is_banned: ban },
    });

    if (error) throw error;

    revalidatePath("/admin/learners");
    return {
      success: true,
      message: ban ? "Learner account suspended successfully." : "Learner account unsuspended successfully.",
    };
  } catch (err: any) {
    console.error("[toggleBanLearner] Error:", err);
    return { error: err.message || "Failed to update learner account status." };
  }
}

// ---------------------------------------------------------------------------
// Support Tickets Administration
// ---------------------------------------------------------------------------

export type AdminTicket = {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: "open" | "resolved" | "closed";
  created_at: string;
  updated_at: string;
  userEmail: string;
  userFullName: string;
};

export async function getAdminTickets(status?: string): Promise<AdminTicket[]> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    let query = db.from("support_tickets").select("*");
    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    query = query.order("created_at", { ascending: false });

    const { data: tickets, error: fetchErr } = await query;
    if (fetchErr) throw fetchErr;

    if (!tickets || tickets.length === 0) return [];

    // Fetch users to map user_id -> email/name
    const { data: { users }, error: authErr } = await db.auth.admin.listUsers();
    const userMap = new Map<string, { email: string; name: string }>();
    if (!authErr && users) {
      users.forEach(u => {
        userMap.set(u.id, {
          email: u.email || "",
          name: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "Learner",
        });
      });
    }

    return tickets.map((t: any) => {
      const userInfo = userMap.get(t.user_id) || { email: "", name: "Unknown User" };
      return {
        ...t,
        userEmail: userInfo.email,
        userFullName: userInfo.name,
      };
    });
  } catch (err) {
    console.error("[getAdminTickets] Error:", err);
    return [];
  }
}

export async function updateTicketStatus(
  ticketId: string,
  status: "open" | "resolved" | "closed",
  resolutionNote?: string
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    const { data: ticket, error: fetchErr } = await db
      .from("support_tickets")
      .select("*")
      .eq("id", ticketId)
      .single();

    if (fetchErr || !ticket) return { error: "Ticket not found." };

    const { error: updateErr } = await db
      .from("support_tickets")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticketId);

    if (updateErr) throw updateErr;

    // Send email to learner
    try {
      const { data: { user }, error: userErr } = await db.auth.admin.getUserById(ticket.user_id);
      if (!userErr && user) {
        await sendTicketStatusUpdateEmail({
          email: user.email || "",
          name: (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Learner",
          ticketSubject: ticket.subject,
          status,
          resolutionNote,
        });
      }
    } catch (emailErr) {
      console.error("[updateTicketStatus] Failed to send status update email:", emailErr);
    }

    revalidatePath("/admin/tickets");
    revalidatePath("/dashboard/support");

    return {
      success: true,
      message: `Support ticket has been marked as ${status} and user notified.`,
    };
  } catch (err: any) {
    console.error("[updateTicketStatus] Error:", err);
    return { error: err.message || "Failed to update ticket status." };
  }
}

// ---------------------------------------------------------------------------
// Edit Details & Auth management
// ---------------------------------------------------------------------------

export async function updateLearnerDetails(
  learnerId: string,
  email: string,
  fullName: string
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    if (!email?.trim() || !fullName?.trim()) {
      return { error: "Email and full name are required." };
    }

    const { error } = await db.auth.admin.updateUserById(learnerId, {
      email: email.trim(),
      user_metadata: { full_name: fullName.trim() },
    });

    if (error) throw error;

    revalidatePath("/admin/learners");
    return {
      success: true,
      message: "Learner details updated successfully in Auth.",
    };
  } catch (err: any) {
    console.error("[updateLearnerDetails] Error:", err);
    return { error: err.message || "Failed to update learner details." };
  }
}

export async function resendConfirmationEmail(
  email: string,
  fullName: string
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    if (!email) return { error: "Email is required." };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const { data, error } = await db.auth.admin.generateLink({
      type: "invite",
      email: email.trim(),
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    });

    if (error) throw error;
    if (!data?.properties?.action_link) {
      throw new Error("Supabase auth did not return a confirmation link.");
    }

    await sendConfirmationResendEmail({
      email: email.trim(),
      name: fullName || "User",
      confirmationLink: data.properties.action_link,
    });

    return {
      success: true,
      message: `Account confirmation link successfully sent to ${email}.`,
    };
  } catch (err: any) {
    console.error("[resendConfirmationEmail] Error:", err);
    return { error: err.message || "Failed to generate and send confirmation link." };
  }
}

export async function sendDirectUserEmailAction(
  email: string,
  fullName: string,
  subject: string,
  body: string,
  userType: "trainer" | "learner"
): Promise<AdminActionState> {
  await requireAdmin();

  try {
    if (!email || !subject || !body) {
      return { error: "Email, subject, and body are required." };
    }

    await sendDirectUserEmail({
      recipientEmail: email,
      recipientName: fullName,
      subject,
      body,
      userType,
    });

    return {
      success: true,
      message: `Email successfully sent to ${fullName} (${email}).`,
    };
  } catch (err: any) {
    console.error("[sendDirectUserEmailAction] Error:", err);
    return { error: err.message || "Failed to send email." };
  }
}

export async function broadcastEmail(
  subject: string,
  body: string,
  userType: "trainer" | "learner"
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    if (!subject?.trim() || !body?.trim()) {
      return { error: "Subject and body are required." };
    }

    let emails: { email: string; name: string }[] = [];

    if (userType === "trainer") {
      const { data: trainers, error: fetchErr } = await db
        .from("trainer_applications")
        .select("email, full_name")
        .eq("status", "approved");
      
      if (fetchErr) throw fetchErr;
      emails = (trainers || []).map(t => ({ email: t.email, name: t.full_name }));
    } else {
      // Get all learners
      const learners = await getLearners();
      emails = learners.map(l => ({ email: l.email, name: l.fullName }));
    }

    if (emails.length === 0) {
      return { error: `No active ${userType} accounts found to email.` };
    }

    let successCount = 0;
    let failCount = 0;

    // Loop through recipients sequentially to respect rate limits
    for (const recipient of emails) {
      try {
        await sendDirectUserEmail({
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          subject,
          body,
          userType,
        });
        successCount++;
        // Minor delay of 100ms to avoid burst limits
        await new Promise(r => setTimeout(r, 100));
      } catch (err) {
        console.error(`[broadcastEmail] Failed to send to ${recipient.email}:`, err);
        failCount++;
      }
    }

    return {
      success: true,
      message: `Broadcast complete! Sent ${successCount} emails successfully.${failCount > 0 ? ` Failed to send to ${failCount} recipients.` : ""}`,
    };
  } catch (err: any) {
    console.error("[broadcastEmail] Error:", err);
    return { error: err.message || "Failed to broadcast email." };
  }
}

export async function updateTrainerDetails(
  trainerId: string,
  email: string,
  fullName: string,
  hourlyRateKsh: number,
  hourlyRateUsd: number
): Promise<AdminActionState> {
  await requireAdmin();
  const db = createAdminClient();

  try {
    if (!email?.trim() || !fullName?.trim()) {
      return { error: "Email and full name are required." };
    }

    // 1. Find the application to get user_id or detail match
    const { data: app, error: fetchErr } = await db
      .from("trainer_applications")
      .select("user_id, id")
      .eq("id", trainerId)
      .single();

    if (fetchErr || !app) {
      return { error: "Trainer application not found." };
    }

    // 2. Update trainer_applications table
    const { error: appUpdErr } = await db
      .from("trainer_applications")
      .update({
        email: email.trim(),
        full_name: fullName.trim(),
        hourly_rate_ksh: hourlyRateKsh,
        hourly_rate_usd: hourlyRateUsd,
      })
      .eq("id", trainerId);

    if (appUpdErr) throw appUpdErr;

    // 3. Update auth metadata & email if user exists
    if (app.user_id) {
      const { error: authErr } = await db.auth.admin.updateUserById(app.user_id, {
        email: email.trim(),
        user_metadata: { full_name: fullName.trim() },
      });
      if (authErr) console.error("[updateTrainerDetails] Auth update failed:", authErr.message);

      // 4. Update trainers directory table
      const { error: dirErr } = await db
        .from("trainers")
        .update({
          full_name: fullName.trim(),
          hourly_rate_ksh: hourlyRateKsh,
          hourly_rate_usd: hourlyRateUsd,
        })
        .eq("user_id", app.user_id);

      if (dirErr) console.error("[updateTrainerDetails] Trainers table update failed:", dirErr.message);
    }

    revalidatePath("/admin/trainers");
    revalidatePath("/admin/applications");
    revalidatePath("/trainers");

    return {
      success: true,
      message: "Trainer details updated successfully.",
    };
  } catch (err: any) {
    console.error("[updateTrainerDetails] Error:", err);
    return { error: err.message || "Failed to update trainer details." };
  }
}


