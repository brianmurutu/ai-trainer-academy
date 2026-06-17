"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Brain } from "lucide-react";
import { useCurrency, Currency } from "@/components/CurrencyProvider";
import { useLanguage, Language } from "@/components/LanguageProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    [t("find_trainers"), "/trainers"],
    [t("courses"), "/courses"],
    [t("academy"), "/academy/modules"],
    [t("business"), "/business"],
    [t("become_trainer"), "/apply"]
  ] as const;

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
        <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="desktop-nav">
          {navLinks.map(([label, href]) => (
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="desktop-nav">
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
              }}
            >
              <option value="USD">USD ($)</option>
              <option value="KES">KES (KSh)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <svg
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="10" height="6" viewBox="0 0 10 6" fill="none"
            >
              <path d="M1 1l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Language Selector */}
          <div style={{ position: "relative" }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
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
              }}
            >
              <option value="EN">EN (English)</option>
              <option value="SW">SW (Kiswahili)</option>
              <option value="ES">ES (Español)</option>
              <option value="FR">FR (Français)</option>
              <option value="DE">DE (Deutsch)</option>
            </select>
            <svg
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="10" height="6" viewBox="0 0 10 6" fill="none"
            >
              <path d="M1 1l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <Link href="/login" style={{
            fontSize: 14, color: "var(--slate)", textDecoration: "none",
            padding: "8px 16px", borderRadius: 8, fontWeight: 400,
          }}>{t("log_in")}</Link>
          <Link href="/signup" style={{
            fontSize: 14, background: "var(--navy)", color: "white",
            textDecoration: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 500,
          }}>{t("get_started")}</Link>
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
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0",
              fontSize: 15, color: "var(--ink)", textDecoration: "none",
              borderBottom: "1px solid var(--line)",
            }}>{label}</Link>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            <div style={{ display: "flex", gap: 10 }}>
              {/* Mobile Currency Selector */}
              <div style={{ position: "relative", flex: 1 }}>
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
                    width: "100%",
                  }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="KES">KES (KSh)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
                <svg
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                >
                  <path d="M1 1l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Mobile Language Selector */}
              <div style={{ position: "relative", flex: 1 }}>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
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
                    width: "100%",
                  }}
                >
                  <option value="EN">EN</option>
                  <option value="SW">SW</option>
                  <option value="ES">ES</option>
                  <option value="FR">FR</option>
                  <option value="DE">DE</option>
                </select>
                <svg
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                >
                  <path d="M1 1l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/login" onClick={() => setOpen(false)} style={{
                flex: 1, textAlign: "center", padding: "10px",
                border: "1px solid var(--line)", borderRadius: 8,
                fontSize: 14, color: "var(--ink)", textDecoration: "none",
              }}>{t("log_in")}</Link>
              <Link href="/signup" onClick={() => setOpen(false)} style={{
                flex: 1, textAlign: "center", padding: "10px",
                background: "var(--navy)", borderRadius: 8,
                fontSize: 14, color: "white", textDecoration: "none", fontWeight: 500,
              }}>{t("get_started")}</Link>
            </div>
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
