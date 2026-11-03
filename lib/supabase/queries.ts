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
  learners_helped?: number;
  linkedin_url?: string | null;
  github_url?: string | null;
  sample_work_url?: string | null;
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
  session_duration_hrs: number | null;
  created_at: string;
  trainers?: {
    full_name: string;
    tagline: string | null;
  } | null;
};

export type EnrollmentRow = {
  id: string;
  course_id: string;
  progress_pct: number;
  completed_lessons: string[];
  created_at: string;
  course: CourseRow | null;
};

export type JobRow = {
  id: string;
  platform_name: string;
  platform_slug: string;
  platform_url: string | null;
  typical_pay_min: number | null;
  typical_pay_max: number | null;
  currency: string;
  domain: string | null;
  job_type: string | null;
  roles_count: number;
  open_roles_count: number;
  chance_accepted_pct: number | null;
  description: string | null;
  image_url: string | null;
  apply_url: string | null;
  is_featured: boolean;
  created_at: string;
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
        "id, slug, full_name, tagline, country, specialities, rating, review_count, sessions_completed, hourly_rate_ksh, hourly_rate_usd, available, featured, bio, avatar_url, linkedin_url, github_url"
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
    const trainers = (data as any[]) ?? [];
    return trainers.map(t => ({
      ...t,
      learners_helped: 0,
      sample_work_url: null
    })) as TrainerRow[];
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
        "id, slug, full_name, tagline, country, specialities, rating, review_count, sessions_completed, hourly_rate_ksh, hourly_rate_usd, available, featured, bio, avatar_url, linkedin_url, github_url"
      )
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("[getTrainerBySlug] Supabase error:", error.message);
      return null;
    }
    if (!data) return null;
    return {
      ...(data as any),
      learners_helped: 0,
      sample_work_url: null
    } as TrainerRow;
  } catch (err) {
    console.error("[getTrainerBySlug] Unexpected error:", err);
    return null;
  }
}

// Helper to retrieve actual enrollments and rating reviews from the database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDynamicCourseStats(supabase: any) {
  // Query all enrollments to count them by course_id
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id");

  const enrollmentCounts: Record<string, number> = {};
  if (enrollments) {
    for (const e of enrollments) {
      enrollmentCounts[e.course_id] = (enrollmentCounts[e.course_id] || 0) + 1;
    }
  }

  // Query all confirmed bookings that are course ratings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("course_id, session_topic")
    .not("course_id", "is", null)
    .eq("status", "confirmed");

  const ratingSums: Record<string, number> = {};
  const ratingCounts: Record<string, number> = {};

  if (bookings) {
    for (const b of bookings) {
      const parts = b.session_topic?.split(" || ") || [];
      const ratingPart = parts.find((p: string) => p.startsWith("Rating:"));
      if (ratingPart) {
        const val = parseInt(ratingPart.split(":")[1], 10);
        if (!isNaN(val) && b.course_id) {
          ratingSums[b.course_id] = (ratingSums[b.course_id] || 0) + val;
          ratingCounts[b.course_id] = (ratingCounts[b.course_id] || 0) + 1;
        }
      }
    }
  }

  return { enrollmentCounts, ratingSums, ratingCounts };
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

    if (!data) return [];

    const { enrollmentCounts, ratingSums, ratingCounts } = await getDynamicCourseStats(supabase);

    return (data as CourseRow[]).map(c => {
      const dbEnrollments = enrollmentCounts[c.id] || 0;
      const dbRatingCount = ratingCounts[c.id] || 0;
      const dbRatingSum = ratingSums[c.id] || 0;

      const baseReviews = 50; 
      const currentRating = Number(c.rating || 0);
      const newRating = dbRatingCount > 0 
        ? ((currentRating * baseReviews) + dbRatingSum) / (baseReviews + dbRatingCount)
        : currentRating;

      return {
        ...c,
        enrolled_count: (c.enrolled_count || 0) + dbEnrollments,
        rating: Number(newRating.toFixed(1))
      };
    });
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

    if (!data) return null;

    const { enrollmentCounts, ratingSums, ratingCounts } = await getDynamicCourseStats(supabase);
    const dbEnrollments = enrollmentCounts[data.id] || 0;
    const dbRatingCount = ratingCounts[data.id] || 0;
    const dbRatingSum = ratingSums[data.id] || 0;

    const baseReviews = 50; 
    const currentRating = Number(data.rating || 0);
    const newRating = dbRatingCount > 0 
      ? ((currentRating * baseReviews) + dbRatingSum) / (baseReviews + dbRatingCount)
      : currentRating;

    return {
      ...data,
      enrolled_count: (data.enrolled_count || 0) + dbEnrollments,
      rating: Number(newRating.toFixed(1))
    };
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
      .select(`
        id,
        trainer_id,
        course_id,
        amount_ksh,
        amount_usd,
        status,
        session_date,
        session_topic,
        session_duration_hrs,
        created_at,
        trainers (
          full_name,
          tagline
        )
      `)
      .eq("learner_id", userId)
      .order("session_date", { ascending: true });

    if (bookErr) {
      console.error("[getDashboardData] bookings error:", bookErr.message);
    }

    const bookings: BookingRow[] = (bookingsRaw ?? []).map((row: any) => {
      const trainer = Array.isArray(row.trainers) ? row.trainers[0] : row.trainers;
      return {
        id: row.id,
        trainer_id: row.trainer_id,
        course_id: row.course_id,
        amount_ksh: row.amount_ksh,
        amount_usd: row.amount_usd,
        status: row.status,
        session_date: row.session_date,
        session_topic: row.session_topic,
        session_duration_hrs: row.session_duration_hrs ?? null,
        created_at: row.created_at,
        trainers: trainer ? {
          full_name: trainer.full_name,
          tagline: trainer.tagline ?? null,
        } : null,
      };
    });

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

export async function getTopJobs(platformSlug?: string, limit = 12): Promise<JobRow[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('platform_jobs')
      .select('*')
      .order('open_roles_count', { ascending: false })
      .limit(limit);
    if (platformSlug) query = query.eq('platform_slug', platformSlug);
    const { data, error } = await query;
    if (error) {
      console.error('[getTopJobs] Supabase error:', error.message);
      return [];
    }
    return (data as JobRow[]) ?? [];
  } catch (err) {
    console.error('[getTopJobs] Unexpected error:', err);
    return [];
  }
}

export async function getPlatforms(limit = 20): Promise<JobRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('platform_jobs')
      .select('*')
      .order('roles_count', { ascending: false })
      .limit(limit);
    if (error) {
      console.error('[getPlatforms] Supabase error:', error.message);
      return [];
    }
    return (data as JobRow[]) ?? [];
  } catch (err) {
    console.error('[getPlatforms] Unexpected error:', err);
    return [];
  }
}

