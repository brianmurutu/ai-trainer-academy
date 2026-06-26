import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Trainers from "@/components/Trainers";
import Pricing from "@/components/Pricing";
import Payments from "@/components/Payments";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Trainer Academy | AI Training, Data Annotation & AI Model Training",
  description:
    "AI Trainer Academy is the #1 platform for AI training and data annotation education. Connect with verified AI trainers to learn RLHF, LLM fine-tuning, prompt engineering, and AI model training. Earn certified credentials. Pay in KES, USD, or crypto.",
  keywords:
    "AI Trainer, AI Training, AI Training Academy, AI Academy, AI Models Training, Data Annotation, RLHF, fine-tuning, prompt engineering, AI trainer certification, AI data labeling, machine learning training, AI education Kenya",
  alternates: {
    canonical: "https://ai-trainer-academy.top",
  },
  openGraph: {
    title: "AI Trainer Academy | AI Training & Data Annotation Platform",
    description: "The specialist platform for AI training, data annotation, and AI model training education. Find verified AI trainers worldwide.",
    url: "https://ai-trainer-academy.top",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Trainers />
        <Pricing />
        <Payments />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
