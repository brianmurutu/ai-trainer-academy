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
      id: "kickstart",
      title: "Kickstart Track",
      description: "Get started here. Learn the foundational landscape of AI model training.",
      bg: "var(--surface)",
      modules: [
        {
          id: "K1",
          slug: "intro-ai-training-optimization",
          level: "Beginner",
          title: "Introduction to AI Training and Optimization",
          description: "Learn how human annotation and dataset curation drive reinforcement learning, and explore annotation grading systems, daily workflows, and career paths.",
          duration: "20 minutes",
          badge: "Start here",
          icon: Brain,
          color: "var(--accent)"
        },
        {
          id: "K2",
          slug: "acing-platform-assessments",
          level: "Beginner",
          title: "Acing the Platform Assessments",
          description: "Most candidates fail screening not from lack of skill, but because they miss what is being evaluated. Master assessment formats, instruction parsing, and quality rules.",
          duration: "25 minutes",
          icon: ShieldCheck,
          color: "var(--green)"
        },
        {
          id: "K3",
          slug: "first-evaluation-task",
          level: "Beginner",
          title: "Executing Your First Evaluation Task",
          description: "Step through a pairwise response comparison task. Learn how to rank model outputs, isolate errors, and write professional rubrics.",
          duration: "30 minutes",
          icon: FileText,
          color: "var(--accent)"
        }
      ]
    },
    {
      id: "core",
      title: "Professional Core",
      description: "Essential capabilities every model alignment specialist needs.",
      bg: "white",
      modules: [
        {
          id: "P1",
          slug: "alignment-rlhf-deep-dive",
          level: "Beginner",
          title: "Deep Dive into Alignment & RLHF",
          description: "Understand the technical pipeline behind model alignment, including RLHF, PPO, DPO, reward modeling, and loss metrics.",
          duration: "30 minutes",
          badge: "UPDATED",
          icon: Sparkles,
          color: "var(--amber)"
        },
        {
          id: "P2",
          slug: "fact-verification-research",
          level: "Intermediate",
          title: "Fact Verification & Ground Truth Research",
          description: "Learn how to fact-check responses rigorously, locate primary sources, and build verifiable truth files to back up your judgments.",
          duration: "1 hour",
          badge: "UPDATED",
          icon: BookOpen,
          color: "var(--accent)"
        },
        {
          id: "P3",
          slug: "instruction-parsing-adherence",
          level: "Intermediate",
          title: "Instruction Parsing and Rubric Adherence",
          description: "Master the art of auditing long, complex prompts containing nested rules, style constraints, and negative constraints.",
          duration: "1.5 hours",
          badge: "UPDATED",
          icon: GraduationCap,
          color: "var(--navy-800)"
        },
        {
          id: "P4",
          slug: "data-formatting-syntax-validation",
          level: "Intermediate",
          title: "Data Formatting, JSON & Markdown Syntax",
          description: "Learn syntax standards for AI data: clean GitHub Flavored Markdown (GFM), structured JSON schemas, and escaping symbols.",
          duration: "1 hour",
          icon: Terminal,
          color: "var(--navy-700)"
        },
        {
          id: "P5",
          slug: "safety-triage-policy-compliance",
          level: "Beginner",
          title: "Safety Triage and Policy Compliance",
          description: "Learn how to triage prompts for safety hazards, recognize over-flagging errors, and align evaluations with compliance policies.",
          duration: "45 minutes",
          badge: "NEW",
          icon: Shield,
          color: "#E11D48"
        },
        {
          id: "P6",
          slug: "full-task-player-simulation",
          level: "Intermediate",
          title: "Full-Scale Task Player Simulation",
          description: "Zero theory. Practice ranking and rationalizing multi-constraint tasks in a high-fidelity workspace simulator.",
          duration: "1.5 hours",
          badge: "NEW",
          icon: AlertTriangle,
          color: "var(--amber)"
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Engineering",
      description: "Specialized training paths for programming, SQL auditing, and database validation.",
      bg: "var(--surface)",
      modules: [
        {
          id: "TE1",
          slug: "code-evaluation-python-auditing",
          level: "Intermediate",
          title: "Code Evaluation & Python Auditing for AI",
          description: "Learn to audit code correctness, verify runtime complexity (Big O), PEP8 style, and security hazards in Python outputs.",
          duration: "2 hours",
          icon: Terminal,
          color: "var(--accent)"
        },
        {
          id: "TE2",
          slug: "db-query-auditing-sql",
          level: "Intermediate",
          title: "Database Query Auditing and SQL Analysis",
          description: "Verify SQL syntax, correct JOIN conditions, aggregates, database schema compatibility, and query execution performance.",
          duration: "1.5 hours",
          icon: Database,
          color: "var(--navy-800)"
        }
      ]
    },
    {
      id: "domain",
      title: "Expert Domain Tracks",
      description: "Deep-dives into professional specialties. Choose the track matching your academic or professional background.",
      bg: "white",
      modules: [
        {
          id: "EX1",
          slug: "creative-writing-style-alignment",
          level: "Intermediate",
          title: "Creative Writing and Stylistic Alignment",
          description: "Audit style guides, tone tuning, pacing, and originality, and red-team creative model outputs for monotony.",
          duration: "2 hours",
          icon: PenTool,
          color: "var(--amber)"
        },
        {
          id: "EX2",
          slug: "healthcare-scribing-hipaa-privacy",
          level: "Advanced",
          title: "Healthcare Scribing and Privacy Regulations (HIPAA) in AI",
          description: "Format SOAP clinical summaries, verify medical terminology, and strictly follow HIPAA rules regarding Protected Health Information (PHI).",
          duration: "2 hours",
          icon: ShieldCheck,
          color: "var(--green)"
        },
        {
          id: "EX3",
          slug: "stem-latex-proof-reasoning",
          level: "Advanced",
          title: "STEM & LaTeX Proofing for Advanced Reasoning",
          description: "Review mathematical proofs, verify step-by-step logic derivations, and format equations using LaTeX syntax.",
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
