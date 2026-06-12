"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { type Course } from "@/lib/courses-data";
import { Search, Star, Clock, BookOpen, User, DollarSign, Filter, ArrowRight } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

type CoursesClientProps = {
  initialCourses: Course[];
};

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const { formatPrice } = useCurrency();

  const tags = ["all", ...Array.from(new Set(initialCourses.map(c => c.tag).filter(Boolean)))];

  const filteredCourses = initialCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase()) ||
                          c.trainer.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" ? true : c.level.toLowerCase() === levelFilter.toLowerCase();
    const matchesTag = tagFilter === "all" ? true : c.tag === tagFilter;
    return matchesSearch && matchesLevel && matchesTag;
  });

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        {/* Header */}
        <section style={{ maxWidth: 800, margin: "0 auto 48px", textAlign: "center" }}>
          <span style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
            border: "1px solid rgba(26,111,191,0.1)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            display: "inline-block",
            marginBottom: 16,
          }}>
            Explore AI Curriculum
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 4.5vw, 40px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
          }}>
            Vetted Courses by Industry Practitioners
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Gain practical, production-level skills in large language model fine-tuning, prompt engineering, RAG architectures, and AI model optimization.
          </p>
        </section>

        {/* Filter Controls */}
        <section style={{
          maxWidth: 1100,
          margin: "0 auto 40px",
          background: "white",
          padding: 24,
          borderRadius: 16,
          border: "1px solid var(--line)",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 12px rgba(0,0,0,0.01)"
        }}>
          {/* Search bar */}
          <div style={{ position: "relative", flex: "1 1 300px" }}>
            <Search size={18} color="var(--muted)" style={{ position: "absolute", left: 14, top: 12 }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, trainers, or topics..."
              style={{
                width: "100%",
                padding: "10px 14px 10px 42px",
                borderRadius: 8,
                border: "1px solid var(--line)",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "var(--line)"}
            />
          </div>

          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Filter size={15} color="var(--slate)" />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--slate)" }}>Filters:</span>
            </div>

            {/* Level Select */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid var(--line)",
                fontSize: 13,
                outline: "none",
                background: "white",
                color: "var(--ink)",
              }}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Tag Filter Tabs */}
            <div style={{ display: "flex", gap: 6 }}>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--line)",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    background: tagFilter === tag ? "var(--navy)" : "white",
                    color: tagFilter === tag ? "white" : "var(--slate)",
                    textTransform: "capitalize",
                    transition: "background-color 0.15s, color 0.15s",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section style={{ maxWidth: 1100, margin: "0 auto" }}>
          {filteredCourses.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "white",
              borderRadius: 16,
              border: "1px solid var(--line)",
            }}>
              <BookOpen size={48} color="var(--muted)" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>No Courses Found</h3>
              <p style={{ fontSize: 14, color: "var(--slate)" }}>We couldn't find any courses matching your filters. Try adjusting your search term.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}>
              {filteredCourses.map((course: Course) => (
                <div
                  key={course.id}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    border: "1px solid var(--line)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.01)";
                  }}
                >
                  {/* Course Header Image / Colored Header */}
                  {course.image_url ? (
                    <div style={{
                      height: 140,
                      backgroundImage: `url(${course.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color: "white",
                      position: "relative"
                    }}>
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)",
                        zIndex: 1
                      }} />
                      <span style={{
                        alignSelf: "flex-start",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(4px)",
                        padding: "4px 10px",
                        borderRadius: 12,
                        position: "relative",
                        zIndex: 2
                      }}>
                        {course.level}
                      </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", position: "relative", zIndex: 2 }}>{course.duration}</span>
                    </div>
                  ) : (
                    <div style={{
                      height: 140,
                      background: `linear-gradient(135deg, ${course.tagColor} 0%, var(--navy) 100%)`,
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color: "white"
                    }}>
                      <span style={{
                        alignSelf: "flex-start",
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(4px)",
                        padding: "4px 10px",
                        borderRadius: 12
                      }}>
                        {course.level}
                      </span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{course.duration}</span>
                    </div>
                  )}

                  {/* Course Body */}
                  <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "3px 9px",
                        borderRadius: 20,
                        background: course.tagBg,
                        color: course.tagColor,
                      }}>
                        {course.tag}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)" }}>{course.rating}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", marginBottom: 8, lineHeight: 1.4 }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5, marginBottom: 20, flex: 1 }}>
                      {course.description}
                    </p>

                    {/* Trainer Info */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      borderTop: "1px solid var(--line)",
                      paddingTop: 16,
                      marginBottom: 20,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: course.tagColor, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 10, fontWeight: 600, color: "white"
                      }}>
                        {course.trainerInitials}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>{course.trainer}</span>
                        <span style={{ fontSize: 10, color: "var(--muted)" }}>Instructor</span>
                      </div>
                      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                        <BookOpen size={13} color="var(--muted)" />
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>{course.enrolledCount} enrolled</span>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>
                          {formatPrice(course.priceKsh, course.priceUsd)}
                        </div>
                      </div>
                      <Link href={`/courses/${course.slug}`} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--accent)",
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                      }}>
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
