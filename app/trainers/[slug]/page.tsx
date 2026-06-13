import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BookingWidget from "@/components/trainers/BookingWidget";
import TrainerRateDisplay from "@/components/trainers/TrainerRateDisplay";
import {
  Star,
  MapPin,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  Award,
  Link2,
  GitFork,
} from "lucide-react";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Mock trainer data — keyed by slug
// Replace with Supabase query once trainers table exists
// ---------------------------------------------------------------------------
const TRAINERS: Record<string, {
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  country: string;
  specialities: string[];
  experience: string;
  rateKsh: number;
  rateUsd: number;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  learnersHelped: number;
  linkedinUrl: string;
  githubUrl?: string;
  sampleWorkUrl?: string;
  courses: { title: string; enrolled: number; rating: number }[];
  reviews: { name: string; initials: string; rating: number; date: string; text: string }[];
  availableSlots: { id: string; date: string; dayLabel: string; time: string; duration: string; durationHrs: number }[];
}> = {
  "dr-amara-osei": {
    slug: "dr-amara-osei",
    name: "Dr. Amara Osei",
    tagline: "LLM Fine-tuning Specialist · PhD in ML from UCT",
    bio: "I've spent the last 8 years working at the intersection of academic research and industry AI. After completing my PhD at the University of Cape Town and doing two years of postdoctoral work at DeepMind, I joined Andela as Principal ML Engineer before moving to independent training full-time.\n\nI specialize in parameter-efficient fine-tuning techniques (LoRA, QLoRA, DoRA), RLHF pipelines, and dataset curation for African-language NLP. My teaching style is hands-on. Every session involves writing real code, and I provide code reviews after each session.",
    country: "Ghana",
    specialities: ["Fine-tuning (LoRA / QLoRA)", "RLHF & RLAIF", "Dataset Curation & Annotation", "Model Evaluation & Benchmarking", "NLP & Text Models"],
    experience: "8+ years",
    rateKsh: 3500,
    rateUsd: 27,
    rating: 4.9,
    reviewCount: 143,
    sessionsCompleted: 328,
    learnersHelped: 247,
    linkedinUrl: "https://linkedin.com/in/dramaraosei",
    githubUrl: "https://github.com/dramaraosei",
    sampleWorkUrl: "https://huggingface.co/dramaraosei",
    courses: [
      { title: "Fine-tuning LLaMA 3 with LoRA", enrolled: 47, rating: 4.9 },
      { title: "QLoRA Masterclass: VRAM-efficient Fine-tuning", enrolled: 31, rating: 4.8 },
    ],
    reviews: [
      { name: "Brian Mwangi", initials: "BM", rating: 5, date: "Jun 1, 2025", text: "Absolutely exceptional. Dr. Osei's ability to simplify LoRA configuration is unmatched. I went from zero to running a fine-tuned model in two sessions. Worth every shilling." },
      { name: "Priya Nair", initials: "PN", rating: 5, date: "May 22, 2025", text: "Very patient and thorough. He reviews your code in real time and catches bugs I'd been staring at for days. Highly recommend for anyone serious about fine-tuning." },
      { name: "Kofi Asante", initials: "KA", rating: 5, date: "May 10, 2025", text: "Best investment I've made in my ML career. The post-session code review is a unique touch you won't find anywhere else." },
      { name: "Zawadi Kamau", initials: "ZK", rating: 4, date: "Apr 28, 2025", text: "Great content and very knowledgeable. Sometimes goes a bit fast but always happy to slow down when asked." },
    ],
    availableSlots: [
      { id: "s1", date: "Thu Jun 5", dayLabel: "Tomorrow, Thu Jun 5", time: "4:00 PM to 5:30 PM EAT", duration: "1.5 hrs", durationHrs: 1.5 },
      { id: "s2", date: "Sat Jun 7", dayLabel: "Saturday, Jun 7", time: "10:00 AM to 11:00 AM EAT", duration: "1 hr", durationHrs: 1 },
      { id: "s3", date: "Sat Jun 7", dayLabel: "Saturday, Jun 7", time: "2:00 PM to 4:00 PM EAT", duration: "2 hrs", durationHrs: 2 },
      { id: "s4", date: "Mon Jun 9", dayLabel: "Monday, Jun 9", time: "6:00 PM to 7:00 PM EAT", duration: "1 hr", durationHrs: 1 },
    ],
  },
  "naledi-dlamini": {
    slug: "naledi-dlamini",
    name: "Naledi Dlamini",
    tagline: "AI Safety Researcher & RLHF Engineer",
    bio: "I'm a researcher and practitioner focused on making AI systems safer and more aligned with human values. I spent three years at Anthropic working on Constitutional AI before returning to Africa to help build the continent's AI safety ecosystem.\n\nMy sessions cover RLHF from first principles, reward modeling, Constitutional AI techniques, and evaluation frameworks for alignment. I also work extensively with multimodal models and can help you navigate the fast-moving safety literature.",
    country: "South Africa",
    specialities: ["RLHF & RLAIF", "AI Safety & Alignment", "Model Evaluation & Benchmarking", "Multimodal Models", "Prompt Engineering"],
    experience: "6 years",
    rateKsh: 4200,
    rateUsd: 32,
    rating: 4.9,
    reviewCount: 98,
    sessionsCompleted: 189,
    learnersHelped: 142,
    linkedinUrl: "https://linkedin.com/in/naledidlamini",
    courses: [
      { title: "AI Safety & Alignment Fundamentals", enrolled: 23, rating: 4.9 },
    ],
    reviews: [
      { name: "James Kariuki", initials: "JK", rating: 5, date: "May 30, 2025", text: "Naledi is one of the most knowledgeable people I've spoken to on the topic of AI alignment. Her ability to explain Constitutional AI clearly is remarkable." },
      { name: "Amira Hassan", initials: "AH", rating: 5, date: "May 15, 2025", text: "Life-changing session. The way she connects abstract safety concepts to practical engineering is exactly what I needed." },
    ],
    availableSlots: [
      { id: "s1", date: "Fri Jun 6", dayLabel: "Friday, Jun 6", time: "10:00 AM to 11:00 AM EAT", duration: "1 hr", durationHrs: 1 },
      { id: "s2", date: "Tue Jun 10", dayLabel: "Tuesday, Jun 10", time: "3:00 PM to 5:00 PM EAT", duration: "2 hrs", durationHrs: 2 },
    ],
  },
};

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trainer = TRAINERS[slug];
  if (!trainer) return { title: "Trainer Not Found | AI Trainer Academy" };
  return {
    title: `${trainer.name} | AI Trainer Academy`,
    description: trainer.tagline,
  };
}

