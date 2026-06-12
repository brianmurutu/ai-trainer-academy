"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

const basePlans = [
  {
    name: "Free",
    priceKsh: 0, priceUsd: 0,
    period: "forever",
    desc: "Explore the platform and browse trainers before committing.",
    features: ["Browse trainer directory", "1 free resource per month", "Community forum access", "Basic profile"],
    cta: "Start free", href: "/signup", featured: false,
  },
  {
    name: "Pro",
    priceKsh: 1500, priceUsd: 12,
    period: "per month",
    desc: "Everything you need to learn fast with structured resources.",
    features: ["Unlimited resources", "Group training sessions", "Certificates on completion", "Priority support", "Course downloads"],
    cta: "Start Pro", href: "/signup?plan=pro", featured: true,
  },
  {
    name: "Elite",
    priceKsh: 4500, priceUsd: 35,
    period: "per month",
    desc: "Dedicated 1-on-1 time with top-rated trainers.",
    features: ["Everything in Pro", "4 hrs 1-on-1 sessions/month", "Priority trainer booking", "Personalised learning path", "Direct trainer messaging"],
    cta: "Go Elite", href: "/signup?plan=elite", featured: false,
  },
];

export default function Pricing() {
  const { formatPrice } = useCurrency();
  const [annual, setAnnual] = useState(false);

  return (
    <section style={{
      borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
      background: "linear-gradient(160deg, var(--surface) 0%, #EBF0FF 50%, var(--violet-light) 100%)",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p className="section-label">Pricing</p>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.8px", marginBottom: 12 }}>
            Start free. Upgrade when ready.
          </h2>
          <p style={{ fontSize: 15, color: "var(--slate)", marginBottom: 28 }}>All plans include M-Pesa, card, and crypto payment options.</p>

          {/* Annual / monthly toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: annual ? "var(--muted)" : "var(--navy)" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: annual ? "var(--accent)" : "var(--line)",
                border: "none", cursor: "pointer",
                position: "relative", transition: "background 0.2s",
              }}
            >
              <div style={{
                position: "absolute", top: 3, left: annual ? 25 : 3,
                width: 20, height: 20, borderRadius: "50%",
                background: "white",
                transition: "left 0.2s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 500, color: annual ? "var(--navy)" : "var(--muted)" }}>Annual</span>
            {annual && (
              <span style={{
                background: "var(--green-light)", color: "var(--green)",
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
              }}>Save 20%</span>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 960, margin: "0 auto" }} className="pricing-grid">
          {basePlans.map(({ name, priceKsh, priceUsd, period, desc, features, cta, href, featured }) => {
            const effectiveKsh = annual && priceKsh > 0 ? Math.round(priceKsh * 0.8) : priceKsh;
            const effectiveUsd = annual && priceUsd > 0 ? Math.round(priceUsd * 0.8) : priceUsd;
            const displayPrice = priceKsh === 0 ? "Free" : formatPrice(effectiveKsh, effectiveUsd);

            return (
              <div key={name} style={{
                background: featured ? "var(--navy)" : "white",
                border: featured ? "none" : "1px solid var(--line)",
                borderRadius: 18, padding: "32px 24px",
                position: "relative",
                boxShadow: featured
                  ? "0 0 0 1px var(--accent), 0 0 32px var(--accent-glow), var(--shadow-xl)"
                  : "var(--shadow-xs)",
                transition: "transform 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
              >
                {featured && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    background: "var(--grad-accent)", color: "white",
                    fontSize: 11, fontWeight: 700, padding: "4px 18px",
                    borderRadius: 20, whiteSpace: "nowrap",
                    boxShadow: "var(--shadow-accent)",
                  }}>Most popular</div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: featured ? "rgba(255,255,255,0.5)" : "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{name}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: featured ? "white" : "var(--navy)", letterSpacing: "-0.5px", marginBottom: 2 }}>{displayPrice}</div>
                  <div style={{ fontSize: 12, color: featured ? "rgba(255,255,255,0.4)" : "var(--muted)", marginBottom: 14 }}>
                    {priceKsh === 0 ? "no card needed" : (annual ? "billed annually" : period)}
                  </div>
                  <p style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.65)" : "var(--slate)", lineHeight: 1.6 }}>{desc}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Check size={14} color={featured ? "rgba(255,255,255,0.7)" : "var(--green)"} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: featured ? "rgba(255,255,255,0.75)" : "var(--slate)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href={href} style={{
                  display: "block", textAlign: "center",
                  padding: "12px", borderRadius: 10,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  background: featured ? "white" : "var(--accent)",
                  color: featured ? "var(--navy)" : "white",
                  transition: "opacity 0.15s, transform 0.1s",
                  boxShadow: featured ? "var(--shadow-sm)" : "var(--shadow-accent)",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >{cta}</Link>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "var(--muted)" }}>
          Looking to train your whole team?{" "}
          <Link href="/business" style={{
            color: "var(--accent)", textDecoration: "none", fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 4,
          }}>
            See business packages <ArrowRight size={13} />
          </Link>
        </p>
      </div>
      <style>{`@media(max-width:768px){.pricing-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}
