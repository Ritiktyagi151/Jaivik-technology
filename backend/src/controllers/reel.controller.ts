import { Request, Response } from "express";
import Reel from "../models/reel.model";

// @desc    Get all reels
// @route   GET /api/reels
export const getAllReels = async (req: Request, res: Response) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.status(200).json(reels);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new reel
// @route   POST /api/reels
export const createReel = async (req: Request, res: Response) => {
  try {
    const { video, poster, title, company } = req.body;
    
    // Agar frontend se direct URLs aa rahe hain
    const newReel = new Reel({
      video,
      poster: poster || undefined,
      title,
      company
    });

    const savedReel = await newReel.save();
    res.status(201).json(savedReel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a reel
// @route   PUT /api/reels/:id
export const updateReel = async (req: Request, res: Response) => {
  try {
    const updatedReel = await Reel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReel);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a reel
// @route   DELETE /api/reels/:id
export const deleteReel = async (req: Request, res: Response) => {
  try {
    await Reel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reel deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
