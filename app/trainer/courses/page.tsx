import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TrainerCoursesClient from "./TrainerCoursesClient";

export const dynamic = "force-dynamic";

export default async function TrainerCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  const fullName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Trainer";

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, enrolled_count, rating, tag")
    .eq("trainer_name", fullName)
    .order("id", { ascending: true });

  const mappedCourses = (courses || []).map(c => ({
    id: c.id,
    title: c.title,
    enrolled: c.enrolled_count || 0,
    rating: c.rating || 0,
    revenue: 0, // Placeholder
    tag: c.tag || "Course",
    status: "Live", // Placeholder until courses table has status
  }));

  return <TrainerCoursesClient initialCourses={mappedCourses} />;
}
