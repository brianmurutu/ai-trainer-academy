"use client";

import { useState } from "react";
import { Check, Loader2, CreditCard, Wallet, AlertCircle, Gift } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

type CourseEnrollmentWidgetProps = {
  courseId: string;
  courseTitle: string;
  priceUsd: number;
  priceKsh: number;
  userEmail?: string;
};

/** Generate a unique Paystack reference */
function makeReference(courseId: string) {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 7);
  return `course_${courseId.slice(0, 8)}_${ts}_${rand}`;
}

export default function CourseEnrollmentWidget({
  courseId,
  courseTitle,
  priceUsd,
  priceKsh,
  userEmail,
}: CourseEnrollmentWidgetProps) {
  const [payMethod, setPayMethod] = useState<"card" | "crypto">("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { formatPrice, currency } = useCurrency();

  const isFree = !priceKsh || priceKsh <= 0;

  // ── Free enrolment ─────────────────────────────────────────────────────────
  const handleFreeEnroll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Could not enroll. Please try again.");
        return;
      }
      window.location.href = `/dashboard/courses?enrolled=${courseId}`;
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ── Card / M-Pesa ───────────────────────────────────────────────────────────
  const handleCardPayment = async () => {
    setLoading(true);
    setError(null);

    if (!userEmail) {
      setError("Please log in to enroll in this course.");
      setLoading(false);
      return;
    }

    try {
      const reference = makeReference(courseId);
      const callbackUrl = `${window.location.origin}/api/paystack/verify?reference=${reference}&courseId=${courseId}`;

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          amountKsh: priceKsh,
          amountUsd: priceUsd,
          currency: "KES",
          reference,
          sessionTopic: `Enrollment: ${courseTitle}`,
          callbackUrl,
          metadata: { courseId, courseTitle },
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

  // ── Crypto / Binance Pay ────────────────────────────────────────────────────
  const handleCryptoPayment = async () => {
    setLoading(true);
    setError(null);

    if (!userEmail) {
      setError("Please log in to enroll in this course.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/binance/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountUsd: priceUsd.toFixed(2),
          currency: "USDT",
          trainerName: "AI Trainer Academy",
          sessionTopic: `Enrollment: ${courseTitle}`,
          learnerEmail: userEmail,
          courseId,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        const msg = String(data.error || "").toLowerCase();
        const isCredError =
          msg.includes("credential") ||
          msg.includes("configured") ||
          msg.includes("api-key") ||
          msg.includes("permission") ||
          [400201, 400301, 400004, "400004"].includes(data.code);
        setError(
          isCredError
            ? "Crypto payments are temporarily unavailable. Please use Card / M-Pesa instead."
            : data.error || "Failed to create Binance Pay order."
        );
        return;
      }

      const params = new URLSearchParams({
        qrContent: data.qrContent ?? "",
        checkoutUrl: data.checkoutUrl ?? "",
        amount: String(priceUsd),
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

  const handleEnroll = () => {
    if (isFree) return handleFreeEnroll();
    if (payMethod === "card") return handleCardPayment();
    return handleCryptoPayment();
  };

  return (
    <div style={{
      background: "white",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 32,
      boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    }}>
      {/* Price */}
      <div style={{ marginBottom: 24 }}>
        {isFree ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "#059669" }}>Free</span>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px",
              background: "#D1FAE5", color: "#065F46", borderRadius: 20,
            }}>No credit card needed</span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>
              {formatPrice(priceKsh, priceUsd)}
            </span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>{currency}</span>
          </div>
        )}
      </div>

      {/* Payment method selector — hidden for free courses */}
      {!isFree && (
        <div style={{ marginBottom: 24 }}>
          <span style={{
            display: "block", fontSize: 12, fontWeight: 600,
            color: "var(--navy)", marginBottom: 12,
            textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            Choose Payment Method
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Card / M-Pesa */}
            <button
              onClick={() => setPayMethod("card")}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 16px", borderRadius: 10,
                border: payMethod === "card" ? "2px solid var(--accent)" : "1px solid var(--line)",
                background: payMethod === "card" ? "var(--accent-light)" : "white",
                cursor: "pointer", textAlign: "left", outline: "none",
                transition: "border-color 0.15s, background-color 0.15s",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: payMethod === "card" ? "var(--accent)" : "var(--surface)",
                color: payMethod === "card" ? "white" : "var(--slate)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CreditCard size={16} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>Card / M-Pesa</span>
                <span style={{ fontSize: 11, color: "var(--slate)" }}>Instant payment via Paystack</span>
              </div>
            </button>

            {/* Crypto */}
            <button
              onClick={() => setPayMethod("crypto")}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 16px", borderRadius: 10,
                border: payMethod === "crypto" ? "2px solid var(--accent)" : "1px solid var(--line)",
                background: payMethod === "crypto" ? "var(--accent-light)" : "white",
                cursor: "pointer", textAlign: "left", outline: "none",
                transition: "border-color 0.15s, background-color 0.15s",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: payMethod === "crypto" ? "var(--accent)" : "var(--surface)",
                color: payMethod === "crypto" ? "white" : "var(--slate)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Wallet size={16} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>Pay with Crypto</span>
                <span style={{ fontSize: 11, color: "var(--slate)" }}>USDT via Binance Pay</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          display: "flex", gap: 8, alignItems: "flex-start",
          padding: 12, borderRadius: 8, marginBottom: 16,
          background: "rgba(220,38,38,0.05)",
          border: "1px solid #FECACA", color: "#DC2626", fontSize: 12,
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Enroll button */}
      <button
        onClick={handleEnroll}
        disabled={loading}
        style={{
          width: "100%", padding: "14px", borderRadius: 10,
          background: isFree ? "#059669" : "var(--accent)",
          color: "white", border: "none", fontWeight: 600,
          fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, transition: "opacity 0.15s", marginBottom: 24,
          opacity: loading ? 0.7 : 1,
          boxShadow: isFree
            ? "0 4px 14px rgba(5,150,105,0.25)"
            : "0 4px 14px var(--accent-glow)",
        }}
      >
        {loading ? (
          <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Processing...</>
        ) : isFree ? (
          <><Gift size={16} /> Enroll for Free</>
        ) : (
          "Enroll in Course"
        )}
      </button>

      {/* What's included */}
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
        <span style={{
          display: "block", fontSize: 11, fontWeight: 600,
          color: "var(--navy)", marginBottom: 12,
          textTransform: "uppercase", letterSpacing: "0.5px",
        }}>
          This course includes:
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Full lifetime access",
            "Access on mobile and desktop",
            "Certificate of completion",
            "Exercises and course resources",
          ].map((hl) => (
            <div key={hl} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={14} color="var(--green)" />
              <span style={{ fontSize: 12, color: "var(--slate)" }}>{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Login nudge for guests */}
      {!userEmail && !isFree && (
        <div style={{
          marginTop: 16, padding: "10px 14px", background: "#FEF9C3",
          border: "1px solid #FDE68A", borderRadius: 8,
          fontSize: 12, color: "#92400E", lineHeight: 1.5,
        }}>
          <strong>Log in</strong> or <strong>sign up</strong> first to complete your purchase.
          Your cart will be saved.
        </div>
      )}
    </div>
  );
}
