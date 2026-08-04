"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Lock } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const sidePanelContent = (
  <div>
    <div style={{
      width: 56, height: 56, borderRadius: 16,
      background: "rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: 28,
    }}>
      <Lock size={26} color="rgba(255,255,255,0.6)" />
    </div>
    <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", letterSpacing: "-0.4px", marginBottom: 12 }}>
      Choose something memorable
    </h2>
    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32 }}>
      Pick a password you haven&apos;t used before. At least 8 characters — longer is always better.
    </p>
    <div style={{
      padding: "16px 18px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
    }}>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Password tips</p>
      {[
        "Use at least 12 characters",
        "Mix letters, numbers, and symbols",
        "Avoid reusing passwords from other sites",
      ].map((tip) => (
        <p key={tip} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
          · {tip}
        </p>
      ))}
    </div>
  </div>
);

type State = { error?: string; success?: boolean } | undefined;

export default function ResetPasswordPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<State>(undefined);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(undefined);

    if (password.length < 8) {
      setState({ error: "Password must be at least 8 characters." });
      return;
    }
    if (password !== confirm) {
      setState({ error: "Passwords do not match." });
      return;
    }

    setPending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setState({ error: error.message });
      } else {
        setState({ success: true });
        // Redirect to dashboard after a short delay
        setTimeout(() => router.push("/dashboard"), 2500);
      }
    } catch {
      setState({ error: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthShell side={sidePanelContent}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Set a new password
        </h1>
        <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 32 }}>
          Remembered it?{" "}
          <Link href="/login" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
            Back to sign in
          </Link>
        </p>

        {/* Success state */}
        {state?.success && (
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "14px 16px",
            background: "#F0FDF4", border: "1px solid #BBF7D0",
            borderRadius: 10, marginBottom: 20,
          }}>
            <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 13, color: "#15803D", fontWeight: 500 }}>
                Password updated successfully.
              </p>
              <p style={{ fontSize: 12, color: "#16A34A", marginTop: 2 }}>
                Redirecting you to your dashboard…
              </p>
            </div>
          </div>
        )}

        {/* Error banner */}
        {state?.error && (
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "12px 14px",
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 10, marginBottom: 20,
          }}>
            <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}>{state.error}</p>
          </div>
        )}

        {!state?.success && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* New password */}
            <div>
              <label
                htmlFor="reset-password"
                style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}
              >
                New password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="reset-password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%", padding: "11px 44px 11px 14px", fontSize: 14,
                    border: "1px solid var(--line)", borderRadius: 10,
                    outline: "none", color: "var(--ink)", background: "white",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--muted)",
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="reset-confirm"
                style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}
              >
                Confirm new password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="reset-confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Repeat the password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{
                    width: "100%", padding: "11px 44px 11px 14px", fontSize: 14,
                    border: `1px solid ${confirm && confirm !== password ? "#FECACA" : "var(--line)"}`,
                    borderRadius: 10,
                    outline: "none", color: "var(--ink)", background: "white",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = confirm && confirm !== password ? "#FECACA" : "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = confirm && confirm !== password ? "#FECACA" : "var(--line)")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--muted)",
                    display: "flex", alignItems: "center",
                  }}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirm && confirm !== password && (
                <p style={{ fontSize: 12, color: "#DC2626", marginTop: 5 }}>Passwords don&apos;t match yet.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              style={{
                width: "100%", padding: "12px", marginTop: 4,
                background: pending ? "var(--slate)" : "var(--navy)",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 15, fontWeight: 500,
                cursor: pending ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.15s",
              }}
            >
              {pending ? "Updating…" : <><span>Update password</span><ArrowRight size={16} /></>}
            </button>
          </form>
        )}

        <div style={{ marginTop: 28, padding: 14, background: "var(--surface)", borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
            Need help?{" "}
            <Link href="/contact" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
