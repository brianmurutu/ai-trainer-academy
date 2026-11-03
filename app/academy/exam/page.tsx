"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
<<<<<<< HEAD
import { 
  Award, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight,
  BookOpen,
  DollarSign,
  Info
=======
import {
  Award,
  CheckCircle,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  BookOpen,
  Info,
  Star,
  Zap,
  Users,
>>>>>>> d950e182d713accc40d6b00347024f8418854729
} from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

export default function ExamPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { formatPrice, currency } = useCurrency();

<<<<<<< HEAD
  const examModules = [
    { title: "How AI training works", desc: "The business model behind the work, who pays, what for, and why it exists." },
    { title: "Passing the screening process", desc: "What recruiters check on a trial task, what predicts success, what gets you cut." },
    { title: "Annotation tasks", desc: "Labelling, classification, ranking, and the small formatting habits that separate good work from rejected work." },
    { title: "RLHF foundations", desc: "Preference judgements, ranking outputs, writing the tie-break rationale that reviewers trust." },
    { title: "Ground-truth research", desc: "Verifying claims, citing sources, reasoning about answers nobody can fully verify." },
    { title: "Instruction following", desc: "Reading long prompts without missing the constraint buried on line 14." },
    { title: "Markdown and JSON formatting", desc: "The format rules that quietly reject more candidates than any other single skill." },
    { title: "Safety and content policy", desc: "Refusals, edge cases, calibrating between over-blocking and under-blocking." }
  ];

  const outcomes = [
    { 
      title: "PDF Certificate", 
      desc: "Issued the moment you pass. Carries a unique verification URL anyone can check to verify credentials.", 
      icon: Award 
    },
    { 
      title: "LinkedIn Badge", 
      desc: "One-click add to your Certifications section. Surfaces your profile in recruiter searches for RLHF and AI training.", 
      icon: ({ size, ...props }: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      title: "Talent Pool Placement", 
      desc: "Certified candidates go in front of partner hiring platforms when a matching role comes up. Free to join.", 
      icon: Briefcase 
    }
  ];

  const steps = [
    { 
      step: "1", 
      title: "Study (free)", 
      desc: "Skim the Academy learning tracks if you've done this work before. Read it carefully if you're new to the domain." 
    },
    { 
      step: "2", 
      title: "Practice (free)", 
      desc: (
        <>
          Take the <Link href="/academy/mock-exam" style={{ color: "var(--accent)", textDecoration: "underline" }}>free practice exam</Link>. Same format, no timer pressure, no commitment, with detailed explanations.
        </>
      )
    },
    { 
      step: "3", 
      title: "Certify", 
      desc: "Buy when you're ready. 24 questions, 24 minutes, 80% passing score, and two attempts are included in your ticket." 
    }
=======
  const syllabus = [
    {
      code: "ATA-F1 / ATA-F2 / ATA-F3",
      title: "AI Training Industry & Platform Entry",
      desc: "How the annotation industry is structured, who the buyers are, what platform screening actually measures, and how to walk through your first evaluation task with confidence.",
    },
    {
      code: "ATA-C1",
      title: "RLHF & Alignment Fundamentals",
      desc: "The human feedback pipeline from reward modeling through policy optimization — and exactly how your annotation signals shape model behavior at each stage.",
    },
    {
      code: "ATA-C2",
      title: "Claim Verification & Evidence Construction",
      desc: "Research methodology for annotation: identifying authoritative sources, building multi-step fact chains, and distinguishing confirmed from plausible from unverifiable claims.",
    },
    {
      code: "ATA-C3",
      title: "Complex Prompt Parsing & Rubric Adherence",
      desc: "Reading multi-constraint prompts without missing buried rules, handling conflicting instructions, and auditing AI responses against layered, real-world rubrics.",
    },
    {
      code: "ATA-C4 / ATA-C5",
      title: "Formatting Standards & Safety Calibration",
      desc: "The two technical filters that quietly reject the most annotators: Markdown and JSON formatting precision, and calibrated safety reasoning that avoids both under- and over-refusal.",
    },
    {
      code: "ATA-T1 / ATA-T2",
      title: "Code & Data Evaluation (Technical Strand)",
      desc: "Python correctness and complexity auditing, SQL query logic, and structured data validation — tested only for candidates targeting technical annotation roles.",
    },
    {
      code: "ATA-D1 / ATA-D2 / ATA-D3",
      title: "Domain Specialist Content",
      desc: "Creative writing style alignment, clinical documentation and HIPAA requirements, and STEM reasoning with LaTeX verification. Each domain is tested at the depth actual hiring platforms use.",
    },
    {
      code: "ATA-C6",
      title: "Full Simulation Practicum",
      desc: "Ten unguided tasks combining every skill area under timed, realistic conditions — the closest you can get to a live platform assessment without one in front of you.",
    },
  ];

  const outcomes = [
    {
      icon: Award,
      title: "Verifiable PDF Certificate",
      desc: "Issued immediately on passing. Every certificate carries a unique ATA verification URL that stays live permanently — anyone can confirm your credential in two clicks.",
    },
    {
      icon: ({size, ...p}: {size: number, [k: string]: unknown}) => (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} {...p}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      title: "One-Click LinkedIn Badge",
      desc: "Adds directly to your LinkedIn Certifications section. Surfaces your profile in recruiter searches filtered by RLHF, annotation, and AI training keywords.",
    },
    {
      icon: Briefcase,
      title: "ATA Talent Directory Listing",
      desc: "Certified annotators are listed in the AI Trainer Academy talent directory. Partner hiring platforms search it first when roles matching your profile open up.",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: BookOpen,
      title: "Study — free",
      desc: "All 13 curriculum modules are free to read. Skim quickly if you've done this work before. Read carefully if you're newer to structured annotation.",
    },
    {
      num: "02",
      icon: Zap,
      title: "Practice — free",
      desc: (
        <>
          Take the{" "}
          <Link href="/academy/mock-exam" style={{ color: "var(--accent)", textDecoration: "underline", fontWeight: 600 }}>
            free ATA practice exam
          </Link>
          {" "}— 20 questions, same format and difficulty as the real exam, full answer explanations, no account required.
        </>
      ),
    },
    {
      num: "03",
      icon: Award,
      title: "Certify — one purchase",
      desc: "Buy your exam ticket when you're ready. 24 questions drawn from our full question bank, 24-minute limit, 80% passing threshold. Two attempts are included in every ticket.",
    },
>>>>>>> d950e182d713accc40d6b00347024f8418854729
  ];

  const faqs = [
    {
<<<<<<< HEAD
      q: "Do I have to pay?",
      a: "No. The free Academy covers the fundamentals, and studying is completely free. The exam and verifiable credential itself are paid, which covers verification hosting and talent registry listing."
    },
    {
      q: "Does it guarantee a job?",
      a: "It's a portable signal you can show on LinkedIn, your CV, or in an application. Platforms make their own hiring decisions, but the credential tells them you understand the work before the trial begins."
    },
    {
      q: "What if I fail?",
      a: "A free retake attempt is included with your purchase. There is no waiting period, so you can sit the exam again immediately, or take a few days to review the modules first."
    },
    {
      q: "Can I get a refund?",
      a: "Yes, within 14 days of purchase, as long as you haven't started an attempt yet. Refunds go back to the original payment method."
    },
    {
      q: "What is the exam format?",
      a: "Multiple choice and multi-select questions. Questions are drawn randomly from a larger question bank, so a second attempt won't show the exact same set."
    },
    {
      q: "Does it expire?",
      a: "No. It doesn't expire, and the public verification URL hosting stays live indefinitely."
    },
    {
      q: "What languages are supported?",
      a: "Currently English only. We track demand for other languages and will publish translations as the queue justifies it."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
=======
      q: "Is any of the study content paywalled?",
      a: "No. All 13 curriculum modules — including the simulation practicum — are free to read. You pay only for the exam itself, which covers the verification infrastructure and talent directory hosting.",
    },
    {
      q: "Does this credential guarantee a job offer?",
      a: "No certification can guarantee that, and any that claims otherwise is misleading you. What this credential does is remove recruiter doubt. Instead of wondering whether you understand the work, they can see you've already demonstrated it. That distinction matters most at the initial screening stage, which is where the majority of candidates are cut.",
    },
    {
      q: "I failed. What now?",
      a: "Every ticket includes a free second attempt with no waiting period. Take it immediately or spend a few days reviewing the modules where you lost points — whichever approach works better for you. After two attempts, additional retakes can be purchased at a reduced rate.",
    },
    {
      q: "Can I get a refund if I change my mind?",
      a: "Yes. Full refunds are available within 14 days of purchase, provided you haven't started an attempt. The refund goes back to the original payment method and typically clears within 5–10 business days.",
    },
    {
      q: "What is the exact exam format?",
      a: "24 questions combining single-choice, multi-select, and short scenario formats. Questions are drawn randomly from a larger question bank each time, so a second attempt doesn't simply replay the same set with answers you've memorised.",
    },
    {
      q: "Does the credential expire?",
      a: "No. The certificate has no expiry date, and the verification URL remains active permanently at no cost to you. We don't charge for continued hosting of your credential.",
    },
    {
      q: "Why is the exam in English only?",
      a: "English is the working language of the overwhelming majority of annotation platforms and task rubrics, including roles advertised as bilingual. We track demand for other language versions and will publish them when request volume justifies production.",
    },
    {
      q: "How is this different from other AI certificates?",
      a: "Most AI certificates test general awareness of concepts. This exam tests operational skill — the same tasks, formats, and judgment calls you'll encounter in real annotation work on the same week you pass. The questions are written by people who have done the work, not summarised from academic surveys of it.",
    },
  ];

  const toggleFaq = (idx: number) => setActiveFaq(activeFaq === idx ? null : idx);
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
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: 48, alignItems: "center" }} className="exam-hero-grid">
            <div>
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
                Industry Credential
              </span>
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-1px",
                marginBottom: 16,
                lineHeight: 1.25
              }}>
                Certified AI Training Fundamentals
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 28, maxWidth: 650 }}>
                A portable credential for AI training work. Built for people landing a first gig, switching careers, or wanting a signal that travels across hiring platforms. For people training AI for a living.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 13, color: "rgba(255,255,255,0.9)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={15} color="var(--accent)" />
                  <span>24 Questions · 24 Minutes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Award size={15} color="var(--accent)" />
                  <span>Passing Score: 80%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ShieldCheck size={15} color="var(--accent)" />
                  <span>2 Attempts Included</span>
                </div>
              </div>
            </div>

            {/* Certificate Visual Card */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              borderRadius: 20,
              padding: 32,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                opacity: 0.2
              }} />
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "var(--accent-light)",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20
              }}>
                <Award size={32} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>
                VERIFIED CREDENTIAL
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 12 }}>
                Certified AI Trainer
              </h3>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", width: "100%", padding: "16px 0", display: "flex", flexDirection: "column", gap: 6 }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>RLHF · Ground Truth Research · Instruction Following</p>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>ID: CERT-8F2D-9X1B</span>
              </div>
              <Link href="#unlock" style={{
                width: "100%",
                background: "white",
                color: "var(--navy)",
                padding: "10px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                marginTop: 8,
                transition: "background-color 0.15s"
              }} className="cert-preview-btn">
                Unlock Certification
