import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px" }}>
      <div style={{
        background: "var(--accent-light)", border: "1px solid #C5DEFA",
        borderRadius: 24, padding: "56px 48px",
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 32, alignItems: "center",
      }} className="cta-inner">
        <div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.6px", marginBottom: 12 }}>
            Ready to start your AI training journey?
          </h2>
          <p style={{ fontSize: 15, color: "var(--slate)", lineHeight: 1.6 }}>
            Join thousands of learners and trainers already on the platform. Free to start. No credit card required.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--navy)", color: "white",
            textDecoration: "none", padding: "13px 28px",
            borderRadius: 10, fontSize: 15, fontWeight: 500, whiteSpace: "nowrap",
          }}>Start learning free <ArrowRight size={16} /></Link>
          <Link href="/apply" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "var(--accent)", textDecoration: "none",
            fontSize: 13, fontWeight: 500,
          }}>Become a trainer →</Link>
        </div>
      </div>
      <style>{`@media(max-width:768px){.cta-inner{grid-template-columns:1fr !important; padding:36px 24px !important;}}`}</style>
    </section>
  );
}
