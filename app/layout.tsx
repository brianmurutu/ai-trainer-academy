import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Trainer Academy — Learn to Train AI Models",
  description: "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners. Pay in KSH, USD, or crypto."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}