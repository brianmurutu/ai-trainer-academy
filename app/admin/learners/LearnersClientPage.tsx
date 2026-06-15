"use client";

import { useState } from "react";
import {
  Search,
  GraduationCap,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail,
  Edit2,
  RefreshCw,
  X,
  Send
} from "lucide-react";
import {
  toggleBanLearner,
  updateLearnerDetails,
  resendConfirmationEmail,
  sendDirectUserEmailAction,
  broadcastEmail,
  type LearnerAccount
} from "@/app/actions/admin";

export default function LearnersClientPage({ initialLearners }: { initialLearners: LearnerAccount[] }) {
  const [learners, setLearners] = useState<LearnerAccount[]>(initialLearners);
  const [search, setSearch] = useState("");
  
  // Action status states
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modals state
  const [selectedEmailLearner, setSelectedEmailLearner] = useState<LearnerAccount | null>(null);
  const [selectedEditLearner, setSelectedEditLearner] = useState<LearnerAccount | null>(null);
  const [showBroadcast, setShowBroadcast] = useState(false);

  // Form states
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [broadcastLoading, setBroadcastLoading] = useState(false);

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
        setTimeout(() => setSuccess(null), 4000);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update status.";
      setError(errorMsg);
    } finally {
      setPendingId(null);
    }
  };

  const handleResendConfirmation = async (email: string, fullName: string) => {
    setPendingId(email); // use email as block indicator
    setError(null);
    setSuccess(null);
    try {
      const res = await resendConfirmationEmail(email, fullName);
      if (res && res.success) {
        setSuccess(res.message);
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to resend confirmation email.");
    } finally {
      setPendingId(null);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmailLearner) return;

    setEmailLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await sendDirectUserEmailAction(
        selectedEmailLearner.email,
        selectedEmailLearner.fullName,
        emailSubject,
        emailBody,
        "learner"
      );

      if (res && res.success) {
        setSuccess(res.message);
        setSelectedEmailLearner(null);
        setEmailSubject("");
        setEmailBody("");
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send email.");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    broadcastLoading || setBroadcastLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await broadcastEmail(broadcastSubject, broadcastBody, "learner");
      if (res && res.success) {
        setSuccess(res.message);
        setShowBroadcast(false);
        setBroadcastSubject("");
        setBroadcastBody("");
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to broadcast email.");
    } finally {
      setBroadcastLoading(false);
    }
  };

  const handleEditLearner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditLearner) return;

    setEditLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updateLearnerDetails(selectedEditLearner.id, editEmail, editName);
      if (res && res.success) {
        setLearners(prev =>
          prev.map(l =>
            l.id === selectedEditLearner.id ? { ...l, fullName: editName, email: editEmail } : l
          )
        );
        setSuccess(res.message);
        setSelectedEditLearner(null);
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update learner details.");
    } finally {
      setEditLoading(false);
    }
  };

  const openEditModal = (learner: LearnerAccount) => {
    setEditName(learner.fullName);
    setEditEmail(learner.email);
    setSelectedEditLearner(learner);
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

        {/* Search & Broadcast */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setShowBroadcast(true)}
            style={{
              padding: "8px 16px", borderRadius: 8, background: "var(--accent)", color: "white",
              border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, transition: "background 0.15s"
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#14599a")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}
          >
            <Mail size={14} /> Broadcast Email
          </button>

          <div style={{ position: "relative", width: 240 }}>
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
      </div>

      {/* Messages */}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#DC2626" }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#065F46" }}>
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
            display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 110px 160px",
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

              const isPending = pendingId === learner.id || pendingId === learner.email;

              return (
                <div
                  key={learner.id}
                  style={{
                    display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr 110px 160px",
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

                  {/* Actions Grid */}
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center" }}>
                    <button
                      type="button"
                      title="Compose Email"
                      onClick={() => setSelectedEmailLearner(learner)}
                      style={iconBtn("#1A6FBF", "#BFDBFE")}
                    >
                      <Mail size={12} />
                    </button>

                    <button
                      type="button"
                      title="Edit Learner Details"
                      onClick={() => openEditModal(learner)}
                      style={iconBtn("var(--navy)", "var(--line)")}
                    >
                      <Edit2 size={12} />
                    </button>

                    <button
                      type="button"
                      title="Resend Confirmation Email"
                      disabled={isPending}
                      onClick={() => handleResendConfirmation(learner.email, learner.fullName)}
                      style={iconBtn("#7C3AED", "#DDD6FE")}
                    >
                      {isPending && pendingId === learner.email ? (
                        <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <RefreshCw size={12} />
                      )}
                    </button>

                    <button
                      type="button"
                      title={learner.isBanned ? "Reinstate Learner" : "Suspend Learner"}
                      disabled={isPending}
                      onClick={() => handleToggleBan(learner.id, learner.isBanned)}
                      style={learner.isBanned ? iconBtn("#059669", "#A7F3D0") : iconBtn("#D97706", "#FDE68A")}
                    >
                      {isPending && pendingId === learner.id ? (
                        <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                      ) : learner.isBanned ? (
                        <ShieldCheck size={12} />
                      ) : (
                        <ShieldAlert size={12} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual Email Modal */}
      {selectedEmailLearner && (
        <div style={modalOverlay} onClick={() => setSelectedEmailLearner(null)}>
          <div style={modalBody} onClick={e => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3 style={modalTitle}>Email {selectedEmailLearner.fullName}</h3>
              <button onClick={() => setSelectedEmailLearner(null)} style={closeBtn}><X size={16} /></button>
            </div>
            
            <form onSubmit={handleSendEmail} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={fieldLabel}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Account update request details"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={fieldLabel}>Message Content</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your email message here..."
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  style={textareaStyle}
                />
              </div>

              <div style={actionsContainer}>
                <button type="button" onClick={() => setSelectedEmailLearner(null)} style={cancelBtn}>Cancel</button>
                <button type="submit" disabled={emailLoading} style={submitBtn}>
                  {emailLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={14} />}
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Email Modal */}
      {showBroadcast && (
        <div style={modalOverlay} onClick={() => setShowBroadcast(false)}>
          <div style={modalBody} onClick={e => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3 style={modalTitle}>Broadcast Email to Learners</h3>
              <button onClick={() => setShowBroadcast(false)} style={closeBtn}><X size={16} /></button>
            </div>
            
            <form onSubmit={handleBroadcast} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={fieldLabel}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Platform system maintenance schedule"
                  value={broadcastSubject}
                  onChange={e => setBroadcastSubject(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={fieldLabel}>Message Content</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write the broadcast email to all learners here..."
                  value={broadcastBody}
                  onChange={e => setBroadcastBody(e.target.value)}
                  style={textareaStyle}
                />
              </div>

              <div style={actionsContainer}>
                <button type="button" onClick={() => setShowBroadcast(false)} style={cancelBtn}>Cancel</button>
                <button type="submit" disabled={broadcastLoading} style={submitBtn}>
                  {broadcastLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={14} />}
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}
      {selectedEditLearner && (
        <div style={modalOverlay} onClick={() => setSelectedEditLearner(null)}>
          <div style={modalBody} onClick={e => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3 style={modalTitle}>Edit Learner Details</h3>
              <button onClick={() => setSelectedEditLearner(null)} style={closeBtn}><X size={16} /></button>
            </div>
            
            <form onSubmit={handleEditLearner} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={fieldLabel}>Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={fieldLabel}>Email Address</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={actionsContainer}>
                <button type="button" onClick={() => setSelectedEditLearner(null)} style={cancelBtn}>Cancel</button>
                <button type="submit" disabled={editLoading} style={submitBtn}>
                  {editLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 992px) {
          .learners-header-grid {
            grid-template-columns: 1.5fr 1.5fr 110px 160px !important;
          }
          .learners-header-grid > span:nth-child(3),
          .learners-header-grid > span:nth-child(4) {
            display: none !important;
          }
          .learners-row-grid {
            grid-template-columns: 1.5fr 1.5fr 110px 160px !important;
          }
          .learners-row-grid > div:nth-child(3),
          .learners-row-grid > div:nth-child(4) {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .learners-header-grid {
            grid-template-columns: 1.5fr 160px !important;
          }
          .learners-header-grid > span:nth-child(2),
          .learners-header-grid > span:nth-child(5) {
            display: none !important;
          }
          .learners-row-grid {
            grid-template-columns: 1.5fr 160px !important;
          }
          .learners-row-grid > div:nth-child(2),
          .learners-row-grid > div:nth-child(5) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Visual style helpers
function iconBtn(color: string, borderCol: string): React.CSSProperties {
  return {
    width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 6, border: `1px solid ${borderCol}`, background: "white", color,
    cursor: "pointer", flexShrink: 0, transition: "background 0.15s"
  };
}

const modalOverlay: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 200, padding: 20
};

const modalBody: React.CSSProperties = {
  background: "white", borderRadius: 16, padding: 24,
  width: "100%", maxWidth: 460, boxShadow: "0 24px 60px rgba(0,0,0,0.22)"
};

const modalHeader: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18
};

const modalTitle: React.CSSProperties = {
  fontSize: 15.5, fontWeight: 700, color: "var(--navy)", margin: 0
};

const closeBtn: React.CSSProperties = {
  background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6,
  display: "flex", color: "var(--muted)"
};

const fieldLabel: React.CSSProperties = {
  display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--slate)", marginBottom: 6
};

const inputStyle: React.CSSProperties = {
  width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: "10px 12px",
  fontSize: 13.5, outline: "none", fontFamily: "inherit"
};

const textareaStyle: React.CSSProperties = {
  width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: "10px 12px",
  fontSize: 13.5, outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6
};

const actionsContainer: React.CSSProperties = {
  display: "flex", gap: 8, marginTop: 14
};

const cancelBtn: React.CSSProperties = {
  flex: 1, padding: 10, borderRadius: 8, border: "1px solid var(--line)",
  background: "white", fontSize: 13, cursor: "pointer", color: "var(--slate)", fontWeight: 500
};

const submitBtn: React.CSSProperties = {
  flex: 2, padding: 10, borderRadius: 8, border: "none", background: "var(--accent)",
  color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 6
};
