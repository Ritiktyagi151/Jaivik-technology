import express, { NextFunction, Request, Response } from "express";
import { moveToTrashBeforeDelete } from "../middleware/trashDelete";
import fs from "fs";
import multer from "multer";
import path from "path";
import {
  createJob,
  deleteJob,
  getApps,
  getJobs,
  submitApp,
} from "../controllers/career.controller";
import { verifyRecaptcha } from "../middleware/verifyRecaptcha";

const router = express.Router();
const resumeUploadDir = path.join(process.cwd(), "uploads", "resumes");
const allowedExtensions = new Set([".pdf", ".doc", ".docx"]);
const maxResumeSize = 5 * 1024 * 1024;

if (!fs.existsSync(resumeUploadDir)) {
  fs.mkdirSync(resumeUploadDir, { recursive: true });
}

const sanitizeFileName = (fileName: string): string =>
  fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, resumeUploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${sanitizeFileName(file.originalname)}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.has(extension)) {
    cb(new Error("Only PDF, DOC, and DOCX resume files are allowed."));
    return;
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxResumeSize,
  },
});

const uploadResume = (req: Request, res: Response, next: NextFunction): void => {
  upload.single("resume")(req, res, (error: unknown) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        message: "Resume file size must not exceed 5MB.",
      });
      return;
    }

    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: "Resume upload failed.",
    });
  });
};

router.get("/jobs", getJobs);
router.post("/jobs", createJob);
router.delete("/jobs/:id", moveToTrashBeforeDelete("Job"));
router.post("/submit", verifyRecaptcha, uploadResume, submitApp);
router.get("/admin/apps", getApps);

export default router;
