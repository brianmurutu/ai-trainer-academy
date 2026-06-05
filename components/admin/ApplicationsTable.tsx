"use client";
import Link from "next/link";
import { ChevronRight, Clock, CheckCircle2, XCircle } from "lucide-react";

const STATUS_CONFIG = {
  pending:  { label: "Pending",  bg: "#FEF3C7", color: "#D97706", Icon: Clock },
  approved: { label: "Approved", bg: "#D1FAE5", color: "#059669", Icon: CheckCircle2 },
  rejected: { label: "Rejected", bg: "#FEE2E2", color: "#DC2626", Icon: XCircle },
} as const;

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

type Row = {
  id: string;
  full_name: string;
  email: string;
  specialities: string[];
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function ApplicationsTable({ applications }: { applications: Row[] }) {
  return (
    <div style={{ background: "white", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px 120px 100px 40px", padding: "10px 20px", background: "#F8F9FB", borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.8 }}>
        <span>Applicant</span><span>Specialities</span><span>Applied</span><span>Status</span><span />
      </div>

      {applications.map((app, i) => {
        const cfg = STATUS_CONFIG[app.status];
        const initials = app.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("");
        return (
          <Link key={app.id} href={`/admin/applications/${app.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 200px 120px 100px 40px", padding: "14px 20px", alignItems: "center", borderBottom: i < applications.length - 1 ? "1px solid var(--line)" : "none", background: "white", transition: "background 0.1s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#F8F9FB"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "white"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0 }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--navy)" }}>{app.full_name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{app.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {(app.specialities ?? []).slice(0, 2).map((s) => (
                  <span key={s} style={{ fontSize: 10, padding: "2px 7px", background: "#F0F2F5", color: "var(--slate)", borderRadius: 20 }}>{s}</span>
                ))}
                {(app.specialities ?? []).length > 2 && <span style={{ fontSize: 10, color: "var(--muted)" }}>+{app.specialities.length - 2}</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{fmt(app.created_at)}</div>
              <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 20, background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
              <ChevronRight size={15} color="var(--muted)" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
