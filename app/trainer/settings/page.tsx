"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, DollarSign, Calendar, CreditCard, Save, Check, Globe } from "lucide-react";
import { parseTrainerBio, stringifyTrainerBio } from "@/lib/trainer-utils";

export default function TrainerSettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Profile data state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRateKsh, setHourlyRateKsh] = useState(3000);
  const [hourlyRateUsd, setHourlyRateUsd] = useState(25);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  // Payout details state
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");

  // Availability state
  const [availabilities, setAvailabilities] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [trainerId, setTrainerId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFullName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
        
        // Fetch bio and settings from the trainers table
        const { data: trainer } = await supabase
          .from("trainers")
          .select("id, bio, hourly_rate_ksh, hourly_rate_usd, linkedin_url, github_url")
          .eq("user_id", user.id)
          .maybeSingle();

        if (trainer) {
          setTrainerId(trainer.id);
          const { bio: cleanBio, videoUrl: parsedVideoUrl, videoUnlocked: parsedVideoUnlocked } = parseTrainerBio(trainer.bio);
          setBio(cleanBio);
          setVideoUrl(parsedVideoUrl);
          setVideoUnlocked(parsedVideoUnlocked);
          
          setHourlyRateKsh(Number(trainer.hourly_rate_ksh) || 3000);
          setHourlyRateUsd(Number(trainer.hourly_rate_usd) || 25);
          setLinkedinUrl(trainer.linkedin_url || "");
          setGithubUrl(trainer.github_url || "");
        } else {
          setBio(user.user_metadata?.bio || "");
          setHourlyRateKsh(user.user_metadata?.hourly_rate_ksh || 3000);
          setHourlyRateUsd(user.user_metadata?.hourly_rate_usd || 25);
          setLinkedinUrl(user.user_metadata?.linkedin_url || "");
          setGithubUrl(user.user_metadata?.github_url || "");
        }
      }
    }
    loadUser();

    // Check query params for success message
    const params = new URLSearchParams(window.location.search);
    if (params.get("video_unlocked") === "true") {
      setMessage({ type: "success", text: "🎉 Success! Video Introduction feature unlocked successfully. You can now save your video URL!" });
    }
  }, []);

  const handleUnlockVideo = async () => {
    if (!trainerId) {
      setMessage({ type: "error", text: "Trainer profile not loaded yet." });
      return;
    }
    setPayLoading(true);
    setMessage(null);
    try {
      const reference = `vid-${trainerId}-${Date.now()}`;
      const callbackUrl = `${window.location.origin}/api/paystack/verify?reference=${reference}`;

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          amountKsh: 300,
          amount: 300,
          currency: "KES",
          reference,
          sessionTopic: "Video Introduction Feature Upgrade",
          callbackUrl,
          metadata: {
            payment_type: "video_intro_activation",
            trainer_id: trainerId,
            amount_ksh: "300",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setMessage({ type: "error", text: data.error || "Failed to initialize payment session." });
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch (err) {
      console.error("Payment initialization failed:", err);
      setMessage({ type: "error", text: "A connection error occurred. Please try again." });
    } finally {
      setPayLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      // 1. Update Auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          bio,
          hourly_rate_ksh: Number(hourlyRateKsh),
          hourly_rate_usd: Number(hourlyRateUsd),
          linkedin_url: linkedinUrl,
          github_url: githubUrl,
        }
      });
      if (authError) throw authError;

      // 2. Compile bio with video tags
      const updatedBio = stringifyTrainerBio(bio, videoUrl, videoUnlocked);

      // 3. Update public trainers table row
      const { error: dbError } = await supabase
        .from("trainers")
        .update({
          full_name: fullName,
          bio: updatedBio,
          hourly_rate_ksh: Number(hourlyRateKsh),
          hourly_rate_usd: Number(hourlyRateUsd),
          linkedin_url: linkedinUrl,
          github_url: githubUrl,
        })
        .eq("user_id", user.id);

      if (dbError) throw dbError;

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update profile settings." });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePayouts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          mpesa_number: mpesaNumber,
          bank_name: bankName,
          bank_account_name: bankAccountName,
          bank_account_number: bankAccountNumber,
          crypto_address: cryptoAddress,
        }
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Payout details saved successfully!" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save payout configuration." });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: "success", text: "Weekly schedule availability saved!" });
    }, 600);
  };

  return (
    <div style={{ padding: "32px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
        Trainer Settings
      </h1>
      <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 32 }}>
        Configure your hourly booking rates, payout methods, weekly availability calendar, and public directory bio.
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
        
        {/* Profile and Rates */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <User size={18} color="var(--accent)" /> Trainer Profile
          </h2>
          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Hourly Rate (USD)</label>
                <div style={{ position: "relative" }}>
                  <DollarSign size={15} color="var(--muted)" style={{ position: "absolute", left: 12, top: 13 }} />
                  <input
                    type="number"
                    value={hourlyRateUsd}
                    onChange={e => setHourlyRateUsd(Number(e.target.value))}
                    style={{
                      width: "100%", padding: "10px 14px 10px 30px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none"
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Hourly Rate (KES Equivalent)</label>
                <input
                  type="number"
                  value={hourlyRateKsh}
                  onChange={e => setHourlyRateKsh(Number(e.target.value))}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>LinkedIn Profile URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>GitHub Profile URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Profile Bio (Directory presentation)</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={5}
                placeholder="Describe your background, experience, NLP specialties, etc..."
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none", resize: "vertical"
                }}
              />
            </div>

            {/* Video Introduction paid feature wrapper */}
            <div style={{
              borderTop: "1px solid var(--line)",
              paddingTop: 20,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>Video Introduction</span>
              
              {videoUnlocked ? (
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--slate)", marginBottom: 6 }}>
                    Video URL (YouTube, Vimeo, or Loom share link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none"
                    }}
                  />
                  <span style={{ fontSize: 11.5, color: "var(--green)", marginTop: 6, display: "block" }}>
                    ✓ Feature unlocked! Your introduction video will be embedded on your public profile.
                  </span>
                </div>
              ) : (
                <div style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}>
                  <div style={{ fontSize: 13, color: "var(--navy)", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                    <Globe size={15} color="var(--accent)" />
                    Unlock Profile Introduction Video
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5 }}>
                    Trainers with a video introduction get <strong>3× more bookings</strong> on average. Highlight your expertise and engage learners by uploading a Loom, YouTube, or Vimeo intro. Unlock this premium add-on for a one-time fee of <strong>KES 300 ($3)</strong>.
                  </p>
                  <button
                    type="button"
                    disabled={payLoading}
                    onClick={handleUnlockVideo}
                    style={{
                      alignSelf: "flex-start",
                      background: "var(--accent)",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 8,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: payLoading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {payLoading ? "Initializing..." : "Unlock for KES 300 / $3"}
                  </button>
                </div>
              )}
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
              <Save size={15} /> Save Trainer Profile
            </button>
          </form>
        </div>

        {/* Payout Settings */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <CreditCard size={18} color="var(--accent)" /> Payout Details
          </h2>
          <form onSubmit={handleSavePayouts} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>M-Pesa Number</label>
              <input
                type="text"
                placeholder="E.g., 0712345678"
                value={mpesaNumber}
                onChange={e => setMpesaNumber(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 14, outline: "none"
                }}
              />
            </div>
            
            <div style={{ borderTop: "1px solid var(--line)", margin: "8px 0", paddingTop: 16 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 12 }}>Bank Wire Details</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--slate)", marginBottom: 6 }}>Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    style={{
                      width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 13, outline: "none"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, color: "var(--slate)", marginBottom: 6 }}>Account Holder Name</label>
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={e => setBankAccountName(e.target.value)}
                    style={{
                      width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 13, outline: "none"
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "var(--slate)", marginBottom: 6 }}>Account Number</label>
                <input
                  type="text"
                  value={bankAccountNumber}
                  onChange={e => setBankAccountNumber(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 13, outline: "none"
                  }}
                />
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--line)", margin: "8px 0", paddingTop: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>USDT Wallet Address (TRC-20)</label>
              <input
                type="text"
                placeholder="E.g., TY8Sdfd..."
                value={cryptoAddress}
                onChange={e => setCryptoAddress(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                  fontSize: 13, outline: "none", fontFamily: "monospace"
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
              <Save size={15} /> Save Payout Settings
            </button>
          </form>
        </div>

        {/* Availability Calendar */}
        <div style={{
          background: "white", borderRadius: 12, border: "1px solid var(--line)", padding: 28
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <Calendar size={18} color="var(--accent)" /> Booking Availability
          </h2>
          <form onSubmit={handleSaveAvailability} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ display: "block", fontSize: 13, color: "var(--slate)", marginBottom: 8 }}>
              Select the days of the week you are available to host 1-on-1 model training sessions:
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              {Object.keys(availabilities).map(day => (
                <button
                  type="button"
                  key={day}
                  onClick={() => setAvailabilities({ ...availabilities, [day]: !(availabilities as any)[day] })}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: (availabilities as any)[day] ? "1px solid var(--accent)" : "1px solid var(--line)",
                    background: (availabilities as any)[day] ? "var(--accent-light)" : "white",
                    color: (availabilities as any)[day] ? "var(--accent-dark)" : "var(--slate)",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.15s"
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Working Hours Start</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Working Hours End</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--line)",
                    fontSize: 14, outline: "none"
                  }}
                />
              </div>
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
              <Save size={15} /> Save Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
