"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { navlinks } from "../../configs/navConfigs";
import NavLink from "./NavLink";
import { sendExternalLead } from "@/lib/externalLead";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredDate: string;
  preferredTime: string;
  preferredLocation: string;
  message: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
}

const NavLayerTop = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredDate: "",
    preferredTime: "",
    preferredLocation: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [buttonText, setButtonText] = useState("Send");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const toggleQuotePopup = () => {
    setIsQuotePopupOpen(!isQuotePopupOpen);
    if (!isQuotePopupOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        preferredDate: "",
        preferredTime: "",
        preferredLocation: "",
        message: "",
      });
      setErrors({});
      setButtonText("Send");
    }
  };

  const toggleWhatsAppPopup = () => {
    setIsWhatsAppPopupOpen(!isWhatsAppPopupOpen);
  };

  const validateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    const today = new Date().toISOString().split("T")[0];
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    } else if (formData.preferredDate < today) {
      newErrors.preferredDate = "Preferred date cannot be in the past";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "Preferred time is required";
    } else if (!timePattern.test(formData.preferredTime)) {
      newErrors.preferredTime = "Please enter a valid time";
    }

    if (!formData.preferredLocation.trim()) {
      newErrors.preferredLocation = "Preferred location is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsSubmitting(true);
        setButtonText("Sending...");

        if (!API_BASE) {
          throw new Error("API URL is missing. Please configure NEXT_PUBLIC_API_URL.");
        }
        const payload = {
          fname: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || "N/A",
          city: "N/A",
          message: formData.message || "Quote request from navbar form",
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          location: formData.preferredLocation,
          sourcePage: "navbar-quote",
        };

        sendExternalLead({
          formName: "navbar-quote-form",
          ...payload,
        });

        const response = await fetch(`${API_BASE}/enquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        let data: ApiResponse | null = null;
        try {
          data = (await response.json()) as ApiResponse;
        } catch {
          data = null;
        }

        if (response.ok && data?.success) {
          setNotice({ type: "success", message: "Quote request sent successfully!" });
          setButtonText("Sent!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            preferredDate: "",
            preferredTime: "",
            preferredLocation: "",
            message: "",
          });
          setTimeout(() => {
            setButtonText("Send");
            toggleQuotePopup();
          }, 2000);
        } else {
          throw new Error(data?.message || "Failed to send request");
        }
      } catch (error) {
        console.error("Submission error:", error);
        // Narrow the type of error to safely access message
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.";
        setNotice({ type: "error", message: errorMessage });
        setButtonText("Error!");
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setButtonText("Send"), 2000);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <>
      <div className="bg-main-secondary hidden lg:block font-poppins">
        <div className="mx-auto px-4">
          <div className="flex items-center h-[45px]">
            <div className="flex items-center space-x-1">
              <button
                className="quote-btn relative bg-gray-800 text-white px-2.5 py-1 rounded-md text-xs font-bold transition-transform duration-300 cursor-pointer hover:bg-gray-700 hover:scale-105 uppercase hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                onClick={toggleQuotePopup}
                disabled={isSubmitting}
              >
                <span className="relative z-10">Get a Quote</span>
              </button>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://www.facebook.com/jaikviktechnology"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jaivik Technology on Facebook"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
             <a
             className="text-white px-2.5 py-1 text-sm hover:text-red-500"
             href="https://twitter.com/jaikvik"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Jaivik Technology on X"
             >
              <FaXTwitter aria-hidden="true" />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://www.instagram.com/jaikviktechnology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jaivik Technology on Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                className="text-white px-2.5 py-1 text-sm hover:text-red-500"
                href="https://www.linkedin.com/company/jaikviktechnology/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jaivik Technology on LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <button
                type="button"
                className="text-[#25D366] px-2.5 py-1 text-sm hover:text-red-500"
                onClick={toggleWhatsAppPopup}
                aria-label="Open WhatsApp chat options"
              >
                <FaWhatsapp aria-hidden="true" />
              </button>

              {/* WhatsApp Popup */}
              {isWhatsAppPopupOpen && (
              <div
                id="whatsapp_popup"
                className="popup fixed inset-0 bg-gray-600/60 backdrop-blur-sm z-[1000] flex justify-center items-center"
              >
                <div className="popup-content bg-gradient-to-br from-gray-600 to-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl animate-[slideIn_0.3s_ease-out]">
                  <div className="flex justify-between items-center mb-3">
                    <h6 className="text-lg font-semibold text-gray-900">
                      WhatsApp Chat
                    </h6>
                    <button
                      onClick={toggleWhatsAppPopup}
                      className="text-2xl text-gray-700 hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                  <p className="text-gray-700">Connect with us instantly!</p>
                  <a
                    href="https://wa.me/8874882735"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 text-white text-sm font-medium py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp aria-hidden="true" /> Start Chat
                  </a>
                </div>
              </div>
              )}

              {/* Quote Popup */}
              {isQuotePopupOpen && (
              <div
                id="quote_popup"
                className="popup fixed inset-0 bg-gray-600/60 backdrop-blur-sm z-[1000] flex justify-center items-center"
              >
                <div className="popup-content bg-gradient-to-br from-gray-600 to-gray-100 rounded-xl p-6 w-full max-w-md shadow-2xl animate-[slideIn_0.3s_ease-out]">
                  <div className="flex justify-between items-center mb-4">
                    <h6 className="text-xl font-semibold text-gray-900">
                      Request a Quote
                    </h6>
                    <button
                      onClick={toggleQuotePopup}
                      className="text-2xl text-gray-700 hover:text-red-500"
                      disabled={isSubmitting}
                    >
                      X
                    </button>
                  </div>
                  <form onSubmit={validateForm}>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="name"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.name ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        name="phone"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.phone ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="company"
                        className="form-control w-full px-3 py-2 text-sm border border-gray-900 rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                        id="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        name="preferredDate"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.preferredDate ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        disabled={isSubmitting}
                      />
                      {errors.preferredDate && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.preferredDate}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="time"
                        name="preferredTime"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.preferredTime ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.preferredTime && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.preferredTime}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <select
                        name="preferredLocation"
                        className={`form-control w-full px-3 py-2 text-sm border ${
                          errors.preferredLocation ? "border-red-500" : "border-gray-900"
                        } rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30`}
                        id="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      >
                        <option value="">Preferred Location</option>
                        <option value="Google Meet (Online)">Google Meet (Online)</option>
                        <option value="Office Visit">Office Visit</option>
                        <option value="Phone Call">Phone Call</option>
                      </select>
                      {errors.preferredLocation && (
                        <div className="error-message text-red-500 text-xs mt-1">
                          {errors.preferredLocation}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <textarea
                        name="message"
                        className="form-control w-full px-3 py-2 text-sm border border-gray-900 rounded-md bg-gray-500/20 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30 resize-y"
                        id="message"
                        placeholder="Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium py-2 rounded-md transition-all ${
                        buttonText === "Sent!"
                          ? "bg-green-500"
                          : buttonText === "Error!"
                          ? "bg-red-500"
                          : "hover:from-gray-900 hover:to-gray-700 hover:-translate-y-0.5"
                      }`}
                      disabled={isSubmitting}
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
              </div>
              )}
            </div>

            <div className="flex-1 flex justify-end">
              <div className="flex items-center space-x-1">
                {navlinks.map((item, index) => (
                  <NavLink key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {notice && (
        <div
          className={`fixed right-4 top-4 z-[1001] rounded-md px-4 py-2 text-sm text-white shadow-lg ${
            notice.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          role="status"
        >
          {notice.message}
        </div>
      )}
    </>
  );
};

export default NavLayerTop;
