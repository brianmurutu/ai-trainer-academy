import type { CourseRow } from "@/lib/supabase/queries";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  isVideo?: boolean;
};

export type Section = {
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  trainer: string;
  trainerInitials: string;
  trainerTitle: string;
  trainerBio: string;
  trainerAvatar?: string;
  description: string;
  longDescription: string;
  priceUsd: number;
  priceKsh: number;
  rating: number;
  enrolledCount: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  whatYoullLearn: string[];
  prerequisites: string[];
  curriculum: Section[];
  image_url?: string;
  button_url?: string;
};

export const COURSES: Course[] = [];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find(c => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(c => c.id === id);
}

export function mapCourseRowToCourse(row: CourseRow): Course {
  let parsedCurriculum: Section[] = [];
  if (row.curriculum) {
    if (typeof row.curriculum === "string") {
      try {
        parsedCurriculum = JSON.parse(row.curriculum);
      } catch (e) {
        console.error("Failed to parse curriculum string", e);
      }
    } else if (Array.isArray(row.curriculum)) {
      parsedCurriculum = row.curriculum as Section[];
    } else if (typeof row.curriculum === "object") {
      parsedCurriculum = [row.curriculum] as unknown as Section[];
    }
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    trainer: row.trainer_name || "",
    trainerInitials: row.trainer_initials || "TR",
    trainerTitle: row.trainer_title || "",
    trainerBio: row.trainer_bio || "",
    description: row.description || "",
    longDescription: row.long_description || "",
    priceUsd: row.price_usd || 0,
    priceKsh: row.price_ksh || 0,
    rating: row.rating || 0,
    enrolledCount: row.enrolled_count || 0,
    level: (row.level as Course["level"]) || "Intermediate",
    duration: row.duration || "",
    tag: row.tag || "",
    tagColor: row.tag_color || "#4B5875",
    tagBg: row.tag_bg || "#F4F6FC",
    whatYoullLearn: row.what_youll_learn || [],
    prerequisites: row.prerequisites || [],
    curriculum: parsedCurriculum,
    image_url: row.image_url || undefined,
    button_url: row.button_url || undefined,
  };
}
