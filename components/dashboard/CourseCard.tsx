"use client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export type CourseCardData = {
  id: string;
  title: string;
  trainer: string;
  trainerInitials: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  tag: string;
  tagColor: string;
  tagBg: string;
  lastAccessed: string;
};

export default function CourseCard({ course }: { course: CourseCardData }) {
  const completed = course.progress === 100;
  return (
    <Link href={`/dashboard/courses/${course.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "white",
          borderRadius: 14,
          padding: "18px 20px",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.15s, transform 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          el.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
          el.style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "3px 9px",
            borderRadius: 20, background: course.tagBg, color: course.tagColor,
          }}>
            {course.tag}
          </span>
          {completed && <CheckCircle2 size={16} color="#059669" />}
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", lineHeight: 1.4, marginBottom: 8 }}>
          {course.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%",
            background: course.tagColor, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 9, fontWeight: 600, color: "white",
          }}>
            {course.trainerInitials}
          </div>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{course.trainer}</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 5, background: "#F0F0F0", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
          <div style={{
            height: "100%", borderRadius: 3,
            background: completed ? "#059669" : "var(--accent)",
            width: `${course.progress}%`,
            transition: "width 0.4s ease",
          }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)" }}>
          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
          <span style={{ fontWeight: 500, color: completed ? "#059669" : "var(--accent)" }}>
            {course.progress}%
          </span>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>
          Last accessed {course.lastAccessed}
        </div>
      </div>
    </Link>
  );
}
