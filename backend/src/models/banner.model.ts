import mongoose, { Document, Schema } from "mongoose";

export interface IBanner extends Document {
  title: string;
  url: string;
  altText: string;
  status: "active" | "locked" | "archived";
}

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    altText: { type: String, default: "" },
    status: { 
      type: String, 
      enum: ["active", "locked", "archived"], 
      default: "active" 
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.model<IBanner>("Banner", bannerSchema);