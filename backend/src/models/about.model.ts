import mongoose, { Schema } from "mongoose";

const aboutSchema = new Schema({
  aboutPage: {
    aboutSection: {
      title: { type: String, default: "" },
      content: [{ type: String }]
    },
    missionVision: {
      mission: {
        title: { type: String, default: "" },
        content: { type: String, default: "" }
      },
      vision: {
        title: { type: String, default: "" },
        content: { type: String, default: "" }
      }
    },
    stats: {
      title: { type: String, default: "Our Impact in Numbers" },
      stats: [{
        value: { type: Number, default: 0 },
        label: { type: String, default: "" },
        dataId: { type: String, default: "" }
      }]
    },
    promoters: [{
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      image: { type: String, default: "" },
      bio: [{ type: String }],
      companies: [{ type: String }],
      additionalInfo: [{ type: String }],
      color: { type: String, default: "from-red-600 to-black" },
      accent: { type: String, default: "red-600" }
    }]
  }
}, { 
  timestamps: true, 
  strict: false // Taaki koi bhi extra field error na de
});

export const About = mongoose.model("About", aboutSchema);