import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import multer from "multer";
import * as controller from "../controllers/service.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get("/", controller.getServices);
router.post("/", upload.single("mainImgFile"), controller.createService);
router.put("/:id", upload.single("mainImgFile"), controller.updateService);
router.delete("/:id", moveToTrashBeforeDelete("Service"));

export default router;
