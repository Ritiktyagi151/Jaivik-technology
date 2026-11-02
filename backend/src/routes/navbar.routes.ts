// src/routes/navbar.routes.ts
import { Router } from "express";
import { getNavbar, saveNavbar } from "../controllers/navbar.controller";

const router = Router();

// Public
router.get("/", getNavbar);

// Admin (edit navbar)
router.post("/", saveNavbar);

export default router;
