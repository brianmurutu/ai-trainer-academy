import { getCourseRows } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import CoursesClient from "./CoursesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Courses | AI Trainer Academy",
  description: "Explore verified AI training programs across all domains, from prompt engineering and AI agents to machine learning, NLP, and custom model architectures.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const dbCourses = await getCourseRows();
  const courses = dbCourses.map(mapCourseRowToCourse);

  return <CoursesClient initialCourses={courses} />;
}
