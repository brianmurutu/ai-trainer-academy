import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Trainer Academy",
  description: "Learn how AI Trainer Academy collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        <div style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "white",
          border: "1px solid var(--line)",
          borderRadius: 16,
          padding: "48px 40px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
        }}>
          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, display: "block", marginBottom: 12 }}>
            LAST UPDATED: JUNE 5, 2026
          </span>
          <h1 style={{
            fontSize: "clamp(26px, 5vw, 36px)",
            fontWeight: 700,
            color: "var(--navy)",
            lineHeight: 1.25,
            letterSpacing: "-0.8px",
            marginBottom: 24
          }}>
            Privacy Policy
          </h1>

          <div style={{
            fontSize: 14.5,
            color: "var(--slate)",
            lineHeight: 1.8,
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}>
            <p>
              AI Trainer Academy (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our platform.
            </p>

            <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "16px 0" }} />

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when registering an account, submitting a trainer application, booking a session, subscribing to our blog, or purchasing courses:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>Account Identifiers:</strong> Name, email address, password, profile picture.</li>
              <li><strong>Trainer Data:</strong> Background experience, bio, LinkedIn URL, GitHub profile, and portfolio details.</li>
              <li><strong>Transaction Data:</strong> Details of bookings, courses purchased, payment methods (note: card details are processed directly by Paystack; crypto hashes by Binance Pay; we do not store raw card numbers).</li>
            </ul>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>2. How We Use Your Information</h2>
            <p>
              We use the collected information for various operational purposes:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>To provide, maintain, and improve our AI education platform services.</li>
              <li>To verify trainer applications and manage public instructor profiles.</li>
              <li>To facilitate booking escrows and process payouts safely to M-Pesa or bank accounts.</li>
              <li>To send transactional emails, booking status updates, and news alerts.</li>
            </ul>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We only share information in the following circumstances:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>With Trainers/Learners:</strong> Necessary contact details are shared between a student and trainer to facilitate booking sessions.</li>
              <li><strong>Service Providers:</strong> We share data with third-party processors (e.g. Supabase, Resend, Paystack, Binance Pay) who support our operations.</li>
              <li><strong>Compliance with Law:</strong> We may disclose information if required to comply with regulatory authorities, legal processes, or national safety guidelines.</li>
            </ul>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>4. Security of Your Data</h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to protect your personal information. Database access is governed by Row Level Security (RLS) policies within Supabase, and connections are encrypted via SSL. However, no database transmission over the internet can be 100% secure.
            </p>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>5. Your Rights & Choice</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or request the deletion of the personal data we hold about you. You can update your profile details at any time from your account settings panel, or contact support to request account deletion.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
