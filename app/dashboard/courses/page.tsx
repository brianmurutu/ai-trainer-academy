import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDashboardData } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import LearnerCoursesClient from "./LearnerCoursesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses | AI Trainer Academy",
};

export const dynamic = "force-dynamic";

export default async function LearnerCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { enrollments } = await getDashboardData(user.id);

  const initialCourses = enrollments
    .map((e) => {
      if (!e.course) return null;
      const course = mapCourseRowToCourse(e.course);
      const totalLessons = course.curriculum.reduce((acc, sec) => acc + sec.lessons.length, 0) || 1;
      return {
        ...course,
        progress: e.progress_pct,
        completed: e.completed_lessons.length,
        total: totalLessons,
        lastAccessed: new Date(e.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  return <LearnerCoursesClient initialCourses={initialCourses} />;
}
