import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TrainerSidebar from "@/components/dashboard/TrainerSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trainer Portal | AI Trainer Academy",
  description: "Manage your bookings, courses, earnings, and payout settings.",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Learner accounts belong in /dashboard
  const role = (user.user_metadata?.role as string) ?? "learner";
  if (role !== "trainer") redirect("/dashboard");

  const fullName: string =
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "Trainer";

  // Check application status from trainer_applications table
  // Falls back to "approved" gracefully if table doesn't exist yet
  let applicationStatus: "pending" | "approved" | "rejected" = "approved";
  try {
    const { data } = await supabase
      .from("trainer_applications")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();
    if (data?.status) {
      applicationStatus = data.status as typeof applicationStatus;
    }
  } catch {
    // Table not yet created — default to approved
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F7FA" }} className="dashboard-layout">
      <TrainerSidebar
        userName={fullName}
        userEmail={user.email ?? ""}
        userInitials={getInitials(fullName)}
        applicationStatus={applicationStatus}
      />
      <main style={{ flex: 1, overflowX: "hidden" }} className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
