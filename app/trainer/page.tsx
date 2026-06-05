import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  TrendingUp,
  DollarSign,
  CalendarDays,
  Star,
  Users,
  Plus,
  ChevronRight,
  Clock,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Landmark,
  Bitcoin,
} from "lucide-react";
import type { Metadata } from "next";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";

export const metadata: Metadata = {
  title: "Trainer Overview — AI Trainer Academy",
};

// ---------------------------------------------------------------------------
// Mock data (replace with Supabase queries once tables are ready)
// ---------------------------------------------------------------------------
const MOCK_EARNINGS = {
  thisMonth: 87500,
  lastMonth: 72000,
  growth: 21.5,
  pendingPayout: 34200,
  lifetimeEarnings: 412000,
  currency: "KSH",
};

const MOCK_UPCOMING = [
  {
    id: "1",
    learnerName: "Brian Mwangi",
    learnerInitials: "BM",
    topic: "QLoRA Fine-tuning Walkthrough",
    date: "Today",
    time: "4:00 PM – 5:30 PM EAT",
    status: "starting_soon",
    amountKsh: 3750,
  },
  {
    id: "2",
    learnerName: "Amira Hassan",
    learnerInitials: "AH",
    topic: "Intro to RLHF Pipelines",
    date: "Tomorrow",
    time: "10:00 AM – 11:00 AM EAT",
    status: "confirmed",
    amountKsh: 2500,
  },
  {
    id: "3",
    learnerName: "Obi Chukwu",
    learnerInitials: "OC",
    topic: "RAG System Architecture Review",
    date: "Fri, Jun 7",
    time: "2:00 PM – 4:00 PM EAT",
    status: "confirmed",
    amountKsh: 5000,
  },
  {
    id: "4",
    learnerName: "Zawadi Kamau",
    learnerInitials: "ZK",
    topic: "Prompt Engineering Fundamentals",
    date: "Sat, Jun 8",
    time: "9:00 AM – 10:00 AM EAT",
    status: "confirmed",
    amountKsh: 2500,
  },
];

const MOCK_HISTORY = [
  { id: "h1", learnerName: "Naledi Dlamini", topic: "Dataset Curation Techniques", date: "Jun 1", duration: "1.5h", amountKsh: 3750, rating: 5 },
  { id: "h2", learnerName: "James Kariuki", topic: "LLaMA 3 Fine-tuning Part 1", date: "May 30", duration: "2h", amountKsh: 5000, rating: 5 },
  { id: "h3", learnerName: "Priya Nair", topic: "Evaluation Metrics Overview", date: "May 28", duration: "1h", amountKsh: 2500, rating: 4 },
  { id: "h4", learnerName: "Kofi Asante", topic: "LoRA Configuration Deep Dive", date: "May 25", duration: "1.5h", amountKsh: 3750, rating: 5 },
];

