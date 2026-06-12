"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// ─── Guard ────────────────────────────────────────────────────────────────────
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || (user.user_metadata?.role as string) !== "admin") {
    redirect("/login");
  }
  return user;
}

// ─── Types ────────────────────────────────────────────────────────────────────
export type CourseFormState =
  | { success: true; courseId: string }
  | { error: string }
  | undefined;

export type AdminCourse = {
  id: string;
  slug: string;
  title: string;
  trainer_name: string | null;
  description: string | null;
  price_usd: number;
  price_ksh: number;
  level: string | null;
  tag: string | null;
  enrolled_count: number;
  rating: number;
  created_at: string;
};

// ─── List all courses ─────────────────────────────────────────────────────────
export async function getAdminCourseList(): Promise<AdminCourse[]> {
  await requireAdmin();
  const db = createAdminClient();
  const { data, error } = await db
    .from("courses")
    .select(
      "id, slug, title, trainer_name, description, price_usd, price_ksh, level, tag, enrolled_count, rating, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAdminCourseList]", error.message);
    return [];
  }
  return (data ?? []) as AdminCourse[];
}

// ─── Create course ────────────────────────────────────────────────────────────
export async function createCourse(
  _prev: CourseFormState,
  formData: FormData
): Promise<CourseFormState> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const longDescription = (formData.get("long_description") as string)?.trim();
  const trainerName = (formData.get("trainer_name") as string)?.trim();
  const trainerInitials = (formData.get("trainer_initials") as string)?.trim();
  const trainerTitle = (formData.get("trainer_title") as string)?.trim();
  const trainerBio = (formData.get("trainer_bio") as string)?.trim();
  const level = (formData.get("level") as string)?.trim();
  const duration = (formData.get("duration") as string)?.trim();
  const tag = (formData.get("tag") as string)?.trim();
  const priceUsd = parseFloat((formData.get("price_usd") as string) || "0");
  const priceKsh = parseFloat((formData.get("price_ksh") as string) || "0");

  // Multi-value fields (newline separated)
  const whatYoullLearn = (formData.get("what_youll_learn") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const prerequisites = (formData.get("prerequisites") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!title) return { error: "Course title is required" };
  if (!description) return { error: "Short description is required" };
  if (!trainerName) return { error: "Trainer name is required" };

  // Auto-generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const db = createAdminClient();

  // Check slug uniqueness
  const { data: existing } = await db
    .from("courses")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  // Tag colour map
  const TAG_COLORS: Record<string, { color: string; bg: string }> = {
    "Fine-tuning": { color: "#6366F1", bg: "#EEF2FF" },
    Prompting: { color: "#059669", bg: "#D1FAE5" },
    "RAG / Dev": { color: "#3B82F6", bg: "#DBEAFE" },
    "AI Safety": { color: "#7C3AED", bg: "#EDE9FE" },
    MLOps: { color: "#B45309", bg: "#FEF3C7" },
    "Computer Vision": { color: "#DC2626", bg: "#FEE2E2" },
    Other: { color: "#4B5875", bg: "#F4F6FC" },
  };
  const tagStyle = TAG_COLORS[tag] ?? TAG_COLORS["Other"];

  const { data, error } = await db
    .from("courses")
    .insert({
      slug: finalSlug,
      title,
      description,
      long_description: longDescription || null,
      trainer_name: trainerName || null,
      trainer_initials: trainerInitials || trainerName.split(" ").map((n) => n[0]).slice(0, 2).join(""),
      trainer_title: trainerTitle || null,
      trainer_bio: trainerBio || null,
      level: level || null,
      duration: duration || null,
      tag: tag || null,
      tag_color: tagStyle.color,
      tag_bg: tagStyle.bg,
      price_usd: priceUsd,
      price_ksh: priceKsh,
      what_youll_learn: whatYoullLearn,
      prerequisites,
      curriculum: [],
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  return { success: true, courseId: data.id };
}

// ─── Delete course ────────────────────────────────────────────────────────────
export async function deleteCourse(
  _prev: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return { error: "Missing course ID" };

  const db = createAdminClient();
  const { error } = await db.from("courses").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  return { success: true };
}
