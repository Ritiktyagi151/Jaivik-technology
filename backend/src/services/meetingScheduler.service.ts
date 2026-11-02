import { randomUUID } from "crypto";
import { google } from "googleapis";

const DEFAULT_MEETING_DURATION_MINUTES = 30;
const DEFAULT_MEETING_TIME_ZONE = "Asia/Kolkata";

export interface MeetingSlotInput {
  preferredDate: string;
  preferredTime: string;
}

export interface MeetingScheduleInput extends MeetingSlotInput {
  summary: string;
  description: string;
  attendeeEmails: string[];
}

export interface MeetingScheduleResult {
  eventId: string;
  meetLink: string;
  startDateTime: string;
  endDateTime: string;
  timeZone: string;
}

const getEnvOrThrow = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const extractTimeParts = (time: string): { hour: number; minute: number } => {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!match) {
    throw new Error("Preferred time must be in HH:mm format.");
  }
  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
  };
};

const getDateInTimeZone = (date: Date, timeZone: string): string => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
};

export const validateMeetingSlotInput = ({
  preferredDate,
  preferredTime,
}: MeetingSlotInput): void => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(preferredDate)) {
    throw new Error("Preferred date must be in YYYY-MM-DD format.");
  }

  const [year, month, day] = preferredDate.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day
  ) {
    throw new Error("Preferred date is invalid.");
  }

  const { hour, minute } = extractTimeParts(preferredTime);
  const meetingTimeZone =
    process.env.MEETING_TIME_ZONE || DEFAULT_MEETING_TIME_ZONE;

  const now = new Date();
  const todayInMeetingTimeZone = getDateInTimeZone(now, meetingTimeZone);
  if (preferredDate < todayInMeetingTimeZone) {
    throw new Error("Preferred date cannot be in the past.");
  }

  void hour;
  void minute;
};

const buildDateTimeString = (date: string, time: string): string =>
  `${date}T${time}:00`;

const addMinutesToDateTimeString = (
  date: string,
  time: string,
  minutesToAdd: number
): string => {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  utcDate.setUTCMinutes(utcDate.getUTCMinutes() + minutesToAdd);
  const y = utcDate.getUTCFullYear();
  const m = `${utcDate.getUTCMonth() + 1}`.padStart(2, "0");
  const d = `${utcDate.getUTCDate()}`.padStart(2, "0");
  const h = `${utcDate.getUTCHours()}`.padStart(2, "0");
  const min = `${utcDate.getUTCMinutes()}`.padStart(2, "0");
  return `${y}-${m}-${d}T${h}:${min}:00`;
};

export const scheduleGoogleMeet = async (
  input: MeetingScheduleInput
): Promise<MeetingScheduleResult> => {
  validateMeetingSlotInput({
    preferredDate: input.preferredDate,
    preferredTime: input.preferredTime,
  });

  const timeZone = process.env.MEETING_TIME_ZONE || DEFAULT_MEETING_TIME_ZONE;
  const meetingDurationMinutes = Number(
    process.env.MEETING_DURATION_MINUTES || DEFAULT_MEETING_DURATION_MINUTES
  );

  const auth = new google.auth.JWT({
    email: getEnvOrThrow("GOOGLE_CALENDAR_CLIENT_EMAIL"),
    key: getEnvOrThrow("GOOGLE_CALENDAR_PRIVATE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
    subject: process.env.GOOGLE_CALENDAR_IMPERSONATED_USER,
  });

  const calendar = google.calendar({ version: "v3", auth });

  const startDateTime = buildDateTimeString(
    input.preferredDate,
    input.preferredTime
  );
  const endDateTime = addMinutesToDateTimeString(
    input.preferredDate,
    input.preferredTime,
    meetingDurationMinutes
  );

  const eventResponse = await calendar.events.insert({
    calendarId: getEnvOrThrow("GOOGLE_CALENDAR_ID"),
    conferenceDataVersion: 1,
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: startDateTime, timeZone },
      end: { dateTime: endDateTime, timeZone },
      attendees: input.attendeeEmails.map((email) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  const event = eventResponse.data;
  const meetLink = event.hangoutLink ?? "";
  if (!event.id || !meetLink) {
    throw new Error("Google Calendar event was created without a valid Meet link.");
  }

  return {
    eventId: event.id,
    meetLink,
    startDateTime,
    endDateTime,
    timeZone,
  };
};
