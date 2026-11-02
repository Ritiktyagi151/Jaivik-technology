import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  imageUrl: string;
  publicId?: string; // Cloudinary delete ke liye optional
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>("Post", PostSchema);