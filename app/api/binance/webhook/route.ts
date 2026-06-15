import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateMeetingLinkAndNotify } from "@/app/actions/bookings";

/**
 * POST /api/binance/webhook
 *
 * Receives Binance Pay payment notifications.
 * Verifies the HMAC-SHA512 signature, then records the payment.
 *
 * Binance sends:
 *   Headers: BinancePay-Timestamp, BinancePay-Nonce, BinancePay-Signature, BinancePay-Certificate-SN
 *   Body: { bizType, data: { merchantTradeNo, ... } }
 */

function verifyBinanceSignature(
  timestamp: string,
  nonce: string,
  rawBody: string,
  signature: string,
  secretKey: string
): boolean {
  const payload = `${timestamp}\n${nonce}\n${rawBody}\n`;
  const expected = createHmac("sha512", secretKey)
    .update(payload)
    .digest("hex")
    .toUpperCase();
  return expected === signature.toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.BINANCE_PAY_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ returnCode: "FAIL", returnMessage: "Config error" }, { status: 500 });
    }

    // Read raw body for signature verification
    const rawBody = await request.text();
    const timestamp = request.headers.get("BinancePay-Timestamp") ?? "";
    const nonce = request.headers.get("BinancePay-Nonce") ?? "";
    const signature = request.headers.get("BinancePay-Signature") ?? "";

    // Verify signature
    if (!verifyBinanceSignature(timestamp, nonce, rawBody, signature, secretKey)) {
      console.error("Binance Pay webhook: invalid signature");
      return NextResponse.json(
        { returnCode: "FAIL", returnMessage: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    const bizType: string = event.bizType ?? "";
    const bizStatus: string = event.bizStatus ?? "";

    if (bizType === "PAY" && bizStatus === "PAY_SUCCESS") {
      const payData = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      const merchantTradeNo: string = payData?.merchantTradeNo ?? "";
      const transactionId: string = payData?.transactionId ?? "";
      const currency: string = payData?.currency ?? "USDT";
      const orderAmount: string = payData?.orderAmount ?? "0";

      console.log(`[Binance Pay] Payment success: ${merchantTradeNo}, txId: ${transactionId}, ${orderAmount} ${currency}`);

      const db = createAdminClient();
      // Upsert into bookings using the Binance trade number as a unique key
      const { data: bookingData, error } = await db.from("bookings").upsert(
        {
          binance_trade_no: merchantTradeNo,
          amount_usd: parseFloat(orderAmount),
          currency: currency,
          payment_method: "binance_pay",
          status: "confirmed",
        },
        { onConflict: "binance_trade_no" }
      ).select("id").single();
      if (error) {
        console.error("[Binance webhook] bookings upsert error:", error.message);
      } else {
        console.log(`[Binance Pay] Booking confirmed: ${merchantTradeNo}`);
        if (bookingData?.id) {
          await generateMeetingLinkAndNotify(bookingData.id);
        }
      }
    }

    // Binance Pay requires this exact response body to acknowledge receipt
    return NextResponse.json({ returnCode: "SUCCESS", returnMessage: null });
  } catch (err) {
    console.error("Binance Pay webhook error:", err);
    return NextResponse.json({ returnCode: "FAIL", returnMessage: "Server error" }, { status: 500 });
  }
}
