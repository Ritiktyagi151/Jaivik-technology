import { Request, Response } from "express";
import Enquiry from "../models/enquiry.model";
import logger from "../utils/logger";
import {
  scheduleGoogleMeet,
  validateMeetingSlotInput,
} from "../services/meetingScheduler.service";
import { sendMeetingNotifications } from "../services/meetingNotification.service";

const buildFallbackMeeting = (preferredDate: string, preferredTime: string) => {
  const timeZone = process.env.MEETING_TIME_ZONE || "Asia/Kolkata";
  const [year, month, day] = preferredDate.split("-").map(Number);
  const [hour, minute] = preferredTime.split(":").map(Number);
  const endDate = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  endDate.setUTCMinutes(endDate.getUTCMinutes() + 30);
  const endHour = `${endDate.getUTCHours()}`.padStart(2, "0");
  const endMinute = `${endDate.getUTCMinutes()}`.padStart(2, "0");
  return {
    eventId: `pending-${Date.now()}`,
    meetLink:
      process.env.DEFAULT_FALLBACK_MEETING_LINK || "https://meet.google.com/new",
    startDateTime: `${preferredDate}T${preferredTime}:00`,
    endDateTime: `${preferredDate}T${endHour}:${endMinute}:00`,
    timeZone,
  };
};

// POST /api/enquiries
export const createEnquiry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      fname,
      name,
      email,
      phone,
      company,
      city,
      message,
      preferredDate,
      preferredTime,
      location: rawLocation,
      preferredLocation,
      preferredMode,
      sourcePage,
    } = req.body as {
      fname: string;
      name?: string;
      email: string;
      phone: string;
      company: string;
      city?: string;
      message: string;
      preferredDate: string;
      preferredTime: string;
      location?: string;
      preferredLocation?: string;
      preferredMode?: string;
      sourcePage?: string;
    };
    const resolvedName = fname || name || "";
    const location = rawLocation || preferredLocation || preferredMode || "";
    const resolvedCity = city || "N/A";

    try {
      validateMeetingSlotInput({ preferredDate, preferredTime });
    } catch (validationError) {
      const errorMessage =
        validationError instanceof Error
          ? validationError.message
          : "Invalid date or time.";
      res.status(400).json({ success: false, message: errorMessage });
      return;
    }

    let meeting;
    let meetingCreationFailed = false;
    try {
      meeting = await scheduleGoogleMeet({
        preferredDate,
        preferredTime,
        summary: `Enquiry call with ${resolvedName}`,
        description: `Company: ${company}\nCity: ${resolvedCity}\nMessage: ${message}`,
        attendeeEmails: [email].filter(Boolean),
      });
    } catch (meetingError) {
      logger.error("Google Meet creation failed for enquiry:", meetingError);
      const requireMeetingScheduling =
        process.env.REQUIRE_MEETING_SCHEDULING === "true";
      if (requireMeetingScheduling) {
        res.status(502).json({
          success: false,
          message:
            "Unable to schedule the meeting right now. Please try again shortly.",
        });
        return;
      }
      meetingCreationFailed = true;
      meeting = buildFallbackMeeting(preferredDate, preferredTime);
    }

    const enquiry = await Enquiry.create({
      fname: resolvedName,
      email,
      phone,
      company,
      city: resolvedCity,
      message,
      preferredDate,
      preferredTime,
      location,
      sourcePage: sourcePage || "home-enquiry",
      meeting,
      emailNotificationStatus: "pending",
      createdBy: (req as any).user?._id || null,
    });

    try {
      await sendMeetingNotifications({
        submissionType: "enquiry",
        name: resolvedName,
        email,
        phone,
        company,
        city: resolvedCity,
        message,
        preferredDate,
        preferredTime,
        location,
        meetLink: meeting.meetLink,
      });
      enquiry.emailNotificationStatus = "sent";
      await enquiry.save();
    } catch (emailError) {
      logger.error("Enquiry email notification failed:", emailError);
      enquiry.emailNotificationStatus = "failed";
      await enquiry.save();
    }

    res.status(201).json({
      success: true,
      message: meetingCreationFailed
        ? "Enquiry submitted. Meeting link is in fallback mode; admin will confirm shortly."
        : "Enquiry submitted successfully",
      meeting: {
        date: preferredDate,
        time: preferredTime,
        location,
        meetLink: meeting.meetLink,
      },
      data: enquiry,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
};

// GET /api/enquiries (Admin only)
export const getEnquiries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
};

// GET /api/enquiries/:id (Admin only)
export const getEnquiryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      res.status(404).json({ success: false, message: "Enquiry not found" });
      return;
    }
    res.json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
};
