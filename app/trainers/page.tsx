import Link from "next/link";
import { Search, Zap } from "lucide-react";
import TrainerCard, { type TrainerCardData } from "@/components/trainers/TrainerCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Trainer — AI Trainer Academy",
  description:
    "Browse verified AI trainers specialising in LLM fine-tuning, RLHF, RAG systems, prompt engineering, and more.",
};

// ---------------------------------------------------------------------------
// Mock data — replace with Supabase query once trainers table exists
// ---------------------------------------------------------------------------
const TRAINERS: (TrainerCardData & { featured: boolean })[] = [
  {
    slug: "dr-amara-osei",
    name: "Dr. Amara Osei",
    tagline: "LLM Fine-tuning Specialist · PhD in ML from UCT",
    country: "Ghana 🇬🇭",
    specialities: ["Fine-tuning", "LoRA / QLoRA", "RLHF", "Dataset Curation"],
    rating: 4.9,
    reviewCount: 143,
    sessionsCompleted: 328,
    rateKsh: 3500,
    available: true,
    featured: true,
  },
  {
    slug: "naledi-dlamini",
    name: "Naledi Dlamini",
    tagline: "AI Safety Researcher & RLHF Engineer",
    country: "South Africa 🇿🇦",
    specialities: ["AI Safety", "RLHF", "Model Evaluation", "Multimodal"],
    rating: 4.9,
    reviewCount: 98,
    sessionsCompleted: 189,
    rateKsh: 4200,
    available: true,
    featured: true,
  },
  {
    slug: "james-kariuki",
    name: "James Kariuki",
    tagline: "RAG Systems & Vector Database Architect",
    country: "Kenya 🇰🇪",
    specialities: ["RAG Systems", "Vector DBs", "LangChain", "Production ML"],
    rating: 4.8,
    reviewCount: 76,
    sessionsCompleted: 214,
    rateKsh: 3000,
    available: true,
    featured: false,
  },
  {
    slug: "sana-malik",
    name: "Sana Malik",
    tagline: "Prompt Engineer & LLM Application Developer",
    country: "Nigeria 🇳🇬",
    specialities: ["Prompt Engineering", "LLM APIs", "Agents & Tools", "OpenAI"],
    rating: 4.8,
    reviewCount: 112,
    sessionsCompleted: 301,
    rateKsh: 2500,
    available: false,
    featured: false,
  },
  {
    slug: "tafadzwa-moyo",
    name: "Tafadzwa Moyo",
    tagline: "Computer Vision & Multimodal ML Expert",
    country: "Zimbabwe 🇿🇼",
    specialities: ["Computer Vision", "Diffusion Models", "Vision-Language", "PyTorch"],
    rating: 4.7,
    reviewCount: 54,
    sessionsCompleted: 143,
    rateKsh: 3200,
    available: true,
    featured: false,
  },
  {
    slug: "chioma-eze",
    name: "Chioma Eze",
    tagline: "MLOps & Production AI Infrastructure",
    country: "Nigeria 🇳🇬",
    specialities: ["MLOps", "Model Deployment", "Kubernetes", "Monitoring"],
    rating: 4.8,
    reviewCount: 67,
    sessionsCompleted: 178,
    rateKsh: 2800,
    available: true,
    featured: false,
  },
];

const SPECIALITY_FILTERS = [
  "All",
  "Fine-tuning",
  "RLHF",
  "RAG Systems",
  "Prompt Engineering",
  "AI Safety",
  "MLOps",
  "Computer Vision",
];

// ---------------------------------------------------------------------------
// Page (Server Component — no event handlers here)
// ---------------------------------------------------------------------------
export default function TrainersPage() {
  const availableCount = TRAINERS.filter((t) => t.available).length;
  const featured = TRAINERS.filter((t) => t.featured);
  const rest = TRAINERS.filter((t) => !t.featured);

  return (
    <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy) 0%, #1a3a5c 100%)",
        padding: "56px 32px 48px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", background: "rgba(26,111,191,0.3)",
            borderRadius: 20, marginBottom: 16,
          }}>
            <Zap size={13} color="var(--accent)" />
            <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
              {availableCount} trainers available now
            </span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "white", letterSpacing: "-0.8px", lineHeight: 1.15, marginBottom: 14 }}>
            Learn 1-on-1 with Africa&apos;s top AI practitioners
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 28 }}>
            Book live sessions with verified trainers specialising in LLM fine-tuning, RLHF, RAG systems, and more.
            Pay in KSH, USD, or crypto.
          </p>
          {/* Search bar — visual placeholder; interactive version to follow */}
          <div style={{
            display: "flex", alignItems: "center",
            background: "white", borderRadius: 12, overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)", maxWidth: 520, margin: "0 auto",
          }}>
            <div style={{ padding: "0 16px", display: "flex", alignItems: "center" }}>
              <Search size={16} color="var(--muted)" />
            </div>
            <input
              id="trainer-search"
              placeholder="Search by name or speciality…"
              readOnly
              style={{
                flex: 1, border: "none", outline: "none", fontSize: 14,
                padding: "13px 0", color: "var(--navy)", background: "transparent",
              }}
            />
            <button
              id="trainer-search-btn"
              type="button"
              style={{
                background: "var(--accent)", border: "none", color: "white",
                padding: "13px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────── */}
      <div style={{ background: "white", borderBottom: "1px solid var(--line)", padding: "0 32px" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", gap: 6, overflowX: "auto",
          padding: "12px 0", scrollbarWidth: "none",
        }}>
          {SPECIALITY_FILTERS.map((f, i) => (
            <Link
              key={f}
              href={i === 0 ? "/trainers" : `/trainers?speciality=${encodeURIComponent(f)}`}
              style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                border: i === 0 ? "none" : "1px solid var(--line)",
                background: i === 0 ? "var(--navy)" : "white",
                color: i === 0 ? "white" : "var(--slate)",
                fontSize: 13, fontWeight: i === 0 ? 500 : 400,
                cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none",
              }}
            >
              {f}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Trainer grid ─────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 64px" }}>

        {/* Featured */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Zap size={14} color="var(--accent)" />
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>Top rated this month</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}>
            {featured.map((t) => (
              <TrainerCard key={t.slug} trainer={t} featured />
            ))}
          </div>
        </div>

        {/* All trainers */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 16 }}>All trainers</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}>
            {rest.map((t) => (
              <TrainerCard key={t.slug} trainer={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
