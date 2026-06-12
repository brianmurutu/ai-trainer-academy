"use client";
import Link from "next/link";
import { Star, MapPin, CalendarDays, ChevronRight } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

export type TrainerCardData = {
  slug: string;
  name: string;
  tagline: string;
  country: string;
  specialities: string[];
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  rateKsh: number;
  available: boolean;
  rateUsd?: number;
};

export default function TrainerCard({
  trainer,
  featured = false,
}: {
  trainer: TrainerCardData;
  featured?: boolean;
}) {
  const { formatPrice } = useCurrency();
  const rateUsd = trainer.rateUsd || Math.round(trainer.rateKsh / 130);
  return (
    <Link href={`/trainers/${trainer.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        style={{
          background: "white",
          borderRadius: 14,
          padding: "20px",
          border: featured ? "2px solid var(--accent)" : "1px solid rgba(0,0,0,0.06)",
          boxShadow: featured
            ? "0 4px 16px rgba(26,111,191,0.12)"
            : "0 1px 3px rgba(0,0,0,0.04)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.15s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = featured
            ? "0 4px 16px rgba(26,111,191,0.12)"
            : "0 1px 3px rgba(0,0,0,0.04)";
          el.style.transform = "translateY(0)";
        }}
      >
        {/* Top: avatar + availability */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: featured ? "var(--grad-accent)" : "var(--navy)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "white",
            boxShadow: featured ? "0 4px 12px var(--accent-glow)" : "none",
          }}>
            {trainer.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "4px 9px", borderRadius: 20,
            background: trainer.available ? "#D1FAE5" : "#F3F4F6",
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: trainer.available ? "#059669" : "#9CA3AF", animation: trainer.available ? "pulse-dot 2s infinite" : "none" }} />
            <span style={{ fontSize: 11, fontWeight: 500, color: trainer.available ? "#059669" : "#9CA3AF" }}>
              {trainer.available ? "Available" : "Booked out"}
            </span>
          </div>
        </div>

        {/* Name & tagline */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 3 }}>{trainer.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.45, marginBottom: 10 }}>{trainer.tagline}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
            <MapPin size={11} color="var(--muted)" />
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{trainer.country}</span>
          </div>

          {/* Speciality pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
            {trainer.specialities.slice(0, 3).map((s) => (
              <span key={s} style={{
                fontSize: 10.5, fontWeight: 500, padding: "3px 8px",
                background: "var(--surface)", color: "var(--slate)",
                borderRadius: 20, border: "1px solid var(--line)",
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Bottom: stats + CTA */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{trainer.rating}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>({trainer.reviewCount})</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--navy)", fontWeight: 600, marginTop: 4 }}>
                {formatPrice(trainer.rateKsh, rateUsd)} <span style={{ fontWeight: 400, color: "var(--muted)" }}>/ hr</span>
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "7px 12px", borderRadius: 8,
              background: "var(--navy)", color: "white",
              fontSize: 12.5, fontWeight: 500,
            }}>
              Book <ChevronRight size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
