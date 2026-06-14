"use client";

import Link from "next/link";
import { Star, MapPin, UserCheck, Edit3 } from "lucide-react";
import TrainerRateDisplay from "@/components/trainers/TrainerRateDisplay";
import { getEmbedUrl } from "@/lib/trainer-utils";

type TrainerProfile = {
  name: string;
  tagline: string;
  country: string;
  bio: string;
  specialities: string[];
  hourlyRateKsh: number;
  hourlyRateUsd: number;
  sessionsCompleted: number;
  rating: number;
  videoUrl?: string;
  videoUnlocked?: boolean;
};

export default function TrainerProfileClient({ initialProfile }: { initialProfile: TrainerProfile }) {
  const profile = initialProfile;

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
            Public Profile Preview
          </h1>
          <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
            This is a preview of how your card and profile details look to prospective learners browsing the directory.
          </p>
        </div>
        <Link href="/trainer/settings" style={{
          padding: "10px 18px", background: "var(--navy)", color: "white", borderRadius: 10,
          fontSize: 13.5, fontWeight: 600, textDecoration: "none", display: "inline-flex", gap: 8, alignItems: "center"
        }}>
          Edit Profile <Edit3 size={14} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }} className="responsive-split-grid">
        
        {/* Profile Card Mockup */}
        <div style={{
          background: "white", borderRadius: 16, border: "1px solid var(--line)",
          padding: 32, boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
        }}>
          {/* Avatar & Heading */}
          <div style={{ display: "flex", gap: 20, alignItems: "start", flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 16, background: "var(--navy)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, color: "white"
            }}>
              {profile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                {profile.name}
              </h2>
              <p style={{ fontSize: 13.5, color: "var(--slate)", fontWeight: 500, marginBottom: 8 }}>
                {profile.tagline}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                <MapPin size={13} /> {profile.country} · <UserCheck size={13} color="var(--green)" /> Verified Instructor
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12,
            borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
            padding: "16px 0", marginBottom: 24, textAlign: "center"
          }}>
            <div>
              <span style={{ display: "block", fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>Rating</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>{profile.rating} <Star size={14} fill="#F59E0B" color="#F59E0B" /></span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>Sessions</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>{profile.sessionsCompleted} completed</span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>Hourly Rate</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }}>
                <TrainerRateDisplay rateKsh={profile.hourlyRateKsh} rateUsd={profile.hourlyRateUsd} />
              </span>
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>About Me</h3>
            <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6 }}>{profile.bio}</p>
          </div>

          {/* Specialities */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 10 }}>Specialties</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.specialities.map(spec => (
                <span key={spec} style={{
                  fontSize: 11.5, fontWeight: 500, padding: "4px 10px",
                  background: "var(--surface)", border: "1px solid var(--line)",
                  color: "var(--slate)", borderRadius: 20
                }}>{spec}</span>
              ))}
            </div>
          </div>

          {/* Video Introduction preview */}
          {profile.videoUnlocked && profile.videoUrl && (
            <div style={{ marginTop: 24, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 14 }}>Video Introduction</h3>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12, border: "1px solid var(--line)", background: "#000" }}>
                <iframe
                  src={getEmbedUrl(profile.videoUrl)}
                  title="Trainer Video Introduction"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Directory Card Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{
            background: "white", borderRadius: 16, border: "1px solid var(--line)",
            padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>Directory Tile Preview</h3>
            
            {/* Mock Card */}
            <div style={{
              background: "white", borderRadius: 12, padding: 18, border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, background: "var(--navy)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "white"
                }}>
                  {profile.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 12, background: "#D1FAE5"
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#059669" }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#059669" }}>Available</span>
                </div>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--navy)", marginBottom: 2 }}>{profile.name}</div>
              <div style={{ fontSize: 11, color: "var(--slate)", lineHeight: 1.4, marginBottom: 8 }}>{profile.tagline}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--muted)", marginBottom: 10 }}>
                <MapPin size={11} /> {profile.country}
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--navy)" }}>
                  <TrainerRateDisplay rateKsh={profile.hourlyRateKsh} rateUsd={profile.hourlyRateUsd} />/hr
                </span>
                <span style={{
                  padding: "5px 10px", background: "var(--navy)", color: "white", borderRadius: 6, fontSize: 11, fontWeight: 500
                }}>Book</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
