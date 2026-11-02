import { randomUUID } from "crypto";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { EVENT_TITLE, MEETING_DURATION_MINUTES, addMinutesToTime, formatMeetingSummary } from "@/lib/booking";

export const runtime = "nodejs";

const scheduleSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  guestEmails: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value.map((email) => email.trim()).filter(Boolean);
      return value
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);
    })
    .refine((emails) => emails.every((email) => z.string().email().safeParse(email).success), {
      message: "Invalid guest email.",
    }),
  notes: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  timezone: z.string().min(1),
});

type ScheduleInput = z.infer<typeof scheduleSchema>;

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function getAdminEmail() {
  return env("ADMIN_EMAIL") || env("SMTP_FROM") || env("SMTP_USER");
}

function uniqueAttendees(input: ScheduleInput) {
  const adminEmail = getAdminEmail();
  const attendees = [
    { email: input.email, displayName: input.name },
    ...input.guestEmails.map((email) => ({ email })),
    ...(adminEmail ? [{ email: adminEmail }] : []),
  ];
  const seen = new Set<string>();

  return attendees.filter((attendee) => {
    const email = attendee.email.toLowerCase();
    if (seen.has(email)) return false;
    seen.add(email);
    return true;
  });
}

function buildDateTime(date: string, time: string) {
  return `${date}T${time}:00`;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function buildEmailMessage({
  from,
  to,
  subject,
  text,
  replyTo,
}: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const headers = [
    `From: ${from}`,
    `To: ${to.join(", ")}`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
  ].filter(Boolean);

  return encodeBase64Url(`${headers.join("\r\n")}\r\n\r\n${text}`);
}

async function createCalendarEvent(input: ScheduleInput) {
  const clientId = env("GOOGLE_CLIENT_ID");
  const clientSecret = env("GOOGLE_CLIENT_SECRET");
  const refreshToken = env("GOOGLE_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Calendar OAuth is incomplete. Add GOOGLE_REFRESH_TOKEN and restart the server.");
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: "v3", auth });
  const endTime = addMinutesToTime(input.time, MEETING_DURATION_MINUTES);
  const attendees = uniqueAttendees(input);

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: EVENT_TITLE,
      description: input.notes || "Scheduled from Jaivik Technology.com booking page.",
      start: {
        dateTime: buildDateTime(input.date, input.time),
        timeZone: input.timezone,
      },
      end: {
        dateTime: buildDateTime(input.date, endTime),
        timeZone: input.timezone,
      },
      attendees,
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
    sendUpdates: "all",
  });

  return event.data.hangoutLink || event.data.conferenceData?.entryPoints?.find(
    (entry) => entry.entryPointType === "video"
  )?.uri || "";
}

async function sendConfirmationEmails(input: ScheduleInput, meetLink: string) {
  const smtpHost = env("SMTP_HOST");
  const smtpPort = Number(env("SMTP_PORT") || 587);
  const smtpUser = env("SMTP_USER");
  const smtpPass = env("SMTP_PASS");
  const smtpFrom = env("SMTP_FROM") || smtpUser;
  const adminEmail = getAdminEmail();
  const clientId = env("GOOGLE_CLIENT_ID");
  const clientSecret = env("GOOGLE_CLIENT_SECRET");
  const refreshToken = env("GOOGLE_REFRESH_TOKEN");
  const rejectUnauthorized = env("SMTP_TLS_REJECT_UNAUTHORIZED") !== "false";

  if (!smtpUser || !smtpFrom || !adminEmail) {
    return {
      sent: false,
      reason: "Admin email was not sent because SMTP_USER, SMTP_FROM, or ADMIN_EMAIL is missing.",
    };
  }

  const summary = formatMeetingSummary(input.date, input.time);
  const guestLine = input.guestEmails.length ? `Guests: ${input.guestEmails.join(", ")}` : "";
  const meetLine = meetLink ? `Google Meet: ${meetLink}` : "Google Meet link was not created.";
  const adminText = [
    EVENT_TITLE,
    "",
    `New booking from: ${input.name} <${input.email}>`,
    `When: ${summary}`,
    `Timezone: ${input.timezone}`,
    meetLine,
    guestLine,
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const inviteeText = [
    EVENT_TITLE,
    "",
    `Hi ${input.name}, your meeting has been scheduled.`,
    `When: ${summary}`,
    `Timezone: ${input.timezone}`,
    meetLine,
    guestLine,
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (smtpPass && smtpHost) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      tls: {
        rejectUnauthorized,
      },
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await Promise.all([
      transporter.sendMail({
        from: smtpFrom,
        to: adminEmail,
        subject: `New meeting scheduled: ${input.name}`,
        replyTo: input.email,
        text: adminText,
      }),
      transporter.sendMail({
        from: smtpFrom,
        to: [input.email, ...input.guestEmails],
        subject: `Your ${EVENT_TITLE} is scheduled`,
        text: inviteeText,
      }),
    ]);

    return { sent: true, reason: "" };
  }

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      sent: false,
      reason: "Admin email was not sent because Google OAuth mail credentials are incomplete.",
    };
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret);
  auth.setCredentials({ refresh_token: refreshToken });
  const gmail = google.gmail({ version: "v1", auth });

  await Promise.all([
    gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: buildEmailMessage({
          from: smtpFrom,
          to: [adminEmail],
          subject: `New meeting scheduled: ${input.name}`,
          replyTo: input.email,
          text: adminText,
        }),
      },
    }),
    gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: buildEmailMessage({
          from: smtpFrom,
          to: [input.email, ...input.guestEmails],
          subject: `Your ${EVENT_TITLE} is scheduled`,
          text: inviteeText,
        }),
      },
    }),
  ]);

  return { sent: true, reason: "" };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = scheduleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the booking details and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const warnings: string[] = [];
    let meetLink = "";

    try {
      meetLink = await createCalendarEvent(input);
      if (!meetLink) warnings.push("Google Calendar event was created without a Meet link.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Google Meet creation failed.";
      warnings.push(message);
    }

    try {
      const emailResult = await sendConfirmationEmails(input, meetLink);
      if (!emailResult.sent) warnings.push(emailResult.reason);
    } catch (error) {
      const message =
        error instanceof Error && error.message.toLowerCase().includes("insufficient authentication scopes")
          ? "Admin email was not sent because GOOGLE_REFRESH_TOKEN was created without Gmail Send permission. Open /api/auth/google, approve Gmail permission, replace GOOGLE_REFRESH_TOKEN, and restart the server."
          : error instanceof Error
          ? error.message
          : "Confirmation email failed.";
      warnings.push(message);
    }

    return NextResponse.json({
      success: true,
      meetLink,
      warnings,
    });
  } catch (error) {
    console.error("Schedule meeting failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to schedule this event right now.",
      },
      { status: 500 }
    );
  }
}
