import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/paystack/verify?reference=xxx
 *
 * Called after Paystack redirects the user back to the site.
 * Verifies the transaction with Paystack, inserts a confirmed booking
 * in Supabase, then redirects to the dashboard sessions page.
 */
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(
      new URL("/trainers?error=missing_reference", request.nextUrl.origin)
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.redirect(
      new URL("/trainers?error=config_error", request.nextUrl.origin)
    );
  }

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      }
    );

    const body = await paystackRes.json();

    if (!body.status || body.data?.status !== "success") {
      return NextResponse.redirect(
        new URL(
          `/trainers?error=payment_failed&ref=${reference}`,
          request.nextUrl.origin
        )
      );
    }

    const tx = body.data;
    const metadata = tx.metadata ?? {};

    // Amount comes in lowest unit (kobo/pesewas); convert to base currency
    const amountKsh = Math.round((tx.amount ?? 0) / 100);
    const amountUsd = metadata.amount_usd ? parseFloat(metadata.amount_usd) : 0;

    // Write confirmed booking to Supabase
    const db = createAdminClient();
    const { error } = await db.from("bookings").upsert(
      {
        paystack_reference: reference,
        trainer_id: metadata.trainer_id ?? null,
        session_topic: metadata.session_topic ?? null,
        amount_ksh: amountKsh,
        amount_usd: amountUsd,
        payment_method: "paystack",
        status: "confirmed",
      },
      { onConflict: "paystack_reference" }
    );

    if (error) {
      // Log but still redirect — the payment was successful
      console.error("[Paystack verify] bookings upsert error:", error.message);
    } else {
      console.log(`[Paystack verify] Booking confirmed: ${reference}`);
    }

    return NextResponse.redirect(
      new URL(
        `/dashboard/sessions?booked=true&ref=${reference}`,
        request.nextUrl.origin
      )
    );
  } catch (err) {
    console.error("Paystack verify error:", err);
    return NextResponse.redirect(
      new URL("/trainers?error=verify_failed", request.nextUrl.origin)
    );
  }
}
