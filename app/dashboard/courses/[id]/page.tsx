import { notFound, redirect } from "next/navigation";
import { getCourseById, getCourseBySlug } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import { createClient } from "@/lib/supabase/server";
import CoursePlayerClient from "@/components/dashboard/CoursePlayerClient";
import type { Metadata } from "next";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function getCourse(idOrSlug: string) {
  const isUuid = UUID_REGEX.test(idOrSlug);
  if (isUuid) {
    return await getCourseById(idOrSlug);
  } else {
    return await getCourseBySlug(idOrSlug);
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dbCourse = await getCourse(id);
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
  const dbCourse = await getCourse(id);

  if (!dbCourse) notFound();

  const course = mapCourseRowToCourse(dbCourse);

  // Get user info if authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const userEmail = user.email || "";

  // Fetch enrollment data to get progress and completed lessons using the correct course UUID
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("completed_lessons")
    .eq("course_id", dbCourse.id)
    .eq("learner_id", user.id)
    .maybeSingle();

  const initialCompletedLessons = enrollment?.completed_lessons ?? [];

  return (
    <CoursePlayerClient 
      course={course} 
      userEmail={userEmail} 
      initialCompletedLessons={initialCompletedLessons}
    />
  );
}

