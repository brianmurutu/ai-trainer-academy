import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes } from "crypto";

/**
 * POST /api/binance/create-order
 *
 * Creates a Binance Pay order and returns a checkout URL + QR code link.
 *
 * Body: { amountUsd, currency, trainerName, sessionTopic, learnerEmail, orderId? }
 *
 * Binance Pay API docs:
 * https://developers.binance.com/docs/binance-pay/api-order-create-v2
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amountUsd,
      currency = "USDT",
      trainerName,
      sessionTopic,
      learnerEmail,
      orderId,
    } = body;

    if (!amountUsd || !trainerName || !sessionTopic) {
      return NextResponse.json(
        { error: "Missing required fields: amountUsd, trainerName, sessionTopic" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BINANCE_PAY_API_KEY;
    const secretKey = process.env.BINANCE_PAY_SECRET_KEY;

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { error: "Binance Pay credentials not configured" },
        { status: 500 }
      );
    }

    const timestamp = Date.now();
    const nonce = randomBytes(16).toString("hex").toUpperCase();
    // Binance Pay uses a merchant-supplied unique order reference
    const merchantTradeNo = orderId || `ATA-${Date.now()}-${randomBytes(4).toString("hex").toUpperCase()}`;

    const requestBody = JSON.stringify({
      env: {
        terminalType: "WEB",
      },
      merchantTradeNo,
      orderAmount: Number(amountUsd).toFixed(2),
      currency,
      description: `AI Trainer Academy — Session with ${trainerName}`,
      goodsDetails: [
        {
          goodsType: "02",           // 02 = digital goods/services
          goodsCategory: "Z000",
          referenceGoodsId: merchantTradeNo,
          goodsName: sessionTopic,
          goodsDetail: `1-on-1 session with ${trainerName}`,
          goodsUnitAmount: {
            currency,
            amount: Number(amountUsd).toFixed(2),
          },
          goodsQuantity: "1",
        },
      ],
      buyer: learnerEmail
        ? {
            buyerName: { firstName: learnerEmail.split("@")[0], lastName: "" },
            buyerEmail: learnerEmail,
          }
        : undefined,
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/pay/crypto/${merchantTradeNo}?status=success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/pay/crypto/${merchantTradeNo}?status=cancelled`,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/binance/webhook`,
    });

    const signature = buildBinanceSignature(timestamp, nonce, requestBody, secretKey);

    const binanceRes = await fetch(
      "https://bpay.binanceapi.com/binancepay/openapi/v2/order",
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
        { error: data.errorMessage ?? "Binance Pay order creation failed", code: data.code },
        { status: 400 }
      );
    }

    return NextResponse.json({
      merchantTradeNo,
      checkoutUrl: data.data.checkoutUrl,
      deeplink: data.data.deeplink,
      qrcodeLink: data.data.qrcodeLink,
      qrContent: data.data.qrContent,
      expireTime: data.data.expireTime,
      universalUrl: data.data.universalUrl,
    });
  } catch (err) {
    console.error("Binance Pay create-order error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
