"use client";

import { useState } from "react";
import { CreditCard, Loader2, AlertCircle, ArrowRight } from "lucide-react";

type Props = {
  applicationId: string;
  email: string;
};

export default function TrainerActivationClient({ applicationId, email }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const reference = `act-${applicationId}-${Date.now()}`;
      const callbackUrl = `${window.location.origin}/api/paystack/verify?reference=${reference}`;

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amountKsh: 2000,
          amount: 2000,
          currency: "KES",
          reference,
          sessionTopic: "Trainer Profile Activation",
          callbackUrl,
          metadata: {
            payment_type: "trainer_activation",
            application_id: applicationId,
            amount_ksh: "2000",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to initialize payment session. Please try again.");
        return;
      }

      // Redirect to Paystack Checkout
      window.location.href = data.authorizationUrl;
    } catch (err) {
      console.error("Payment initialization failed:", err);
      setError("A connection error occurred. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {error && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 12px",
          background: "#FEF2F2", border: "1px solid #FECACA",
          borderRadius: 8, color: "#DC2626", fontSize: 12.5, lineHeight: 1.5,
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <p>{error}</p>
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          background: "var(--accent)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "var(--shadow-accent)",
          transition: "background 0.15s, transform 0.1s",
          opacity: loading ? 0.85 : 1,
        }}
        onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "var(--accent-dark)"; }}
        onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
      >
        {loading ? (
          <>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            Initializing Payment...
          </>
        ) : (
          <>
            <CreditCard size={16} />
            Pay Activation Fee (KSH 2,000)
            <ArrowRight size={16} />
          </>
        )}
      </button>
      
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
