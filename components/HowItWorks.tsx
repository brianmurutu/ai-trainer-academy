import { UserPlus, Search, CreditCard, Award, BookOpen, CheckSquare, DollarSign, Users } from "lucide-react";

const learnerSteps = [
  { icon: UserPlus,   title: "Create an account",   desc: "Sign up free in under 2 minutes. No credit card required to get started." },
  { icon: Search,     title: "Find your trainer",   desc: "Browse verified experts by speciality, rating, price, or availability." },
  { icon: CreditCard, title: "Pay your way",        desc: "M-Pesa, card (KES/USD), or crypto via Binance Pay. Instant confirmation." },
  { icon: Award,      title: "Learn and certify",   desc: "Complete your training and earn a shareable, employer-recognised certificate." },
];

const trainerSteps = [
  { icon: BookOpen,    title: "Apply to teach",    desc: "Submit your credentials and expertise. No upfront cost, no waiting fee." },
  { icon: CheckSquare, title: "Get approved",      desc: "Our team reviews every application within 48 hours and sends you a decision." },
  { icon: Users,       title: "List your services", desc: "Set your own rates, availability windows, and course catalogue." },
  { icon: DollarSign,  title: "Earn and grow",     desc: "Keep 80% of every session. Weekly payouts to M-Pesa or bank." },
];

export default function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="hiw-inner">
        {/* Section header */}
        <div className="hiw-header">
          <span className="hiw-eyebrow">How it works</span>
          <h2 className="hiw-heading">
            Simple for learners.<br />
            <span style={{ color: "var(--accent)" }}>Rewarding for trainers.</span>
          </h2>
        </div>

        {/* Two-column step panels */}
        <div className="hiw-grid">
          {[
            { title: "For learners",  steps: learnerSteps,  accent: "var(--accent)",  light: "var(--accent-light)" },
            { title: "For trainers",  steps: trainerSteps,  accent: "var(--green)",   light: "var(--green-light)" },
          ].map(({ title, steps, accent, light }) => (
            <div key={title} className="hiw-panel">
              <div className="hiw-panel-label" style={{ color: accent, background: light }}>
                {title}
              </div>

              <div className="hiw-steps">
                {steps.map(({ icon: Icon, title: stepTitle, desc }, i) => (
                  <div key={stepTitle} className={`hiw-step${i < steps.length - 1 ? " hiw-step-border" : ""}`}>
                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <div className="hiw-connector" style={{ borderColor: `${accent}30` }} />
                    )}

                    <div className="hiw-step-icon" style={{ background: light }}>
                      <Icon size={17} color={accent} />
                    </div>
                    <div className="hiw-step-body">
                      <div className="hiw-step-title">{stepTitle}</div>
                      <div className="hiw-step-desc">{desc}</div>
                    </div>
                    <div className="hiw-step-num" style={{ color: accent }}>
                      0{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hiw-section {
          background: var(--surface);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }
        .hiw-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(239,246,255,0.4) 100%);
          pointer-events: none;
        }
        .hiw-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 80px 24px;
          position: relative;
          z-index: 1;
        }
        .hiw-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .hiw-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 14px;
        }
        .hiw-heading {
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 700;
          color: var(--navy);
          letter-spacing: -1px;
          line-height: 1.2;
        }
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        .hiw-panel {
          background: white;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
          transition: box-shadow 0.2s ease;
        }
        .hiw-panel:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .hiw-panel-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 28px;
          letter-spacing: 0.3px;
        }
        .hiw-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .hiw-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 18px 0;
          position: relative;
        }
        .hiw-step-border {
          border-bottom: 1px solid var(--line);
        }
        .hiw-connector {
          position: absolute;
          left: 17px;
          bottom: 0;
          top: 52px;
          width: 0;
          border-left: 2px dashed;
          opacity: 0.5;
        }
        .hiw-step-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hiw-step:hover .hiw-step-icon {
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .hiw-step-body { flex: 1; }
        .hiw-step-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 3px;
        }
        .hiw-step-desc {
          font-size: 13px;
          color: var(--slate);
          line-height: 1.6;
        }
        .hiw-step-num {
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-mono);
          flex-shrink: 0;
          opacity: 0.6;
          margin-top: 2px;
        }
        @media (max-width: 768px) {
          .hiw-grid { grid-template-columns: 1fr; }
          .hiw-connector { display: none; }
        }
      `}</style>
    </section>
  );
}
