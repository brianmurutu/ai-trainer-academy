import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Took me a couple of sessions to find my footing, but by week three I'd fine-tuned my first LLaMA model. The trainer didn't dumb it down — he just made it approachable. That made all the difference.",
    author: "Amina Hassan",
    role: "ML Engineer, Nairobi",
    initials: "AH",
    bg: "linear-gradient(135deg, #1A6FBF 0%, #0E3D7A 100%)",
    stars: 5,
  },
  {
    text: "I've taught on other platforms before. This one is the only one where I feel like a professional rather than a contractor. Booking, payments, learner feedback — it all just works. My income tripled in two months.",
    author: "Dr. Chen Wei",
    role: "AI Researcher and Trainer",
    initials: "CW",
    bg: "linear-gradient(135deg, #1A7A4A 0%, #0D4A2A 100%)",
    stars: 5,
  },
  {
    text: "We put our whole engineering team through the corporate training package. Honestly wasn't sure what to expect — but we cut our model fine-tuning cycle time by about 60%. That was a genuine surprise.",
    author: "Sarah Odhiambo",
    role: "CTO, Tanda Africa",
    initials: "SO",
    bg: "linear-gradient(135deg, #5B21B6 0%, #3B1075 100%)",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="testi-section" aria-label="Customer testimonials">
      {/* Background grid texture */}
      <div className="testi-bg-texture" aria-hidden="true" />

      <div className="testi-inner">
        <div className="testi-header">
          <span className="testi-eyebrow">What people say</span>
          <h2 className="testi-heading">
            What people are saying
          </h2>
          <p className="testi-sub">
            Written by real learners and trainers — no editing, no incentives.
          </p>
        </div>

        <div className="testi-grid">
          {testimonials.map(({ text, author, role, initials, bg, stars }) => (
            <figure key={author} className="testi-card">
              {/* Glass highlight line */}
              <div className="testi-card-shimmer" />

              {/* Stars */}
              <div className="testi-stars">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={13} fill="#FBBF24" color="#FBBF24" />
                ))}
              </div>

              <blockquote className="testi-quote">
                &ldquo;{text}&rdquo;
              </blockquote>

              <figcaption className="testi-author">
                <div
                  className="testi-avatar"
                  style={{ background: bg, letterSpacing: "0.5px", fontSize: 14 }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <div className="testi-name">{author}</div>
                  <div className="testi-role">{role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .testi-section {
          background: var(--navy);
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .testi-bg-texture {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        .testi-section::before {
          content: '';
          position: absolute;
          top: -40%; left: -20%;
          width: 60%; height: 130%;
          background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 65%);
        }
        .testi-section::after {
          content: '';
          position: absolute;
          bottom: -30%; right: -15%;
          width: 45%; height: 90%;
          background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%);
        }
        .testi-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 88px 24px;
          position: relative;
          z-index: 2;
        }
        .testi-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .testi-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 14px;
        }
        .testi-heading {
          font-size: clamp(24px, 3.5vw, 38px);
          font-weight: 700;
          color: white;
          letter-spacing: -0.8px;
          margin-bottom: 12px;
        }
        .testi-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
        }
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .testi-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 32px;
          margin: 0;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .testi-card:hover {
          border-color: rgba(37,99,235,0.35);
          background: rgba(255,255,255,0.06);
          transform: translateY(-3px);
        }
        .testi-card-shimmer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          pointer-events: none;
        }
        .testi-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 18px;
        }
        .testi-quote {
          font-size: 14.5px;
          color: rgba(255,255,255,0.78);
          line-height: 1.75;
          font-style: normal;
          flex: 1;
          margin-bottom: 24px;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: 13px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .testi-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .testi-name {
          font-size: 14px;
          font-weight: 700;
          color: white;
          margin-bottom: 2px;
        }
        .testi-role {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }
        @media (max-width: 640px) {
          .testi-inner { padding: 60px 20px; }
          .testi-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
