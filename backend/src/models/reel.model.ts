import mongoose, { Schema, Document } from "mongoose";

export interface IReel extends Document {
  video: string;
  poster?: string;
  title?: string;
  company?: string;
}

const ReelSchema: Schema = new Schema(
  {
    video: { type: String, required: true }, // URL string
    poster: { type: String }, // Optional poster URL string
    title: { type: String },
    company: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IReel>("Reel", ReelSchema);
