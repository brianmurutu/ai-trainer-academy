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
  title: "Trainer Academy | Learn Machine Learning from Practitioners",
  description:
    "Connect with trainers who work in machine learning every day. Structured courses, 1-on-1 sessions, and credentials employers recognise. Pay in KES, USD, EUR, or crypto.",
  keywords:
    "machine learning training, data annotation, RLHF training, fine-tuning course, prompt engineering, practitioner training, Kenyan tech education, LLM fine-tuning",
  alternates: {
    canonical: "https://ai-trainer-academy.top",
  },
  openGraph: {
    title: "Trainer Academy | Practitioner-Led Machine Learning Training",
    description: "Book 1-on-1 sessions or take structured courses with practitioners who work in ML every day. Real credentials, honest pricing.",
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