=======

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="exam-hero">
          <div className="exam-hero-grid">
            {/* Left copy */}
            <div className="exam-hero-copy">
              <span className="exam-eyebrow">
                <Star size={11} style={{ display: "inline", marginRight: 5 }} />
                Industry Credential
              </span>
              <h1 className="exam-h1">
                Certified AI Trainer<br />
                <span style={{ color: "#60A5FA" }}>Fundamentals</span>
              </h1>
              <p className="exam-hero-sub">
                A verifiable credential built for annotation work. Tells hiring
                platforms you understand the job before the trial task begins —
                whether you're landing a first gig or moving up the rate ladder.
              </p>
              <div className="exam-hero-stats">
                {[
                  { icon: Clock, text: "24 questions · 24 minutes" },
                  { icon: Award, text: "80% passing threshold" },
                  { icon: ShieldCheck, text: "2 attempts per ticket" },
                  { icon: Users, text: "Talent directory listing included" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="exam-stat-pill">
                    <Icon size={13} color="#60A5FA" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="exam-hero-ctas">
                <Link href="#unlock" className="exam-hero-btn-primary">
                  Get Your Exam Ticket <ArrowRight size={15} />
                </Link>
                <Link href="/academy/modules" className="exam-hero-btn-secondary">
                  Study first — it&apos;s free
                </Link>
              </div>
            </div>

            {/* Right — credential preview card */}
            <div className="exam-cert-card">
              <div className="cert-glow" />
              <div className="cert-icon-wrap">
                <Award size={34} color="var(--accent)" />
              </div>
              <span className="cert-label">VERIFIED CREDENTIAL</span>
              <h3 className="cert-name">Certified AI Trainer</h3>
              <div className="cert-skills">
                RLHF · Claim Verification · Instruction Parsing · Safety Calibration
              </div>
              <div className="cert-id">
                ID: ATA-2025-&lt;unique&gt;
              </div>
              <div className="cert-check-row">
                <CheckCircle size={13} color="#34D399" />
                <span>Verification URL stays live permanently</span>
              </div>
              <Link href="#unlock" className="cert-cta-btn">
                Unlock This Credential
>>>>>>> d950e182d713accc40d6b00347024f8418854729
              </Link>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Value Prop Section */}
        <section style={{ background: "white", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
                A credential the hiring side recognizes.
              </h2>
              <p style={{ fontSize: 15, color: "var(--slate)", lineHeight: 1.6, maxWidth: 750, margin: "0 auto" }}>
                AI training pays well when you can read a long prompt carefully, judge between two model outputs, write a clean rubric, follow strict formatting rules, and reason about safety. Platforms screen for these skills with short trial tasks, and most candidates fail the trial. This certification lets the screening team see you already know the work, so the trial becomes a formality instead of a wall.
              </p>
            </div>
          </div>
        </section>

        {/* Exam Syllabus */}
        <section style={{ background: "var(--surface)", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 40, textAlign: "center" }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                What's on the exam
              </h2>
              <p style={{ fontSize: 15, color: "var(--slate)" }}>
                Eight modules, the same ones the free Academy covers.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20
            }}>
              {examModules.map((m, idx) => (
                <div key={idx} style={{
                  background: "white",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "var(--accent-light)", color: "var(--accent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700
                    }}>
                      {idx + 1}
                    </span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{m.title}</h3>
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5 }}>{m.desc}</p>
=======
        {/* ── Why it matters ───────────────────────────────────────── */}
        <section style={{ background: "white", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "var(--navy)", marginBottom: 20, letterSpacing: "-0.5px" }}>
              A credential the hiring side actually uses
            </h2>
            <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.75, maxWidth: 700, margin: "0 auto 24px" }}>
              AI annotation pays well when you can parse a 600-word rubric without
              missing the constraint on line 47, judge between two model outputs
              with competing strengths, write a rationale that reviewers trust,
              and calibrate safety decisions without over-flagging. Platforms test
              for exactly these skills in their trial tasks — and most applicants
              fail at that gate.
            </p>
            <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.75, maxWidth: 700, margin: "0 auto" }}>
              This certification demonstrates those skills before the trial starts.
              It doesn&apos;t replace the trial — it makes the trial a formality
              instead of a wall.
            </p>
          </div>
        </section>

        {/* ── Syllabus ─────────────────────────────────────────────── */}
        <section style={{ background: "var(--surface)", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--navy)", marginBottom: 10, letterSpacing: "-0.4px" }}>
                What the exam covers
              </h2>
              <p style={{ fontSize: 15, color: "var(--slate)" }}>
                Eight topic areas drawn from all four curriculum tracks.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {syllabus.map((item, idx) => (
                <div key={idx} className="syllabus-card">
                  <div className="syllabus-num">{String(idx + 1).padStart(2, "0")}</div>
                  <span className="syllabus-code">{item.code}</span>
                  <h3 className="syllabus-title">{item.title}</h3>
                  <p className="syllabus-desc">{item.desc}</p>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                </div>
              ))}
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Benefits Section */}
        <section style={{ background: "white", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                What you walk away with
              </h2>
              <p style={{ fontSize: 15, color: "var(--slate)" }}>
                Earn credentials that travel with you across platforms.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24
            }}>
              {outcomes.map((o, idx) => {
                const Icon = o.icon;
                return (
                  <div key={idx} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 16,
                    padding: 32,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "white", color: "var(--accent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                    }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{o.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>{o.desc}</p>
=======
        {/* ── Outcomes / What you get ──────────────────────────────── */}
        <section style={{ background: "white", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--navy)", marginBottom: 10, letterSpacing: "-0.4px" }}>
                What you walk away with
              </h2>
              <p style={{ fontSize: 15, color: "var(--slate)" }}>
                Three things that travel with you across every platform you work on.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {outcomes.map((o, idx) => {
                const Icon = o.icon;
                return (
                  <div key={idx} className="outcome-card">
                    <div className="outcome-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="outcome-title">{o.title}</h3>
                    <p className="outcome-desc">{o.desc}</p>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                  </div>
                );
              })}
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Timeline / How it works */}
        <section style={{ background: "var(--surface)", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ marginBottom: 48, textAlign: "center" }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--navy)" }}>
                How it works
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {steps.map((s, idx) => (
                <div key={idx} style={{
                  background: "white",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start"
                }}>
                  <span style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--accent)",
                    background: "var(--accent-light)",
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {s.step}
                  </span>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
=======
        {/* ── How it works ─────────────────────────────────────────── */}
        <section style={{ background: "var(--surface)", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--navy)", textAlign: "center", marginBottom: 48, letterSpacing: "-0.4px" }}>
              Three steps. One credential.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
              <div className="steps-line" />
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="step-card">
                    <div className="step-num-wrap">
                      <div className="step-icon-circle">
                        <Icon size={18} color="var(--accent)" />
                      </div>
                    </div>
                    <div className="step-body">
                      <div className="step-num-label">{s.num}</div>
                      <h3 className="step-title">{s.title}</h3>
                      <p className="step-desc">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
>>>>>>> d950e182d713accc40d6b00347024f8418854729
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Pricing / Unlock Block */}
        <section id="unlock" style={{ background: "white", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 550, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                Unlock your certification
              </h2>
              <p style={{ fontSize: 14, color: "var(--slate)" }}>
                Get certified and listing in our talent pool today.
              </p>
            </div>

            <div style={{
              background: "white",
              border: "2px solid var(--accent)",
              borderRadius: 20,
              padding: 40,
              boxShadow: "0 10px 30px rgba(26,111,191,0.05)",
              textAlign: "center"
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--accent)",
                background: "var(--accent-light)",
                padding: "4px 10px",
                borderRadius: 12,
                display: "inline-block",
                marginBottom: 16
              }}>
                EXAM TICKET
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                Certified AI Training Fundamentals
              </h3>

              {/* Dynamic Price display */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 6, marginBottom: 28 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: "var(--navy)" }}>
                  {formatPrice(2500, 19)}
                </span>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>{currency}</span>
              </div>

              {/* What is included */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, textAlign: "left" }}>
                {[
                  "2 attempts included",
                  "Digital verifiable certificate (PDF)",
                  "One-click LinkedIn Certification badge",
                  "Placement in partner talent registries",
                  "Lifetime listing hosting on our directory"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle size={15} color="var(--green)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "var(--slate)" }}>{item}</span>
=======
        {/* ── Pricing / Unlock ─────────────────────────────────────── */}
        <section id="unlock" style={{ background: "white", padding: "80px 24px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--navy)", marginBottom: 8, letterSpacing: "-0.4px" }}>
                Get your exam ticket
              </h2>
              <p style={{ fontSize: 14, color: "var(--slate)" }}>
                One purchase. Two attempts. Lifetime credential.
              </p>
            </div>

            <div className="pricing-card">
              <div className="pricing-card-top">
                <span className="pricing-badge">EXAM TICKET</span>
                <h3 className="pricing-title">Certified AI Training Fundamentals</h3>

                <div className="pricing-price-row">
                  <span className="pricing-price">{formatPrice(2500, 19)}</span>
                  <span className="pricing-currency">{currency} · one-time</span>
                </div>
              </div>

              <div className="pricing-features">
                {[
                  "2 attempts — no extra purchase on first retake",
                  "Verifiable PDF certificate with permanent URL",
                  "One-click LinkedIn Certifications badge",
                  "ATA talent directory listing — lifetime, free",
                  "Questions drawn randomly from full bank",
                  "14-day money-back guarantee (pre-attempt)",
                ].map((item, idx) => (
                  <div key={idx} className="pricing-feature-row">
                    <CheckCircle size={14} color="var(--green)" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                  </div>
                ))}
              </div>

<<<<<<< HEAD
              <Link href="/signup" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "var(--navy)",
                color: "white",
                padding: "14px 20px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background-color 0.15s"
              }} className="buy-btn">
                Sign in to purchase exam ticket <ArrowRight size={15} />
              </Link>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 16,
                color: "var(--muted)",
                fontSize: 11
              }}>
                <Info size={12} />
                <span>Requires a free user profile first.</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: 750, margin: "0 auto", padding: "80px 24px 100px" }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--navy)",
            textAlign: "center",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10
          }}>
            <HelpCircle size={22} color="var(--accent)" /> Common Questions
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} style={{
                  background: "white",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--navy)" }}>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--slate)" /> : <ChevronDown size={18} color="var(--slate)" />}
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: "0 24px 20px",
                      fontSize: 13.5,
                      color: "var(--slate)",
                      lineHeight: 1.6,
                      borderTop: "1px solid var(--line)",
                      paddingTop: 16,
                      background: "var(--surface)"
                    }}>
                      {faq.a}
                    </div>