// ---------------------------------------------------------------------------
// Star display helper
// ---------------------------------------------------------------------------
function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} color={s <= Math.round(value) ? "#F59E0B" : "#E5E7EB"} fill={s <= Math.round(value) ? "#F59E0B" : "none"} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function TrainerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = TRAINERS[slug];

  if (!trainer) notFound();

  // Get the current logged-in user's email for pre-filling Paystack
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email;

  const trainerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://ai-trainer-academy.top/trainers/${trainer.slug}#trainer`,
    "name": trainer.name,
    "jobTitle": "AI Model Trainer & Engineering Consultant",
    "description": trainer.tagline,
    "homeLocation": {
      "@type": "Place",
      "name": trainer.country
    },
    "sameAs": trainer.linkedinUrl ? [trainer.linkedinUrl] : [],
    "knowsAbout": trainer.specialities,
    "worksFor": {
      "@type": "Organization",
      "name": "AI Trainer Academy"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ai-trainer-academy.top"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Trainers",
        "item": "https://ai-trainer-academy.top/trainers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": trainer.name,
        "item": `https://ai-trainer-academy.top/trainers/${trainer.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trainerJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
        {/* Nav breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          background: "white", borderBottom: "1px solid var(--line)",
          padding: "16px 32px",
        }} className="responsive-container">
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--slate)" }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} className="hover-link">
              Home
            </Link>
            <span style={{ color: "var(--muted)" }}>/</span>
            <Link href="/trainers" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} className="hover-link">
              Trainers
            </Link>
            <span style={{ color: "var(--muted)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }} aria-current="page">
              {trainer.name}
            </span>
          </div>
        </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 64px" }} className="responsive-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }} className="responsive-split-grid">

          {/* Left: main profile */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Hero card */}
            <div style={{
              background: "white", borderRadius: 16, padding: "28px 28px 24px",
              border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Avatar */}
                <div style={{
                  width: 80, height: 80, borderRadius: 20,
                  background: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, fontWeight: 700, color: "white", flexShrink: 0,
                }}>
                  {trainer.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
                        {trainer.name}
                      </h1>
                      <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.5, marginBottom: 8 }}>{trainer.tagline}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={13} color="var(--muted)" />
                        <span style={{ fontSize: 13, color: "var(--muted)" }}>{trainer.country}</span>
                        <span style={{ color: "var(--line)", margin: "0 4px" }}>·</span>
                        <Clock size={13} color="var(--muted)" />
                        <span style={{ fontSize: 13, color: "var(--muted)" }}>{trainer.experience} experience</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {trainer.linkedinUrl && (
                        <a href={trainer.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{
                          width: 34, height: 34, borderRadius: 8, display: "flex",
                          alignItems: "center", justifyContent: "center",
                          background: "#F5F7FA", border: "1px solid var(--line)",
                          color: "var(--slate)", textDecoration: "none",
                        }}>
                          <Link2 size={15} />
                        </a>
                      )}
                      {trainer.githubUrl && (
                        <a href={trainer.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub" style={{
                          width: 34, height: 34, borderRadius: 8, display: "flex",
                          alignItems: "center", justifyContent: "center",
                          background: "#F5F7FA", border: "1px solid var(--line)",
                          color: "var(--slate)", textDecoration: "none",
                        }}>
                          <GitFork size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0, marginTop: 24, paddingTop: 20,
                borderTop: "1px solid var(--line)",
              }} className="stats-row-grid">
                {[
                    { label: "Rating", value: <span style={{ display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "center" }}>{trainer.rating}<Star size={15} fill="#F59E0B" color="#F59E0B" style={{ display: "inline" }} /></span>, sub: `${trainer.reviewCount} reviews` },
                  { label: "Sessions", value: trainer.sessionsCompleted.toString(), sub: "completed" },
                  { label: "Learners", value: trainer.learnersHelped.toString(), sub: "helped" },
                  { label: "Rate", value: <TrainerRateDisplay rateKsh={trainer.rateKsh} rateUsd={trainer.rateUsd} />, sub: "per hour" },
                ].map(({ label, value, sub }, i, arr) => (
                  <div key={label} style={{
                    textAlign: "center",
                    borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                    padding: "0 16px",
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "var(--ink)", marginTop: 4 }}>{label}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialities */}
            <div style={{
              background: "white", borderRadius: 14, padding: "22px 24px",
              border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 14 }}>Specialities</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {trainer.specialities.map(s => (
                  <span key={s} style={{
                    padding: "5px 12px", background: "var(--accent-light)",
                    color: "var(--accent)", borderRadius: 20, fontSize: 12, fontWeight: 500,
                    border: "1px solid rgba(26,111,191,0.15)",
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div style={{
              background: "white", borderRadius: 14, padding: "22px 24px",
              border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 14 }}>About {trainer.name.split(" ")[0]}</h2>
              {trainer.bio.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.75, marginBottom: i < trainer.bio.split("\n\n").length - 1 ? 12 : 0 }}>
                  {para}
                </p>
              ))}
              {trainer.sampleWorkUrl && (
                <a href={trainer.sampleWorkUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
                  fontSize: 13, color: "var(--accent)", fontWeight: 500, textDecoration: "none",
                }}>
                  View portfolio / sample work <ExternalLink size={13} />
                </a>
              )}
            </div>

            {/* Courses */}
            {trainer.courses.length > 0 && (
              <div style={{
                background: "white", borderRadius: 14, padding: "22px 24px",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <BookOpen size={15} color="var(--navy)" />
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>Courses by {trainer.name.split(" ")[0]}</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {trainer.courses.map(c => (
                    <div key={c.title} style={{
                      padding: "14px 16px", borderRadius: 10,
                      border: "1px solid var(--line)", background: "var(--surface)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--navy)" }}>{c.title}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                          <Star size={12} color="#F59E0B" fill="#F59E0B" />
                          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)" }}>{c.rating}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
                        <Users size={12} />
                        <span>{c.enrolled} enrolled</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div style={{
              background: "white", borderRadius: 14, padding: "22px 24px",
              border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>Reviews</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StarRow value={trainer.rating} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{trainer.rating}</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>({trainer.reviewCount})</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {trainer.reviews.map((r, i) => (
                  <div key={r.name + r.date} style={{
                    paddingBottom: i < trainer.reviews.length - 1 ? 20 : 0,
                    marginBottom: i < trainer.reviews.length - 1 ? 20 : 0,
                    borderBottom: i < trainer.reviews.length - 1 ? "1px solid var(--line)" : "none",
                  }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "var(--accent-light)", color: "var(--accent)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 600, flexShrink: 0,
                      }}>{r.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{r.name}</span>
                            <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 8 }}>{r.date}</span>
                          </div>
                          <StarRow value={r.rating} size={12} />
                        </div>
                        <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.65 }}>{r.text}</p>
                        {r.rating === 5 && (
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, padding: "3px 8px", background: "#D1FAE5", borderRadius: 20 }}>
                            <CheckCircle2 size={10} color="#059669" />
                            <span style={{ fontSize: 10, fontWeight: 500, color: "#059669" }}>Verified booking</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials / badges */}
            <div style={{
              background: "linear-gradient(135deg, var(--navy) 0%, #1a3a5c 100%)",
              borderRadius: 14, padding: "20px 24px",
              boxShadow: "0 4px 16px rgba(13,27,42,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Award size={15} color="rgba(255,255,255,0.5)" />
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>Platform verified</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Identity verified", "Credentials reviewed", "Demo session passed", "Background checked"].map(badge => (
                  <div key={badge} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={13} color="#4ADE80" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking widget (sticky) */}
          <div>
            <BookingWidget
              trainerName={trainer.name}
              trainerSlug={trainer.slug}
              rateKsh={trainer.rateKsh}
              rateUsd={trainer.rateUsd}
              availableSlots={trainer.availableSlots}
              userEmail={userEmail}
              learnerId={user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
}
