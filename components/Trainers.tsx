"use client";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const trainers = [
  { initials: "JM", name: "James Mwangi", spec: "Fine-tuning & RLHF", tags: ["LLaMA", "GPT-4", "RLHF"], rating: 4.9, sessions: 128, rate: "KSH 2,500/hr", bg: "#1A2E42", available: true },
  { initials: "SA", name: "Sofia Andersson", spec: "Prompt Engineering", tags: ["ChatGPT", "Claude", "Gemini"], rating: 4.8, sessions: 94, rate: "$18/hr", bg: "#1A6FBF", available: true },
  { initials: "KO", name: "Kofi Owusu", spec: "Dataset Curation", tags: ["Annotation", "JSONL", "Hugging Face"], rating: 5.0, sessions: 61, rate: "KSH 3,000/hr", bg: "#1A7A4A", available: false },
  { initials: "PR", name: "Priya Rajan", spec: "Model Evaluation", tags: ["Benchmarking", "MMLU", "evals"], rating: 4.7, sessions: 203, rate: "$22/hr", bg: "#7A4A1A", available: true },
  { initials: "DK", name: "David Kamau", spec: "LoRA & PEFT", tags: ["LoRA", "QLoRA", "Adapters"], rating: 4.9, sessions: 87, rate: "KSH 2,000/hr", bg: "#4A1A7A", available: true },
  { initials: "YN", name: "Yuki Nakamura", spec: "AI Safety & Alignment", tags: ["Alignment", "RLAIF", "Red-teaming"], rating: 4.8, sessions: 45, rate: "$28/hr", bg: "#1A5A7A", available: false },
];

export default function Trainers() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Featured trainers</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.6px" }}>
            Learn from verified experts
          </h2>
        </div>
        <Link href="/trainers" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 500,
        }}>View all trainers <ArrowRight size={15} /></Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {trainers.map(({ initials, name, spec, tags, rating, sessions, rate, bg, available }) => (
          <div key={name} style={{
            background: "white", border: "1px solid var(--line)",
            borderRadius: 16, padding: "20px", transition: "border-color 0.15s, box-shadow 0.15s",
            cursor: "pointer",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#B5D4F4";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(26,111,191,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 15, fontWeight: 600, color: "white", flexShrink: 0,
              }}>{initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 15, color: "var(--navy)", marginBottom: 1 }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{spec}</div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 10, fontWeight: 600,
                color: available ? "var(--green)" : "var(--muted)",
                background: available ? "var(--green-light)" : "var(--surface)",
                padding: "4px 9px", borderRadius: 20, flexShrink: 0,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: available ? "var(--green)" : "var(--muted)" }} />
                <span>{available ? "Available" : "Busy"}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, padding: "3px 9px", background: "var(--surface)",
                  borderRadius: 20, color: "var(--slate)", border: "1px solid var(--line)",
                }}>{tag}</span>
              ))}
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: 14, borderTop: "1px solid var(--line)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Star size={13} fill="#B05C0E" color="#B05C0E" />
                <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{rating}</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>· {sessions} sessions</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>{rate}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
