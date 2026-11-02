import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function getRedirectUri(request: Request) {
  return env("GOOGLE_REDIRECT_URI") || new URL("/api/auth/google/callback", request.url).toString();
}

export async function GET(request: Request) {
  const clientId = env("GOOGLE_CLIENT_ID");
  const clientSecret = env("GOOGLE_CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { message: "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required." },
      { status: 500 }
    );
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret, getRedirectUri(request));
  const url = auth.generateAuthUrl({
    access_type: "offline",
    include_granted_scopes: false,
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/gmail.send",
    ],
  });

  return NextResponse.redirect(url);
}
