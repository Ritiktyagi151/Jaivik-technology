import express from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";
import { protect, admin } from "../middleware/auth";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha";
import { contactValidationRules, validate } from "../utils/validation";

const router = express.Router();

// Public
router.post("/", verifyRecaptcha, contactValidationRules(), validate, submitContact);

// Admin protected
router.get("/", protect, admin, getContacts);
router.get("/:id", protect, admin, getContact);
router.put("/:id", protect, admin, updateContact);
router.delete("/:id", protect, admin, moveToTrashBeforeDelete("Contact"));

export default router;
