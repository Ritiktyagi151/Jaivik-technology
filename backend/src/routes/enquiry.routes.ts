import express from "express";
import { protect, admin } from "../middleware/auth";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
} from "../controllers/enquiry.controller";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha";
import { enquiryValidationRules, validate } from "../utils/validation";

const router = express.Router();

// Public
router.post("/", verifyRecaptcha, enquiryValidationRules(), validate, createEnquiry);

// Admin
router.get("/", protect, admin, getEnquiries);
router.get("/:id", protect, admin, getEnquiryById);

export default router;
