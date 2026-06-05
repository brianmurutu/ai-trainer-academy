import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — AI Trainer Academy",
  description: "Get in touch with the AI Trainer Academy support team. Ask questions about booking sessions, course publishing, or corporate training solutions.",
  openGraph: {
    title: "Contact Us — AI Trainer Academy",
    description: "Get in touch with the AI Trainer Academy support team.",
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
