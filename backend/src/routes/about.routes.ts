import express from "express";
import { 
  getAboutContent, 
  updateAboutContent 
} from "../controllers/about.controller";

const router = express.Router();

// GET data
router.get("/", getAboutContent);

// Handle POST request from your frontend Admin Panel
router.post("/", updateAboutContent);

// Optional: PUT support
router.put("/", updateAboutContent);

export default router;