"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Video, User, MessageCircle, ArrowRight, VideoOff, AlertCircle, Loader2, X, Send, CheckCircle2 } from "lucide-react";
import { SessionWithTrainer, messageTrainerAction } from "@/app/actions/bookings";

type LearnerSessionsClientProps = {
  initialSessions: SessionWithTrainer[];
};

export default function LearnerSessionsClient({ initialSessions }: LearnerSessionsClientProps) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  // Message states
  const [messagingBooking, setMessagingBooking] = useState<SessionWithTrainer | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messagingBooking || !messageText.trim()) return;

    setSendingMessage(true);
    setMessageSuccess(null);
    setMessageError(null);

    try {
      const res = await messageTrainerAction({
        bookingId: messagingBooking.id,
        message: messageText.trim(),
      });

      if (res.success) {
        setMessageSuccess("Message sent to trainer successfully!");
        setMessageText("");
        setTimeout(() => {
          setMessagingBooking(null);
          setMessageSuccess(null);
        }, 2200);
      } else {
        setMessageError(res.error || "Failed to send message.");
      }
    } catch (err: any) {
      setMessageError(err.message || "Failed to send message.");
    } finally {
      setSendingMessage(false);
    }
  };

  const filtered = initialSessions.filter(s => {
    if (tab === "upcoming") {
      return s.status === "confirmed" || s.status === "pending";
    }
    return s.status === "completed" || s.status === "cancelled" || s.status === "failed";
  });

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
            My 1-on-1 Sessions
          </h1>
          <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
            Track your scheduled consultation calls, read pre-session notes, and join live learning meeting channels.
          </p>
        </div>
        <Link href="/trainers" style={{
          padding: "10px 18px", background: "var(--navy)", color: "white", borderRadius: 10,
          fontSize: 13.5, fontWeight: 600, textDecoration: "none", display: "inline-flex", gap: 8, alignItems: "center"
        }}>
          Book New Session <ArrowRight size={14} />
        </Link>
      </div>

      {/* Tabs toggle */}
      <div style={{
        display: "flex", gap: 6, background: "white", padding: "6px", borderRadius: 10,
        border: "1px solid var(--line)", width: "fit-content", marginBottom: 24
      }}>
        {(["upcoming", "past"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "6px 16px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 500,
              cursor: "pointer", textTransform: "capitalize",
              background: tab === t ? "var(--navy)" : "transparent",
              color: tab === t ? "white" : "var(--slate)"
            }}
          >
            {t === "upcoming" ? "Scheduled Call Slots" : "Past / Cancelled Sessions"}
          </button>
        ))}
      </div>

      {/* Sessions list */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "64px 24px", background: "white",
          borderRadius: 14, border: "1px solid var(--line)"
        }}>
          <CalendarDays size={40} color="var(--muted)" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>No Sessions Found</h3>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>You don&apos;t have any sessions in this category.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(s => {
            const isPending = s.status === "pending";
            const isCancelled = s.status === "cancelled" || s.status === "failed";
            const hasMeetingLink = !!s.meetingUrl;

            return (
              <div key={s.id} style={{
                background: "white", borderRadius: 14, border: "1px solid var(--line)",
                padding: 24, display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 20,
                alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
              }} className="session-grid">
                
                {/* Details */}
                <div style={{ display: "flex", gap: 14, alignItems: "start" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", background: s.trainerColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 600, color: "white", flexShrink: 0
                  }}>{s.trainerInitials}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{s.topic}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--slate)" }}>
                      <User size={12} /> {s.trainerName} ({s.trainerTitle})
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>
                    <CalendarDays size={14} color="var(--accent)" /> {s.date}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--slate)" }}>
                    <Clock size={13} color="var(--muted)" /> {s.time} ({s.duration})
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  {isCancelled ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#DC2626", fontWeight: 500 }}>
                      <AlertCircle size={14} /> Cancelled
                    </div>
                  ) : tab === "upcoming" ? (
                    <>
                      <button
                        onClick={() => {
                          setMessagingBooking(s);
                          setMessageText("");
                          setMessageSuccess(null);
                          setMessageError(null);
                        }}
                        style={{
                          padding: "8px 14px", border: "1px solid var(--line)", background: "white",
                          borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: "var(--slate)", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 6
                        }}
                      >
                        <MessageCircle size={14} /> Message
                      </button>

                      {isPending ? (
                        <div style={{
                          padding: "8px 14px", background: "#FEF3C7", border: "1px solid #FCD34D",
                          color: "#D97706", borderRadius: 8, fontSize: 12, fontWeight: 600,
                          display: "inline-flex", alignItems: "center", gap: 6
                        }}>
                          <Clock size={14} /> Pending Confirmation
                        </div>
                      ) : hasMeetingLink ? (
                        <a href={s.meetingUrl!} target="_blank" rel="noopener noreferrer" style={{
                          padding: "8px 16px", background: "var(--accent)",
                          color: "white", borderRadius: 8, fontSize: 12.5, fontWeight: 600, textDecoration: "none",
                          display: "inline-flex", alignItems: "center", gap: 6,
                          animation: "pulse-accent 2s infinite"
                        }}>
                          <Video size={14} /> Join Call
                        </a>
                      ) : (
                        <div style={{
                          padding: "8px 14px", background: "#F3F4F6", border: "1px solid #E5E7EB",
                          color: "#6B7280", borderRadius: 8, fontSize: 12, fontWeight: 500,
                          display: "inline-flex", alignItems: "center", gap: 6
                        }}>
                          <Video size={14} /> Meeting Link Pending
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                      <VideoOff size={14} /> Completed
                    </div>
                  )}
                </div>

                {/* Pre-session details / Notes bar */}
                {s.notes && (
                  <div style={{
                    gridColumn: "1 / -1", background: "var(--surface)", border: "1px solid var(--line)",
                    padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "var(--slate)", lineHeight: 1.5
                  }}>
                    <strong>Session Context:</strong> {s.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Messaging Modal */}
      {messagingBooking && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(10,15,30,0.5)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16
        }}>
          <div style={{
            background: "white", borderRadius: 16, width: "100%", maxWidth: 480,
            border: "1px solid var(--line)", overflow: "hidden",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid var(--line)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "var(--surface)"
            }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                  Message {messagingBooking.trainerName}
                </h3>
                <span style={{ fontSize: 11, color: "var(--slate)" }}>
                  Re: {messagingBooking.topic}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMessagingBooking(null)}
                style={{
                  background: "none", border: "none", color: "var(--muted)",
                  cursor: "pointer", padding: 4, display: "flex", alignItems: "center"
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSendMessage} style={{ padding: 20 }}>
              {messageError && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                  background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8,
                  fontSize: 12.5, color: "#DC2626", marginBottom: 14
                }}>
                  <AlertCircle size={15} />
                  <span>{messageError}</span>
                </div>
              )}

              {messageSuccess && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                  background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 8,
                  fontSize: 12.5, color: "#065F46", marginBottom: 14
                }}>
                  <CheckCircle2 size={15} />
                  <span>{messageSuccess}</span>
                </div>
              )}

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder={`Write your message to ${messagingBooking.trainerName}...`}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: 8,
                    border: "1px solid var(--line)", fontSize: 13.5, outline: "none",
                    resize: "none", fontFamily: "inherit", lineHeight: 1.5
                  }}
                />
                <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, display: "block" }}>
                  This message will be delivered to the trainer's email. They can reply directly to you.
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setMessagingBooking(null)}
                  style={{
                    padding: "8px 16px", borderRadius: 8, border: "1px solid var(--line)",
                    background: "white", color: "var(--slate)", fontSize: 13, fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingMessage || !messageText.trim()}
                  style={{
                    padding: "8px 18px", borderRadius: 8, border: "none",
                    background: "var(--accent)", color: "white", fontSize: 13, fontWeight: 600,
                    cursor: (sendingMessage || !messageText.trim()) ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", gap: 6
                  }}
                >
                  {sendingMessage ? (
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  ) : (
                    <Send size={13} />
                  )}
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media query styling */}
      <style>{`
        @media(max-width: 768px) {
          .session-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @keyframes pulse-accent {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,111,191,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(26,111,191,0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
