import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/paystack/verify?reference=xxx
 *
 * Called after Paystack redirects the user back to the site.
 * Verifies the transaction and creates the booking record.
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
      }
    );

    const data = await paystackRes.json();

    if (!data.status || data.data?.status !== "success") {
      return NextResponse.redirect(
        new URL(
          `/trainers?error=payment_failed&ref=${reference}`,
          request.nextUrl.origin
        )
      );
    }

    // TODO: Once the bookings table is created in Supabase, insert a row here:
    // const supabase = await createClient();
    // await supabase.from("bookings").insert({ reference, ... })

    // Redirect to the dashboard sessions page with success notice
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
