"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const STORAGE_BUCKET = "course-images";

// ─── Upload image to Supabase Storage ────────────────────────────────────────
// Returns the public URL of the uploaded image, or null if no file was given.
async function uploadCourseImage(
  db: ReturnType<typeof createAdminClient>,
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await db.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) {
    console.error("[uploadCourseImage] Storage error:", error.message);
    return null;
  }

  const { data: urlData } = db.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return urlData.publicUrl ?? null;
}

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
  long_description: string | null;
  trainer_initials: string | null;
  trainer_title: string | null;
  trainer_bio: string | null;
  price_usd: number;
  price_ksh: number;
  level: string | null;
  duration: string | null;
  tag: string | null;
  enrolled_count: number;
  rating: number;
  created_at: string;
  what_youll_learn: string[];
  prerequisites: string[];
  image_url: string | null;
  button_url: string | null;
};

// ─── List all courses ─────────────────────────────────────────────────────────
export async function getAdminCourseList(): Promise<AdminCourse[]> {
  await requireAdmin();
  const db = createAdminClient();
  const { data, error } = await db
    .from("courses")
    .select(
      "id, slug, title, trainer_name, description, long_description, trainer_initials, trainer_title, trainer_bio, price_usd, price_ksh, level, duration, tag, enrolled_count, rating, created_at, what_youll_learn, prerequisites, image_url, button_url"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAdminCourseList]", error.message);
    return [];
  }
  return (data ?? []) as AdminCourse[];
}

// ─── Get single course by ID (for edit page) ──────────────────────────────────
export async function getCourseById(id: string): Promise<AdminCourse | null> {
  await requireAdmin();
  const db = createAdminClient();
  const { data, error } = await db
    .from("courses")
    .select(
      "id, slug, title, trainer_name, description, long_description, trainer_initials, trainer_title, trainer_bio, price_usd, price_ksh, level, duration, tag, enrolled_count, rating, created_at, what_youll_learn, prerequisites, image_url, button_url"
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getCourseById]", error.message);
    return null;
  }
  return data as AdminCourse;
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
  const rating = parseFloat((formData.get("rating") as string) || "4.8");
  const enrolledCount = parseInt((formData.get("enrolled_count") as string) || "0", 10);

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
    "AI Agents": { color: "#0891B2", bg: "#ECFEFF" },
    "Data Science": { color: "#D97706", bg: "#FEF3C7" },
    "Machine Learning": { color: "#2563EB", bg: "#EFF6FF" },
    NLP: { color: "#4F46E5", bg: "#EEF2FF" },
    "Deep Learning": { color: "#9333EA", bg: "#F3E8FF" },
    Robotics: { color: "#E11D48", bg: "#FFF1F2" },
    "Generative AI": { color: "#059669", bg: "#ECFDF5" },
    Other: { color: "#4B5875", bg: "#F4F6FC" },
  };
  const tagStyle = TAG_COLORS[tag] ?? TAG_COLORS["Other"];

  // Handle featured image: upload new file if provided, otherwise use URL field fallback
  const imageFile = formData.get("image_file") as File | null;
  let imageUrl: string | null = (formData.get("image_url") as string)?.trim() || null;
  if (imageFile && imageFile.size > 0) {
    const uploaded = await uploadCourseImage(db, imageFile);
    if (uploaded) imageUrl = uploaded;
  }

  const buttonUrl = (formData.get("button_url") as string)?.trim() || null;

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
      rating: isNaN(rating) ? 4.8 : rating,
      enrolled_count: isNaN(enrolledCount) ? 0 : enrolledCount,
      what_youll_learn: whatYoullLearn,
      prerequisites,
      curriculum: [],
      image_url: imageUrl,
      button_url: buttonUrl,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  return { success: true, courseId: data.id };
}

// ─── Update course ────────────────────────────────────────────────────────────
export type UpdateCourseFormState =
  | { success: true; courseId: string }
  | { error: string }
  | undefined;

