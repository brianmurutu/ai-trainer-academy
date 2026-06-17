"use client";
import { useState } from "react";
import Link from "next/link";
import { Brain } from "lucide-react";

const links = {
  Platform: [["Find Trainers", "/trainers"], ["Browse Courses", "/courses"], ["Certifications", "/certifications"], ["For Business", "/business"]],
  Trainers: [["Become a Trainer", "/apply"], ["Trainer Dashboard", "/dashboard"], ["Payouts", "/payouts"], ["Trainer FAQ", "/faq/trainers"]],
  Company: [["About", "/about"], ["Blog", "/blog"], ["Careers", "/careers"], ["Contact", "/contact"]],
  Legal: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"]],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32,
                background: "var(--grad-accent)",
                borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px var(--accent-glow)",
              }}>
                <Brain size={16} color="white" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)" }}>
                AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, maxWidth: 220, marginBottom: 20 }}>
              The leading platform for AI model training education. Learn from verified experts worldwide.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {/* X / Twitter */}
              <a href="https://x.com/aitraineracademy" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{
                width: 34, height: 34, borderRadius: 8,
                background: "var(--surface)", border: "1px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--slate)", transition: "border-color 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.color = "var(--slate)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/aitraineracademy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{
                width: 34, height: 34, borderRadius: 8,
                background: "var(--surface)", border: "1px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--slate)", transition: "border-color 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.color = "var(--slate)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com/aitraineracademy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{
                width: 34, height: 34, borderRadius: 8,
                background: "var(--surface)", border: "1px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--slate)", transition: "border-color 0.15s, color 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLElement).style.color = "var(--slate)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Newsletter signup */}
            {subscribed ? (
              <p style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>Thanks! You are subscribed.</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 6 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  style={{
                    flex: 1, padding: "8px 12px", borderRadius: 8,
                    border: "1px solid var(--line)", fontSize: 13,
                    color: "var(--ink)", background: "white",
                    outline: "none", minWidth: 0,
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={e => (e.target.style.borderColor = "var(--line)")}
                />
                <button type="submit" style={{
                  padding: "8px 14px", borderRadius: 8,
                  background: "var(--accent)", color: "white",
                  border: "none", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", whiteSpace: "nowrap",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-dark)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}
                >Subscribe</button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{section}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(([label, href]) => (
                  <Link key={label} href={href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            &copy; {year} AI Trainer Academy. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            Payments via Paystack and Binance Pay | Secure and encrypted
          </p>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important; gap:28px !important;}} @media(max-width:480px){.footer-grid{grid-template-columns:1fr !important;}}`}</style>
    </footer>
  );
}
