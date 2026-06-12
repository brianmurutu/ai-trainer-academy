"use client";
import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "I went from zero to fine-tuning my first LLaMA model in three weeks. The trainer was patient, structured, and genuinely expert. Worth every shilling.",
    author: "Amina Hassan",
    role: "ML Engineer, Nairobi",
    initials: "AH",
    bg: "linear-gradient(135deg, #1A6FBF 0%, #2B8FDF 100%)",
    starRating: 5,
  },
  {
    text: "As a trainer, this platform handles everything — booking, payments, certificates. I just show up and teach. My income tripled in two months.",
    author: "Dr. Chen Wei",
    role: "AI Researcher and Trainer",
    initials: "CW",
    bg: "linear-gradient(135deg, #1A7A4A 0%, #22A05E 100%)",
    starRating: 5,
  },
  {
    text: "Our team of 12 completed the corporate AI training package. The ROI was immediate — we cut our model fine-tuning time by 60%.",
    author: "Sarah Odhiambo",
    role: "CTO, Tanda Africa",
    initials: "SO",
    bg: "linear-gradient(135deg, #4A1A7A 0%, #6B2AAE 100%)",
    starRating: 5,
  },
];

export default function Testimonials() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = "fadeSlideUp 0.5s ease both";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      background: "var(--navy)",
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>What people say</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "white", letterSpacing: "-0.6px" }}>
            Trusted by learners and trainers
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {testimonials.map(({ text, author, role, initials, bg, starRating }, i) => (
            <div
              key={author}
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 18, padding: "28px",
                opacity: 0,
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "both",
                transition: "transform 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <Quote size={22} color="rgba(255,255,255,0.2)" style={{ marginBottom: 16 }} />

              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {Array.from({ length: starRating }).map((_, si) => (
                  <Star key={si} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginBottom: 24 }}>{text}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: bg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white",
                  flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}>{initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{author}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
