import { getCourseRows } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import CoursesClient from "./CoursesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | AI Trainer Academy",
  description: "Browse verified training programs in LLM fine-tuning, parameter optimization, prompt engineering, and production MLOps led by active practitioners.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const dbCourses = await getCourseRows();
  const courses = dbCourses.map(mapCourseRowToCourse);

  return <CoursesClient initialCourses={courses} />;
}
