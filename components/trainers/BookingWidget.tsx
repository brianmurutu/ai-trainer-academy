"use client";
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
  CreditCard,
  Bitcoin,
} from "lucide-react";

type Slot = {
  id: string;
  date: string;
  dayLabel: string;
  time: string;
  duration: string;
  durationHrs: number;
};

type PaymentMethod = "card" | "crypto";

type BookingWidgetProps = {
  trainerName: string;
  trainerSlug: string;
  rateKsh: number;
  rateUsd: number;
  availableSlots: Slot[];
  userEmail?: string;
};

export default function BookingWidget({
  trainerName,
  trainerSlug,
  rateKsh,
  rateUsd,
  availableSlots,
  userEmail,
}: BookingWidgetProps) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [currency, setCurrency] = useState<"KES" | "USD">("KES");
  const [payMethod, setPayMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rate = currency === "KES" ? rateKsh : rateUsd;
  const totalAmount = selectedSlot ? rate * selectedSlot.durationHrs : 0;
  const totalUsd = selectedSlot ? rateUsd * selectedSlot.durationHrs : 0;

  // ── Card payment via Paystack ──
  const handleCardPayment = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    setError(null);
    try {
      const reference = `ATA-${trainerSlug}-${Date.now()}`;
      const callbackUrl = `${window.location.origin}/api/paystack/verify?reference=${reference}`;

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail || "guest@example.com",
          amountKsh: currency === "KES" ? totalAmount : totalAmount * 130,
          currency,
          reference,
          trainerName,
          sessionTopic: `Session with ${trainerName} — ${selectedSlot.date} ${selectedSlot.time}`,
          callbackUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to initialize payment.");
        return;
      }
      window.location.href = data.authorizationUrl;
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ── Crypto payment via Binance Pay ──
  const handleCryptoPayment = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/binance/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountUsd: totalUsd.toFixed(2),
          currency: "USDT",
          trainerName,
          sessionTopic: `Session with ${trainerName} — ${selectedSlot.date} ${selectedSlot.time}`,
          learnerEmail: userEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        // Distinguish credential errors from general failures
        const isCredError =
          data.error?.toLowerCase().includes("credential") ||
          data.error?.toLowerCase().includes("configured") ||
          data.code === 400201 || data.code === 400301;
        setError(
          isCredError
            ? "Crypto payments are temporarily unavailable. Please use Card / M-Pesa instead."
            : data.error || "Failed to create Binance Pay order."
        );
        return;
      }

      // Navigate to the QR page
      const params = new URLSearchParams({
        qrContent: data.qrContent ?? "",
        checkoutUrl: data.checkoutUrl ?? "",
        amount: String(totalUsd),
        currency: "USDT",
        expireTime: String(data.expireTime ?? Date.now() + 15 * 60 * 1000),
      });
      window.location.href = `/pay/crypto/${data.merchantTradeNo}?${params.toString()}`;
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (payMethod === "card") handleCardPayment();
    else handleCryptoPayment();
  };

  return (
    <div style={{
      background: "white", borderRadius: 16, padding: "22px",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      position: "sticky", top: 24,
    }}>
      {/* Rate */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px" }}>
            KSH {rateKsh.toLocaleString()}
          </span>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>/ hour</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>≈ USD {rateUsd} · Paystack & Binance Pay</div>
      </div>

      {/* Payment method toggle */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--slate)", marginBottom: 8 }}>Payment method</div>
        <div style={{ display: "flex", background: "#F5F7FA", borderRadius: 10, padding: 3, gap: 3 }}>
          {([
            { id: "card" as PaymentMethod, label: "Card / M-Pesa", Icon: CreditCard },
            { id: "crypto" as PaymentMethod, label: "Crypto (USDT)", Icon: Bitcoin },
          ] as const).map(({ id, label, Icon }) => (
            <button key={id} type="button" onClick={() => setPayMethod(id)} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "8px 10px", borderRadius: 8, border: "none",
              background: payMethod === id ? "white" : "transparent",
              boxShadow: payMethod === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              fontSize: 12, fontWeight: payMethod === id ? 600 : 400,
              color: payMethod === id ? "var(--navy)" : "var(--muted)",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Currency toggle (card only) */}
      {payMethod === "card" && (
        <div style={{ display: "flex", background: "#F5F7FA", borderRadius: 8, padding: 3, marginBottom: 16 }}>
          {(["KES", "USD"] as const).map((c) => (
            <button key={c} type="button" onClick={() => setCurrency(c)} style={{
              flex: 1, padding: "6px", borderRadius: 6, border: "none",
              background: currency === c ? "white" : "transparent",
              boxShadow: currency === c ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              fontSize: 12, fontWeight: 600,
              color: currency === c ? "var(--navy)" : "var(--muted)",
              cursor: "pointer", transition: "all 0.15s",
            }}>{c}</button>
          ))}
        </div>
      )}

      {/* Crypto note */}
      {payMethod === "crypto" && (
        <div style={{
          padding: "10px 12px", background: "#FFFBEB",
          border: "1px solid #FDE68A", borderRadius: 8, marginBottom: 16,
          display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          <Bitcoin size={13} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
            Powered by Binance Pay. You&apos;ll pay in <strong>USDT</strong> at the equivalent USD rate.
            A QR code page will open — scan with your Binance app.
          </div>
        </div>
      )}

      {/* Available slots */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <CalendarDays size={14} color="var(--navy)" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)" }}>Available slots</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {availableSlots.map((slot) => {
            const selected = selectedSlot?.id === slot.id;
            const displayRate = payMethod === "crypto"
              ? `$${(rateUsd * slot.durationHrs).toFixed(0)} USDT`
              : currency === "KES"
              ? `KSH ${(rateKsh * slot.durationHrs).toLocaleString()}`
              : `$${(rateUsd * slot.durationHrs)}`;

            return (
              <button key={slot.id} type="button" onClick={() => setSelectedSlot(selected ? null : slot)} style={{
                padding: "11px 13px",
                border: selected ? "2px solid var(--accent)" : "1px solid var(--line)",
                borderRadius: 10, background: selected ? "var(--accent-light)" : "white",
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: selected ? "var(--accent)" : "var(--navy)" }}>
                      {slot.dayLabel}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      <Clock size={11} color="var(--muted)" />
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{slot.time} · {slot.duration}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: selected ? "var(--accent)" : "var(--navy)" }}>
                      {displayRate}
                    </div>
                    {selected && <CheckCircle2 size={14} color="var(--accent)" style={{ marginTop: 2 }} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price breakdown */}
      {selectedSlot && (
        <div style={{
          padding: "12px 14px", background: "var(--surface)",
          borderRadius: 10, marginBottom: 14,
        }}>
          {[
            [
              `${selectedSlot.duration} session`,
              payMethod === "crypto"
                ? `$${totalUsd.toFixed(0)} USDT`
                : currency === "KES"
                ? `KSH ${totalAmount.toLocaleString()}`
                : `$${totalAmount}`,
            ],
            [
              "Total charged",
              payMethod === "crypto"
                ? `$${totalUsd.toFixed(0)} USDT`
                : currency === "KES"
                ? `KSH ${totalAmount.toLocaleString()}`
                : `$${totalAmount}`,
            ],
          ].map(([label, val], i) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 12,
              color: i === 1 ? "var(--navy)" : "var(--muted)",
              fontWeight: i === 1 ? 600 : 400,
              paddingTop: i === 1 ? 6 : 0,
              borderTop: i === 1 ? "1px solid var(--line)" : "none",
              marginTop: i === 1 ? 6 : 0,
              marginBottom: i === 0 ? 4 : 0,
            }}>
              <span>{label}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px",
          background: "#FEF2F2", border: "1px solid #FECACA",
          borderRadius: 8, marginBottom: 12,
        }}>
          <AlertCircle size={14} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#DC2626", lineHeight: 1.5 }}>{error}</p>
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={handleBook}
        disabled={!selectedSlot || loading}
        style={{
          width: "100%", padding: "13px",
          background: (!selectedSlot || loading) ? "var(--slate)" : "var(--navy)",
          color: "white", border: "none", borderRadius: 10,
          fontSize: 15, fontWeight: 600,
          cursor: (!selectedSlot || loading) ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background 0.15s",
        }}
      >
        {loading ? (
          <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            {payMethod === "crypto" ? "Creating Binance order…" : "Redirecting to Paystack…"}
          </>
        ) : selectedSlot ? (
          payMethod === "crypto" ? (
            <><Bitcoin size={16} /> Pay with Crypto <ArrowRight size={16} /></>
          ) : (
            <><DollarSign size={16} /> Pay with Card <ArrowRight size={16} /></>
          )
        ) : (
          "Select a time slot"
        )}
      </button>

      <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
        {payMethod === "card"
          ? "Secured by Paystack · SSL encrypted · Refundable if cancelled 24h before"
          : "Powered by Binance Pay · USDT on BNB Chain · No chargeback risk"}
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
