/**
 * lib/supabase/queries.ts
 *
 * Typed server-side query helpers.  All functions use the SSR-aware
 * Supabase client and gracefully return [] or null on any error —
 * they never throw so callers can always render a fallback UI.
 */

import { createClient } from "@/lib/supabase/server";

// ============================================================
// Row types
// ============================================================

export type TrainerRow = {
  id: string;
  slug: string;
  full_name: string;
  tagline: string | null;
  country: string | null;
  specialities: string[];
  rating: number;
  review_count: number;
  sessions_completed: number;
  hourly_rate_ksh: number;
  hourly_rate_usd: number;
  available: boolean;
  featured: boolean;
  bio: string | null;
  avatar_url: string | null;
};

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  trainer_name: string | null;
  trainer_initials: string | null;
  trainer_title: string | null;
  trainer_bio: string | null;
  description: string | null;
  long_description: string | null;
  price_usd: number;
  price_ksh: number;
  rating: number;
  enrolled_count: number;
  level: string | null;
  duration: string | null;
  tag: string | null;
  tag_color: string | null;
  tag_bg: string | null;
  what_youll_learn: string[];
  prerequisites: string[];
  curriculum: unknown;
  image_url: string | null;
  button_url: string | null;
};

export type BookingRow = {
  id: string;
  trainer_id: string | null;
  course_id: string | null;
  amount_ksh: number;
  amount_usd: number;
  status: string;
  session_date: string | null;
  session_topic: string | null;
  created_at: string;
};

export type EnrollmentRow = {
  id: string;
  course_id: string;
  progress_pct: number;
  completed_lessons: string[];
  created_at: string;
  course: CourseRow | null;
};

// ============================================================
// getTrainers
// ============================================================

export async function getTrainers(
  filters: { available?: boolean; featured?: boolean } = {}
): Promise<TrainerRow[]> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("trainers")
      .select(
        "id, slug, full_name, tagline, country, specialities, rating, review_count, sessions_completed, hourly_rate_ksh, hourly_rate_usd, available, featured, bio, avatar_url"
      )
      .order("rating", { ascending: false });

    if (filters.available !== undefined) {
      query = query.eq("available", filters.available);
    }
    if (filters.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[getTrainers] Supabase error:", error.message);
      return [];
    }
    return (data as TrainerRow[]) ?? [];
  } catch (err) {
    console.error("[getTrainers] Unexpected error:", err);
    return [];
  }
}

// ============================================================
// getTrainerBySlug
// ============================================================

export async function getTrainerBySlug(slug: string): Promise<TrainerRow | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("trainers")
      .select(
        "id, slug, full_name, tagline, country, specialities, rating, review_count, sessions_completed, hourly_rate_ksh, hourly_rate_usd, available, featured, bio, avatar_url"
      )
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("[getTrainerBySlug] Supabase error:", error.message);
      return null;
    }
    return (data as TrainerRow) ?? null;
  } catch (err) {
    console.error("[getTrainerBySlug] Unexpected error:", err);
    return null;
  }
}

// ============================================================
// getCourseRows
// ============================================================

export async function getCourseRows(
  filters: { tag?: string; level?: string } = {}
): Promise<CourseRow[]> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("courses")
      .select(
        "id, slug, title, trainer_name, trainer_initials, trainer_title, trainer_bio, description, long_description, price_usd, price_ksh, rating, enrolled_count, level, duration, tag, tag_color, tag_bg, what_youll_learn, prerequisites, curriculum, image_url, button_url"
      )
      .order("rating", { ascending: false });

    if (filters.tag) {
      query = query.ilike("tag", `%${filters.tag}%`);
    }
    if (filters.level) {
      query = query.eq("level", filters.level);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[getCourseRows] Supabase error:", error.message);
      return [];
    }
    return (data as CourseRow[]) ?? [];
  } catch (err) {
    console.error("[getCourseRows] Unexpected error:", err);
    return [];
  }
}

// ============================================================
// getCourseBySlug
// ============================================================

export async function getCourseBySlug(slug: string): Promise<CourseRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select(
        "id, slug, title, trainer_name, trainer_initials, trainer_title, trainer_bio, description, long_description, price_usd, price_ksh, rating, enrolled_count, level, duration, tag, tag_color, tag_bg, what_youll_learn, prerequisites, curriculum, image_url, button_url"
      )
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("[getCourseBySlug] Supabase error:", error.message);
      return null;
    }
    return (data as CourseRow) ?? null;
  } catch (err) {
    console.error("[getCourseBySlug] Unexpected error:", err);
    return null;
  }
}

// ============================================================
// getDashboardData
// ============================================================

export async function getDashboardData(userId: string): Promise<{
  enrollments: EnrollmentRow[];
  bookings: BookingRow[];
  certificates: EnrollmentRow[];
}> {
  const empty = { enrollments: [], bookings: [], certificates: [] };

  if (!userId) return empty;

  try {
    const supabase = await createClient();

    // Enrollments with nested course data
    const { data: enrollmentsRaw, error: enrollErr } = await supabase
      .from("enrollments")
      .select(
        `id, course_id, progress_pct, completed_lessons, created_at,
         course:courses(
           id, slug, title, trainer_name, trainer_initials, trainer_title, trainer_bio,
           description, long_description, price_usd, price_ksh,
           rating, enrolled_count, level, duration,
           tag, tag_color, tag_bg, what_youll_learn, prerequisites, curriculum, image_url, button_url
         )`
      )
      .eq("learner_id", userId)
      .order("created_at", { ascending: false });

    if (enrollErr) {
      console.error("[getDashboardData] enrollments error:", enrollErr.message);
    }

    const enrollments: EnrollmentRow[] = (enrollmentsRaw ?? []).map((row) => ({
      id: row.id as string,
      course_id: row.course_id as string,
      progress_pct: row.progress_pct as number,
      completed_lessons: (row.completed_lessons as string[]) ?? [],
      created_at: row.created_at as string,
      course: row.course as unknown as CourseRow | null,
    }));

    // Certificates = enrollments completed (progress_pct === 100)
    const certificates = enrollments.filter((e) => e.progress_pct === 100);

    // Bookings
    const { data: bookingsRaw, error: bookErr } = await supabase
      .from("bookings")
      .select(
        "id, trainer_id, course_id, amount_ksh, amount_usd, status, session_date, session_topic, created_at"
      )
      .eq("learner_id", userId)
      .order("session_date", { ascending: true });

    if (bookErr) {
      console.error("[getDashboardData] bookings error:", bookErr.message);
    }

    const bookings: BookingRow[] = (bookingsRaw ?? []) as BookingRow[];

    return { enrollments, bookings, certificates };
  } catch (err) {
    console.error("[getDashboardData] Unexpected error:", err);
    return empty;
  }
}

export async function getCourseById(id: string): Promise<CourseRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select(
        "id, slug, title, trainer_name, trainer_initials, trainer_title, trainer_bio, description, long_description, price_usd, price_ksh, rating, enrolled_count, level, duration, tag, tag_color, tag_bg, what_youll_learn, prerequisites, curriculum, image_url, button_url"
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("[getCourseById] Supabase error:", error.message);
      return null;
    }
    return (data as CourseRow) ?? null;
  } catch (err) {
    console.error("[getCourseById] Unexpected error:", err);
    return null;
  }
}

