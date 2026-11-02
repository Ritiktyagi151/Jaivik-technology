import { Request, Response } from "express";
import Video from "../models/video.model";

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching videos", error });
  }
};

export const createVideo = async (req: Request, res: Response) => {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.status(201).json({ success: true, data: newVideo });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating video", error });
  }
};

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedVideo });
  } catch (error) {
    res.status(400).json({ success: false, message: "Update failed", error });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error });
  }
};