"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

const stats = [
  { num: "340+", label: "Verified trainers", sub: "active on the platform" },
  { num: "12K+", label: "Learners enrolled", sub: "across 40+ countries" },
  { num: "4.9", label: "Avg. trainer rating", sub: "out of 5 stars" },
  { num: "98%", label: "Satisfaction rate", sub: "from post-session reviews" },
];

const trustPoints = [
  "Vetted and approved trainers only",
  "Pay in USD, EUR, GBP, KES, or crypto",
  "Certificates recognised by employers",
];

export default function Hero() {
  const { formatPrice } = useCurrency();

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left column */}
        <div className="hero-copy">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now accepting trainer applications
          </div>

          <h1 className="hero-heading">
            Learn to train<br />
            AI models from<br />
            <span style={{ color: "var(--accent)" }}>real experts</span>
          </h1>

          <p className="hero-sub">
            Connect with verified AI trainers, access structured courses on
            fine-tuning, RLHF, and prompt engineering, and earn recognised
            certifications.
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="btn-primary">
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

        {/* Right column */}
        <div className="hero-visual">
          {/* Logo card */}
          <div className="hero-logo-card">
            <Image
              src="/logo.png"
              alt="AI Trainer Academy"
              width={96}
              height={96}
              style={{ borderRadius: 16, objectFit: "cover" }}
              priority
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "var(--navy)", lineHeight: 1.2 }}>
                AI Trainer Academy
              </div>
              <div style={{ fontSize: 13, color: "var(--slate)", marginTop: 4 }}>
                The specialist platform for AI model training
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="hero-stats-grid">
            {stats.map(({ num, label, sub }) => (
              <div key={label} className="hero-stat-card">
                <div className="hero-stat-num">{num}</div>
                <div className="hero-stat-label">{label}</div>
                <div className="hero-stat-sub">{sub}</div>
              </div>
            ))}
          </div>

          {/* Sample trainer card */}
          <div className="hero-trainer-card">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div className="trainer-avatar">JM</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "var(--navy)" }}>
                  James Mwangi
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>
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
              alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--line)",
            }}>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                128 sessions &middot; 4.9 stars
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>
                {formatPrice(2500, 20)}/hr
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          border-bottom: 1px solid var(--line);
          background: linear-gradient(180deg, #fff 0%, var(--surface) 100%);
        }
        .hero-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 88px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-light);
          border: 1px solid #C5DEFA;
          border-radius: 20px;
          padding: 5px 14px 5px 10px;
          font-size: 13px;
          color: var(--accent);
          font-weight: 500;
          margin-bottom: 28px;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
          flex-shrink: 0;
        }
        .hero-heading {
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: var(--navy);
          margin-bottom: 22px;
        }
        .hero-sub {
          font-size: 17px;
          color: var(--slate);
          line-height: 1.75;
          max-width: 420px;
          margin-bottom: 36px;
        }
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
          background: var(--navy);
          color: white;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.15s, transform 0.1s;
          letter-spacing: -0.2px;
        }
        .btn-primary:hover { background: var(--accent-dark); transform: translateY(-1px); }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: var(--ink);
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          border: 1px solid var(--line);
          transition: border-color 0.15s;
        }
        .btn-secondary:hover { border-color: #b5cfe8; }
        .hero-trust {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13.5px;
          color: var(--slate);
        }
        .hero-visual {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .hero-logo-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: white;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 2px 12px rgba(13,27,42,0.04);
        }
        .hero-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .hero-stat-card {
          background: white;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px 20px;
          transition: box-shadow 0.15s;
        }
        .hero-stat-card:hover {
          box-shadow: 0 4px 16px rgba(26,111,191,0.07);
        }
        .hero-stat-num {
          font-size: 26px;
          font-weight: 700;
          color: var(--navy);
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .hero-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 2px;
        }
        .hero-stat-sub {
          font-size: 11px;
          color: var(--muted);
        }
        .hero-trainer-card {
          background: white;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 2px 12px rgba(13,27,42,0.04);
        }
        .trainer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        .trainer-badge-available {
          background: var(--green-light);
          color: var(--green);
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .tag-chip {
          font-size: 11px;
          padding: 3px 10px;
          background: var(--surface);
          border-radius: 20px;
          color: var(--slate);
          border: 1px solid var(--line);
        }
        @media (max-width: 900px) {
          .hero-container { grid-template-columns: 1fr; gap: 48px; padding: 56px 20px 48px; }
          .hero-heading { font-size: clamp(30px, 8vw, 44px); }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
