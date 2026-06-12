"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Brain } from "lucide-react";
import { useCurrency, Currency } from "@/components/CurrencyProvider";

const NAV_LINKS = [
  ["Find Trainers", "/trainers"],
  ["Courses", "/courses"],
  ["For Business", "/business"],
  ["Become a Trainer", "/apply"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const pathname = usePathname();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.96)",
      borderBottom: "1px solid var(--line)",
      backdropFilter: "blur(12px)",
    }}>
      <nav style={{
        maxWidth: 1180, margin: "0 auto",
        padding: "0 24px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: "var(--grad-accent)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px var(--accent-glow)",
          }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--navy)", letterSpacing: "-0.3px" }}>
            AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {NAV_LINKS.map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} style={{
                fontSize: 14,
                color: isActive ? "var(--accent)" : "var(--slate)",
                textDecoration: "none",
                fontWeight: isActive ? 600 : 400,
                transition: "color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = isActive ? "var(--accent)" : "var(--navy)")}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? "var(--accent)" : "var(--slate)")}
              >{label}</Link>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }} className="desktop-nav">
          {/* Currency Selector */}
          <div style={{ position: "relative" }}>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "6px 28px 6px 10px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--navy)",
                cursor: "pointer",
                outline: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--line)"; e.target.style.boxShadow = "none"; }}
            >
              <option value="USD">USD ($)</option>
              <option value="KES">KES (KSh)</option>
              <option value="EUR">EUR (\u20ac)</option>
              <option value="GBP">GBP (\u00a3)</option>
            </select>
            {/* Custom chevron */}
            <svg
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="10" height="6" viewBox="0 0 10 6" fill="none"
            >
              <path d="M1 1l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <Link href="/login" style={{
            fontSize: 14, color: "var(--slate)", textDecoration: "none",
            padding: "8px 16px", borderRadius: 8, fontWeight: 500,
            transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--navy)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--slate)")}
          >Log in</Link>

          {/* CTA with glowPulse ring */}
          <div style={{ position: "relative", display: "inline-flex" }}>
            <div style={{
              position: "absolute", inset: -3,
              borderRadius: 11,
              animation: "glowPulse 2s ease-in-out infinite",
              pointerEvents: "none",
            }} />
            <Link href="/signup" style={{
              fontSize: 14, background: "var(--accent)", color: "white",
              textDecoration: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 600,
              boxShadow: "var(--shadow-accent)",
              transition: "background 0.15s, transform 0.1s",
              position: "relative",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent-dark)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >Get started</Link>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: "var(--navy)", padding: 4,
        }} className="mobile-menu-btn" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu — smooth max-height transition */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "500px" : "0px",
        transition: "max-height 0.3s ease",
        borderTop: open ? "1px solid var(--line)" : "none",
        background: "white",
      }}>
        <div style={{ padding: "16px 24px 24px" }}>
          {NAV_LINKS.map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{
                display: "block", padding: "12px 0",
                fontSize: 15,
                color: isActive ? "var(--accent)" : "var(--ink)",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                borderBottom: "1px solid var(--line)",
              }}>{label}</Link>
            );
          })}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {/* Mobile Currency Selector */}
            <div style={{ position: "relative" }}>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  padding: "10px 28px 10px 10px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--navy)",
                  cursor: "pointer",
                  outline: "none",
                  width: 110,
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="KES">KES (KSh)</option>
                <option value="EUR">EUR (\u20ac)</option>
                <option value="GBP">GBP (\u00a3)</option>
              </select>
              <svg
                style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                width="10" height="6" viewBox="0 0 10 6" fill="none"
              >
                <path d="M1 1l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <Link href="/login" style={{
              flex: 1, textAlign: "center", padding: "10px",
              border: "1px solid var(--line)", borderRadius: 8,
              fontSize: 14, color: "var(--ink)", textDecoration: "none", fontWeight: 500,
            }}>Log in</Link>
            <Link href="/signup" style={{
              flex: 1, textAlign: "center", padding: "10px",
              background: "var(--accent)", borderRadius: 8,
              fontSize: 14, color: "white", textDecoration: "none", fontWeight: 600,
            }}>Get started</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
