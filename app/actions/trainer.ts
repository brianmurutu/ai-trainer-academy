"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTrainerDashboardMetrics(trainerId: string | null, trainerName: string) {
  const empty = {
    earnings: { thisMonth: 0, lastMonth: 0, growth: 0, pendingPayout: 0, lifetimeEarnings: 0, currency: "KSH" },
    upcomingBookings: [] as any[],
    historyBookings: [] as any[],
    courses: [] as any[],
    learnersCount: 0,
    sessionsDone: 0,
    avgRating: 0,
  };

  try {
    const supabase = await createClient();
    
    // Fetch courses
    const { data: courses } = await supabase
      .from("courses")
      .select("id, title, enrolled_count, rating, tag")
      .eq("trainer_name", trainerName);

    const mappedCourses = (courses || []).map(c => ({
      id: c.id,
      title: c.title,
      enrolled: c.enrolled_count || 0,
      rating: c.rating || 0,
      lessons: 10, // fallback
      status: "published",
    }));

    if (!trainerId) {
      return { ...empty, courses: mappedCourses };
    }

    // Fetch bookings
    const adminDb = createAdminClient();
    const { data: bookings } = await adminDb
      .from("bookings")
      .select("*")
      .eq("trainer_id", trainerId)
      .order("session_date", { ascending: false });

    if (!bookings) return { ...empty, courses: mappedCourses };

    let lifetime = 0;
    let thisMonth = 0;
    let lastMonth = 0;
    let pending = 0;
    let sessionsDone = 0;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const upcomingBookings: any[] = [];
    const historyBookings: any[] = [];
    const uniqueLearners = new Set<string>();
    
    let totalRating = 0;
    let ratingCount = 0;

    for (const b of bookings) {
      const isConfirmedOrCompleted = b.status === "confirmed" || b.status === "completed";
      const isPending = b.status === "pending" || b.status === "starting_soon";
      
      const sessionDate = b.session_date ? new Date(b.session_date) : new Date(b.created_at);
      const amountKsh = Number(b.amount_ksh || 0);
      const trainerShare = Math.round(amountKsh * 0.8); // 80% split

      if (b.learner_id) uniqueLearners.add(b.learner_id);

      // Bookings categorization
      const [topicStr] = b.session_topic?.split(" || ") ?? [b.session_topic];
      const ratingMatch = b.session_topic?.match(/Rating:(\d+)/);
      if (ratingMatch) {
        totalRating += Number(ratingMatch[1]);
        ratingCount++;
      }

      if (sessionDate >= now && (isConfirmedOrCompleted || isPending)) {
        upcomingBookings.push({
          id: b.id,
          learnerName: "Learner",
          learnerInitials: "L",
          topic: topicStr || "Consultation",
          date: sessionDate.toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric" }),
          time: sessionDate.toLocaleTimeString("en-KE", { hour: "numeric", minute: "2-digit" }),
          status: b.status,
          amountKsh: trainerShare,
          rawDate: sessionDate,
        });
      } else if (isConfirmedOrCompleted && sessionDate < now) {
        sessionsDone++;
        historyBookings.push({
          id: b.id,
          learnerName: "Learner",
          topic: topicStr || "Consultation",
          date: sessionDate.toLocaleDateString("en-KE", { month: "short", day: "numeric" }),
          duration: `${b.session_duration_hrs || 1}h`,
          amountKsh: trainerShare,
          rating: ratingMatch ? Number(ratingMatch[1]) : 5,
        });
      }

      // Earnings calculation
      if (isConfirmedOrCompleted) {
        lifetime += trainerShare;
        if (sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear) {
          thisMonth += trainerShare;
        } else if (
          (sessionDate.getMonth() === currentMonth - 1 && sessionDate.getFullYear() === currentYear) ||
          (currentMonth === 0 && sessionDate.getMonth() === 11 && sessionDate.getFullYear() === currentYear - 1)
        ) {
          lastMonth += trainerShare;
        }
        
        pending += (trainerShare * 0.2); 
      }
    }

    // Attempt to fetch real learner names for upcoming/history
    for (const b of [...upcomingBookings, ...historyBookings]) {
      const origBooking = bookings.find(x => x.id === b.id);
      if (origBooking?.learner_id) {
        try {
          const { data: u } = await adminDb.auth.admin.getUserById(origBooking.learner_id);
          if (u?.user) {
            const name = u.user.user_metadata?.full_name || u.user.email?.split("@")[0] || "Learner";
            b.learnerName = name;
            if ('learnerInitials' in b) {
              b.learnerInitials = name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();
            }
          }
        } catch (e) {}
      }
    }

    upcomingBookings.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
    
    // Sort upcoming and slice
    const upcomingSlice = upcomingBookings.slice(0, 5);
    const historySlice = historyBookings.slice(0, 5);

    let growth = 0;
    if (lastMonth > 0) {
      growth = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
    }

    return {
      earnings: {
        thisMonth,
        lastMonth,
        growth,
        pendingPayout: Math.round(thisMonth * 0.4), // Mock logic for pending payout
        lifetimeEarnings: lifetime,
        currency: "KSH"
      },
      upcomingBookings: upcomingSlice,
      historyBookings: historySlice,
      courses: mappedCourses,
      learnersCount: uniqueLearners.size,
      sessionsDone,
      avgRating: ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0,
    };
  } catch (err) {
    console.error("[getTrainerDashboardMetrics]", err);
    return empty;
  }
}

export async function updateTrainerProfile(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const { data: trainer } = await supabase
      .from("trainers")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!trainer) {
      return { error: "Trainer profile not found" };
    }

    const updates: Record<string, any> = {};
    const tagline = formData.get("tagline");
    if (tagline !== null) updates.tagline = tagline;
    
    const bio = formData.get("bio");
    if (bio !== null) updates.bio = bio;

    const hourlyRateKsh = formData.get("hourly_rate_ksh");
    if (hourlyRateKsh !== null) updates.hourly_rate_ksh = Number(hourlyRateKsh);
    
    const linkedinUrl = formData.get("linkedin_url");
    if (linkedinUrl !== null) updates.linkedin_url = linkedinUrl;

    const githubUrl = formData.get("github_url");
    if (githubUrl !== null) updates.github_url = githubUrl;

    const adminDb = createAdminClient();
    const { error } = await adminDb
      .from("trainers")
      .update(updates)
      .eq("id", trainer.id);

    if (error) return { error: error.message };

    revalidatePath("/trainer/settings");
    revalidatePath("/trainer/profile");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
