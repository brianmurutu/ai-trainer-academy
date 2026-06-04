import Link from "next/link";
import { Brain } from "lucide-react";
import { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
  side: ReactNode;
}

export default function AuthShell({ children, side }: AuthShellProps) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="auth-shell">
      {/* Left — form panel */}
      <div style={{
        display: "flex", flexDirection: "column",
        padding: "0 48px", background: "white",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 0 0" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, background: "var(--navy)",
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Brain size={16} color="white" />
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "var(--navy)" }}>
              AI Trainer <span style={{ color: "var(--accent)" }}>Academy</span>
            </span>
          </Link>
        </div>

        {/* Form content */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
          <div style={{ width: "100%", maxWidth: 420 }}>
            {children}
          </div>
        </div>

        {/* Footer note */}
        <div style={{ padding: "0 0 28px", fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
          © 2026 AI Trainer Academy · <Link href="/privacy" style={{ color: "var(--muted)" }}>Privacy</Link> · <Link href="/terms" style={{ color: "var(--muted)" }}>Terms</Link>
        </div>
      </div>

      {/* Right — side panel */}
      <div style={{
        background: "var(--navy)", position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "48px", overflow: "hidden",
      }} className="auth-side">
        {side}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-shell { grid-template-columns: 1fr !important; }
          .auth-side { display: none !important; }
          .auth-shell > div:first-child { padding: 0 24px; }
        }
      `}</style>
    </div>
  );
}
