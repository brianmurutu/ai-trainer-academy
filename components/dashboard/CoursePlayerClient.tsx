"use client";

import { useState } from "react";
import Link from "next/link";
import { type Course, type Lesson } from "@/lib/courses-data";
import { ChevronLeft, Play, FileText, CheckCircle2, Circle, MessageSquare, BookOpen, Clock, ArrowRight, Award } from "lucide-react";

type CoursePlayerClientProps = {
  course: Course;
  userEmail: string;
};

export default function CoursePlayerClient({ course, userEmail }: CoursePlayerClientProps) {
  // Initialize with the first lesson of the first section
  const firstLesson = course.curriculum[0]?.lessons[0];
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(firstLesson || null);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    [firstLesson?.id || ""]: true, // pre-complete the first lesson
  });
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "ask">("overview");
  const [notes, setNotes] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);

  const toggleLessonCompletion = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent setting active lesson
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleSaveNote = () => {
    if (!notes.trim()) return;
    setSavedNotes(prev => [...prev, notes]);
    setNotes("");
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setAskedQuestions(prev => [...prev, question]);
    setQuestion("");
  };

  // Count lessons
  const totalLessons = course.curriculum.reduce((acc, sec) => acc + sec.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        background: "var(--navy)",
        color: "white",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/dashboard" style={{
            display: "flex", alignItems: "center", gap: 6, color: "var(--muted)",
            fontSize: 13, textDecoration: "none"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{course.title}</span>
        </div>

        {/* Progress Display */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>Your Progress</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: progressPercent === 100 ? "#4ADE80" : "var(--accent)" }}>
              {completedCount} / {totalLessons} lessons ({progressPercent}%)
            </span>
          </div>
          <div style={{ width: 80, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progressPercent}%`,
              background: progressPercent === 100 ? "#4ADE80" : "var(--accent)", transition: "width 0.3s ease"
            }} />
          </div>
        </div>
      </header>

      {/* Main player layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, overflow: "hidden" }}>
        
        {/* Left side: player area + tabs content */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>
          
          {/* Mock Video Player container */}
          <div style={{
            aspectRatio: "16/9",
            background: "black",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}>
            {activeLesson?.isVideo ? (
              <>
                {/* Background visual styling to simulate a nice video player */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('/api/placeholder/800/450') center/cover`,
                  opacity: 0.6,
                }} />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "white", padding: 20 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", background: "var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px", cursor: "pointer", transition: "transform 0.2s",
                    boxShadow: "0 0 20px rgba(26,111,191,0.5)"
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <Play size={32} fill="white" style={{ marginLeft: 4 }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{activeLesson?.title}</h3>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>Click to Play Video ({activeLesson?.duration})</span>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", color: "white", padding: 40 }}>
                <FileText size={48} color="var(--accent)" style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Reading Assignment</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 400, margin: "0 auto 20px" }}>
                  {activeLesson?.title} is a text-based reading module.
                </p>
                <button
                  onClick={(e) => toggleLessonCompletion(activeLesson?.id || "", e as any)}
                  style={{
                    background: "white", color: "var(--navy)", border: "none", padding: "10px 20px",
                    borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  {completedLessons[activeLesson?.id || ""] ? "Mark as Incomplete" : "Mark as Completed"}
                </button>
              </div>
            )}

            {/* Video Controls overlay mock */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              padding: "16px 20px", display: "flex", alignItems: "center",
              justifyContent: "space-between", color: "white", fontSize: 12
            }}>
              <span>0:00 / {activeLesson?.duration}</span>
              <div style={{ display: "flex", gap: 12 }}>
                <span>CC</span>
                <span>HD</span>
                <span>Fullscreen</span>
              </div>
            </div>
          </div>

          {/* Active lesson title & summary details */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
              {activeLesson?.title}
            </h2>
            <span style={{ fontSize: 12, color: "var(--slate)" }}>
              Instructor: {course.trainer} · Course Module
            </span>
          </div>

          {/* Tabs for details */}
          <div style={{ borderBottom: "1px solid var(--line)", display: "flex", gap: 24 }}>
            {[
              { id: "overview", label: "Overview" },
              { id: "notes", label: "My Notes" },
              { id: "ask", label: "Ask Instructor" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "12px 0",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: activeTab === tab.id ? "var(--accent)" : "var(--slate)",
                  borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
                  outline: "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div style={{ minHeight: 200 }}>
            {activeTab === "overview" && (
              <div style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <h4 style={{ color: "var(--navy)", fontWeight: 600, marginBottom: 8 }}>About this lesson</h4>
                  <p>In this lesson, we cover the core concepts required to master the topic. Follow along with the code notebooks and datasets provided in the resources section. If you encounter any bugs, use the Ask Instructor tab to send a question directly to {course.trainer}.</p>
                </div>
                <div>
                  <h4 style={{ color: "var(--navy)", fontWeight: 600, marginBottom: 8 }}>Instructor Bio</h4>
                  <p>{course.trainerBio}</p>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h4 style={{ color: "var(--navy)", fontWeight: 600, marginBottom: 8 }}>Take a note</h4>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Type notes for this lesson here..."
                    rows={4}
                    style={{
                      width: "100%", padding: 12, borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 13, outline: "none", resize: "vertical"
                    }}
                  />
                  <button
                    onClick={handleSaveNote}
                    style={{
                      marginTop: 8, background: "var(--navy)", color: "white", border: "none",
                      padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer"
                    }}
                  >
                    Save Note
                  </button>
                </div>

                {savedNotes.length > 0 && (
                  <div>
                    <h4 style={{ color: "var(--navy)", fontWeight: 600, marginBottom: 12 }}>Saved Notes</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {savedNotes.map((note, index) => (
                        <div key={index} style={{
                          padding: 14, background: "white", borderRadius: 8, border: "1px solid var(--line)",
                          fontSize: 13, color: "var(--slate)", lineHeight: 1.5
                        }}>
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "ask" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h4 style={{ color: "var(--navy)", fontWeight: 600, marginBottom: 8 }}>Send a message to {course.trainer}</h4>
                  <form onSubmit={handleAskQuestion}>
                    <textarea
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                      placeholder="Ask a question about this lesson..."
                      rows={4}
                      required
                      style={{
                        width: "100%", padding: 12, borderRadius: 8, border: "1px solid var(--line)",
                        fontSize: 13, outline: "none", resize: "vertical", marginBottom: 8
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: "var(--accent)", color: "white", border: "none",
                        padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer"
                      }}
                    >
                      Send Question
                    </button>
                  </form>
                </div>

                {askedQuestions.length > 0 && (
                  <div>
                    <h4 style={{ color: "var(--navy)", fontWeight: 600, marginBottom: 12 }}>Sent Questions</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {askedQuestions.map((q, index) => (
                        <div key={index} style={{
                          padding: 14, background: "white", borderRadius: 8, border: "1px solid var(--line)",
                          fontSize: 13, color: "var(--slate)", lineHeight: 1.5
                        }}>
                          <div style={{ fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>Question:</div>
                          <div>{q}</div>
                          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>Status: Waiting for response...</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side: lesson playlist sidebar */}
        <div style={{
          background: "white", borderLeft: "1px solid var(--line)",
          display: "flex", flexDirection: "column", overflowY: "auto"
        }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>Course Content</h3>
          </div>

          <div style={{ flex: 1 }}>
            {course.curriculum.map((section, sidx) => (
              <div key={sidx}>
                {/* Section title header */}
                <div style={{
                  background: "var(--surface)",
                  padding: "10px 24px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--slate)",
                  borderBottom: "1px solid var(--line)"
                }}>
                  Section {sidx + 1}: {section.title}
                </div>

                {/* Section lessons list */}
                <div>
                  {section.lessons.map(lesson => {
                    const isActive = activeLesson?.id === lesson.id;
                    const isCompleted = !!completedLessons[lesson.id];
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        style={{
                          padding: "14px 24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          borderBottom: "1px solid var(--line)",
                          background: isActive ? "var(--accent-light)" : "transparent",
                          transition: "background-color 0.15s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <button
                            onClick={(e) => toggleLessonCompletion(lesson.id, e)}
                            style={{
                              background: "none", border: "none", padding: 0, margin: 0, cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                            }}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={16} color="var(--green)" />
                            ) : (
                              <Circle size={16} color="var(--muted)" />
                            )}
                          </button>
                          <span style={{
                            fontSize: 13,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "var(--accent-dark)" : "var(--ink)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}>
                            {lesson.title}
                          </span>
                        </div>
                        <span style={{ fontSize: 11, color: "var(--muted)", flexShrink: 0, marginLeft: 10 }}>{lesson.duration}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
