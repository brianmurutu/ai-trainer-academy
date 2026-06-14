import { createAdminClient } from "./admin";
import { parseTrainerBio, stringifyTrainerBio } from "@/lib/trainer-utils";

/**
 * Copies a trainer's application data into the public `trainers` table
 * to activate their profile and make them visible on the directory.
 * 
 * @param applicationId The ID from trainer_applications table
 * @returns boolean indicating success
 */
export async function activateTrainerProfile(applicationId: string): Promise<boolean> {
  const db = createAdminClient();
  try {
    const { data: app, error: appErr } = await db
      .from("trainer_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (appErr || !app) {
      console.error("[activateTrainerProfile] Application not found:", applicationId, appErr?.message);
      return false;
    }

    const slug = app.full_name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const { error: trainerErr } = await db
      .from("trainers")
      .upsert({
        id: app.user_id, // Match auth user ID
        user_id: app.user_id, // Set user_id explicitly
        full_name: app.full_name,
        slug,
        tagline: app.specialities[0] ? `${app.specialities[0]} Specialist` : "AI Trainer",
        bio: app.bio,
        country: app.country,
        specialities: app.specialities,
        hourly_rate_ksh: app.hourly_rate_ksh || 2000,
        hourly_rate_usd: app.hourly_rate_usd || 15,
        linkedin_url: app.linkedin_url,
        github_url: app.github_url,
        available: true,
        rating: 5.0,
        review_count: 0,
        sessions_completed: 0,
        featured: false,
      }, { onConflict: "id" });

    if (trainerErr) {
      console.error("[activateTrainerProfile] Trainers upsert failed:", trainerErr.message);
      return false;
    }

    // Update the application status itself to be sure (in case it was paid directly)
    if (app.status !== "approved") {
      await db
        .from("trainer_applications")
        .update({ status: "approved", reviewed_at: new Date().toISOString() })
        .eq("id", applicationId);
    }

    console.log(`[activateTrainerProfile] Successfully activated trainer profile for ${app.full_name}`);
    return true;
  } catch (err) {
    console.error("[activateTrainerProfile] Unexpected error:", err);
    return false;
  }
}

/**
 * Unlocks the video introduction feature for a trainer.
 * Fetches their profile, parses their bio, sets videoUnlocked to true, and saves.
 */
export async function unlockVideoIntro(trainerId: string): Promise<boolean> {
  const db = createAdminClient();
  try {
    const { data: trainer, error: fetchErr } = await db
      .from("trainers")
      .select("bio")
      .eq("id", trainerId)
      .single();

    if (fetchErr || !trainer) {
      console.error("[unlockVideoIntro] Trainer not found:", trainerId, fetchErr?.message);
      return false;
    }

    const { bio: cleanBio, videoUrl } = parseTrainerBio(trainer.bio);
    const newBio = stringifyTrainerBio(cleanBio, videoUrl, true);

    const { error: updateErr } = await db
      .from("trainers")
      .update({ bio: newBio })
      .eq("id", trainerId);

    if (updateErr) {
      console.error("[unlockVideoIntro] Failed to update bio:", updateErr.message);
      return false;
    }

    console.log(`[unlockVideoIntro] Successfully unlocked video intro for trainer ${trainerId}`);
    return true;
  } catch (err) {
    console.error("[unlockVideoIntro] Unexpected error:", err);
    return false;
  }
}

