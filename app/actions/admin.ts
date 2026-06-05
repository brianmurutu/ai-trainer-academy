"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email";
import { redirect } from "next/navigation";

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

  // Send approval email to trainer (non-blocking — don't fail the action if email fails)
  try {
    await sendApprovalEmail({
      trainerName: app.full_name,
      trainerEmail: app.email,
      message,
    });
  } catch (emailErr) {
    console.error("Approval email failed:", emailErr);
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
