import { Request, Response } from "express";
import CorporateVideo from "../models/corporateVideo.model";

export const getVideos = async (req: Request, res: Response): Promise<any> => {
  try {
    const videos = await CorporateVideo.find().sort({ createdAt: -1 });
    return res.status(200).json(videos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createVideo = async (req: Request, res: Response): Promise<any> => {
  try {
    const video = new CorporateVideo(req.body);
    const savedVideo = await video.save();
    return res.status(201).json(savedVideo);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateVideo = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedVideo = await CorporateVideo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, 
      { new: true, runValidators: true }
    );
    
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json(updatedVideo);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteVideo = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedVideo = await CorporateVideo.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};