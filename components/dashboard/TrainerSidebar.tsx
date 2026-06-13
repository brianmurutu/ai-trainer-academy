"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  DollarSign,
  UserCircle,
  Settings,
  LogOut,
  ChevronRight,
  Brain,
  Users,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type TrainerSidebarProps = {
  userName: string;
  userEmail: string;
  userInitials: string;
  applicationStatus?: "pending" | "approved" | "rejected";
};

const NAV_ITEMS = [
  { href: "/trainer", label: "Overview", Icon: LayoutDashboard },
  { href: "/trainer/bookings", label: "Bookings", Icon: CalendarDays },
  { href: "/trainer/courses", label: "My Courses", Icon: BookOpen },
  { href: "/trainer/learners", label: "Learners", Icon: Users },
  { href: "/trainer/earnings", label: "Earnings & Payouts", Icon: DollarSign },
  { href: "/trainer/profile", label: "Public Profile", Icon: UserCircle },
  { href: "/trainer/settings", label: "Settings", Icon: Settings },
];

export default function TrainerSidebar({
  userName,
  userEmail,
  userInitials,
  applicationStatus = "approved",
}: TrainerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/trainer") return pathname === "/trainer";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed", top: 12, left: 12, zIndex: 90,
          display: "none", background: "var(--navy)", border: "none",
          borderRadius: 8, padding: 8, color: "white",
          boxShadow: "var(--shadow-sm)", cursor: "pointer",
          alignItems: "center", justifyContent: "center",
        }}
        className="sidebar-mobile-toggle"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 95,
            background: "rgba(10,15,30,0.5)", backdropFilter: "blur(4px)",
            display: "block",
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        className={`dashboard-sidebar ${isOpen ? "open" : ""}`}
        style={{
          width: 240,
          minHeight: "100vh",
          background: "var(--navy)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
        }}
      >
        {/* Logo */}
        <div style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Link href="/" onClick={() => setIsOpen(false)} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Brain size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white", letterSpacing: "-0.3px", lineHeight: 1 }}>AI Trainer</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Trainer Portal</div>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.5)",
              cursor: "pointer", display: "none", padding: 4,
            }}
            className="sidebar-mobile-close"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Application status badge (shown if pending) */}
        {applicationStatus === "pending" && (
          <div style={{
            margin: "12px 10px 0",
            padding: "8px 12px",
            background: "rgba(245,183,0,0.12)",
            border: "1px solid rgba(245,183,0,0.25)",
            borderRadius: 8,
          }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: "#F5B700", marginBottom: 2 }}>Application under review</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>We&apos;ll email you within 48h</div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 10px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 10px 10px" }}>
            Trainer menu
          </div>
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href} onClick={() => setIsOpen(false)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 10px", borderRadius: 8, marginBottom: 2,
                background: active ? "rgba(26,111,191,0.25)" : "transparent",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
              >
                <Icon size={16} color={active ? "var(--accent)" : "rgba(255,255,255,0.45)"} />
                <span style={{
                  fontSize: 13.5, fontWeight: active ? 500 : 400,
                  color: active ? "white" : "rgba(255,255,255,0.5)",
                  flex: 1,
                }}>{label}</span>
                {active && <ChevronRight size={13} color="var(--accent)" />}
              </Link>
            );
          })}
        </nav>

      {/* User + Logout */}
      <div style={{
        padding: "12px 10px 16px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px", borderRadius: 8,
          background: "rgba(255,255,255,0.04)",
          marginBottom: 6,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0,
          }}>
            {userInitials}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userName}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userEmail}
            </div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 9,
          padding: "8px 10px", borderRadius: 8, border: "none",
          background: "transparent", cursor: "pointer",
          transition: "background 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <LogOut size={14} color="rgba(255,255,255,0.35)" />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Log out</span>
        </button>
      </div>
    </aside>
    </>
  );
}
