import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trainer FAQs | AI Trainer Academy",
  description: "Find answers to frequently asked questions about onboarding, course creation, scheduling, and weekly payouts on AI Trainer Academy.",
  openGraph: {
    title: "Trainer FAQs | AI Trainer Academy",
    description: "Find answers to frequently asked questions about teaching on AI Trainer Academy.",
  }
};

export default function TrainerFaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
