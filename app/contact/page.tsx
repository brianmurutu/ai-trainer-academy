"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitContactForm } from "@/app/actions/contact";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await submitContactForm(formData);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
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
      <main style={{ background: "var(--surface)", minHeight: "100vh", padding: "60px 24px 100px" }}>
        
        {/* Header */}
        <section style={{ maxWidth: 800, margin: "0 auto 48px", textAlign: "center" }}>
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
            Get In Touch
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 4.5vw, 40px)",
            fontWeight: 700,
            color: "var(--navy)",
            letterSpacing: "-0.8px",
            marginBottom: 16,
          }}>
            We'd love to hear from you
          </h1>
          <p style={{ fontSize: 16, color: "var(--slate)", lineHeight: 1.6 }}>
            Have questions about booking trainers, publishing courses, or custom enterprise solutions? Our support team is here to assist.
          </p>
        </section>

        {/* Contact Content Grid */}
        <section style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: 40,
          alignItems: "start"
        }} className="contact-grid">
          
          {/* Left Column: Contact details card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{
              background: "white",
              borderRadius: 16,
              border: "1px solid var(--line)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>Contact Information</h2>
              
              <div style={{ display: "flex", alignItems: "start", gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "var(--accent-light)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)"
                }}>
                  <Mail size={16} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Email support</span>
                  <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>support@ai-trainer-academy.top</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "start", gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "var(--accent-light)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)"
                }}>
                  <Phone size={16} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Call us</span>
                  <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>+254 792 710 951</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "start", gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "var(--accent-light)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)"
                }}>
                  <MapPin size={16} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>Headquarters</span>
                  <span style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.5 }}>
                    iHub, Senteu Plaza, Galana Road,<br />Nairobi, Kenya
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div style={{
            background: "white",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 40,
            boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
          }}>
            {success ? (
              <div style={{
                textAlign: "center",
                padding: "40px 16px",
                background: "var(--green-light)",
                borderRadius: 12,
                border: "1px solid var(--green)",
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%", background: "var(--green)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
                  color: "white"
                }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: 18, color: "var(--green)", fontWeight: 600, marginBottom: 8 }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.5 }}>
                  Thank you for reaching out. We have received your query and will reply within 24 business hours.
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
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row-mobile">
                  <div>
                    <label htmlFor="name" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      style={{
                        width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                        fontSize: 14, outline: "none", transition: "border-color 0.15s",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help you?"
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)",
                      fontSize: 14, outline: "none", transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--line)"}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write details of your question or issue..."
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
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--navy-800)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--navy)"}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
