import mongoose, { Schema, Document } from "mongoose";

export interface ITeamVideo extends Document {
  video: string; // URL or File Path
  poster: string; // URL or File Path
  createdAt: Date;
}

const TeamVideoSchema: Schema = new Schema(
  {
    video: { type: String, required: true },
    poster: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITeamVideo>("TeamVideo", TeamVideoSchema);