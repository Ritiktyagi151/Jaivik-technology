import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import * as reelController from "../controllers/reel.controller";

const router = express.Router();

router.get("/", reelController.getAllReels);
router.post("/", reelController.createReel);
router.put("/:id", reelController.updateReel);
router.delete("/:id", moveToTrashBeforeDelete("Reel"));

export default router;
