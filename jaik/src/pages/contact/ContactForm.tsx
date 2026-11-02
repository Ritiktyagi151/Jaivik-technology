"use client";

import { useState } from "react";
import { sendExternalLead } from "@/lib/externalLead";
import { useRecaptcha } from "@/lib/useRecaptcha";
import "../../styles/enquire-form.css";

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
}

type ContactResponse = {
  success?: boolean;
  message?: string;
  meeting?: {
    meetLink?: string;
  };
};

const ContactForm = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
  const today = new Date().toISOString().split("T")[0];
  const {
    getRecaptchaToken,
    isRecaptchaReady,
    recaptchaError,
    recaptchaRef,
    resetRecaptcha,
  } = useRecaptcha();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    meetLink?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (formData.preferredDate < today) {
        throw new Error("Preferred date cannot be in the past.");
      }
      if (!timePattern.test(formData.preferredTime)) {
        throw new Error("Please enter a valid preferred time.");
      }

      if (!API_BASE) {
        throw new Error("Form service is unavailable. Please try again later.");
      }

      const recaptchaToken = await getRecaptchaToken();
      const payload = {
        ...formData,
        sourcePage: "contact-us",
        recaptchaToken,
      };

      sendExternalLead({
        formName: "contact-form",
        ...formData,
        sourcePage: "contact-us",
      });

      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-recaptcha-token": recaptchaToken,
        },
        body: JSON.stringify(payload),
      });

      let data: ContactResponse | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data?.message || "Message sent successfully!",
          meetLink: data?.meeting?.meetLink,
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
          preferredDate: "",
          preferredTime: "",
          location: "",
        });
      } else {
        throw new Error(data?.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      resetRecaptcha();
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Status Message */}
      {submitStatus && (
        <div
          className={`mb-4 p-3 rounded ${
            submitStatus.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitStatus.message}
          {submitStatus.meetLink && (
            <div className="mt-2">
              Meeting Link:{" "}
              <a
                href={submitStatus.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {submitStatus.meetLink}
              </a>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="relative">
          <div className="input-contain">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
              aria-label="Full Name"
            />
            <label htmlFor="name" className="placeholder-text">
              FULL NAME
            </label>
          </div>
        </div>

        {/* Phone Field */}
        <div className="relative">
          <div className="input-contain">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
              aria-label="Phone Number"
            />
            <label htmlFor="phone" className="placeholder-text">
              PHONE NUMBER
            </label>
          </div>
        </div>

        {/* Email Field */}
        <div className="relative md:col-span-2">
          <div className="input-contain">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
              aria-label="Email Address"
            />
            <label htmlFor="email" className="placeholder-text">
              EMAIL ADDRESS
            </label>
          </div>
        </div>

        {/* Subject Field */}
        <div className="relative md:col-span-2">
          <div className="input-contain">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
              aria-label="Subject"
            />
            <label htmlFor="subject" className="placeholder-text">
              Your Subject
            </label>
          </div>
        </div>

        {/* Message Field */}
        <div className="md:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            autoComplete="off"
            className="w-full border border-white px-4 py-3 bg-transparent text-white focus:border-red-600 focus:outline-none placeholder-white"
          ></textarea>
        </div>

        <div className="relative">
          <div className="input-contain">
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={today}
              required
              aria-label="Preferred Date"
            />
            <label htmlFor="preferredDate" className="placeholder-text">
              PREFERRED DATE
            </label>
          </div>
        </div>

        <div className="relative">
          <div className="input-contain">
            <input
              type="time"
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              aria-label="Preferred Time"
            />
            <label htmlFor="preferredTime" className="placeholder-text">
              PREFERRED TIME
            </label>
          </div>
        </div>

        <div className="relative md:col-span-2">
          <div className="input-contain">
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              aria-label="Location"
            >
              <option value="">PREFERRED LOCATION</option>
              <option value="Google Meet (Online)">Google Meet (Online)</option>
              <option value="Office Visit">Office Visit</option>
              <option value="Phone Call">Phone Call</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <div className="recaptcha-field" ref={recaptchaRef} />
          {!isRecaptchaReady && (
            <p className="recaptcha-status">
              {recaptchaError || "Captcha is loading..."}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-red-600 text-white py-2 px-4 font-semibold hover:scale-90 transition-transform duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
