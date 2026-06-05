"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Shield, Bell, CreditCard, Save, Check } from "lucide-react";

export default function LearnerSettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Profile settings state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Notification state
  const [notifs, setNotifs] = useState({
    bookingConfirm: true,
    courseProgress: true,
    marketing: false
  });

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFullName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
        setBio(user.user_metadata?.bio || "");
      }
    }
    loadUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName, bio: bio }
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Password updated successfully!" });
        setNewPassword("");
        setCurrentPassword("");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to update password." });
    } finally {
      setLoading(false);
    }
  };

  const mockPayments = [
    { id: "TX-10492", item: "Fine-tuning LLaMA 3 with LoRA", amount: "$120.00", date: "June 4, 2026", method: "Crypto (USDT)" },
    { id: "TX-10403", item: "Prompt Engineering Mastery", amount: "$45.00", date: "May 28, 2026", method: "Card (Paystack)" }
  ];

  return (
    <div style={{ padding: "32px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
        Settings
      </h1>
      <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 32 }}>
        Manage your learner profile, password, notification options, and view payment history.
      </p>

      {message && (
        <div style={{
          padding: 12, borderRadius: 8,
          background: message.type === "success" ? "var(--green-light)" : "rgba(220,38,38,0.05)",
          border: message.type === "success" ? "1px solid var(--green)" : "1px solid #DC2626",
          color: message.type === "success" ? "var(--green)" : "#DC2626",
          fontSize: 14, marginBottom: 24
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Profile Settings */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <User size={18} color="var(--accent)" /> Profile Information
          </h2>
          <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Email (Read Only)</label>
              <input
                type="email"
                disabled
                value={email}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none", background: "var(--surface)", color: "var(--muted)"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none", resize: "vertical"
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                alignSelf: "flex-start", background: "var(--navy)", color: "white", border: "none",
                padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              <Save size={15} /> Save Profile
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <Shield size={18} color="var(--accent)" /> Security / Password
          </h2>
          <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none"
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                alignSelf: "flex-start", background: "var(--navy)", color: "white", border: "none",
                padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              <Save size={15} /> Update Password
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <Bell size={18} color="var(--accent)" /> Notifications
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                id: "bookingConfirm",
                title: "Booking Confirmations",
                desc: "Receive emails when a trainer approves or changes your booking slots."
              },
              {
                id: "courseProgress",
                title: "Course Milestones",
                desc: "Get notified when you complete a course section or receive certificates."
              },
              {
                id: "marketing",
                title: "Special Offers & Newsletter",
                desc: "Occasional updates about new trainers and marketing announcements."
              }
            ].map(notif => (
              <div key={notif.id} style={{ display: "flex", alignItems: "start", gap: 12 }}>
                <input
                  type="checkbox"
                  id={notif.id}
                  checked={(notifs as any)[notif.id]}
                  onChange={e => setNotifs({ ...notifs, [notif.id]: e.target.checked })}
                  style={{ marginTop: 4, cursor: "pointer" }}
                />
                <div>
                  <label htmlFor={notif.id} style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", cursor: "pointer" }}>
                    {notif.title}
                  </label>
                  <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>{notif.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <CreditCard size={18} color="var(--accent)" /> Payment Receipts
          </h2>
          <div style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--surface)", borderBottom: "1px solid var(--line)", color: "var(--slate)" }}>
                  <th style={{ padding: "12px 16px" }}>Transaction ID</th>
                  <th style={{ padding: "12px 16px" }}>Item</th>
                  <th style={{ padding: "12px 16px" }}>Method</th>
                  <th style={{ padding: "12px 16px" }}>Date</th>
                  <th style={{ padding: "12px 16px" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < mockPayments.length - 1 ? "1px solid var(--line)" : "none", color: "var(--ink)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{p.id}</td>
                    <td style={{ padding: "14px 16px" }}>{p.item}</td>
                    <td style={{ padding: "14px 16px" }}>{p.method}</td>
                    <td style={{ padding: "14px 16px" }}>{p.date}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--navy)" }}>{p.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
