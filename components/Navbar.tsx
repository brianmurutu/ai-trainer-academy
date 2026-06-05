"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Brain } from "lucide-react";
import { useCurrency, Currency } from "@/components/CurrencyProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.96)",
      borderBottom: "1px solid var(--line)",
      backdropFilter: "blur(8px)",
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
            width: 34, height: 34, background: "var(--navy)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, color: "var(--navy)", letterSpacing: "-0.3px" }}>
            AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {[["Find Trainers", "/trainers"], ["Courses", "/courses"], ["For Business", "/business"], ["Become a Trainer", "/apply"]].map(([label, href]) => (
            <Link key={href} href={href} style={{
              fontSize: 14, color: "var(--slate)", textDecoration: "none", fontWeight: 400,
              transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--navy)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--slate)")}
            >{label}</Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }} className="desktop-nav">
          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 6,
              padding: "5px 8px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--navy)",
              cursor: "pointer",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--line)"}
          >
            <option value="USD">USD ($)</option>
            <option value="KES">KES (KSh)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          <Link href="/login" style={{
            fontSize: 14, color: "var(--slate)", textDecoration: "none",
            padding: "8px 16px", borderRadius: 8, fontWeight: 400,
          }}>Log in</Link>
          <Link href="/signup" style={{
            fontSize: 14, background: "var(--navy)", color: "white",
            textDecoration: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 500,
          }}>Get started</Link>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: "var(--navy)", padding: 4,
        }} className="mobile-menu-btn" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          borderTop: "1px solid var(--line)", background: "white",
          padding: "16px 24px 24px",
        }}>
          {[["Find Trainers", "/trainers"], ["Courses", "/courses"], ["For Business", "/business"], ["Become a Trainer", "/apply"]].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0",
              fontSize: 15, color: "var(--ink)", textDecoration: "none",
              borderBottom: "1px solid var(--line)",
            }}>{label}</Link>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {/* Mobile Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "10px",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--navy)",
                cursor: "pointer",
                outline: "none",
                width: 100,
                textAlign: "center"
              }}
            >
              <option value="USD">USD ($)</option>
              <option value="KES">KES (KSh)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>

            <Link href="/login" style={{
              flex: 1, textAlign: "center", padding: "10px",
              border: "1px solid var(--line)", borderRadius: 8,
              fontSize: 14, color: "var(--ink)", textDecoration: "none",
            }}>Log in</Link>
            <Link href="/signup" style={{
              flex: 1, textAlign: "center", padding: "10px",
              background: "var(--navy)", borderRadius: 8,
              fontSize: 14, color: "white", textDecoration: "none", fontWeight: 500,
            }}>Get started</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
