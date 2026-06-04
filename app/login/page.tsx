"use client";
import { useState, useActionState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { loginAction } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";

const sidePanelContent = (
  <div>
    <div style={{ marginBottom: 48 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase", letterSpacing: 2, marginBottom: 24,
      }}>Why members love us</div>
      {[
        { stat: "340+", label: "Verified AI trainers across 40 countries" },
        { stat: "12K+", label: "Learners who've earned certifications" },
        { stat: "80%", label: "Trainer earnings kept — highest in the industry" },
        { stat: "4.9★", label: "Average trainer rating from verified reviews" },
      ].map(({ stat, label }) => (
        <div key={stat} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: "white", minWidth: 52, letterSpacing: "-0.5px" }}>{stat}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, paddingTop: 4 }}>{label}</div>
        </div>
      ))}
    </div>

    <div style={{
      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 14, padding: "20px",
    }}>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, marginBottom: 16 }}>
        "I went from zero to fine-tuning LLaMA 3 in three weeks. The structured path made all the difference."
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "#1A6FBF", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white",
        }}>AH</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "white" }}>Amina Hassan</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>ML Engineer, Nairobi</div>
        </div>
      </div>
    </div>
  </div>
);

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, action, pending] = useActionState(loginAction, undefined);

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <AuthShell side={sidePanelContent}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 32 }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Sign up free</Link>
        </p>

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

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label htmlFor="login-email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
              Email address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              style={{
                width: "100%", padding: "11px 14px", fontSize: 14,
                border: "1px solid var(--line)", borderRadius: 10,
                outline: "none", color: "var(--ink)", background: "white",
                transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = "var(--accent)")}
              onBlur={e => (e.target.style.borderColor = "var(--line)")}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label htmlFor="login-password" style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>Forgot password?</Link>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                name="password"
                type={showPwd ? "text" : "password"}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                style={{
                  width: "100%", padding: "11px 44px 11px 14px", fontSize: 14,
                  border: "1px solid var(--line)", borderRadius: 10,
                  outline: "none", color: "var(--ink)", background: "white",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                onBlur={e => (e.target.style.borderColor = "var(--line)")}
              />
              <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "var(--muted)",
                display: "flex", alignItems: "center",
              }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={pending} style={{
            width: "100%", padding: "12px", marginTop: 4,
            background: pending ? "var(--slate)" : "var(--navy)",
            color: "white", border: "none", borderRadius: 10,
            fontSize: 15, fontWeight: 500, cursor: pending ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.15s",
          }}>
            {pending ? "Signing in…" : <><span>Sign in</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Google", icon: "G", provider: "google" as const },
            { label: "GitHub", icon: "⌥", provider: "github" as const },
          ].map(({ label, icon, provider }) => (
            <button key={label} type="button" onClick={() => handleOAuth(provider)} style={{
              padding: "10px", border: "1px solid var(--line)",
              borderRadius: 10, background: "white", cursor: "pointer",
              fontSize: 13, fontWeight: 500, color: "var(--ink)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "border-color 0.15s",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)")}
            >
              <span style={{ fontWeight: 700 }}>{icon}</span> {label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: 14, background: "var(--surface)", borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
            Are you a trainer?{" "}
            <Link href="/apply" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Apply to teach on the platform →</Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