=======
              <Link href="/signup" className="pricing-cta">
                Create account to purchase <ArrowRight size={15} />
              </Link>

              <div className="pricing-footnote">
                <Info size={12} />
                <span>A free AI Trainer Academy account is required to purchase and sit the exam.</span>
              </div>
            </div>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--muted)" }}>
              Want to try first?{" "}
              <Link href="/academy/mock-exam" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                Take the free practice exam →
              </Link>
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 100px" }}>
          <h2 style={{
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 700, color: "var(--navy)",
            textAlign: "center", marginBottom: 40,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <HelpCircle size={22} color="var(--accent)" /> Common questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item${isOpen ? " faq-open" : ""}`}
                >
                  <button onClick={() => toggleFaq(idx)} className="faq-btn">
                    <span className="faq-q">{faq.q}</span>
                    {isOpen
                      ? <ChevronUp size={17} color="var(--accent)" />
                      : <ChevronDown size={17} color="var(--slate)" />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer">{faq.a}</div>
>>>>>>> d950e182d713accc40d6b00347024f8418854729
                  )}
                </div>
              );
            })}
          </div>
<<<<<<< HEAD
        </section>
      </main>

      <Footer />

      <style>{`
        .cert-preview-btn:hover {
          background-color: var(--surface) !important;
        }
        .buy-btn:hover {
          background-color: var(--navy-800) !important;
        }
        @media (max-width: 768px) {
          .exam-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
=======

          <p style={{ textAlign: "center", marginTop: 40, fontSize: 14, color: "var(--muted)" }}>
            Still have questions?{" "}
            <Link href="/contact" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
              Contact us
            </Link>
            {" "}and a human will reply.
          </p>
        </section>
      </main>
      <Footer />

      <style>{`
        /* Hero */
        .exam-hero {
          background: linear-gradient(135deg, var(--navy) 0%, #101e3a 100%);
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }
        .exam-hero::before {
          content: '';
          position: absolute;
          top: -30%; left: -15%;
          width: 55%; height: 130%;
          background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%);
          pointer-events: none;
        }
        .exam-hero-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .exam-hero-copy { color: white; }
        .exam-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.75);
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.4px;
          margin-bottom: 22px;
          text-transform: uppercase;
        }
        .exam-h1 {
          font-size: clamp(32px, 4.5vw, 50px);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 18px;
        }
        .exam-hero-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 28px;
        }
        .exam-hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }
        .exam-stat-pill {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }
        .exam-hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .exam-hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: white;
          text-decoration: none;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 4px 20px rgba(37,99,235,0.35);
          transition: all 0.2s;
        }
        .exam-hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,99,235,0.45);
        }
        .exam-hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.15s;
        }
        .exam-hero-btn-secondary:hover { color: white; }

        /* Cert preview card */
        .exam-cert-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.25);
        }
        .cert-glow {
          position: absolute;
          top: -60px; right: -60px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%);
        }
        .cert-icon-wrap {
          width: 64px; height: 64px;
          border-radius: 16px;
          background: rgba(37,99,235,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .cert-label {
          font-size: 10px;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .cert-name {
          font-size: 19px;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }
        .cert-skills {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 12px 0;
          width: 100%;
          margin-bottom: 12px;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }
        .cert-id {
          font-size: 11px;
          font-family: var(--font-mono);
          color: rgba(37,99,235,0.8);
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }
        .cert-check-row {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        .cert-cta-btn {
          display: block;
          width: 100%;
          background: white;
          color: var(--navy);
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 700;
          text-align: center;
          position: relative;
          z-index: 1;
          transition: background 0.15s;
        }
        .cert-cta-btn:hover { background: var(--surface); }

        /* Syllabus */
        .syllabus-card {
          background: white;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 24px;
          position: relative;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .syllabus-card:hover {
          border-color: #B8CFFB;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }
        .syllabus-num {
          position: absolute;
          top: 20px; right: 20px;
          font-size: 32px;
          font-weight: 800;
          color: var(--line);
          font-family: var(--font-mono);
          line-height: 1;
        }
        .syllabus-code {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-light);
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 10px;
          font-family: var(--font-mono);
        }
        .syllabus-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 8px;
          line-height: 1.35;
          padding-right: 32px;
        }
        .syllabus-desc {
          font-size: 12.5px;
          color: var(--slate);
          line-height: 1.6;
        }

        /* Outcomes */
        .outcome-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .outcome-card:hover {
          border-color: #B8CFFB;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
        }
        .outcome-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: white;
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .outcome-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 10px;
        }
        .outcome-desc {
          font-size: 13.5px;
          color: var(--slate);
          line-height: 1.65;
        }

        /* Steps */
        .steps-line {
          position: absolute;
          left: 22px; top: 44px;
          width: 2px;
          height: calc(100% - 88px);
          background: var(--line);
          z-index: 0;
        }
        .step-card {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }
        .step-num-wrap {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .step-icon-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--accent-light);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 0 0 2px var(--line);
        }
        .step-body {
          background: white;
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 22px 24px;
          flex: 1;
        }
        .step-num-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          font-family: var(--font-mono);
          margin-bottom: 4px;
        }
        .step-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 6px;
        }
        .step-desc {
          font-size: 13.5px;
          color: var(--slate);
          line-height: 1.65;
        }

        /* Pricing */
        .pricing-card {
          background: white;
          border: 2px solid var(--accent);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(37,99,235,0.08);
        }
        .pricing-card-top {
          padding: 32px 36px;
          border-bottom: 1px solid var(--line);
          text-align: center;
        }
        .pricing-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          color: var(--accent);
          background: var(--accent-light);
          padding: 4px 14px;
          border-radius: 20px;
          margin-bottom: 14px;
          letter-spacing: 0.5px;
        }
        .pricing-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 20px;
        }
        .pricing-price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 8px;
        }
        .pricing-price {
          font-size: 40px;
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -1px;
          line-height: 1;
        }
        .pricing-currency {
          font-size: 14px;
          color: var(--muted);
        }
        .pricing-features {
          padding: 28px 36px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pricing-feature-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: var(--slate);
        }
        .pricing-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--navy);
          color: white;
          text-decoration: none;
          margin: 0 36px 12px;
          padding: 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          transition: background 0.15s, transform 0.15s;
        }
        .pricing-cta:hover {
          background: var(--navy-800);
          transform: translateY(-1px);
        }
        .pricing-footnote {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 36px 24px;
          font-size: 11.5px;
          color: var(--muted);
        }

        /* FAQ */
        .faq-item {
          background: white;
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .faq-item.faq-open {
          border-color: #B8CFFB;
          box-shadow: 0 4px 16px rgba(37,99,235,0.06);
        }
        .faq-btn {
          width: 100%;
          padding: 20px 24px;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: left;
          gap: 12px;
        }
        .faq-q {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--navy);
          line-height: 1.4;
        }
        .faq-answer {
          padding: 0 24px 20px;
          padding-top: 0;
          border-top: 1px solid var(--line);
          font-size: 13.5px;
          color: var(--slate);
          line-height: 1.7;
          padding-top: 16px;
          background: var(--surface);
        }

        @media (max-width: 900px) {
          .exam-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .exam-cert-card { max-width: 400px; }
        }
        @media (max-width: 600px) {
          .exam-hero { padding: 60px 20px; }
          .pricing-card-top, .pricing-features, .pricing-cta, .pricing-footnote {
            padding-left: 24px;
            padding-right: 24px;
          }
          .pricing-cta { margin-left: 24px; margin-right: 24px; }
          .steps-line { display: none; }
>>>>>>> d950e182d713accc40d6b00347024f8418854729
        }
      `}</style>
    </>
  );
}
