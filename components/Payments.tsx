import { ShieldCheck, Lock } from "lucide-react";

/* ── Real payment provider SVG logos ── */

function MPesaLogo() {
  return (
    <svg viewBox="0 0 120 44" width="96" height="35" aria-label="M-Pesa">
      <rect width="120" height="44" rx="6" fill="#60BB46" />
      <text
        x="60"
        y="16"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="11"
        fill="white"
        textAnchor="middle"
        letterSpacing="2"
      >
        M-PESA
      </text>
      <text
        x="60"
        y="32"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="8"
        fill="rgba(255,255,255,0.75)"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        by Safaricom
      </text>
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 80 50" width="64" height="40" aria-label="Visa">
      <rect width="80" height="50" rx="6" fill="#1A1F71" />
      <text
        x="40"
        y="34"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill="white"
        textAnchor="middle"
        fontStyle="italic"
        letterSpacing="-1"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 60 40" width="60" height="40" aria-label="Mastercard">
      <circle cx="22" cy="20" r="16" fill="#EB001B" />
      <circle cx="38" cy="20" r="16" fill="#F79E1B" />
      <path
        d="M30 8.5a16 16 0 0 1 0 23A16 16 0 0 1 30 8.5z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function PaystackLogo() {
  return (
    <svg viewBox="0 0 120 44" width="96" height="35" aria-label="Paystack">
      <rect width="120" height="44" rx="6" fill="#011B33" />
      {/* Paystack mark: stacked horizontal bars */}
      <rect x="16" y="13" width="18" height="4" rx="2" fill="#00C3F7" />
      <rect x="16" y="20" width="14" height="4" rx="2" fill="#00C3F7" opacity="0.7" />
      <rect x="16" y="27" width="10" height="4" rx="2" fill="#00C3F7" opacity="0.4" />
      <text
        x="68"
        y="27"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="13"
        fill="white"
        textAnchor="middle"
      >
        Paystack
      </text>
    </svg>
  );
}

function BinanceLogo() {
  return (
    <svg viewBox="0 0 120 44" width="96" height="35" aria-label="Binance Pay">
      <rect width="120" height="44" rx="6" fill="#1E2026" />
      {/* Binance diamond mark */}
      <g transform="translate(14,10)">
        <polygon points="12,0 24,12 12,24 0,12" fill="#F0B90B" />
        <polygon points="12,4 20,12 12,20 4,12" fill="#1E2026" />
        <circle cx="12" cy="12" r="4" fill="#F0B90B" />
      </g>
      <text
        x="76"
        y="21"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#F0B90B"
        textAnchor="middle"
      >
        BINANCE
      </text>
      <text
        x="76"
        y="33"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="9"
        fill="rgba(240,185,11,0.6)"
        textAnchor="middle"
        letterSpacing="1"
      >
        PAY
      </text>
    </svg>
  );
}

const methods = [
  {
    Logo: MPesaLogo,
    SecondaryLogo: null,
    label: "M-Pesa",
    sub: "Instant KES payments",
  },
  {
    Logo: VisaLogo,
    SecondaryLogo: MastercardLogo,
    label: "Visa / Mastercard",
    sub: "KES and USD cards",
  },
  {
    Logo: PaystackLogo,
    SecondaryLogo: null,
    label: "Paystack",
    sub: "Secure online gateway",
  },
  {
    Logo: BinanceLogo,
    SecondaryLogo: null,
    label: "Binance Pay",
    sub: "Crypto: USDT, BTC, BNB",
  },
];

export default function Payments() {
  return (
    <section className="payments-section">
      <div className="payments-container">
        {/* Left copy */}
        <div className="payments-copy">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <ShieldCheck size={18} color="var(--green)" strokeWidth={2.5} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--green)",
                textTransform: "uppercase",
                letterSpacing: 1.2,
              }}
            >
              Secure Payments
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.5px",
              marginBottom: 14,
              lineHeight: 1.25,
            }}
          >
            Pay however<br />works for you
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--slate)",
              lineHeight: 1.7,
              maxWidth: 340,
              marginBottom: 20,
            }}
          >
            Local M-Pesa, international card payments via Paystack, or
            crypto through Binance Pay. Your money, your choice. All
            transactions are encrypted and protected.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            <Lock size={13} />
            <span>256-bit SSL encryption on all transactions</span>
          </div>
        </div>

        {/* Right: payment logos */}
        <div className="payments-logos">
          {methods.map(({ Logo, SecondaryLogo, label, sub }) => (
            <div key={label} className="payment-card">
              <div className="payment-logo-row">
                <Logo />
                {SecondaryLogo && (
                  <SecondaryLogo />
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--navy)",
                  marginTop: 12,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .payments-section {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--surface);
        }
        .payments-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        .payments-copy {
          max-width: 380px;
          flex-shrink: 0;
        }
        .payments-logos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          flex: 1;
          max-width: 520px;
        }
        .payment-card {
          background: white;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 20px;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .payment-card:hover {
          border-color: #b5cfe8;
          box-shadow: 0 4px 16px rgba(26,111,191,0.07);
        }
        .payment-logo-row {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
        }
        @media (max-width: 768px) {
          .payments-logos { grid-template-columns: 1fr 1fr; }
          .payments-copy { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .payments-logos { grid-template-columns: 1fr 1fr; }
          .payments-container { padding: 52px 20px; }
        }
      `}</style>
    </section>
  );
}
