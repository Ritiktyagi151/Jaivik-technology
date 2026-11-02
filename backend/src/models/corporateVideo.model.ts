import mongoose, { Schema, Document } from "mongoose";

export interface ICorporateVideo extends Document {
  label: string;
  videoSrc: string;
  posterSrc: string;
  title: string;
  description: string;
  privacy: "public" | "private" | "unlisted";
  status: "draft" | "published" | "archived";
}

const CorporateVideoSchema: Schema = new Schema(
  {
    label: { type: String, required: true, default: "Featured" },
    videoSrc: { type: String, required: true },
    posterSrc: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    privacy: { type: String, enum: ["public", "private", "unlisted"], default: "public" },
    status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
  },
  { timestamps: true }
);

export default mongoose.model<ICorporateVideo>("CorporateVideo", CorporateVideoSchema);