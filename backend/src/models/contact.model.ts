import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  sourcePage?: string;
  meeting: {
    eventId: string;
    meetLink: string;
    startDateTime: string;
    endDateTime: string;
    timeZone: string;
  };
  emailNotificationStatus: "pending" | "sent" | "failed";
  status: "new" | "read" | "replied" | "closed";
  priority: "low" | "medium" | "high";
  source: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    preferredDate: { type: String, required: true, trim: true },
    preferredTime: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, maxlength: 150 },
    sourcePage: { type: String, trim: true, maxlength: 150, default: "contact-us" },
    meeting: {
      eventId: { type: String, required: true },
      meetLink: { type: String, required: true },
      startDateTime: { type: String, required: true },
      endDateTime: { type: String, required: true },
      timeZone: { type: String, required: true },
    },
    emailNotificationStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    source: { type: String, default: "contact-form" },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
