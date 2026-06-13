"use client";
import { use, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

type Status = "PENDING" | "PAID" | "CANCELED" | "EXPIRED" | "ERROR" | "loading";

type OrderInfo = {
  merchantTradeNo: string;
  status: Status;
  currency: string;
  orderAmount: string;
  transactionId?: string;
};

// ---------------------------------------------------------------------------
// QR Code renderer using a free API (no library dependency)
// ---------------------------------------------------------------------------
function QrCode({ content, size = 200 }: { content: string; size?: number }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt="Binance Pay QR Code"
      width={size}
      height={size}
      style={{ borderRadius: 10 }}
    />
  );
}

// ---------------------------------------------------------------------------
// Countdown timer
// ---------------------------------------------------------------------------
function Countdown({ expiresAt }: { expiresAt: number }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (expiresAt === 0) return;
    const timer = setTimeout(() => {
      setRemaining(Math.max(0, expiresAt - Date.now()));
    }, 0);
    const id = setInterval(() => {
      const r = Math.max(0, expiresAt - Date.now());
      setRemaining(r);
      if (r === 0) clearInterval(id);
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(id);
    };
  }, [expiresAt]);

  if (expiresAt === 0) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "5px 12px", borderRadius: 20,
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
      }}>
        <Clock size={12} color="#D97706" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#D97706" }}>
          Expires in 15:00
        </span>
      </div>
    );
  }

  const mins = String(Math.floor(remaining / 60000)).padStart(2, "0");
  const secs = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  const expired = remaining === 0;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 20,
      background: expired ? "#FEF2F2" : "#FFF7ED",
      border: `1px solid ${expired ? "#FECACA" : "#FED7AA"}`,
    }}>
      <Clock size={12} color={expired ? "#DC2626" : "#D97706"} />
      <span style={{ fontSize: 12, fontWeight: 600, color: expired ? "#DC2626" : "#D97706" }}>
        {expired ? "Expired" : `Expires in ${mins}:${secs}`}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Copy button
