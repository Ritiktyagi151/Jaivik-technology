import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import multer from "multer";
import * as controller from "../controllers/technology.controller";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Multiple fields handling (Main and Hover images)
const techUpload = upload.fields([
  { name: "mainImageFile", maxCount: 1 },
  { name: "hoverImageFile", maxCount: 1 },
]);

router.get("/", controller.getTechnologies);
router.post("/", techUpload, controller.createTechnology);
router.put("/:id", techUpload, controller.updateTechnology);
router.delete("/:id", moveToTrashBeforeDelete("Technology"));

export default router;
