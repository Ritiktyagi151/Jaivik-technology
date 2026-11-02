import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSection extends Document {
  videoLink: string;
  circleImage: string;
  centerImage: string;
}

const HeroSectionSchema: Schema = new Schema(
  {
    videoLink: { type: String, required: true },
    circleImage: { type: String, required: true },
    centerImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHeroSection>("HeroSection", HeroSectionSchema);
