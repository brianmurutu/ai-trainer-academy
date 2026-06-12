import { getAdminCourseList } from "@/app/actions/courses";
import Link from "next/link";
import { BookOpen, Plus, Trash2, ExternalLink, Pencil } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Courses | Admin" };

export default async function AdminCoursesPage() {
  const courses = await getAdminCourseList();

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
            Courses
          </h1>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            {courses.length} course{courses.length !== 1 ? "s" : ""} on the platform
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 18px", background: "var(--accent)", color: "white",
            borderRadius: 10, textDecoration: "none", fontSize: 13.5, fontWeight: 600,
            boxShadow: "0 2px 8px var(--accent-glow)",
          }}
        >
          <Plus size={16} /> Add Course
        </Link>
      </div>

      {/* Empty state */}
      {courses.length === 0 ? (
        <div style={{
          background: "white", borderRadius: 16, padding: "64px 32px",
          textAlign: "center", border: "1px solid var(--line)",
        }}>
          <BookOpen size={36} color="var(--muted)" style={{ marginBottom: 14 }} />
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>No courses yet</h2>
          <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 24 }}>
            Add your first course manually using the form above.
          </p>
          <Link href="/admin/courses/new" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "10px 20px", background: "var(--navy)", color: "white",
            borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 500,
          }}>
            <Plus size={14} /> Add first course
          </Link>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {/* Table head */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 140px 120px 100px 80px 120px",
            padding: "10px 20px", background: "#F8F9FB",
            borderBottom: "1px solid var(--line)",
            fontSize: 11, fontWeight: 600, color: "var(--muted)",
            textTransform: "uppercase", letterSpacing: 0.8,
          }}>
            <span>Course</span>
            <span>Trainer</span>
            <span>Level</span>
            <span>Price (KSH)</span>
            <span>Enrolled</span>
            <span>Actions</span>
          </div>

          {courses.map((course, i) => (
            <div
              key={course.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 140px 120px 100px 80px 120px",
                padding: "14px 20px", alignItems: "center",
                borderBottom: i < courses.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              {/* Title + tag */}
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--navy)", marginBottom: 3 }}>
                  {course.title}
                </div>
                {course.tag && (
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 20,
                    background: "var(--accent-light)", color: "var(--accent)",
                    fontWeight: 500,
                  }}>
                    {course.tag}
                  </span>
                )}
              </div>

              <div style={{ fontSize: 12.5, color: "var(--slate)" }}>
                {course.trainer_name ?? "—"}
              </div>

              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {course.level ?? "—"}
              </div>

              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                {course.price_ksh ? `KSH ${course.price_ksh.toLocaleString()}` : "Free"}
              </div>

              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {course.enrolled_count}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {/* Edit */}
                <Link
                  href={`/admin/courses/${course.id}/edit`}
                  title="Edit course"
                  style={{
                    width: 30, height: 30, borderRadius: 7, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: "#EEF2FF", color: "#6366F1",
                    border: "1px solid #C7D2FE", textDecoration: "none",
                  }}
                >
                  <Pencil size={13} />
                </Link>
                {/* View */}
                <Link
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  title="View course"
                  style={{
                    width: 30, height: 30, borderRadius: 7, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: "#F0F2F5", color: "var(--slate)",
                    border: "1px solid var(--line)", textDecoration: "none",
                  }}
                >
                  <ExternalLink size={13} />
                </Link>
                {/* Delete */}
                <form action={async (fd) => {
                  "use server";
                  const { deleteCourse } = await import("@/app/actions/courses");
                  await deleteCourse(undefined, fd);
                }}>
                  <input type="hidden" name="id" value={course.id} />
                  <button
                    type="submit"
                    title="Delete course"
                    style={{
                      width: 30, height: 30, borderRadius: 7, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: "#FEE2E2", color: "#DC2626",
                      border: "none", cursor: "pointer",
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
