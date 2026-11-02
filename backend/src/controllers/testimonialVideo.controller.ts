import { Request, Response } from "express";
import TestimonialVideo from "../models/testimonialVideo.model";

// @desc    Get all testimonial videos
// @route   GET /api/testimonial-videos
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await TestimonialVideo.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new testimonial video
// @route   POST /api/testimonial-videos
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { video, poster } = req.body;
    const newTestimonial = new TestimonialVideo({ video, poster });
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonial-videos/:id
export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const updated = await TestimonialVideo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonial-videos/:id
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    await TestimonialVideo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};