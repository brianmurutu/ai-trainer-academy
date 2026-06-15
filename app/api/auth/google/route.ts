import { createClient } from "@/lib/supabase/server";
import { getGoogleAuthUrl } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      return NextResponse.redirect(`${siteUrl}/login?error=unauthorized`);
    }

    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost ? forwardedHost.split(",")[0].trim() : request.headers.get("host");
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const proto = forwardedProto ? forwardedProto.split(",")[0].trim() : "http";
    const origin = host ? `${proto}://${host}` : request.nextUrl.origin;
    // Pass the user ID as state to verify and link on callback
    const authUrl = getGoogleAuthUrl(user.id, origin);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("[Google Redirect GET] error:", error);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    return NextResponse.redirect(`${siteUrl}/trainer/settings?error=oauth_error`);
  }
}
