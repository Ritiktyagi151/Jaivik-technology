import { NextResponse } from "next/server";

const EXTERNAL_LEAD_URL =
  "https://leadmanagementsystem-4.onrender.com/api/website-leads/sources/6a1180d5d02b94671372ddeb/submit";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(EXTERNAL_LEAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text().catch(() => "");
      console.error("External lead API failed:", response.status, message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("External lead proxy failed:", error);
    return NextResponse.json({ success: true });
  }
}
