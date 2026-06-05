"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Video, User, MessageCircle, ArrowRight, VideoOff } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

const MOCK_SESSIONS = [
  {
    id: "1",
    topic: "QLoRA Deep Dive — Part 2",
    trainer: "Dr. Amara Osei",
    trainerTitle: "Lead AI Researcher",
    trainerInitials: "AO",
    trainerColor: "#6366F1",
    date: "Today",
    time: "4:00 PM – 5:30 PM EAT",
    status: "upcoming",
    duration: "1.5 hours",
    notes: "Reviewing attention rank adjustments and gradient accumulation configs.",
    joinUrl: "/sessions/1/join"
  },
  {
    id: "2",
    topic: "Evaluation Metrics for LLMs",
    trainer: "Naledi Dlamini",
    trainerTitle: "AI Safety Researcher",
    trainerInitials: "ND",
    trainerColor: "#EC4899",
    date: "Tomorrow",
    time: "10:00 AM – 11:00 AM EAT",
    status: "upcoming",
    duration: "1 hour",
    notes: "Reviewing ARC, MMLU, and custom evaluation test generation templates.",
    joinUrl: "/sessions/2/join"
  },
  {
    id: "3",
    topic: "Building a RAG Pipeline from Scratch",
    trainer: "James Kariuki",
    trainerTitle: "Senior MLOps Engineer",
    trainerInitials: "JK",
    trainerColor: "#0EA5E9",
    date: "Jun 7, 2026",
    time: "2:00 PM – 3:30 PM EAT",
    status: "upcoming",
    duration: "1.5 hours",
    notes: "Configuring dense-sparse hybrid retriever and re-ranker weights.",
    joinUrl: "/sessions/3/join"
  },
  {
    id: "4",
    topic: "Introduction to Weights & Biases",
    trainer: "Dr. Amara Osei",
    trainerTitle: "Lead AI Researcher",
    trainerInitials: "AO",
    trainerColor: "#6366F1",
    date: "May 25, 2026",
    time: "3:00 PM – 4:00 PM EAT",
    status: "completed",
    duration: "1 hour",
    notes: "Session completed. Notes: Configured token loss logger on Colab adapters.",
    joinUrl: null
  }
];

export default function LearnerSessionsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filtered = MOCK_SESSIONS.filter(s => 
    tab === "upcoming" ? s.status === "upcoming" : s.status === "completed"
  );

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
            {t === "upcoming" ? "Scheduled Call Slots" : "Past Sessions"}
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
          <p style={{ fontSize: 13, color: "var(--slate)" }}>You don't have any sessions in this category.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(s => {
            const isSoon = s.date === "Today";
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
                      <User size={12} /> {s.trainer} ({s.trainerTitle})
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
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
                  {s.status === "upcoming" ? (
                    <>
                      <button style={{
                        padding: "8px 14px", border: "1px solid var(--line)", background: "white",
                        borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: "var(--slate)", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6
                      }}>
                        <MessageCircle size={14} /> Message
                      </button>
                      <Link href={s.joinUrl || "#"} style={{
                        padding: "8px 16px", background: isSoon ? "var(--accent)" : "var(--navy)",
                        color: "white", borderRadius: 8, fontSize: 12.5, fontWeight: 600, textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: 6,
                        animation: isSoon ? "pulse-accent 2s infinite" : "none"
                      }}>
                        <Video size={14} /> Join Call
                      </Link>
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

      {/* Media query styling */}
      <style>{`
        @media(max-width: 768px) {
          .session-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @keyframes pulse-accent {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,111,191,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(26,111,191,0); }
        }
      `}</style>
    </div>
  );
}
