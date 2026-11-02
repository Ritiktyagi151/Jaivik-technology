import express from "express";
import { protect, admin } from "../middleware/auth";
import {
  listTrash,
  permanentlyDeleteTrashEntry,
  restoreTrashEntry,
} from "../controllers/trash.controller";

const router = express.Router();
router.use(protect, admin);
router.get("/", listTrash);
router.post("/:id/restore", restoreTrashEntry);
router.delete("/:id", permanentlyDeleteTrashEntry);

export default router;
