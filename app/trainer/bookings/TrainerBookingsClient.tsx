"use client";

import { useState } from "react";
import { CalendarDays, Clock, Video, User, Check, X, AlertCircle, Loader2 } from "lucide-react";
import { acceptTrainerBooking, declineTrainerBooking, TrainerBookingMapped } from "@/app/actions/bookings";

type TrainerBookingsClientProps = {
  initialBookings: TrainerBookingMapped[];
};

export default function TrainerBookingsClient({ initialBookings }: TrainerBookingsClientProps) {
  const [bookings, setBookings] = useState<TrainerBookingMapped[]>(initialBookings);
  const [tab, setTab] = useState<"pending" | "confirmed">("pending");
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TrainerBookingMapped | null>(null);
  const [meetingUrl, setMeetingUrl] = useState("");
  
  // Loading & Error States
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleOpenAcceptModal = (booking: TrainerBookingMapped) => {
    setSelectedBooking(booking);
    // Pre-fill with a free Jitsi Meet room link using the booking ID
    setMeetingUrl(`https://meet.jit.si/ATA-Session-${booking.id}`);
    setActionError(null);
    setModalOpen(true);
  };

  const handleConfirmAccept = async () => {
    if (!selectedBooking || !meetingUrl.trim()) return;
    setActionLoading(true);
    setActionError(null);
    try {
      const res = await acceptTrainerBooking(selectedBooking.id, meetingUrl.trim());
      if (res.success) {
        setBookings(prev => 
          prev.map(b => b.id === selectedBooking.id ? { ...b, status: "confirmed", meetingUrl: meetingUrl.trim() } : b)
        );
        setModalOpen(false);
        setSelectedBooking(null);
      } else {
        setActionError(res.error || "Failed to accept booking.");
      }
    } catch {
      setActionError("An unexpected error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = async (id: string) => {
    if (!confirm("Are you sure you want to decline this booking?")) return;
    setLoadingId(id);
    setActionError(null);
    try {
      const res = await declineTrainerBooking(id);
      if (res.success) {
        setBookings(prev => 
          prev.map(b => b.id === id ? { ...b, status: "cancelled" } : b)
        );
      } else {
        alert(res.error || "Failed to decline booking.");
      }
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = bookings.filter(b => {
    if (tab === "pending") return b.status === "pending";
    return b.status === "confirmed";
  });

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          1-on-1 Consultation Bookings
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
          Manage your student call slot requests, accept new bookings, and join confirmed video conference channels.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 6, background: "white", padding: "6px", borderRadius: 10,
        border: "1px solid var(--line)", width: "fit-content", marginBottom: 24
      }}>
        {(["pending", "confirmed"] as const).map(t => {
          const count = bookings.filter(b => b.status === t).length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 16px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: 500,
                cursor: "pointer", textTransform: "capitalize",
                background: tab === t ? "var(--navy)" : "transparent",
                color: tab === t ? "white" : "var(--slate)",
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              {t === "pending" ? "Pending Approval" : "Confirmed Calls"}
              {count > 0 && (
                <span style={{
                  fontSize: 10.5, fontWeight: 600, background: tab === t ? "rgba(255,255,255,0.2)" : "var(--surface)",
                  color: tab === t ? "white" : "var(--navy)", padding: "2px 6px", borderRadius: 10
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "64px 24px", background: "white",
          borderRadius: 14, border: "1px solid var(--line)"
        }}>
          <CalendarDays size={40} color="var(--muted)" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>No Bookings Found</h3>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>You don&apos;t have any bookings in this category.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(b => (
            <div key={b.id} style={{
              background: "white", borderRadius: 14, border: "1px solid var(--line)",
              padding: 24, display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 20,
              alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
            }} className="responsive-split-grid">
              
              {/* Learner Info */}
              <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "var(--navy)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 600, color: "white", flexShrink: 0
                }}>
                  {b.learnerName.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--navy)", marginBottom: 3 }}>{b.topic}</h3>
                  <div style={{ fontSize: 12, color: "var(--slate)", display: "flex", alignItems: "center", gap: 4 }}>
                    <User size={12} /> {b.learnerName} · <span style={{ color: "var(--muted)" }}>{b.learnerEmail}</span>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>
                  <CalendarDays size={14} color="var(--accent)" /> {b.date}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--slate)" }}>
                  <Clock size={13} color="var(--muted)" /> {b.time} ({b.duration})
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
                {b.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleDecline(b.id)}
                      disabled={loadingId !== null}
                      style={{
                        padding: "8px 12px", border: "1px solid var(--line)", background: "white",
                        borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: "#DC2626", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6
                      }}
                    >
                      {loadingId === b.id ? (
                        <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <X size={14} />
                      )}
                      Decline
                    </button>
                    <button
                      onClick={() => handleOpenAcceptModal(b)}
                      disabled={loadingId !== null}
                      style={{
                        padding: "8px 16px", background: "var(--green)", border: "none",
                        color: "white", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6
                      }}
                    >
                      <Check size={14} /> Accept Booking
                    </button>
                  </>
                ) : (
                  <>
                    <button style={{
                      padding: "8px 14px", border: "1px solid var(--line)", background: "white",
                      borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: "var(--slate)", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6
                    }}>
                      <MessageCircle /> Chat
                    </button>
                    {b.meetingUrl ? (
                      <a href={b.meetingUrl} target="_blank" rel="noopener noreferrer" style={{
                        padding: "8px 16px", background: "var(--navy)", border: "none",
                        color: "white", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6, textDecoration: "none"
                      }}>
                        <Video size={14} /> Join Session
                      </a>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
                        Link Pending
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Escrow payment status bar */}
              <div style={{
                gridColumn: "1 / -1", background: "var(--surface)", border: "1px solid var(--line)",
                padding: "8px 12px", borderRadius: 8, fontSize: 11.5, color: "var(--slate)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertCircle size={13} color="var(--accent)" /> Escrow Balance: Held until session is marked complete.
                </span>
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>
                  Payout: KSH {b.payoutKsh.toLocaleString()} (80%)
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Accept Booking Modal */}
      {modalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: 16
        }}>
          <div style={{
            background: "white", borderRadius: 16, width: "100%", maxWidth: 460,
            padding: 28, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
              Set up Video Conference
            </h3>
            <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5, marginBottom: 20 }}>
              Provide a meeting link for your session. We have pre-filled a free, zero-config Jitsi Meet room link, but you can change it to a Google Meet, Zoom, or Teams link if preferred.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="meeting-link" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>
                Conference Link URL
              </label>
              <input
                id="meeting-link"
                type="url"
                value={meetingUrl}
                onChange={e => setMeetingUrl(e.target.value)}
                placeholder="https://meet.google.com/abc-defg-hij"
                style={{
                  width: "100%", padding: "10px 14px", border: "1px solid var(--line)",
                  borderRadius: 10, fontSize: 13.5, color: "var(--navy)",
                  outline: "none"
                }}
              />
            </div>

            {actionError && (
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px",
                background: "#FEF2F2", border: "1px solid #FECACA",
                borderRadius: 8, marginBottom: 16,
              }}>
                <AlertCircle size={14} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "#DC2626", lineHeight: 1.5, margin: 0 }}>{actionError}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={actionLoading}
                style={{
                  padding: "9px 16px", border: "1px solid var(--line)", background: "white",
                  color: "var(--slate)", borderRadius: 8, fontSize: 13, fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAccept}
                disabled={actionLoading || !meetingUrl.trim()}
                style={{
                  padding: "9px 20px", background: "var(--navy)", border: "none",
                  color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: (actionLoading || !meetingUrl.trim()) ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", gap: 6
                }}
              >
                {actionLoading && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
                Accept & Share Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MessageCircle Icon Mockup */}
      <svg style={{ display: "none" }}>
        <g id="message-circle">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </g>
      </svg>

      <style>{`
        @media(max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// Local MessageCircle SVG helper component to avoid next-lint issues or typescript issues
function MessageCircle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <use href="#message-circle" />
    </svg>
  );
}
