import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogFilters from "./BlogFilters";

export const metadata: Metadata = {
  title: "Academy Insights and Engineering Blog",
  description:
    "Technical tutorials, NLP research summaries, and engineering perspectives on training LLMs, fine-tuning configurations, and custom agent deployment.",
  keywords:
    "NLP tutorials, LLM fine-tuning, prompt design, AI engineering blog, AI safety research",
  alternates: {
    canonical: "https://ai-trainer-academy.top/blog",
  },
  openGraph: {
    title: "Academy Insights and Engineering Blog | AI Trainer Academy",
    description:
      "Technical tutorials, NLP research summaries, and engineering perspectives on training LLMs, fine-tuning configurations, and custom agent deployment.",
    type: "website",
    url: "https://ai-trainer-academy.top/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy Insights and Engineering Blog",
    description:
      "Technical tutorials and perspectives on training LLMs, fine-tuning, and AI agents.",
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          background: "var(--surface)",
          minHeight: "100vh",
          padding: "60px 24px 100px",
        }}
      >
        {/* Header */}
        <section
          style={{ maxWidth: 800, margin: "0 auto 48px", textAlign: "center" }}
        >
          <span
            style={{
              background: "var(--accent-light)",
              color: "var(--accent)",
              border: "1px solid rgba(26,111,191,0.1)",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            NLP and Model Training Articles
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 40px)",
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.8px",
              marginBottom: 16,
            }}
          >
            Academy Insights and Engineering Blog
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Technical tutorials, NLP research summaries, and engineering
            perspectives on training LLMs, fine-tuning configurations, and
            custom agent deployment.
          </p>
        </section>

        <BlogFilters />
      </main>
      <Footer />
    </>
  );
}
