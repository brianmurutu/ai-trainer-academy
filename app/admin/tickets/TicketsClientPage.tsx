"use client";

import { useState } from "react";
import {
  LifeBuoy,
  User,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  X,
  Edit2,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import {
  updateTicketStatus,
  updateLearnerDetails,
  type AdminTicket
} from "@/app/actions/admin";

export default function TicketsClientPage({ initialTickets }: { initialTickets: AdminTicket[] }) {
  const [tickets, setTickets] = useState<AdminTicket[]>(initialTickets);
  const [filter, setFilter] = useState<"all" | "open" | "resolved" | "closed">("all");
  
  // Pending actions state
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modals state
  const [activeResolveTicket, setActiveResolveTicket] = useState<AdminTicket | null>(null);
  const [activeEditLearner, setActiveEditLearner] = useState<{ id: string; email: string; name: string } | null>(null);
  const [resolutionNote, setResolutionNote] = useState("");
  
  // Edit form state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const filtered = tickets.filter(t => filter === "all" || t.status === filter);
  const openCount = tickets.filter(t => t.status === "open").length;

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeResolveTicket) return;
    
    setPendingId(activeResolveTicket.id);
    setError(null);
    setSuccess(null);
    const targetId = activeResolveTicket.id;
    const note = resolutionNote;
    
    setActiveResolveTicket(null);
    setResolutionNote("");

    try {
      const res = await updateTicketStatus(targetId, "resolved", note);
      if (res && res.success) {
        setTickets(prev =>
          prev.map(t => (t.id === targetId ? { ...t, status: "resolved" as const } : t))
        );
        setSuccess("Support ticket resolved successfully and user notified by email.");
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to resolve ticket.");
    } finally {
      setPendingId(null);
    }
  };

  const handleEditLearner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEditLearner) return;

    setEditLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await updateLearnerDetails(activeEditLearner.id, editEmail, editName);
      if (res && res.success) {
        // Update user metadata inside local tickets state for consistency
        setTickets(prev =>
          prev.map(t =>
            t.user_id === activeEditLearner.id
              ? { ...t, userEmail: editEmail, userFullName: editName }
              : t
          )
        );
        setSuccess(`Learner details updated successfully! Updated email: ${editEmail}`);
        setActiveEditLearner(null);
        setTimeout(() => setSuccess(null), 5000);
      } else if (res && res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update learner details.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleOpenEditModal = (userId: string, currentEmail: string, currentName: string) => {
    setEditEmail(currentEmail);
    setEditName(currentName);
    setActiveEditLearner({ id: userId, email: currentEmail, name: currentName });
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Header and stats */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.4px", marginBottom: 4 }}>
            Support Tickets
          </h1>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            {tickets.length} tickets raised · {openCount} open ticket{openCount !== 1 ? "s" : ""} requiring action.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", background: "white", padding: 4, borderRadius: 10, border: "1px solid var(--line)", gap: 4 }}>
          {(["all", "open", "resolved", "closed"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px", borderRadius: 7, border: "none", fontSize: 12.5, fontWeight: 600,
                background: filter === f ? "var(--navy)" : "transparent",
                color: filter === f ? "white" : "var(--slate)",
                cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s"
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#DC2626" }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#D1FAE5", border: "1px solid #A7F3D0", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#065F46" }}>
          <CheckCircle2 size={16} />
          <span>{success}</span>
        </div>
      )}

      {/* Feed list */}
      {filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, padding: "64px 32px", textAlign: "center", border: "1px solid var(--line)" }}>
          <LifeBuoy size={36} color="var(--muted)" style={{ marginBottom: 14 }} />
          <h2 style={{ fontSize: 17, fontWeight: 600, color: "var(--navy)", marginBottom: 6 }}>No tickets found</h2>
          <p style={{ fontSize: 13, color: "var(--slate)" }}>
            There are no support tickets in this category.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(ticket => {
            const date = new Date(ticket.created_at).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
            });
            const isPending = pendingId === ticket.id;

            return (
              <div
                key={ticket.id}
                style={{
                  background: "white", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)", padding: "20px 24px"
                }}
              >
                {/* Top header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                  <div>
                    <span style={{
                      display: "inline-flex", padding: "3px 8px", borderRadius: 20, fontSize: 10.5, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6,
                      background: ticket.subject.toLowerCase().includes("email") ? "#EEF2FF" : "#F3F4F6",
                      color: ticket.subject.toLowerCase().includes("email") ? "#4F46E5" : "var(--slate)"
                    }}>
                      {ticket.subject}
                    </span>
                    <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                      {ticket.subject}
                    </h3>
                  </div>

                  <div>
                    {ticket.status === "open" ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", background: "#FEF3C7", color: "#D97706", borderRadius: 20 }}>
                        <Clock size={11} /> Open
                      </span>
                    ) : ticket.status === "resolved" ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", background: "#D1FAE5", color: "#10B981", borderRadius: 20 }}>
                        <CheckCircle2 size={11} /> Resolved
                      </span>
                    ) : (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", background: "#F3F4F6", color: "var(--muted)", borderRadius: 20 }}>
                        Closed
                      </span>
                    )}
                  </div>
                </div>

                {/* Learner Info */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--surface)", padding: "10px 14px", borderRadius: 10, marginBottom: 16, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--slate)" }}>
                    <User size={13} color="var(--muted)" />
                    <span style={{ fontWeight: 500, color: "var(--navy)" }}>{ticket.userFullName}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--slate)" }}>
                    <Mail size={13} color="var(--muted)" />
                    <span>{ticket.userEmail}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--muted)", marginLeft: "auto" }}>
                    <Calendar size={13} />
                    <span>{date}</span>
                  </div>
                </div>

                {/* Ticket Message */}
                <div style={{ background: "#F8FAFC", borderLeft: "3px solid var(--accent)", padding: "14px 16px", borderRadius: "0 8px 8px 0", marginBottom: 20 }}>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--navy)", whiteSpace: "pre-wrap" }}>
                    {ticket.message}
                  </p>
                </div>

                {/* Footer Quick Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 16 }}>
                  {ticket.subject.toLowerCase().includes("email") && ticket.status === "open" && (
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(ticket.user_id, ticket.userEmail, ticket.userFullName)}
                      style={{
                        padding: "7px 14px", background: "#EEF2FF", color: "#4F46E5", border: "1.5px solid #C7D2FE",
                        borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex",
                        alignItems: "center", gap: 6, transition: "background 0.15s"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#E0E7FF")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#EEF2FF")}
                    >
                      <Edit2 size={12} /> Quick Actions: Update Email
                    </button>
                  )}
                  
                  {ticket.status === "open" && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setActiveResolveTicket(ticket)}
                      style={{
                        padding: "7px 14px", background: "var(--green)", color: "white", border: "none",
                        borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: isPending ? "not-allowed" : "pointer",
                        display: "inline-flex", alignItems: "center", gap: 6, transition: "background 0.15s"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#059669")}
                      onMouseLeave={e => (e.currentTarget.style.background = "var(--green)")}
                    >
                      {isPending ? (
                        <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <CheckCircle2 size={12} />
                      )}
                      Resolve Ticket
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Resolve Ticket Modal */}
      {activeResolveTicket && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={() => setActiveResolveTicket(null)}>
          <div style={{ background: "white", borderRadius: 16, padding: 24, width: "100%", maxWidth: 440, boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--navy)" }}>
                Resolve Support Ticket
              </h3>
              <button type="button" onClick={() => setActiveResolveTicket(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleResolve}>
              <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 14, lineHeight: 1.5 }}>
                Marking ticket regarding <strong>"{activeResolveTicket.subject}"</strong> as resolved. You can include a resolution note sent directly to the learner.
              </p>
              
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                  Resolution Note (optional)
                </label>
                <textarea
                  value={resolutionNote}
                  onChange={e => setResolutionNote(e.target.value)}
                  placeholder="e.g. We have successfully updated your email address as requested. You can now log in using your new email address..."
                  rows={4}
                  style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: "9px 12px", fontSize: 13, resize: "vertical", outline: "none", fontFamily: "inherit" }}
                />
              </div>
              
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => setActiveResolveTicket(null)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid var(--line)", background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "var(--slate)" }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 2, padding: 10, borderRadius: 8, border: "none", background: "var(--green)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  Confirm Resolve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Edit Learner Modal */}
      {activeEditLearner && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={() => setActiveEditLearner(null)}>
          <div style={{ background: "white", borderRadius: 16, padding: 24, width: "100%", maxWidth: 440, boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--navy)" }}>
                Update Learner Details
              </h3>
              <button type="button" onClick={() => setActiveEditLearner(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleEditLearner}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "#EEF2FF", border: "1px solid #C7D2FE", borderRadius: 8, marginBottom: 16, fontSize: 12, color: "#4F46E5" }}>
                <ShieldAlert size={14} />
                <span>Modifying these fields directly updates Supabase Auth details.</span>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: "9px 12px", fontSize: 13, outline: "none" }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--slate)", marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: "9px 12px", fontSize: 13, outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => setActiveEditLearner(null)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid var(--line)", background: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "var(--slate)" }}>
                  Cancel
                </button>
                <button type="submit" disabled={editLoading} style={{ flex: 2, padding: 10, borderRadius: 8, border: "none", background: "var(--accent)", color: "white", fontSize: 13, fontWeight: 600, cursor: editLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {editLoading ? (
                    <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                  ) : (
                    "Save & Apply"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
