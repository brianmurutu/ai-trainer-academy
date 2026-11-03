import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

export default function JobPlatformsPage() {
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
            Best AI Training Platforms That Pay
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", maxWidth: 700, margin: "0 auto" }}>
            Find verified AI trainer roles, platform pay rates and apply directly. We track open roles and typical pay across the top platforms.
          </p>
        </section>

        <section style={{ maxWidth: 1100, margin: "0 auto 60px" }}>
          <div style={{
            background: "white",
            borderRadius: 16,
            border: "1px solid var(--line)",
            padding: 24,
            marginBottom: 24
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Briefcase size={20} color="var(--accent)" />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", margin: 0 }}>Featured Platform</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)" }}>AfterQuery — AI Expertise Network</div>
                <div style={{ fontSize: 13, color: "var(--slate)", marginTop: 4 }}>
                  Domain expert roles, coding, research studies. Typical pay $75/hr.
                </div>
              </div>
              <a
                href="https://experts.afterquery.com/apply?ref=B8zCzOvKzIXOztI2DHUeKeGycnH2"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--navy)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                Apply now <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {[
              { name: "RemoExperts", pay: "$60–$150/hr", roles: 31, tag: "Expert contracts", url: "#" },
              { name: "Babel Audio", pay: "$105–$150/hr", roles: 47, tag: "Transcription & Audio", url: "#" },
              { name: "Mercor", pay: "$55–$200/hr", roles: 120, tag: "Premium expert network", url: "#" },
            ].map(p => (
              <div key={p.name} style={{
                background: "white",
                border: "1px solid var(--line)",
                borderRadius: 12,
                padding: 20
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{p.tag}</div>
                <div style={{ fontSize: 13, color: "var(--slate)", marginBottom: 12 }}>{p.pay} · {p.roles} open roles</div>
                <Link href={p.url} style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
                  View roles →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}