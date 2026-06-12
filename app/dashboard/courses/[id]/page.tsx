import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import { createClient } from "@/lib/supabase/server";
import CoursePlayerClient from "@/components/dashboard/CoursePlayerClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dbCourse = await getCourseById(id);
  if (!dbCourse) return { title: "Course Player | AI Trainer Academy" };
  return {
    title: `Learning: ${dbCourse.title} | AI Trainer Academy`,
  };
}

export default async function CoursePlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dbCourse = await getCourseById(id);

  if (!dbCourse) notFound();

  const course = mapCourseRowToCourse(dbCourse);

  // Get user info if authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || "";

  return (
    <CoursePlayerClient course={course} userEmail={userEmail} />
  );
}
