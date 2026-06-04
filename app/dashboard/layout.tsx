import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — AI Trainer Academy",
  description: "Track your learning progress, upcoming sessions, and earned certificates.",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extra guard — proxy.ts handles this but belt-and-suspenders here
  if (!user) redirect("/login");

  // Trainer accounts should be in /trainer, not /dashboard
  const role = (user.user_metadata?.role as string) ?? "learner";
  if (role === "trainer") redirect("/trainer");

  const fullName: string =
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "Learner";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F7FA" }}>
      <Sidebar
        userName={fullName}
        userEmail={user.email ?? ""}
        userInitials={getInitials(fullName)}
      />
      <main style={{ flex: 1, overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
