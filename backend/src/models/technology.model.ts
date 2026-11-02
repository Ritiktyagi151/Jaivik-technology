import mongoose, { Schema, Document } from "mongoose";

export interface ITechnology extends Document {
  name: string;
  mainImage: string;
  hoverImage: string;
  link: string;
  createdAt: Date;
}

const TechnologySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    mainImage: { type: String, required: true },
    hoverImage: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITechnology>("Technology", TechnologySchema);