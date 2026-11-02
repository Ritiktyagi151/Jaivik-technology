import { Request, Response } from "express";
import TeamVideo from "../models/teamVideo.model";

// @desc    Get all team videos
// @route   GET /api/team-videos
export const getTeamVideos = async (req: Request, res: Response) => {
  try {
    const data = await TeamVideo.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new team video
// @route   POST /api/team-videos
export const createTeamVideo = async (req: Request, res: Response) => {
  try {
    const { video, poster } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Logic: Agar file upload hui hai toh uska path use karein, warna URL use karein
    let finalVideo = video;
    if (files?.videoFile) {
      finalVideo = `${req.protocol}://${req.get("host")}/uploads/${files.videoFile[0].filename}`;
    }

    let finalPoster = poster;
    if (files?.posterFile) {
      finalPoster = `${req.protocol}://${req.get("host")}/uploads/${files.posterFile[0].filename}`;
    }

    const newTeamVideo = await TeamVideo.create({
      video: finalVideo,
      poster: finalPoster,
    });

    res.status(201).json({ success: true, data: newTeamVideo });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update team video
// @route   PUT /api/team-videos/:id
export const updateTeamVideo = async (req: Request, res: Response) => {
  try {
    const { video, poster } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let updateData: any = {};

    // Video Update Logic
    if (files?.videoFile) {
      updateData.video = `${req.protocol}://${req.get("host")}/uploads/${files.videoFile[0].filename}`;
    } else if (video) {
      updateData.video = video;
    }

    // Poster Update Logic
    if (files?.posterFile) {
      updateData.poster = `${req.protocol}://${req.get("host")}/uploads/${files.posterFile[0].filename}`;
    } else if (poster) {
      updateData.poster = poster;
    }

    const updated = await TeamVideo.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete team video
// @route   DELETE /api/team-videos/:id
export const deleteTeamVideo = async (req: Request, res: Response) => {
  try {
    await TeamVideo.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Team video deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};