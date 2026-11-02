import { Router } from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import { getVideos, createVideo, updateVideo, deleteVideo } from "../controllers/video.controller";

const router = Router();

router.get("/", getVideos);
router.post("/", createVideo);
router.put("/:id", updateVideo);
router.delete("/:id", moveToTrashBeforeDelete("Video"));

export default router;
