import { Router } from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/post.controller";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", moveToTrashBeforeDelete("Post"));

export default router;
