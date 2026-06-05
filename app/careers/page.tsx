import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Briefcase, MapPin, Clock, Brain, Globe, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — AI Trainer Academy",
  description: "Explore career opportunities at AI Trainer Academy. Build the future of AI engineering education.",
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior MLOps & Platform Engineer",
      team: "Engineering",
      location: "Nairobi, Kenya (Hybrid)",
      type: "Full-Time",
      description: "Own the scale and performance of our RAG pipelines, model deployment configurations, and developer sandboxes."
    },
    {
      title: "Full Stack Engineer (React & Next.js)",
      team: "Engineering",
      location: "Remote (Africa/Europe)",
      type: "Full-Time",
      description: "Build robust booking tools, payment verification webhooks, and the trainer/learner course builders."
    },
    {
      title: "AI Curriculum Lead Researcher",
      team: "Education",
      location: "Remote",
      type: "Contract",
      description: "Curate cutting-edge syllabi on deep learning, LoRA fine-tuning parameters, and AI model evaluation frameworks."
    }
  ];

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
            Work With Us
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
            lineHeight: 1.2
          }}>
            Build the Future of AI Learning
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            We're a team of engineers and educators working to democratize large model training across the continent and beyond. Join us in building premium learning platforms.
          </p>
        </section>

        {/* Benefits Grid */}
        <section style={{ maxWidth: 900, margin: "0 auto 80px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", textAlign: "center", marginBottom: 36 }}>
            Perks of Working Here
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}>
            {[
              {
                icon: <Globe size={20} color="var(--accent)" />,
                title: "Remote First",
                desc: "Work from wherever you're most productive. We coordinate asynchronously across time zones."
              },
              {
                icon: <Brain size={20} color="var(--accent)" />,
                title: "Learning Budget",
                desc: "Get an annual budget of $1,500 for books, courses, hardware, or AI API credentials."
              },
              {
                icon: <Award size={20} color="var(--accent)" />,
                title: "Premium Equipment",
                desc: "We provide high-spec hardware (MacBooks/Thinkpads) and noise-canceling office gear."
              }
            ].map((perk, i) => (
              <div key={i} style={{
                background: "white", padding: 32, borderRadius: 12, border: "1px solid var(--line)",
                textAlign: "center"
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", background: "var(--accent-light)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
                }}>
                  {perk.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{perk.title}</h3>
                <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.6 }}>{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 28, textAlign: "center" }}>
            Open Roles
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {jobs.map((job, idx) => (
              <div
                key={idx}
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid var(--line)",
                  padding: 28,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 20,
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                className="job-card"
              >
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", padding: "2px 8px", borderRadius: 12, background: "var(--accent-light)", textTransform: "uppercase" }}>
                      {job.team}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted)" }}>
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted)" }}>
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{job.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5 }}>{job.description}</p>
                </div>
                <Link href="/contact" style={{
                  background: "var(--navy)", color: "white", padding: "10px 20px", borderRadius: 8,
                  fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-flex",
                  alignItems: "center", gap: 6, transition: "background-color 0.15s"
                }}
                  className="apply-btn"
                >
                  Apply Now <Briefcase size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .apply-btn:hover {
          background-color: var(--navy-800) !important;
        }
        @media(max-width: 600px) {
          .job-card { flex-direction: column !important; align-items: stretch !important; }
        }
      `}</style>
    </>
  );
}
