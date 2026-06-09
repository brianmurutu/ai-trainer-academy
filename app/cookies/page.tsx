import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | AI Trainer Academy",
  description: "Learn how AI Trainer Academy uses cookies and tracking technologies.",
};

export default function CookiesPage() {
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
            Cookie Policy
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
              This Cookie Policy explains how AI Trainer Academy uses cookies and similar tracking technologies when you use our website.
            </p>

            <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "16px 0" }} />

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>1. What are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies and similar technologies for storing and honoring your preferences, signing you in, analyzing how our services perform, and fulfilling other legitimate purposes.
            </p>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>2. How We Use Cookies</h2>
            <p>
              We use both first-party and third-party cookies for several reasons:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our site, such as keeping you authenticated into your dashboard, maintaining database transactions via Supabase, and validating security headers.</li>
              <li><strong>Performance & Analytics Cookies:</strong> These cookies collect aggregate information to help us understand how our website is being used, identify navigation bottlenecks, and improve page load speeds.</li>
              <li><strong>Functionality Cookies:</strong> These are used to remember choices you make (such as your language or user role selection) to deliver a more customized experience.</li>
            </ul>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>3. Controlling Your Cookies</h2>
            <p>
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove or reject cookies, this could affect the availability and functionality of some areas of our platform (specifically dashboard login sessions).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
