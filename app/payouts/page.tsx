import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DollarSign, Smartphone, Landmark, Wallet, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payouts Guide — AI Trainer Academy",
  description: "Learn how payouts and commission splits work for trainers.",
};

export default function PayoutsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        
        {/* Header */}
        <section style={{ maxWidth: 800, margin: "0 auto 60px", textAlign: "center" }}>
          <span style={{
            background: "var(--accent-light)",
            color: "var(--accent)",
            border: "1px solid rgba(26,111,191,0.1)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            display: "inline-block",
            marginBottom: 16,
          }}>
            Trainer Support
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 44px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
            lineHeight: 1.2
          }}>
            Payouts & Earnings Guide
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Earn revenue doing what you love. We offer fast, automated payout solutions with simple commission splits.
          </p>
        </section>

        {/* Payout Details Section */}
        <section style={{
          maxWidth: 900,
          margin: "0 auto 60px",
          background: "white",
          borderRadius: 16,
          border: "1px solid var(--line)",
          padding: "48px 40px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
            Revenue Splits
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--slate)", lineHeight: 1.8, marginBottom: 28 }}>
            AI Trainer Academy uses a clear **80/20** split for all services. Trainers keep **80%** of all generated booking revenues and course sales. The remaining **20%** platform fee covers server hosting, video encoding, secure payment gateway fees, and admin support.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
            Supported Payout Channels
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            {[
              {
                icon: <Smartphone size={18} color="var(--green)" />,
                title: "M-Pesa Payouts (Kenya)",
                desc: "Instant disbursement directly to your Safaricom mobile wallet. This is our default payout channel for local trainers in East Africa."
              },
              {
                icon: <Landmark size={18} color="var(--accent)" />,
                title: "Bank Wire Transfers",
                desc: "Direct deposit into your checking account. Available for large balance payouts (processed in KSH or USD equivalents)."
              },
              {
                icon: <Wallet size={18} color="var(--amber)" />,
                title: "USDT Crypto Payouts",
                desc: "Disbursed via TRC-20 blockchain networks directly to your digital address. Ideal for international instructors."
              }
            ].map((ch, idx) => (
              <div key={idx} style={{
                display: "flex", gap: 16, alignItems: "start", padding: 18,
                background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%", background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {ch.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{ch.title}</h3>
                  <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5 }}>{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
            Processing Timeline
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--slate)", lineHeight: 1.8 }}>
            Accumulated learner funds are held in escrow until 24 hours after the scheduled session ends. Once the session is confirmed complete, the funds are added to your pending balance. Payouts are automatically processed on a weekly schedule **every Monday morning**.
          </p>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Link href="/apply" style={{
            background: "var(--navy)", color: "white", padding: "12px 24px",
            borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8, transition: "background-color 0.15s"
          }}
            className="apply-btn"
          >
            Apply to Become a Trainer <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <Footer />
      <style>{`
        .apply-btn:hover {
          background-color: var(--navy-800) !important;
        }
      `}</style>
    </>
  );
}
