import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/google";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // This is the user's ID passed from the redirect
  const error = searchParams.get("error");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (error || !code || !state) {
    console.error("[Google Callback GET] OAuth error or missing code/state:", { error, code, state });
    return NextResponse.redirect(`${siteUrl}/trainer/settings?error=google_auth_failed`);
  }

  try {
    // Exchange the code for access/refresh tokens
    const { accessToken, refreshToken, expiresAt } = await exchangeCodeForTokens(code);

    const db = createAdminClient();

    // Verify if trainer record exists
    const { data: trainer } = await db
      .from("trainers")
      .select("id")
      .eq("user_id", state)
      .maybeSingle();

    const updateFields: {
      google_access_token: string;
      google_token_expires_at: string;
      google_calendar_connected: boolean;
      google_refresh_token?: string;
    } = {
      google_access_token: accessToken,
      google_token_expires_at: expiresAt,
      google_calendar_connected: true,
    };

    if (refreshToken) {
      updateFields.google_refresh_token = refreshToken;
    }

    if (trainer) {
      const { error: updateError } = await db
        .from("trainers")
        .update(updateFields)
        .eq("user_id", state);

      if (updateError) {
        throw updateError;
      }
    } else {
      // If the trainer doesn't have a record yet, create one
      // Fetch user metadata from auth users first if needed or just use default name
      const { data: authUser } = await db.auth.admin.getUserById(state);
      const fullName = authUser?.user?.user_metadata?.full_name || "Trainer";
      const slug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const { error: insertError } = await db
        .from("trainers")
        .insert({
          user_id: state,
          full_name: fullName,
          slug,
          ...updateFields,
        });

      if (insertError) {
        throw insertError;
      }
    }

    return NextResponse.redirect(`${siteUrl}/trainer/settings?google_connected=true`);
  } catch (err) {
    console.error("[Google Callback GET] Error during token exchange/save:", err);
    return NextResponse.redirect(`${siteUrl}/trainer/settings?error=token_exchange_failed`);
  }
}
