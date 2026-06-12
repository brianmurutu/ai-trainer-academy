import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/paystack/webhook
 *
 * Receives Paystack event notifications.
 * Validates the HMAC-SHA512 signature, then:
 *   - charge.success  -> status = "confirmed"
 *   - charge.failed   -> status = "failed"
 *
 * Returns HTTP 200 in all cases so Paystack stops retrying.
 */

function verifyPaystackSignature(
  rawBody: string,
  signature: string,
  secretKey: string
): boolean {
  const expected = createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error("[Paystack webhook] PAYSTACK_SECRET_KEY not set");
    return new NextResponse(null, { status: 500 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const signature = request.headers.get("x-paystack-signature") ?? "";

  if (!verifyPaystackSignature(rawBody, signature, secretKey)) {
    console.error("[Paystack webhook] invalid signature -- discarding");
    return new NextResponse(null, { status: 400 });
  }

  let event: { event: string; data: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const db = createAdminClient();
  const reference: string = (event.data?.reference as string) ?? "";
  const eventType: string = event.event ?? "";

  if (eventType === "charge.success" && reference) {
    const metadata = (event.data?.metadata ?? {}) as Record<string, unknown>;
    const amount = typeof event.data?.amount === "number" ? event.data.amount : 0;
    const amountKsh = Math.round(amount / 100);
    const amountUsd = metadata.amount_usd ? parseFloat(metadata.amount_usd as string) : 0;

    const { error } = await db.from("bookings").upsert(
      {
        paystack_reference: reference,
        trainer_id: (metadata.trainer_id as string) ?? null,
        session_topic: (metadata.session_topic as string) ?? null,
        amount_ksh: amountKsh,
        amount_usd: amountUsd,
        payment_method: "paystack",
        status: "confirmed",
      },
      { onConflict: "paystack_reference" }
    );

    if (error) {
      console.error("[Paystack webhook] charge.success upsert error:", error.message);
    } else {
      console.log(`[Paystack webhook] charge.success processed: ${reference}`);
    }
  } else if (eventType === "charge.failed" && reference) {
    const { error } = await db
      .from("bookings")
      .update({ status: "failed" })
      .eq("paystack_reference", reference);

    if (error) {
      console.error("[Paystack webhook] charge.failed update error:", error.message);
    } else {
      console.log(`[Paystack webhook] charge.failed processed: ${reference}`);
    }
  } else {
    console.log(`[Paystack webhook] unhandled event: ${eventType}`);
  }

  return new NextResponse(null, { status: 200 });
}
