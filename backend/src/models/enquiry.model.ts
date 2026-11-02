import { Schema, model, Document } from "mongoose";

export interface IEnquiry extends Document {
  fname: string;
  email: string;
  phone: string;
  company: string;
  city: string;
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
  createdBy?: string; // userId (optional)
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    fname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String, required: false, default: "N/A" },
    message: { type: String, required: true },
    preferredDate: { type: String, required: true, trim: true },
    preferredTime: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, maxlength: 150 },
    sourcePage: { type: String, trim: true, maxlength: 150, default: "home-enquiry" },
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
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Enquiry = model<IEnquiry>("Enquiry", enquirySchema);
export default Enquiry;
