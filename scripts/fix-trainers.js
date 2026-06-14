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
  const { data: trainers, error } = await supabase
    .from("trainers")
    .select("*");
  
  if (error) {
    console.error("Error fetching trainers:", error);
    return;
  }

  console.log("CURRENT TRAINERS IN DB:");
  console.log(JSON.stringify(trainers, null, 2));

  // If there are trainers where user_id is null, update them
  for (const t of trainers) {
    if (!t.user_id) {
      console.log(`Fixing user_id for trainer ${t.full_name} (${t.id})...`);
      const { error: updError } = await supabase
        .from("trainers")
        .update({ user_id: t.id })
        .eq("id", t.id);
      if (updError) console.error("Error updating:", updError);
    }
  }
}

run();
