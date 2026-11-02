import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { Application, Job } from "../models/career.model";
import logger from "../utils/logger";

const parseBoolean = (value: string | undefined): boolean =>
  value?.toLowerCase() === "true";

const createHrTransporter = () => {
  const user = process.env.HR_EMAIL_USER;
  const pass = process.env.HR_EMAIL_PASS;
  const allowSelfSigned = parseBoolean(process.env.SMTP_ALLOW_SELF_SIGNED);

  if (!user || !pass) {
    throw new Error("HR email credentials are not configured.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    ...(allowSelfSigned ? { tls: { rejectUnauthorized: false } } : {}),
  });
};

const buildAdminEmailBody = (payload: {
  name: string;
  phone: string;
  email: string;
  position: string;
  message: string;
  resumeUrl: string;
}) =>
  [
    "A new career application has been submitted.",
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Position: ${payload.position}`,
    `Message: ${payload.message || "No message provided."}`,
    `Resume URL: ${payload.resumeUrl}`,
  ].join("\n");

const buildApplicantEmailBody = (payload: {
  name: string;
  position: string;
}) =>
  [
    `Hello ${payload.name},`,
    "",
    `Thank you for applying for the ${payload.position} role at Jaivik Technology.`,
    "We have received your application and resume successfully.",
    "Our HR team will review your profile and contact you if your application matches our current requirements.",
    "",
    "Regards,",
    "HR Team",
    "Jaivik Technology",
  ].join("\n");

export const getJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    logger.error("Get jobs error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch jobs." });
  }
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    logger.error("Create job error:", error);
    res.status(500).json({ success: false, message: "Failed to create job." });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      res.status(404).json({ success: false, message: "Job not found." });
      return;
    }

    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    logger.error("Delete job error:", error);
    res.status(500).json({ success: false, message: "Failed to delete job." });
  }
};

export const submitApp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone, email, position, message = "" } = req.body as {
      name?: string;
      phone?: string;
      email?: string;
      position?: string;
      message?: string;
    };

    if (!name || !phone || !email || !position) {
      res.status(400).json({
        success: false,
        message: "Name, phone, email, and position are required.",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Resume upload is required.",
      });
      return;
    }

    const hrMailTo = process.env.HR_MAIL_TO;
    const hrMailFrom = process.env.HR_EMAIL_USER;

    if (!hrMailTo || !hrMailFrom) {
      logger.error("Career submission failed: HR mail configuration is incomplete.");
      res.status(500).json({
        success: false,
        message: "Career email configuration is incomplete.",
      });
      return;
    }

    const applicationPayload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      position: position.trim(),
      message: message.trim(),
      resumeUrl: `/uploads/resumes/${req.file.filename}`,
    };

    // Persist the application for admin review before mail dispatch.
    const application = await Application.create(applicationPayload);
    const hrMailTransporter = createHrTransporter();

    await Promise.all([
      hrMailTransporter.sendMail({
        from: hrMailFrom,
        to: hrMailTo,
        replyTo: applicationPayload.email,
        subject: `New Career Application - ${applicationPayload.position}`,
        text: buildAdminEmailBody(applicationPayload),
        attachments: [
          {
            filename: req.file.originalname,
            path: req.file.path,
            contentType: req.file.mimetype,
          },
        ],
      }),
      hrMailTransporter.sendMail({
        from: hrMailFrom,
        to: applicationPayload.email,
        subject: "Application Received - Jaivik Technology",
        text: buildApplicantEmailBody(applicationPayload),
      }),
    ]);

    res.status(201).json({
      success: true,
      message: "Career application submitted successfully.",
      data: application,
    });
  } catch (error) {
    logger.error("Career application submission failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit career application.",
    });
  }
};

export const getApps = async (_req: Request, res: Response): Promise<void> => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (error) {
    logger.error("Get applications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
};
