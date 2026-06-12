import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/courses/enroll
 * Enroll the logged-in user in a free course.
 * Body: { courseId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please log in to enroll." }, { status: 401 });
    }

    const { courseId } = await request.json();
    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId." }, { status: 400 });
    }

    const db = createAdminClient();

    // Verify the course is actually free
    const { data: course, error: courseErr } = await db
      .from("courses")
      .select("id, price_ksh, price_usd, title")
      .eq("id", courseId)
      .maybeSingle();

    if (courseErr || !course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    if ((course.price_ksh ?? 0) > 0) {
      return NextResponse.json(
        { error: "This course requires payment. Please choose a payment method." },
        { status: 400 }
      );
    }

    // Upsert enrollment so re-clicking doesn't error
    const { error: enrollErr } = await db
      .from("enrollments")
      .upsert(
        {
          user_id: user.id,
          course_id: courseId,
          progress_pct: 0,
          completed_lessons: [],
        },
        { onConflict: "user_id,course_id" }
      );

    if (enrollErr) {
      console.error("[enroll] upsert error:", enrollErr.message);
      return NextResponse.json({ error: enrollErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, courseId });
  } catch (err) {
    console.error("[enroll] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
