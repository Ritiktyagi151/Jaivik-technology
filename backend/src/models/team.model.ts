import mongoose, { Document, Schema } from "mongoose";

export interface ITeam extends Document {
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  linkedin: string;
  twitter: string;
  github: string;
  skills: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    image: {
      type: String,
      required: [true, "Profile image is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    skills: [{
      type: String,
      trim: true,
      maxlength: [50, "Skill name cannot exceed 50 characters"],
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
teamSchema.index({ isActive: 1, order: 1 });

export default mongoose.model<ITeam>("Team", teamSchema);
