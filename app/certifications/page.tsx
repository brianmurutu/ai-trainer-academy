import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, CheckCircle, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications | AI Trainer Academy",
  description: "Learn about the verified certification framework of AI Trainer Academy.",
};

export default function CertificationsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        
        {/* Header */}
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
            Verified Credentials
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
            lineHeight: 1.2
          }}>
            Certifications that Carry Weight
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Unlike generic certificates of completion, AI Trainer Academy certificates verify that your code has been reviewed and approved by real industry practitioners.
          </p>
        </section>

        {/* Process Section */}
        <section style={{
          maxWidth: 900,
          margin: "0 auto 60px",
          background: "white",
          borderRadius: 16,
          border: "1px solid var(--line)",
          padding: "48px 40px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 28, textAlign: "center" }}>
            How Certification Works
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              {
                step: "01",
                title: "Complete All Lessons",
                desc: "Go through the entire syllabus of your enrolled course. Code along, replicate notebooks, and complete quizzes inside the interactive Course Player."
              },
              {
                step: "02",
                title: "Submit a Practical Capstone",
                desc: "Each course requires submitting a capstone project (e.g., a fine-tuned adapter, or a configured Qdrant RAG pipeline) to demonstrate code readiness."
              },
              {
                step: "03",
                title: "Trainer Audit & Approval",
                desc: "Your course instructor personally reviews your notebook repository, provides feedback code audits, and signs off on your certification code quality."
              }
            ].map((p, idx) => (
              <div key={idx} style={{ display: "flex", gap: 20, alignItems: "start" }}>
                <div style={{
                  fontSize: 24, fontWeight: 800, color: "var(--accent)", background: "var(--accent-light)",
                  width: 52, height: 52, borderRadius: 12, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0
                }}>
                  {p.step}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features list */}
        <section style={{ maxWidth: 900, margin: "0 auto 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="features-mobile">
          <div style={{
            background: "white", padding: 32, borderRadius: 12, border: "1px solid var(--line)",
            display: "flex", gap: 16, alignItems: "start"
          }}>
            <ShieldCheck size={28} color="var(--accent)" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>Cryptographically Verified</h3>
              <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>
                Every certificate contains a unique hash verified against the database. Employers can verify credentials instantly in our directory.
              </p>
            </div>
          </div>

          <div style={{
            background: "white", padding: 32, borderRadius: 12, border: "1px solid var(--line)",
            display: "flex", gap: 16, alignItems: "start"
          }}>
            <Cpu size={28} color="var(--accent)" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>Github Integrated</h3>
              <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>
                Add your certificate badge directly to your GitHub readme. Display verified capabilities in model training to recruiters.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Link href="/courses" style={{
            background: "var(--navy)", color: "white", padding: "12px 24px",
            borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8, transition: "background-color 0.15s"
          }}
            className="explore-btn"
          >
            Explore Courses to Get Certified <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <Footer />
      <style>{`
        .explore-btn:hover {
          background-color: var(--navy-800) !important;
        }
        @media(max-width: 768px) {
          .features-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
