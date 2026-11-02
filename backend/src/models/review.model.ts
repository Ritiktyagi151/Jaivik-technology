import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  author: string;
  email?: string;
  company?: string;
  text: string;
  stars: number;
  status: "pending" | "approved";
  source: "website" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    author: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Please add review text"],
      maxlength: [500, "Review cannot be more than 500 characters"],
    },
    stars: {
      type: Number,
      required: [true, "Please add a star rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    source: {
      type: String,
      enum: ["website", "admin"],
      default: "website",
    },
  },
  { timestamps: true }
);

// ✅ Named Export: Dashboard mein import { Review } use karein
export const Review = mongoose.model<IReview>("Review", reviewSchema);
