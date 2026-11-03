import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description:
    "Simple, transparent pricing options for Learners, Trainers, and Enterprises. No hidden fees. Pay in KES, USD, or crypto.",
  alternates: {
    canonical: "https://ai-trainer-academy.top/pricing",
  },
  openGraph: {
    title: "Pricing Plans | AI Trainer Academy",
    description:
      "Simple, transparent pricing options for Learners, Trainers, and Enterprises.",
    url: "https://ai-trainer-academy.top/pricing",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
