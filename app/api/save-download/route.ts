import { NextRequest, NextResponse } from "next/server";
import { googleSheetsService } from "@/lib/googleSheets";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, resource, downloadUrl, timestamp, secret } = body;

    // Check backend secret first
    const backendSecret = process.env.BACKEND_SECRET;
    if (!secret || secret !== backendSecret) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid secret" },
        { status: 401, headers: corsHeaders },
      );
    }

    // Validate required fields
    if (!email || !resource || !downloadUrl || !timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Save to Google Sheets
    const success = await googleSheetsService.saveDownloadData({
      email,
      resource,
      downloadUrl,
      timestamp,
    });

    if (success) {
      return NextResponse.json(
        { message: "Download data saved successfully" },
        { status: 200, headers: corsHeaders },
      );
    } else {
      return NextResponse.json(
        { error: "Failed to save download data" },
        { status: 500, headers: corsHeaders },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}
