import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Blog } from "../models/blog.model";
import { Contact } from "../models/contact.model";
import { Service } from "../models/service.model";
import Video from "../models/video.model"; 
import { Review } from "../models/review.model";
import { Client } from "../models/client.model";
import { Career } from "../models/career.model";
import logger from "../utils/logger";

// ✅ 1. Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      userCount, blogCount, contactCount, serviceCount,
      videoCount, testimonialCount, clientCount, careerCount
    ] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Service.countDocuments(),
      Video.countDocuments(),
      Review.countDocuments(),
      Client.countDocuments(),
      Career.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          users: userCount,
          blogs: blogCount,
          contacts: contactCount,
          services: serviceCount,
          videos: videoCount,
          testimonials: testimonialCount,
          clients: clientCount,
          careers: careerCount,
        }
      }
    });
  } catch (error) {
    logger.error("Dashboard stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 2. Get Analytics (Missing function added)
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const topBlogs = await Blog.find().sort({ views: -1 }).limit(5);
    res.json({
      success: true,
      data: { topBlogs }
    });
  } catch (error) {
    logger.error("Analytics error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ 3. Get System Health (Missing function added)
export const getSystemHealth = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({
      success: true,
      data: {
        status: "UP",
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date()
      }
    });
  } catch (error) {
    logger.error("System health error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};