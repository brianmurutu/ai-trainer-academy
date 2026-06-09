"use client";
import { useState, useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, AlertCircle } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { forgotPasswordAction } from "@/app/actions/auth";

const sidePanelContent = (
  <div>
    <div style={{ marginBottom: 32 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <Mail size={26} color="rgba(255,255,255,0.6)" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", letterSpacing: "-0.4px", marginBottom: 12 }}>Happens to everyone</h2>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
        Enter your registered email and we'll send you a secure reset link that expires in 30 minutes.
      </p>
    </div>
    <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Need help?</p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>If you're having trouble, contact us at <span style={{ color: "white" }}>support@ai-trainer-academy.top</span></p>
    </div>
  </div>
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, action, pending] = useActionState(forgotPasswordAction, undefined);

  return (
    <AuthShell side={sidePanelContent}>
      <div>
        <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 28 }}>
          <ArrowLeft size={14} /> Back to login
        </Link>

        {!state?.success ? (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 6 }}>Reset your password</h1>
            <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 28 }}>Enter your email and we'll send you a reset link.</p>

            {/* Error banner */}
            {state?.error && (
              <div style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "12px 14px", background: "#FEF2F2",
                border: "1px solid #FECACA", borderRadius: 10, marginBottom: 20,
              }}>
                <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}>{state.error}</p>
              </div>
            )}

            <form action={action} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label htmlFor="forgot-email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Email address</label>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "11px 14px", fontSize: 14,
                    border: "1px solid var(--line)", borderRadius: 10,
                    outline: "none", color: "var(--ink)", background: "white", transition: "border-color 0.15s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={e => (e.target.style.borderColor = "var(--line)")}
                />
              </div>
              <button type="submit" disabled={pending} style={{
                width: "100%", padding: "12px", background: pending ? "var(--slate)" : "var(--navy)",
                color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 500,
                cursor: pending ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.15s",
              }}>
                {pending ? "Sending…" : <><span>Send reset link</span><ArrowRight size={16} /></>}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Mail size={24} color="var(--green)" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)", marginBottom: 10 }}>Check your inbox</h2>
            <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.65, marginBottom: 24 }}>
              We sent a reset link to <strong>{email}</strong>. It expires in 30 minutes.
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              Didn't get it?{" "}
              <Link href="/forgot-password" style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 500, fontSize: 13, textDecoration: "none" }}>Try again</Link>
            </p>
          </div>
        )}
      </div>
    </AuthShell>
  );
}
