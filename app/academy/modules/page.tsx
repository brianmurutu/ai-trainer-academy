import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
<<<<<<< HEAD
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Database, 
  PenTool, 
  Brain, 
  FileText, 
  AlertTriangle, 
  Sparkles,
  Shield
} from "lucide-react";

export default function ModulesPage() {
  const tracks = [
    {
      id: "foundation",
      title: "Foundation Track",
      description: "Everyone starts here. No prior knowledge needed.",
      bg: "var(--surface)",
      modules: [
        {
          id: "F1",
          slug: "how-ai-training-jobs-work",
          level: "Foundation",
          title: "How AI Training Jobs Work",
          description: "Find out what AI annotation is, what the work looks like day-to-day, what separates people who get consistent work from people who don't, and how to figure out which income tier you can target.",
          duration: "20 minutes",
          badge: "Start here",
          icon: Brain,
          color: "var(--accent)"
        },
        {
          id: "F2",
          slug: "passing-the-screening-process",
          level: "Foundation",
          title: "Passing the Screening Process",
          description: "Most candidates fail screening not because they lack the skills, but because they don't know what is being tested. This module breaks down every stage, the most common failure modes at each, and how to prepare for the real thing.",
          duration: "25 minutes",
          icon: ShieldCheck,
          color: "var(--green)"
        },
        {
          id: "F3",
          slug: "your-first-annotation-task",
          level: "Foundation",
          title: "Your First Annotation Task",
          description: "Walk through a complete pairwise comparison task step by step. By the end you've made a real annotation decision, written a rationale, and know what quality means in practice.",
          duration: "30 minutes",
          icon: FileText,
          color: "var(--accent)"
        }
      ]
    },
    {
      id: "core",
      title: "Core Curriculum",
      description: "Essential skills every annotator needs regardless of specialisation.",
      bg: "white",
      modules: [
        {
          id: "F4",
          slug: "foundations-of-rlhf",
          level: "Beginner",
          title: "Foundations of RLHF",
          description: "Understand the full RLHF pipeline — from pretraining to PPO — and learn exactly what annotators do, why quality signals matter, and how your feedback shapes model behavior.",
          duration: "30 minutes",
          badge: "UPDATED",
          icon: Sparkles,
          color: "var(--amber)"
        },
        {
          id: "F5",
          slug: "ground-truth-research-method",
          level: "Intermediate",
          title: "Ground Truth Research Method",
          description: "Learn how to research claims rigorously, build verifiable rationales with primary sources, and meet the evidence standards required for high-paying expert reviewer roles.",
          duration: "1 hour",
          badge: "UPDATED",
          icon: BookOpen,
          color: "var(--accent)"
        },
        {
          id: "F6",
          slug: "advanced-instruction-following",
          level: "Intermediate",
          title: "Advanced Instruction Following",
          description: "Master the skill of parsing complex, multi-part instructions, handling constraint conflicts, and evaluating whether AI responses genuinely follow instructions or only appear to.",
          duration: "1.5 hours",
          badge: "UPDATED",
          icon: GraduationCap,
          color: "var(--navy-800)"
        },
        {
          id: "F7",
          slug: "markdown-and-json-formatting-mastery",
          level: "Intermediate",
          title: "Markdown & JSON Formatting Mastery",
          description: "Learn the formatting standards that AI training platforms enforce: proper Markdown, valid JSON, structured outputs for tool use. Discover how formatting errors degrade model training.",
          duration: "1 hour",
          icon: Terminal,
          color: "var(--navy-700)"
        },
        {
          id: "C4",
          slug: "safety-and-content-policy",
          level: "Beginner",
          title: "Safety & Content Policy Triage",
          description: "Learn when an AI must refuse, when it must help, and how to catch the error no annotator can afford to miss — the over-flag. Master the triage judgment that separates trusted reviewers from suspended accounts.",
          duration: "45 minutes",
          badge: "NEW",
          icon: Shield,
          color: "#E11D48"
        },
        {
          id: "C6",
          slug: "final-practice-simulation",
          level: "Intermediate",
          title: "Final Practice: Full Task Simulation",
          description: "Zero theory. Ten unguided, high-fidelity tasks covering every skill in the Core curriculum — hallucination hunting, constraint parsing, safety triage, ground truth verification, JSON auditing, tone evaluation, and multi-constraint judgment.",
          duration: "1.5 hours",
          badge: "NEW",
          icon: AlertTriangle,
          color: "var(--amber)"
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Path",
      description: "Take this if you'll work on Python, SQL, or data evaluation tasks.",
      bg: "var(--surface)",
      modules: [
        {
          id: "T1",
          slug: "python-for-ai-training",
          level: "Intermediate",
          title: "Python for AI Training",
          description: "Learn what coding interview tasks and code review sessions test: correctness, complexity, edge cases, and style. Discover how to evaluate AI-generated Python as a professional annotator.",
          duration: "2 hours",
          icon: Terminal,
          color: "var(--accent)"
        },
        {
          id: "T2",
          slug: "sql-and-data-handling",
          level: "Intermediate",
          title: "SQL & Data Handling",
          description: "Build the SQL and data reasoning skills needed to evaluate AI-generated queries, spot logic errors in data analysis, and succeed in data science interview tasks.",
          duration: "1.5 hours",
          icon: Database,
          color: "var(--navy-800)"
        }
      ]
    },
    {
      id: "domain",
      title: "Domain Expert Tracks",
      description: "Only take the track that matches your background — you don't need all of them.",
      bg: "white",
      modules: [
        {
          id: "CW1",
          slug: "creative-writing-and-style-guide-adherence",
          level: "Intermediate",
          title: "Creative Writing & Style Guide Adherence",
          description: "Learn what creative writing tasks in AI training require: style guide adherence, prompt engineering, brainstorming quality, red teaming for creative content, and what writing interviewers look for.",
          duration: "2 hours",
          icon: PenTool,
          color: "var(--amber)"
        },
        {
          id: "MED1",
          slug: "medical-scribing-and-hipaa-for-ai",
          level: "Advanced",
          title: "Medical Scribing & HIPAA for AI",
          description: "Understand clinical case study format, core medical terminology, HIPAA's implications for AI training data, and how to evaluate AI medical responses against provided sources — even without a clinical background.",
          duration: "2 hours",
          icon: ShieldCheck,
          color: "var(--green)"
        },
        {
          id: "STEM1",
          slug: "stem-and-latex-math-solving",
          level: "Advanced",
          title: "STEM & LaTeX (Math Solving)",
          description: "Learn to write and evaluate mathematical reasoning with LaTeX, verify AI-generated STEM solutions step by step, and understand what olympiad-level and quantitative reasoning tasks require.",
          duration: "2.5 hours",
          icon: GraduationCap,
          color: "var(--accent)"
        }
      ]
    }
  ];

=======
import type { Metadata } from "next";
import {
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Database,
  PenTool,
  Brain,
  FileText,
  AlertTriangle,
  Sparkles,
  Shield,
  FlaskConical,
  Stethoscope,
  Calculator,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learning Modules | AI Trainer Academy",
  description:
    "Browse AI Trainer Academy's full self-paced curriculum. Four structured tracks covering annotation fundamentals, core evaluation skills, technical paths, and domain expertise — all free to study.",
  alternates: { canonical: "https://ai-trainer-academy.top/academy/modules" },
  openGraph: {
    title: "AI Trainer Academy Learning Modules",
    description:
      "Four tracks, 13 modules, and two certification options — free to study, built for working AI annotators.",
    url: "https://ai-trainer-academy.top/academy/modules",
  },
};

const tracks = [
  {
    id: "foundations",
    code: "Track 01",
    title: "Foundations Track",
    tagline: "Where your journey starts",
    description:
      "No background required. This track gives you an honest map of the industry, explains how the work is structured, and walks you through your very first real annotation task before you've spent a cent.",
    accentColor: "#2563EB",
    accentBg: "#EFF6FF",
    modules: [
      {
        id: "ATA-F1",
        slug: "the-ai-training-industry",
        level: "Beginner",
        duration: "20 min",
        badge: "Start here",
        title: "The AI Training Industry",
        description:
          "A ground-level look at how AI annotation ecosystems work: who the buyers are, what they actually pay for, how quality tiers are determined, and where your background fits into the income curve.",
        icon: Brain,
        isNew: false,
        isUpdated: false,
      },
      {
        id: "ATA-F2",
        slug: "the-assessment-gate",
        level: "Beginner",
        duration: "25 min",
        title: "Getting Through the Assessment Gate",
        description:
          "Platform screening is where most applicants are eliminated — not because they lack skills, but because they don't know what is being measured. This module decodes every stage and the most common failure modes at each.",
        icon: ShieldCheck,
        isNew: false,
        isUpdated: false,
      },
      {
        id: "ATA-F3",
        slug: "your-first-evaluation-task",
        level: "Beginner",
        duration: "30 min",
        title: "Your First Live Evaluation Task",
        description:
          "A complete, step-by-step walkthrough of a real pairwise comparison task: reading the prompt, isolating criteria, choosing between model outputs, and writing the rationale that reviewers actually trust.",
        icon: FileText,
        isNew: false,
        isUpdated: false,
      },
    ],
  },
  {
    id: "core",
    code: "Track 02",
    title: "Core Skills Track",
    tagline: "The skills every task demands",
    description:
      "This is the engine room. Every high-paying annotation role — regardless of domain — tests the six capabilities in this track. Study them in order the first time through.",
    accentColor: "#059669",
    accentBg: "#ECFDF5",
    modules: [
      {
        id: "ATA-C1",
        slug: "rlhf-and-alignment-deep-dive",
        level: "Beginner",
        duration: "30 min",
        badge: "Updated",
        title: "RLHF & Alignment Deep Dive",
        description:
          "The full reinforcement-learning-from-human-feedback pipeline explained from pretraining to policy update: reward modeling, PPO, DPO, and exactly where your annotation signal enters the loop.",
        icon: Sparkles,
        isNew: false,
        isUpdated: true,
      },
      {
        id: "ATA-C2",
        slug: "claim-verification-and-evidence-standards",
        level: "Intermediate",
        duration: "1 hr",
        badge: "Updated",
        title: "Claim Verification & Evidence Standards",
        description:
          "Research methodology built for annotation work: identifying primary sources, structuring multi-step fact chains, distinguishing confirmed from plausible from unverifiable, and building evidence files reviewers can audit.",
        icon: BookOpen,
        isNew: false,
        isUpdated: true,
      },
      {
        id: "ATA-C3",
        slug: "complex-prompt-parsing",
        level: "Intermediate",
        duration: "1.5 hr",
        badge: "Updated",
        title: "Complex Prompt Parsing",
        description:
          "How to read a 600-word rubric without missing the constraint on line 47. Covers nested instructions, conflicting rules, scope qualifiers, and the audit technique that catches the edge cases automated checks miss.",
        icon: GraduationCap,
        isNew: false,
        isUpdated: true,
      },
      {
        id: "ATA-C4",
        slug: "formatting-precision",
        level: "Intermediate",
        duration: "1 hr",
        title: "Formatting Precision: Markdown & JSON",
        description:
          "The silent filter that eliminates more annotators than any skill test. Learn the formatting standards AI platforms enforce: GitHub Flavored Markdown, nested JSON schema, tool-call output structure, and the escaping rules that break validation.",
        icon: Terminal,
        isNew: false,
        isUpdated: false,
      },
      {
        id: "ATA-C5",
        slug: "safety-calibration-and-policy-reasoning",
        level: "Beginner",
        duration: "45 min",
        badge: "New",
        title: "Safety Calibration & Policy Reasoning",
        description:
          "The annotation decision that costs the most mistakes: when to flag, when to pass, and why over-refusal is as damaging as under-refusal. Includes triage frameworks for ambiguous, dual-use, and borderline content.",
        icon: Shield,
        isNew: true,
        isUpdated: false,
      },
      {
        id: "ATA-C6",
        slug: "full-simulation-practicum",
        level: "Intermediate",
        duration: "1.5 hr",
        badge: "New",
        title: "Full Simulation Practicum",
        description:
          "Ten unguided, high-fidelity tasks combining every skill in this track — hallucination hunting, multi-constraint evaluation, safety triage, formatting audits, and evidence verification — under timed, realistic conditions.",
        icon: AlertTriangle,
        isNew: true,
        isUpdated: false,
      },
    ],
  },
  {
    id: "technical",
    code: "Track 03",
    title: "Technical Path",
    tagline: "For annotators who work with code and data",
    description:
      "Take this track only if coding tasks appear in your target role. It covers the specific skills platforms test when they hire for programming, SQL, and data evaluation work.",
    accentColor: "#7C3AED",
    accentBg: "#F5F3FF",
    modules: [
      {
        id: "ATA-T1",
        slug: "python-code-evaluation",
        level: "Intermediate",
        duration: "2 hr",
        title: "Python Code Evaluation for AI",
        description:
          "Auditing AI-generated Python: correctness against stated requirements, Big-O complexity, PEP 8 style, security hazards, and edge-case coverage. Includes hands-on examples taken from real coding interview task formats.",
        icon: Terminal,
        isNew: false,
        isUpdated: false,
      },
      {
        id: "ATA-T2",
        slug: "sql-and-structured-data-auditing",
        level: "Intermediate",
        duration: "1.5 hr",
        title: "SQL & Structured Data Auditing",
        description:
          "Reading AI-generated queries critically: JOIN logic, aggregation traps, subquery correctness, schema compatibility, and query execution order. Structured for annotators, not database administrators.",
        icon: Database,
        isNew: false,
        isUpdated: false,
      },
    ],
  },
  {
    id: "domain",
    code: "Track 04",
    title: "Domain Specialist Track",
    tagline: "Deep expertise, higher rates",
    description:
      "Each module targets a credentialed background. Choose the one that matches your professional training — you don't need all three, and attempting the wrong one wastes your time.",
    accentColor: "#D97706",
    accentBg: "#FEF3C7",
    modules: [
      {
        id: "ATA-D1",
        slug: "creative-writing-and-style-mastery",
        level: "Intermediate",
        duration: "2 hr",
        title: "Creative Writing & Style Guide Mastery",
        description:
          "Evaluating AI creative outputs against style guides: tone and voice alignment, originality scoring, pacing and structure, and red-teaming outputs for bland repetition and stylistic drift.",
        icon: PenTool,
        isNew: false,
        isUpdated: false,
      },
      {
        id: "ATA-D2",
        slug: "medical-documentation-and-hipaa",
        level: "Advanced",
        duration: "2 hr",
        title: "Medical Documentation & HIPAA Rules",
        description:
          "Clinical annotation for non-clinicians: SOAP note structure, medical terminology verification against provided sources, HIPAA's implications for AI training data, and what PHI redaction requires in practice.",
        icon: Stethoscope,
        isNew: false,
        isUpdated: false,
      },
      {
        id: "ATA-D3",
        slug: "stem-reasoning-and-latex-proofing",
        level: "Advanced",
        duration: "2.5 hr",
        title: "STEM Reasoning & LaTeX Proofing",
        description:
          "Mathematical proof verification, step-level logic auditing, and LaTeX equation formatting for annotators working on olympiad-level and quantitative reasoning tasks. Requires comfort with undergraduate-level mathematics.",
        icon: Calculator,
        isNew: false,
        isUpdated: false,
      },
    ],
  },
];

const levelColors: Record<string, { bg: string; color: string }> = {
  Beginner: { bg: "#ECFDF5", color: "#059669" },
  Intermediate: { bg: "#EFF6FF", color: "#2563EB" },
  Advanced: { bg: "#FEF3C7", color: "#D97706" },
};

export default function ModulesPage() {
>>>>>>> d950e182d713accc40d6b00347024f8418854729
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
<<<<<<< HEAD
        {/* Hero Section */}
        <section style={{
          background: "linear-gradient(135deg, var(--navy) 0%, #1A2E42 100%)",
          color: "white",
          padding: "80px 24px",
          textAlign: "center"
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <span style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              display: "inline-block",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Self-Paced & Free Curriculum
            </span>
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: 16,
              lineHeight: 1.2
            }}>
              AI Trainer Academy Learning Modules
            </h1>
            <p style={{
              fontSize: "clamp(16px, 2vw, 18px)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              maxWidth: 600,
              margin: "0 auto"
            }}>
              Foundation, core skills, technical paths, and domain expert tracks — free, self-paced, and built for AI trainers.
            </p>
          </div>
        </section>

        {/* Tracks Render */}
        {tracks.map((track) => (
          <section 
            key={track.id} 
            style={{ 
              background: track.bg, 
              padding: "80px 24px",
              borderBottom: "1px solid var(--line)"
            }}
          >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                  {track.title}
                </h2>
                <p style={{ fontSize: 15, color: "var(--slate)" }}>
                  {track.description}
                </p>
              </div>

              {/* Grid of Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24
              }}>
                {track.modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.id}
                      style={{
                        background: "white",
                        border: "1px solid var(--line)",
                        borderRadius: 16,
                        padding: 32,
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        position: "relative"
                      }}
                      className="module-card"
                    >
                      {/* Top Badges */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: `${m.color}15`,
                            color: m.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700
                          }}>
                            {m.id}
                          </span>
                          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)" }}>
                            {m.level}
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {m.badge && (
                            <span style={{
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: 12,
                              background: m.badge === "NEW" ? "rgba(225,29,72,0.1)" : "var(--accent-light)",
                              color: m.badge === "NEW" ? "#E11D48" : "var(--accent)",
                            }}>
                              {m.badge}
                            </span>
                          )}
                          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", fontSize: 12 }}>
                            <Clock size={13} />
                            <span>{m.duration}</span>
=======

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="modules-hero">
          <div className="modules-hero-inner">
            <span className="modules-eyebrow">
              Self-Paced · Free to Study · 4 Tracks · 13 Modules
            </span>
            <h1 className="modules-h1">
              AI Trainer Academy<br />
              <span style={{ color: "var(--accent)" }}>Learning Curriculum</span>
            </h1>
            <p className="modules-subtitle">
              Every module is written for people doing real annotation work —
              not for people who want to read about AI. Study free, certify when
              ready, and carry your credential into every platform you work with.
            </p>
            <div className="modules-hero-meta">
              {[
                { icon: BookOpen, label: "13 modules across 4 tracks" },
                { icon: Clock, label: "Avg. 1–2 hours each" },
                { icon: Award, label: "Certificate exam available" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="modules-meta-pill">
                  <Icon size={14} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tracks ──────────────────────────────────────────────── */}
        {tracks.map((track, trackIdx) => (
          <section
            key={track.id}
            style={{
              background: trackIdx % 2 === 0 ? "var(--surface)" : "white",
              padding: "80px 24px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              {/* Track Header */}
              <div className="track-header">
                <span
                  className="track-code-badge"
                  style={{
                    background: track.accentBg,
                    color: track.accentColor,
                  }}
                >
                  {track.code}
                </span>
                <div>
                  <h2 className="track-title">{track.title}</h2>
                  <p className="track-tagline" style={{ color: track.accentColor }}>
                    {track.tagline}
                  </p>
                  <p className="track-desc">{track.description}</p>
                </div>
              </div>

              {/* Module Cards Grid */}
              <div className="modules-grid">
                {track.modules.map((mod) => {
                  const Icon = mod.icon;
                  const lvl = levelColors[mod.level] ?? levelColors.Beginner;
                  return (
                    <div key={mod.id} className="module-card">
                      {/* Card top row */}
                      <div className="module-card-top">
                        <div className="module-card-left">
                          <span
                            className="module-id-badge"
                            style={{
                              background: track.accentBg,
                              color: track.accentColor,
                            }}
                          >
                            {mod.id}
                          </span>
                          <span
                            className="module-level-badge"
                            style={{ background: lvl.bg, color: lvl.color }}
                          >
                            {mod.level}
                          </span>
                        </div>
                        <div className="module-card-right">
                          {(mod.isNew || mod.isUpdated) && (
                            <span
                              className="module-status-badge"
                              style={{
                                background: mod.isNew ? "#FEF2F2" : "#EFF6FF",
                                color: mod.isNew ? "#DC2626" : "#2563EB",
                              }}
                            >
                              {mod.isNew ? "New" : "Updated"}
                            </span>
                          )}
                          <div className="module-duration">
                            <Clock size={12} />
                            <span>{mod.duration}</span>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                          </div>
                        </div>
                      </div>

<<<<<<< HEAD
                      {/* Title & Description */}
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 10, lineHeight: 1.4 }}>
                        {m.title}
                      </h3>
                      <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                        {m.description}
                      </p>

                      {/* Card Action */}
                      <Link 
                        href={`/courses/${m.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          color: "var(--accent)",
                          fontSize: 13,
                          fontWeight: 600,
                          borderTop: "1px solid var(--line)",
                          paddingTop: 16,
                          textDecoration: "none"
                        }}
                        className="module-link"
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Icon size={16} color="var(--accent)" />
                          <span>Start Free Module</span>
                        </span>
                        <ArrowRight size={14} className="arrow-icon" />
=======
                      {/* Divider accent */}
                      <div
                        className="module-accent-bar"
                        style={{ background: track.accentColor }}
                      />

                      {/* Title + Description */}
                      <h3 className="module-title">{mod.title}</h3>
                      <p className="module-desc">{mod.description}</p>

                      {/* CTA */}
                      <Link
                        href={`/courses/${mod.slug}`}
                        className="module-cta"
                        style={{ color: track.accentColor }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Icon size={15} />
                          <span>Start Module</span>
                        </span>
                        <ArrowRight size={14} className="module-arrow" />
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

<<<<<<< HEAD
        {/* Practice & Certification Section */}
        <section style={{ background: "var(--surface)", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                Ready to verify your skills?
              </h2>
              <p style={{ fontSize: 16, color: "var(--slate)" }}>
                Practice for free, then get certified to stand out to global hiring platforms.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24
            }} className="exam-grid-mobile">
              {/* Practice Mock Exam */}
              <div style={{
                background: "white",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--green)",
                    background: "var(--green-light)",
                    padding: "4px 10px",
                    borderRadius: 12,
                    display: "inline-block",
                    marginBottom: 16
                  }}>
                    Free Practice
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                    Free Mock Practice Exam
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, marginBottom: 24 }}>
                    20 questions in the same format as the real exam. No time pressure, no payment required, and full answer explanations are provided. Retake as many times as you like.
                  </p>
                </div>
                <Link href="/academy/mock-exam" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "var(--surface)",
                  color: "var(--navy)",
                  border: "1px solid var(--line)",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background-color 0.15s"
                }} className="practice-btn">
                  Start Practice Session <ArrowRight size={15} />
                </Link>
              </div>

              {/* Paid Certification Exam */}
              <div style={{
                background: "white",
                border: "2px solid var(--accent)",
                borderRadius: 16,
                padding: 40,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(26,111,191,0.03)"
              }}>
                <div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "white",
                    background: "var(--accent)",
                    padding: "4px 10px",
                    borderRadius: 12,
                    display: "inline-block",
                    marginBottom: 16
                  }}>
                    Verifiable Badge
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                    Certified AI Training Fundamentals
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, marginBottom: 24 }}>
                    The official exam. Pass at 80% to earn a verifiable digital credential. Add it to your CV, portfolio, and LinkedIn to stand out to top platforms hiring remote AI training specialists.
                  </p>
                </div>
                <Link href="/academy/exam" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "var(--accent)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background-color 0.15s"
                }} className="certify-btn">
                  Unlock Certification Exam <Award size={15} />
=======
        {/* ── Exam CTA ─────────────────────────────────────────────── */}
        <section style={{ background: "var(--surface)", padding: "80px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                Ready to certify what you know?
              </h2>
              <p style={{ fontSize: 16, color: "var(--slate)", maxWidth: 520, margin: "0 auto" }}>
                Study free, then take the official exam when you're ready. A verifiable credential that travels across every platform you work with.
              </p>
            </div>

            <div className="exam-cards-grid">
              {/* Practice Card */}
              <div className="exam-card practice-card">
                <span className="exam-card-badge free-badge">Free Practice</span>
                <h3 className="exam-card-title">Mock Certification Exam</h3>
                <p className="exam-card-desc">
                  20 questions, same format and difficulty as the real exam. No
                  time pressure, no account required to begin. Full answer
                  explanations after every question. Retake as many times as you
                  need.
                </p>
                <ul className="exam-feature-list">
                  {["Same format as the real exam", "Full answer walkthroughs", "Unlimited retakes — no account needed"].map((f) => (
                    <li key={f}>
                      <CheckCircle2 size={14} color="var(--green)" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/academy/mock-exam" className="exam-cta-secondary">
                  Take the Practice Exam <ArrowRight size={14} />
                </Link>
              </div>

              {/* Certification Card */}
              <div className="exam-card cert-card">
                <span className="exam-card-badge cert-badge">Verifiable Credential</span>
                <h3 className="exam-card-title">Certified AI Trainer — Fundamentals</h3>
                <p className="exam-card-desc">
                  The official ATA certification. Pass at 80% or above to earn
                  your verifiable digital credential. Add it to your CV,
                  LinkedIn, and platform profiles. Every certificate carries a
                  unique URL that anyone can check in seconds.
                </p>
                <ul className="exam-feature-list">
                  {["24 questions · 24-minute limit", "80% passing threshold · 2 attempts included", "PDF certificate + LinkedIn badge + talent listing"].map((f) => (
                    <li key={f}>
                      <CheckCircle2 size={14} color="var(--accent)" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/academy/exam" className="exam-cta-primary">
                  View Certification Details <ArrowRight size={14} />
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                </Link>
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* SignUp Banner */}
        <section style={{ background: "white", padding: "80px 24px", borderTop: "1px solid var(--line)" }}>
          <div style={{
            maxWidth: 900,
            margin: "0 auto",
            background: "linear-gradient(135deg, var(--navy) 0%, #1A2E42 100%)",
            borderRadius: 20,
            padding: "48px 40px",
            color: "white",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(13,27,42,0.15)"
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Track your progress & earn credentials
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: 600, margin: "0 auto 28px" }}>
              Create a free account to unlock module quizzes, track your learning roadmap, earn badges, and join the elite AI talent directory.
            </p>
            <Link href="/signup" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "white",
              color: "var(--navy)",
              padding: "12px 28px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.15s"
            }} className="signup-btn">
              Get Started Free <ArrowRight size={15} />
=======
        {/* ── Sign-up Banner ───────────────────────────────────────── */}
        <section style={{ background: "white", padding: "80px 24px", borderTop: "1px solid var(--line)" }}>
          <div className="signup-banner">
            <FlaskConical size={32} color="rgba(255,255,255,0.6)" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Track progress. Earn badges. Get noticed.
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 540, margin: "0 auto 28px" }}>
              Create a free account to unlock in-module quizzes, mark completed
              modules, earn track badges, and join the AI talent directory that
              partner hiring platforms search when roles open.
            </p>
            <Link href="/signup" className="signup-banner-btn">
              Create Free Account <ArrowRight size={15} />
>>>>>>> d950e182d713accc40d6b00347024f8418854729
            </Link>
          </div>
        </section>
      </main>
<<<<<<< HEAD

      <Footer />

      <style>{`
        .module-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.03);
          border-color: var(--accent) !important;
        }
        .module-link:hover .arrow-icon {
          transform: translateX(4px);
          transition: transform 0.2s;
        }
        .practice-btn:hover {
          background-color: var(--line) !important;
        }
        .certify-btn:hover {
          background-color: var(--accent-dark) !important;
        }
        .signup-btn:hover {
          background-color: var(--surface) !important;
        }
        @media(max-width: 768px) {
          .exam-grid-mobile {
            grid-template-columns: 1fr !important;
          }
=======
      <Footer />

      <style>{`
        /* Hero */
        .modules-hero {
          background: linear-gradient(135deg, var(--navy) 0%, #101e3a 100%);
          padding: 88px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .modules-hero::before {
          content: '';
          position: absolute;
          top: -30%; left: -15%;
          width: 60%; height: 120%;
          background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%);
          pointer-events: none;
        }
        .modules-hero::after {
          content: '';
          position: absolute;
          bottom: -20%; right: -10%;
          width: 45%; height: 80%;
          background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .modules-hero-inner {
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .modules-eyebrow {
          display: inline-block;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.7);
          padding: 5px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.4px;
          margin-bottom: 24px;
        }
        .modules-h1 {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
        }
        .modules-subtitle {
          font-size: 17px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          max-width: 620px;
          margin: 0 auto 32px;
        }
        .modules-hero-meta {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .modules-meta-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 7px 16px;
          border-radius: 30px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        /* Track Header */
        .track-header {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          margin-bottom: 40px;
        }
        .track-code-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
          margin-top: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .track-title {
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 4px;
          letter-spacing: -0.5px;
        }
        .track-tagline {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .track-desc {
          font-size: 14px;
          color: var(--slate);
          line-height: 1.65;
          max-width: 680px;
        }

        /* Module Grid */
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .module-card {
          background: white;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .module-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
          border-color: #B8CFFB;
        }
        .module-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .module-card-left {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .module-card-right {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .module-id-badge {
          font-size: 10px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.3px;
        }
        .module-level-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .module-status-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
        }
        .module-duration {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--muted);
        }
        .module-accent-bar {
          width: 32px;
          height: 3px;
          border-radius: 2px;
          margin-bottom: 14px;
          opacity: 0.6;
        }
        .module-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.35;
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }
        .module-desc {
          font-size: 13px;
          color: var(--slate);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 22px;
        }
        .module-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--line);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: gap 0.15s;
        }
        .module-arrow {
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .module-cta:hover .module-arrow {
          transform: translateX(4px);
        }

        /* Exam CTA Cards */
        .exam-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }
        .exam-card {
          border-radius: 18px;
          padding: 36px;
          display: flex;
          flex-direction: column;
        }
        .practice-card {
          background: white;
          border: 1px solid var(--line);
        }
        .cert-card {
          background: var(--navy);
          border: 2px solid rgba(37,99,235,0.4);
        }
        .exam-card-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 14px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          width: fit-content;
        }
        .free-badge { background: var(--green-light); color: var(--green); }
        .cert-badge { background: rgba(37,99,235,0.2); color: #93C5FD; }
        .exam-card-title {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
          letter-spacing: -0.3px;
        }
        .practice-card .exam-card-title { color: var(--navy); }
        .cert-card .exam-card-title { color: white; }
        .exam-card-desc {
          font-size: 13.5px;
          line-height: 1.65;
          margin-bottom: 20px;
          flex: 1;
        }
        .practice-card .exam-card-desc { color: var(--slate); }
        .cert-card .exam-card-desc { color: rgba(255,255,255,0.65); }
        .exam-feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 24px;
        }
        .exam-feature-list li {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
        }
        .practice-card .exam-feature-list li { color: var(--slate); }
        .cert-card .exam-feature-list li { color: rgba(255,255,255,0.75); }
        .exam-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          color: var(--navy);
          text-decoration: none;
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          border: 1px solid var(--line);
          transition: background 0.15s, border-color 0.15s;
        }
        .exam-cta-secondary:hover { background: var(--line); }
        .exam-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: var(--navy);
          text-decoration: none;
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          transition: background 0.15s;
        }
        .exam-cta-primary:hover { background: var(--surface); }

        /* Signup Banner */
        .signup-banner {
          max-width: 800px;
          margin: 0 auto;
          background: linear-gradient(135deg, var(--navy) 0%, #101e3a 100%);
          border-radius: 24px;
          padding: 56px 48px;
          text-align: center;
          color: white;
          box-shadow: 0 20px 60px rgba(10,15,29,0.2);
          position: relative;
          overflow: hidden;
        }
        .signup-banner::before {
          content: '';
          position: absolute;
          top: -40%; right: -20%;
          width: 50%; height: 150%;
          background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%);
        }
        .signup-banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: var(--navy);
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          z-index: 2;
        }
        .signup-banner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .track-header { flex-direction: column; gap: 12px; }
          .modules-grid { grid-template-columns: 1fr; }
          .exam-cards-grid { grid-template-columns: 1fr; }
          .signup-banner { padding: 40px 28px; }
        }
        @media (max-width: 480px) {
          .modules-hero { padding: 60px 20px 56px; }
          .modules-hero-meta { flex-direction: column; align-items: center; }
>>>>>>> d950e182d713accc40d6b00347024f8418854729
        }
      `}</style>
    </>
  );
}
