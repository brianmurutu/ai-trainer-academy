"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { BookOpen, Clock, Calendar, ArrowRight, Filter } from "lucide-react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "Guides", "Research", "Case Studies"];

  const filteredPosts = activeCategory === "all"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

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
            NLP & Model Training Articles
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 4.5vw, 40px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
          }}>
            Academy Insights & Engineering Blog
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Technical tutorials, NLP research summaries, and engineering perspectives on training LLMs, fine-tuning configurations, and custom agent deployment.
          </p>
        </section>

        {/* Categories Tab selector */}
        <section style={{
          maxWidth: 900,
          margin: "0 auto 40px",
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: activeCategory === cat ? "none" : "1px solid var(--line)",
                background: activeCategory === cat ? "var(--navy)" : "white",
                color: activeCategory === cat ? "white" : "var(--slate)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                textTransform: "capitalize",
                outline: "none"
              }}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Blog Post List */}
        <section style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {filteredPosts.map((post: BlogPost) => (
            <article
              key={post.slug}
              style={{
                background: "white",
                borderRadius: 16,
                border: "1px solid var(--line)",
                padding: 32,
                boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.01)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                <span style={{
                  fontWeight: 600, padding: "3px 9px", borderRadius: 20,
                  background: post.tagBg, color: post.tagColor
                }}>
                  {post.category}
                </span>
                <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={13} /> {post.date}
                </span>
                <span style={{ color: "var(--muted)" }}>·</span>
                <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", lineHeight: 1.35 }}>
                <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {post.title}
                </Link>
              </h2>

              <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6 }}>
                {post.excerpt}
              </p>

              {/* Author info & Read link */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 8
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", background: post.tagColor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: 11, fontWeight: 600
                  }}>
                    {post.authorInitials}
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{post.author}</span>
                    <span style={{ display: "block", fontSize: 10, color: "var(--muted)" }}>{post.authorTitle}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none"
                }}>
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
