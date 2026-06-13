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
  activationUrl,
  message,
}: {
  trainerName: string;
  trainerEmail: string;
  activationUrl: string;
  message?: string;
}) {
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
          1. Pay the one-time KSH 2,000 activation fee to go live on the directory<br/>
          2. Log in and configure your schedule, rates, and active courses
        </p>
        <a href="${activationUrl}"
           style="display:inline-block;background:#059669;color:white;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Pay Activation Fee & Go Live →
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

// ---------------------------------------------------------------------------
// Email the admin when a general contact form inquiry is submitted
// ---------------------------------------------------------------------------
export async function sendContactMessage({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `Contact Inquiry: ${subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #E2EAF0;border-radius:12px">
        <h2 style="color:#0D1B2A;margin-bottom:16px;border-bottom:1px solid #E2EAF0;padding-bottom:12px">New Contact Form Submission</h2>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>From Name:</strong> ${name}
        </p>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>From Email:</strong> ${email}
        </p>
        <p style="color:#1C2B3A;font-size:15px;margin-bottom:8px">
          <strong>Subject:</strong> ${subject}
        </p>
        <div style="margin-top:20px;padding:16px;background:#F5F8FB;border-radius:8px;border-left:4px solid #1A6FBF">
          <h4 style="margin:0 0 8px;color:#0D1B2A">Message Body:</h4>
          <p style="margin:0;color:#4A6174;font-size:14px;white-space:pre-wrap">${message}</p>
        </div>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Email the learner when they purchase/enroll in a course
// ---------------------------------------------------------------------------
export async function sendCoursePurchaseEmail({
  recipientEmail,
  recipientName,
  courseTitle,
  courseLink,
}: {
  recipientEmail: string;
  recipientName: string;
  courseTitle: string;
  courseLink: string;
}) {
  await getResend().emails.send({
    from: FROM,
    to: recipientEmail,
    subject: `🎒 Welcome to your course: ${courseTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #E2EAF0;border-radius:12px">
        <h2 style="color:#0D1B2A;margin-bottom:8px">Hi ${recipientName},</h2>
        <p style="color:#4A6174;font-size:15px;line-height:1.6;margin-bottom:16px">
          Thank you for enrolling in <strong>${courseTitle}</strong> on AI Trainer Academy!
        </p>
        
        <div style="margin-top:20px;padding:16px;background:#F5F8FB;border-radius:8px;border-left:4px solid #1A6FBF;margin-bottom:24px">
          <p style="margin:0;color:#0D1B2A;font-weight:600;font-size:14px">📢 Important Access Information:</p>
          <p style="margin:8px 0 0;color:#4A6174;font-size:13.5px;line-height:1.5">
            Since this course is delivered and managed directly through <strong>Telegram</strong>, you must have an active Telegram account to access the materials, group discussions, and lessons.
          </p>
        </div>

        <p style="color:#4A6174;font-size:15px;line-height:1.6;margin-bottom:24px">
          Click the button below to go to your course page and get started:
        </p>

        <a href="${courseLink}"
           style="display:inline-block;background:#1A6FBF;color:white;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Go to Course Page →
        </a>

        <p style="color:#7A93A8;font-size:12px;margin-top:32px;border-top:1px solid #E2EAF0;padding-top:16px">
          If you have any questions, reply directly to this email. Happy learning!
        </p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Email the trainer when their account is suspended
// ---------------------------------------------------------------------------
export async function sendSuspensionEmail({
  trainerName,
  trainerEmail,
  reason,
}: {
  trainerName: string;
  trainerEmail: string;
  reason: string;
}) {
  const contactUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/contact`;

  await getResend().emails.send({
    from: FROM,
    to: trainerEmail,
    subject: "⚠️ Your AI Trainer Academy account has been suspended",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #E2EAF0;border-radius:12px">
        <h2 style="color:#0D1B2A;margin-bottom:8px">Account suspended, ${trainerName}</h2>
        <p style="color:#4A6174;margin-bottom:12px">
          Your trainer account on AI Trainer Academy has been <strong style="color:#D97706">temporarily suspended</strong> due to a compliance concern.
        </p>
        <blockquote style="border-left:3px solid #D97706;padding:8px 16px;color:#4A6174;margin:16px 0">
          ${reason}
        </blockquote>
        <p style="color:#4A6174;margin-bottom:20px">
          Your profile has been hidden from the trainer directory. If you believe this is a mistake or would like to resolve the issue, please contact our team.
        </p>
        <a href="${contactUrl}"
           style="display:inline-block;background:#D97706;color:white;text-decoration:none;
                  padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
          Contact Support →
        </a>
        <p style="color:#7A93A8;font-size:12px;margin-top:24px">
          AI Trainer Academy compliance team
        </p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Admin → Trainer direct message
// ---------------------------------------------------------------------------
export async function sendAdminMessageEmail({
  trainerName,
  trainerEmail,
  subject,
  body,
}: {
  trainerName: string;
  trainerEmail: string;
  subject: string;
  body: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  await getResend().emails.send({
    from: FROM,
    to: trainerEmail,
    replyTo: process.env.ADMIN_EMAIL ?? undefined,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #E2EAF0;border-radius:12px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #E2EAF0">
          <div style="width:36px;height:36px;background:#0D1B2A;border-radius:9px;display:flex;align-items:center;justify-content:center">
            <span style="color:white;font-size:14px;font-weight:700">AT</span>
          </div>
          <span style="font-size:13px;font-weight:600;color:#0D1B2A">AI Trainer Academy</span>
        </div>
        <h2 style="color:#0D1B2A;font-size:18px;margin-bottom:6px">Hi ${trainerName},</h2>
        <p style="color:#4A6174;font-size:13px;margin-bottom:20px">You have a new message from the AI Trainer Academy team.</p>
        <div style="background:#F5F8FB;border-left:4px solid #1A6FBF;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px">
          <p style="color:#1C2B3A;font-size:14px;line-height:1.75;white-space:pre-wrap;margin:0">${body}</p>
        </div>
        <p style="color:#7A93A8;font-size:12px">
          To reply, simply respond to this email or visit your
          <a href="${siteUrl}/trainer" style="color:#1A6FBF;text-decoration:none">trainer dashboard</a>.
        </p>
        <p style="color:#B0BEC5;font-size:11px;margin-top:20px;border-top:1px solid #E2EAF0;padding-top:12px">
          AI Trainer Academy · You're receiving this because you're a registered trainer.
        </p>
      </div>
    `,
  });
}


