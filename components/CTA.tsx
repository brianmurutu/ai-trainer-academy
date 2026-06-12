"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{
        background: "linear-gradient(135deg, var(--accent-light) 0%, var(--violet-light) 100%)",
        border: "1px solid #C5DEFA",
        borderRadius: 24, padding: "60px 52px",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 32, alignItems: "center",
        position: "relative", overflow: "hidden",
      }} className="cta-inner">
        {/* Grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(59,110,232,0.06) 39px, rgba(59,110,232,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(59,110,232,0.06) 39px, rgba(59,110,232,0.06) 40px)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Urgency badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--green-light)", color: "var(--green)",
            fontSize: 12, fontWeight: 700, padding: "5px 14px 5px 10px",
            borderRadius: 20, marginBottom: 20,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--green)", display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }} />
            12,000+ learners already on board
          </div>

          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.6px", marginBottom: 12 }}>
            Ready to start your AI training journey?
          </h2>
          <p style={{ fontSize: 15, color: "var(--slate)", lineHeight: 1.65, maxWidth: 520 }}>
            Join thousands of learners and trainers already on the platform. Free to start. No credit card required.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0, position: "relative", zIndex: 1 }}>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--accent)", color: "white",
            textDecoration: "none", padding: "14px 28px",
            borderRadius: 10, fontSize: 15, fontWeight: 700, whiteSpace: "nowrap",
            boxShadow: "var(--shadow-accent)",
            transition: "background 0.15s, transform 0.1s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent-dark)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            Start learning free <ArrowRight size={16} />
          </Link>
          <Link href="/apply" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            color: "var(--accent)", textDecoration: "none",
            fontSize: 13, fontWeight: 600,
            padding: "8px 12px", borderRadius: 8,
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,110,232,0.1)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
          >
            Become a trainer <ArrowRight size={13} />
          </Link>
        </div>
      </div>
      <style>{`@media(max-width:768px){.cta-inner{grid-template-columns:1fr !important; padding:36px 24px !important;}}`}</style>
    </section>
  );
}
