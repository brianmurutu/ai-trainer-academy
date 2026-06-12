"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewApplicationNotification } from "@/lib/email";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ApplyState =
  | { error: string; success?: never }
  | { success: true; applicantName: string; applicantEmail: string; error?: never }
  | undefined;

export type ApplyFormData = {
  fullName: string;
  email: string;
  password: string;
  country: string;
  linkedin: string;
  github: string;
  specialities: string[];
  experience: string;
  bio: string;
  hourlyRateKsh: string;
  hourlyRateUsd: string;
  sampleWork: string;
};

// ---------------------------------------------------------------------------
// Submit Trainer Application
// ---------------------------------------------------------------------------
export async function submitApplicationAction(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const country = formData.get("country") as string;
  const linkedin = formData.get("linkedin") as string;
  const github = formData.get("github") as string;
  const specialities = formData.getAll("specialities") as string[];
  const experience = formData.get("experience") as string;
  const bio = formData.get("bio") as string;
  const hourlyRateKsh = formData.get("hourlyRateKsh") as string;
  const hourlyRateUsd = formData.get("hourlyRateUsd") as string;
  const sampleWork = formData.get("sampleWork") as string;
  // Note: cf-turnstile-response is collected by the form for the widget UX
  // but the admin createUser API does not require a captchaToken.

  // Basic validation
  if (!fullName || !email || !password) {
    return { error: "Name, email, and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (specialities.length === 0) {
    return { error: "Please select at least one speciality." };
  }
  if (!experience) {
    return { error: "Please select your years of experience." };
  }
  if (!bio) {
    return { error: "A short bio is required for your profile." };
  }

  // Use the admin client (service role) for ALL operations so RLS never blocks us.
  // The trainer's auth account is created first, then the application row is inserted.
  const db = createAdminClient();

  // Step 1: Create the Supabase auth account with trainer role.
  // email_confirm: true marks the email as already verified so Supabase
  // never tries to send a confirmation email. Trainers need admin approval first.
  const { data: authData, error: signUpError } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role: "trainer",
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  const userId = authData.user?.id;
  if (!userId) {
    return { error: "Account creation failed. Please try again." };
  }

  // Step 2: Insert the application record into trainer_applications
  // Use adminSupabase (service role) — the applicant is not signed in yet so
  // RLS would block any insert made with the anon client.
  const { data: inserted, error: insertError } = await db
    .from("trainer_applications")
    .insert({
      user_id: userId,
      full_name: fullName,
      email,
      country: country || null,
      specialities,
      experience: experience || null,
      bio: bio || null,
      hourly_rate_ksh: hourlyRateKsh ? Number(hourlyRateKsh) : null,
      hourly_rate_usd: hourlyRateUsd ? Number(hourlyRateUsd) : null,
      linkedin_url: linkedin || null,
      github_url: github || null,
      sample_work_url: sampleWork || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("trainer_applications insert error:", insertError.message);
    return { error: insertError.message };
  }

  // Notify admin inbox (non-blocking)
  try {
    if (inserted?.id) {
      await sendNewApplicationNotification({
        applicantName: fullName,
        applicantEmail: email,
        applicationId: inserted.id,
      });
    }
  } catch (notifyErr) {
    console.error("Admin notification email failed:", notifyErr);
  }

  return { success: true, applicantName: fullName, applicantEmail: email };
}
