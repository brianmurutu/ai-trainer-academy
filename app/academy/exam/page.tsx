"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
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
} from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

export default function ExamPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { formatPrice, currency } = useCurrency();

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
  ];

  const faqs = [
    {
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

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
        
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
              </Link>
            </div>
          </div>
        </section>

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
                </div>
              ))}
            </div>
          </div>
        </section>

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
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
            </div>
          </div>
        </section>

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
                  </div>
                ))}
              </div>

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
                  )}
                </div>
              );
            })}
          </div>
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
        }
      `}</style>
    </>
  );
}
