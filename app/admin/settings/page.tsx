import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Settings, Shield, Mail, Database } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings | Admin" };

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || (user.user_metadata?.role as string) !== "admin") redirect("/login");
  return user;
}

export default async function AdminSettingsPage() {
  const user = await requireAdmin();

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: 14,
    padding: "20px 24px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    marginBottom: 16,
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid var(--line)",
    fontSize: 13,
  };

  return (
    <div style={{ padding: "32px", maxWidth: 700 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 13, color: "var(--slate)" }}>Platform configuration and admin account details.</p>
      </div>

      {/* Admin account */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Shield size={16} color="var(--accent)" />
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>Admin Account</h2>
        </div>
        <div style={{ ...rowStyle }}>
          <span style={{ color: "var(--muted)" }}>Name</span>
          <span style={{ fontWeight: 500, color: "var(--navy)" }}>{(user.user_metadata?.full_name as string) || "—"}</span>
        </div>
        <div style={{ ...rowStyle }}>
          <span style={{ color: "var(--muted)" }}>Email</span>
          <span style={{ fontWeight: 500, color: "var(--navy)" }}>{user.email}</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <span style={{ color: "var(--muted)" }}>Role</span>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, background: "#EEF2FF", color: "#6366F1" }}>admin</span>
        </div>
      </div>

      {/* Platform info */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Database size={16} color="var(--accent)" />
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>Platform</h2>
        </div>
        <div style={rowStyle}>
          <span style={{ color: "var(--muted)" }}>Platform</span>
          <span style={{ fontWeight: 500 }}>AI Trainer Academy</span>
        </div>
        <div style={rowStyle}>
          <span style={{ color: "var(--muted)" }}>Trainer commission</span>
          <span style={{ fontWeight: 500, color: "#059669" }}>80% to trainer / 20% platform</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <span style={{ color: "var(--muted)" }}>Activation fee (new trainers)</span>
          <span style={{ fontWeight: 500 }}>KSH 2,000 (one-time)</span>
        </div>
      </div>

      {/* Email config */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Mail size={16} color="var(--accent)" />
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>Email (Resend)</h2>
        </div>
        <div style={rowStyle}>
          <span style={{ color: "var(--muted)" }}>Provider</span>
          <span style={{ fontWeight: 500 }}>Resend</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <span style={{ color: "var(--muted)" }}>Sender</span>
          <span style={{ fontWeight: 500 }}>noreply@ai-trainer-acedmy.co.ke</span>
        </div>
      </div>

      <div style={{ padding: "14px 16px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>
        <strong>To change platform settings</strong>, update environment variables in your hosting provider and redeploy. Contact your developer for schema changes.
      </div>
    </div>
  );
}
