import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
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

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--surface)" }}>
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
                          </div>
                        </div>
                      </div>

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
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

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
                </Link>
              </div>
            </div>
          </div>
        </section>

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
            </Link>
          </div>
        </section>
      </main>

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
        }
      `}</style>
    </>
  );
}
