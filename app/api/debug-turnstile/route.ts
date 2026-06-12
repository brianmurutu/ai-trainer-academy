import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/debug-turnstile
 * Temporary diagnostic route — shows the Cloudflare siteverify response
 * so we can see the exact error codes being returned.
 * DELETE THIS FILE once Turnstile is working correctly.
 */
export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return NextResponse.json({ error: "TURNSTILE_SECRET_KEY is not set on the server" }, { status: 500 });
  }

  if (!token) {
    return NextResponse.json({ error: "No token provided in request body" }, { status: 400 });
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    });

    const data = await res.json();

    return NextResponse.json({
      cloudflare_response: data,
      secret_key_prefix: secret.substring(0, 10) + "...",
      token_prefix: token.substring(0, 20) + "...",
    });
  } catch (err) {
    return NextResponse.json({ error: "Fetch to Cloudflare failed", details: String(err) }, { status: 500 });
  }
}
