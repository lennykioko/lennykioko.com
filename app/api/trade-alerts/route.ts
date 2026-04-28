import { NextRequest, NextResponse } from "next/server";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    let message: string | undefined;
    let secret: string | undefined;

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        const body = await request.json();
        message = body.message;
        secret = body.secret;
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON body" },
          { status: 400, headers: corsHeaders },
        );
      }
    } else {
      message = await request.text();
    }

    // Allow secret via URL query param as fallback
    const urlSecret = new URL(request.url).searchParams.get("secret");
    if (urlSecret && !secret) {
      secret = urlSecret;
    }

    // Validate webhook secret
    const webhookSecret = process.env.TRADINGVIEW_WEBHOOK_SECRET;
    if (webhookSecret && secret !== webhookSecret) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid secret" },
        { status: 401, headers: corsHeaders },
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing required field: message" },
        { status: 400, headers: corsHeaders },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram configuration missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500, headers: corsHeaders },
      );
    }

    // Send message to Telegram using query parameters
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${encodeURIComponent(chatId)}&text=${encodeURIComponent(message)}&parse_mode=html`;

    const response = await fetch(telegramUrl, {
      method: "GET",
    });

    const telegramData = await response.json();

    if (!response.ok) {
      console.error("Telegram API error:", telegramData);
      return NextResponse.json(
        { error: "Failed to send Telegram message", details: telegramData },
        { status: 502, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { success: true, data: telegramData },
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error("Error in trade-alerts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders },
    );
  }
}
