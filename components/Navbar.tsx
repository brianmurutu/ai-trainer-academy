"use client";
import { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
import { Menu, X, Brain } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.96)",
      borderBottom: "1px solid var(--line)",
      backdropFilter: "blur(8px)",
    }}>
=======
import { Menu, X, GraduationCap } from "lucide-react";
import { useCurrency, Currency } from "@/components/CurrencyProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const navLinks = [
    ["Find Trainers", "/trainers"],
    ["Courses", "/courses"],
    ["Academy", "/academy/modules"],
    ["For Business", "/business"],
    ["Become a Trainer", "/apply"]
  ] as const;

  return (
    <header 
      className="glass"
      style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255, 255, 255, 0.8)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
      }}
    >
>>>>>>> d950e182d713accc40d6b00347024f8418854729
      <nav style={{
        maxWidth: 1180, margin: "0 auto",
        padding: "0 24px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
<<<<<<< HEAD
            width: 34, height: 34, background: "var(--navy)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
=======
            width: 34, height: 34, 
            background: "var(--gradient-accent)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)"
>>>>>>> d950e182d713accc40d6b00347024f8418854729
          }}>
            <GraduationCap size={18} color="white" />
          </div>
<<<<<<< HEAD
          <span style={{ fontWeight: 600, fontSize: 16, color: "var(--navy)", letterSpacing: "-0.3px" }}>
=======
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--navy)", letterSpacing: "-0.4px" }}>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
            AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
          </span>
        </Link>
 
        {/* Desktop nav */}
<<<<<<< HEAD
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
          {[["Find Trainers", "/trainers"], ["Courses", "/courses"], ["For Business", "/business"], ["Become a Trainer", "/apply"]].map(([label, href]) => (
            <Link key={href} href={href} style={{
              fontSize: 14, color: "var(--slate)", textDecoration: "none", fontWeight: 400,
              transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--navy)")}
=======
        <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="desktop-nav">
          {navLinks.map(([label, href]) => (
            <Link key={href} href={href} style={{
              fontSize: 14, color: "var(--slate)", textDecoration: "none", fontWeight: 500,
              transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
>>>>>>> d950e182d713accc40d6b00347024f8418854729
              onMouseLeave={e => (e.currentTarget.style.color = "var(--slate)")}
            >{label}</Link>
          ))}
        </div>
 
        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="desktop-nav">
<<<<<<< HEAD
          <Link href="/login" style={{
            fontSize: 14, color: "var(--slate)", textDecoration: "none",
            padding: "8px 16px", borderRadius: 8, fontWeight: 400,
          }}>Log in</Link>
          <Link href="/signup" style={{
            fontSize: 14, background: "var(--navy)", color: "white",
            textDecoration: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 500,
          }}>Get started</Link>
=======
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
                transition: "all 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--muted)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
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
 
          <Link href="/login" style={{
            fontSize: 14, color: "var(--slate)", textDecoration: "none",
            padding: "8px 16px", borderRadius: 8, fontWeight: 500,
            transition: "color 0.15s"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--navy)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--slate)"}
          >Log in</Link>
          <Link href="/signup" style={{
            fontSize: 14, background: "var(--gradient-accent)", color: "white",
            textDecoration: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 600,
            boxShadow: "0 2px 10px rgba(37, 99, 235, 0.15)",
            transition: "all 0.2s"
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(37, 99, 235, 0.15)";
            }}
          >Get started</Link>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
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
<<<<<<< HEAD
          {[["Find Trainers", "/trainers"], ["Courses", "/courses"], ["For Business", "/business"], ["Become a Trainer", "/apply"]].map(([label, href]) => (
=======
          {navLinks.map(([label, href]) => (
>>>>>>> d950e182d713accc40d6b00347024f8418854729
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0",
              fontSize: 15, color: "var(--ink)", textDecoration: "none",
              borderBottom: "1px solid var(--line)",
            }}>{label}</Link>
          ))}
<<<<<<< HEAD
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
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
=======
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
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/login" onClick={() => setOpen(false)} style={{
                flex: 1, textAlign: "center", padding: "10px",
                border: "1px solid var(--line)", borderRadius: 8,
                fontSize: 14, color: "var(--ink)", textDecoration: "none",
              }}>Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)} style={{
                flex: 1, textAlign: "center", padding: "10px",
                background: "var(--navy)", borderRadius: 8,
                fontSize: 14, color: "white", textDecoration: "none", fontWeight: 500,
              }}>Get started</Link>
            </div>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
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
