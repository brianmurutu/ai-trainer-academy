"use server";

import { createClient } from "@/lib/supabase/server";
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

  const supabase = await createClient();

  // Step 1: Create the Supabase auth account with trainer role
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "trainer",
      },
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
  const { error: insertError } = await supabase
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
    });

  if (insertError) {
    console.error("trainer_applications insert error:", insertError.message);
  } else {
    // Notify admin inbox (non-blocking)
    try {
      const { data: inserted } = await supabase
        .from("trainer_applications")
        .select("id")
        .eq("user_id", userId)
        .single();
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
  }

  return { success: true, applicantName: fullName, applicantEmail: email };
}
