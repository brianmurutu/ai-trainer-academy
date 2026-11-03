import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export default function JobHomePage() {
  return (
    <div>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        <section style={{ maxWidth: 1100, margin: "0 auto 40px", textAlign: "center" }}>
          <span style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
            border: "1px solid rgba(26,111,191,0.1)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            display: "inline-block",
            marginBottom: 16
          }}>
            AI Training Jobs
          </span>
          <h1 style={{ fontSize: "clamp(32px,5vw,44px)", fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
            Get Paid to Train AI
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", maxWidth: 700, margin: "0 auto 24px" }}>
            Browse verified AI training platforms, compare pay and apply in one click. Top platforms pay $30–$200/hr for expert roles.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/jobs/platforms" style={{
              background: "var(--navy)",
              color: "white",
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            }}>
              Browse platforms <ArrowRight size={16} />
            </Link>
            <a href="https://experts.afterquery.com/apply?ref=B8zCzOvKzIXOztI2DHUeKeGycnH2" target="_blank" rel="noopener noreferrer" style={{
              background: "white",
              color: "var(--navy)",
              padding: "12px 24px",
              border: "1px solid var(--line)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none"
            }}>
              Apply to AfterQuery
            </a>
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {[
              { name: "AfterQuery", pay: "$75/hr typical", roles: "Coding & Domain Experts", url: "https://experts.afterquery.com/apply?ref=B8zCzOvKzIXOztI2DHUeKeGycnH2", featured: true },
              { name: "RemoExperts", pay: "$60–$150/hr", roles: "Expert contracts", url: "#" },
              { name: "Babel Audio", pay: "$105–$150/hr", roles: "Transcription & Audio", url: "#" },
              { name: "Mercor", pay: "$55–$200/hr", roles: "Premium expert network", url: "#" },
              { name: "Terac", pay: "$65–$155/hr", roles: "Live listings", url: "#" },
              { name: "micro1", pay: "$45–$200/hr", roles: "Zara AI-interview", url: "#" },
            ].map(p => (
              <div key={p.name} style={{
                background: "white",
                border: "1px solid var(--line)",
                borderRadius: 12,
                padding: 20,
                position: "relative"
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
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{p.roles}</div>
                <div style={{ fontSize: 13, color: "var(--slate)", marginBottom: 12, fontWeight: 500 }}>{p.pay}</div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 13,
                  color: "var(--accent)",
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4
                }}>
                  Apply now <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}