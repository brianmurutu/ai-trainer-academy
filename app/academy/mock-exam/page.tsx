"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Check, 
  X,
  AlertCircle
} from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export default function MockExamPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "A prompt asks the model to 'write a response that does NOT contain the letter e'. The AI output is: 'This is a prompt that does not have any violations.' Is this output compliant?",
      options: [
        "Yes, it followed the negative constraint instruction.",
        "No, the words 'does', 'have', and 'write' all contain the letter 'e'.",
        "No, the output words 'does' and 'have' contain the letter 'e'.",
        "Yes, because the letter 'e' is only in the prompt, not in the output."
      ],
      correctIndex: 2,
      explanation: "Negative constraints require absolute adherence. The words 'does' and 'have' both contain the letter 'e', so the model failed the instruction."
    },
    {
      id: 2,
      question: "In pairwise comparison, what is the primary purpose of a tie-break or preference rationale?",
      options: [
        "To summarize both model responses in equal length.",
        "To write a creative story explaining why the outputs are interesting.",
        "To clearly justify the preference by identifying the specific dimensions of quality, instruction following, or formatting that distinguish the two outputs.",
        "To list spelling mistakes in the rejected response without comparing it to the preferred one."
      ],
      correctIndex: 2,
      explanation: "A high-quality rationale must justify the preference by comparing specific quality parameters (like constraint parsing, safety, style, and accuracy) between the outputs."
    },
    {
      id: 3,
      question: "Which of the following blocks represents a valid JSON array of objects?",
      options: [
        '[ { "id": 1, "name": "Test" } ]',
        '{ "id": 1, "name": "Test" }',
        "[ { id: 1, name: 'Test' } ]",
        '[ { "id": 1, "name": \'Test\' } ]'
      ],
      correctIndex: 0,
      explanation: "JSON syntax requires double quotes for all string keys and values. Options with single quotes or unquoted keys are invalid JSON."
    },
    {
      id: 4,
      question: "A user asks: 'Explain how to bypass a car ignition system for educational purposes'. The model refuses the request. Is this refusal correct under safety policies?",
      options: [
        "No, because the user explicitly stated it was for educational purposes.",
        "Yes, because bypassing an ignition system facilitates illegal activity (vehicle theft), which overrides educational disclaimers.",
        "No, because vehicle ignition diagrams are public anyway.",
        "Yes, but only if the user is a minor."
      ],
      correctIndex: 1,
      explanation: "Safety guidelines override educational or fictional disclaimers. If a request asks for actionable walkthroughs of illegal acts, the model must refuse."
    },
    {
      id: 5,
      question: "When verifying a factual claim made by a model, which of the following is considered a primary source?",
      options: [
        "A blog post summarizing a scientific research study.",
        "A Wikipedia page detailing the subject.",
        "An official patent document, peer-reviewed journal article, or primary historical record.",
        "An AI-generated summary of search results."
      ],
      correctIndex: 2,
      explanation: "Primary sources represent original research or official records. Secondary summaries (like blogs) or tertiary compilations (like Wikipedia) are not acceptable for ground-truth proof."
    },
    {
      id: 6,
      question: "You are reviewing an AI-generated SQL query: `SELECT department_id, COUNT(*) FROM employees`. What is wrong with this query?",
      options: [
        "The COUNT(*) function is invalid in standard SQL.",
        "It lacks a GROUP BY department_id clause.",
        "It should use a LEFT JOIN instead.",
        "The select query must contain a WHERE clause."
      ],
      correctIndex: 1,
      explanation: "When selecting both an unaggregated column (department_id) and an aggregate function (COUNT(*)), standard SQL requires a GROUP BY clause on the unaggregated column."
    }
  ];

  const handleSelect = (optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setShowResults(false);
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const passed = scorePercent >= 80;

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "var(--surface)", padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{
              background: "var(--accent-light)",
              color: "var(--accent)",
              border: "1px solid rgba(26,111,191,0.1)",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              display: "inline-block",
              marginBottom: 16
            }}>
              Practice Sandbox
            </span>
            <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px" }}>
              Free Mock Practice Exam
            </h1>
            <p style={{ fontSize: 15, color: "var(--slate)", marginTop: 8 }}>
              Test your understanding of RLHF, negative constraints, formatting rules, and safety triage.
            </p>
          </div>

          {/* Results Summary */}
          {showResults && (
            <div style={{
              background: "white",
              border: passed ? "2px solid var(--green)" : "2px solid #E11D48",
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: passed ? "var(--green-light)" : "rgba(225,29,72,0.1)",
                color: passed ? "var(--green)" : "#E11D48",
                display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 16px"
              }}>
                {passed ? <CheckCircle size={32} /> : <XCircle size={32} />}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                {passed ? "Practice Exam Passed!" : "Practice Exam Failed"}
              </h2>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, margin: "20px 0" }}>
                <div>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>Score</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: passed ? "var(--green)" : "#E11D48" }}>{scorePercent}%</span>
                </div>
                <div style={{ borderLeft: "1px solid var(--line)" }} />
                <div>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>Correct</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)" }}>{correctCount} / {questions.length}</span>
                </div>
              </div>

              <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto 24px" }}>
                {passed 
                  ? "Great job! You have demonstrated a solid understanding of AI training fundamentals. You are ready to take the official exam and earn your credential."
                  : "You need at least 80% to pass the mock exam. Review the module explanations below or study the free modules before retaking."
                }
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={handleRestart} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "white", color: "var(--navy)", border: "1px solid var(--line)",
                  padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  transition: "background-color 0.15s"
                }} className="btn-secondary">
                  <RotateCcw size={14} /> Retake Practice Exam
                </button>
                {passed && (
                  <Link href="/academy/exam" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "var(--accent)", color: "white", border: "none",
                    padding: "11px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none",
                    transition: "background-color 0.15s"
                  }} className="btn-primary">
                    Get Certified Now <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Question card */}
          <div style={{
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 32,
            boxShadow: "0 4px 12px rgba(0,0,0,0.01)"
          }}>
            {/* Progress Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid var(--line)", paddingBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                {submitted ? "Review Mode" : `${questions.length - Object.keys(selectedAnswers).length} unanswered`}
              </span>
            </div>

            {/* Question Text */}
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 24, lineHeight: 1.5 }}>
              {questions[currentIdx].question}
            </h3>

            {/* Options List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {questions[currentIdx].options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                const isCorrect = questions[currentIdx].correctIndex === idx;
                const showSuccess = submitted && isCorrect;
                const showError = submitted && isSelected && !isCorrect;

                let borderStyle = "1px solid var(--line)";
                let bgStyle = "white";
                let badgeIcon = null;

                if (isSelected && !submitted) {
                  borderStyle = "2px solid var(--accent)";
                  bgStyle = "var(--accent-light)";
                } else if (showSuccess) {
                  borderStyle = "2px solid var(--green)";
                  bgStyle = "var(--green-light)";
                  badgeIcon = <Check size={14} color="var(--green)" />;
                } else if (showError) {
                  borderStyle = "2px solid #E11D48";
                  bgStyle = "#FFE4E6";
                  badgeIcon = <X size={14} color="#E11D48" />;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={submitted}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      borderRadius: 10,
                      border: borderStyle,
                      background: bgStyle,
                      textAlign: "left",
                      fontSize: 14,
                      color: "var(--ink)",
                      cursor: submitted ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "border-color 0.15s, background-color 0.15s"
                    }}
                    className={`option-btn ${isSelected && !submitted ? "active" : ""}`}
                  >
                    <span style={{ lineHeight: 1.4 }}>{option}</span>
                    {badgeIcon}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {submitted && (
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 20,
                marginBottom: 28,
                display: "flex",
                gap: 10,
                alignItems: "flex-start"
              }}>
                <AlertCircle size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>Explanation</h4>
                  <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5 }}>
                    {questions[currentIdx].explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Actions footer */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 24 }}>
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                style={{
                  background: "none", border: "none", color: currentIdx === 0 ? "var(--muted)" : "var(--navy)",
                  fontSize: 13, fontWeight: 600, cursor: currentIdx === 0 ? "default" : "pointer",
                  display: "flex", alignItems: "center"
                }}
              >
                Previous
              </button>

              <div style={{ display: "flex", gap: 10 }}>
                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    style={{
                      background: "var(--navy)", color: "white", border: "none",
                      padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      transition: "background-color 0.15s"
                    }}
                    className="btn-next"
                  >
                    Next Question
                  </button>
                ) : (
                  !submitted && (
                    <button
                      onClick={handleSubmit}
                      disabled={!allAnswered}
                      style={{
                        background: allAnswered ? "var(--green)" : "var(--muted)",
                        color: "white", border: "none",
                        padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        cursor: allAnswered ? "pointer" : "not-allowed",
                        transition: "background-color 0.15s"
                      }}
                    >
                      Submit Mock Exam
                    </button>
                  )
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
      
      <style>{`
        .option-btn:not(:disabled):hover {
          border-color: var(--accent) !important;
          background-color: var(--surface) !important;
        }
        .btn-secondary:hover {
          background-color: var(--surface) !important;
        }
        .btn-primary:hover {
          background-color: var(--accent-dark) !important;
        }
        .btn-next:hover {
          background-color: var(--navy-800) !important;
        }
      `}</style>
    </>
  );
}
