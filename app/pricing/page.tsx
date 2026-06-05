"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check, HelpCircle, ChevronDown, ChevronUp, User, Users, GraduationCap } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { formatPrice } = useCurrency();

  const faqs = [
    {
      q: "How does the 1-on-1 booking pricing work?",
      a: "Trainers set their own hourly rates (typically between $30 to $120 per hour). When booking, you pay for the scheduled duration. The funds are held securely until the session completes, then disbursed to the trainer.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support M-Pesa and local card payments via Paystack, as well as crypto payments (USDT) via Binance Pay.",
    },
    {
      q: "What is the trainer commission structure?",
      a: "Trainers keep 80% of all session and course revenue they generate. AI Trainer Academy retains a 20% platform fee to cover server costs, payment processing, marketing, and operational expenses.",
    },
    {
      q: "What is the trainer activation fee?",
      a: "To maintain a high-quality platform, we charge a one-time KSH 2,000 (approx. $15 USD) activation fee after your application is approved. This covers verification of your profile, background checks, and onboarding support.",
    },
    {
      q: "Can I get a refund if a session is cancelled?",
      a: "Yes. If a trainer cancels a session or fails to show up, you receive a 100% refund. If you cancel at least 24 hours in advance, you receive a full refund. Cancellations within 24 hours may be subject to a fee depending on the trainer's policy.",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        {/* Header */}
        <section style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 60px" }}>
          <h1 style={{
            fontSize: "clamp(32px, 4.5vw, 44px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
          }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Whether you want to learn AI skills, train others, or upgrade your team, we have clear pricing plans for every need.
          </p>
        </section>

        {/* Pricing Grids */}
        <section style={{
          maxWidth: 1100,
          margin: "0 auto 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: 24,
        }}>
          {/* Learners */}
          <div style={{
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 40,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, background: "var(--accent-light)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)"
              }}>
                <GraduationCap size={20} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>For Learners</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 24, minHeight: 40 }}>
              Book 1-on-1 sessions or buy self-paced courses directly from verified experts.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 28 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>Pay-per-use</span>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>or course price</span>
            </div>
            <div style={{ flex: 1, marginBottom: 32 }}>
              {[
                "Only pay for what you book",
                "Trainer hourly rates set transparently",
                "Secure escrow (trainer paid after session)",
                "Lifetime access to purchased courses",
                "Certificate of completion for courses",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "start", gap: 10, marginBottom: 12 }}>
                  <Check size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--slate)" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/trainers" style={{
              textAlign: "center",
              background: "var(--navy)",
              color: "white",
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--navy-800)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--navy)"}
            >
              Browse Trainers
            </Link>
          </div>

          {/* Trainers */}
          <div style={{
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 40,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, background: "rgba(245,158,11,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--amber)"
              }}>
                <User size={20} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>For Trainers</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 24, minHeight: 40 }}>
              Apply to teach, list courses, build bookings, and monetize your AI expertise.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 28 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>80% Split</span>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>revenue share</span>
            </div>
            <div style={{ flex: 1, marginBottom: 32 }}>
              {[
                "Keep 80% of bookings & course sales",
                `One-time ${formatPrice(2000, 15)} activation fee`,
                "Set your own schedule & rates",
                "Accept global payments (Card, M-Pesa, USDT)",
                "Get payouts straight to M-Pesa / Bank",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "start", gap: 10, marginBottom: 12 }}>
                  <Check size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--slate)" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/apply" style={{
              textAlign: "center",
              background: "white",
              color: "var(--navy)",
              border: "1px solid var(--navy)",
              padding: "11px 24px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.15s, color 0.15s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--navy)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "var(--navy)";
              }}
            >
              Apply to Teach
            </Link>
          </div>

          {/* Business */}
          <div style={{
            background: "white",
            border: "2px solid var(--accent)",
            borderRadius: 16,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 10px 30px rgba(26,111,191,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, background: "var(--accent-light)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)"
              }}>
                <Users size={20} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>For Teams</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 24, minHeight: 40 }}>
              Up-skill your engineering team with custom tracks and managerial oversight.
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 28 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>Custom Plans</span>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>starter / custom quote</span>
            </div>
            <div style={{ flex: 1, marginBottom: 32 }}>
              {[
                "Access to specialized team tracks",
                "Manager utilization reports",
                "Priority SLAs & dedicated support",
                "Add/remove seats dynamically",
                "Optional custom curricula",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "start", gap: 10, marginBottom: 12 }}>
                  <Check size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--slate)" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/business" style={{
              textAlign: "center",
              background: "var(--accent)",
              color: "white",
              padding: "12px 24px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background-color 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--accent-dark)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--accent)"}
            >
              See Business Options
            </Link>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section style={{ maxWidth: 750, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--navy)",
            textAlign: "center",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10
          }}>
            <HelpCircle size={22} color="var(--accent)" /> Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} style={{
                  background: "white",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--slate)" /> : <ChevronDown size={18} color="var(--slate)" />}
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "var(--slate)",
                      lineHeight: 1.6,
                      borderTop: "1px solid var(--line)",
                      paddingTop: 16,
                      background: "var(--surface)"
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
