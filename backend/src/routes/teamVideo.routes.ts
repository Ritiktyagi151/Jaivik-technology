import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import multer from "multer";
import * as controller from "../controllers/teamVideo.controller";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Multiple fields handling
const teamUpload = upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "posterFile", maxCount: 1 },
]);

router.get("/", controller.getTeamVideos);
router.post("/", teamUpload, controller.createTeamVideo);
router.put("/:id", teamUpload, controller.updateTeamVideo);
router.delete("/:id", moveToTrashBeforeDelete("TeamVideo"));

export default router;
