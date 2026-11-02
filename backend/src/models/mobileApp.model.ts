import mongoose, { Document, Schema } from "mongoose";

export interface IFeature {
  title: string;
  description: string;
  icon?: string;
  gradient?: string;
}

export interface IMobileApp extends Document {
  title: string;
  description: string;
  platform: "ios" | "android" | "cross-platform";
  appStoreLink?: string;
  playStoreLink?: string;
  screenshots: string[];
  features: IFeature[];
  technologies: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const featureSchema = new Schema<IFeature>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    icon: { type: String, trim: true },
    gradient: { type: String, trim: true },
  },
  { _id: false }
);

const mobileAppSchema = new Schema<IMobileApp>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    platform: {
      type: String,
      enum: ["ios", "android", "cross-platform"],
      default: "cross-platform",
      required: true,
    },
    appStoreLink: { type: String, trim: true },
    playStoreLink: { type: String, trim: true },
    screenshots: [{ type: String, trim: true }],
    features: [featureSchema],
    technologies: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

mobileAppSchema.index({ platform: 1, isActive: 1, order: 1 });

export default mongoose.model<IMobileApp>("MobileApp", mobileAppSchema);
