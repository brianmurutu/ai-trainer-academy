import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="cta-section">
      {/* Background decoration */}
      <div className="cta-orb cta-orb-left" aria-hidden="true" />
      <div className="cta-orb cta-orb-right" aria-hidden="true" />
      {/* Subtle grid pattern */}
      <div className="cta-grid-pattern" aria-hidden="true" />

      <div className="cta-inner">
        {/* Geometric accent mark */}
        <div className="cta-mark" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="0" y="0" width="22" height="22" rx="6" fill="rgba(96,165,250,0.18)" />
            <rect x="26" y="0" width="22" height="22" rx="6" fill="rgba(96,165,250,0.08)" />
            <rect x="0" y="26" width="22" height="22" rx="6" fill="rgba(96,165,250,0.08)" />
            <rect x="26" y="26" width="22" height="22" rx="6" fill="rgba(96,165,250,0.04)" />
          </svg>
        </div>

        <div className="cta-copy">
          <span className="cta-eyebrow">Get started today</span>
          <h2 className="cta-heading">
            Ready to start your<br />
            AI training journey?
          </h2>
          <p className="cta-sub">
            Join thousands of learners and trainers already on the platform.
            Free to start — no credit card required.
          </p>
        </div>

        <div className="cta-actions">
          <Link href="/signup" className="cta-btn-primary">
            Start learning free <ArrowRight size={16} />
          </Link>
          <Link href="/apply" className="cta-btn-secondary">
            Become a trainer <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        .cta-section {
          max-width: 1180px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
        }
        .cta-inner {
          background: linear-gradient(135deg, #0A0F1D 0%, #0E1527 45%, #161F38 100%);
          border-radius: 24px;
          padding: 64px 64px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 48px;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 32px 64px -12px rgba(10,15,29,0.35);
        }
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-orb-left {
          top: -40%; left: -15%;
          width: 50%; height: 160%;
          background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 65%);
        }
        .cta-orb-right {
          bottom: -50%; right: -15%;
          width: 40%; height: 150%;
          background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%);
        }
        .cta-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        /* Top shimmer line */
        .cta-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 40%, rgba(37,99,235,0.4) 60%, transparent 100%);
        }
        .cta-mark {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }
        .cta-copy {
          position: relative;
          z-index: 2;
        }
        .cta-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: rgba(96,165,250,0.8);
          text-transform: uppercase;
          letter-spacing: 1.8px;
          margin-bottom: 14px;
        }
        .cta-heading {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          color: white;
          letter-spacing: -0.8px;
          margin-bottom: 14px;
          line-height: 1.2;
        }
        .cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          max-width: 400px;
        }
        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: white;
          color: var(--navy);
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          transition: background 0.15s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }
        .cta-btn-primary:hover {
          background: var(--surface);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.3);
        }
        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: rgba(96,165,250,0.85);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          transition: color 0.15s ease, gap 0.15s ease;
        }
        .cta-btn-secondary:hover { color: #93C5FD; }
        @media (max-width: 900px) {
          .cta-inner {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 48px 36px;
          }
          .cta-mark { display: none; }
          .cta-actions { flex-direction: row; flex-wrap: wrap; align-items: center; }
        }
        @media (max-width: 560px) {
          .cta-section { padding: 40px 16px; }
          .cta-inner { padding: 40px 24px; border-radius: 18px; }
          .cta-actions { flex-direction: column; }
          .cta-btn-primary { width: 100%; }
        }
      `}</style>
    </section>
  );
}
