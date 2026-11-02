import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import {
  createHeroSection,
  getHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection,
} from "../controllers/heroSection.controller";

const router = express.Router();

router.post("/", createHeroSection); // Create
router.get("/", getHeroSections); // Read All
router.get("/:id", getHeroSectionById); // Read One
router.put("/:id", updateHeroSection); // Update
router.delete("/:id", moveToTrashBeforeDelete("HeroSection")); // Delete

export default router;
