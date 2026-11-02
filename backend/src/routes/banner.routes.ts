import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import {
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/banner.controller";
// Agar protect/admin middleware nahi banaya hai toh abhi ke liye comment kar sakte hain
// import { protect, admin } from "../middleware/auth"; 

const router = express.Router();

// Public Routes
router.get("/", getBanners); // Line 14 - Yahan error aa raha tha
router.get("/:id", getBanner);

// Protected Routes (Agar middleware ready hai toh protect, admin add karein)
router.post("/", createBanner);
router.put("/:id", updateBanner);
router.delete("/:id", moveToTrashBeforeDelete("Banner"));

export default router;
