import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Trainer Academy — Learn to Train AI Models",
  description: "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners. Pay in KSH, USD, or crypto.",
  keywords: "AI model training, fine-tuning, prompt engineering, RLHF, AI courses, machine learning training, AI education Kenya",
  openGraph: {
    title: "AI Trainer Academy",
    description: "The #1 platform for AI model training education. Learn from verified experts.",
    type: "website",
    siteName: "AI Trainer Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Trainer Academy",
    description: "Learn to train AI models from verified experts. KSH, USD & crypto payments.",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
