import mongoose, { Schema, Document } from "mongoose";

export interface IWebsite extends Document {
  url: string;
  imageSrc: string;
  alt: string;
}

const WebsiteSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    imageSrc: { type: String, required: true }, // File path ya URL dono store honge
    alt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWebsite>("Website", WebsiteSchema);