"use client";

import { useState } from "react";
import { Search, User, MessageCircle, BookOpen, Clock, CalendarDays } from "lucide-react";

type Learner = {
  id: string;
  name: string;
  email: string;
  enrolledCourse: string;
  sessionsCompleted: number;
  hoursCompleted: number;
  lastActive: string;
};

type Props = {
  learners: Learner[];
};

export default function TrainerLearnersClient({ learners }: Props) {
  const [search, setSearch] = useState("");

  const filtered = learners.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.enrolledCourse.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          My Students
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
          View ongoing courses, total study hours completed, and communicate directly with active learners in your classes.
        </p>
      </div>

      {/* Filter panel */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "white", padding: 16, borderRadius: 12, border: "1px solid var(--line)",
        marginBottom: 24
      }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
          <Search size={15} color="var(--muted)" style={{ position: "absolute", left: 10, top: 9 }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search students by name, email, or course..."
            style={{
              width: "100%", padding: "7px 10px 7px 32px", fontSize: 13,
              borderRadius: 8, border: "1px solid var(--line)", outline: "none"
            }}
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "64px 24px", background: "white",
          borderRadius: 14, border: "1px solid var(--line)"
        }}>
          <User size={40} color="var(--muted)" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>No Students Found</h3>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>No active students match your search criteria.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 20 }} className="responsive-cards-grid">
          {filtered.map(l => (
            <div key={l.id} style={{
              background: "white", borderRadius: 14, border: "1px solid var(--line)",
              padding: 20, display: "flex", flexDirection: "column", gap: 16,
              boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
            }}>
              {/* Profile Card Header */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", background: "var(--accent-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "var(--accent)", flexShrink: 0
                }}>
                  {l.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--navy)", marginBottom: 3 }}>{l.name}</h3>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{l.email}</div>
                </div>
              </div>

              {/* Course Info */}
              <div style={{
                background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
                padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--slate)" }}>
                  <BookOpen size={13} color="var(--accent)" />
                  <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {l.enrolledCourse}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--slate)", borderTop: "1px solid var(--line)", paddingTop: 8 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <CalendarDays size={11} /> {l.sessionsCompleted} calls completed
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={11} /> {l.hoursCompleted} hrs total
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>Last active: {l.lastActive}</span>
                <button style={{
                  padding: "6px 12px", background: "var(--navy)", color: "white", border: "none",
                  borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6
                }}>
                  <MessageCircle size={13} /> Chat
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
