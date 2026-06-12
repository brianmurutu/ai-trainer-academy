import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Users, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trainers | Admin" };

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || (user.user_metadata?.role as string) !== "admin") redirect("/login");
}

export default async function AdminTrainersPage() {
  await requireAdmin();
  const db = createAdminClient();

  const { data: trainers, error } = await db
    .from("trainer_applications")
    .select("id, full_name, email, country, specialities, experience, hourly_rate_ksh, hourly_rate_usd, status, created_at, reviewed_at")
    .eq("status", "approved")
    .order("reviewed_at", { ascending: false });

  const list = trainers ?? [];

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
          Approved Trainers
        </h1>
        <p style={{ fontSize: 13, color: "var(--slate)" }}>
          {list.length} trainer{list.length !== 1 ? "s" : ""} approved on the platform.
        </p>
      </div>

      {error && (
        <div style={{ padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#DC2626" }}>
          Error loading trainers: {error.message}
        </div>
      )}

      {list.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, padding: "64px 32px", textAlign: "center", border: "1px solid var(--line)" }}>
          <Users size={36} color="var(--muted)" style={{ marginBottom: 14 }} />
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>No approved trainers yet</h2>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>Approve trainer applications to see them listed here.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 140px 160px", padding: "10px 20px", background: "#F8F9FB", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.8 }}>
            <span>Trainer</span><span>Location</span><span>Experience</span><span>Rate</span>
          </div>
          {list.map((t, i) => {
            const initials = t.full_name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");
            return (
              <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr 160px 140px 160px", padding: "14px 20px", alignItems: "center", borderBottom: i < list.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0 }}>{initials}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--navy)" }}>{t.full_name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{t.email}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--slate)", display: "flex", alignItems: "center", gap: 4 }}>
                  {t.country ? <><MapPin size={11} color="var(--muted)" />{t.country}</> : "—"}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.experience ?? "—"}</div>
                <div>
                  {t.hourly_rate_ksh ? (
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>KSH {t.hourly_rate_ksh.toLocaleString()}</span>
                      {t.hourly_rate_usd && <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 4 }}>/ ${t.hourly_rate_usd}</span>}
                    </div>
                  ) : <span style={{ fontSize: 12, color: "var(--muted)" }}>—</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