const MOCK_COURSES = [
  { id: "c1", title: "Fine-tuning LLaMA 3 with LoRA", enrolled: 47, rating: 4.9, lessons: 24, status: "published" },
  { id: "c2", title: "Practical RLHF for Engineers", enrolled: 23, rating: 4.8, lessons: 18, status: "published" },
  { id: "c3", title: "Building Production RAG Systems", enrolled: 0, rating: 0, lessons: 8, status: "draft" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function EarningsStat({
  label, value, sub, highlight = false,
}: {
  label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div style={{
      background: highlight ? "var(--accent)" : "white",
      borderRadius: 14, padding: "20px 22px",
      border: highlight ? "none" : "1px solid rgba(0,0,0,0.06)",
      boxShadow: highlight ? "0 4px 16px rgba(26,111,191,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: highlight ? "rgba(255,255,255,0.65)" : "var(--muted)", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 600, color: highlight ? "white" : "var(--navy)", letterSpacing: "-0.5px", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: highlight ? "rgba(255,255,255,0.5)" : "var(--muted)", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function StarRating({ value }: { value: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={12} color={s <= value ? "#F59E0B" : "#E5E7EB"} fill={s <= value ? "#F59E0B" : "none"} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function TrainerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const fullName: string =
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] || "Trainer";
  const firstName = fullName.split(" ")[0];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const fmt = (n: number) => `KSH ${n.toLocaleString()}`;

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header section */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
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
          <Link href="/trainer/courses/new" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "var(--navy)", color: "white", textDecoration: "none",
            padding: "10px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 500,
          }}>
            <Plus size={15} /> New Course
          </Link>
        </div>
      </div>

      {/* Earnings Overview section */}
      <section style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <TrendingUp size={15} color="var(--muted)" />
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>Earnings Overview</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}>
          <EarningsStat label="This Month" value={fmt(MOCK_EARNINGS.thisMonth)} sub={`↑ ${MOCK_EARNINGS.growth}% vs last month`} highlight />
          <EarningsStat label="Pending Payout" value={fmt(MOCK_EARNINGS.pendingPayout)} sub="Next payout: Jun 10" />
          <EarningsStat label="Last Month" value={fmt(MOCK_EARNINGS.lastMonth)} />
          <EarningsStat label="Lifetime Earned" value={fmt(MOCK_EARNINGS.lifetimeEarnings)} sub="Since joining" />
        </div>
      </section>

      {/* Main grid section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Upcoming Bookings */}
          <section style={{
            background: "white", borderRadius: 14, padding: "22px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CalendarDays size={16} color="var(--navy)" />
                <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>Upcoming Bookings</h2>
              </div>
              <Link href="/trainer/bookings" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {MOCK_UPCOMING.map((b, i) => {
                const isSoon = b.status === "starting_soon";
                return (
                  <div key={b.id} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "13px 0",
                    borderBottom: i < MOCK_UPCOMING.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "var(--accent-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 600, color: "var(--accent)", flexShrink: 0,
                    }}>{b.learnerInitials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--navy)", marginBottom: 2 }}>{b.topic}</div>
                      <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
                        {b.learnerName} · {b.date} · {b.time}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>KSH {b.amountKsh.toLocaleString()}</div>
                      {isSoon ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end", marginTop: 3 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#22C55E" }}>Live soon</span>
                        </div>
                      ) : (
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>Confirmed</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Session History */}
          <section style={{
            background: "white", borderRadius: 14, padding: "22px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={16} color="var(--navy)" />
                <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>Session History</h2>
              </div>
              <Link href="/trainer/bookings?tab=history" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div>
              {MOCK_HISTORY.map((h, i) => (
                <div key={h.id} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
                  borderBottom: i < MOCK_HISTORY.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#F0F0F0", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12, fontWeight: 600,
                    color: "var(--slate)", flexShrink: 0,
                  }}>
                    {h.learnerName.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)" }}>{h.topic}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{h.learnerName}</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>·</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{h.date}</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>·</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{h.duration}</span>
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <StarRating value={h.rating} />
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--green)", flexShrink: 0 }}>
                    +KSH {Math.round(h.amountKsh * 0.8).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 14, padding: "12px 14px",
              background: "var(--surface)", borderRadius: 10,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 13, color: "var(--slate)" }}>Your platform share (80%)</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                KSH {MOCK_HISTORY.reduce((sum, h) => sum + Math.round(h.amountKsh * 0.8), 0).toLocaleString()} this period
              </span>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Total Learners", value: "94", Icon: Users, iconColor: "#6366F1", iconBg: "#EEF2FF" },
              { label: "Avg. Rating", value: "4.9", Icon: Star, iconColor: "#D97706", iconBg: "#FEF3C7" },
              { label: "Sessions Done", value: "218", Icon: CalendarDays, iconColor: "#0EA5E9", iconBg: "#E0F2FE" },
              { label: "Courses Live", value: "2", Icon: BookOpen, iconColor: "#059669", iconBg: "#D1FAE5" },
            ].map(({ label, value, Icon, iconColor, iconBg }) => (
              <div key={label} style={{
                background: "white", borderRadius: 12, padding: "14px",
                border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: iconBg, display: "flex",
                  alignItems: "center", justifyContent: "center", marginBottom: 10,
                }}>
                  <Icon size={16} color={iconColor} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "var(--navy)", letterSpacing: "-0.3px" }}>{value}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Payout Settings */}
          <section style={{
            background: "white", borderRadius: 14, padding: "18px 20px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <DollarSign size={15} color="var(--navy)" />
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>Payout Methods</h2>
              </div>
              <Link href="/trainer/earnings" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>Manage</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "M-Pesa", sub: "+254 7** *** **3", Icon: Smartphone, active: true, color: "#059669", bg: "#D1FAE5" },
                { label: "Bank Transfer", sub: "Equity Bank — KE***1234", Icon: Landmark, active: false, color: "var(--muted)", bg: "#F5F7FA" },
                { label: "Crypto (USDT)", sub: "0x8f3...d42a", Icon: Bitcoin, active: false, color: "var(--muted)", bg: "#F5F7FA" },
              ].map(({ label, sub, Icon, active, color, bg }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                  borderRadius: 10, background: active ? "#F0FDF4" : "var(--surface)",
                  border: active ? "1px solid #BBF7D0" : "1px solid transparent",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={15} color={color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)" }}>{label}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{sub}</div>
                  </div>
                  {active && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <CheckCircle2 size={13} color="#059669" />
                      <span style={{ fontSize: 11, color: "#059669", fontWeight: 500 }}>Active</span>
                    </div>
                  )}
                </div>
              ))}
              <div style={{ marginTop: 4, padding: "10px 12px", background: "var(--accent-light)", borderRadius: 10, border: "1px solid rgba(26,111,191,0.15)" }}>
                <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
                  Pending payout: <strong>KSH {MOCK_EARNINGS.pendingPayout.toLocaleString()}</strong>
                </div>
                <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>Auto-processed every Monday</div>
              </div>
            </div>
          </section>

          {/* Course Management */}
          <section style={{
            background: "white", borderRadius: 14, padding: "18px 20px",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BookOpen size={15} color="var(--navy)" />
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>My Courses</h2>
              </div>
              <Link href="/trainer/courses" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>Manage</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {MOCK_COURSES.map(c => (
                <div key={c.id} style={{
                  padding: "12px 14px", borderRadius: 10,
                  background: c.status === "draft" ? "var(--surface)" : "white",
                  border: `1px solid ${c.status === "draft" ? "var(--line)" : "rgba(0,0,0,0.06)"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--navy)", lineHeight: 1.35 }}>{c.title}</div>
                    <span style={{
                      flexShrink: 0, fontSize: 10, fontWeight: 600, padding: "2px 8px",
                      borderRadius: 20,
                      background: c.status === "published" ? "#D1FAE5" : "#FEF3C7",
                      color: c.status === "published" ? "#059669" : "#D97706",
                    }}>{c.status === "published" ? "Live" : "Draft"}</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={11} /> {c.enrolled} enrolled</span>
                    {c.rating > 0 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Star size={11} color="#F59E0B" fill="#F59E0B" /> {c.rating}</span>}
                    <span>{c.lessons} lessons</span>
                  </div>
                </div>
              ))}
              <Link href="/trainer/courses/new" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                padding: "10px", borderRadius: 10,
                border: "1.5px dashed var(--line)", textDecoration: "none",
                fontSize: 13, color: "var(--muted)", transition: "border-color 0.15s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line)")}
              >
                <Plus size={14} /> Create new course
              </Link>
            </div>
          </section>

          {/* Profile completeness nudge */}
          <div style={{
            background: "var(--accent-light)", borderRadius: 14, padding: "16px 18px",
            border: "1px solid rgba(26,111,191,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
              <AlertCircle size={14} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>Profile tip</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.55, marginBottom: 10 }}>
              Trainers with a video introduction get <strong>3× more bookings</strong>. Add yours to stand out.
            </p>
            <Link href="/trainer/profile" style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 500,
            }}>
              Update profile <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
