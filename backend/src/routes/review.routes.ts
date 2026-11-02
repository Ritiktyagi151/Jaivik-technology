import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import {
  getReviews,
  getAdminReviews,
  getReview,
  createReview,
  createAdminReview,
  approveReview,
  deleteReview,
} from "../controllers/review.controller";
import { protect, admin } from "../middleware/auth";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha";

const router = express.Router();

// Public
router.get("/", getReviews);
router.get("/approved", getReviews);
router.post("/", verifyRecaptcha, createReview); // anyone can submit review

// Admin
router.get("/admin", protect, admin, getAdminReviews);
router.post("/admin", protect, admin, createAdminReview);
router.patch("/:id/approve", protect, admin, approveReview);
router.delete("/:id", protect, admin, moveToTrashBeforeDelete("Review"));

router.get("/:id", getReview);

export default router;
