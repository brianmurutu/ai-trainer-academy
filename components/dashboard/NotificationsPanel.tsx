"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, Trash2, Calendar, BookOpen, User } from "lucide-react";

type NotificationItem = {
  id: string;
  type: "session" | "course" | "account";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

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
