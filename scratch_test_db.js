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
  // Try querying trainers
  const { data: trainers, error: trainersError } = await supabase
    .from("trainers")
    .select("id, full_name")
    .limit(1);
  console.log("Trainers query result:", { data: trainers, error: trainersError });

  // Try querying support_tickets
  const { data: tickets, error: ticketsError } = await supabase
    .from("support_tickets")
    .select("*")
    .limit(1);
  console.log("Support tickets query result:", { data: tickets, error: ticketsError });
}

run();
