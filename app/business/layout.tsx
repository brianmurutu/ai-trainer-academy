import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Academy for Teams & Enterprise — AI Trainer Academy",
  description: "Train your AI engineering and operations teams at scale. Practical, vetted training in RLHF, dataset curation, fine-tuning, and prompt architecture.",
  keywords: "enterprise AI training, team AI fine-tuning, corporate RLHF, corporate AI safety training",
  openGraph: {
    title: "AI Academy for Teams & Enterprise — AI Trainer Academy",
    description: "Train your AI engineering and operations teams at scale. Practical, vetted training in RLHF, dataset curation, fine-tuning, and prompt architecture.",
    type: "website",
    url: "https://air-trainer-academy.top/business",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Academy for Teams & Enterprise",
    description: "Equip your workforce with practical, vetted training in fine-tuning, RLHF and prompt architecture.",
  },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
