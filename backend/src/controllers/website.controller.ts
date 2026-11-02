import { Request, Response } from "express";
import Website from "../models/website.model";

// @desc    Get all websites
// @route   GET /api/websites
export const getWebsites = async (req: Request, res: Response) => {
  try {
    const websites = await Website.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: websites });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new website
// @route   POST /api/websites
export const createWebsite = async (req: Request, res: Response) => {
  try {
    const { url, alt, imageSrc } = req.body;
    
    // Check if file is uploaded, otherwise use provided URL
    let finalImage = imageSrc;
    if (req.file) {
      finalImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const newWebsite = await Website.create({
      url,
      alt,
      imageSrc: finalImage,
    });

    res.status(201).json({ success: true, data: newWebsite });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update website
// @route   PUT /api/websites/:id
export const updateWebsite = async (req: Request, res: Response) => {
  try {
    const { url, alt, imageSrc } = req.body;
    let updateData: any = { url, alt };

    if (req.file) {
      updateData.imageSrc = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else if (imageSrc) {
      updateData.imageSrc = imageSrc;
    }

    const updated = await Website.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete website
// @route   DELETE /api/websites/:id
export const deleteWebsite = async (req: Request, res: Response) => {
  try {
    await Website.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Website deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};