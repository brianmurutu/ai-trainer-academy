"use client";

import { useState } from "react";
import {
  Search,
  Users,
  MapPin,
  Mail,
  Edit2,
  RefreshCw,
  X,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import {
  updateTrainerDetails,
  resendConfirmationEmail,
  sendDirectUserEmailAction,
  broadcastEmail
} from "@/app/actions/admin";

export type TrainerAccount = {
  id: string;
  full_name: string;
  email: string;
  country: string | null;
  specialities: string[];
  experience: string | null;
  hourly_rate_ksh: number | null;
  hourly_rate_usd: number | null;
  status: string;
  created_at: string;
  reviewed_at: string | null;
};

export default function TrainersClientPage({ initialTrainers }: { initialTrainers: TrainerAccount[] }) {
  const [trainers, setTrainers] = useState<TrainerAccount[]>(initialTrainers);
  const [search, setSearch] = useState("");
  
  // Status feedback states
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modals state
  const [selectedEmailTrainer, setSelectedEmailTrainer] = useState<TrainerAccount | null>(null);
  const [selectedEditTrainer, setSelectedEditTrainer] = useState<TrainerAccount | null>(null);
  const [showBroadcast, setShowBroadcast] = useState(false);

  // Email form states
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // Edit form states
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRateKsh, setEditRateKsh] = useState<number>(0);
  const [editRateUsd, setEditRateUsd] = useState<number>(0);
  const [editLoading, setEditLoading] = useState(false);

  // Broadcast form states
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  const filtered = trainers.filter(t =>
    t.full_name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    (t.country && t.country.toLowerCase().includes(search.toLowerCase()))
  );

  const handleResendConfirmation = async (email: string, fullName: string) => {
    setPendingId(email);
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
    if (!selectedEmailTrainer) return;

    setEmailLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await sendDirectUserEmailAction(
        selectedEmailTrainer.email,
        selectedEmailTrainer.full_name,
        emailSubject,
        emailBody,
        "trainer"
      );

      if (res && res.success) {
        setSuccess(res.message);
        setSelectedEmailTrainer(null);
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
    setBroadcastLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await broadcastEmail(broadcastSubject, broadcastBody, "trainer");
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

  const handleEditTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditTrainer) return;

    setEditLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updateTrainerDetails(
        selectedEditTrainer.id,
        editEmail,
        editName,
        editRateKsh,
        editRateUsd
      );

      if (res && res.success) {
        setTrainers(prev =>
          prev.map(t =>
            t.id === selectedEditTrainer.id
              ? {
                  ...t,
                  full_name: editName,
                  email: editEmail,
                  hourly_rate_ksh: editRateKsh,
                  hourly_rate_usd: editRateUsd
                }
              : t
          )
        );
        setSuccess(res.message);
        setSelectedEditTrainer(null);
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update trainer details.");
    } finally {
      setEditLoading(false);
    }
  };

  const openEditModal = (trainer: TrainerAccount) => {
    setEditName(trainer.full_name);
    setEditEmail(trainer.email);
    setEditRateKsh(trainer.hourly_rate_ksh || 0);
    setEditRateUsd(trainer.hourly_rate_usd || 0);
    setSelectedEditTrainer(trainer);
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Header & stats */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
            Approved Trainers
          </h1>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            {trainers.length} trainer{trainers.length !== 1 ? "s" : ""} approved on the platform.
          </p>
        </div>

        {/* Search & Actions */}
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
              placeholder="Search trainers..."
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

      {/* Message feedback */}
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

      {/* Trainers Listing */}
      {filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, padding: "64px 32px", textAlign: "center", border: "1px solid var(--line)" }}>
          <Users size={36} color="var(--muted)" style={{ marginBottom: 14 }} />
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>No approved trainers found</h2>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            {search ? "Try refining your search terms." : "Approve trainer applications to see them listed here."}
          </p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr 140px", padding: "12px 20px", background: "#F8F9FB",
            borderBottom: "1px solid var(--line)", fontSize: 11, fontWeight: 600, color: "var(--muted)",
            textTransform: "uppercase", letterSpacing: 0.8
          }} className="trainers-header-grid">
            <span>Trainer</span>
            <span>Location</span>
            <span>Experience</span>
            <span>Rate</span>
            <span style={{ textAlign: "right" }}>Actions</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((t, i) => {
              const initials = t.full_name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
              const isPending = pendingId === t.email;

              return (
                <div
                  key={t.id}
                  style={{
                    display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr 140px", padding: "14px 20px",
                    alignItems: "center", borderBottom: i < filtered.length - 1 ? "1px solid var(--line)" : "none"
                  }}
                  className="trainers-row-grid"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0 }}>
                      {initials}
                    </div>
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

                  {/* Action row buttons */}
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center" }}>
                    <button
                      type="button"
                      title="Compose Email"
                      onClick={() => setSelectedEmailTrainer(t)}
                      style={iconBtn("#1A6FBF", "#BFDBFE")}
                    >
                      <Mail size={12} />
                    </button>

                    <button
                      type="button"
                      title="Edit Trainer Details"
                      onClick={() => openEditModal(t)}
                      style={iconBtn("var(--navy)", "var(--line)")}
                    >
                      <Edit2 size={12} />
                    </button>

                    <button
                      type="button"
                      title="Resend Confirmation Email"
                      disabled={isPending}
                      onClick={() => handleResendConfirmation(t.email, t.full_name)}
                      style={iconBtn("#7C3AED", "#DDD6FE")}
                    >
                      {isPending ? (
                        <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <RefreshCw size={12} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Compose Email Modal */}
      {selectedEmailTrainer && (
        <div style={modalOverlay} onClick={() => setSelectedEmailTrainer(null)}>
          <div style={modalBody} onClick={e => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3 style={modalTitle}>Email Trainer: {selectedEmailTrainer.full_name}</h3>
              <button onClick={() => setSelectedEmailTrainer(null)} style={closeBtn}><X size={16} /></button>
            </div>
            
            <form onSubmit={handleSendEmail} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={fieldLabel}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Updating your course schedules"
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
                  placeholder="Compose your email text..."
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  style={textareaStyle}
                />
              </div>

              <div style={actionsContainer}>
                <button type="button" onClick={() => setSelectedEmailTrainer(null)} style={cancelBtn}>Cancel</button>
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
              <h3 style={modalTitle}>Broadcast Email to Trainers</h3>
              <button onClick={() => setShowBroadcast(false)} style={closeBtn}><X size={16} /></button>
            </div>
            
            <form onSubmit={handleBroadcast} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={fieldLabel}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule calendar sync updates"
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
                  placeholder="Write the broadcast email to all trainers here..."
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

      {/* Edit Trainer Details Modal */}
      {selectedEditTrainer && (
        <div style={modalOverlay} onClick={() => setSelectedEditTrainer(null)}>
          <div style={modalBody} onClick={e => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3 style={modalTitle}>Edit Trainer Profile</h3>
              <button onClick={() => setSelectedEditTrainer(null)} style={closeBtn}><X size={16} /></button>
            </div>
            
            <form onSubmit={handleEditTrainer} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={fieldLabel}>Rate (KES)</label>
                  <input
                    type="number"
                    required
                    value={editRateKsh}
                    onChange={e => setEditRateKsh(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={fieldLabel}>Rate (USD)</label>
                  <input
                    type="number"
                    required
                    value={editRateUsd}
                    onChange={e => setEditRateUsd(Number(e.target.value))}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={actionsContainer}>
                <button type="button" onClick={() => setSelectedEditTrainer(null)} style={cancelBtn}>Cancel</button>
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
          .trainers-header-grid {
            grid-template-columns: 1.5fr 1.2fr 140px !important;
          }
          .trainers-header-grid > span:nth-child(2),
          .trainers-header-grid > span:nth-child(3) {
            display: none !important;
          }
          .trainers-row-grid {
            grid-template-columns: 1.5fr 1.2fr 140px !important;
          }
          .trainers-row-grid > div:nth-child(2),
          .trainers-row-grid > div:nth-child(3) {
            display: none !important;
          }
        }

        @media (max-width: 600px) {
          .trainers-header-grid {
            grid-template-columns: 1.5fr 120px !important;
          }
          .trainers-header-grid > span:nth-child(4) {
            display: none !important;
          }
          .trainers-row-grid {
            grid-template-columns: 1.5fr 120px !important;
          }
          .trainers-row-grid > div:nth-child(4) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Inline style helpers
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
