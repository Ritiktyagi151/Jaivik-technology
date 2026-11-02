import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import multer from "multer";
import path from "path";
import {
  getBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLock,
} from "../controllers/blog.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => { cb(null, `${Date.now()}-${file.originalname}`); },
});

const upload = multer({ storage: storage });

/* ADMIN ROUTES (SABSE PEHLE) */
router.get("/admin", getAllBlogsAdmin); 
router.post("/", upload.single("image"), createBlog);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", moveToTrashBeforeDelete("Blog"));
router.patch("/:id/lock", toggleLock);

/* PUBLIC ROUTES */
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug); // Ise hamesha aakhir mein rakhein

export default router;
