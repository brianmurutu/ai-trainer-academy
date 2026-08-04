"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import type { TrainerRow } from "@/lib/supabase/queries";

// Deterministic colour from trainer name so avatars don't flicker
const AVATAR_COLORS = [
  "#1A2E42", "#1A6FBF", "#1A7A4A", "#7A4A1A", "#4A1A7A", "#1A5A7A",
];
export function avatarColor(name: string): string {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}
export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function TrainerCard({ trainer }: { trainer: TrainerRow }) {
  const {
    slug, full_name, tagline, specialities, rating, sessions_completed,
    hourly_rate_ksh, hourly_rate_usd, available,
  } = trainer;

  const displayRate = hourly_rate_ksh
    ? `KES ${hourly_rate_ksh.toLocaleString()}/hr`
    : `$${hourly_rate_usd}/hr`;

  const tags = (specialities ?? []).slice(0, 3);

  return (
    <Link
      href={`/trainers/${slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
      aria-label={`View ${full_name}'s trainer profile`}
    >
      <article
        className="trainer-card"
        style={{
          background: "white",
          border: "1px solid var(--line)",
          borderRadius: 16,
          padding: "20px",
          cursor: "pointer",
          height: "100%",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#B5D4F4";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 6px 24px rgba(26,111,191,0.09)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div
            style={{
              width: 46, height: 46, borderRadius: "50%",
              background: avatarColor(full_name),
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontWeight: 700, color: "white", flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {initials(full_name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "var(--navy)", marginBottom: 1 }}>
              {full_name}
            </div>
            <div style={{
              fontSize: 12, color: "var(--muted)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {tagline ?? "Trainer"}
            </div>
          </div>
          <div
            style={{
              fontSize: 10, fontWeight: 700,
              color: available ? "var(--green)" : "var(--muted)",
              background: available ? "var(--green-light)" : "var(--surface)",
              padding: "3px 8px", borderRadius: 20, flexShrink: 0,
            }}
            aria-label={available ? "Available for booking" : "Currently busy"}
          >
            {available ? "Available" : "Busy"}
          </div>
        </div>

        {/* Speciality tags */}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11, padding: "3px 9px",
                  background: "var(--surface)", borderRadius: 20,
                  color: "var(--slate)", border: "1px solid var(--line)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 14, borderTop: "1px solid var(--line)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Star size={13} fill="#B05C0E" color="#B05C0E" />
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
              {rating.toFixed(1)}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              · {sessions_completed} sessions
            </span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
            {displayRate}
          </span>
        </div>
      </article>
    </Link>
  );
}
