import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "I went from zero to fine-tuning my first LLaMA model in three weeks. The trainer was patient, structured, and genuinely expert. Worth every penny.",
    author: "Amina Hassan",
    role: "ML Engineer, Nairobi",
    initials: "AH", bg: "#1A6FBF",
  },
  {
    text: "As a trainer, this platform handles everything — booking, payments, certificates. I just show up and teach. My income tripled in two months.",
    author: "Dr. Chen Wei",
    role: "AI Researcher & Trainer",
    initials: "CW", bg: "#1A7A4A",
  },
  {
    text: "Our team of 12 completed the corporate AI training package. The ROI was immediate — we cut our model fine-tuning time by 60%.",
    author: "Sarah Odhiambo",
    role: "CTO, Tanda Africa",
    initials: "SO", bg: "#4A1A7A",
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: "var(--navy)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>What people say</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 600, color: "white", letterSpacing: "-0.6px" }}>
            Trusted by learners and trainers
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {testimonials.map(({ text, author, role, initials, bg }) => (
            <div key={author} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16, padding: "24px",
            }}>
              <Quote size={20} color="rgba(255,255,255,0.25)" style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 20 }}>{text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: bg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white",
                }}>{initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "white" }}>{author}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
