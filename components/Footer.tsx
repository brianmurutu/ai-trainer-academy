"use client";
import Link from "next/link";
import Image from "next/image";

const links = {
  Platform: [
    ["Find Trainers", "/trainers"],
    ["Browse Courses", "/courses"],
    ["Certifications", "/certifications"],
    ["Academy Modules", "/academy/modules"],
    ["AI Certification Exam", "/academy/exam"],
    ["For Business", "/business"],
  ],
  Trainers: [
    ["Become a Trainer", "/apply"],
    ["Trainer Dashboard", "/dashboard"],
    ["Payouts", "/payouts"],
    ["Trainer FAQ", "/faq/trainers"],
  ],
  Company: [
    ["About", "/about"],
    ["Blog", "/blog"],
    ["Careers", "/careers"],
    ["Contact", "/contact"],
  ],
  Legal: [
    ["Privacy Policy", "/privacy"],
    ["Terms of Service", "/terms"],
    ["Cookie Policy", "/cookies"],
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div
        style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 36px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 52,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <Image
                src="/logo.png"
                alt="AI Trainer Academy"
                width={36}
                height={36}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <span
                style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)" }}
              >
                AI Trainer{" "}
                <span style={{ color: "var(--accent)" }}>Academy</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: 230,
                marginBottom: 16,
              }}
            >
              The leading platform for AI model training education. Learn from
              verified experts worldwide.
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>
              Nairobi · London · San Francisco · Global
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--navy)",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  marginBottom: 16,
                }}
              >
                {section}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {items.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.12s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--ink)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            &copy; {currentYear} AI Trainer Academy. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            Payments via Paystack and Binance Pay &middot; Secure and encrypted
          </p>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){
          .footer-grid{grid-template-columns:1fr 1fr !important; gap:28px !important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </footer>
  );
}
