"use client";
import { useActionState, useState } from "react";
import {
  approveApplication,
  rejectApplication,
  suspendTrainer,
  unsuspendTrainer,
  resendApprovalEmail,
  sendAdminMessage,
  type AdminActionState,
} from "@/app/actions/admin";
import {
  CheckCircle2, XCircle, Loader2, X,
  ShieldBan, ShieldCheck, RefreshCw, Mail,
} from "lucide-react";

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
  /* ── action states ─────────────────────────────────────────────────────── */
  const [approveState, approveAction, approving] =
    useActionState<AdminActionState, FormData>(approveApplication, undefined);
  const [rejectState, rejectAction, rejecting] =
    useActionState<AdminActionState, FormData>(rejectApplication, undefined);
  const [suspendState, suspendAction, suspending] =
    useActionState<AdminActionState, FormData>(suspendTrainer, undefined);
  const [unsuspendState, unsuspendAction, unsuspending] =
    useActionState<AdminActionState, FormData>(unsuspendTrainer, undefined);
  const [resendState, resendAction, resending] =
    useActionState<AdminActionState, FormData>(resendApprovalEmail, undefined);
  const [msgState, msgAction, messaging] =
    useActionState<AdminActionState, FormData>(sendAdminMessage, undefined);

  /* ── modal visibility ──────────────────────────────────────────────────── */
  const [showApprove,  setShowApprove]  = useState(false);
  const [showReject,   setShowReject]   = useState(false);
  const [showSuspend,  setShowSuspend]  = useState(false);
  const [showMessage,  setShowMessage]  = useState(false);

  /* ── derived state ─────────────────────────────────────────────────────── */
  const approvedOK = approveState?.success;
  const isPending  = currentStatus === "pending" && !approvedOK && !rejectState?.success;

  const effectivelySuspended = suspendState?.success
    ? true
    : unsuspendState?.success
    ? false
    : isSuspended;

  const actionError =
    approveState?.error ??
    rejectState?.error ??
    suspendState?.error ??
    unsuspendState?.error ??
    resendState?.error ??
    msgState?.error;

  /* ══════════════════════════════════════════════════════════════════════════
     PENDING — Approve / Reject
  ══════════════════════════════════════════════════════════════════════════ */
  if (isPending) {
    return (
      <>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" onClick={() => setShowApprove(true)} style={btn("#059669", "white")}>
            <CheckCircle2 size={15} /> Approve
          </button>
          <button type="button" onClick={() => setShowReject(true)} style={outlineBtn("#DC2626", "#FECACA")}>
            <XCircle size={15} /> Reject
          </button>
        </div>

        {actionError && <ErrorBox msg={actionError} />}

        {showApprove && (
          <Modal title={`Approve ${applicantName}?`} onClose={() => setShowApprove(false)}>
            <p style={subText}>
              An approval email with the KES 2,000 activation payment link will be sent immediately.
            </p>
            <form action={approveAction}>
              <input type="hidden" name="id" value={applicationId} />
              <Field label="Personal message (optional)">
                <textarea name="message" placeholder="Add a note to the trainer…" rows={3} style={textarea} />
              </Field>
              <ModalActions onCancel={() => setShowApprove(false)} loading={approving}
                label="Confirm approval" color="#059669" Icon={CheckCircle2} />
            </form>
          </Modal>
        )}

        {showReject && (
          <Modal title={`Reject ${applicantName}?`} onClose={() => setShowReject(false)}>
            <p style={subText}>A rejection email with your reason will be sent to the trainer.</p>
            <form action={rejectAction}>
              <input type="hidden" name="id" value={applicationId} />
              <Field label={<>Rejection reason <span style={{ color: "#DC2626" }}>*</span></>}>
                <textarea name="reason" required rows={4}
                  placeholder="e.g. Portfolio does not meet our minimum requirements yet…"
                  style={textarea} />
              </Field>
              <ModalActions onCancel={() => setShowReject(false)} loading={rejecting}
                label="Confirm rejection" color="#DC2626" Icon={XCircle} />
            </form>
          </Modal>
        )}

        <style>{spin}</style>
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
     APPROVED — status badge + Suspend / Resend / Message
  ══════════════════════════════════════════════════════════════════════════ */
  if (currentStatus === "approved" || approvedOK) {
    const latestSuccessMsg =
      suspendState?.success   ? suspendState.message   :
      unsuspendState?.success ? unsuspendState.message :
      resendState?.success    ? resendState.message    :
      msgState?.success       ? msgState.message       :
      approveState?.success   ? approveState.message   : null;

    return (
      <>
        {/* Status badge */}
        <div style={{
          padding: "12px 16px", borderRadius: 10, marginBottom: 14,
          background: effectivelySuspended ? "#FFFBEB" : "#F0FDF4",
          border: `1px solid ${effectivelySuspended ? "#FDE68A" : "#BBF7D0"}`,
          display: "flex", alignItems: "flex-start", gap: 8,
        }}>
          {effectivelySuspended
            ? <ShieldBan size={15} color="#D97706" style={{ marginTop: 1, flexShrink: 0 }} />
            : <CheckCircle2 size={15} color="#059669" style={{ marginTop: 1, flexShrink: 0 }} />}
          <span style={{ fontSize: 12.5, fontWeight: 500, color: effectivelySuspended ? "#D97706" : "#059669", lineHeight: 1.5 }}>
            {latestSuccessMsg ?? (effectivelySuspended ? "Trainer is currently suspended" : "Application approved")}
          </span>
        </div>

        {/* Resend Approval Email */}
        <form action={resendAction} style={{ marginBottom: 8 }}>
          <input type="hidden" name="id" value={applicationId} />
          <button type="submit" disabled={resending} style={outlineBtn("#1A6FBF", "#BFDBFE")}>
            {resending
              ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
              : <RefreshCw size={13} />}
            {resending ? "Resending…" : "Resend Approval Email"}
          </button>
        </form>

        {/* Message Trainer */}
        <button type="button" onClick={() => setShowMessage(true)}
          style={{ ...outlineBtn("#7C3AED", "#DDD6FE"), marginBottom: 8 }}>
          <Mail size={13} /> Message Trainer
        </button>

        {/* Suspend / Reinstate */}
        {effectivelySuspended ? (
          <form action={unsuspendAction}>
            <input type="hidden" name="id" value={applicationId} />
            <button type="submit" disabled={unsuspending} style={outlineBtn("#059669", "#A7F3D0")}>
              {unsuspending
                ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
                : <ShieldCheck size={13} />}
              {unsuspending ? "Reinstating…" : "Reinstate Trainer"}
            </button>
          </form>
        ) : (
          <button type="button" onClick={() => setShowSuspend(true)}
            style={outlineBtn("#D97706", "#FDE68A")}>
            <ShieldBan size={13} /> Suspend Trainer
          </button>
        )}

        {actionError && <ErrorBox msg={actionError} />}

        {/* ── Message Modal ── */}
        {showMessage && (
          <Modal title={`Message ${applicantName}`} onClose={() => setShowMessage(false)} wide>
            <p style={subText}>
              The message will be sent from <strong>noreply@ai-trainer-academy.top</strong> with
              your admin email as reply-to, so they can respond directly to you.
            </p>
            <form action={msgAction}>
              <input type="hidden" name="id" value={applicationId} />
              <Field label={<>Subject <span style={{ color: "#DC2626" }}>*</span></>}>
                <input name="subject" required type="text"
                  placeholder="e.g. Action required: update your course schedule"
                  style={{ ...inputBase }} />
              </Field>
              <Field label={<>Message <span style={{ color: "#DC2626" }}>*</span></>}>
                <textarea name="body" required rows={6}
                  placeholder="Write your message here…"
                  style={textarea} />
              </Field>
              <ModalActions onCancel={() => setShowMessage(false)} loading={messaging}
                label="Send Message" color="#1A6FBF" Icon={Mail}
                loadingLabel="Sending…" />
            </form>
          </Modal>
        )}

        {/* ── Suspend Modal ── */}
        {showSuspend && (
          <Modal title={`Suspend ${applicantName}?`} onClose={() => setShowSuspend(false)}>
            <p style={subText}>
              Their profile will be hidden from the directory and they will receive a suspension email.
            </p>
            <form action={suspendAction}>
              <input type="hidden" name="id" value={applicationId} />
              <Field label={<>Reason <span style={{ color: "#D97706" }}>*</span></>}>
                <textarea name="reason" required rows={4}
                  placeholder="e.g. Multiple unresolved learner complaints regarding conduct…"
                  style={textarea} />
              </Field>
              <ModalActions onCancel={() => setShowSuspend(false)} loading={suspending}
                label="Confirm suspension" color="#D97706" Icon={ShieldBan} />
            </form>
          </Modal>
        )}

        <style>{spin}</style>
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════════
     REJECTED — status + Message button (admin may still need to contact them)
  ══════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <div style={{
        padding: "12px 16px", borderRadius: 10, marginBottom: 14,
        background: "#FFF1F2", border: "1px solid #FECACA",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <XCircle size={15} color="#DC2626" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12.5, fontWeight: 500, color: "#DC2626" }}>
          {rejectState?.success ? rejectState.message : "Application rejected"}
        </span>
      </div>

      <button type="button" onClick={() => setShowMessage(true)}
        style={outlineBtn("#7C3AED", "#DDD6FE")}>
        <Mail size={13} /> Message Applicant
      </button>

      {actionError && <ErrorBox msg={actionError} />}

      {showMessage && (
        <Modal title={`Message ${applicantName}`} onClose={() => setShowMessage(false)} wide>
          <p style={subText}>Send a direct email to this applicant.</p>
          <form action={msgAction}>
            <input type="hidden" name="id" value={applicationId} />
            <Field label={<>Subject <span style={{ color: "#DC2626" }}>*</span></>}>
              <input name="subject" required type="text"
                placeholder="e.g. Re: your AI Trainer Academy application"
                style={inputBase} />
            </Field>
            <Field label={<>Message <span style={{ color: "#DC2626" }}>*</span></>}>
              <textarea name="body" required rows={6}
                placeholder="Write your message here…"
                style={textarea} />
            </Field>
            <ModalActions onCancel={() => setShowMessage(false)} loading={messaging}
              label="Send Message" color="#1A6FBF" Icon={Mail}
              loadingLabel="Sending…" />
          </form>
        </Modal>
      )}

      {msgState?.success && (
        <div style={{ marginTop: 8, padding: "10px 12px", background: "#F0FDF4",
          borderRadius: 8, fontSize: 12, color: "#059669", border: "1px solid #BBF7D0" }}>
          ✓ {msgState.message}
        </div>
      )}

      <style>{spin}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Shared sub-components
═══════════════════════════════════════════════════════════════════════════ */
function Modal({
  title, children, onClose, wide = false,
}: {
  title: string; children: React.ReactNode; onClose: () => void; wide?: boolean;
}) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "white", borderRadius: 16, padding: "24px",
        width: "100%", maxWidth: wide ? 520 : 440,
        boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.2px" }}>
            {title}
          </h3>
          <button type="button" onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6,
              display: "flex", color: "var(--muted)" }}>
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600,
        color: "var(--slate)", marginBottom: 6, letterSpacing: "0.1px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ModalActions({
  onCancel, loading, label, loadingLabel, color, Icon,
}: {
  onCancel: () => void;
  loading: boolean;
  label: string;
  loadingLabel?: string;
  color: string;
  Icon: React.ElementType;
}) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
      <button type="button" onClick={onCancel} style={{
        flex: 1, padding: "10px", borderRadius: 8, border: "1px solid var(--line)",
        background: "white", fontSize: 13, cursor: "pointer", color: "var(--slate)",
        fontWeight: 500,
      }}>Cancel</button>
      <button type="submit" disabled={loading} style={{
        flex: 2, padding: "10px", borderRadius: 8, border: "none",
        background: color, color: "white", fontSize: 13, fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
      }}>
        {loading
          ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
          : <Icon size={14} />}
        {loading ? (loadingLabel ?? "Working…") : label}
      </button>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{
      marginTop: 10, padding: "10px 14px", background: "#FEF2F2",
      borderRadius: 8, fontSize: 12, color: "#DC2626",
      border: "1px solid #FECACA", lineHeight: 1.5,
    }}>
      {msg}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Style helpers
═══════════════════════════════════════════════════════════════════════════ */
const subText: React.CSSProperties = {
  fontSize: 13, color: "var(--slate)", marginBottom: 16, lineHeight: 1.6,
};

const textarea: React.CSSProperties = {
  width: "100%", borderRadius: 8, border: "1px solid var(--line)",
  padding: "9px 12px", fontSize: 13, resize: "vertical",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  lineHeight: 1.6,
};

const inputBase: React.CSSProperties = {
  width: "100%", borderRadius: 8, border: "1px solid var(--line)",
  padding: "9px 12px", fontSize: 13,
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};

function btn(bg: string, color: string): React.CSSProperties {
  return {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    padding: "11px", borderRadius: 9, border: "none",
    background: bg, color,
    fontSize: 13.5, fontWeight: 600, cursor: "pointer",
  };
}

function outlineBtn(color: string, borderColor: string): React.CSSProperties {
  return {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    padding: "9px 12px", borderRadius: 9,
    border: `1.5px solid ${borderColor}`,
    background: "white", color,
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "background 0.15s",
  };
}

const spin = `@keyframes spin { to { transform: rotate(360deg); } }`;
