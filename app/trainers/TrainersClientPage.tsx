"use client";

import { useState, useMemo } from "react";
import { Search, Zap, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainerCard, { type TrainerCardData } from "@/components/trainers/TrainerCard";
import type { TrainerRow } from "@/lib/supabase/queries";

// Map a TrainerRow from Supabase into the TrainerCardData shape the card expects
function toCardData(t: TrainerRow): TrainerCardData & { featured: boolean } {
  return {
    slug: t.slug,
    name: t.full_name,
    tagline: t.tagline ?? "",
    country: t.country ?? "",
    specialities: t.specialities ?? [],
    rating: t.rating,
    reviewCount: t.review_count,
    sessionsCompleted: t.sessions_completed,
    rateKsh: t.hourly_rate_ksh,
    rateUsd: t.hourly_rate_usd || undefined,
    available: t.available,
    featured: t.featured,
  };
}

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

interface Props {
  trainers: TrainerRow[];
}

export default function TrainersClientPage({ trainers }: Props) {
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trainers.filter((t) => {
      // Text search across name, tagline, country, specialities
      if (q) {
        const haystack = [
          t.full_name,
          t.tagline ?? "",
          t.country ?? "",
          ...(t.specialities ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // Speciality pill filter
      if (activeSpec !== "All") {
        const has = (t.specialities ?? []).some((s) =>
          s.toLowerCase().includes(activeSpec.toLowerCase())
        );
        if (!has) return false;
      }

      // Availability toggle
      if (availableOnly && !t.available) return false;

      return true;
    });
  }, [trainers, search, activeSpec, availableOnly]);

  const availableCount = trainers.filter((t) => t.available).length;
  const featured = filtered.filter((t) => t.featured);
  const rest = filtered.filter((t) => !t.featured);

  return (
    <>
      <Navbar />
      <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>

        {/* Hero / search */}
        <div style={{
          background: "var(--grad-hero)",
          padding: "64px 32px 52px",
          backgroundImage: "var(--grad-hero), radial-gradient(circle at 20% 80%, rgba(59,110,232,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.12) 0%, transparent 50%)",
        }} className="responsive-container">
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 16px", background: "rgba(59,110,232,0.2)",
              border: "1px solid rgba(59,110,232,0.35)",
              borderRadius: "var(--radius-pill)", marginBottom: 20,
            }}>
              <Zap size={13} color="#60A5FA" />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                {availableCount} trainer{availableCount !== 1 ? "s" : ""} available now
              </span>
            </div>
            <h1 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white",
              letterSpacing: "-0.5px", lineHeight: 1.12, marginBottom: 14,
            }}>
              Learn 1-on-1 with Africa&apos;s top AI practitioners
            </h1>
            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7, marginBottom: 28,
            }}>
              Book live sessions with verified trainers specialising in LLM fine-tuning, RLHF,
              RAG systems, and more. Pay in KES, USD, EUR, GBP, or crypto.
            </p>

            {/* Search bar */}
            <div style={{
              display: "flex", alignItems: "center",
              background: "white", borderRadius: 12, overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)", maxWidth: 520, margin: "0 auto",
            }}>
              <div style={{ padding: "0 16px", display: "flex", alignItems: "center" }}>
                <Search size={16} color="var(--muted)" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or speciality..."
                style={{
                  flex: 1, border: "none", outline: "none", fontSize: 14,
                  padding: "13px 0", color: "var(--navy)", background: "transparent",
                }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "0 12px", color: "var(--muted)", fontSize: 14,
                    display: "flex", alignItems: "center",
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button
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

        {/* Filters bar */}
        <div style={{
          background: "white", borderBottom: "1px solid var(--line)", padding: "0 32px",
        }} className="responsive-container">
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            display: "flex", gap: 6, alignItems: "center",
            overflowX: "auto", padding: "12px 0", scrollbarWidth: "none",
          }}>
            {SPECIALITY_FILTERS.map((f) => {
              const isActive = f === activeSpec;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveSpec(f)}
                  style={{
                    flexShrink: 0, padding: "7px 16px", borderRadius: "var(--radius-pill)",
                    border: isActive ? "none" : "1px solid var(--line)",
                    background: isActive ? "var(--grad-accent)" : "white",
                    color: isActive ? "white" : "var(--slate)",
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    cursor: "pointer", whiteSpace: "nowrap",
                    boxShadow: isActive ? "var(--shadow-accent)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {f}
                </button>
              );
            })}

            {/* Separator */}
            <div style={{ width: 1, height: 20, background: "var(--line)", margin: "0 4px", flexShrink: 0 }} />

            {/* Availability toggle */}
            <button
              type="button"
              onClick={() => setAvailableOnly((v) => !v)}
              style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 20,
                border: availableOnly ? "none" : "1px solid var(--line)",
                background: availableOnly ? "#D1FAE5" : "white",
                color: availableOnly ? "#059669" : "var(--slate)",
                fontSize: 13, fontWeight: availableOnly ? 500 : 400,
                cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              <SlidersHorizontal size={12} />
              Available only
            </button>
          </div>
        </div>

        {/* Trainer grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 64px" }} className="responsive-container">

          {filtered.length === 0 && (
            <div style={{
              textAlign: "center", padding: "64px 24px",
              background: "white", borderRadius: 16, border: "1px solid var(--line)",
            }}>
              <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 12 }}>
                No trainers match your current filters.
              </p>
              <button
                type="button"
                onClick={() => { setSearch(""); setActiveSpec("All"); setAvailableOnly(false); }}
                style={{
                  padding: "9px 20px", borderRadius: 8, border: "none",
                  background: "var(--navy)", color: "white", fontSize: 13,
                  fontWeight: 500, cursor: "pointer",
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Featured */}
          {featured.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Zap size={14} color="var(--accent)" />
                <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>
                  Top rated this month
                </h2>
              </div>
               <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 16,
              }} className="responsive-cards-grid">
                {featured.map((t) => (
                  <TrainerCard key={t.slug} trainer={toCardData(t)} featured />
                ))}
              </div>
            </div>
          )}

          {/* All trainers */}
          {rest.length > 0 && (
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 16 }}>
                {activeSpec === "All" && !search ? "All trainers" : "Results"}
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }} className="responsive-cards-grid">
                {rest.map((t) => (
                  <TrainerCard key={t.slug} trainer={toCardData(t)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
