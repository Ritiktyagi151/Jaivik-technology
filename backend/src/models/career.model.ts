import mongoose, { Schema, Document } from 'mongoose';

// Job/Career Interface
export interface IJob extends Document { 
  title: string; 
  experience: string; 
}

const JobSchema = new Schema({
    title: { type: String, required: true },
    experience: { type: String, required: true }
}, { timestamps: true });

// Application Interface
export interface IApp extends Document { 
  name: string; 
  email: string; 
  phone: string; 
  position: string; 
  message: string; 
  resumeUrl: string; 
}

const AppSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    message: String,
    resumeUrl: { type: String, required: true }
}, { timestamps: true });

export const Job = mongoose.model<IJob>('Job', JobSchema);
// ✅ ADDED: Career export taaki Dashboard error solve ho jaye
export const Career = Job; 
export const Application = mongoose.model<IApp>('Application', AppSchema);