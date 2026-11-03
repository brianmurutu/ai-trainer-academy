import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore AI Courses",
  description:
    "Browse verified training programs in LLM fine-tuning, parameter optimization, prompt engineering, and production MLOps led by active practitioners.",
  alternates: {
    canonical: "https://ai-trainer-academy.top/courses",
  },
  openGraph: {
    title: "Explore AI Courses | AI Trainer Academy",
    description:
      "Browse verified training programs led by active practitioners.",
    url: "https://ai-trainer-academy.top/courses",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
