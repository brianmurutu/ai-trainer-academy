import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore AI Courses — AI Trainer Academy",
  description: "Browse verified training programs in LLM fine-tuning, parameter optimization, prompt engineering, and production MLOps led by active practitioners.",
  openGraph: {
    title: "Explore AI Courses — AI Trainer Academy",
    description: "Browse verified training programs led by active practitioners.",
  }
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
