"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, ArrowRight, Play, CheckCircle } from "lucide-react";
import { type Course } from "@/lib/courses-data";
import { useCurrency } from "@/components/CurrencyProvider";

type EnrolledCourseWithProgress = Course & {
  progress: number;
  completed: number;
  total: number;
  lastAccessed: string;
};

type LearnerCoursesClientProps = {
  initialCourses: EnrolledCourseWithProgress[];
};

export default function LearnerCoursesClient({ initialCourses }: LearnerCoursesClientProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "active" | "completed">("all");
  const { formatPrice } = useCurrency();

  const filtered = initialCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.trainer.toLowerCase().includes(search.toLowerCase());
    const matchesTab = 
      tab === "all" ? true :
      tab === "active" ? c.progress < 100 :
      c.progress === 100;
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          My Enrolled Courses
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
          Access your enrolled training programs, view lectures, track your progress, and continue learning.
        </p>
      </div>

      {/* Tabs & Search */}
      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center",
        gap: 16, background: "white", padding: 16, borderRadius: 12, border: "1px solid var(--line)",
        marginBottom: 24
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "active", "completed"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "6px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 500,
                cursor: "pointer", textTransform: "capitalize",
                background: tab === t ? "var(--navy)" : "transparent",
                color: tab === t ? "white" : "var(--slate)"
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: 300 }}>
          <Search size={15} color="var(--muted)" style={{ position: "absolute", left: 10, top: 9 }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search my courses..."
            style={{
              width: "100%", padding: "7px 10px 7px 32px", fontSize: 13.5,
              borderRadius: 8, border: "1px solid var(--line)", outline: "none"
            }}
          />
        </div>
      </div>

      {/* Courses List */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "64px 24px", background: "white",
          borderRadius: 14, border: "1px solid var(--line)"
        }}>
          <BookOpen size={40} color="var(--muted)" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>No Courses Found</h3>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>Try clearing filters or explore new courses in the directory.</p>
          <Link href="/courses" style={{
            display: "inline-flex", marginTop: 16, fontSize: 13, fontWeight: 600,
            color: "var(--accent)", textDecoration: "none", alignItems: "center", gap: 6
          }}>
            Explore Marketplace <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 20 }}>
          {filtered.map(c => {
            const isFinished = c.progress === 100;
            return (
              <div key={c.id} style={{
                background: "white", borderRadius: 14, border: "1px solid var(--line)",
                overflow: "hidden", display: "flex", flexDirection: "column",
                boxShadow: "0 2px 6px rgba(0,0,0,0.01)"
              }}>
                {/* Visual card header */}
                {c.image_url ? (
                  <div style={{
                    height: 100,
                    backgroundImage: `url(${c.image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    color: "white",
                    position: "relative"
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                      zIndex: 1
                    }} />
                    <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", background: "rgba(255,255,255,0.22)", padding: "3px 8px", borderRadius: 8, position: "relative", zIndex: 2 }}>
                      {c.level}
                    </span>
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", position: "relative", zIndex: 2 }}>Last accessed: {c.lastAccessed}</span>
                  </div>
                ) : (
                  <div style={{
                    height: 100, background: `linear-gradient(135deg, ${c.tagColor} 0%, var(--navy) 100%)`,
                    padding: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    color: "white"
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", background: "rgba(255,255,255,0.18)", padding: "3px 8px", borderRadius: 8 }}>
                      {c.level}
                    </span>
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)" }}>Last accessed: {c.lastAccessed}</span>
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: c.tagColor, textTransform: "uppercase", marginBottom: 6 }}>
                    {c.tag}
                  </span>
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--navy)", marginBottom: 4, lineHeight: 1.4 }}>
                    {c.title}
                  </h3>
                  <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 16 }}>
                    Instructor: {c.trainer}
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginTop: "auto", marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--slate)", marginBottom: 6 }}>
                      <span>{c.completed} / {c.total} lessons</span>
                      <span style={{ fontWeight: 600, color: "var(--navy)" }}>{c.progress}%</span>
                    </div>
                    <div style={{ height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${c.progress}%`, background: isFinished ? "var(--green)" : "var(--accent)", borderRadius: 3 }} />
                    </div>
                  </div>

                  {/* Action button */}
                  <Link href={`/dashboard/courses/${c.slug}`} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600,
                    background: isFinished ? "var(--surface)" : "var(--navy)",
                    color: isFinished ? "var(--navy)" : "white",
                    border: isFinished ? "1px solid var(--line)" : "none",
                    textAlign: "center"
                  }}>
                    {isFinished ? (
                      <>
                        Review Syllabus <CheckCircle size={14} color="var(--green)" />
                      </>
                    ) : (
                      <>
                        Resume Learning <Play size={12} fill="currentColor" />
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
