import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTrainerDashboardMetrics } from "@/app/actions/trainer";
import TrainerProfileClient from "./TrainerProfileClient";

export const dynamic = "force-dynamic";

export default async function TrainerProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: trainer } = await supabase
    .from("trainers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const fullName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Trainer";
  const metrics = await getTrainerDashboardMetrics(trainer?.id || null, fullName);

  const profile = {
    name: fullName,
    tagline: user.user_metadata?.tagline || "AI Trainer",
    country: user.user_metadata?.country || "Kenya",
    bio: user.user_metadata?.bio || "Passionate AI Trainer helping students build real-world skills.",
    specialities: user.user_metadata?.specialities || ["AI Concepts"],
    hourlyRateKsh: Number(user.user_metadata?.hourly_rate_ksh) || 3000,
    hourlyRateUsd: Number(user.user_metadata?.hourly_rate_usd) || 25,
    sessionsCompleted: metrics.sessionsDone || 0,
    rating: Number(metrics.avgRating) || 0,
  };

  return <TrainerProfileClient initialProfile={profile} />;
}