// ---------------------------------------------------------------------------
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={copy} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "6px 12px", borderRadius: 7,
      border: "1px solid var(--line)", background: "white",
      fontSize: 12, color: copied ? "#059669" : "var(--slate)",
      cursor: "pointer", transition: "all 0.15s",
    }}>
      {copied ? <CheckCircle2 size={13} color="#059669" /> : <Copy size={13} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function CryptoPayPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ qrContent?: string; checkoutUrl?: string; amount?: string; currency?: string; expireTime?: string; status?: string }>;
}) {
  const { orderId } = use(params);
  const sp = use(searchParams);

  const qrContent = sp.qrContent ?? "";
  const checkoutUrl = sp.checkoutUrl ?? "";
  const amount = sp.amount ?? "";
  const currency = sp.currency ?? "USDT";

  const [expireTime, setExpireTime] = useState<number>(0);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [pollingError, setPollingError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpireTime(sp.expireTime ? Number(sp.expireTime) : Date.now() + 15 * 60 * 1000);
    }, 0);
    return () => clearTimeout(timer);
  }, [sp.expireTime]);

  // If Binance redirected with ?status=success / ?status=cancelled, use that
  const urlStatus = sp.status;

  const pollStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/binance/query-order?merchantTradeNo=${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (data.error) {
        setPollingError(data.error);
      } else {
        setOrderInfo(data as OrderInfo);
        setPollingError(null);
        setLastChecked(new Date());
      }
    } catch {
      setPollingError("Could not reach server. Will retry…");
    }
  }, [orderId]);

  // Poll every 5 seconds while pending
  useEffect(() => {
    // If Binance already told us via redirect, don't poll
    if (urlStatus === "success" || urlStatus === "cancelled") return;

    const initTimer = setTimeout(() => {
      pollStatus();
    }, 0);

    const id = setInterval(() => {
      if (orderInfo?.status === "PAID" || orderInfo?.status === "CANCELED" || orderInfo?.status === "EXPIRED") {
        clearInterval(id);
        return;
      }
      pollStatus();
    }, 5000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(id);
    };
  }, [pollStatus, urlStatus, orderInfo?.status]);

  const effectiveStatus: Status =
    urlStatus === "success"
      ? "PAID"
      : urlStatus === "cancelled"
      ? "CANCELED"
      : (orderInfo?.status ?? "loading");

  // Paid status page
  if (effectiveStatus === "PAID") {
    return (
      <div style={{ minHeight: "100vh", background: "#F5F7FA", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{
          background: "white", borderRadius: 20, padding: "48px 40px",
          textAlign: "center", maxWidth: 440, width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#D1FAE5", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 20px",
          }}>
            <CheckCircle2 size={36} color="#059669" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>Payment confirmed!</h1>
          <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, marginBottom: 6 }}>
            Your crypto payment of <strong>{amount} {currency}</strong> has been received.
          </p>
          {orderInfo?.transactionId && (
            <p style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace", marginBottom: 24 }}>
              Tx: {orderInfo.transactionId}
            </p>
          )}
          <Link href="/dashboard/sessions" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--navy)", color: "white", textDecoration: "none",
            padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600,
          }}>
            View my sessions <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // Cancelled or Expired status page
  if (effectiveStatus === "CANCELED" || effectiveStatus === "EXPIRED") {
    return (
      <div style={{ minHeight: "100vh", background: "#F5F7FA", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{
          background: "white", borderRadius: 20, padding: "48px 40px",
          textAlign: "center", maxWidth: 440, width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#FEE2E2", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 20px",
          }}>
            <XCircle size={36} color="#DC2626" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
            {effectiveStatus === "CANCELED" ? "Payment cancelled" : "Order expired"}
          </h1>
          <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, marginBottom: 24 }}>
            {effectiveStatus === "CANCELED"
              ? "You cancelled the payment. No funds were taken."
              : "The QR code expired before payment was completed. Please go back and try again."}
          </p>
          <Link href="/trainers" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--navy)", color: "white", textDecoration: "none",
            padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600,
          }}>
            Back to trainers <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // Pending status page (default)
  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{
        background: "white", borderRadius: 20, padding: "36px 32px",
        maxWidth: 480, width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
              Pay with crypto
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>Binance Pay</h1>
          </div>
          <Countdown expiresAt={expireTime} />
        </div>

        {/* Amount */}
        <div style={{
          textAlign: "center", padding: "18px", marginBottom: 20,
          background: "#F5F7FA", borderRadius: 12,
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px" }}>
            {amount} <span style={{ fontSize: 18 }}>{currency}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Order: {orderId}</div>
        </div>

        {/* QR */}
        {qrContent ? (
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{
              display: "inline-block", padding: 12, background: "white",
              borderRadius: 14, border: "1px solid var(--line)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <QrCode content={qrContent} size={190} />
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
              Open Binance app → Pay → Scan QR
            </p>
          </div>
        ) : (
          <div style={{
            height: 214, background: "var(--surface)", borderRadius: 14,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--line)", marginBottom: 20,
          }}>
            <AlertCircle size={28} color="var(--muted)" style={{ marginBottom: 10 }} />
            <p style={{ fontSize: 13, color: "var(--muted)" }}>QR code not available</p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {checkoutUrl && (
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "10px", borderRadius: 9,
              background: "#F3A002", color: "white",
              textDecoration: "none", fontSize: 13, fontWeight: 600,
            }}>
              Open in Binance <ExternalLink size={13} />
            </a>
          )}
          {qrContent && <CopyButton text={qrContent} label="Copy code" />}
        </div>

        {/* Polling status */}
        <div style={{
          padding: "12px 14px", background: "var(--surface)",
          borderRadius: 10, border: "1px solid var(--line)",
        }}>
          {pollingError ? (
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <AlertCircle size={13} color="#D97706" />
              <span style={{ fontSize: 12, color: "#D97706" }}>{pollingError}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F59E0B", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 12, color: "var(--slate)" }}>
                  {effectiveStatus === "loading" ? "Checking payment status…" : "Waiting for payment…"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {lastChecked && (
                  <span style={{ fontSize: 10, color: "var(--muted)" }}>
                    {lastChecked.toLocaleTimeString()}
                  </span>
                )}
                <button type="button" onClick={pollStatus} style={{
                  background: "none", border: "none", cursor: "pointer", padding: 2,
                  display: "flex", alignItems: "center",
                }}>
                  <RefreshCw size={12} color="var(--muted)" />
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
          Supported: USDT, BNB, BUSD, ETH, BTC · Auto-detects when paid
        </p>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