export async function updateCourse(
  _prev: UpdateCourseFormState,
  formData: FormData
): Promise<UpdateCourseFormState> {
  await requireAdmin();

  const id = formData.get("id") as string;
  if (!id) return { error: "Missing course ID" };

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
  const rating = parseFloat((formData.get("rating") as string) || "4.8");
  const enrolledCount = parseInt((formData.get("enrolled_count") as string) || "0", 10);
  const buttonUrl = (formData.get("button_url") as string)?.trim() || null;

  // Keep existing image unless a new file is uploaded
  const existingImageUrl = (formData.get("existing_image_url") as string)?.trim() || null;
  const imageFile = formData.get("image_file") as File | null;
  let imageUrl: string | null = existingImageUrl;
  const db = createAdminClient();
  if (imageFile && imageFile.size > 0) {
    const uploaded = await uploadCourseImage(db, imageFile);
    if (uploaded) imageUrl = uploaded;
  }

  const whatYoullLearn = ((formData.get("what_youll_learn") as string) || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const prerequisites = ((formData.get("prerequisites") as string) || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!title) return { error: "Course title is required" };
  if (!description) return { error: "Short description is required" };
  if (!trainerName) return { error: "Trainer name is required" };

  const TAG_COLORS: Record<string, { color: string; bg: string }> = {
    "Fine-tuning": { color: "#6366F1", bg: "#EEF2FF" },
    Prompting: { color: "#059669", bg: "#D1FAE5" },
    "RAG / Dev": { color: "#3B82F6", bg: "#DBEAFE" },
    "AI Safety": { color: "#7C3AED", bg: "#EDE9FE" },
    MLOps: { color: "#B45309", bg: "#FEF3C7" },
    "Computer Vision": { color: "#DC2626", bg: "#FEE2E2" },
    "AI Agents": { color: "#0891B2", bg: "#ECFEFF" },
    "Data Science": { color: "#D97706", bg: "#FEF3C7" },
    "Machine Learning": { color: "#2563EB", bg: "#EFF6FF" },
    NLP: { color: "#4F46E5", bg: "#EEF2FF" },
    "Deep Learning": { color: "#9333EA", bg: "#F3E8FF" },
    Robotics: { color: "#E11D48", bg: "#FFF1F2" },
    "Generative AI": { color: "#059669", bg: "#ECFDF5" },
    Other: { color: "#4B5875", bg: "#F4F6FC" },
  };
  const tagStyle = TAG_COLORS[tag] ?? TAG_COLORS["Other"];

  const { error } = await db
    .from("courses")
    .update({
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
      rating: isNaN(rating) ? 4.8 : rating,
      enrolled_count: isNaN(enrolledCount) ? 0 : enrolledCount,
      what_youll_learn: whatYoullLearn,
      prerequisites,
      image_url: imageUrl,
      button_url: buttonUrl,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/admin/courses/${id}/edit`);
  return { success: true, courseId: id };
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

// ─── Rate course ──────────────────────────────────────────────────────────────
export async function rateCourseAction(
  courseId: string,
  rating: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    if (rating < 1 || rating > 5) {
      return { success: false, error: "Rating must be between 1 and 5 stars." };
    }

    const db = createAdminClient();

    // 1. Verify if user is actually enrolled in the course
    const { data: enrollment } = await db
      .from("enrollments")
      .select("id")
      .eq("course_id", courseId)
      .eq("learner_id", user.id)
      .maybeSingle();

    if (!enrollment) {
      return { success: false, error: "You must be enrolled in this course to rate it." };
    }

    // 2. Check if a confirmed booking already exists for this course
    const { data: booking } = await db
      .from("bookings")
      .select("id, session_topic")
      .eq("course_id", courseId)
      .eq("learner_id", user.id)
      .eq("status", "confirmed")
      .maybeSingle();

    if (booking) {
      // Update the existing booking topic to append the rating
      const baseTopic = booking.session_topic?.split(" || ")[0] || "Course Purchase";
      const updatedTopic = `${baseTopic} || Rating:${rating}`;
      
      const { error } = await db
        .from("bookings")
        .update({ session_topic: updatedTopic })
        .eq("id", booking.id);

      if (error) return { success: false, error: error.message };
    } else {
      // Create a confirmed booking record to store the rating
      const { error } = await db.from("bookings").insert({
        learner_id: user.id,
        course_id: courseId,
        session_topic: `Course Purchase || Rating:${rating}`,
        status: "confirmed",
        payment_method: "free_or_manual",
      });

      if (error) return { success: false, error: error.message };
    }

    revalidatePath("/courses");
    revalidatePath("/dashboard/courses");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit rating." };
  }
}

/**
 * Update the completed lessons and progress percentage for a learner's enrollment.
 */
export async function updateEnrollmentProgress(
  courseId: string,
  completedLessons: string[],
  progressPct: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const db = createAdminClient();
    const { error } = await db
      .from("enrollments")
      .update({
        completed_lessons: completedLessons,
        progress_pct: progressPct,
      })
      .eq("course_id", courseId)
      .eq("learner_id", user.id);

    if (error) {
      console.error("[updateEnrollmentProgress] Error updating enrollment:", error.message);
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/courses");
    revalidatePath(`/dashboard/courses/${courseId}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update progress." };
  }
}

