import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
      <div
        style={{
          background: "var(--accent-light)",
          border: "1px solid #C5DEFA",
          borderRadius: 24,
          padding: "64px 56px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 40,
          alignItems: "center",
        }}
        className="cta-inner"
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 14,
            }}
          >
            Get started today
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 38px)",
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.6px",
              marginBottom: 14,
              lineHeight: 1.2,
            }}
          >
            Ready to start your<br />
            AI training journey?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--slate)",
              lineHeight: 1.65,
              maxWidth: 440,
            }}
          >
            Join thousands of learners and trainers already on the platform.
            Free to start. No credit card required.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <Link
            href="/signup"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--navy)",
              color: "white",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
          >
            Start learning free <ArrowRight size={16} />
          </Link>
          <Link
            href="/apply"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Become a trainer
          </Link>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .cta-inner{
            grid-template-columns: 1fr !important;
            padding: 40px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
