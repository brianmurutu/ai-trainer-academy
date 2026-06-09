import { notFound } from "next/navigation";
import Link from "next/link";
import { getApplication } from "@/app/actions/admin";
import ReviewActions from "@/components/admin/ReviewActions";
import { ChevronLeft, MapPin, Star, Clock, ExternalLink, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Review Application | Admin" };

const STATUS_CONFIG = {
  pending:  { label: "Pending review", bg: "#FEF3C7", color: "#D97706", Icon: Clock },
  approved: { label: "Approved",       bg: "#D1FAE5", color: "#059669", Icon: CheckCircle2 },
  rejected: { label: "Rejected",       bg: "#FEE2E2", color: "#DC2626", Icon: XCircle },
} as const;

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ background: "white", borderRadius: 14, padding: "20px 22px", border: "1px solid rgba(0,0,0,0.06)", ...style }}>
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 12 }}>{children}</h2>;
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = await getApplication(id);
  if (!app) notFound();

  const cfg = STATUS_CONFIG[app.status];
  const initials = app.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div style={{ padding: "32px", maxWidth: 900 }}>
      <Link href="/admin/applications" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 20 }}>
        <ChevronLeft size={14} /> Back to applications
      </Link>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "white" }}>
            {initials}
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>{app.full_name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{app.email}</span>
              {app.country && <><span style={{ color: "var(--line)" }}>·</span><MapPin size={11} color="var(--muted)" /><span style={{ fontSize: 12, color: "var(--muted)" }}>{app.country}</span></>}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>
          <cfg.Icon size={13} />{cfg.label}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <SectionTitle>Bio</SectionTitle>
            <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.7 }}>{app.bio ?? "No bio provided."}</p>
          </Card>
          <Card>
            <SectionTitle>Application details</SectionTitle>
            <dl style={{ margin: 0 }}>
              {([["Applied", fmt(app.created_at)], ["Experience", app.experience], ["Rate (KSH/hr)", app.hourly_rate_ksh ? `KSH ${app.hourly_rate_ksh.toLocaleString()}` : null], ["Rate (USD/hr)", app.hourly_rate_usd ? `$${app.hourly_rate_usd}` : null]] as [string, string | null][]).filter(([, v]) => v).map(([label, value]) => (
                <div key={label} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <dt style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", width: 140, flexShrink: 0 }}>{label}</dt>
                  <dd style={{ fontSize: 13, color: "var(--navy)", flex: 1, margin: 0 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <SectionTitle>Specialities</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(app.specialities ?? []).map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 500, padding: "4px 12px", background: "#EEF2FF", color: "#6366F1", borderRadius: 20, border: "1px solid #C7D2FE" }}>{s}</span>
              ))}
            </div>
          </Card>
          {(app.linkedin_url || app.github_url || app.sample_work_url) && (
            <Card>
              <SectionTitle>Portfolio &amp; links</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([["LinkedIn", app.linkedin_url], ["GitHub", app.github_url], ["Sample work", app.sample_work_url]] as [string, string | null][]).filter(([, u]) => u).map(([label, url]) => (
                  <a key={label} href={url!} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                    <ExternalLink size={13} />{label}: {url}
                  </a>
                ))}
              </div>
            </Card>
          )}
          {app.reviewer_note && (
            <section style={{ background: app.status === "approved" ? "#F0FDF4" : "#FFF7F7", borderRadius: 14, padding: "18px 20px", border: `1px solid ${app.status === "approved" ? "#BBF7D0" : "#FECACA"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                {app.status === "approved" ? <CheckCircle2 size={14} color="#059669" /> : <AlertCircle size={14} color="#DC2626" />}
                <h2 style={{ fontSize: 13, fontWeight: 600, color: app.status === "approved" ? "#059669" : "#DC2626" }}>{app.status === "approved" ? "Approval note" : "Rejection reason"}</h2>
              </div>
              <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>{app.reviewer_note}</p>
              {app.reviewed_at && <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>Reviewed {fmt(app.reviewed_at)}</p>}
            </section>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)", position: "sticky", top: 24 }}>
            <SectionTitle>Review decision</SectionTitle>
            <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18, lineHeight: 1.5 }}>Trainer is emailed immediately after you confirm.</p>
            <ReviewActions applicationId={app.id} applicantName={app.full_name} currentStatus={app.status} />
          </Card>
          <Card>
            <SectionTitle>Requested rate</SectionTitle>
            {app.hourly_rate_ksh && <div style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px" }}>KSH {app.hourly_rate_ksh.toLocaleString()}<span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted)" }}>/hr</span></div>}
            {app.hourly_rate_usd && <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>≈ ${app.hourly_rate_usd}/hr</div>}
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12 }}>
              <Star size={12} color="var(--muted)" />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>New applicant — no ratings yet</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
