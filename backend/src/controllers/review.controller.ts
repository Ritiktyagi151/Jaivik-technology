import { Request, Response } from "express";
import { Review } from "../models/review.model";
import logger from "../utils/logger";

const buildReviewPayload = (body: any) => {
  const {
    author,
    fname,
    email,
    company,
    cname,
    text,
    msg,
    stars,
    rating,
  } = body;

  return {
    author: author || fname,
    email,
    company: company || cname,
    text: text || msg,
    stars: Number(stars ?? rating),
  };
};

const migrateLegacyReviews = async () => {
  await Review.updateMany(
    { status: "active" },
    { $set: { status: "approved", source: "admin" } },
    { runValidators: false }
  );
};

export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    await migrateLegacyReviews();
    const reviews = await Review.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    logger.error("Get reviews error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAdminReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    await migrateLegacyReviews();
    const status = String(req.query.status || "all");
    const filter = status === "pending" || status === "approved" ? { status } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    logger.error("Get admin reviews error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
      return;
    }
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { author, email, company, text, stars } = buildReviewPayload(req.body);

    if (!author || !text || !stars) {
      res
        .status(400)
        .json({ success: false, message: "Author, text, and stars are required" });
      return;
    }

    const review = await Review.create({
      author,
      email,
      company,
      text,
      stars,
      status: "pending",
      source: "website",
    });

    res.status(201).json({
      success: true,
      message: "Your review has been submitted and is under review.",
      data: review,
    });
  } catch (error) {
    logger.error("Create review error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createAdminReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { author, email, company, text, stars } = buildReviewPayload(req.body);

    if (!author || !text || !stars) {
      res
        .status(400)
        .json({ success: false, message: "Author, text, and stars are required" });
      return;
    }

    const review = await Review.create({
      author,
      email,
      company,
      text,
      stars,
      status: "approved",
      source: "admin",
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    logger.error("Create admin review error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const approveReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true, runValidators: true }
    );

    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
      return;
    }

    res.json({ success: true, data: review });
  } catch (error) {
    logger.error("Approve review error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ success: false, message: "Review not found" });
      return;
    }
    await review.deleteOne();
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    logger.error("Delete review error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
