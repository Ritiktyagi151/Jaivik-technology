import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import { protect, admin } from "../middleware/auth";
import {
  getMobileApps,
  getMobileApp,
  createMobileApp,
  updateMobileApp,
  deleteMobileApp,
  updateMobileAppOrder,
  getFeaturedMobileApps,
} from "../controllers/mobileApp.controller";

const router = express.Router();

// Public
router.get("/", getMobileApps);
router.get("/featured", getFeaturedMobileApps);
router.get("/:id", getMobileApp);

// Admin
router.post("/", protect, admin, createMobileApp);
router.put("/:id", protect, admin, updateMobileApp);
router.delete("/:id", protect, admin, moveToTrashBeforeDelete("MobileApp"));
router.patch("/order", protect, admin, updateMobileAppOrder);

export default router;
