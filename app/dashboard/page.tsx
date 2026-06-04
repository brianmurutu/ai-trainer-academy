import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
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
  title: "Dashboard — AI Trainer Academy",
};

// ---------------------------------------------------------------------------
// Mock data (replace with Supabase queries once tables are created)
// ---------------------------------------------------------------------------
const MOCK_COURSES = [
  {
    id: "1",
    title: "Fine-tuning LLaMA 3 with LoRA",
    trainer: "Dr. Amara Osei",
    trainerInitials: "AO",
    progress: 68,
    totalLessons: 24,
    completedLessons: 16,
    tag: "Fine-tuning",
    tagColor: "#6366F1",
    tagBg: "#EEF2FF",
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    title: "Prompt Engineering Mastery",
    trainer: "Sana Malik",
    trainerInitials: "SM",
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    tag: "Prompting",
    tagColor: "#059669",
    tagBg: "#D1FAE5",
    lastAccessed: "Yesterday",
  },
  {
    id: "3",
    title: "RAG Systems & Vector Databases",
    trainer: "James Kariuki",
    trainerInitials: "JK",
    progress: 21,
    totalLessons: 30,
    completedLessons: 6,
    tag: "RAG",
    tagColor: "#D97706",
    tagBg: "#FEF3C7",
    lastAccessed: "3 days ago",
  },
];

const MOCK_SESSIONS = [
  {
    id: "1",
    title: "QLoRA Deep Dive — Part 2",
    trainer: "Dr. Amara Osei",
    trainerInitials: "AO",
    trainerColor: "#6366F1",
    date: "Today",
    time: "4:00 PM – 5:30 PM EAT",
    status: "starting_soon",
    joinable: true,
  },
  {
    id: "2",
    title: "Evaluation Metrics for LLMs",
    trainer: "Naledi Dlamini",
    trainerInitials: "ND",
    trainerColor: "#EC4899",
    date: "Tomorrow",
    time: "10:00 AM – 11:00 AM EAT",
    status: "confirmed",
    joinable: false,
  },
  {
    id: "3",
    title: "Building a RAG Pipeline from Scratch",
    trainer: "James Kariuki",
    trainerInitials: "JK",
    trainerColor: "#0EA5E9",
    date: "Fri, Jun 7",
    time: "2:00 PM – 3:30 PM EAT",
    status: "confirmed",
    joinable: false,
  },
];

const MOCK_CERTIFICATES = [
  {
    id: "1",
    title: "Prompt Engineering Mastery",
    issuedDate: "May 28, 2025",
    credentialId: "ATA-PM-28524",
    color: "#059669",
    bg: "#D1FAE5",
  },
  {
    id: "2",
    title: "Introduction to AI Model Training",
    issuedDate: "Apr 10, 2025",
    credentialId: "ATA-IM-41025",
    color: "#6366F1",
    bg: "#EEF2FF",
  },
];

const MOCK_ACTIVITY = [
  { id: "1", type: "lesson", text: "Completed: LoRA Configuration Explained", time: "2h ago", Icon: CheckCircle2, color: "#059669" },
  { id: "2", type: "session", text: "Attended: Prompt Chaining Techniques with Sana Malik", time: "Yesterday", Icon: Video, color: "#6366F1" },
  { id: "3", type: "lesson", text: "Started: QLoRA vs LoRA — Key Differences", time: "2d ago", Icon: Play, color: "#0EA5E9" },
  { id: "4", type: "cert", text: "Earned certificate: Prompt Engineering Mastery", time: "May 28", Icon: Award, color: "#D97706" },
  { id: "5", type: "lesson", text: "Completed: Setting Up Your Training Environment", time: "May 25", Icon: CheckCircle2, color: "#059669" },
  { id: "6", type: "resource", text: "Downloaded: LoRA Paper Summary (PDF)", time: "May 24", Icon: FileText, color: "#8B5CF6" },
];

// ---------------------------------------------------------------------------
// Sub-components (defined in this file for simplicity)
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

