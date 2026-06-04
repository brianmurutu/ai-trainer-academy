"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Award,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  Brain,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SidebarProps = {
  userName: string;
  userEmail: string;
  userInitials: string;
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard, segment: null },
  { href: "/dashboard/courses", label: "My Courses", Icon: BookOpen, segment: "courses" },
  { href: "/dashboard/sessions", label: "Sessions", Icon: CalendarDays, segment: "sessions" },
  { href: "/dashboard/certificates", label: "Certificates", Icon: Award, segment: "certificates" },
  { href: "/trainers", label: "Find Trainers", Icon: Search, segment: null },
  { href: "/dashboard/settings", label: "Settings", Icon: Settings, segment: "settings" },
];

export default function Sidebar({ userName, userEmail, userInitials }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside style={{
      width: 240,
      minHeight: "100vh",
      background: "var(--navy)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      alignSelf: "flex-start",
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "white", letterSpacing: "-0.3px" }}>
            AI Trainer
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 10px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 10px 10px" }}>
          Main menu
        </div>
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} style={{
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
  );
}
