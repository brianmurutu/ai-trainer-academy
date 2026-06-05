"use client";
import { useActionState, useState } from "react";
import { approveApplication, rejectApplication, type AdminActionState } from "@/app/actions/admin";
import { CheckCircle2, XCircle, Loader2, X } from "lucide-react";

type Props = {
  applicationId: string;
  applicantName: string;
  currentStatus: string;
};

export default function ReviewActions({ applicationId, applicantName, currentStatus }: Props) {
  const [approveState, approveAction, approving] = useActionState<AdminActionState, FormData>(
    approveApplication, undefined
  );
  const [rejectState, rejectAction, rejecting] = useActionState<AdminActionState, FormData>(
    rejectApplication, undefined
  );

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const done = approveState?.success || rejectState?.success;
  const isPending = currentStatus === "pending" && !done;

  if (!isPending) {
    return (
      <div style={{
        padding: "14px 18px", borderRadius: 10,
        background: currentStatus === "approved" || approveState?.success ? "#D1FAE5" : "#FEE2E2",
        border: `1px solid ${currentStatus === "approved" || approveState?.success ? "#A7F3D0" : "#FECACA"}`,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {currentStatus === "approved" || approveState?.success
          ? <CheckCircle2 size={15} color="#059669" />
          : <XCircle size={15} color="#DC2626" />}
        <span style={{ fontSize: 13, fontWeight: 500, color: currentStatus === "approved" || approveState?.success ? "#059669" : "#DC2626" }}>
          {approveState?.success ? approveState.message : rejectState?.success ? rejectState.message : `Application ${currentStatus}`}
        </span>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <button type="button" onClick={() => setShowApproveModal(true)} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          padding: "11px", borderRadius: 9, border: "none",
          background: "#059669", color: "white",
          fontSize: 13.5, fontWeight: 600, cursor: "pointer",
        }}>
          <CheckCircle2 size={15} /> Approve
        </button>
        <button type="button" onClick={() => setShowRejectModal(true)} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          padding: "11px", borderRadius: 9,
          border: "1.5px solid #FECACA",
          background: "white", color: "#DC2626",
          fontSize: 13.5, fontWeight: 600, cursor: "pointer",
        }}>
          <XCircle size={15} /> Reject
        </button>
      </div>

      {/* Error display */}
      {(approveState?.error || rejectState?.error) && (
        <div style={{ marginTop: 8, padding: "10px 12px", background: "#FEF2F2", borderRadius: 8, fontSize: 12, color: "#DC2626" }}>
          {approveState?.error ?? rejectState?.error}
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <Modal title={`Approve ${applicantName}?`} onClose={() => setShowApproveModal(false)}>
          <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 16 }}>
            An approval email will be sent to the trainer with instructions to pay the activation fee and set up their profile.
          </p>
          <form action={approveAction}>
            <input type="hidden" name="id" value={applicationId} />
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--slate)", marginBottom: 6 }}>
              Personal message (optional)
            </label>
            <textarea name="message" placeholder="Add a note to the trainer…" rows={3} style={{
              width: "100%", borderRadius: 8, border: "1px solid var(--line)",
              padding: "9px 12px", fontSize: 13, resize: "vertical",
              outline: "none", boxSizing: "border-box", fontFamily: "inherit",
            }} />
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button type="button" onClick={() => setShowApproveModal(false)} style={{
                flex: 1, padding: "10px", borderRadius: 8, border: "1px solid var(--line)",
                background: "white", fontSize: 13, cursor: "pointer", color: "var(--slate)",
              }}>Cancel</button>
              <button type="submit" disabled={approving} style={{
                flex: 2, padding: "10px", borderRadius: 8, border: "none",
                background: "#059669", color: "white", fontSize: 13, fontWeight: 600,
                cursor: approving ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}>
                {approving ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <CheckCircle2 size={14} />}
                {approving ? "Approving…" : "Confirm approval"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <Modal title={`Reject ${applicantName}?`} onClose={() => setShowRejectModal(false)}>
          <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 16 }}>
            A rejection email with your reason will be sent to the trainer.
          </p>
          <form action={rejectAction}>
            <input type="hidden" name="id" value={applicationId} />
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--slate)", marginBottom: 6 }}>
              Rejection reason <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <textarea name="reason" required placeholder="e.g. Portfolio does not meet our minimum requirements yet…" rows={4} style={{
              width: "100%", borderRadius: 8, border: "1px solid var(--line)",
              padding: "9px 12px", fontSize: 13, resize: "vertical",
              outline: "none", boxSizing: "border-box", fontFamily: "inherit",
            }} />
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button type="button" onClick={() => setShowRejectModal(false)} style={{
                flex: 1, padding: "10px", borderRadius: 8, border: "1px solid var(--line)",
                background: "white", fontSize: 13, cursor: "pointer", color: "var(--slate)",
              }}>Cancel</button>
              <button type="submit" disabled={rejecting} style={{
                flex: 2, padding: "10px", borderRadius: 8, border: "none",
                background: "#DC2626", color: "white", fontSize: 13, fontWeight: 600,
                cursor: rejecting ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}>
                {rejecting ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <XCircle size={14} />}
                {rejecting ? "Sending…" : "Confirm rejection"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: "white", borderRadius: 16, padding: "24px",
        width: "100%", maxWidth: 440,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--navy)" }}>{title}</h3>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
            <X size={16} color="var(--muted)" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
