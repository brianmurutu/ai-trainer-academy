"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash, ArrowRight, ArrowLeft, Save, PlusCircle, Check } from "lucide-react";

type CourseEditorProps = {
  courseId?: string; // If provided, we are editing an existing course
};

export default function CourseEditor({ courseId }: CourseEditorProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form states
  const [title, setTitle] = useState(courseId ? "Fine-tuning LLaMA 3 with LoRA" : "");
  const [description, setDescription] = useState(courseId ? "Learn parameter-efficient fine-tuning on modern models." : "");
  const [tag, setTag] = useState(courseId ? "Fine-tuning" : "NLP");
  const [level, setLevel] = useState(courseId ? "Advanced" : "Beginner");

  const [priceUsd, setPriceUsd] = useState(courseId ? 120 : 49);
  const [priceKsh, setPriceKsh] = useState(courseId ? 15600 : 6300);

  // Curriculum state
  const [curriculum, setCurriculum] = useState<any[]>(
    courseId
      ? [
          {
            title: "Course Overview & Setup",
            lessons: [
              { title: "Welcome & Learning Roadmap", duration: "10 mins" },
              { title: "Introduction to LLaMA 3 Architecture", duration: "25 mins" }
            ]
          }
        ]
      : [
          {
            title: "Introduction",
            lessons: [{ title: "Welcome to the course", duration: "10 mins" }]
          }
        ]
  );

  const addSection = () => {
    setCurriculum([...curriculum, { title: "New Section", lessons: [] }]);
  };

  const removeSection = (sIdx: number) => {
    setCurriculum(curriculum.filter((_, idx) => idx !== sIdx));
  };

  const updateSectionTitle = (sIdx: number, val: string) => {
    setCurriculum(curriculum.map((sec, idx) => {
      if (idx === sIdx) return { ...sec, title: val };
      return sec;
    }));
  };

  const addLesson = (sIdx: number) => {
    setCurriculum(curriculum.map((sec, idx) => {
      if (idx === sIdx) {
        return {
          ...sec,
          lessons: [...sec.lessons, { title: "New Lesson", duration: "15 mins" }]
        };
      }
      return sec;
    }));
  };

  const removeLesson = (sIdx: number, lIdx: number) => {
    setCurriculum(curriculum.map((sec, idx) => {
      if (idx === sIdx) {
        return {
          ...sec,
          lessons: sec.lessons.filter((_: any, lidx: number) => lidx !== lIdx)
        };
      }
      return sec;
    }));
  };

  const updateLesson = (sIdx: number, lIdx: number, key: string, val: string) => {
    setCurriculum(curriculum.map((sec, idx) => {
      if (idx === sIdx) {
        const updatedLessons = sec.lessons.map((lesson: any, lidx: number) => {
          if (lidx === lIdx) return { ...lesson, [key]: val };
          return lesson;
        });
        return { ...sec, lessons: updatedLessons };
      }
      return sec;
    }));
  };

  const handleSave = () => {
    // Mimic saving progress and redirecting
    router.push("/trainer/courses");
  };

  return (
    <div style={{ padding: "32px", maxWidth: 750, margin: "0 auto" }}>
      {/* Back to courses */}
      <button
        onClick={() => router.push("/trainer/courses")}
        style={{
          background: "none", border: "none", color: "var(--muted)", cursor: "pointer",
          fontSize: 13, display: "flex", alignItems: "center", gap: 6, marginBottom: 20
        }}
      >
        <ArrowLeft size={14} /> Back to Courses
      </button>

      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
        {courseId ? "Edit Course" : "Create New Course"}
      </h1>
      <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 32 }}>
        Step {step} of 3 — Configure your program curriculum, info, and pricing structure.
      </p>

      {/* Steps indicator bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
        {[1, 2, 3].map(idx => (
          <div key={idx} style={{ flex: 1 }}>
            <div style={{
              height: 4, borderRadius: 2,
              background: step >= idx ? "var(--accent)" : "var(--line)",
              transition: "background-color 0.2s"
            }} />
            <span style={{
              display: "block", fontSize: 11, fontWeight: 600, marginTop: 8,
              color: step >= idx ? "var(--accent-dark)" : "var(--muted)"
            }}>
              {idx === 1 ? "Course Details" : idx === 2 ? "Curriculum" : "Pricing & Publish"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1 Content: Course Details */}
      {step === 1 && (
        <div style={{
          background: "white", padding: 32, borderRadius: 12, border: "1px solid var(--line)",
          display: "flex", flexDirection: "column", gap: 20
        }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Course Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="E.g., Fine-tuning LLaMA 3 with LoRA"
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                fontSize: 14, outline: "none"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Short Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief summary of what students will achieve in this course..."
              rows={4}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                fontSize: 14, outline: "none", resize: "vertical"
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Category / Tag</label>
              <input
                type="text"
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder="E.g., Fine-tuning, RAG, Prompting"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Difficulty Level</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none", background: "white"
                }}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <button
              onClick={() => setStep(2)}
              style={{
                background: "var(--navy)", color: "white", border: "none", padding: "10px 20px",
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              Continue to Curriculum <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 Content: Curriculum Builder */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {curriculum.map((section, sIdx) => (
            <div key={sIdx} style={{
              background: "white", padding: 24, borderRadius: 12, border: "1px solid var(--line)"
            }}>
              {/* Section Header */}
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                <input
                  type="text"
                  value={section.title}
                  onChange={e => updateSectionTitle(sIdx, e.target.value)}
                  style={{
                    flex: 1, padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6,
                    fontSize: 14, fontWeight: 600, color: "var(--navy)", outline: "none"
                  }}
                />
                <button
                  onClick={() => removeSection(sIdx)}
                  style={{
                    background: "none", border: "none", color: "#DC2626", cursor: "pointer",
                    padding: 4
                  }}
                >
                  <Trash size={15} />
                </button>
              </div>

              {/* Lessons inside Section */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 12, borderLeft: "2px solid var(--line)" }}>
                {section.lessons.map((lesson: any, lIdx: number) => (
                  <div key={lIdx} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={e => updateLesson(sIdx, lIdx, "title", e.target.value)}
                      placeholder="Lesson title"
                      style={{
                        flex: 1, padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6,
                        fontSize: 13, outline: "none"
                      }}
                    />
                    <input
                      type="text"
                      value={lesson.duration}
                      onChange={e => updateLesson(sIdx, lIdx, "duration", e.target.value)}
                      placeholder="Duration"
                      style={{
                        width: 100, padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6,
                        fontSize: 13, outline: "none"
                      }}
                    />
                    <button
                      onClick={() => removeLesson(sIdx, lIdx)}
                      style={{
                        background: "none", border: "none", color: "#DC2626", cursor: "pointer",
                        padding: 4
                      }}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addLesson(sIdx)}
                  style={{
                    alignSelf: "flex-start", background: "none", border: "none", color: "var(--accent)",
                    fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center",
                    gap: 6, marginTop: 8
                  }}
                >
                  <PlusCircle size={14} /> Add Lesson
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addSection}
            style={{
              alignSelf: "center", background: "white", border: "1px dashed var(--accent)",
              color: "var(--accent)", padding: "12px 24px", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8
            }}
          >
            <Plus size={16} /> Add Course Section
          </button>

          {/* Navigation buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                background: "white", border: "1px solid var(--line)", color: "var(--slate)",
                padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              style={{
                background: "var(--navy)", color: "white", border: "none", padding: "10px 20px",
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              Continue to Pricing <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 Content: Pricing & Publish */}
      {step === 3 && (
        <div style={{
          background: "white", padding: 32, borderRadius: 12, border: "1px solid var(--line)",
          display: "flex", flexDirection: "column", gap: 24
        }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 12 }}>Configure Price Settings</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Price (USD)</label>
                <input
                  type="number"
                  value={priceUsd}
                  onChange={e => setPriceUsd(Number(e.target.value))}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>KES Equivalent (approx.)</label>
                <input
                  type="number"
                  value={priceKsh}
                  onChange={e => setPriceKsh(Number(e.target.value))}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 12 }}>Ready to Publish?</h3>
            <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
              <input
                type="checkbox"
                id="publish-check"
                defaultChecked
                style={{ marginTop: 4, cursor: "pointer" }}
              />
              <div>
                <label htmlFor="publish-check" style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", cursor: "pointer" }}>
                  Publish course instantly
                </label>
                <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>
                  Your course will immediately appear in the public catalog search. You can change this to a draft state at any time from your course list dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <button
              onClick={() => setStep(2)}
              style={{
                background: "white", border: "1px solid var(--line)", color: "var(--slate)",
                padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>
            <button
              onClick={handleSave}
              style={{
                background: "var(--accent)", color: "white", border: "none", padding: "10px 20px",
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              <Check size={16} /> Save Course & Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
