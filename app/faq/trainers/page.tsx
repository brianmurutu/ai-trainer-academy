"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TrainerFaqPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What qualifications are required to become a trainer?",
      a: "We look for active AI practitioners with real-world experience. Typically, this includes software engineers who build RAG systems, researchers with a background in deep learning / NLP, or developers who have open-sourced fine-tuned model weights. An academic degree is not strictly required, but practical demonstrations (e.g. GitHub repos, HuggingFace models) are highly valued.",
    },
    {
      q: "How does the application verification process work?",
      a: "After you submit the application form, our admin team reviews your portfolio, GitHub repositories, and LinkedIn profile. If you meet our criteria, we'll schedule a brief 15-minute Google Meet call to audit your training approach and verify your identity. Once approved, you pay the KSH 2,000 activation fee and your profile goes live.",
    },
    {
      q: "How much should I charge for 1-on-1 sessions?",
      a: "You have complete freedom to set your own hourly booking rates. Most instructors charge between $25 to $100 per hour depending on their level of experience and technical specialty. You can adjust your rate at any time from your trainer portal settings page.",
    },
    {
      q: "How does the escrow payment system work?",
      a: "When a student books a session, they pay the full amount up front. We hold these funds securely. Once the session ends, the trainer is credited 80% of the funds, and payouts are disbursed automatically every Monday to your Safaricom M-Pesa number or bank account.",
    },
    {
      q: "Can I create and sell my own courses?",
      a: "Yes! Our platform provides a comprehensive Course Creator wizard where you can build curriculum sections, lessons, and set pricing. Course sales are split 80/20 in your favor, giving you a passive income stream alongside 1-on-1 bookings.",
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
            Trainer Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Everything you need to know about teaching, scheduling, pricing, and payouts on AI Trainer Academy.
          </p>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: 750, margin: "0 auto 60px" }}>
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

        {/* CTA */}
        <section style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Link href="/apply" style={{
            background: "var(--navy)", color: "white", padding: "12px 24px",
            borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8, transition: "background-color 0.15s"
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--navy-800)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--navy)"}
          >
            Apply to Become a Trainer <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
