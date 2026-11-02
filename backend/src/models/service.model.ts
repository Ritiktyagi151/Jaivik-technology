import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryImage {
  src: string;
  alt: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  badge?: string;
  link: string;
  mainImg: string;
  galleryImgs: IGalleryImage[];
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, 
    description: { type: String, required: true },
    badge: { type: String },
    link: { type: String, required: true },
    mainImg: { type: String, required: true },
    galleryImgs: [
      {
        src: { type: String, required: true },
        alt: { type: String, default: "Gallery Image" },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Named export: Dashboard aur Controller mein import { Service } use karne ke liye
export const Service = mongoose.model<IService>("Service", ServiceSchema);

// ✅ Optional: Default export add kar rahe hain taaki agar controller mein bina {} ke import ho toh error na aaye
export default Service;

