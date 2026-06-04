"use client";
import { useState, useActionState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { submitApplicationAction } from "@/app/actions/apply";

const SPECIALITIES = [
  "Fine-tuning (LoRA / QLoRA)", "RLHF & RLAIF", "Prompt Engineering",
  "Dataset Curation & Annotation", "Model Evaluation & Benchmarking",
  "AI Safety & Alignment", "Multimodal Models", "RAG & Vector Databases",
  "MLOps & Deployment", "Computer Vision", "NLP & Text Models", "Other",
];

const sidePanelContent = (
  <div>
    <div style={{
      fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)",
      textTransform: "uppercase", letterSpacing: 2, marginBottom: 28,
    }}>Why train on our platform</div>

    {[
      { num: "80%", label: "You keep 80% of every session — highest trainer share in the industry" },
      { num: "KSH", label: "Get paid weekly via M-Pesa, bank transfer, or crypto" },
      { num: "0", label: "Zero setup cost. One-time KSH 2,000 activation after approval" },
      { num: "∞", label: "Set your own rates, hours, and specialities. Full control." },
    ].map(({ num, label }) => (
      <div key={num} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: "white", minWidth: 52, letterSpacing: "-0.5px" }}>{num}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, paddingTop: 4 }}>{label}</div>
      </div>
    ))}

    <div style={{
      marginTop: 32, padding: "16px 18px",
      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 12,
    }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Avg. trainer monthly earnings</div>
      <div style={{ fontSize: 28, fontWeight: 600, color: "white", letterSpacing: "-0.5px" }}>KSH 68,000</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Based on 8 sessions/month at KSH 2,500/hr</div>
    </div>
  </div>
);

type FormData = {
  fullName: string; email: string; password: string;
  country: string; linkedin: string; github: string;
  specialities: string[]; experience: string;
  bio: string; hourlyRateKsh: string; hourlyRateUsd: string;
  sampleWork: string; agreeTerms: boolean;
};

