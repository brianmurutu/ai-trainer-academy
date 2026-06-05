"use client";
import { useState, useActionState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, GraduationCap, Briefcase, Check, AlertCircle } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { signupAction } from "@/app/actions/auth";

const sidePanelContent = (
  <div>
    <div style={{
      fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)",
      textTransform: "uppercase", letterSpacing: 2, marginBottom: 28,
    }}>What you get for free</div>

    {[
      "Browse 340+ verified trainer profiles",
      "Access 1 free learning resource per month",
      "Join the community forum",
      "Earn certificates on completion",
      "Pay in KES, USD, EUR, GBP, or crypto",
    ].map(item => (
      <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
        <div style={{
          width: 20, height: 20, borderRadius: "50%",
          background: "rgba(26,122,74,0.3)", border: "1px solid rgba(26,122,74,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
        }}>
          <Check size={11} color="#4ADE80" />
        </div>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{item}</span>
      </div>
    ))}

    <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Trusted by</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Safaricom", "Andela", "Microsoft Africa", "Google Dev Groups", "Moringa School"].map(org => (
          <span key={org} style={{
            fontSize: 11, padding: "4px 10px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20, color: "rgba(255,255,255,0.45)",
          }}>{org}</span>
        ))}
      </div>
    </div>
  </div>
);

export default function SignupPage() {
  const [role, setRole] = useState<"learner" | "trainer">("learner");
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [state, action, pending] = useActionState(signupAction, undefined);

  return (
    <AuthShell side={sidePanelContent}>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          Create your account
        </h1>
        <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 28 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>Log in</Link>
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

        {/* Role selector */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 10 }}>I want to join as a…</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {([
              { key: "learner", label: "Learner", sub: "Access courses & trainers", Icon: GraduationCap },
              { key: "trainer", label: "Trainer", sub: "Offer training services", Icon: Briefcase },
            ] as const).map(({ key, label, sub, Icon }) => (
              <button key={key} type="button" onClick={() => setRole(key)} style={{
                padding: "14px 16px", border: role === key ? "2px solid var(--accent)" : "1px solid var(--line)",
                borderRadius: 12, background: role === key ? "var(--accent-light)" : "white",
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}>
                <Icon size={18} color={role === key ? "var(--accent)" : "var(--muted)"} style={{ marginBottom: 6 }} />
                <div style={{ fontSize: 14, fontWeight: 500, color: role === key ? "var(--accent)" : "var(--ink)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 11, color: role === key ? "var(--accent)" : "var(--muted)" }}>{sub}</div>
              </button>
            ))}
          </div>

          {role === "trainer" && (
            <div style={{
              marginTop: 10, padding: "10px 14px", background: "var(--amber-light)",
              border: "1px solid #F5D5B0", borderRadius: 10,
              fontSize: 12, color: "var(--amber)", lineHeight: 1.55,
            }}>
              Trainer accounts require approval. You'll be directed to our application form after signing up.
            </div>
          )}
        </div>

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Hidden role field — passed to the server action */}
          <input type="hidden" name="role" value={role} />

          <div>
            <label htmlFor="signup-name" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Full name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              placeholder="Jane Muthoni"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              style={{
                width: "100%", padding: "11px 14px", fontSize: 14,
                border: "1px solid var(--line)", borderRadius: 10,
                outline: "none", color: "var(--ink)", background: "white", transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = "var(--accent)")}
              onBlur={e => (e.target.style.borderColor = "var(--line)")}
            />
          </div>

          <div>
            <label htmlFor="signup-email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Email address</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              style={{
                width: "100%", padding: "11px 14px", fontSize: 14,
                border: "1px solid var(--line)", borderRadius: 10,
                outline: "none", color: "var(--ink)", background: "white", transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = "var(--accent)")}
              onBlur={e => (e.target.style.borderColor = "var(--line)")}
            />
          </div>

          <div>
            <label htmlFor="signup-password" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
              {role === "trainer" ? "Create a password" : "Password"}
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="signup-password"
                name="password"
                type={showPwd ? "text" : "password"}
                required
                placeholder="Min. 8 characters"
                minLength={8}
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                style={{
                  width: "100%", padding: "11px 44px 11px 14px", fontSize: 14,
                  border: "1px solid var(--line)", borderRadius: 10,
                  outline: "none", color: "var(--ink)", background: "white", transition: "border-color 0.15s",
                }}
                onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                onBlur={e => (e.target.style.borderColor = "var(--line)")}
              />
              <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex",
              }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={pending} style={{
            width: "100%", padding: "12px", marginTop: 6,
            background: pending ? "var(--slate)" : "var(--navy)",
            color: "white", border: "none", borderRadius: 10,
            fontSize: 15, fontWeight: 500, cursor: pending ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.15s",
          }}>
            {pending ? "Creating account…" : (
              role === "trainer"
                ? <><span>Continue to application</span><ArrowRight size={16} /></>
                : <><span>Create free account</span><ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
          By signing up you agree to our{" "}
          <Link href="/terms" style={{ color: "var(--accent)", textDecoration: "none" }}>Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>Privacy Policy</Link>.
        </p>
      </div>
    </AuthShell>
  );
}
