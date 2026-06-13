"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, Star, Users, DollarSign, Edit, MoreVertical, Trash, Eye } from "lucide-react";

export default function TrainerCoursesPage() {
  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "Fine-tuning LLaMA 3 with LoRA",
      status: "Live",
      enrolled: 47,
      rating: 4.8,
      revenue: "$5,640",
      tag: "Fine-tuning"
    },
    {
      id: "4",
      title: "QLoRA Masterclass: VRAM-efficient Fine-tuning",
      status: "Live",
      enrolled: 31,
      rating: 4.9,
      revenue: "$3,720",
      tag: "Quantization"
    },
    {
      id: "5",
      title: "Optimizing Inference Speed with vLLM & TensorRT",
      status: "Draft",
      enrolled: 0,
      rating: 0,
      revenue: "$0",
      tag: "Inference"
    }
  ]);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === "Live" ? "Draft" : "Live";
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: "32px", maxWidth: 1000, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
            My Courses
          </h1>
          <p style={{ fontSize: 14, color: "var(--slate)" }}>
            Create, publish, and manage your AI educational programs.
          </p>
        </div>
        <Link href="/trainer/courses/new" style={{
          background: "var(--accent)", color: "white", display: "flex", alignItems: "center", gap: 8,
          padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none",
          transition: "background-color 0.15s"
        }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-dark)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
        >
          <Plus size={16} /> Create Course
        </Link>
      </div>

      {/* Stats Summary row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 40
      }} className="stats-row-grid">
        {[
          { label: "Active Courses", value: courses.filter(c => c.status === "Live").length, desc: "published", icon: <BookOpen size={20} color="var(--accent)" /> },
          { label: "Total Students", value: courses.reduce((acc, c) => acc + c.enrolled, 0), desc: "enrolled", icon: <Users size={20} color="var(--green)" /> },
          { label: "Course Revenue", value: "$9,360", desc: "lifetime earnings", icon: <DollarSign size={20} color="var(--amber)" /> }
        ].map((stat, idx) => (
          <div key={idx} style={{
            background: "white", padding: 24, borderRadius: 12, border: "1px solid var(--line)",
            display: "flex", alignItems: "center", gap: 20
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8, background: "var(--surface)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {stat.icon}
            </div>
            <div>
              <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>{stat.label}</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", lineHeight: 1.2 }}>{stat.value}</span>
              <span style={{ fontSize: 10, color: "var(--slate)", display: "block", marginTop: 2 }}>{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Courses List Table/Grid */}
      <div style={{
        background: "white", borderRadius: 16, border: "1px solid var(--line)", overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)", color: "var(--slate)" }}>
              <th style={{ padding: "16px 24px" }}>Course Title</th>
              <th style={{ padding: "16px 24px" }}>Status</th>
              <th style={{ padding: "16px 24px" }}>Students</th>
              <th style={{ padding: "16px 24px" }}>Rating</th>
              <th style={{ padding: "16px 24px" }}>Earnings</th>
              <th style={{ padding: "16px 24px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={course.id} style={{
                borderBottom: idx < courses.length - 1 ? "1px solid var(--line)" : "none",
                color: "var(--ink)",
              }}>
                <td style={{ padding: "20px 24px" }}>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 12, background: "var(--accent-light)", color: "var(--accent)", textTransform: "capitalize", display: "inline-block", marginBottom: 6 }}>
                    {course.tag}
                  </span>
                  <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: 14 }}>{course.title}</div>
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <button
                    onClick={() => toggleStatus(course.id)}
                    style={{
                      border: "none", background: "none", padding: 0, cursor: "pointer", outline: "none",
                      display: "flex", alignItems: "center"
                    }}
                  >
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "3px 9px",
                      borderRadius: 20,
                      background: course.status === "Live" ? "var(--green-light)" : "var(--line)",
                      color: course.status === "Live" ? "var(--green)" : "var(--slate)"
                    }}>
                      {course.status}
                    </span>
                  </button>
                </td>
                <td style={{ padding: "20px 24px", color: "var(--slate)" }}>
                  {course.enrolled}
                </td>
                <td style={{ padding: "20px 24px" }}>
                  {course.rating > 0 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontWeight: 600 }}>{course.rating}</span>
                    </div>
                  ) : (
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>No ratings</span>
                  )}
                </td>
                <td style={{ padding: "20px 24px", fontWeight: 600, color: "var(--navy)" }}>
                  {course.revenue}
                </td>
                <td style={{ padding: "20px 24px", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, position: "relative" }}>
                    <Link
                      href={`/trainer/courses/${course.id}/edit`}
                      title="Edit Course"
                      style={{
                        width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center",
                        justifyContent: "center", background: "var(--surface)", border: "1px solid var(--line)",
                        color: "var(--slate)", textDecoration: "none"
                      }}
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      title="Delete Course"
                      style={{
                        width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center",
                        justifyContent: "center", background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)",
                        color: "#DC2626", cursor: "pointer", outline: "none"
                      }}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
