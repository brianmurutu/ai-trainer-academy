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

const socials = [
  {
    name: "X / Twitter",
    href: "https://x.com/aitraineracademy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.76l7.73-8.835L1.254 2.25H8.08l4.713 5.858zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/ai-trainer-academy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/brianmurutu/ai-trainer-academy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      {/* Top gradient border */}
      <div className="footer-top-line" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <Image
                src="/logo.png"
                alt="AI Trainer Academy"
                width={34}
                height={34}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
              <span className="footer-logo-text">
                AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
              </span>
            </Link>
            <p className="footer-tagline">
              The specialist platform for AI model training education. Learn from
              verified experts worldwide.
            </p>

            {/* Social icons */}
            <div className="footer-socials">
              {socials.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div className="footer-col-heading">{section}</div>
              <div className="footer-col-links">
                {items.map(([label, href]) => (
                  <Link key={label} href={href} className="footer-link">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} AI Trainer Academy. All rights reserved.
          </p>
          <p className="footer-copy">
            Payments via Paystack &amp; Binance Pay &middot; Secure and encrypted
          </p>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: white;
          border-top: 1px solid var(--line);
          position: relative;
        }
        .footer-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--accent-light) 20%,
            var(--accent) 50%,
            var(--accent-light) 80%,
            transparent 100%
          );
          opacity: 0.5;
        }
        .footer-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 60px 24px 36px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 52px;
        }
        .footer-brand {}
        .footer-logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .footer-logo-text {
          font-weight: 700;
          font-size: 15px;
          color: var(--navy);
        }
        .footer-tagline {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 230px;
          margin-bottom: 8px;
        }
        .footer-geo {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .footer-socials {
          display: flex;
          gap: 8px;
        }
        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: var(--surface);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate);
          transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
        }
        .footer-social-btn:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .footer-col-heading {
          font-size: 11px;
          font-weight: 700;
          color: var(--navy);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 16px;
        }
        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-link {
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.12s;
        }
        .footer-link:hover { color: var(--ink); }
        .footer-bottom {
          border-top: 1px solid var(--line);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer-copy {
          font-size: 12px;
          color: var(--muted);
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
