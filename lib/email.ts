/**
 * lib/email.ts
 * Thin wrapper around Resend for transactional email.
 * Resend is instantiated lazily inside each function so it is never
 * called at build time (avoids "Missing API key" during next build).
 */
import { Resend } from "resend";

const FROM =
  process.env.EMAIL_FROM ??
  "AI Trainer Academy <noreply@aitraineracademy.com>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// ---------------------------------------------------------------------------
// Notify admin inbox when a new trainer applies
// ---------------------------------------------------------------------------
export async function sendNewApplicationNotification({
  applicantName,
  applicantEmail,
  applicationId,
}: {
  applicantName: string;
  applicantEmail: string;
  applicationId: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return; // silently skip if not configured

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const reviewUrl = `${siteUrl}/admin/applications/${applicationId}`;

  await getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New trainer application — ${applicantName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="color:#0D1B2A;margin-bottom:8px">New trainer application</h2>
        <p style="color:#4A6174;margin-bottom:20px">
          <strong>${applicantName}</strong> (${applicantEmail}) just applied to become a trainer on AI Trainer Academy.
        </p>
        <a href="${reviewUrl}"
           style="display:inline-block;background:#1A6FBF;color:white;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Review application →
        </a>
        <p style="color:#7A93A8;font-size:12px;margin-top:24px">Application ID: ${applicationId}</p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Email the trainer when their application is approved
// ---------------------------------------------------------------------------
export async function sendApprovalEmail({
  trainerName,
  trainerEmail,
  message,
}: {
  trainerName: string;
  trainerEmail: string;
  message?: string;
}) {
  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/login`;

  await getResend().emails.send({
    from: FROM,
    to: trainerEmail,
    subject: "🎉 Your AI Trainer Academy application is approved!",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="color:#0D1B2A;margin-bottom:8px">Welcome aboard, ${trainerName}!</h2>
        <p style="color:#4A6174;margin-bottom:12px">
          Your application has been <strong style="color:#059669">approved</strong>.
        </p>
        ${message ? `<blockquote style="border-left:3px solid #1A6FBF;padding:8px 16px;color:#4A6174;margin:16px 0">${message}</blockquote>` : ""}
        <p style="color:#4A6174;margin-bottom:20px">
          <strong>Next steps:</strong><br/>
          1. Log in to your account<br/>
          2. Pay the one-time KSH 2,000 activation fee<br/>
          3. Set up your trainer profile and start earning
        </p>
        <a href="${loginUrl}"
           style="display:inline-block;background:#1A6FBF;color:white;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Log in →
        </a>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Email the trainer when their application is rejected
// ---------------------------------------------------------------------------
export async function sendRejectionEmail({
  trainerName,
  trainerEmail,
  reason,
}: {
  trainerName: string;
  trainerEmail: string;
  reason: string;
}) {
  const reapplyUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/apply`;

  await getResend().emails.send({
    from: FROM,
    to: trainerEmail,
    subject: "Update on your AI Trainer Academy application",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <h2 style="color:#0D1B2A;margin-bottom:8px">Application update, ${trainerName}</h2>
        <p style="color:#4A6174;margin-bottom:12px">
          Thank you for applying. After reviewing your application, we are unable to proceed at this time.
        </p>
        <blockquote style="border-left:3px solid #DC2626;padding:8px 16px;color:#4A6174;margin:16px 0">
          ${reason}
        </blockquote>
        <p style="color:#4A6174;margin-bottom:20px">
          You are welcome to strengthen your portfolio and reapply in 90 days.
        </p>
        <a href="${reapplyUrl}"
           style="display:inline-block;background:#0D1B2A;color:white;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Reapply later →
        </a>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Email the admin when a business custom quote is requested
// ---------------------------------------------------------------------------
export async function sendBusinessQuoteRequest({
  contactName,
  contactEmail,
  companyName,
  teamSize,
  needs,
}: {
  contactName: string;
  contactEmail: string;
  companyName: string;
  teamSize: string;
  needs: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `Business Quote Request — ${companyName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #E2EAF0;border-radius:12px">
        <h2 style="color:#0D1B2A;margin-bottom:16px;border-bottom:1px solid #E2EAF0;padding-bottom:12px">New Business Quote Request</h2>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>Contact Name:</strong> ${contactName}
        </p>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>Contact Email:</strong> ${contactEmail}
        </p>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>Company Name:</strong> ${companyName}
        </p>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>Team Size:</strong> ${teamSize}
        </p>
        <div style="margin-top:20px;padding:16px;background:#F5F8FB;border-radius:8px;border-left:4px solid #1A6FBF">
          <h4 style="margin:0 0 8px;color:#0D1B2A">Custom Training Needs:</h4>
          <p style="margin:0;color:#4A6174;font-size:14px;white-space:pre-wrap">${needs}</p>
        </div>
      </div>
    `,
  });
}

