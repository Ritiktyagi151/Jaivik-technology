import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const DEFAULT_RECAPTCHA_SECRET = "6LeHo-csAAAAAG_k_wiYsZtptzG9BLmDT";

const getRecaptchaToken = (req: Request): string => {
  const headerToken = req.get("x-recaptcha-token");
  const bodyToken =
    typeof req.body?.recaptchaToken === "string" ? req.body.recaptchaToken : "";

  return (headerToken || bodyToken || "").trim();
};

export const verifyRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const secret =
      process.env.RECAPTCHA_SECRET_KEY || DEFAULT_RECAPTCHA_SECRET;
    const token = getRecaptchaToken(req);

    if (!secret) {
      logger.error("reCAPTCHA verification failed: secret key is missing.");
      res.status(500).json({
        success: false,
        message: "Captcha verification is not configured.",
      });
      return;
    }

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Please complete captcha verification.",
      });
      return;
    }

    const params = new URLSearchParams({
      secret,
      response: token,
    });

    if (req.ip) {
      params.append("remoteip", req.ip);
    }

    const googleResponse = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const result = (await googleResponse.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    if (!googleResponse.ok || !result.success) {
      logger.warn("reCAPTCHA verification rejected", {
        status: googleResponse.status,
        errors: result["error-codes"],
      });
      res.status(400).json({
        success: false,
        message: "Captcha verification failed. Please try again.",
      });
      return;
    }

    next();
  } catch (error) {
    logger.error("reCAPTCHA verification error:", error);
    res.status(503).json({
      success: false,
      message: "Captcha verification is temporarily unavailable.",
    });
  }
};
