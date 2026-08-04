import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTrainers } from "@/lib/supabase/queries";
import { TrainerCard } from "@/components/TrainerCard";

// ── Empty state (server-rendered) ────────────────────────────
function EmptyState() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        textAlign: "center",
        padding: "60px 24px",
        color: "var(--muted)",
        fontSize: 14,
      }}
    >
      Trainer profiles are being set up — check back shortly.
    </div>
  );
}

// ── Section (Server Component) ────────────────────────────────
export default async function Trainers() {
  // Fetch featured trainers; fall back to top-rated if none are marked featured
  let trainers = await getTrainers({ featured: true });
  if (trainers.length === 0) {
    trainers = await getTrainers();
  }
  const displayed = trainers.slice(0, 6);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 44,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12, fontWeight: 700, color: "var(--accent)",
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10,
            }}
          >
            Featured trainers
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700,
              color: "var(--navy)", letterSpacing: "-0.6px",
            }}
          >
            Learn from verified practitioners
          </h2>
        </div>
        <Link
          href="/trainers"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 600,
          }}
        >
          View all trainers <ArrowRight size={15} />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {displayed.length === 0 ? (
          <EmptyState />
        ) : (
          displayed.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))
        )}
      </div>
    </section>
  );
}
