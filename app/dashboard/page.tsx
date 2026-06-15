import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getDashboardData } from "@/lib/supabase/queries";
import CourseCard, { type CourseCardData } from "@/components/dashboard/CourseCard";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import {
  BookOpen,
  Clock,
  Award,
  CalendarDays,
  TrendingUp,
  Play,
  CheckCircle2,
  ChevronRight,
  Star,
  Video,
  FileText,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | AI Trainer Academy",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const COLORS = ["#6366F1", "#EC4899", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6"];
function getTrainerColor(name: string): string {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return COLORS[sum % COLORS.length];
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-KE", { month: "short", day: "numeric" });
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  label, value, sub, Icon, iconColor, iconBg,
}: {
  label: string; value: string | number; sub: string;
  Icon: React.ElementType; iconColor: string; iconBg: string;
}) {
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "20px 22px",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      display: "flex", alignItems: "flex-start", gap: 14,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: iconBg, display: "flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={19} color={iconColor} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", marginTop: 4 }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function SessionRow({ session }: { session: any }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 0",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        background: session.trainerColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0,
      }}>{session.trainerInitials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)", marginBottom: 2 }}>{session.title}</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
          {session.trainer} · {session.date} · {session.time}
        </div>
      </div>
      {session.meetingUrl ? (
        <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer" style={{
          padding: "5px 12px",
          background: "var(--green)", color: "white",
          borderRadius: 7, fontSize: 12, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>Join Call</a>
      ) : session.status === "pending" ? (
        <div style={{ fontSize: 11, color: "#D97706", whiteSpace: "nowrap", padding: "4px 10px", background: "#FEF3C7", borderRadius: 6, fontWeight: 500 }}>
          Pending
        </div>
      ) : (
        <div style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap", padding: "4px 10px", background: "#F5F7FA", borderRadius: 6 }}>
          Confirmed
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty-state CTA — shown when there is genuinely no data at all
// ---------------------------------------------------------------------------
function GetStartedCTA() {
  return (
    <div style={{
      background: "white", borderRadius: 16, padding: "48px 32px",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      textAlign: "center", marginBottom: 24,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: "#EEF2FF", display: "flex",
        alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
      }}>
        <BookOpen size={26} color="#6366F1" />
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>
        Start your learning journey
      </h2>
      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
        Browse our courses or book a 1-on-1 session with a verified AI trainer to get started.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/courses" style={{
          padding: "10px 22px", borderRadius: 9, background: "var(--navy)",
          color: "white", textDecoration: "none", fontSize: 14, fontWeight: 500,
        }}>
          Browse courses
        </Link>
        <Link href="/trainers" style={{
          padding: "10px 22px", borderRadius: 9, border: "1px solid var(--line)",
          color: "var(--navy)", textDecoration: "none", fontSize: 14, fontWeight: 400,
        }}>
          Find a trainer
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const fullName: string =
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] || "there";
  const firstName = fullName.split(" ")[0];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Fetch real data from Supabase
  const { enrollments, bookings, certificates } = await getDashboardData(user.id);

  const hasRealEnrollments = enrollments.length > 0;
  const hasRealBookings = bookings.length > 0;
  const hasRealCertificates = certificates.length > 0;
  const hasAnyRealData = hasRealEnrollments || hasRealBookings || hasRealCertificates;

  // Build CourseCardData from real enrollments
  const displayCourses: CourseCardData[] = enrollments
    .map((e) => {
      if (!e.course) return null;
      return {
        id: e.course_id,
        title: e.course.title ?? "Untitled Course",
        trainer: e.course.trainer_name ?? "",
        trainerInitials: e.course.trainer_initials ?? "??",
        progress: e.progress_pct,
        totalLessons: Array.isArray(e.course.curriculum) ? (e.course.curriculum as unknown[]).length : 0,
        completedLessons: e.completed_lessons.length,
        tag: e.course.tag ?? "",
        tagColor: e.course.tag_color ?? "#6366F1",
        tagBg: e.course.tag_bg ?? "#EEF2FF",
        lastAccessed: new Date(e.created_at).toLocaleDateString("en-KE", { month: "short", day: "numeric" }),
      };
    })
    .filter((c): c is CourseCardData => c !== null);

  // Build sessions from real bookings
  const displaySessions = bookings.map((b: any) => {
    const trainerName = b.trainers?.full_name || "Trainer";
    const initials = trainerName.split(" ").map((n: string) => n[0]).slice(0, 2).join("");
    const [topic, meetingUrl] = b.session_topic?.split(" || ") ?? [b.session_topic, null];

    return {
      id: b.id,
      title: topic || "1-on-1 Consultation",
      trainer: trainerName,
      trainerInitials: initials,
      trainerColor: getTrainerColor(trainerName),
      date: b.session_date
        ? new Date(b.session_date).toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric" })
        : "TBD",
      time: b.session_date
        ? new Date(b.session_date).toLocaleTimeString("en-KE", { hour: "numeric", minute: "2-digit" }) + " EAT"
        : "",
      status: b.status,
      meetingUrl: meetingUrl || null,
    };
  });

  // Build certificates from real data
  const displayCertificates = certificates.map((c) => ({
    id: c.id,
    title: c.course?.title ?? "Course Certificate",
    issuedDate: c.created_at
      ? new Date(c.created_at).toLocaleDateString("en-KE", { month: "long", day: "numeric", year: "numeric" })
      : "Recently",
    credentialId: `ATA-${c.course_id.slice(0, 6).toUpperCase()}`,
    color: c.course?.tag_color ?? "#6366F1",
    bg: c.course?.tag_bg ?? "#EEF2FF",
  }));

  // Calculate dynamic stats
  const calculatedHours = enrollments.reduce((sum, e) => {
    const duration = parseFloat(e.course?.duration || "0");
    return sum + (duration * (e.progress_pct / 100));
  }, 0) + bookings.filter(b => b.status === "confirmed" || b.status === "completed").reduce((sum, b) => sum + (b.session_duration_hrs || 1), 0);
  const totalHours = Math.round(calculatedHours);

  const activeCourses = displayCourses.filter(c => c.progress > 0 && c.progress < 100).length;

  const upcomingSessionsCount = bookings.filter(b => 
    (b.status === "confirmed" || b.status === "pending") && 
    b.session_date && 
    new Date(b.session_date).getTime() > Date.now()
  ).length;

  // Calculate weekly progress
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyCalculatedHours = enrollments.reduce((sum, e) => {
    const duration = parseFloat(e.course?.duration || "0");
    const progressHours = duration * (e.progress_pct / 100);
    const enrolledDate = new Date(e.created_at);
    if (enrolledDate >= oneWeekAgo) {
      return sum + progressHours;
    } else {
      const ageDays = (Date.now() - enrolledDate.getTime()) / (24 * 60 * 60 * 1000);
      return sum + (progressHours / Math.max(1, ageDays / 7));
    }
  }, 0) + bookings.filter(b => (b.status === "confirmed" || b.status === "completed") && b.session_date && new Date(b.session_date) >= oneWeekAgo).reduce((sum, b) => sum + (b.session_duration_hrs || 1), 0);

  const weeklyHours = Math.max(0, Math.round(weeklyCalculatedHours * 10) / 10);
  const weeklyHoursWhole = Math.floor(weeklyHours);
  const weeklyMinutes = Math.round((weeklyHours % 1) * 60);
  const weeklyProgressStr = `${weeklyHoursWhole}h ${weeklyMinutes}m`;
  const goalHours = 8;
  const goalPct = Math.min(100, Math.round((weeklyHours / goalHours) * 100));

  // Build real activities dynamically
  const activities: any[] = [];
  enrollments.forEach(e => {
    const enrolledDate = new Date(e.created_at);
    activities.push({
      id: `act-enroll-${e.id}`,
      text: `Enrolled in: ${e.course?.title ?? "Course"}`,
      time: getRelativeTime(enrolledDate),
      Icon: Play,
      color: e.course?.tag_color ?? "#6366F1",
      timestamp: enrolledDate.getTime(),
    });

    if (e.progress_pct === 100) {
      activities.push({
        id: `act-cert-${e.id}`,
        text: `Completed: ${e.course?.title ?? "Course"} (Earned Certificate)`,
        time: getRelativeTime(enrolledDate),
        Icon: Award,
        color: "#D97706",
        timestamp: enrolledDate.getTime() + 1000,
      });
    } else if (e.progress_pct > 0) {
      activities.push({
        id: `act-prog-${e.id}`,
        text: `Progressed in: ${e.course?.title ?? "Course"} (${e.progress_pct}%)`,
        time: getRelativeTime(enrolledDate),
        Icon: CheckCircle2,
        color: "#059669",
        timestamp: enrolledDate.getTime() + 500,
      });
    }
  });

  bookings.forEach(b => {
    const bookingDate = new Date(b.created_at);
    const statusLabel = b.status === "confirmed" ? "Confirmed" : b.status === "completed" ? "Completed" : b.status === "pending" ? "Booked" : "Cancelled";
    const trainerName = b.trainers?.full_name || "Trainer";
    const topicStr = b.session_topic?.split(" || ")[0] || "Consultation Call";
    activities.push({
      id: `act-booking-${b.id}`,
      text: `${statusLabel}: ${topicStr} with ${trainerName}`,
      time: getRelativeTime(bookingDate),
      Icon: Video,
      color: b.status === "confirmed" ? "#059669" : b.status === "cancelled" ? "#DC2626" : "#6366F1",
      timestamp: bookingDate.getTime(),
    });
  });

  activities.sort((a, b) => b.timestamp - a.timestamp);
  const displayActivities = activities.slice(0, 5);

  // Fetch dynamic trainer recommendation
  const { data: recommendedTrainer } = await supabase
    .from("trainers")
    .select("full_name, tagline, rating, sessions_completed, slug")
    .eq("google_calendar_connected", true)
    .order("rating", { ascending: false })
    .limit(1)
    .maybeSingle();

  let trainerRec = recommendedTrainer;
  if (!trainerRec) {
    const { data: fallbackRec } = await supabase
      .from("trainers")
      .select("full_name, tagline, rating, sessions_completed, slug")
      .order("rating", { ascending: false })
      .limit(1)
      .maybeSingle();
    trainerRec = fallbackRec;
  }

  return (
    <div style={{ padding: "32px 32px 48px" }} className="responsive-container">
      {/* Header section */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 4 }}>
            {greeting}, {firstName}
          </h1>
          <p style={{ fontSize: 14, color: "var(--slate)" }}>
            {now.toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <NotificationsPanel />
          <Link href="/trainers" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "var(--navy)", color: "white", textDecoration: "none",
            padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 500,
          }}>
            <Zap size={15} />
            Book a session
          </Link>
        </div>
      </div>

      {/* Get started CTA if everything is empty */}
      {!hasAnyRealData && displayCourses.length === 0 && (
        <GetStartedCTA />
      )}

      {/* Stats row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14, marginBottom: 32,
      }} className="stats-row-grid">
        <StatCard label="Enrolled Courses" value={displayCourses.length} sub={`${activeCourses} in progress`} Icon={BookOpen} iconColor="#6366F1" iconBg="#EEF2FF" />
        <StatCard label="Hours Learned" value={totalHours} sub="Total time" Icon={Clock} iconColor="#0EA5E9" iconBg="#E0F2FE" />
        <StatCard label="Certificates" value={displayCertificates.length} sub="Earned and verified" Icon={Award} iconColor="#D97706" iconBg="#FEF3C7" />
        <StatCard label="Upcoming Sessions" value={upcomingSessionsCount} sub="Upcoming schedules" Icon={CalendarDays} iconColor="#059669" iconBg="#D1FAE5" />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }} className="responsive-split-grid">

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Enrolled Courses */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)" }}>My Courses</h2>
              <Link href="/dashboard/courses" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>
            {displayCourses.length === 0 ? (
              <div style={{
                padding: "32px", textAlign: "center", background: "white",
                borderRadius: 14, border: "1px dashed var(--line)",
              }}>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>
                  You have not enrolled in any courses yet.
                </p>
                <Link href="/courses" style={{
                  fontSize: 13, color: "var(--accent)", fontWeight: 500, textDecoration: "none",
                }}>
                  Browse courses
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }} className="responsive-cards-grid">
                {displayCourses.map(c => <CourseCard key={c.id} course={c} />)}
              </div>
            )}
          </section>

          {/* Upcoming Sessions */}
          <section style={{
            background: "white", borderRadius: 14, padding: "20px 22px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)" }}>Upcoming Sessions</h2>
              <Link href="/dashboard/sessions" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>
            {displaySessions.length === 0 ? (
              <div style={{ padding: "24px 0", textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>
                  No upcoming sessions scheduled.
                </p>
                <Link href="/trainers" style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>
                  Book a trainer
                </Link>
              </div>
            ) : (
              <div>
                {displaySessions.map(s => <SessionRow key={s.id} session={s} />)}
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Progress insight */}
          <div style={{
            background: "linear-gradient(135deg, var(--navy) 0%, #1a3a5c 100%)",
            borderRadius: 14, padding: "20px",
            boxShadow: "0 4px 16px rgba(13,27,42,0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <TrendingUp size={15} color="rgba(255,255,255,0.5)" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Weekly progress</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 600, color: "white", letterSpacing: "-0.5px", lineHeight: 1 }}>{weeklyProgressStr}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>Hours logged this week</div>
            <div style={{ marginTop: 16, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${goalPct}%`, background: "var(--accent)", borderRadius: 3 }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{goalPct}% of your weekly {goalHours}h goal</div>
          </div>

          {/* Certificates */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)" }}>Certificates</h2>
              <Link href="/dashboard/certificates" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {displayCertificates.length === 0 ? (
                <div style={{
                  padding: "20px", borderRadius: 12, background: "white",
                  border: "1px solid rgba(0,0,0,0.06)", textAlign: "center",
                }}>
                  <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0 }}>No completed courses yet.</p>
                </div>
              ) : (
                displayCertificates.map(cert => (
                  <div key={cert.id} style={{
                    background: "white", borderRadius: 12, padding: "14px 16px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    display: "flex", gap: 12, alignItems: "center",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: cert.bg, display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Award size={19} color={cert.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)", lineHeight: 1.35 }}>{cert.title}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Issued {cert.issuedDate}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1, fontFamily: "monospace" }}>{cert.credentialId}</div>
                    </div>
                  </div>
                ))
              )}
              <div style={{
                padding: "12px 14px", borderRadius: 12,
                border: "1.5px dashed var(--line)", textAlign: "center",
              }}>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>Complete a course to earn your next certificate</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section style={{
            background: "white", borderRadius: 14, padding: "18px 20px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)", marginBottom: 14 }}>Recent Activity</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {displayActivities.length === 0 ? (
                <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0, textAlign: "center", padding: "10px 0" }}>No recent activities.</p>
              ) : (
                displayActivities.map((item, i) => {
                  const IconComponent = item.Icon;
                  return (
                    <div key={item.id} style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      paddingBottom: i < displayActivities.length - 1 ? 12 : 0,
                      marginBottom: i < displayActivities.length - 1 ? 12 : 0,
                      borderBottom: i < displayActivities.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: `${item.color}18`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <IconComponent size={13} color={item.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.4 }}>{item.text}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{item.time}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Trainer recommendation */}
          {trainerRec && (
            <div style={{
              background: "var(--accent-light)", borderRadius: 14, padding: "18px 20px",
              border: "1px solid rgba(26,111,191,0.15)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                <Star size={14} color="var(--accent)" />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>Top pick for you</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>{trainerRec.full_name}</div>
              <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 10 }}>
                {trainerRec.tagline} · {trainerRec.rating || 5.0} rating · {trainerRec.sessions_completed || 0} sessions completed
              </div>
              <Link href={`/trainers/${trainerRec.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 500,
              }}>
                View profile <ChevronRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Pulse animation for the "starting soon" dot */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
