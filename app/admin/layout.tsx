import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Brain, LayoutList, Users, Settings, BookOpen, ChevronRight, GraduationCap, LifeBuoy } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | AI Trainer Academy",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const role = (user.user_metadata?.role as string) ?? "";
  if (role !== "admin") redirect("/login");

  const adminName =
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "Admin";

  // Fetch pending applications count for the notification badge
  let pendingCount = 0;
  let openTicketsCount = 0;
  try {
    const db = createAdminClient();
    const { count: appCount } = await db
      .from("trainer_applications")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending");
    pendingCount = appCount ?? 0;

    // Check for open tickets count
    const { count: ticketCount } = await db
      .from("support_tickets")
      .select("id", { count: "exact", head: true })
      .eq("status", "open");
    openTicketsCount = ticketCount ?? 0;
  } catch {
    pendingCount = 0;
    openTicketsCount = 0;
  }

  const NAV = [
    {
      href: "/admin/applications",
      label: "Applications",
      Icon: LayoutList,
      badge: pendingCount > 0 ? pendingCount : null,
    },
    { href: "/admin/courses", label: "Courses", Icon: BookOpen, badge: null },
    { href: "/admin/trainers", label: "Trainers", Icon: Users, badge: null },
    { href: "/admin/learners", label: "Learners", Icon: GraduationCap, badge: null },
    {
      href: "/admin/tickets",
      label: "Support Tickets",
      Icon: LifeBuoy,
      badge: openTicketsCount > 0 ? openTicketsCount : null,
    },
    { href: "/admin/settings", label: "Settings", Icon: Settings, badge: null },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F2F5" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          background: "var(--navy)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "22px 18px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Brain size={16} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "white",
                  lineHeight: 1.1,
                }}
              >
                AI Trainer
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}
              >
                Admin
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 10px" }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: "rgba(255,255,255,0.22)",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              padding: "4px 8px 10px",
            }}
          >
            Management
          </div>
          {NAV.map(({ href, label, Icon, badge }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 10px",
                borderRadius: 7,
                marginBottom: 2,
                textDecoration: "none",
                color: "rgba(255,255,255,0.55)",
                fontSize: 13,
                transition: "all 0.12s",
                position: "relative",
              }}
            >
              <Icon size={15} />
              <span style={{ flex: 1 }}>{label}</span>

              {/* Notification badge for pending applications */}
              {badge !== null && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 20,
                    background: "#DC2626",
                    color: "white",
                    lineHeight: 1.4,
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                >
                  {badge}
                </span>
              )}

              {badge === null && (
                <ChevronRight
                  size={11}
                  style={{ opacity: 0.3, flexShrink: 0 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Admin user chip */}
        <div
          style={{
            padding: "10px 10px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 7,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--grad-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              {adminName[0]?.toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "white",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {adminName}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Admin
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowX: "hidden" }}>{children}</main>
    </div>
  );
}
