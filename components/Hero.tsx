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
          border-bottom: 1px solid var(--navy-700);
          background: var(--navy);
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: -20%; left: -10%;
          width: 70%; height: 90%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 88px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.25);
          border-radius: 20px;
          padding: 5px 14px 5px 10px;
          font-size: 13px;
          color: #60A5FA;
          font-weight: 600;
          margin-bottom: 28px;
        }
        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3B82F6;
          display: inline-block;
          flex-shrink: 0;
          box-shadow: 0 0 8px #2563EB;
        }
        .hero-heading {
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: white;
          margin-bottom: 22px;
        }
        .hero-sub {
          font-size: 17px;
          color: #94A3B8;
          line-height: 1.75;
          max-width: 450px;
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
          background: var(--gradient-accent);
          color: white;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
          transition: all 0.2s ease;
          letter-spacing: -0.2px;
        }
        .btn-primary:hover { 
          transform: translateY(-1px); 
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4); 
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.15s ease;
        }
        .btn-secondary:hover { 
          background: rgba(255, 255, 255, 0.1); 
          border-color: rgba(255, 255, 255, 0.35); 
        }
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
          color: #94A3B8;
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
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .hero-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .hero-stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 14px;
          padding: 18px 20px;
          transition: all 0.2s ease;
        }
        .hero-stat-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(37, 99, 235, 0.3);
          transform: translateY(-2px);
        }
        .hero-stat-num {
          font-size: 26px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .hero-stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #E2E8F0;
          margin-bottom: 2px;
        }
        .hero-stat-sub {
          font-size: 11px;
          color: #94A3B8;
        }
        .hero-trainer-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .trainer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gradient-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
        }
        .trainer-badge-available {
          background: rgba(16, 185, 129, 0.12);
          color: #34D399;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .tag-chip {
          font-size: 11px;
          padding: 3px 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          color: #E2E8F0;
          border: 1px solid rgba(255, 255, 255, 0.1);
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
