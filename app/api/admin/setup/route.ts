/**
 * GET /api/admin/setup
 *
 * One-time route to promote the currently logged-in user to admin role.
 * Protected by a secret token from the ADMIN_SETUP_TOKEN env var.
 *
 * Usage:
 *   GET /api/admin/setup?token=YOUR_SECRET_TOKEN
 *
 * DELETE THIS FILE after you've set up your admin account.
 */
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const expectedToken = process.env.ADMIN_SETUP_TOKEN;

  if (!expectedToken) {
    return NextResponse.json({ error: "ADMIN_SETUP_TOKEN env var not set" }, { status: 500 });
  }
  if (token !== expectedToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // Get the currently authenticated user
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Not logged in. Log in first, then visit this URL." }, { status: 401 });
  }

  // Promote to admin using service role client
  const adminDb = createAdminClient();
  const { error: updateError } = await adminDb.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...user.user_metadata,
      role: "admin",
    },
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `✅ ${user.email} is now an admin. Delete /api/admin/setup now.`,
    user_id: user.id,
  });
}
