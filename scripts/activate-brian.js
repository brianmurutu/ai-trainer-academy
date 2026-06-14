const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

if (fs.existsSync(".env.local")) {
  fs.readFileSync(".env.local", "utf8").split("\n").forEach(line => {
    const [key, ...val] = line.split("=");
    if (key && val.length > 0) {
      process.env[key.trim()] = val.join("=").trim();
    }
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log("Looking for application for brian@yagwatech.com...");
  const { data: app, error: appErr } = await supabase
    .from("trainer_applications")
    .select("*")
    .eq("email", "brian@yagwatech.com")
    .single();

  if (appErr || !app) {
    console.error("Application not found:", appErr?.message || "No row returned");
    return;
  }

  console.log("Found application:", app);

  const slug = app.full_name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  console.log(`Upserting trainer profile with slug: ${slug}...`);
  const { error: trainerErr } = await supabase
    .from("trainers")
    .upsert({
      id: app.user_id, // Match auth user ID
      user_id: app.user_id, // Explicitly set user_id to match RLS and relations
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
      featured: true, // Let's feature him so he's prominent
    }, { onConflict: "id" });

  if (trainerErr) {
    console.error("Trainers upsert failed:", trainerErr.message);
    return;
  }

  if (app.status !== "approved") {
    console.log("Updating application status to approved...");
    const { error: updErr } = await supabase
      .from("trainer_applications")
      .update({ status: "approved", reviewed_at: new Date().toISOString() })
      .eq("id", app.id);
    if (updErr) {
      console.error("Failed to update application status:", updErr.message);
    }
  }

  console.log("Trainer profile activated successfully!");
}

run();
