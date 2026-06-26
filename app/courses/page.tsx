import { getCourseRows } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import CoursesClient from "./CoursesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Training Courses | Learn AI Model Training & Data Annotation Online",
  description:
    "Browse AI training courses covering data annotation, AI model training, RLHF, prompt engineering, LLM fine-tuning, and RAG systems. Self-paced and live 1-on-1 formats available.",
  keywords: "AI training courses, AI academy courses, data annotation course, AI model training online, RLHF course, fine-tuning course, prompt engineering training",
  alternates: { canonical: "https://ai-trainer-academy.top/courses" },
  openGraph: {
    title: "AI Training Courses | AI Trainer Academy",
    description: "AI training courses on data annotation, RLHF, fine-tuning, prompt engineering, and AI model training. Start learning today.",
    url: "https://ai-trainer-academy.top/courses",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const dbCourses = await getCourseRows();
  const courses = dbCourses.map(mapCourseRowToCourse);

  return <CoursesClient initialCourses={courses} />;
}
