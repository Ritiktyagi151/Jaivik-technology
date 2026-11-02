import { Request, Response } from "express";
import { Banner } from "../models/banner.model";

// @desc    Get all banners
export const getBanners = async (req: Request, res: Response): Promise<void> => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ success: true, count: banners.length, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get single banner
export const getBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner not found" });
      return;
    }
    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Create new banner
export const createBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, url, altText, status } = req.body;
    const banner = await Banner.create({ title, url, altText, status });
    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Update banner
export const updateBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner not found" });
      return;
    }
    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Delete banner
export const deleteBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner not found" });
      return;
    }
    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};