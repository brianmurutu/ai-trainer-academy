import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GET /api/binance/query-order?merchantTradeNo=xxx
 *
 * Queries the current status of a Binance Pay order.
 * Called by the polling UI on /pay/crypto/[orderId] every few seconds.
 *
 * Returns: { status: "INITIAL" | "PENDING" | "PAID" | "CANCELED" | "ERROR", ... }
 */

function buildBinanceSignature(
  timestamp: number,
  nonce: string,
  body: string,
  secretKey: string
): string {
  const payload = `${timestamp}\n${nonce}\n${body}\n`;
  return createHmac("sha512", secretKey).update(payload).digest("hex").toUpperCase();
}

export async function GET(request: NextRequest) {
  const merchantTradeNo = request.nextUrl.searchParams.get("merchantTradeNo");

  if (!merchantTradeNo) {
    return NextResponse.json({ error: "Missing merchantTradeNo" }, { status: 400 });
  }

  const apiKey = process.env.BINANCE_PAY_API_KEY;
  const secretKey = process.env.BINANCE_PAY_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return NextResponse.json({ error: "Binance Pay not configured" }, { status: 500 });
  }

  try {
    const timestamp = Date.now();
    const nonce = randomBytes(16).toString("hex").toUpperCase();
    const requestBody = JSON.stringify({ merchantTradeNo });

    const signature = buildBinanceSignature(timestamp, nonce, requestBody, secretKey);

    const binanceRes = await fetch(
      "https://bpay.binanceapi.com/binancepay/openapi/v2/order/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "BinancePay-Timestamp": String(timestamp),
          "BinancePay-Nonce": nonce,
          "BinancePay-Certificate-SN": apiKey,
          "BinancePay-Signature": signature,
        },
        body: requestBody,
      }
    );

    const data = await binanceRes.json();

    if (data.status !== "SUCCESS") {
      return NextResponse.json(
        { error: data.errorMessage ?? "Query failed", code: data.code },
        { status: 400 }
      );
    }

    const order = data.data;

    // Normalize Binance order status → our internal status
    const statusMap: Record<string, string> = {
      INITIAL: "PENDING",
      PENDING: "PENDING",
      PAID: "PAID",
      CANCELED: "CANCELED",
      ERROR: "ERROR",
      REFUNDING: "REFUNDING",
      REFUNDED: "REFUNDED",
      EXPIRED: "EXPIRED",
    };

    const resolvedStatus = statusMap[order.status] ?? order.status;
    if (resolvedStatus === "PAID") {
      try {
        const db = createAdminClient();
        await db
          .from("bookings")
          .update({ status: "confirmed" })
          .eq("binance_trade_no", merchantTradeNo)
          .eq("status", "pending");
      } catch (dbErr) {
        console.error("[Binance query-order] Database update error:", dbErr);
      }
    }

    return NextResponse.json({
      merchantTradeNo: order.merchantTradeNo,
      status: resolvedStatus,
      currency: order.currency,
      orderAmount: order.orderAmount,
      transactionId: order.transactionId,
      openUserId: order.openUserId,
      payerInfo: order.payerInfo,
    });
  } catch (err) {
    console.error("Binance query-order error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
