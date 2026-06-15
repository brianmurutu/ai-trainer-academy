"use client";

import { useState } from "react";
import {
  LifeBuoy,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MessageSquare
} from "lucide-react";
import { createSupportTicket, type SupportTicket } from "@/app/actions/tickets";

export default function SupportClientPage({ initialTickets }: { initialTickets: SupportTicket[] }) {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [subject, setSubject] = useState("Email Change Request");
  const [customSubject, setCustomSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Submit states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const finalSubject = subject === "Other" ? (customSubject.trim() || "General Inquiry") : subject;

    if (!message.trim()) {
      setError("Please describe your request details.");
      setLoading(false);
      return;
    }

    try {
      const res = await createSupportTicket(finalSubject, message);
      if (res && res.success) {
        setSuccess("Support ticket raised successfully! Our administration team has been notified.");
        setMessage("");
        setCustomSubject("");
        
        // Refresh local list
        const newTicket: SupportTicket = {
          id: Math.random().toString(), // fallback local ID
          user_id: "",
          subject: finalSubject,
          message: message.trim(),
          status: "open",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setTickets(prev => [newTicket, ...prev]);
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit ticket.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <LifeBuoy size={24} color="var(--accent)" /> Support Center
        </h1>
        <p style={{ fontSize: 14, color: "var(--slate)" }}>
          Need assistance or want to request account detail changes (such as email changes)? Submit a ticket below.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: 32 }} className="support-grid">
        
        {/* Raise Ticket Form */}
        <div style={{ background: "white", borderRadius: 14, border: "1px solid var(--line)", padding: 28, height: "fit-content", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
            Raise a Support Ticket
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, fontSize: 12.5, color: "#DC2626" }}>
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 8, fontSize: 12.5, color: "#065F46" }}>
                <CheckCircle2 size={15} />
                <span>{success}</span>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                Topic / Subject
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 13.5, outline: "none", background: "white", fontFamily: "inherit" }}
              >
                <option value="Email Change Request">Email Change Request ✉️</option>
                <option value="Billing Issue">Billing or Course Purchase Issue 💳</option>
                <option value="Course Access Query">Course Access / Telegram Group Query 🎒</option>
                <option value="Other">Other Request...</option>
              </select>
            </div>

            {subject === "Other" && (
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                  Custom Topic Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Account deletion request"
                  value={customSubject}
                  onChange={e => setCustomSubject(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 13.5, outline: "none" }}
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                Message details
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={6}
                placeholder={
                  subject === "Email Change Request"
                    ? "Please specify the new email address you would like to use for your account..."
                    : "Describe the issue or details of your request here..."
                }
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 13.5, outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: 12, borderRadius: 8, border: "none", background: "var(--accent)", color: "white",
                fontSize: 13.5, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s"
              }}
            >
              {loading ? (
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Send size={14} />
              )}
              Submit Ticket
            </button>
          </form>
        </div>

        {/* Ticket History */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
            Ticket History
          </h2>

          {tickets.length === 0 ? (
            <div style={{ background: "white", borderRadius: 14, padding: "48px 24px", textAlign: "center", border: "1px solid var(--line)" }}>
              <MessageSquare size={32} color="var(--muted)" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>No tickets submitted</h3>
              <p style={{ fontSize: 13, color: "var(--slate)", margin: 0 }}>
                Any support tickets you submit will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {tickets.map(t => {
                const date = new Date(t.created_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric"
                });

                return (
                  <div
                    key={t.id}
                    style={{ background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.01)" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--navy)" }}>{t.subject}</span>
                      {t.status === "open" ? (
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", background: "#FEF3C7", color: "#D97706", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={10} /> Open
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", background: "#D1FAE5", color: "#10B981", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle2 size={10} /> Resolved
                        </span>
                      )}
                    </div>
                    
                    <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5, margin: "0 0 14px", whiteSpace: "pre-wrap" }}>
                      {t.message}
                    </p>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                      <Calendar size={11} />
                      <span>Submitted on {date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .support-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
