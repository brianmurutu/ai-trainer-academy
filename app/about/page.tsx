import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Award, Brain, Users, Globe, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AI Trainer Academy",
  description: "Learn about the mission, values, and founders of AI Trainer Academy.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        
        {/* Header Hero Section */}
        <section style={{ maxWidth: 800, margin: "0 auto 60px", textAlign: "center" }}>
          <span style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
            border: "1px solid rgba(26,111,191,0.1)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            display: "inline-block",
            marginBottom: 16,
          }}>
            Our Story & Mission
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
            lineHeight: 1.2
          }}>
            Democratizing Large Model Expertise
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            AI Trainer Academy was founded to bridge the gap between academic theory and practical model training. We connect developers, researchers, and enterprises directly with verified practitioners.
          </p>
        </section>

        {/* Story Section */}
        <section style={{
          maxWidth: 900,
          margin: "0 auto 80px",
          background: "white",
          borderRadius: 16,
          border: "1px solid var(--line)",
          padding: "48px 40px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, fontSize: 14.5, color: "var(--slate)", lineHeight: 1.8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
              Why AI Trainer Academy?
            </h2>
            <p>
              In the fast-paced world of generative AI, textbook training is obsolete by the time it is published. The real expertise lies in the minds of the engineering practitioners who spend their days curating datasets, adjusting learning rates, debugging loss spikes, and fine-tuning weights.
            </p>
            <p>
              Our platform was born to solve two critical problems:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <li>
                <strong>For Learners:</strong> Finding qualified mentors in advanced machine learning (like RLHF or PEFT) is near impossible on general freelancing sites. AI Trainer Academy provides a fully-vetted directory of active practitioners.
              </li>
              <li>
                <strong>For Trainers:</strong> Specialized NLP engineers and ML researchers need a platform where they can monetize their advanced skills without diluting their services on generic marketplaces.
              </li>
            </ul>
            <p>
              By offering secure escrow payments, integrated course players, and booking slots, we make it easy for developers to connect, learn, and build the next generation of AI systems.
            </p>
          </div>
        </section>

        {/* Metrics Grid */}
        <section style={{ maxWidth: 900, margin: "0 auto 80px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", textAlign: "center", marginBottom: 32 }}>
            Platform Milestones
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20
          }}>
            {[
              { value: "4,500+", label: "Active Learners", Icon: Users, color: "#6366F1", bg: "#EEF2FF" },
              { value: "50+", label: "Verified Trainers", Icon: Brain, color: "#0EA5E9", bg: "#E0F2FE" },
              { value: "10+", label: "African Countries", Icon: Globe, color: "#059669", bg: "#D1FAE5" },
              { value: "1,200+", label: "Hours of 1-on-1s", Icon: Award, color: "#D97706", bg: "#FEF3C7" },
            ].map((stat, idx) => (
              <div key={idx} style={{
                background: "white",
                borderRadius: 12,
                border: "1px solid var(--line)",
                padding: 24,
                textAlign: "center"
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", background: stat.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", color: stat.color
                }}>
                  <stat.Icon size={20} />
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: "var(--slate)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--navy) 0%, #1A2E42 100%)",
            borderRadius: 16,
            padding: "48px 32px",
            color: "white"
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready to begin your training?</h2>
            <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.6 }}>
              Join thousands of developers leveling up their practical model fine-tuning and prompting skills.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
              <Link href="/trainers" style={{
                background: "var(--accent)", color: "white", padding: "12px 24px",
                borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 8
              }}>
                Find a Trainer <ArrowRight size={15} />
              </Link>
              <Link href="/courses" style={{
                background: "rgba(255,255,255,0.08)", color: "white", padding: "12px 24px",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, fontSize: 14,
                fontWeight: 600, textDecoration: "none"
              }}>
                Browse Courses
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
