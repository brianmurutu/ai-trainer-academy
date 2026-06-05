"use client";

import { useState } from "react";
import { CalendarDays, Clock, Video, User, MessageSquare, Check, X, AlertCircle } from "lucide-react";

type Booking = {
  id: string;
  learnerName: string;
  learnerEmail: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: "pending" | "confirmed" | "cancelled";
  payoutKsh: number;
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    learnerName: "Amina Diop",
    learnerEmail: "amina@example.com",
    topic: "RAG Chunking Strategy Setup",
    date: "Today",
    time: "3:00 PM – 4:00 PM EAT",
    duration: "1 hour",
    status: "pending",
    payoutKsh: 2400
  },
  {
    id: "b2",
    learnerName: "Moussa Traore",
    learnerEmail: "moussa@example.com",
    topic: "LLaMA 3 Quantization parameters",
    date: "Tomorrow",
    time: "11:00 AM – 12:30 PM EAT",
    duration: "1.5 hours",
    status: "confirmed",
    payoutKsh: 3600
  },
  {
    id: "b3",
    learnerName: "Naledi Dlamini",
    learnerEmail: "naledi@example.com",
    topic: "Dataset Curation Techniques",
    date: "Jun 8, 2026",
    time: "9:00 AM – 10:30 AM EAT",
    duration: "1.5 hours",
    status: "confirmed",
    payoutKsh: 3600
  }
];

export default function TrainerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [tab, setTab] = useState<"pending" | "confirmed">("pending");

  const handleAccept = (id: string) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: "confirmed" as const } : b)
    );
  };

  const handleDecline = (id: string) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: "cancelled" as const } : b)
    );
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
          <p style={{ fontSize: 13, color: "var(--slate)" }}>You don't have any bookings in this category.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(b => (
            <div key={b.id} style={{
              background: "white", borderRadius: 14, border: "1px solid var(--line)",
              padding: 24, display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 20,
              alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
            }} className="booking-grid">
              
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
                      style={{
                        padding: "8px 12px", border: "1px solid var(--line)", background: "white",
                        borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: "#DC2626", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6
                      }}
                    >
                      <X size={14} /> Decline
                    </button>
                    <button
                      onClick={() => handleAccept(b.id)}
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
                      <MessageSquare size={14} /> Chat
                    </button>
                    <button style={{
                      padding: "8px 16px", background: "var(--navy)", border: "none",
                      color: "white", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6
                    }}>
                      <Video size={14} /> Join Session
                    </button>
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

      {/* Media query styling */}
      <style>{`
        @media(max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}</style>
    </div>
  );
}
