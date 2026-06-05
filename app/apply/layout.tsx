import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become an AI Trainer — AI Trainer Academy",
  description: "Apply to become a verified instructor on AI Trainer Academy. Share your practical model-training experience, set your own rates, and keep 80% of your earnings.",
  openGraph: {
    title: "Become an AI Trainer — AI Trainer Academy",
    description: "Apply to become a verified instructor on AI Trainer Academy. Share your practical model-training experience and earn doing what you love.",
  }
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
