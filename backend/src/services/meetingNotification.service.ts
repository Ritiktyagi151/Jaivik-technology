import nodemailer from "nodemailer";

interface MeetingEmailPayload {
  submissionType: "contact" | "enquiry";
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  meetLink: string;
  subject?: string;
  company?: string;
  city?: string;
}

const parseBoolean = (value: string | undefined): boolean =>
  value?.toLowerCase() === "true";

const createTransporter = () => {
  const service = process.env.SMTP_SERVICE;
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
  const secure = parseBoolean(process.env.SMTP_SECURE);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const allowSelfSigned = parseBoolean(process.env.SMTP_ALLOW_SELF_SIGNED);

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured.");
  }

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
      ...(allowSelfSigned ? { tls: { rejectUnauthorized: false } } : {}),
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    ...(allowSelfSigned ? { tls: { rejectUnauthorized: false } } : {}),
  });
};

const formatCommonBody = (payload: MeetingEmailPayload): string =>
  [
    `Meeting Date: ${payload.preferredDate}`,
    `Meeting Time: ${payload.preferredTime}`,
    `Location: ${payload.location}`,
    `Google Meet Link: ${payload.meetLink}`,
  ].join("\n");

export const sendMeetingNotifications = async (
  payload: MeetingEmailPayload
): Promise<void> => {
  const transporter = createTransporter();
  const from =
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER;
  const adminEmail =
    process.env.MAIL_TO ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.EMAIL_USER ||
    process.env.SMTP_USER;

  if (!from) {
    throw new Error("Email from address is not configured.");
  }

  if (!adminEmail) {
    throw new Error("MAIL_TO (or fallback admin email) is not configured.");
  }

  const userMail = {
    from,
    to: payload.email,
    subject: "Your Jaivik Technology Meeting is Confirmed",
    text: [
      `Hello ${payload.name},`,
      "",
      "Your meeting request has been confirmed.",
      formatCommonBody(payload),
      "",
      "Thank you for contacting Jaivik Technology.",
    ].join("\n"),
  };

  const adminMail = {
    from,
    to: adminEmail,
    subject: `New ${payload.submissionType} meeting request: ${payload.name}`,
    text: [
      `User Name: ${payload.name}`,
      `User Email: ${payload.email}`,
      `User Phone: ${payload.phone}`,
      payload.subject ? `Subject: ${payload.subject}` : "",
      payload.company ? `Company: ${payload.company}` : "",
      payload.city ? `City: ${payload.city}` : "",
      `Selected Date: ${payload.preferredDate}`,
      `Selected Time: ${payload.preferredTime}`,
      `Location: ${payload.location}`,
      `Google Meet Link: ${payload.meetLink}`,
      `Message: ${payload.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };

  await Promise.all([transporter.sendMail(userMail), transporter.sendMail(adminMail)]);
};
