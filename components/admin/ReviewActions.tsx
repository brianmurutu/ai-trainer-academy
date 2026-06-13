"use client";
import { useActionState, useState } from "react";
import {
  approveApplication,
  rejectApplication,
  suspendTrainer,
  unsuspendTrainer,
  type AdminActionState,
} from "@/app/actions/admin";
import { CheckCircle2, XCircle, Loader2, X, ShieldBan, ShieldCheck } from "lucide-react";

type Props = {
  applicationId: string;
  applicantName: string;
  currentStatus: string;
  isSuspended?: boolean;
};

export default function ReviewActions({
  applicationId,
  applicantName,
  currentStatus,
  isSuspended = false,
}: Props) {
  const [approveState, approveAction, approving] = useActionState<AdminActionState, FormData>(
    approveApplication, undefined
  );
  const [rejectState, rejectAction, rejecting] = useActionState<AdminActionState, FormData>(
    rejectApplication, undefined
  );
  const [suspendState, suspendAction, suspending] = useActionState<AdminActionState, FormData>(
    suspendTrainer, undefined
  );
  const [unsuspendState, unsuspendAction, unsuspending] = useActionState<AdminActionState, FormData>(
    unsuspendTrainer, undefined
  );

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal]   = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  const approvedOK = approveState?.success;
  const done = approvedOK || rejectState?.success;
  const isPending = currentStatus === "pending" && !done;

  // Effective suspension status (optimistic: reflect action result immediately)
  const effectivelySuspended = suspendState?.success
    ? true
    : unsuspendState?.success
    ? false
    : isSuspended;

  const errorMsg =
    approveState?.error ??
    rejectState?.error ??
    suspendState?.error ??
    unsuspendState?.error;

  // ── Pending application UI ─────────────────────────────────────────────────
  if (isPending) {
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

        {errorMsg && (
          <div style={{ marginTop: 8, padding: "10px 12px", background: "#FEF2F2", borderRadius: 8, fontSize: 12, color: "#DC2626" }}>
            {errorMsg}
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

  // ── Approved trainer UI (shows status + suspend / reinstate) ───────────────
  if (currentStatus === "approved" || approvedOK) {
    return (
      <>
        {/* Status badge */}
        <div style={{
          padding: "14px 18px", borderRadius: 10,
          background: effectivelySuspended ? "#FEF3C7" : "#D1FAE5",
          border: `1px solid ${effectivelySuspended ? "#FDE68A" : "#A7F3D0"}`,
          display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
        }}>
          {effectivelySuspended
            ? <ShieldBan size={15} color="#D97706" />
            : <CheckCircle2 size={15} color="#059669" />}
          <span style={{ fontSize: 13, fontWeight: 500, color: effectivelySuspended ? "#D97706" : "#059669" }}>
            {suspendState?.success
              ? suspendState.message
              : unsuspendState?.success
              ? unsuspendState.message
              : approveState?.success
              ? approveState.message
              : effectivelySuspended
              ? "Trainer is currently suspended"
              : "Application approved"}
          </span>
        </div>

        {/* Suspend / Reinstate button */}
        {effectivelySuspended ? (
          <form action={unsuspendAction}>
            <input type="hidden" name="id" value={applicationId} />
            <button type="submit" disabled={unsuspending} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              padding: "10px", borderRadius: 9, border: "1.5px solid #A7F3D0",
              background: "white", color: "#059669", fontSize: 13, fontWeight: 600,
              cursor: unsuspending ? "not-allowed" : "pointer",
            }}>
              {unsuspending
                ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                : <ShieldCheck size={14} />}
              {unsuspending ? "Reinstating…" : "Reinstate Trainer"}
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => setShowSuspendModal(true)} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            padding: "10px", borderRadius: 9, border: "1.5px solid #FDE68A",
            background: "white", color: "#D97706", fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            <ShieldBan size={14} /> Suspend Trainer
          </button>
        )}

        {errorMsg && (
          <div style={{ marginTop: 8, padding: "10px 12px", background: "#FEF2F2", borderRadius: 8, fontSize: 12, color: "#DC2626" }}>
            {errorMsg}
          </div>
        )}

        {/* Suspend Modal */}
        {showSuspendModal && (
          <Modal title={`Suspend ${applicantName}?`} onClose={() => setShowSuspendModal(false)}>
            <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 16 }}>
              Their profile will be hidden from the directory and they will receive an email explaining the reason.
            </p>
            <form action={suspendAction}>
              <input type="hidden" name="id" value={applicationId} />
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--slate)", marginBottom: 6 }}>
                Suspension reason <span style={{ color: "#D97706" }}>*</span>
              </label>
              <textarea name="reason" required placeholder="e.g. Multiple unresolved learner complaints regarding conduct…" rows={4} style={{
                width: "100%", borderRadius: 8, border: "1px solid var(--line)",
                padding: "9px 12px", fontSize: 13, resize: "vertical",
                outline: "none", boxSizing: "border-box", fontFamily: "inherit",
              }} />
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button type="button" onClick={() => setShowSuspendModal(false)} style={{
                  flex: 1, padding: "10px", borderRadius: 8, border: "1px solid var(--line)",
                  background: "white", fontSize: 13, cursor: "pointer", color: "var(--slate)",
                }}>Cancel</button>
                <button type="submit" disabled={suspending} style={{
                  flex: 2, padding: "10px", borderRadius: 8, border: "none",
                  background: "#D97706", color: "white", fontSize: 13, fontWeight: 600,
                  cursor: suspending ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                }}>
                  {suspending ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <ShieldBan size={14} />}
                  {suspending ? "Suspending…" : "Confirm suspension"}
                </button>
              </div>
            </form>
          </Modal>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </>
    );
  }

  // ── Rejected application UI ────────────────────────────────────────────────
  return (
    <div style={{
      padding: "14px 18px", borderRadius: 10,
      background: "#FEE2E2", border: "1px solid #FECACA",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <XCircle size={15} color="#DC2626" />
      <span style={{ fontSize: 13, fontWeight: 500, color: "#DC2626" }}>
        {rejectState?.success ? rejectState.message : "Application rejected"}
      </span>
    </div>
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
