import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/blog-data";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found — AI Trainer Academy" };
  return {
    title: `${post.title} — AI Trainer Academy Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://air-trainer-academy.top/blog/${post.slug}#post`,
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorTitle
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Trainer Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://air-trainer-academy.top/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://air-trainer-academy.top/blog/${post.slug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://air-trainer-academy.top"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://air-trainer-academy.top/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://air-trainer-academy.top/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "40px 24px 100px" }}>
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" style={{ maxWidth: 700, margin: "0 auto 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--slate)" }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} className="hover-link">
              Home
            </Link>
            <span style={{ color: "var(--muted)" }}>/</span>
            <Link href="/blog" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} className="hover-link">
              Blog
            </Link>
            <span style={{ color: "var(--muted)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }} aria-current="page">
              Article
            </span>
          </div>
        </nav>

        {/* Article block */}
        <article style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "white",
          border: "1px solid var(--line)",
          borderRadius: 16,
          padding: "48px 40px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
        }}>
          {/* Post Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, marginBottom: 20 }}>
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

          <h1 style={{
            fontSize: "clamp(26px, 5vw, 36px)",
            fontWeight: 700,
            color: "var(--navy)",
            lineHeight: 1.25,
            letterSpacing: "-0.8px",
            marginBottom: 24
          }}>
            {post.title}
          </h1>

          {/* Author info */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            borderBottom: "1px solid var(--line)", paddingBottom: 28, marginBottom: 32
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: post.tagColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 13, fontWeight: 600
            }}>
              {post.authorInitials}
            </div>
            <div>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{post.author}</span>
              <span style={{ display: "block", fontSize: 11, color: "var(--muted)" }}>{post.authorTitle}</span>
            </div>
          </div>

          {/* Render MDX-style custom content */}
          <div className="blog-content" style={{
            fontSize: 15,
            color: "var(--ink)",
            lineHeight: 1.8,
          }}>
            {post.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Handle Headers
              if (trimmed.startsWith("# ")) {
                return (
                  <h2 key={idx} style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginTop: 36, marginBottom: 16 }}>
                    {trimmed.replace("# ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h3 key={idx} style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginTop: 28, marginBottom: 12 }}>
                    {trimmed.replace("## ", "")}
                  </h3>
                );
              }

              // Handle Divider
              if (trimmed === "---") {
                return <hr key={idx} style={{ border: "none", borderTop: "1px solid var(--line)", margin: "32px 0" }} />;
              }

              // Handle Lists
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                const items = trimmed.split("\n");
                return (
                  <ul key={idx} style={{ paddingLeft: 20, marginBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} style={{ fontSize: 14.5, color: "var(--slate)" }}>
                        {item.replace(/^[*-\s]+/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(trimmed)) {
                const items = trimmed.split("\n");
                return (
                  <ol key={idx} style={{ paddingLeft: 20, marginBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} style={{ fontSize: 14.5, color: "var(--slate)" }}>
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ol>
                );
              }

              // Handle regular paragraphs
              return (
                <p key={idx} style={{ marginBottom: 16, color: "var(--slate)", fontSize: 14.5 }}>
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Custom post bio footer */}
          <div style={{
            marginTop: 48,
            padding: 24,
            background: "var(--surface)",
            borderRadius: 12,
            border: "1px solid var(--line)",
          }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
              About the author
            </h4>
            <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>
              {post.author} is a verified AI trainer on our platform. To schedule a 1-on-1 model training session with them, visit their profile in our directory.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
