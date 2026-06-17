import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Trainer Academy | Learn to Train AI Models",
  description: "Browse free, self-paced learning modules or get certified to start landing remote AI training work.",
  openGraph: {
    title: "AI Trainer Academy",
    description: "Browse free, self-paced learning modules or get certified.",
  }
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
