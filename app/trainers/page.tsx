import { getTrainers, type TrainerRow } from "@/lib/supabase/queries";
import TrainersClientPage from "./TrainersClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find an AI Trainer | Verified AI Training Experts & Data Annotation Specialists",
  description:
    "Browse verified AI trainers specialising in AI model training, data annotation, RLHF, LLM fine-tuning, prompt engineering, RAG systems, and AI safety. Book 1-on-1 sessions and pay via M-Pesa, card, or crypto.",
  keywords: "AI trainer, AI training expert, find AI trainer, data annotation trainer, RLHF trainer, fine-tuning expert, AI model training specialist",
  alternates: { canonical: "https://ai-trainer-academy.top/trainers" },
  openGraph: {
    title: "Find an AI Trainer | AI Trainer Academy",
    description: "Browse verified AI trainers for data annotation, RLHF, fine-tuning, and AI model training. Book sessions online.",
    url: "https://ai-trainer-academy.top/trainers",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// Fallback hardcoded list so the page always shows content
// even before Supabase is seeded.
const FALLBACK_TRAINERS: TrainerRow[] = [
  {
    id: "1",
    slug: "dr-amara-osei",
    full_name: "Dr. Amara Osei",
    tagline: "LLM Fine-tuning Specialist - PhD in ML from UCT",
    country: "Ghana",
    specialities: ["Fine-tuning", "LoRA / QLoRA", "RLHF", "Dataset Curation"],
    rating: 4.9,
    review_count: 143,
    sessions_completed: 328,
    hourly_rate_ksh: 3500,
    hourly_rate_usd: 26.92,
    available: true,
    featured: true,
    bio: null,
    avatar_url: null,
  },
  {
    id: "2",
    slug: "naledi-dlamini",
    full_name: "Naledi Dlamini",
    tagline: "AI Safety Researcher and RLHF Engineer",
    country: "South Africa",
    specialities: ["AI Safety", "RLHF", "Model Evaluation", "Multimodal"],
    rating: 4.9,
    review_count: 98,
    sessions_completed: 189,
    hourly_rate_ksh: 4200,
    hourly_rate_usd: 32.31,
    available: true,
    featured: true,
    bio: null,
    avatar_url: null,
  },
  {
    id: "3",
    slug: "james-kariuki",
    full_name: "James Kariuki",
    tagline: "RAG Systems and Vector Database Architect",
    country: "Kenya",
    specialities: ["RAG Systems", "Vector DBs", "LangChain", "Production ML"],
    rating: 4.8,
    review_count: 76,
    sessions_completed: 214,
    hourly_rate_ksh: 3000,
    hourly_rate_usd: 23.08,
    available: true,
    featured: false,
    bio: null,
    avatar_url: null,
  },
  {
    id: "4",
    slug: "sana-malik",
    full_name: "Sana Malik",
    tagline: "Prompt Engineer and LLM Application Developer",
    country: "Nigeria",
    specialities: ["Prompt Engineering", "LLM APIs", "Agents and Tools", "OpenAI"],
    rating: 4.8,
    review_count: 112,
    sessions_completed: 301,
    hourly_rate_ksh: 2500,
    hourly_rate_usd: 19.23,
    available: false,
    featured: false,
    bio: null,
    avatar_url: null,
  },
  {
    id: "5",
    slug: "tafadzwa-moyo",
    full_name: "Tafadzwa Moyo",
    tagline: "Computer Vision and Multimodal ML Expert",
    country: "Zimbabwe",
    specialities: ["Computer Vision", "Diffusion Models", "Vision-Language", "PyTorch"],
    rating: 4.7,
    review_count: 54,
    sessions_completed: 143,
    hourly_rate_ksh: 3200,
    hourly_rate_usd: 24.62,
    available: true,
    featured: false,
    bio: null,
    avatar_url: null,
  },
  {
    id: "6",
    slug: "chioma-eze",
    full_name: "Chioma Eze",
    tagline: "MLOps and Production AI Infrastructure",
    country: "Nigeria",
    specialities: ["MLOps", "Model Deployment", "Kubernetes", "Monitoring"],
    rating: 4.8,
    review_count: 67,
    sessions_completed: 178,
    hourly_rate_ksh: 2800,
    hourly_rate_usd: 21.54,
    available: true,
    featured: false,
    bio: null,
    avatar_url: null,
  },
];

export default async function TrainersPage() {
  // Fetch from Supabase; fall back to static list if the table is empty
  const dbTrainers = await getTrainers();
  const trainers = dbTrainers.length > 0 ? dbTrainers : FALLBACK_TRAINERS;

  return <TrainersClientPage trainers={trainers} />;
}
