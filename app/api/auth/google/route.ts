import { createClient } from "@/lib/supabase/server";
import { getGoogleAuthUrl } from "@/lib/google";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      return NextResponse.redirect(`${siteUrl}/login?error=unauthorized`);
    }

    // Pass the user ID as state to verify and link on callback
    const authUrl = getGoogleAuthUrl(user.id);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("[Google Redirect GET] error:", error);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    return NextResponse.redirect(`${siteUrl}/trainer/settings?error=oauth_error`);
  }
}
