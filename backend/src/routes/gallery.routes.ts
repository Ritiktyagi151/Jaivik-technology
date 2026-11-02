import express from "express";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", (req, res) => {
  res.json({ message: "Gallery routes - to be implemented" });
});

// Protected routes (Admin only)
router.post("/", protect, admin, (req, res) => {
  res.json({ message: "Create gallery item - to be implemented" });
});

export default router;
