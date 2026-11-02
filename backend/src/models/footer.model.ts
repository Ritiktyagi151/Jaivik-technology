import mongoose, { Schema, Document } from "mongoose";

export interface Office {
  label: string;
  address: string;
}

export interface FooterDoc extends Document {
  description: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  contacts: {
    offices: Office[];
    email?: string;
    phones: string[];
  };
  copyright: string;
}

const OfficeSchema = new Schema<Office>(
  {
    label: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

const FooterSchema = new Schema<FooterDoc>(
  {
    description: { type: String, required: true },
    socials: {
      facebook: String,
      instagram: String,
      twitter: String,
      youtube: String,
      linkedin: String,
    },
    contacts: {
      offices: [OfficeSchema],
      email: { type: String, default: "" },
      phones: [String],
    },
    copyright: {
      type: String,
      default: "© 2016 All Rights Reserved Jaivik Technology",
    },
  },
  { timestamps: true }
);

export default mongoose.model<FooterDoc>("Footer", FooterSchema);
