"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Share2, Download, ShieldCheck, Check, Info } from "lucide-react";

const MOCK_CERTIFICATES = [
  {
    id: "1",
    title: "Prompt Engineering Mastery",
    issuedDate: "May 28, 2026",
    credentialId: "ATA-PM-28524",
    instructor: "Sana Malik",
    hash: "sha256-8a7c1b4d2e9f0a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c",
    color: "#059669",
    bg: "#D1FAE5"
  },
  {
    id: "2",
    title: "Introduction to AI Model Training",
    issuedDate: "Apr 10, 2026",
    credentialId: "ATA-IM-41025",
    instructor: "Dr. Amara Osei",
    hash: "sha256-4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b",
    color: "#6366F1",
    bg: "#EEF2FF"
  }
];

export default function LearnerCertificatesPage() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleShare = (certTitle: string, credId: string) => {
    // Standard LinkedIn Add to Profile URL format
    const baseUrl = "https://www.linkedin.com/profile/add";
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: certTitle,
      organizationName: "AI Trainer Academy",
      issueYear: "2026",
      issueMonth: "5",
      certUrl: window.location.origin,
      certId: credId
    });
    window.open(`${baseUrl}?${params.toString()}`, "_blank");
  };

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div style={{ padding: "32px 32px 48px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.5px", marginBottom: 6 }}>
          My Verified Certificates
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--slate)" }}>
          Access your cryptographically signed certificates, share your credentials on professional networks, and download verified files.
        </p>
      </div>

      {/* Checklist grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }} className="cert-grid">
        
        {/* Certificate list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {MOCK_CERTIFICATES.map(cert => (
            <div key={cert.id} style={{
              background: "white", borderRadius: 16, border: "1px solid var(--line)",
              padding: 24, display: "flex", flexDirection: "column", gap: 16,
              boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "start" }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, background: cert.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <Award size={22} color={cert.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{cert.title}</h3>
                    <div style={{ fontSize: 12, color: "var(--slate)" }}>
                      Issued: {cert.issuedDate} · Instructor: {cert.instructor}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 10.5, fontWeight: 600, color: "var(--green)", background: "var(--green-light)",
                  padding: "4px 10px", borderRadius: 20, border: "1px solid var(--green)", display: "flex", gap: 4, alignItems: "center"
                }}>
                  <ShieldCheck size={12} /> Verified
                </div>
              </div>

              {/* Cryptographic hash details */}
              <div style={{
                background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10,
                padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14
              }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>
                    Certificate Signature Hash
                  </span>
                  <span style={{ display: "block", fontSize: 11, color: "var(--slate)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontFamily: "monospace", marginTop: 2 }}>
                    {cert.hash}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(cert.hash)}
                  style={{
                    background: "white", border: "1px solid var(--line)", padding: "5px 10px", borderRadius: 6,
                    fontSize: 11, fontWeight: 500, color: "var(--navy)", cursor: "pointer", whiteSpace: "nowrap",
                    display: "flex", gap: 4, alignItems: "center"
                  }}
                >
                  {copiedHash === cert.hash ? (
                    <>
                      Copied! <Check size={11} color="var(--green)" />
                    </>
                  ) : (
                    "Copy Hash"
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 10, borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 4 }}>
                <button
                  onClick={() => handleShare(cert.title, cert.credentialId)}
                  style={{
                    flex: 1, padding: "10px", border: "1px solid var(--line)", background: "white",
                    borderRadius: 8, fontSize: 13, fontWeight: 600, color: "var(--navy)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                  }}
                >
                  <Share2 size={14} /> Add to LinkedIn
                </button>
                <button
                  style={{
                    flex: 1, padding: "10px", background: "var(--navy)", border: "none",
                    borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                  }}
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification helper card */}
        <div style={{
          background: "white", borderRadius: 16, border: "1px solid var(--line)",
          padding: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.01)"
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "start", marginBottom: 14 }}>
            <Info size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>Verification System</h3>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.6, marginBottom: 16 }}>
            Every certificate issued by AI Trainer Academy is signed with an individual cryptographic hash. This allows employers to verify credentials instantly.
          </p>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
            <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", marginBottom: 8, textTransform: "uppercase" }}>
              How Employers Verify
            </span>
            <ol style={{ paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "var(--slate)", lineHeight: 1.5 }}>
              <li>Employers search using the Certificate Signature Hash.</li>
              <li>The system returns the matching verified records and curriculum parameters.</li>
              <li>Ensures full legitimacy of developer capstones and codebase reviews.</li>
            </ol>
          </div>
        </div>

      </div>

      <style>{`
        @media(max-width: 768px) {
          .cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
