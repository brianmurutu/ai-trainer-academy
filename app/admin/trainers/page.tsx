import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import TrainersClientPage, { type TrainerAccount } from "./TrainersClientPage";

export const metadata: Metadata = { title: "Trainers | Admin" };
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || (user.user_metadata?.role as string) !== "admin") redirect("/login");
}

export default async function AdminTrainersPage() {
  await requireAdmin();
  const db = createAdminClient();

  const { data: trainers } = await db
    .from("trainer_applications")
    .select("id, full_name, email, country, specialities, experience, hourly_rate_ksh, hourly_rate_usd, status, created_at, reviewed_at")
    .eq("status", "approved")
    .order("reviewed_at", { ascending: false });

  const list = (trainers || []) as TrainerAccount[];

  return <TrainersClientPage initialTrainers={list} />;
}
