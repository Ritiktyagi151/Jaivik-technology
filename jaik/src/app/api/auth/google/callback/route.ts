import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function getRedirectUri(request: Request) {
  return env("GOOGLE_REDIRECT_URI") || new URL("/api/auth/google/callback", request.url).toString();
}

function html(content: string, status = 200) {
  return new NextResponse(content, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const clientId = env("GOOGLE_CLIENT_ID");
  const clientSecret = env("GOOGLE_CLIENT_SECRET");

  if (error) {
    return html(`<h1>Google authorization failed</h1><p>${error}</p>`, 400);
  }

  if (!code || !clientId || !clientSecret) {
    return html("<h1>Missing Google authorization code or OAuth env values.</h1>", 400);
  }

  try {
    const auth = new google.auth.OAuth2(clientId, clientSecret, getRedirectUri(request));
    const { tokens } = await auth.getToken(code);
    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      return html(
        `<h1>No refresh token returned</h1>
        <p>Open <code>/api/auth/google</code> again and approve with the same Google account. If it still does not appear, remove the app access from your Google Account security page and authorize again.</p>`,
        400
      );
    }

    return html(
      `<main style="font-family:Arial,sans-serif;max-width:760px;margin:40px auto;line-height:1.6">
        <h1>Google refresh token generated</h1>
        <p>Add this line to <code>.env.local</code> and restart Next.js:</p>
        <pre style="white-space:pre-wrap;background:#f3f4f6;padding:16px;border-radius:8px">GOOGLE_REFRESH_TOKEN=${refreshToken}</pre>
        <p>Keep this token private.</p>
      </main>`
    );
  } catch (tokenError) {
    const message = tokenError instanceof Error ? tokenError.message : "Unable to get token.";
    return html(`<h1>Unable to get Google token</h1><p>${message}</p>`, 500);
  }
}