function CourseCard({ course }: { course: typeof MOCK_COURSES[0] }) {
  const completed = course.progress === 100;
  return (
    <Link href={`/dashboard/courses/${course.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "white", borderRadius: 14, padding: "18px 20px",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.15s, transform 0.15s",
        cursor: "pointer",
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; el.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; el.style.transform = "translateY(0)"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "3px 9px",
            borderRadius: 20, background: course.tagBg, color: course.tagColor,
          }}>{course.tag}</span>
          {completed && <CheckCircle2 size={16} color="#059669" />}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", lineHeight: 1.4, marginBottom: 8 }}>
          {course.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%",
            background: course.tagColor, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 9, fontWeight: 600, color: "white",
          }}>{course.trainerInitials}</div>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{course.trainer}</span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 5, background: "#F0F0F0", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
          <div style={{
            height: "100%", borderRadius: 3,
            background: completed ? "#059669" : "var(--accent)",
            width: `${course.progress}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)" }}>
          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
          <span style={{ fontWeight: 500, color: completed ? "#059669" : "var(--accent)" }}>{course.progress}%</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>Last accessed {course.lastAccessed}</div>
      </div>
    </Link>
  );
}

function SessionRow({ session }: { session: typeof MOCK_SESSIONS[0] }) {
  const isSoon = session.status === "starting_soon";
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
      {isSoon ? (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", whiteSpace: "nowrap" }}>Starting soon</span>
          <Link href={`/sessions/${session.id}/join`} style={{
            marginLeft: 6, padding: "5px 12px",
            background: "var(--navy)", color: "white",
            borderRadius: 7, fontSize: 12, fontWeight: 500,
            textDecoration: "none", whiteSpace: "nowrap",
          }}>Join now</Link>
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

  const totalHours = 34;
  const activeCourses = MOCK_COURSES.filter(c => c.progress > 0 && c.progress < 100).length;

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* ── Header ──────────────────────────────────────────── */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 4 }}>
            {greeting}, {firstName} 👋
          </h1>
          <p style={{ fontSize: 14, color: "var(--slate)" }}>
            {now.toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <Link href="/trainers" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "var(--navy)", color: "white", textDecoration: "none",
          padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 500,
        }}>
          <Zap size={15} />
          Book a session
        </Link>
      </div>

      {/* ── Stats row ───────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14, marginBottom: 32,
      }}>
        <StatCard label="Enrolled Courses" value={MOCK_COURSES.length} sub={`${activeCourses} in progress`} Icon={BookOpen} iconColor="#6366F1" iconBg="#EEF2FF" />
        <StatCard label="Hours Learned" value={totalHours} sub="This month" Icon={Clock} iconColor="#0EA5E9" iconBg="#E0F2FE" />
        <StatCard label="Certificates" value={MOCK_CERTIFICATES.length} sub="Earned & verified" Icon={Award} iconColor="#D97706" iconBg="#FEF3C7" />
        <StatCard label="Upcoming Sessions" value={MOCK_SESSIONS.length} sub="Next 7 days" Icon={CalendarDays} iconColor="#059669" iconBg="#D1FAE5" />
      </div>

      {/* ── Main grid ───────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {MOCK_COURSES.map(c => <CourseCard key={c.id} course={c} />)}
            </div>
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
            <div>
              {MOCK_SESSIONS.map(s => <SessionRow key={s.id} session={s} />)}
            </div>
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
            <div style={{ fontSize: 30, fontWeight: 600, color: "white", letterSpacing: "-0.5px", lineHeight: 1 }}>5h 40m</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>+2h 10m from last week</div>
            <div style={{ marginTop: 16, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: "72%", background: "var(--accent)", borderRadius: 3 }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>72% of your weekly 8h goal</div>
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
              {MOCK_CERTIFICATES.map(cert => (
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
              ))}
              <div style={{
                padding: "12px 14px", borderRadius: 12,
                border: "1.5px dashed var(--line)", textAlign: "center",
              }}>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>Complete a course to earn your next certificate</p>
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
              {MOCK_ACTIVITY.map((item, i) => (
                <div key={item.id} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  paddingBottom: i < MOCK_ACTIVITY.length - 1 ? 12 : 0,
                  marginBottom: i < MOCK_ACTIVITY.length - 1 ? 12 : 0,
                  borderBottom: i < MOCK_ACTIVITY.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `${item.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <item.Icon size={13} color={item.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.4 }}>{item.text}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trainer recommendation */}
          <div style={{
            background: "var(--accent-light)", borderRadius: 14, padding: "18px 20px",
            border: "1px solid rgba(26,111,191,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <Star size={14} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>Top pick for you</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>Naledi Dlamini</div>
            <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 10 }}>AI Safety & RLHF specialist · 4.9★ · 142 sessions</div>
            <Link href="/trainers/naledi-dlamini" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, color: "var(--accent)", textDecoration: "none", fontWeight: 500,
            }}>
              View profile <ChevronRight size={13} />
            </Link>
          </div>
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
