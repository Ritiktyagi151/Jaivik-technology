import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  name: string;
  logo: string; // slider mein 'imgSrc' banega
  website: string; // slider mein 'href' banega
  featured: boolean;
  status: "active" | "inactive" | "draft";
  order: number;
  createdAt: Date;
}

const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    website: { type: String, required: true },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active", // Default active rakhein taaki turant dikhe
      index: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Client = mongoose.model<IClient>("Client", clientSchema);