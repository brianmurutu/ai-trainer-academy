import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | AI Trainer Academy",
  description: "Explore simple, transparent pricing options for Learners, Trainers, and Enterprises. No hidden fees. Pay in KES, USD, or crypto.",
  openGraph: {
    title: "Pricing Plans | AI Trainer Academy",
    description: "Simple, transparent pricing options for Learners, Trainers, and Enterprises.",
  }
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
