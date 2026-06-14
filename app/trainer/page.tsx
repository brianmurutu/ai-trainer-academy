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
import TrainerActivationClient from "@/components/trainer/TrainerActivationClient";
import { getTrainerDashboardMetrics } from "@/app/actions/trainer";
import { activateTrainerProfile } from "@/lib/supabase/trainer-activation";

export const metadata: Metadata = {
  title: "Trainer Overview | AI Trainer Academy",
};

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
      borderRadius: 16,
      padding: "24px",
      border: "1px solid var(--line)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      color: highlight ? "white" : "var(--navy)",
    }}>
      <div style={{ fontSize: 13, color: highlight ? "rgba(255,255,255,0.75)" : "var(--muted)", fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800 }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 12, color: highlight ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>
          {sub}
        </div>
      )}
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

  // Check if trainer profile is already active in trainers table
  let { data: trainerProfile } = await supabase
    .from("trainers")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  // Get application status
  const { data: application } = await supabase
    .from("trainer_applications")
    .select("id, status, full_name, email")
    .eq("user_id", user.id)
    .maybeSingle();

  const applicationStatus = application?.status || "pending";

  // Auto-activate bypassed users if profile is missing but application is present
  if (!trainerProfile && user.email === "brian@yagwatech.com" && application) {
    const success = await activateTrainerProfile(application.id);
    if (success) {
      const { data: updatedProfile } = await supabase
        .from("trainers")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      trainerProfile = updatedProfile;
    }
  }

  // BYPASS logic
  const isActivated = !!trainerProfile || user.email === "brian@yagwatech.com" || user.user_metadata?.role === "admin";

  if (!isActivated) {
    if (applicationStatus === "approved" && application) {
      return (
        <div style={{
          maxWidth: 640,
          margin: "80px auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          <div style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid var(--line)",
            boxShadow: "0 10px 30px rgba(10,15,30,0.08)",
            padding: "40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {/* Locked Badge Icon */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--accent-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              marginBottom: 24,
            }}>
              <Landmark size={32} />
            </div>

            <h1 style={{
              fontSize: 24,
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}>
              Activate Your Trainer Account
            </h1>
            
            <p style={{
              fontSize: 14.5,
              color: "var(--slate)",
              lineHeight: 1.6,
              maxWidth: 480,
              marginBottom: 32,
            }}>
              Congratulations! Your trainer application has been approved. To activate your public directory profile, list courses, and start accepting learner bookings, please complete the activation fee.
            </p>

            {/* Price tag */}
            <div style={{
              background: "var(--surface)",
              borderRadius: 14,
              padding: "20px 24px",
              width: "100%",
              marginBottom: 32,
              border: "1px solid rgba(0,0,0,0.04)",
              textAlign: "left",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Activation Fee</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>KES 1,000</span>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--slate)" }}>
                  <CheckCircle2 size={15} color="var(--green)" style={{ flexShrink: 0 }} />
                  <span>Public profile in our trainer directory</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--slate)" }}>
                  <CheckCircle2 size={15} color="var(--green)" style={{ flexShrink: 0 }} />
                  <span>Publish unlimited AI courses & tutorials</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--slate)" }}>
                  <CheckCircle2 size={15} color="var(--green)" style={{ flexShrink: 0 }} />
                  <span>Interactive calendar for direct 1-on-1 sessions</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--slate)" }}>
                  <CheckCircle2 size={15} color="var(--green)" style={{ flexShrink: 0 }} />
                  <span>80/20 platform split with automated weekly payouts</span>
                </div>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <TrainerActivationClient
                applicationId={application.id}
                email={application.email || user.email || ""}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12.5, color: "var(--muted)" }}>
              Need help? Contact our support team at <a href="mailto:support@ai-trainer-academy.top" style={{ color: "var(--accent)", textDecoration: "none" }}>support@ai-trainer-academy.top</a>
            </p>
          </div>
        </div>
      );
    }

    // Pending or no application
    if (applicationStatus === "pending") {
      return (
        <div style={{
          maxWidth: 540,
          margin: "100px auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          <div style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid var(--line)",
            boxShadow: "0 10px 30px rgba(10,15,30,0.08)",
            padding: "40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--amber-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--amber)",
              marginBottom: 24,
            }}>
              <AlertCircle size={32} />
            </div>

            <h1 style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}>
              Application Under Review
            </h1>
            
            <p style={{
              fontSize: 14.5,
              color: "var(--slate)",
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              Your application to become a trainer is currently under review by our administration. Once approved, you will receive an email confirmation and can pay the activation fee to go live.
            </p>

            <div style={{
              padding: "12px 16px",
              background: "var(--surface)",
              borderRadius: 10,
              fontSize: 13,
              color: "var(--slate)",
              width: "100%",
            }}>
              Review status: <strong>Pending Approval</strong>
            </div>
          </div>
        </div>
      );
    }

    if (applicationStatus === "rejected") {
      return (
        <div style={{
          maxWidth: 540,
          margin: "100px auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          <div style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid var(--line)",
            boxShadow: "0 10px 30px rgba(10,15,30,0.08)",
            padding: "40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--red-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--red)",
              marginBottom: 24,
            }}>
              <AlertCircle size={32} />
            </div>

            <h1 style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}>
              Application Status
            </h1>
            
            <p style={{
              fontSize: 14.5,
              color: "var(--slate)",
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              We regret to inform you that your trainer application has not been approved at this time. Please contact our support team if you believe this is an error or have questions.
            </p>

            <div style={{
              padding: "12px 16px",
              background: "var(--surface)",
              borderRadius: 10,
              fontSize: 13,
              color: "var(--slate)",
              width: "100%",
            }}>
              Review status: <strong>Not Approved</strong>
            </div>
          </div>
        </div>
      );
    }
  }

  const {
    earnings,
    upcomingBookings,
    historyBookings,
    courses,
    learnersCount,
    sessionsDone,
    avgRating,
  } = await getTrainerDashboardMetrics(trainerProfile?.id || null, fullName);

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
        }} className="stats-row-grid">
          <EarningsStat label="This Month" value={fmt(earnings.thisMonth)} sub={earnings.growth >= 0 ? `↑ ${earnings.growth}% vs last month` : `↓ ${Math.abs(earnings.growth)}% vs last month`} highlight />
          <EarningsStat label="Pending Payout" value={fmt(earnings.pendingPayout)} sub="Next payout: Jun 10" />
          <EarningsStat label="Last Month" value={fmt(earnings.lastMonth)} />
          <EarningsStat label="Lifetime Earned" value={fmt(earnings.lifetimeEarnings)} sub="Since joining" />
        </div>
      </section>

      {/* Main grid section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }} className="responsive-split-grid">

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
              {upcomingBookings.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                  No upcoming bookings found.
                </div>
              ) : upcomingBookings.map((b, i) => {
                const isSoon = b.status === "starting_soon";
                return (
                  <div key={b.id} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "13px 0",
                    borderBottom: i < upcomingBookings.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
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
              {historyBookings.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                  No past sessions found.
                </div>
              ) : historyBookings.map((h, i) => (
                <div key={h.id} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
                  borderBottom: i < historyBookings.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#F0F0F0", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 12, fontWeight: 600,
                    color: "var(--slate)", flexShrink: 0,
                  }}>
                    {h.learnerName.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
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
                    +KSH {Math.round(h.amountKsh).toLocaleString()}
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
                KSH {historyBookings.reduce((sum, h) => sum + Math.round(h.amountKsh), 0).toLocaleString()} this period
              </span>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Total Learners", value: learnersCount, Icon: Users, iconColor: "#6366F1", iconBg: "#EEF2FF" },
              { label: "Avg. Rating", value: avgRating, Icon: Star, iconColor: "#D97706", iconBg: "#FEF3C7" },
              { label: "Sessions Done", value: sessionsDone, Icon: CalendarDays, iconColor: "#0EA5E9", iconBg: "#E0F2FE" },
              { label: "Courses Live", value: courses.length, Icon: BookOpen, iconColor: "#059669", iconBg: "#D1FAE5" },
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
                  Pending payout: <strong>KSH {earnings.pendingPayout.toLocaleString()}</strong>
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
              {courses.length === 0 ? (
                <div style={{ padding: "10px", textAlign: "center", color: "var(--muted)", fontSize: 12 }}>
                  No courses published yet.
                </div>
              ) : courses.map((c: any) => (
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
