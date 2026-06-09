import { getApplications } from "@/app/actions/admin";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import Link from "next/link";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Applications | Admin" };

const STAT_STATUSES = [
  { key: "pending",  label: "Pending",  bg: "#FEF3C7", color: "#D97706", Icon: Clock },
  { key: "approved", label: "Approved", bg: "#D1FAE5", color: "#059669", Icon: CheckCircle2 },
  { key: "rejected", label: "Rejected", bg: "#FEE2E2", color: "#DC2626", Icon: XCircle },
] as const;

const TABS = ["pending", "approved", "rejected", "all"] as const;

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = "pending" } = await searchParams;

  const [pending, approved, rejected, all] = await Promise.all([
    getApplications("pending"),
    getApplications("approved"),
    getApplications("rejected"),
    getApplications(),
  ]);

  const countMap: Record<string, number> = {
    pending: pending.length,
    approved: approved.length,
    rejected: rejected.length,
    all: all.length,
  };

  const applications =
    status === "approved" ? approved
    : status === "rejected" ? rejected
    : status === "all" ? all
    : pending;

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
          Trainer Applications
        </h1>
        <p style={{ fontSize: 13, color: "var(--slate)" }}>Review and action all incoming trainer applications.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        {STAT_STATUSES.map(({ key, label, bg, color, Icon }) => (
          <div key={key} style={{ background: "white", borderRadius: 12, padding: "16px 18px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={17} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>{countMap[key] ?? 0}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", marginBottom: 20 }}>
        {TABS.map((t) => {
          const active = t === status;
          return (
            <Link key={t} href={`/admin/applications?status=${t}`} style={{
              padding: "8px 16px", textDecoration: "none", fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? "var(--navy)" : "var(--muted)",
              borderBottom: active ? "2px solid var(--navy)" : "2px solid transparent",
              marginBottom: -1, textTransform: "capitalize",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              {t}
              <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 20, background: active ? "var(--navy)" : "#F0F2F5", color: active ? "white" : "var(--muted)" }}>
                {countMap[t] ?? 0}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Table or empty state */}
      {applications.length === 0 ? (
        <div style={{ background: "white", borderRadius: 14, padding: "48px", textAlign: "center", border: "1px solid var(--line)" }}>
          <AlertCircle size={28} color="var(--muted)" style={{ marginBottom: 10 }} />
          <p style={{ fontSize: 14, color: "var(--muted)" }}>No {status} applications</p>
        </div>
      ) : (
        <ApplicationsTable applications={applications} />
      )}
    </div>
  );
}
