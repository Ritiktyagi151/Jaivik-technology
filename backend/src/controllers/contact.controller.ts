import { Request, Response } from "express";
import { Contact } from "../models/contact.model";
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

// Submit new contact
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      preferredDate,
      preferredTime,
      location: rawLocation,
      preferredLocation,
      sourcePage,
    } = req.body as {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      preferredDate: string;
      preferredTime: string;
      location?: string;
      preferredLocation?: string;
      sourcePage?: string;
    };
    const location = rawLocation || preferredLocation || "";

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
        summary: `Consultation with ${name}`,
        description: `Subject: ${subject}\nMessage: ${message}`,
        attendeeEmails: [email].filter(Boolean),
      });
    } catch (meetingError) {
      logger.error("Google Meet creation failed for contact:", meetingError);
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

    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      preferredDate,
      preferredTime,
      location,
      sourcePage: sourcePage || "contact-us",
      meeting,
      emailNotificationStatus: "pending" as const,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    };

    const contact = await Contact.create(contactData);

    try {
      await sendMeetingNotifications({
        submissionType: "contact",
        name,
        email,
        phone,
        message,
        subject,
        preferredDate,
        preferredTime,
        location,
        meetLink: meeting.meetLink,
      });
      contact.emailNotificationStatus = "sent";
      await contact.save();
    } catch (emailError) {
      logger.error("Contact email notification failed:", emailError);
      contact.emailNotificationStatus = "failed";
      await contact.save();
    }

    res.status(201).json({
      success: true,
      message: meetingCreationFailed
        ? "Contact submitted. Meeting link is in fallback mode; admin will confirm shortly."
        : "Contact form submitted successfully",
      meeting: {
        date: preferredDate,
        time: preferredTime,
        location,
        meetLink: meeting.meetLink,
      },
      data: contact,
    });
  } catch (error) {
    logger.error("Submit contact error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all contacts (Admin only)
export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    logger.error("Get contacts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single contact
export const getContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ success: false, message: "Not found" });
      return; // ✅ Added return to fix TS7030
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    logger.error("Get contact error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update contact
export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) {
      res.status(404).json({ success: false, message: "Not found" });
      return; // ✅ Added return to fix TS7030
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    logger.error("Update contact error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ success: false, message: "Not found" });
      return; // ✅ Added return to fix TS7030
    }
    await contact.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    logger.error("Delete contact error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
