import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import { protect, admin } from "../middleware/auth";
import {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  updateTeamMemberOrder,
} from "../controllers/team.controller";

const router = express.Router();

// Public routes
router.get("/", getTeamMembers);
router.get("/:id", getTeamMember);

// Protected routes (Admin only)
router.post("/", protect, admin, createTeamMember);
router.put("/:id", protect, admin, updateTeamMember);
router.delete("/:id", protect, admin, moveToTrashBeforeDelete("Team"));
router.patch("/order", protect, admin, updateTeamMemberOrder);

export default router;
