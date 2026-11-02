import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import multer from "multer";
import path from "path";
import * as controller from "../controllers/website.controller";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", controller.getWebsites);
router.post("/", upload.single("image"), controller.createWebsite);
router.put("/:id", upload.single("image"), controller.updateWebsite);
router.delete("/:id", moveToTrashBeforeDelete("Website"));

export default router;
