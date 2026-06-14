"use client";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

interface DbTrainer {
  id: string;
  slug: string;
  full_name: string;
  tagline: string | null;
  specialities: string[];
  rating: number;
  review_count: number;
  sessions_completed: number;
  hourly_rate_ksh: number;
  hourly_rate_usd: number;
  available: boolean;
  featured: boolean;
}

const staticTrainers = [
  {
    initials: "JM", name: "James Mwangi", spec: "Fine-tuning and RLHF",
    tags: ["LLaMA", "GPT-4", "RLHF"], rating: 4.9, sessions: 128,
    rateKsh: 2500, rateUsd: 19,
    bg: "var(--grad-accent)", available: true, slug: "james-mwangi",
  },
  {
    initials: "SA", name: "Sofia Andersson", spec: "Prompt Engineering",
    tags: ["ChatGPT", "Claude", "Gemini"], rating: 4.8, sessions: 94,
    rateKsh: 2340, rateUsd: 18,
    bg: "linear-gradient(135deg, #1A6FBF 0%, #2B8FDF 100%)", available: true, slug: "sofia-andersson",
  },
  {
    initials: "KO", name: "Kofi Owusu", spec: "Dataset Curation",
    tags: ["Annotation", "JSONL", "Hugging Face"], rating: 5.0, sessions: 61,
    rateKsh: 3000, rateUsd: 23,
    bg: "linear-gradient(135deg, #1A7A4A 0%, #22A05E 100%)", available: false, slug: "kofi-owusu",
  },
  {
    initials: "PR", name: "Priya Rajan", spec: "Model Evaluation",
    tags: ["Benchmarking", "MMLU", "evals"], rating: 4.7, sessions: 203,
    rateKsh: 2860, rateUsd: 22,
    bg: "linear-gradient(135deg, #7A4A1A 0%, #B06422 100%)", available: true, slug: "priya-rajan",
  },
  {
    initials: "DK", name: "David Kamau", spec: "LoRA and PEFT",
    tags: ["LoRA", "QLoRA", "Adapters"], rating: 4.9, sessions: 87,
    rateKsh: 2000, rateUsd: 15,
    bg: "linear-gradient(135deg, #4A1A7A 0%, #6B2AAE 100%)", available: true, slug: "david-kamau",
  },
  {
    initials: "YN", name: "Yuki Nakamura", spec: "AI Safety and Alignment",
    tags: ["Alignment", "RLAIF", "Red-teaming"], rating: 4.8, sessions: 45,
    rateKsh: 3640, rateUsd: 28,
    bg: "linear-gradient(135deg, #1A5A7A 0%, #1E7FAD 100%)", available: false, slug: "yuki-nakamura",
  },
];

const GRADIENTS = [
  "var(--grad-accent)",
  "linear-gradient(135deg, #1A6FBF 0%, #2B8FDF 100%)",
  "linear-gradient(135deg, #1A7A4A 0%, #22A05E 100%)",
  "linear-gradient(135deg, #7A4A1A 0%, #B06422 100%)",
  "linear-gradient(135deg, #4A1A7A 0%, #6B2AAE 100%)",
  "linear-gradient(135deg, #1A5A7A 0%, #1E7FAD 100%)",
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function Trainers({ dbTrainers }: { dbTrainers?: DbTrainer[] }) {
  const { formatPrice } = useCurrency();

  const displayTrainers = dbTrainers && dbTrainers.length > 0
    ? dbTrainers.map((t, idx) => ({
        initials: getInitials(t.full_name),
        name: t.full_name,
        spec: t.tagline || (t.specialities?.[0] ? `${t.specialities[0]} Specialist` : "AI Trainer"),
        tags: t.specialities || [],
        rating: Number(t.rating) || 5.0,
        sessions: t.sessions_completed || 0,
        rateKsh: Number(t.hourly_rate_ksh) || 2000,
        rateUsd: Number(t.hourly_rate_usd) || 15,
        bg: GRADIENTS[idx % GRADIENTS.length],
        available: t.available !== false,
        slug: t.slug,
      }))
    : staticTrainers;

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p className="section-label">Featured trainers</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.6px" }}>
            Learn from verified experts
          </h2>
        </div>
        <Link href="/trainers" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 600,
          transition: "gap 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.gap = "10px")}
          onMouseLeave={e => (e.currentTarget.style.gap = "6px")}
        >View all trainers <ArrowRight size={15} /></Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }} className="responsive-cards-grid">
        {displayTrainers.map(({ initials, name, spec, tags, rating, sessions, rateKsh, rateUsd, bg, available, slug }) => (
          <Link key={name} href={`/trainers/${slug}`} style={{
            display: "block",
            background: "white", border: "1px solid var(--line)",
            borderRadius: 16, padding: "20px",
            transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
            textDecoration: "none",
            cursor: "pointer",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 15, fontWeight: 700, color: "white", flexShrink: 0,
              }}>{initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--navy)", marginBottom: 1 }}>{name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{spec}</div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 10, fontWeight: 700,
                color: available ? "var(--green)" : "var(--muted)",
                background: available ? "var(--green-light)" : "var(--surface)",
                padding: "4px 9px", borderRadius: 20, flexShrink: 0,
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: available ? "var(--green)" : "var(--muted)",
                  animation: available ? "pulse-dot 2s ease-in-out infinite" : "none",
                }} />
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
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{rating}</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>| {sessions} sessions</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
                {formatPrice(rateKsh, rateUsd)}/hr
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
