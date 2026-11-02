import { Router } from "express";
import { getFooter, saveFooter } from "../controllers/footer.controller";

const router = Router();

// Public: Get Footer Data
router.get("/", getFooter);

// Admin: Save or Update Footer Data
router.post("/", saveFooter);
router.put("/", saveFooter);

export default router;