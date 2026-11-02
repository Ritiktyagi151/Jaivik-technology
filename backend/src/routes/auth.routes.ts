import express from "express";
import { register, login, getMe, logout, forgotPassword, resetPasswordOTP } from "../controllers/auth.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); // NEW
router.post("/reset-password", resetPasswordOTP); // NEW

router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;