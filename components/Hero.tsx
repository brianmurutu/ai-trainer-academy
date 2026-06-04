import Link from "next/link";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section style={{
      maxWidth: 1180, margin: "0 auto",
      padding: "80px 24px 72px",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 64, alignItems: "center",
    }} className="hero-grid">

      {/* Left copy */}
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "var(--accent-light)", border: "1px solid #C5DEFA",
          borderRadius: 20, padding: "5px 14px 5px 10px",
          fontSize: 13, color: "var(--accent)", fontWeight: 500,
          marginBottom: 28,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)", display: "inline-block",
          }} />
          Now accepting trainer applications
        </div>

        <h1 style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 600, lineHeight: 1.12,
          letterSpacing: "-1.5px", color: "var(--navy)",
          marginBottom: 20,
        }}>
          Learn to train<br />
          AI models from<br />
          <span style={{ color: "var(--accent)" }}>real experts</span>
        </h1>

        <p style={{
          fontSize: 17, color: "var(--slate)", lineHeight: 1.7,
          maxWidth: 420, marginBottom: 36,
        }}>
          Connect with verified AI trainers, access structured courses on fine-tuning, RLHF, and prompt engineering — and earn recognised certifications.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--navy)", color: "white",
            textDecoration: "none", padding: "13px 26px",
            borderRadius: 10, fontSize: 15, fontWeight: 500,
            transition: "background 0.15s",
          }}>
            Start learning free <ArrowRight size={16} />
          </Link>
          <Link href="/apply" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "white", color: "var(--ink)",
            textDecoration: "none", padding: "13px 26px",
            borderRadius: 10, fontSize: 15, fontWeight: 400,
            border: "1px solid var(--line)",
          }}>
            <Play size={15} fill="currentColor" /> Become a trainer
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Vetted & approved trainers only",
            "Pay in KSH, USD, or crypto",
            "Get certified — recognised by employers",
          ].map(point => (
            <div key={point} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CheckCircle2 size={16} color="var(--green)" />
              <span style={{ fontSize: 14, color: "var(--slate)" }}>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — stat cards visual */}
      <div style={{ position: "relative" }}>
        <div style={{
          background: "var(--surface)", borderRadius: 20,
          padding: "32px 28px", border: "1px solid var(--line)",
        }}>
          <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Platform at a glance</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { num: "340+", label: "Verified trainers", color: "var(--accent-light)", text: "var(--accent)" },
              { num: "12K+", label: "Learners enrolled", color: "var(--green-light)", text: "var(--green)" },
              { num: "98%", label: "Satisfaction rate", color: "var(--amber-light)", text: "var(--amber)" },
              { num: "4.9★", label: "Avg. trainer rating", color: "var(--accent-light)", text: "var(--accent)" },
            ].map(({ num, label, color, text }) => (
              <div key={label} style={{
                background: color, borderRadius: 12, padding: "16px 18px",
              }}>
                <div style={{ fontSize: 24, fontWeight: 600, color: text, letterSpacing: "-0.5px" }}>{num}</div>
                <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Sample trainer card */}
          <div style={{
            background: "white", borderRadius: 12, padding: "16px",
            border: "1px solid var(--line)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "var(--navy)", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 600, color: "white",
              }}>JM</div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14, color: "var(--navy)" }}>James Mwangi</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Fine-tuning & RLHF specialist</div>
              </div>
              <div style={{
                marginLeft: "auto", background: "var(--green-light)",
                color: "var(--green)", fontSize: 11, fontWeight: 500,
                padding: "3px 10px", borderRadius: 20,
              }}>● Available</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Fine-tuning", "RLHF", "LLaMA", "GPT-4"].map(tag => (
                <span key={tag} style={{
                  fontSize: 11, padding: "3px 10px",
                  background: "var(--surface)", borderRadius: 20,
                  color: "var(--slate)", border: "1px solid var(--line)",
                }}>{tag}</span>
              ))}
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginTop: 14, paddingTop: 12,
              borderTop: "1px solid var(--line)",
            }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>128 sessions · 4.9 ★</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>KSH 2,500/hr</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 48px 20px 40px !important; }
        }
      `}</style>
    </section>
  );
}
