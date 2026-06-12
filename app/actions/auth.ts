"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type AuthState =
  | { error: string; success?: never }
  | { success: true; error?: never }
  | undefined;

// ---------------------------------------------------------------------------
// Turnstile server-side verification helper
// ---------------------------------------------------------------------------
type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: string };

async function verifyTurnstile(token: string | null): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured on the server, allow through.
  if (!secret) return { ok: true };

  // Empty / missing token means the widget failed to load or produce a token.
  // Fail open so real users are not locked out by infrastructure issues.
  if (!token) {
    console.warn("[Turnstile] No token — failing open.");
    return { ok: true };
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      }
    );
    const data = await res.json();

    if (!data.success) {
      const codes: string = (data["error-codes"] ?? []).join(", ") || "unknown";
      console.warn("[Turnstile] Verification failed:", codes);
      return { ok: false, reason: codes };
    }

    return { ok: true };
  } catch (err) {
    // Network error calling Cloudflare — fail open to avoid blocking real users.
    console.warn("[Turnstile] Network error:", err);
    return { ok: true };
  }
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const turnstileToken = formData.get("cf-turnstile-response") as string | null;

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  const check = await verifyTurnstile(turnstileToken);
  if (!check.ok) {
    return { error: `Security check failed (${check.reason}). Please refresh and try again.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = (user?.user_metadata?.role as string) ?? "learner";
  redirect(role === "trainer" ? "/trainer" : "/dashboard");
}

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------
export async function signupAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "learner";
  const turnstileToken = formData.get("cf-turnstile-response") as string | null;

  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const check = await verifyTurnstile(turnstileToken);
  if (!check.ok) {
    return { error: `Security check failed (${check.reason}). Please refresh and try again.` };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (role === "trainer") {
    redirect("/apply");
  }

  redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// Forgot Password
// ---------------------------------------------------------------------------
export async function forgotPasswordAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Please enter your email address." };
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------
export async function logoutAction(): Promise<never> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
