"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, Trash2, Calendar, BookOpen, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type NotificationItem = {
  id: string;
  type: "session" | "course" | "account";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

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

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n-1",
      type: "session",
      title: "Session Approved",
      message: "Dr. Amara Osei has approved your LoRA fine-tuning session for tomorrow at 4:00 PM EAT.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "n-2",
      type: "course",
      title: "New Course Available",
      message: "vLLM Inference Optimization course has been published in the marketplace.",
      time: "Yesterday",
      read: false,
    },
    {
      id: "n-3",
      type: "account",
      title: "Verification Successful",
      message: "Your profile identity check has successfully passed verification.",
      time: "3 days ago",
      read: true,
    }
  ]);

  const panelRef = useRef<HTMLDivElement>(null);

  // Load real notifications from database
  useEffect(() => {
    async function loadNotifications() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const role = user.user_metadata?.role || "learner";
        const newNotifs: NotificationItem[] = [];

        if (role === "trainer") {
          const { data: bookings } = await supabase
            .from("bookings")
            .select("id, status, session_date, session_topic, created_at")
            .eq("trainer_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);

          if (bookings) {
            bookings.forEach((b: any) => {
              const dateStr = b.session_date ? new Date(b.session_date).toLocaleDateString("en-KE", { month: "short", day: "numeric" }) : "";
              const topic = b.session_topic?.split(" || ")[0] || "Consultation Call";
              const createdDate = new Date(b.created_at);
              if (b.status === "pending") {
                newNotifs.push({
                  id: `notif-b-${b.id}`,
                  type: "session",
                  title: "New Session Request",
                  message: `A learner booked a session on ${topic} for ${dateStr}.`,
                  time: getRelativeTime(createdDate),
                  read: false
                });
              } else if (b.status === "confirmed") {
                newNotifs.push({
                  id: `notif-b-${b.id}`,
                  type: "session",
                  title: "Session Confirmed",
                  message: `Session for ${topic} on ${dateStr} is confirmed and meeting link is generated.`,
                  time: getRelativeTime(createdDate),
                  read: false
                });
              }
            });
          }
        } else {
          const { data: bookings } = await supabase
            .from("bookings")
            .select("id, status, session_date, session_topic, created_at, trainers(full_name)")
            .eq("learner_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);

          if (bookings) {
            bookings.forEach((b: any) => {
              const dateStr = b.session_date ? new Date(b.session_date).toLocaleDateString("en-KE", { month: "short", day: "numeric" }) : "";
              const trainerName = b.trainers?.full_name || "Trainer";
              const topic = b.session_topic?.split(" || ")[0] || "Consultation Call";
              const createdDate = new Date(b.created_at);
              if (b.status === "confirmed") {
                newNotifs.push({
                  id: `notif-b-${b.id}`,
                  type: "session",
                  title: "Session Confirmed",
                  message: `Your session with ${trainerName} on ${dateStr} is confirmed. Join link is ready!`,
                  time: getRelativeTime(createdDate),
                  read: false
                });
              } else if (b.status === "pending") {
                newNotifs.push({
                  id: `notif-b-${b.id}`,
                  type: "session",
                  title: "Booking Requested",
                  message: `Your booking for ${topic} with ${trainerName} is pending payment/confirmation.`,
                  time: getRelativeTime(createdDate),
                  read: false
                });
              }
            });
          }

          const { data: enrollments } = await supabase
            .from("enrollments")
            .select("id, progress_pct, completed_lessons, created_at, courses(title)")
            .eq("learner_id", user.id)
            .order("created_at", { ascending: false })
            .limit(3);

          if (enrollments) {
            enrollments.forEach((e: any) => {
              const courseTitle = e.courses?.title || "Course";
              const createdDate = new Date(e.created_at);
              if (e.progress_pct === 100) {
                newNotifs.push({
                  id: `notif-e-${e.id}`,
                  type: "course",
                  title: "Course Completed 🎉",
                  message: `Congratulations! You have completed ${courseTitle} and earned your certificate.`,
                  time: getRelativeTime(createdDate),
                  read: false
                });
              } else if (e.progress_pct > 0) {
                newNotifs.push({
                  id: `notif-e-${e.id}`,
                  type: "course",
                  title: "Course In Progress",
                  message: `You are at ${e.progress_pct}% progress in ${courseTitle}. Keep it up!`,
                  time: getRelativeTime(createdDate),
                  read: false
                });
              }
            });
          }
        }

        if (newNotifs.length > 0) {
          setNotifications(newNotifs);
        }
      } catch (err) {
        console.error("Failed to load notifications from database:", err);
      }
    }
    loadNotifications();
  }, []);

  // Click outside to close panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => {
      if (n.id === id) return { ...n, read: !n.read };
      return n;
    }));
  };

  const deleteNotif = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "session": return <Calendar size={14} color="var(--accent)" />;
      case "course": return <BookOpen size={14} color="var(--green)" />;
      default: return <User size={14} color="var(--amber)" />;
    }
  };

  return (
    <div ref={panelRef} style={{ position: "relative" }}>
      {/* Bell icon trigger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "white",
          border: "1px solid var(--line)",
          width: 38,
          height: 38,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          outline: "none",
          transition: "background-color 0.15s"
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--surface)"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}
      >
        <Bell size={18} color="var(--navy)" />
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: -3, right: -3,
            background: "#DC2626", color: "white", fontSize: 9,
            fontWeight: 700, width: 16, height: 16, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 2px white"
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: "absolute",
          top: 48,
          right: 0,
          width: 320,
          background: "white",
          border: "1px solid var(--line)",
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          zIndex: 40,
          overflow: "hidden"
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--surface)"
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: "none", border: "none", color: "var(--accent)",
                  fontSize: 11, fontWeight: 600, cursor: "pointer", outline: "none"
                }}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <div style={{ padding: "40px 16px", textAlign: "center", color: "var(--muted)", fontSize: 12 }}>
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif, idx) => (
                <div
                  key={notif.id}
                  style={{
                    padding: "14px 16px",
                    borderBottom: idx < notifications.length - 1 ? "1px solid var(--line)" : "none",
                    background: notif.read ? "white" : "rgba(26,111,191,0.02)",
                    display: "flex",
                    gap: 12,
                    alignItems: "start",
                    transition: "background-color 0.15s",
                    cursor: "pointer"
                  }}
                  onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 6,
                    background: "var(--surface)", display: "flex",
                    alignItems: "center", justifyContent: "center", marginTop: 2, flexShrink: 0
                  }}>
                    {getIcon(notif.type)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)" }}>{notif.title}</span>
                      <span style={{ fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>{notif.time}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.4 }}>{notif.message}</p>
                    
                    {/* Action buttons on hover visual mock */}
                    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                      <button
                        onClick={(e) => toggleRead(notif.id, e)}
                        style={{
                          background: "none", border: "none", color: "var(--muted)",
                          fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex",
                          alignItems: "center", gap: 4, outline: "none"
                        }}
                      >
                        <Check size={11} /> {notif.read ? "Mark unread" : "Mark read"}
                      </button>
                      <button
                        onClick={(e) => deleteNotif(notif.id, e)}
                        style={{
                          background: "none", border: "none", color: "var(--muted)",
                          fontSize: 10, fontWeight: 500, cursor: "pointer", display: "flex",
                          alignItems: "center", gap: 4, outline: "none"
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = "#DC2626"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
