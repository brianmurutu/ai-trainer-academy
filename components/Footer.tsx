"use client";
import Link from "next/link";
import { Brain } from "lucide-react";

const links = {
  Platform: [
    ["Find Trainers", "/trainers"],
    ["Browse Courses", "/courses"],
    ["Certifications", "/certifications"],
    ["Academy Modules", "/academy/modules"],
    ["AI Certification Exam", "/academy/exam"],
    ["For Business", "/business"]
  ],
  Trainers: [["Become a Trainer", "/apply"], ["Trainer Dashboard", "/dashboard"], ["Payouts", "/payouts"], ["Trainer FAQ", "/faq/trainers"]],
  Company: [["About", "/about"], ["Blog", "/blog"], ["Careers", "/careers"], ["Contact", "/contact"]],
  Legal: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"]],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "52px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, background: "var(--navy)",
                borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Brain size={16} color="white" />
              </div>
              <span style={{ fontWeight: 600, fontSize: 15, color: "var(--navy)" }}>
                AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, maxWidth: 220, marginBottom: 16 }}>
              The leading platform for AI model training education. Learn from verified experts worldwide.
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>San Francisco · London · Tokyo · Global</p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{section}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(([label, href]) => (
                  <Link key={label} href={href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>© 2026 AI Trainer Academy. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>Payments via Paystack & Binance Pay · Secure & encrypted</p>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important; gap:28px !important;}} @media(max-width:480px){.footer-grid{grid-template-columns:1fr !important;}}`}</style>
    </footer>
  );
}
