"use client";

import { useState } from "react";
import { Check, DollarSign, Loader2, CreditCard, Wallet, AlertCircle } from "lucide-react";

type CourseEnrollmentWidgetProps = {
  courseId: string;
  courseTitle: string;
  priceUsd: number;
  priceKsh: number;
  userEmail?: string;
};

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

  const handleCardPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // Initialize payment with Paystack
      const callbackUrl = `${window.location.origin}/dashboard?enrolled=${courseId}`;
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail || "learner@example.com",
          amountKsh: priceKsh,
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

  const handleCryptoPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/binance/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountUsd: priceUsd.toFixed(2),
          currency: "USDT",
          trainerName: "AI Trainer Academy",
          sessionTopic: `Enrollment in Course: ${courseTitle}`,
          learnerEmail: userEmail || "learner@example.com",
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        const errorMsg = String(data.error || "").toLowerCase();
        const isCredError =
          errorMsg.includes("credential") ||
          errorMsg.includes("configured") ||
          errorMsg.includes("api-key") ||
          errorMsg.includes("permission") ||
          errorMsg.includes("ip") ||
          data.code === 400201 ||
          data.code === 400301 ||
          data.code === 400004 ||
          data.code === "400004";
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
    if (payMethod === "card") {
      handleCardPayment();
    } else {
      handleCryptoPayment();
    }
  };

  return (
    <div style={{
      background: "white",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 32,
      boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
    }}>
      {/* Price Display */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>${priceUsd}</span>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>USD</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--slate)", marginTop: 4 }}>
          KES {priceKsh.toLocaleString()} (approx.)
        </div>
      </div>

      {/* Payment Method Selection */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Choose Payment Method
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Card / M-Pesa option */}
          <button
            onClick={() => setPayMethod("card")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 10,
              border: payMethod === "card" ? "2px solid var(--accent)" : "1px solid var(--line)",
              background: payMethod === "card" ? "var(--accent-light)" : "white",
              cursor: "pointer",
              textAlign: "left",
              outline: "none",
              transition: "border-color 0.15s, background-color 0.15s",
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: payMethod === "card" ? "var(--accent)" : "var(--surface)",
              color: payMethod === "card" ? "white" : "var(--slate)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <CreditCard size={16} />
            </div>
            <div>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>Card / M-Pesa</span>
              <span style={{ fontSize: 11, color: "var(--slate)" }}>Instant payment via Paystack</span>
            </div>
          </button>

          {/* Crypto option */}
          <button
            onClick={() => setPayMethod("crypto")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 10,
              border: payMethod === "crypto" ? "2px solid var(--accent)" : "1px solid var(--line)",
              background: payMethod === "crypto" ? "var(--accent-light)" : "white",
              cursor: "pointer",
              textAlign: "left",
              outline: "none",
              transition: "border-color 0.15s, background-color 0.15s",
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: payMethod === "crypto" ? "var(--accent)" : "var(--surface)",
              color: payMethod === "crypto" ? "white" : "var(--slate)",
              display: "flex", alignItems: "center", justifyContent: "center"
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

      {error && (
        <div style={{
          display: "flex",
          gap: 8,
          alignItems: "start",
          padding: 12,
          borderRadius: 8,
          background: "rgba(220,38,38,0.05)",
          border: "1px solid #DC2626",
          color: "#DC2626",
          fontSize: 12,
          marginBottom: 16,
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Buy Button */}
      <button
        onClick={handleEnroll}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 8,
          background: "var(--accent)",
          color: "white",
          border: "none",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "background-color 0.15s",
          marginBottom: 24,
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--accent-dark)"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--accent)"}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Enrolling...
          </>
        ) : (
          "Enroll in Course"
        )}
      </button>

      {/* Highlights */}
      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
        <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          This course includes:
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "Full lifetime access",
            "Access on mobile and desktop",
            "Certificate of completion",
            "Exercises & course resources",
          ].map((hl, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={14} color="var(--green)" />
              <span style={{ fontSize: 12, color: "var(--slate)" }}>{hl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
