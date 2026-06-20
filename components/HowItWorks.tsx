import { UserPlus, Search, CreditCard, Award, BookOpen, CheckSquare, DollarSign, Users } from "lucide-react";

const learnerSteps = [
  { icon: UserPlus, title: "Create an account", desc: "Sign up free in under 2 minutes. No credit card required." },
  { icon: Search, title: "Find your trainer", desc: "Browse verified experts by speciality, rating, price, or availability." },
  { icon: CreditCard, title: "Pay your way", desc: "M-Pesa, card (KSH/USD), or crypto via Binance. Instant confirmation." },
  { icon: Award, title: "Learn and certify", desc: "Complete your training and earn a shareable, employer-recognised certificate." },
];

const trainerSteps = [
  { icon: BookOpen, title: "Apply to teach", desc: "Submit your credentials and expertise. No upfront cost." },
  { icon: CheckSquare, title: "Get approved", desc: "Our team reviews your application within 48 hours." },
  { icon: Users, title: "List your services", desc: "Set your own rates, availability, and course catalogue." },
  { icon: DollarSign, title: "Earn and grow", desc: "Keep 80% of every session. Weekly payouts to M-Pesa or bank." },
];

export default function HowItWorks() {
  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>How it works</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.8px" }}>
            Simple for learners. Rewarding for trainers.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="how-grid">
          {[
            { title: "For learners", steps: learnerSteps, accent: "var(--accent)", accentLight: "var(--accent-light)" },
            { title: "For trainers", steps: trainerSteps, accent: "var(--green)", accentLight: "var(--green-light)" },
          ].map(({ title, steps, accent, accentLight }) => (
            <div key={title}>
              <div style={{
                display: "inline-block", fontSize: 13, fontWeight: 500,
                color: accent, background: accentLight,
                padding: "5px 14px", borderRadius: 20, marginBottom: 28,
              }}>{title}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {steps.map(({ icon: Icon, title: stepTitle, desc }, i) => (
                  <div key={stepTitle} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 0", borderBottom: i < steps.length - 1 ? "1px solid var(--line)" : "none" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: accentLight, display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={17} color={accent} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--navy)", marginBottom: 3 }}>{stepTitle}</div>
                      <div style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.55 }}>{desc}</div>
                    </div>
                    <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>0{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.how-grid{grid-template-columns:1fr !important; gap:32px !important;}}`}</style>
    </section>
  );
}
