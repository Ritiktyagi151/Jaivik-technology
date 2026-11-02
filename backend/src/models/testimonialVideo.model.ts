import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonialVideo extends Document {
  video: string;
  poster: string;
  createdAt: Date;
}

const TestimonialVideoSchema: Schema = new Schema(
  {
    video: { type: String, required: true },
    poster: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonialVideo>("TestimonialVideo", TestimonialVideoSchema);