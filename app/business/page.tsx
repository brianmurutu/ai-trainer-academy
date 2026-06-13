"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitQuoteRequest } from "@/app/actions/business";
import { Shield, Users, BarChart3, BookOpen, Send, Check } from "lucide-react";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    companyName: "",
    teamSize: "5-20",
    needs: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await submitQuoteRequest(formData);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setFormData({
          contactName: "",
          contactEmail: "",
          companyName: "",
          teamSize: "5-20",
          needs: "",
        });
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh", paddingBottom: 80 }}>
        {/* Hero Section */}
        <section style={{
          background: "linear-gradient(135deg, var(--navy) 0%, #1A2E42 100%)",
          color: "white",
          padding: "80px 24px",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <span style={{
              background: "rgba(26,111,191,0.2)",
              color: "var(--accent)",
              border: "1px solid rgba(26,111,191,0.3)",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              display: "inline-block",
              marginBottom: 20,
            }}>
              AI Academy for Teams
            </span>
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-1px",
              marginBottom: 20,
            }}>
              Train Your AI Engineering & Operations Teams at Scale
            </h1>
            <p style={{
              fontSize: "clamp(16px, 2vw, 18px)",
              color: "var(--muted)",
              maxWidth: 600,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}>
              Equip your workforce with practical, vetted training in RLHF, dataset curation, fine-tuning, and advanced prompt architecture. Led by certified industry practitioners.
            </p>
            <a href="#quote-form" style={{
              background: "var(--accent)",
              color: "white",
              padding: "14px 28px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s, background-color 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-dark)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Request Custom Quote
            </a>
          </div>
        </section>

        {/* Value Proposition */}
        <section style={{ maxWidth: 1100, margin: "60px auto 0", padding: "0 24px" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: 40,
          }}>
            Why Corporate Teams Choose Us
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}>
            {[
              {
                icon: <BookOpen size={24} color="var(--accent)" />,
                title: "Custom Curriculum",
                desc: "Tailored educational paths focused precisely on your company's domain, software stack, and training needs.",
              },
              {
                icon: <Users size={24} color="var(--accent)" />,
                title: "Vetted AI Practitioners",
                desc: "Learn from top AI engineers who have actual production experience with LLMs, datasets, and infrastructure.",
              },
              {
                icon: <BarChart3 size={24} color="var(--accent)" />,
                title: "Manager Dashboards",
                desc: "Track seat utilization, course completion rates, quiz scores, and student performance metrics in real-time.",
              },
              {
                icon: <Shield size={24} color="var(--accent)" />,
                title: "Enterprise Grade",
                desc: "Single Sign-On (SSO) support, dedicated success managers, and secure handling of custom training materials.",
              },
            ].map((feat, i) => (
              <div key={i} style={{
                background: "white",
                padding: 32,
                borderRadius: 12,
                border: "1px solid var(--line)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: "var(--accent-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--navy)", marginBottom: 10 }}>{feat.title}</h3>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Tier Summary */}
        <section style={{ maxWidth: 1100, margin: "80px auto 0", padding: "0 24px" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: 8,
          }}>
            Pricing Built for Every Team
          </h2>
          <p style={{
            textAlign: "center",
            fontSize: 15,
            color: "var(--slate)",
            marginBottom: 40,
          }}>
            Flexible licensing tiers to align with your organization&apos;s growth.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}>
            {[
              {
                title: "Starter",
                price: "$49",
                period: "per seat / mo",
                seats: "5–20 seats",
                features: [
                  "Access to all basic courses",
                  "Standard learner dashboard",
                  "Community-based support",
                  "Monthly reports",
                ],
              },
              {
                title: "Growth",
                price: "$89",
                period: "per seat / mo",
                seats: "21–100 seats",
                features: [
                  "Access to all premium courses",
                  "Team manager progress dashboard",
                  "Priority email support",
                  "Bi-weekly performance updates",
                  "Custom certificate branding",
                ],
                featured: true,
              },
              {
                title: "Enterprise",
                price: "Custom",
                period: "tailored pricing",
                seats: "100+ seats",
                features: [
                  "Fully custom curriculum",
                  "SSO & API integrations",
                  "Dedicated success manager",
                  "1-on-1 office hours with trainers",
                  "SLA-backed support channels",
                ],
              },
            ].map((tier, idx) => (
              <div key={idx} style={{
                background: "white",
                borderRadius: 16,
                padding: 40,
                border: tier.featured ? "2px solid var(--accent)" : "1px solid var(--line)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxShadow: tier.featured ? "0 10px 30px rgba(26,111,191,0.1)" : "none",
              }}>
                {tier.featured && (
                  <span style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--accent)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}>
                    Most Popular
                  </span>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>{tier.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>{tier.seats}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: "var(--navy)" }}>{tier.price}</span>
                  <span style={{ fontSize: 14, color: "var(--slate)" }}>{tier.period}</span>
                </div>
                <div style={{ flex: 1, marginBottom: 32 }}>
                  {tier.features.map((feat, fidx) => (
                    <div key={fidx} style={{ display: "flex", alignItems: "start", gap: 10, marginBottom: 12 }}>
                      <Check size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "var(--slate)" }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <a href="#quote-form" style={{
                  textAlign: "center",
                  background: tier.featured ? "var(--accent)" : "var(--white)",
                  color: tier.featured ? "white" : "var(--navy)",
                  border: tier.featured ? "none" : "1px solid var(--navy)",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={(e) => {
                    if (tier.featured) {
                      e.currentTarget.style.backgroundColor = "var(--accent-dark)";
                    } else {
                      e.currentTarget.style.backgroundColor = "var(--navy)";
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tier.featured) {
                      e.currentTarget.style.backgroundColor = "var(--accent)";
                    } else {
                      e.currentTarget.style.backgroundColor = "var(--white)";
                      e.currentTarget.style.color = "var(--navy)";
                    }
                  }}
                >
                  {tier.title === "Enterprise" ? "Contact Sales" : "Get Started"}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Quote Form */}
        <section id="quote-form" style={{ maxWidth: 650, margin: "80px auto 0", padding: "0 24px" }}>
          <div style={{
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: "40px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", marginBottom: 8, textAlign: "center" }}>
              Request a Custom Quote
            </h2>
            <p style={{ fontSize: 14, color: "var(--slate)", marginBottom: 28, textAlign: "center" }}>
              Tell us about your team and training requirements. An agent will follow up in 24 hours.
            </p>

            {success ? (
              <div style={{
                textAlign: "center",
                padding: "32px 16px",
                background: "var(--green-light)",
                borderRadius: 12,
                border: "1px solid var(--green)",
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%", background: "var(--green)",
                  display: "flex", alignItems: "center", margin: "0 auto 16px",
                  justifyContent: "center", color: "white"
                }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: 18, color: "var(--green)", fontWeight: 600, marginBottom: 8 }}>
                  Quote Request Submitted!
                </h3>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.5 }}>
                  Thank you for reaching out. We have received your custom requirements and our team will get in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {error && (
                  <div style={{
                    padding: 12, borderRadius: 8, background: "rgba(220,38,38,0.05)",
                    border: "1px solid #DC2626", color: "#DC2626", fontSize: 14,
                  }}>
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="contactName" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Jane Doe"
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none", transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="jane@company.com"
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none", transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                  />
                </div>

                <div>
                  <label htmlFor="companyName" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Corp"
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none", transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                  />
                </div>

                <div>
                  <label htmlFor="teamSize" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Expected Team Size
                  </label>
                  <select
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none", background: "white",
                    }}
                  >
                    <option value="5-20">5 – 20 seats</option>
                    <option value="21-100">21 – 100 seats</option>
                    <option value="100+">100+ seats</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="needs" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Tell us about your custom training needs
                  </label>
                  <textarea
                    id="needs"
                    required
                    rows={4}
                    value={formData.needs}
                    onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                    placeholder="E.g., We want to train 15 engineers in fine-tuning Llama models on customer support datasets using PyTorch..."
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none", resize: "vertical", transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "var(--navy)",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 8,
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--navy-800)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--navy)"}
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Request <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
