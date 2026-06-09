import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AI Trainer Academy",
  description: "Read the Terms of Service governing your use of AI Trainer Academy.",
};

export default function TermsPage() {
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
            Terms of Service
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
              Welcome to AI Trainer Academy. By accessing or using our website and platform services, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
            </p>

            <hr style={{ border: "none", borderTop: "1px solid var(--line)", margin: "16px 0" }} />

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>1. Account Registration</h2>
            <p>
              To use most features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update your details to keep them accurate. You are responsible for safeguarding your password and account credentials.
            </p>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>2. Trainer Applications & Code of Conduct</h2>
            <p>
              Instructors applying to join the directory must pass background validation and passing demo audits. Trainers are independent contractors and set their own schedule availabilities and booking rates. Trainers agree to conduct their 1-on-1 classes professionally and respond to learner questions in a helpful, honest manner.
            </p>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>3. Bookings, Escrow, and Payments</h2>
            <p>
              Learners book trainer slots by completing payment via Paystack or Binance Pay (USDT). AI Trainer Academy acts as an escrow agent, holding payments securely until the scheduled session concludes.
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>Commission Share:</strong> The platform retains a 20% commission fee; trainers receive 80% of booking and course sale revenues.</li>
              <li><strong>Trainer Verification Fee:</strong> Approved trainers pay a one-time KSH 2,000 profile activation fee prior to activation.</li>
              <li><strong>Escrow Payouts:</strong> Trainers receive their accumulated funds on weekly cycles directly to their configured payout channels (M-Pesa or Bank account).</li>
            </ul>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>4. Refund and Cancellation Policy</h2>
            <p>
              Bookings cancelled by learners at least 24 hours prior to the session start time are eligible for a 100% refund. Cancellations made within the 24-hour window may be subject to a fee. In the event of a trainer no-show, the learner is refunded in full.
            </p>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>5. Intellectual Property</h2>
            <p>
              The curriculum structure, course player, video lessons, resources, and articles uploaded by trainers are the intellectual property of their respective creators. You may not copy, distribute, or create derivative works of any course materials without express permission from the copyright owner.
            </p>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>6. Limitation of Liability</h2>
            <p>
              AI Trainer Academy provides the platform &quot;as is&quot; and does not guarantee the completion rate or learning success of any particular student. We are not liable for direct, indirect, or consequential damages resulting from scheduling conflicts, trainer availability, or local internet connectivity problems.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
