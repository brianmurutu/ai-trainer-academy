import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/courses-data";
import { createClient } from "@/lib/supabase/server";
import CoursePlayerClient from "@/components/dashboard/CoursePlayerClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) return { title: "Course Player — AI Trainer Academy" };
  return {
    title: `Learning: ${course.title} — AI Trainer Academy`,
  };
}

export default async function CoursePlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) notFound();

  // Get user info if authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || "";

  return (
    <CoursePlayerClient course={course} userEmail={userEmail} />
  );
}
