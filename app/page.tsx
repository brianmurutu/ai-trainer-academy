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
  title: "AI Trainer Academy | Learn to Train AI Models",
  description:
    "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners. Pay in KES, USD, or crypto.",
  alternates: {
    canonical: "https://ai-trainer-academy.top",
  },
  openGraph: {
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
