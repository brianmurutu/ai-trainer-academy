"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/app/actions/courses";
import { ArrowLeft, BookOpen, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Link2 } from "lucide-react";
import Link from "next/link";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TAGS = ["Fine-tuning", "Prompting", "RAG / Dev", "AI Safety", "MLOps", "Computer Vision", "Other"];

const input: React.CSSProperties = {
  width: "100%", padding: "11px 14px", fontSize: 14,
  border: "1px solid var(--line)", borderRadius: 10,
  outline: "none", color: "var(--ink)", background: "white",
  fontFamily: "var(--font-display)",
};
const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  (e.target.style.borderColor = "var(--accent)");
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  (e.target.style.borderColor = "var(--line)");

function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label style={{ display: "block", marginBottom: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{children}</span>
      {hint && <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 6 }}>{hint}</span>}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "white", borderRadius: 14,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 22px", borderBottom: "1px solid var(--line)",
        background: "#F8F9FB",
      }}>
        <h2 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 0.5 }}>
          {title}
        </h2>
      </div>
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 18 }}>
        {children}
      </div>
    </div>
  );
}

export default function NewCoursePage() {
  const router = useRouter();
  const [state, action, pending] = useActionState(createCourse, undefined);
  const [autoKsh, setAutoKsh] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreviewError, setImagePreviewError] = useState(false);

  useEffect(() => {
    if (state && "success" in state && state.success) {
      setTimeout(() => router.push("/admin/courses"), 1200);
    }
  }, [state, router]);

  return (
    <div style={{ padding: "32px", maxWidth: 860, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/courses" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 16,
        }}>
          <ArrowLeft size={14} /> Back to Courses
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 11, background: "var(--grad-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px var(--accent-glow)",
          }}>
            <BookOpen size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px" }}>
              Add New Course
            </h1>
            <p style={{ fontSize: 12.5, color: "var(--muted)" }}>
              Fill in the details below. The course will be live immediately on /courses.
            </p>
          </div>
        </div>
      </div>

      {/* Success banner */}
      {state && "success" in state && state.success && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 18px", background: "#D1FAE5",
          border: "1px solid #6EE7B7", borderRadius: 10, marginBottom: 24,
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: 14, color: "#065F46", fontWeight: 500 }}>
            Course created successfully! Redirecting...
          </span>
        </div>
      )}

      {/* Error banner */}
      {state && "error" in state && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 18px", background: "#FEE2E2",
          border: "1px solid #FECACA", borderRadius: 10, marginBottom: 24,
        }}>
          <AlertCircle size={18} color="#DC2626" />
          <span style={{ fontSize: 14, color: "#991B1B" }}>{state.error}</span>
        </div>
      )}

      <form action={action}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── Basic Info ─────────────────────────────────────── */}
          <Section title="Course Details">
            <div>
              <Label>Course Title <span style={{ color: "var(--accent)" }}>*</span></Label>
              <input
                name="title"
                required
                placeholder="e.g. Fine-tuning LLaMA 3 with LoRA"
                style={input}
                onFocus={focusStyle} onBlur={blurStyle}
              />
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                A slug will be auto-generated from this title.
              </p>
            </div>

            <div>
              <Label hint="(shown on the course card)">Short Description <span style={{ color: "var(--accent)" }}>*</span></Label>
              <textarea
                name="description"
                required
                rows={2}
                placeholder="One or two sentences summarising what learners will achieve."
                style={{ ...input, resize: "vertical", lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>

            <div>
              <Label hint="(shown on the course detail page)">Full Description</Label>
              <textarea
                name="long_description"
                rows={5}
                placeholder="Detailed overview of the course content, approach, and outcomes."
                style={{ ...input, resize: "vertical", lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div>
                <Label>Level</Label>
                <select name="level" style={input} onFocus={focusStyle} onBlur={blurStyle}>
                  <option value="">Select level</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <Label hint="e.g. 8 hours">Duration</Label>
                <input
                  name="duration"
                  placeholder="e.g. 8 hours"
                  style={input}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
              <div>
                <Label>Category Tag</Label>
                <select name="tag" style={input} onFocus={focusStyle} onBlur={blurStyle}>
                  <option value="">Select tag</option>
                  {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </Section>

          {/* ── Pricing ────────────────────────────────────────── */}
          <Section title="Pricing">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <Label>Price (USD) <span style={{ color: "var(--accent)" }}>*</span></Label>
                <input
                  name="price_usd"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 120"
                  style={input}
                  onFocus={focusStyle} onBlur={blurStyle}
                  onChange={(e) => {
                    const usd = parseFloat(e.target.value);
                    if (!isNaN(usd)) setAutoKsh(String(Math.round(usd * 130)));
                  }}
                />
              </div>
              <div>
                <Label hint="(auto-calculated at $1 = KSH 130, or override)">Price (KSH)</Label>
                <input
                  name="price_ksh"
                  type="number"
                  min="0"
                  placeholder="e.g. 15600"
                  value={autoKsh}
                  onChange={(e) => setAutoKsh(e.target.value)}
                  style={input}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
            </div>
            <div style={{
              padding: "10px 14px", background: "var(--surface)",
              borderRadius: 8, border: "1px solid var(--line)",
              fontSize: 12, color: "var(--slate)",
            }}>
              Set both to 0 for a free course. Learners will see the KSH price by default.
            </div>
          </Section>

          {/* ── Media & Enrolment ───────────────────────────── */}
          <Section title="Media & Enrolment Link">
            <div>
              <Label hint="Paste a direct image link from your Telegram files bot">
                <ImageIcon size={13} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
                Featured Image URL
              </Label>
              <input
                name="image_url"
                type="url"
                value={imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); setImagePreviewError(false); }}
                placeholder="https://t.me/very_special_link_bot/… or any direct image URL"
                style={input}
                onFocus={focusStyle} onBlur={blurStyle}
              />
              {imageUrl && !imagePreviewError && (
                <div style={{ marginTop: 10, borderRadius: 10, overflow: "hidden", border: "1px solid var(--line)", maxHeight: 200 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Featured image preview"
                    onError={() => setImagePreviewError(true)}
                    style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                  />
                </div>
              )}
              {imageUrl && imagePreviewError && (
                <p style={{ fontSize: 11, color: "#DC2626", marginTop: 6 }}>
                  ⚠ Could not load preview — make sure the URL is a direct image link.
                </p>
              )}
            </div>
            <div>
              <Label hint="Where learners go when they click Enrol Now">
                <Link2 size={13} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
                Enrolment / CTA Button URL
              </Label>
              <input
                name="button_url"
                type="url"
                placeholder="https://t.me/very_special_link_bot/… or Stripe / Calendly link"
                style={input}
                onFocus={focusStyle} onBlur={blurStyle}
              />
              <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>
                This link appears behind the &quot;Enrol Now&quot; button on the course detail page.
              </p>
            </div>
          </Section>

          {/* ── Trainer Info ───────────────────────────────────── */}
          <Section title="Trainer">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 12 }}>
              <div>
                <Label>Trainer Full Name <span style={{ color: "var(--accent)" }}>*</span></Label>
                <input
                  name="trainer_name"
                  required
                  placeholder="e.g. Dr. Amara Osei"
                  style={input}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
              <div>
                <Label hint="2 chars">Initials</Label>
                <input
                  name="trainer_initials"
                  maxLength={2}
                  placeholder="AO"
                  style={input}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
            </div>
            <div>
              <Label>Trainer Title / Role</Label>
              <input
                name="trainer_title"
                placeholder="e.g. Lead AI Researcher at DeepTech Africa"
                style={input}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
            <div>
              <Label hint="(shown on the course detail page)">Trainer Bio</Label>
              <textarea
                name="trainer_bio"
                rows={3}
                placeholder="Brief background on the trainer's expertise and experience."
                style={{ ...input, resize: "vertical", lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
          </Section>

          {/* ── Curriculum ─────────────────────────────────────── */}
          <Section title="Learning Outcomes and Prerequisites">
            <div>
              <Label hint="(one per line — shown as bullet points)">
                What You Will Learn <span style={{ color: "var(--accent)" }}>*</span>
              </Label>
              <textarea
                name="what_youll_learn"
                required
                rows={6}
                placeholder={"Prepare datasets for fine-tuning\nUnderstand LoRA rank decomposition\nTrain a model on a single GPU\nEvaluate model performance"}
                style={{ ...input, resize: "vertical", lineHeight: 1.8, fontFamily: "var(--font-mono)", fontSize: 13 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
            <div>
              <Label hint="(one per line)">Prerequisites</Label>
              <textarea
                name="prerequisites"
                rows={3}
                placeholder={"Basic Python knowledge\nFamiliarity with Hugging Face ecosystem"}
                style={{ ...input, resize: "vertical", lineHeight: 1.8, fontFamily: "var(--font-mono)", fontSize: 13 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
          </Section>

          {/* ── Submit ─────────────────────────────────────────── */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <Link href="/admin/courses" style={{
              padding: "11px 22px", border: "1px solid var(--line)", borderRadius: 10,
              fontSize: 14, color: "var(--slate)", textDecoration: "none",
              background: "white",
            }}>
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending || (state !== undefined && "success" in state && state.success)}
              style={{
                padding: "11px 28px", background: pending ? "var(--muted)" : "var(--accent)",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 14, fontWeight: 600, cursor: pending ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: pending ? "none" : "0 2px 8px var(--accent-glow)",
                transition: "background 0.15s",
              }}
            >
              {pending && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
              {pending ? "Creating..." : (state && "success" in state && state.success) ? "Done!" : "Create Course"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
