"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

const stats = [
  { num: "340+", label: "Vetted trainers", sub: "active on the platform" },
  { num: "12K+", label: "Learners enrolled", sub: "across 40+ countries" },
  { num: "4.9★", label: "Avg. trainer rating", sub: "from verified reviews" },
  { num: "98%",  label: "Satisfaction rate",  sub: "post-session surveys" },
];

const trustPoints = [
  "Every trainer is personally vetted by our team",
  "Pay in USD, EUR, GBP, KES, or crypto",
  "Credentials that employers actually ask for",
];

export default function Hero() {
  const { formatPrice } = useCurrency();

  return (
    <section className="hero-section">
      {/* Ambient background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="hero-container">
        {/* ── Left copy ─────────────────────────────────────── */}
        <div className="hero-copy">
          {/* Badge */}
          <div className="hero-badge">
            <span className="pulse-dot" />
            Trainer applications now open
          </div>

          <h1 className="hero-heading">
            Learn machine learning<br />
            skills from<br />
            <span className="gradient-text">real practitioners</span>
          </h1>

          <p className="hero-sub">
            Connect with trainers who work in the field every day. Get
            structured guidance on fine-tuning, RLHF, and prompt engineering —
            then leave with a certificate your employer will recognise.
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="btn-primary glow-hover">
              Start learning free <ArrowRight size={16} />
            </Link>
            <Link href="/apply" className="btn-secondary">
              Become a trainer
            </Link>
          </div>

          <div className="hero-trust">
            {trustPoints.map((point) => (
              <div key={point} className="hero-trust-row">
                <CheckCircle2 size={15} color="var(--green)" strokeWidth={2.5} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right visual ──────────────────────────────────── */}
        <div className="hero-visual">
          {/* Logo card */}
          <div className="hero-logo-card glass-dark animate-fade-in">
            <Image
              src="/logo.png"
              alt="AI Trainer Academy"
              width={96}
              height={96}
              style={{ borderRadius: 14, objectFit: "cover", flexShrink: 0 }}
              priority
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: "white", lineHeight: 1.25 }}>
                AI Trainer Academy
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 5 }}>
                The specialist platform for AI model training
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="hero-stats-grid">
            {stats.map(({ num, label, sub }) => (
              <div key={label} className="hero-stat-card glass-dark">
                <div className="hero-stat-num">{num}</div>
                <div className="hero-stat-label">{label}</div>
                <div className="hero-stat-sub">{sub}</div>
              </div>
            ))}
          </div>

          {/* Sample trainer card */}
          <div className="hero-trainer-card glass-dark">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div className="trainer-avatar">JM</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "white" }}>
                  James Mwangi
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                  Fine-tuning and RLHF specialist
                </div>
              </div>
              <div className="trainer-badge-available">Available</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {["Fine-tuning", "RLHF", "LLaMA", "GPT-4"].map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                128 sessions &middot; 4.9 stars
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#60A5FA" }}>
                {formatPrice(2500, 20)}/hr
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background: var(--navy);
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        /* Ambient orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-orb-1 {
          top: -20%; left: -12%;
          width: 60%; height: 90%;
          background: radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%);
        }
        .hero-orb-2 {
          bottom: -30%; right: -8%;
          width: 45%; height: 80%;
          background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%);
        }
        .hero-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 96px 24px 88px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(37,99,235,0.1);
          border: 1px solid rgba(37,99,235,0.28);
          border-radius: 24px;
          padding: 6px 16px 6px 12px;
          font-size: 13px;
          color: #93C5FD;
          font-weight: 600;
          margin-bottom: 30px;
          letter-spacing: -0.1px;
        }
        /* Heading */
        .hero-heading {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -2px;
          color: white;
          margin-bottom: 22px;
        }
        .hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.58);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 36px;
        }
        /* Actions */
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 36px;
          align-items: center;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gradient-accent);
          color: white;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          box-shadow: 0 4px 20px rgba(37,99,235,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          letter-spacing: -0.2px;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,99,235,0.45);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.13);
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.28);
        }
        /* Trust */
        .hero-trust {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
        }
        /* Right visual */
        .hero-visual {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hero-logo-card {
          display: flex;
          align-items: center;
          gap: 18px;
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
          transition: transform 0.3s ease;
        }
        .hero-logo-card:hover { transform: translateY(-2px); }
        /* Stats */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .hero-stat-card {
          border-radius: 14px;
          padding: 20px 22px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .hero-stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(37,99,235,0.3) !important;
        }
        .hero-stat-num {
          font-size: 28px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 5px;
        }
        .hero-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          margin-bottom: 2px;
        }
        .hero-stat-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }
        /* Trainer card */
        .hero-trainer-card {
          border-radius: 14px;
          padding: 18px 20px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
          transition: transform 0.3s ease;
        }
        .hero-trainer-card:hover { transform: translateY(-2px); }
        .trainer-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--gradient-accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: white; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(37,99,235,0.3);
        }
        .trainer-badge-available {
          background: rgba(16,185,129,0.15);
          color: #34D399;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          border: 1px solid rgba(16,185,129,0.2);
        }
        .tag-chip {
          font-size: 11px;
          padding: 3px 10px;
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 64px 20px 56px;
          }
          .hero-heading { font-size: clamp(32px, 8vw, 48px); }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .hero-stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
      `}</style>
    </section>
  );
}
