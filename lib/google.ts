import { createAdminClient } from "./supabase/admin";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/auth/google/callback`;

/**
 * Generate the Google OAuth authorization URL.
 * Offline access is requested to retrieve a refresh token.
 */
export function getGoogleAuthUrl(state: string, origin?: string): string {
  if (!CLIENT_ID) {
    throw new Error("Missing GOOGLE_CLIENT_ID environment variable.");
  }

  const redirectUri = origin ? `${origin}/api/auth/google/callback` : REDIRECT_URI;
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: redirectUri,
    client_id: CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent", // Force Google to show consent screen to ensure refresh token is returned
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/userinfo.email"
    ].join(" "),
    state: state
  };

  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}

/**
 * Exchange an OAuth authorization code for Google access and refresh tokens.
 */
export async function exchangeCodeForTokens(code: string, origin?: string): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
}> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing Google Client credentials in environment variables.");
  }

  const redirectUri = origin ? `${origin}/api/auth/google/callback` : REDIRECT_URI;
  const url = "https://oauth2.googleapis.com/token";
  const body = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: "authorization_code"
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString()
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    console.error("[exchangeCodeForTokens] Google API Error:", data);
    throw new Error(data.error_description || data.error || "Failed to exchange authorization code.");
  }

  const expiresAt = new Date(Date.now() + (data.expires_in || 3600) * 1000).toISOString();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token, // might be undefined if not first consent
    expiresAt
  };
}

/**
 * Refresh an expired access token using the refresh token.
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  expiresAt: string;
}> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("Missing Google Client credentials in environment variables.");
  }

  const url = "https://oauth2.googleapis.com/token";
  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token"
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString()
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    console.error("[refreshAccessToken] Google API Error:", data);
    throw new Error(data.error_description || data.error || "Failed to refresh Google access token.");
  }

  const expiresAt = new Date(Date.now() + (data.expires_in || 3600) * 1000).toISOString();

  return {
    accessToken: data.access_token,
    expiresAt
  };
}

/**
 * Retrieve a valid Google Access Token for a trainer.
 * Automatically handles token refreshing if the active one has expired.
 */
export async function getValidTrainerToken(trainerId: string): Promise<string | null> {
  const db = createAdminClient();

  const { data: trainer, error } = await db
    .from("trainers")
    .select("google_access_token, google_refresh_token, google_token_expires_at, google_calendar_connected")
    .eq("id", trainerId)
    .single();

  if (error || !trainer || !trainer.google_calendar_connected) {
    return null;
  }

  // Check if token is expired or expires in the next 2 minutes
  const expiresAt = trainer.google_token_expires_at ? new Date(trainer.google_token_expires_at) : new Date(0);
  const now = new Date();
  
  if (expiresAt.getTime() - now.getTime() > 120000) {
    return trainer.google_access_token;
  }

  // Token is expired, refresh it
  if (!trainer.google_refresh_token) {
    console.warn(`[getValidTrainerToken] Token is expired but refresh token is missing for trainer: ${trainerId}`);
    return null;
  }

  try {
    const { accessToken, expiresAt: newExpiry } = await refreshAccessToken(trainer.google_refresh_token);
    
    // Save new tokens back to db
    await db
      .from("trainers")
      .update({
        google_access_token: accessToken,
        google_token_expires_at: newExpiry
      })
      .eq("id", trainerId);

    return accessToken;
  } catch (err) {
    console.error(`[getValidTrainerToken] Failed to refresh token for trainer ${trainerId}:`, err);
    return null;
  }
}

/**
 * Create an event on the trainer's Google Calendar with an auto-generated Google Meet conference.
 */
export async function createGoogleMeetEvent({
  accessToken,
  learnerEmail,
  learnerName,
  topic,
  sessionDate,
  durationHrs,
  bookingId
}: {
  accessToken: string;
  learnerEmail: string;
  learnerName: string;
  topic: string;
  sessionDate: string;
  durationHrs: number;
  bookingId: string;
}): Promise<string> {
  const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1";
  
  const startDateTime = new Date(sessionDate);
  const endDateTime = new Date(startDateTime.getTime() + durationHrs * 60 * 60 * 1000);

  const eventBody = {
    summary: `AI Trainer Academy: ${topic}`,
    description: `Consultation session scheduled via AI Trainer Academy.\n\nTrainer Session Reference ID: ${bookingId}\nStudent Name: ${learnerName}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "UTC"
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "UTC"
    },
    attendees: [
      { email: learnerEmail, displayName: learnerName }
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet-${bookingId}-${Date.now()}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet"
        }
      }
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventBody)
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    console.error("[createGoogleMeetEvent] Google Calendar API Error:", data);
    throw new Error(data.error?.message || "Failed to create Google Calendar Event.");
  }

  // Find the Meet conference entrypoint URL
  const conference = data.conferenceData;
  const entryPoints = conference?.entryPoints || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meetEntryPoint = entryPoints.find((ep: any) => ep.entryPointType === "video");
  
  if (!meetEntryPoint?.uri) {
    throw new Error("Google Calendar event created successfully, but no Google Meet link was generated.");
  }

  return meetEntryPoint.uri;
}
