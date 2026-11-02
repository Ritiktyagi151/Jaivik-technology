export const COMPANY_NAME = "Jaivik Technology";
export const EVENT_TITLE = "30 Minute Meeting";
export const DEFAULT_TIMEZONE = "Asia/Kolkata";
export const MEETING_DURATION_MINUTES = 30;

export type BookingSelection = {
  date: string;
  time: string;
  timezone: string;
};

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(date);
  candidate.setHours(0, 0, 0, 0);
  return candidate < today;
}

export function formatMonthTitle(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatReadableDate(dateKey: string) {
  return parseDateKey(dateKey).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function timeToLabel(time24: string) {
  const [hourString, minute] = time24.split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute}${suffix}`;
}

export function labelToTime24(label: string) {
  const cleaned = label.trim().toLowerCase();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);

  if (!match) return label;

  let hour = Number(match[1]);
  const minute = match[2];
  const period = match[3];

  if (period === "am" && hour === 12) hour = 0;
  if (period === "pm" && hour !== 12) hour += 12;

  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function addMinutesToTime(time24: string, minutesToAdd: number) {
  const [hour, minute] = time24.split(":").map(Number);
  const total = hour * 60 + minute + minutesToAdd;
  const nextHour = Math.floor(total / 60) % 24;
  const nextMinute = total % 60;
  return `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;
}

export function formatMeetingSummary(dateKey: string, time24: string) {
  const endTime = addMinutesToTime(time24, MEETING_DURATION_MINUTES);
  return `${timeToLabel(time24)} - ${timeToLabel(endTime)}, ${formatReadableDate(dateKey)}`;
}

export function formatShortDate(dateKey: string) {
  const date = parseDateKey(dateKey);
  return `${shortMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function createTimeSlots() {
  const slots: string[] = [];

  for (let minutes = 0; minutes <= 20 * 60; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
  }

  return slots;
}

export function isPastTimeSlot(dateKey: string, time24: string) {
  if (dateKey !== toDateKey(new Date())) return false;

  const now = new Date();
  const [hour, minute] = time24.split(":").map(Number);
  const slot = parseDateKey(dateKey);
  slot.setHours(hour, minute, 0, 0);

  return slot <= now;
}
