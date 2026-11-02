import { Request, Response } from "express";
import Technology from "../models/technology.model";

// @desc    Get all technologies
// @route   GET /api/technologies
export const getTechnologies = async (req: Request, res: Response) => {
  try {
    const data = await Technology.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create technology
// @route   POST /api/technologies
export const createTechnology = async (req: Request, res: Response) => {
  try {
    const { name, link, mainImage, hoverImage } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // File handling logic
    const mainImgPath = files?.mainImageFile 
      ? `${req.protocol}://${req.get("host")}/uploads/${files.mainImageFile[0].filename}` 
      : mainImage;

    const hoverImgPath = files?.hoverImageFile 
      ? `${req.protocol}://${req.get("host")}/uploads/${files.hoverImageFile[0].filename}` 
      : hoverImage;

    const newTech = await Technology.create({
      name,
      link,
      mainImage: mainImgPath,
      hoverImage: hoverImgPath,
    });

    res.status(201).json({ success: true, data: newTech });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update technology
// @route   PUT /api/technologies/:id
export const updateTechnology = async (req: Request, res: Response) => {
  try {
    const { name, link, mainImage, hoverImage } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let updateData: any = { name, link };

    if (files?.mainImageFile) {
      updateData.mainImage = `${req.protocol}://${req.get("host")}/uploads/${files.mainImageFile[0].filename}`;
    } else if (mainImage) {
      updateData.mainImage = mainImage;
    }

    if (files?.hoverImageFile) {
      updateData.hoverImage = `${req.protocol}://${req.get("host")}/uploads/${files.hoverImageFile[0].filename}`;
    } else if (hoverImage) {
      updateData.hoverImage = hoverImage;
    }

    const updated = await Technology.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete technology
// @route   DELETE /api/technologies/:id
export const deleteTechnology = async (req: Request, res: Response) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Technology removed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};