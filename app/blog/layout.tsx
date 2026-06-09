import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy Insights & Engineering Blog | AI Trainer Academy",
  description: "Technical tutorials, NLP research summaries, and engineering perspectives on training LLMs, fine-tuning configurations, and custom agent deployment.",
  keywords: "NLP tutorials, LLM fine-tuning, prompt design, AI engineering blog, AI safety research",
  openGraph: {
    title: "Academy Insights & Engineering Blog | AI Trainer Academy",
    description: "Technical tutorials, NLP research summaries, and engineering perspectives on training LLMs, fine-tuning configurations, and custom agent deployment.",
    type: "website",
    url: "https://ai-trainer-academy.top/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy Insights & Engineering Blog",
    description: "Technical tutorials and perspectives on training LLMs, fine-tuning, and AI agents.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
