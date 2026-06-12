"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/courses";
import type { AdminCourse, UpdateCourseFormState } from "@/app/actions/courses";
import { ImageUploadZone } from "@/components/ImageUploadZone";
import {
  ArrowLeft, BookOpen, CheckCircle2, AlertCircle, Loader2,
  ImageIcon, Link2, ExternalLink,
} from "lucide-react";
import Link from "next/link";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TAGS = ["Fine-tuning", "Prompting", "RAG / Dev", "AI Safety", "MLOps", "Computer Vision", "AI Agents", "Data Science", "Machine Learning", "NLP", "Deep Learning", "Robotics", "Generative AI", "Other"];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", fontSize: 14,
  border: "1px solid var(--line)", borderRadius: 10,
  outline: "none", color: "var(--ink)", background: "white",
  fontFamily: "var(--font-display)", boxSizing: "border-box",
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

// ── Edit Form ────────────────────────────────────────────────────────────────
export function EditCourseForm({ course }: { course: AdminCourse }) {
  const router = useRouter();
  const [state, action, pending] = useActionState<UpdateCourseFormState, FormData>(updateCourse, undefined);
  const [ksh, setKsh] = useState(String(course.price_ksh ?? ""));

  useEffect(() => {
    if (state && "success" in state && state.success) {
      setTimeout(() => router.push("/admin/courses"), 1200);
    }
  }, [state, router]);

  const joinedWhatYoullLearn = (course.what_youll_learn ?? []).join("\n");
  const joinedPrereqs = (course.prerequisites ?? []).join("\n");

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
              Edit Course
            </h1>
            <p style={{ fontSize: 12.5, color: "var(--muted)" }}>
              Slug: <code style={{ fontSize: 11, background: "#F0F2F5", padding: "1px 6px", borderRadius: 4 }}>{course.slug}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Banners */}
      {state && "success" in state && state.success && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 18px", background: "#D1FAE5",
          border: "1px solid #6EE7B7", borderRadius: 10, marginBottom: 24,
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: 14, color: "#065F46", fontWeight: 500 }}>
            Course updated successfully! Redirecting…
          </span>
        </div>
      )}
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
        {/* Hidden fields */}
        <input type="hidden" name="id" value={course.id} />
        {/* Pass existing image URL so the server keeps it when no new file is uploaded */}
        <input type="hidden" name="existing_image_url" value={course.image_url ?? ""} />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── Basic Info ─────────────────────────────────────── */}
          <Section title="Course Details">
            <div>
              <Label>Course Title <span style={{ color: "var(--accent)" }}>*</span></Label>
              <input
                name="title" required defaultValue={course.title}
                placeholder="e.g. Fine-tuning LLaMA 3 with LoRA"
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
            <div>
              <Label hint="(shown on the course card)">Short Description <span style={{ color: "var(--accent)" }}>*</span></Label>
              <textarea
                name="description" required rows={2}
                defaultValue={course.description ?? ""}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
            <div>
              <Label hint="(shown on the course detail page)">Full Description</Label>
              <textarea
                name="long_description" rows={5}
                defaultValue={course.long_description ?? ""}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div>
                <Label>Level</Label>
                <select name="level" defaultValue={course.level ?? ""} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}>
                  <option value="">Select level</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <Label hint="e.g. 8 hours">Duration</Label>
                <input name="duration" defaultValue={course.duration ?? ""} placeholder="e.g. 8 hours"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <Label hint="(Select or type a custom category)">Category Tag</Label>
                <input
                  list="category-suggestions"
                  name="tag"
                  defaultValue={course.tag ?? ""}
                  placeholder="e.g. Fine-tuning, Agents, NLP..."
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
                <datalist id="category-suggestions">
                  {TAGS.map(t => <option key={t} value={t} />)}
                </datalist>
              </div>
            </div>
          </Section>

          {/* ── Featured Image & CTA ─────────────────────────── */}
          <Section title="Featured Image & Enrolment Link">
            <div>
              <Label>
                <ImageIcon size={13} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
                Featured Image
              </Label>
              <ImageUploadZone existingUrl={course.image_url} inputName="image_file" />
            </div>

            <div>
              <Label hint="Where learners go when they click the Enrol Now button">
                <Link2 size={13} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
                Enrolment / CTA Button URL
              </Label>
              <input
                name="button_url" type="url"
                defaultValue={course.button_url ?? ""}
                placeholder="https://t.me/very_special_link_bot/… or any payment / booking link"
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
              {course.button_url && (
                <a href={course.button_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--accent)", marginTop: 6, textDecoration: "none" }}>
                  <ExternalLink size={11} /> Test current link
                </a>
              )}
            </div>
          </Section>

          {/* ── Pricing ────────────────────────────────────────── */}
          <Section title="Pricing">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <Label>Price (USD) <span style={{ color: "var(--accent)" }}>*</span></Label>
                <input name="price_usd" type="number" min="0" step="1"
                  defaultValue={course.price_usd}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  onChange={(e) => {
                    const usd = parseFloat(e.target.value);
                    if (!isNaN(usd)) setKsh(String(Math.round(usd * 130)));
                  }}
                />
              </div>
              <div>
                <Label hint="(auto at $1 = KSH 130, or override)">Price (KSH)</Label>
                <input name="price_ksh" type="number" min="0"
                  value={ksh}
                  onChange={(e) => setKsh(e.target.value)}
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
            </div>
            <div style={{ padding: "10px 14px", background: "var(--surface)", borderRadius: 8, border: "1px solid var(--line)", fontSize: 12, color: "var(--slate)" }}>
              Set both to 0 for a free course. Learners see the KSH price by default.
            </div>
          </Section>

          {/* ── Metrics & Display ───────────────────────────── */}
          <Section title="Metrics & Display">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <Label hint="(shown on course cards, e.g. 4.8)">Initial Rating</Label>
                <input
                  name="rating"
                  type="number"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  placeholder="e.g. 4.8"
                  defaultValue={course.rating ?? 4.8}
                  style={inputStyle}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
              <div>
                <Label hint="(shown as 'X enrolled')">Manually Enrolled Learners</Label>
                <input
                  name="enrolled_count"
                  type="number"
                  min="0"
                  placeholder="e.g. 150"
                  defaultValue={course.enrolled_count ?? 0}
                  style={inputStyle}
                  onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
            </div>
          </Section>

          {/* ── Trainer ────────────────────────────────────────── */}
          <Section title="Trainer">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: 12 }}>
              <div>
                <Label>Trainer Full Name <span style={{ color: "var(--accent)" }}>*</span></Label>
                <input name="trainer_name" required defaultValue={course.trainer_name ?? ""}
                  placeholder="e.g. Dr. Amara Osei"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <Label hint="2 chars">Initials</Label>
                <input name="trainer_initials" maxLength={2} defaultValue={course.trainer_initials ?? ""}
                  placeholder="AO"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
              </div>
            </div>
            <div>
              <Label>Trainer Title / Role</Label>
              <input name="trainer_title" defaultValue={course.trainer_title ?? ""}
                placeholder="e.g. Lead AI Researcher at DeepTech Africa"
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <Label hint="(shown on the course detail page)">Trainer Bio</Label>
              <textarea name="trainer_bio" rows={3} defaultValue={course.trainer_bio ?? ""}
                placeholder="Brief background on the trainer."
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                onFocus={focusStyle} onBlur={blurStyle} />
            </div>
          </Section>

          {/* ── Learning Outcomes ──────────────────────────────── */}
          <Section title="Learning Outcomes and Prerequisites">
            <div>
              <Label hint="(one per line — shown as bullet points)">
                What You Will Learn <span style={{ color: "var(--accent)" }}>*</span>
              </Label>
              <textarea name="what_youll_learn" required rows={6}
                defaultValue={joinedWhatYoullLearn}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8, fontFamily: "var(--font-mono)", fontSize: 13 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
            <div>
              <Label hint="(one per line)">Prerequisites</Label>
              <textarea name="prerequisites" rows={3}
                defaultValue={joinedPrereqs}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8, fontFamily: "var(--font-mono)", fontSize: 13 }}
                onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>
          </Section>

          {/* ── Submit ─────────────────────────────────────────── */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <Link href="/admin/courses" style={{
              padding: "11px 22px", border: "1px solid var(--line)", borderRadius: 10,
              fontSize: 14, color: "var(--slate)", textDecoration: "none", background: "white",
            }}>
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending || (state !== undefined && "success" in state && state.success)}
              style={{
                padding: "11px 28px",
                background: pending ? "var(--muted)" : "var(--accent)",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                cursor: pending ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: pending ? "none" : "0 2px 8px var(--accent-glow)",
                transition: "background 0.15s",
              }}
            >
              {pending && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
              {pending ? "Saving…" : (state && "success" in state && state.success) ? "Saved!" : "Save Changes"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
