"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sendApprovalEmail, sendRejectionEmail, sendSuspensionEmail, sendAdminMessageEmail } from "@/lib/email";
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

  // Initialize Paystack checkout for the activation fee (one-time KSH 2,000)
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
          amount: 200000, // KSH 2,000 in lowest unit (kobo/cents equivalent)
          currency: "KES",
          reference,
          callback_url: callbackUrl,
          metadata: {
            payment_type: "trainer_activation",
            application_id: id,
            amount_ksh: "2000",
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
          amount: 200000,
          currency: "KES",
          reference,
          callback_url: callbackUrl,
          metadata: { payment_type: "trainer_activation", application_id: id, amount_ksh: "2000" },
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