const STEPS = ["Account", "Expertise", "Profile & Rates", "Review"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", password: "", country: "", linkedin: "", github: "",
    specialities: [], experience: "", bio: "", hourlyRateKsh: "", hourlyRateUsd: "",
    sampleWork: "", agreeTerms: false,
  });
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, pending] = useActionState(submitApplicationAction, undefined);

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [key]: e.target.value }));

  const toggleSpec = (s: string) =>
    setForm(p => ({
      ...p,
      specialities: p.specialities.includes(s)
        ? p.specialities.filter(x => x !== s)
        : [...p.specialities, s],
    }));

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: 14,
    border: "1px solid var(--line)", borderRadius: 10,
    outline: "none", color: "var(--ink)", background: "white",
    transition: "border-color 0.15s", fontFamily: "var(--font-display)",
  };
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "var(--accent)");
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "var(--line)");

  const labelEl = (text: string, required = true) => (
    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
      {text}{required && <span style={{ color: "var(--accent)", marginLeft: 2 }}>*</span>}
    </label>
  );

  // Success state
  if (state?.success) {
    return (
      <AuthShell side={sidePanelContent}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "var(--green-light)", display: "flex",
            alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
          }}>
            <CheckCircle2 size={32} color="var(--green)" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 10 }}>
            Application submitted!
          </h1>
          <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.65, marginBottom: 28 }}>
            Thank you, <strong>{state.applicantName.split(" ")[0]}</strong>. Our team will review your application and get back to you within <strong>48 hours</strong> via {state.applicantEmail}.
          </p>
          <div style={{
            padding: "16px", background: "var(--surface)",
            border: "1px solid var(--line)", borderRadius: 12, marginBottom: 28, textAlign: "left",
          }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)", marginBottom: 8 }}>What happens next</p>
            {["Our team reviews your credentials & bio", "You'll receive an email with the decision", "If approved, pay the one-time KSH 2,000 activation fee", "Set up your profile and start earning"].map((s, i) => (
              <div key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: "50%", background: "var(--accent-light)",
                  color: "var(--accent)", fontSize: 11, fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--navy)", color: "white", textDecoration: "none",
            padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 500,
          }}>Back to home</Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell side={sidePanelContent}>
      <div>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 20 }}>
            <ArrowLeft size={14} /> Back
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
            Trainer application
          </h1>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "var(--line)", borderRadius: 4, marginBottom: 28, overflow: "hidden" }}>
          <div style={{
            height: "100%", background: "var(--accent)", borderRadius: 4,
            width: `${((step + 1) / STEPS.length) * 100}%`,
            transition: "width 0.3s ease",
          }} />
        </div>

        {/* Server error banner (shown on step 3 / submit) */}
        {state?.error && step === 3 && (
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "12px 14px", background: "#FEF2F2",
            border: "1px solid #FECACA", borderRadius: 10, marginBottom: 20,
          }}>
            <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}>{state.error}</p>
          </div>
        )}

        {/*
          Single <form> wraps everything so all hidden inputs persist across steps.
          The native action points to the server action — only fires when the user
          clicks "Submit application" on the last step.
        */}
        <form ref={formRef} action={action}>
          {/* Hidden fields for all form data — always rendered */}
          <input type="hidden" name="fullName" value={form.fullName} />
          <input type="hidden" name="email" value={form.email} />
          <input type="hidden" name="password" value={form.password} />
          <input type="hidden" name="country" value={form.country} />
          <input type="hidden" name="linkedin" value={form.linkedin} />
          <input type="hidden" name="github" value={form.github} />
          {form.specialities.map(s => (
            <input key={s} type="hidden" name="specialities" value={s} />
          ))}
          <input type="hidden" name="experience" value={form.experience} />
          <input type="hidden" name="bio" value={form.bio} />
          <input type="hidden" name="hourlyRateKsh" value={form.hourlyRateKsh} />
          <input type="hidden" name="hourlyRateUsd" value={form.hourlyRateUsd} />
          <input type="hidden" name="sampleWork" value={form.sampleWork} />

          {/* Step 0: Account */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                {labelEl("Full name")}
                <input type="text" required placeholder="Jane Muthoni" value={form.fullName} onChange={set("fullName")} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                {labelEl("Email address")}
                <input type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                {labelEl("Password")}
                <div style={{ position: "relative" }}>
                  <input type={showPwd ? "text" : "password"} required placeholder="Min. 8 characters" minLength={8} value={form.password} onChange={set("password")}
                    style={{ ...inputStyle, paddingRight: 44 }} onFocus={focus} onBlur={blur} />
                  <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex",
                  }}>
                    {showPwd ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div>
                {labelEl("Country")}
                <select value={form.country} onChange={set("country")} style={inputStyle} onFocus={focus} onBlur={blur}>
                  <option value="">Select country…</option>
                  {["Kenya", "Nigeria", "Ghana", "South Africa", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Egypt", "United States", "United Kingdom", "India", "Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 1: Expertise */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                {labelEl("AI specialities (pick all that apply)")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
                  {SPECIALITIES.map(s => {
                    const sel = form.specialities.includes(s);
                    return (
                      <button key={s} type="button" onClick={() => toggleSpec(s)} style={{
                        padding: "6px 12px", border: sel ? "2px solid var(--accent)" : "1px solid var(--line)",
                        borderRadius: 20, background: sel ? "var(--accent-light)" : "white",
                        fontSize: 12, color: sel ? "var(--accent)" : "var(--slate)",
                        cursor: "pointer", fontWeight: sel ? 500 : 400, transition: "all 0.15s",
                      }}>{s}</button>
                    );
                  })}
                </div>
              </div>
              <div>
                {labelEl("Years of experience in AI/ML")}
                <select value={form.experience} onChange={set("experience")} style={inputStyle} onFocus={focus} onBlur={blur}>
                  <option value="">Select…</option>
                  {["Less than 1 year", "1–2 years", "2–4 years", "4–7 years", "7–10 years", "10+ years"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                {labelEl("LinkedIn profile URL")}
                <input type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedin} onChange={set("linkedin")} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                {labelEl("GitHub profile URL", false)}
                <input type="url" placeholder="https://github.com/yourname (optional)" value={form.github} onChange={set("github")} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          )}

          {/* Step 2: Profile & Rates */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                {labelEl("Short bio (shown on your public profile)")}
                <textarea
                  rows={4} placeholder="Describe your background, teaching style, and what learners will gain from your sessions…"
                  value={form.bio} onChange={set("bio")}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                  onFocus={focus} onBlur={blur}
                />
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{form.bio.length}/500 characters</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  {labelEl("Hourly rate (KSH)")}
                  <input type="number" min="500" placeholder="e.g. 2500" value={form.hourlyRateKsh} onChange={set("hourlyRateKsh")} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  {labelEl("Hourly rate (USD)")}
                  <input type="number" min="5" placeholder="e.g. 20" value={form.hourlyRateUsd} onChange={set("hourlyRateUsd")} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div>
                {labelEl("Link to sample work / portfolio", false)}
                <input type="url" placeholder="GitHub repo, Hugging Face model, YouTube demo, etc." value={form.sampleWork} onChange={set("sampleWork")} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10 }}>
                <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.55 }}>
                  💡 Platform commission: <strong style={{ color: "var(--ink)" }}>20%</strong>. You keep <strong style={{ color: "var(--green)" }}>80%</strong> of every session. At KSH {form.hourlyRateKsh || "2,500"}/hr, you net <strong style={{ color: "var(--green)" }}>KSH {form.hourlyRateKsh ? Math.round(Number(form.hourlyRateKsh) * 0.8).toLocaleString() : "2,000"}/hr</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
                {[
                  ["Name", form.fullName],
                  ["Email", form.email],
                  ["Country", form.country],
                  ["Experience", form.experience],
                  ["Specialities", form.specialities.join(", ") || "—"],
                  ["Hourly rate", `KSH ${form.hourlyRateKsh || "—"} / $${form.hourlyRateUsd || "—"}`],
                  ["LinkedIn", form.linkedin || "—"],
                ].map(([k, v], i, arr) => (
                  <div key={k} style={{
                    display: "flex", gap: 12, padding: "11px 14px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 90, paddingTop: 1 }}>{k}</span>
                    <span style={{ fontSize: 13, color: "var(--ink)", wordBreak: "break-all" }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: "14px 16px", background: "var(--amber-light)",
                border: "1px solid #F5D5B0", borderRadius: 10,
                fontSize: 12, color: "var(--amber)", lineHeight: 1.6,
              }}>
                <strong>Activation fee:</strong> If approved, you'll pay a one-time KSH 2,000 fee to activate your trainer profile. This is refundable if you're not approved.
              </div>

              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={e => setForm(p => ({ ...p, agreeTerms: e.target.checked }))}
                  style={{ marginTop: 2, accentColor: "var(--accent)", width: 15, height: 15 }}
                />
                <span style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.55 }}>
                  I agree to the{" "}
                  <Link href="/terms" style={{ color: "var(--accent)", textDecoration: "none" }}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/trainer-guidelines" style={{ color: "var(--accent)", textDecoration: "none" }}>Trainer Guidelines</Link>.
                  I confirm that all information provided is accurate.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            {step > 0 && (
              <button type="button" onClick={() => setStep(p => p - 1)} style={{
                padding: "11px 20px", border: "1px solid var(--line)",
                borderRadius: 10, background: "white", cursor: "pointer",
                fontSize: 14, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6,
              }}>
                <ArrowLeft size={15} /> Back
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={() => setStep(p => p + 1)} style={{
                flex: 1, padding: "11px", background: "var(--navy)",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 14, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.15s",
              }}>
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!form.agreeTerms || pending}
                style={{
                  flex: 1, padding: "11px",
                  background: (!form.agreeTerms || pending) ? "var(--muted)" : "var(--navy)",
                  color: "white", border: "none", borderRadius: 10,
                  fontSize: 14, fontWeight: 500,
                  cursor: (!form.agreeTerms || pending) ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "background 0.15s",
                }}
              >
                {pending ? "Submitting…" : "Submit application"}
                {!pending && <ArrowRight size={15} />}
              </button>
            )}
          </div>
        </form>
      </div>
    </AuthShell>
  );
}
