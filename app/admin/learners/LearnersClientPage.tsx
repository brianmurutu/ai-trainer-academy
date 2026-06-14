"use client";

import { useState } from "react";
import { Search, GraduationCap, ShieldAlert, ShieldCheck, Calendar, Clock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { toggleBanLearner, type LearnerAccount } from "@/app/actions/admin";

export default function LearnersClientPage({ initialLearners }: { initialLearners: LearnerAccount[] }) {
  const [learners, setLearners] = useState<LearnerAccount[]>(initialLearners);
  const [search, setSearch] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filtered = learners.filter(l =>
    l.fullName.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const suspendedCount = learners.filter(l => l.isBanned).length;

  const handleToggleBan = async (id: string, currentBanStatus: boolean) => {
    setPendingId(id);
    setError(null);
    setSuccess(null);
    try {
      const res = await toggleBanLearner(id, !currentBanStatus);
      if (!res) {
        setError("No response from server.");
      } else if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setLearners(prev =>
          prev.map(l => (l.id === id ? { ...l, isBanned: !currentBanStatus } : l))
        );
        setSuccess(res.message);
        // Hide success message after 4 seconds
        setTimeout(() => setSuccess(null), 4000);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update status.";
      setError(errorMsg);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Header and stats */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
            Learners Management
          </h1>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            {learners.length} learner accounts registered · {suspendedCount} suspended.
          </p>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", width: 280 }}>
          <Search size={15} color="var(--muted)" style={{ position: "absolute", left: 12, top: 11 }} />
          <input
            type="text"
            placeholder="Search learners..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "8px 12px 8px 34px", borderRadius: 8,
              border: "1px solid var(--line)", outline: "none", fontSize: 13,
              background: "white", color: "var(--navy)", transition: "border-color 0.15s"
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--line)")}
          />
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
          background: "#FEF2F2", border: "1px solid #FECACA",
          borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#DC2626"
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
          background: "#D1FAE5", border: "1px solid #A7F3D0",
          borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#065F46"
        }}>
          <CheckCircle2 size={16} />
          <span>{success}</span>
        </div>
      )}

      {/* Learner listing */}
      {filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, padding: "64px 32px", textAlign: "center", border: "1px solid var(--line)" }}>
          <GraduationCap size={36} color="var(--muted)" style={{ marginBottom: 14 }} />
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>No learners found</h2>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            {search ? "Try refining your search terms." : "No registered learner accounts exist yet."}
          </p>
        </div>
      ) : (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)",
          overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 120px 140px",
            padding: "12px 20px", background: "#F8F9FB", borderBottom: "1px solid var(--line)",
            fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase",
            letterSpacing: 0.8
          }} className="learners-header-grid">
            <span>Name</span>
            <span>Email</span>
            <span>Registered</span>
            <span>Last Active</span>
            <span>Status</span>
            <span style={{ textAlign: "right" }}>Actions</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((learner, i) => {
              const initials = learner.fullName
                .split(" ")
                .map(n => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              const createdDate = new Date(learner.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric"
              });

              const lastActive = learner.lastSignIn
                ? new Date(learner.lastSignIn).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric"
                  })
                : "Never";

              const isPending = pendingId === learner.id;

              return (
                <div
                  key={learner.id}
                  style={{
                    display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 120px 140px",
                    padding: "14px 20px", alignItems: "center",
                    borderBottom: i < filtered.length - 1 ? "1px solid var(--line)" : "none",
                    background: learner.isBanned ? "#FAFAFA" : "white",
                  }}
                  className="learners-row-grid"
                >
                  {/* Name */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: learner.isBanned ? "var(--muted)" : "var(--accent-light)",
                      color: learner.isBanned ? "var(--slate)" : "var(--accent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, flexShrink: 0
                    }}>
                      {initials}
                    </div>
                    <span style={{
                      fontSize: 13.5, fontWeight: 500,
                      color: learner.isBanned ? "var(--slate)" : "var(--navy)",
                      textDecoration: learner.isBanned ? "line-through" : "none"
                    }}>
                      {learner.fullName}
                    </span>
                  </div>

                  {/* Email */}
                  <div style={{ fontSize: 13, color: "var(--slate)", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {learner.email}
                  </div>

                  {/* Registered */}
                  <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={12} /> {createdDate}
                  </div>

                  {/* Last Active */}
                  <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock size={12} /> {lastActive}
                  </div>

                  {/* Status Badge */}
                  <div>
                    {learner.isBanned ? (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        fontSize: 10.5, fontWeight: 600, padding: "3px 9px",
                        background: "#FEE2E2", color: "#EF4444", borderRadius: 20
                      }}>
                        <ShieldAlert size={11} /> Suspended
                      </span>
                    ) : (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        fontSize: 10.5, fontWeight: 600, padding: "3px 9px",
                        background: "#D1FAE5", color: "#10B981", borderRadius: 20
                      }}>
                        <ShieldCheck size={11} /> Active
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ textAlign: "right" }}>
                    {learner.isBanned ? (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleToggleBan(learner.id, true)}
                        style={{
                          padding: "6px 12px", background: "var(--green)", color: "white",
                          border: "none", borderRadius: 6, fontSize: 11.5, fontWeight: 600,
                          cursor: isPending ? "not-allowed" : "pointer", display: "inline-flex",
                          alignItems: "center", gap: 4, transition: "background 0.15s"
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#059669")}
                        onMouseLeave={e => (e.currentTarget.style.background = "var(--green)")}
                      >
                        {isPending ? (
                          <Loader2 size={11} style={{ animation: "spin 1s linear infinite" }} />
                        ) : "Restore"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleToggleBan(learner.id, false)}
                        style={{
                          padding: "6px 12px", background: "white", color: "#DC2626",
                          border: "1px solid #FCA5A5", borderRadius: 6, fontSize: 11.5, fontWeight: 600,
                          cursor: isPending ? "not-allowed" : "pointer", display: "inline-flex",
                          alignItems: "center", gap: 4, transition: "all 0.15s"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = "#FEF2F2";
                          e.currentTarget.style.borderColor = "#EF4444";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.borderColor = "#FCA5A5";
                        }}
                      >
                        {isPending ? (
                          <Loader2 size={11} style={{ animation: "spin 1s linear infinite" }} />
                        ) : "Suspend"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 992px) {
          .learners-header-grid {
            grid-template-columns: 1.5fr 1.5fr 120px 140px !important;
          }
          .learners-header-grid > span:nth-child(3),
          .learners-header-grid > span:nth-child(4) {
            display: none !important;
          }
          .learners-row-grid {
            grid-template-columns: 1.5fr 1.5fr 120px 140px !important;
          }
          .learners-row-grid > div:nth-child(3),
          .learners-row-grid > div:nth-child(4) {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .learners-header-grid {
            grid-template-columns: 1.5fr 100px 100px !important;
          }
          .learners-header-grid > span:nth-child(2) {
            display: none !important;
          }
          .learners-row-grid {
            grid-template-columns: 1.5fr 100px 100px !important;
          }
          .learners-row-grid > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
