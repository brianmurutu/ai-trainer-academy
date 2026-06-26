import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | AI Training Sessions, Courses & AI Trainer Platform Plans",
  description:
    "Transparent pricing for AI Trainer Academy. Book 1-on-1 AI training sessions, buy AI courses, or apply to teach. Trainers keep 80% of revenue. Pay via M-Pesa, card, or USDT crypto.",
  keywords: "AI trainer pricing, AI training cost, AI academy pricing, data annotation training price, AI trainer revenue share",
  alternates: { canonical: "https://ai-trainer-academy.top/pricing" },
  openGraph: {
    title: "AI Training Pricing | AI Trainer Academy",
    description: "Simple, transparent pricing for learners, AI trainers, and businesses. Trainers keep 80% of all revenue.",
    url: "https://ai-trainer-academy.top/pricing",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
