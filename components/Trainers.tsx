"use client";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const trainers = [
  {
    initials: "JM",
    name: "James Mwangi",
    spec: "Fine-tuning and RLHF",
    tags: ["LLaMA", "GPT-4", "RLHF"],
    rating: 4.9,
    sessions: 128,
    rate: "KES 2,500/hr",
    bg: "#1A2E42",
    available: true,
    slug: "james-mwangi",
  },
  {
    initials: "SA",
    name: "Sofia Andersson",
    spec: "Prompt Engineering",
    tags: ["ChatGPT", "Claude", "Gemini"],
    rating: 4.8,
    sessions: 94,
    rate: "$18/hr",
    bg: "#1A6FBF",
    available: true,
    slug: "sofia-andersson",
  },
  {
    initials: "KO",
    name: "Kofi Owusu",
    spec: "Dataset Curation",
    tags: ["Annotation", "JSONL", "Hugging Face"],
    rating: 5.0,
    sessions: 61,
    rate: "KES 3,000/hr",
    bg: "#1A7A4A",
    available: false,
    slug: "kofi-owusu",
  },
  {
    initials: "PR",
    name: "Priya Rajan",
    spec: "Model Evaluation",
    tags: ["Benchmarking", "MMLU", "evals"],
    rating: 4.7,
    sessions: 203,
    rate: "$22/hr",
    bg: "#7A4A1A",
    available: true,
    slug: "priya-rajan",
  },
  {
    initials: "DK",
    name: "David Kamau",
    spec: "LoRA and PEFT",
    tags: ["LoRA", "QLoRA", "Adapters"],
    rating: 4.9,
    sessions: 87,
    rate: "KES 2,000/hr",
    bg: "#4A1A7A",
    available: true,
    slug: "david-kamau",
  },
  {
    initials: "YN",
    name: "Yuki Nakamura",
    spec: "AI Safety and Alignment",
    tags: ["Alignment", "RLAIF", "Red-teaming"],
    rating: 4.8,
    sessions: 45,
    rate: "$28/hr",
    bg: "#1A5A7A",
    available: false,
    slug: "yuki-nakamura",
  },
];

export default function Trainers() {
  return (
    <section
      style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 44,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 10,
            }}
          >
            Featured trainers
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.6px",
            }}
          >
            Learn from verified experts
          </h2>
        </div>
        <Link
          href="/trainers"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          View all trainers <ArrowRight size={15} />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {trainers.map(
          ({ initials, name, spec, tags, rating, sessions, rate, bg, available, slug }) => (
            <Link
              key={name}
              href={`/trainers/${slug}`}
              style={{ textDecoration: "none", display: "block" }}
              aria-label={`View ${name}'s trainer profile`}
            >
              <article
                style={{
                  background: "white",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "20px",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#B5D4F4";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 24px rgba(26,111,191,0.09)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "white",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: "var(--navy)",
                        marginBottom: 1,
                      }}
                    >
                      {name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>
                      {spec}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: available ? "var(--green)" : "var(--muted)",
                      background: available
                        ? "var(--green-light)"
                        : "var(--surface)",
                      padding: "3px 8px",
                      borderRadius: 20,
                      flexShrink: 0,
                    }}
                    aria-label={available ? "Available for booking" : "Currently busy"}
                  >
                    {available ? "Available" : "Busy"}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        padding: "3px 9px",
                        background: "var(--surface)",
                        borderRadius: 20,
                        color: "var(--slate)",
                        border: "1px solid var(--line)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 14,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Star size={13} fill="#B05C0E" color="#B05C0E" />
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--ink)",
                        fontWeight: 600,
                      }}
                    >
                      {rating}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      · {sessions} sessions
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {rate}
                  </span>
                </div>
              </article>
            </Link>
          )
        )}
      </div>
    </section>
  );
}
