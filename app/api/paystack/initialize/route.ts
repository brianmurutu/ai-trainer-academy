import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/paystack/initialize
 *
 * Initializes a Paystack transaction and returns the payment URL.
 * Body: { email, amountKsh, currency, reference, trainerName, sessionTopic, callbackUrl }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      amountKsh,
      amountUsd,
      amount,
      currency = "KES",
      reference,
      trainerId,
      trainerName,
      trainerSlug,
      learnerId,
      sessionTopic,
      sessionDate,
      sessionDurationHrs,
      callbackUrl,
      metadata = {},
    } = body;

    if (!email || !(amount || amountKsh) || !reference) {
      return NextResponse.json(
        { error: "Missing required fields: email, amount/amountKsh, reference" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack secret key not configured" },
        { status: 500 }
      );
    }

    // Paystack expects amount in the lowest currency unit.
    // For KES/USD: amount × 100 (cents/kobo equivalent)
    const amountInLowestUnit = Math.round(Number(amount ?? amountKsh) * 100);

    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInLowestUnit,
          currency,
          reference,
          callback_url: callbackUrl,
          metadata: {
            ...metadata,
            trainer_id: trainerId,
            trainer_name: trainerName,
            trainer_slug: trainerSlug,
            learner_id: learnerId,
            session_topic: sessionTopic,
            session_date: sessionDate,
            session_duration_hrs: sessionDurationHrs,
            amount_usd: amountUsd ? String(amountUsd) : "0",
            amount_ksh: amountKsh ? String(amountKsh) : "0",
            custom_fields: [
              {
                display_name: "Trainer",
                variable_name: "trainer_name",
                value: trainerName,
              },
              {
                display_name: "Session",
                variable_name: "session_topic",
                value: sessionTopic,
              },
              ...(metadata.custom_fields || []),
            ],
          },
        }),
      }
    );

    const data = await paystackRes.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Paystack initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference: data.data.reference,
    });
  } catch (err) {
    console.error("Paystack initialize error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
