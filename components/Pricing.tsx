import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "KSH 0",
    period: "forever",
    desc: "Explore the platform and browse trainers before committing.",
    features: ["Browse trainer directory", "1 free resource per month", "Community forum access", "Basic profile"],
    cta: "Start free", href: "/signup", featured: false,
  },
  {
    name: "Pro",
    price: "KSH 1,500",
    period: "per month",
    desc: "Everything you need to learn fast with structured resources.",
    features: ["Unlimited resources", "Group training sessions", "Certificates on completion", "Priority support", "Course downloads"],
    cta: "Start Pro", href: "/signup?plan=pro", featured: true,
  },
  {
    name: "Elite",
    price: "KSH 4,500",
    period: "per month",
    desc: "Dedicated 1-on-1 time with top-rated trainers.",
    features: ["Everything in Pro", "4 hrs 1-on-1 sessions/month", "Priority trainer booking", "Personalised learning path", "Direct trainer messaging"],
    cta: "Go Elite", href: "/signup?plan=elite", featured: false,
  },
];

export default function Pricing() {
  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.8px", marginBottom: 12 }}>
            Start free. Upgrade when ready.
          </h2>
          <p style={{ fontSize: 15, color: "var(--slate)" }}>All plans include M-Pesa, card, and crypto payment options.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }} className="pricing-grid">
          {plans.map(({ name, price, period, desc, features, cta, href, featured }) => (
            <div key={name} style={{
              background: featured ? "var(--navy)" : "white",
              border: featured ? "none" : "1px solid var(--line)",
              borderRadius: 16, padding: "28px 24px",
              position: "relative",
            }}>
              {featured && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "var(--accent)", color: "white",
                  fontSize: 11, fontWeight: 600, padding: "4px 16px",
                  borderRadius: 20, whiteSpace: "nowrap",
                }}>Most popular</div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: featured ? "rgba(255,255,255,0.6)" : "var(--muted)", marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: featured ? "white" : "var(--navy)", letterSpacing: "-0.5px", marginBottom: 2 }}>{price}</div>
                <div style={{ fontSize: 12, color: featured ? "rgba(255,255,255,0.45)" : "var(--muted)", marginBottom: 12 }}>{period}</div>
                <p style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.65)" : "var(--slate)", lineHeight: 1.55 }}>{desc}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Check size={14} color={featured ? "rgba(255,255,255,0.7)" : "var(--green)"} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.75)" : "var(--slate)", lineHeight: 1.45 }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link href={href} style={{
                display: "block", textAlign: "center",
                padding: "11px", borderRadius: 10,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                background: featured ? "white" : "var(--navy)",
                color: featured ? "var(--navy)" : "white",
                transition: "opacity 0.15s",
              }}>{cta}</Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: "var(--muted)" }}>
          Looking to train your whole team?{" "}
          <Link href="/business" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>See business packages →</Link>
        </p>
      </div>
      <style>{`@media(max-width:768px){.pricing-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}
