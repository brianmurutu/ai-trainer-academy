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
<<<<<<< HEAD
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

function JobPlatformsTeaser() {
  return (
    <section style={{ maxWidth: 1180, margin: "72px auto", padding: "0 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
            AI Training Jobs
          </p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.6px" }}>
            Get paid to train AI models
          </h2>
        </div>
        <Link href="/jobs" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
          Browse all platforms <ArrowRight size={15} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {[
          { name: "AfterQuery", pay: "$75/hr typical", roles: "Coding & Domain Experts", url: "https://experts.afterquery.com/apply?ref=B8zCzOvKzIXOztI2DHUeKeGycnH2", featured: true },
          { name: "RemoExperts", pay: "$60–$150/hr", roles: "Expert contracts", url: "#" },
          { name: "Babel Audio", pay: "$105–$150/hr", roles: "Transcription & Audio", url: "#" },
          { name: "Mercor", pay: "$55–$200/hr", roles: "Premium expert network", url: "#" },
        ].map(p => (
          <div key={p.name} style={{
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: "20px",
            position: "relative",
            transition: "border-color 0.15s, box-shadow 0.15s"
          }}>
            {p.featured && (
              <span style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "var(--accent-light)",
                color: "var(--accent)",
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 20
              }}>Featured</span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={16} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--navy)" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.roles}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--slate)", marginBottom: 14, fontWeight: 500 }}>{p.pay}</div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 500
            }}>
              Apply now <ArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

=======

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

>>>>>>> d950e182d713accc40d6b00347024f8418854729
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Trainers />
<<<<<<< HEAD
        <JobPlatformsTeaser />
=======
>>>>>>> d950e182d713accc40d6b00347024f8418854729
        <Pricing />
        <Payments />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
