import { ShieldCheck } from "lucide-react";

function MpesaLogo() {
  return (
    <svg viewBox="0 0 54 24" width="54" height="24">
      <rect width="54" height="24" rx="6" fill="#39B54A" />
      <text x="27" y="15" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="9" fill="white" textAnchor="middle" letterSpacing="0.5">M-PESA</text>
    </svg>
  );
}

function VisaMastercardLogo() {
  return (
    <svg viewBox="0 0 52 24" width="52" height="24">
      <text x="2" y="16" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="11" fill="#1A1F71" fontStyle="italic">VISA</text>
      <circle cx="36" cy="12" r="7" fill="#EB001B" />
      <circle cx="44" cy="12" r="7" fill="#F79E1B" fillOpacity="0.85" />
    </svg>
  );
}

function PaystackLogo() {
  return (
    <svg viewBox="0 0 72 24" width="72" height="24" fill="none">
      <text x="2" y="17" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" fill="#09A5DB" letterSpacing="-0.5">paystack</text>
      <circle cx="64" cy="12" r="4" fill="#3BA1C5" />
    </svg>
  );
}

function BinanceLogo() {
  return (
    <svg viewBox="0 0 78 24" width="78" height="24" fill="none">
      <g transform="scale(0.85) translate(2, 2)">
        <path d="M12 0l3.86 3.86-1.93 1.93L12 3.86 10.07 5.8 8.14 3.87 12 0zm0 16.28l1.93-1.93 1.93 1.93L12 20.14l-3.86-3.86 1.93-1.93 1.93 1.93zm8.14-8.14L24 12l-3.86 3.86-1.93-1.93 1.93-1.93-1.93-1.93 1.93-1.93zM3.86 8.14l1.93 1.93-1.93 1.93 1.93 1.93-1.93 1.93L0 12l3.86-3.86zM12 7.74l4.26 4.26-4.26 4.26L7.74 12 12 7.74z" fill="#F0B90B" />
      </g>
      <text x="28" y="16" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="11" fill="#000000" letterSpacing="-0.5">BINANCE</text>
    </svg>
  );
}

const methods = [
  { label: "M-Pesa", sub: "KSH payments", Logo: MpesaLogo },
  { label: "Visa / Mastercard", sub: "KSH & USD", Logo: VisaMastercardLogo },
  { label: "Paystack", sub: "Secure gateway", Logo: PaystackLogo },
  { label: "Binance Pay", sub: "Crypto (USDT, BTC, BNB)", Logo: BinanceLogo },
];

export default function Payments() {
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 32,
      }}>
        <div style={{ maxWidth: 380 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <ShieldCheck size={20} color="var(--green)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--green)", textTransform: "uppercase", letterSpacing: 1 }}>Secure payments</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 12 }}>
            Pay however works for you
          </h2>
          <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.65 }}>
            Local M-Pesa, international card payments via Paystack, or crypto through Binance Pay — your money, your choice. All transactions are encrypted and protected.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {methods.map(({ label, sub, Logo }) => (
            <div key={label} style={{
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: 14, padding: "20px",
              minWidth: 170, display: "flex", flexDirection: "column", gap: 14,
              alignItems: "flex-start"
            }}>
              <div style={{
                height: 36,
                background: "white", border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "0 12px",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Logo />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
