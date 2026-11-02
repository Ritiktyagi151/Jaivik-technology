import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  src: string;
  poster: string;
  createdAt: Date;
}

const VideoSchema: Schema = new Schema({
  src: { type: String, required: true },
  poster: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVideo>("Video", VideoSchema);