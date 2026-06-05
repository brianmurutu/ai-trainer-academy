import { ShieldCheck, Smartphone, CreditCard, Lock, Coins } from "lucide-react";

const methods = [
  { label: "M-Pesa", sub: "KSH payments", Icon: Smartphone, iconColor: "#22C55E" },
  { label: "Visa / Mastercard", sub: "KSH & USD", Icon: CreditCard, iconColor: "#3B82F6" },
  { label: "Paystack", sub: "Secure gateway", Icon: Lock, iconColor: "#EC4899" },
  { label: "Binance Pay", sub: "Crypto (USDT, BTC, BNB)", Icon: Coins, iconColor: "#F59E0B" },
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
          {methods.map(({ label, sub, Icon, iconColor }) => (
            <div key={label} style={{
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: 14, padding: "20px",
              minWidth: 160, display: "flex", flexDirection: "column", gap: 10,
              alignItems: "flex-start"
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "white", border: "1px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: iconColor
              }}>
                <Icon size={20} />
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
