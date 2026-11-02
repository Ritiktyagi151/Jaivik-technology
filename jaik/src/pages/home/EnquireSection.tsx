"use client";

import { useState } from "react";
import { sendExternalLead } from "@/lib/externalLead";
import { useRecaptcha } from "@/lib/useRecaptcha";
import type { EnquireFormInterface } from "../../interfaces/EnquireFormInterface";
import "../../styles/enquire-form.css";
// Icons ke liye (Optional: Lucide-react use karein ya SVG daal dein)
import { ShieldCheck, Zap, Users } from "lucide-react";

const EnquireSection = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
  const today = new Date().toISOString().split("T")[0];
  const {
    getRecaptchaToken,
    isRecaptchaReady,
    recaptchaError,
    recaptchaRef,
    resetRecaptcha,
  } = useRecaptcha();

  const [formData, setFormData] = useState<EnquireFormInterface>({
    fname: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
    preferredMode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    meetLink?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const recaptchaToken = await getRecaptchaToken();
      const payload = { ...formData, location: formData.preferredMode, sourcePage: "home-enquiry", recaptchaToken };

      sendExternalLead({
        formName: "home-enquiry-form",
        ...formData,
        location: formData.preferredMode,
        sourcePage: "home-enquiry",
      });

      const response = await fetch(`${API_BASE}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", "x-recaptcha-token": recaptchaToken },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data?.success) {
        setSubmitStatus({ success: true, message: "Success! We'll contact you soon.", meetLink: data?.meeting?.meetLink });
        setFormData({ fname: "", email: "", phone: "", company: "", message: "", preferredDate: "", preferredTime: "", preferredMode: "" });
      } else { throw new Error(data?.message || "Failed"); }
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
    <section id="schedule-your-meeting" className="px-4 py-12 md:px-12 lg:px-20 bg-black">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        
        {/* Left Side: Form */}
        <div className="bg-zinc-900/40 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase tracking-tight">
            Book a <span className="text-main-red">Consultation</span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitStatus && (
              <div className={`p-4 rounded-xl border ${submitStatus.success ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
                {submitStatus.message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="input-contain col-span-2 sm:col-span-1">
                <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder=" " required />
                <label className="placeholder-text">FULL NAME</label>
              </div>
              <div className="input-contain col-span-2 sm:col-span-1">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required />
                <label className="placeholder-text">EMAIL</label>
              </div>
              <div className="input-contain col-span-1">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder=" " required />
                <label className="placeholder-text">PHONE</label>
              </div>
              <div className="input-contain col-span-1">
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder=" " required />
                <label className="placeholder-text">COMPANY</label>
              </div>
              <div className="input-contain col-span-1">
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} min={today} required />
                <label className="placeholder-text">DATE</label>
              </div>
              <div className="input-contain col-span-1">
                <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
                <label className="placeholder-text">TIME</label>
              </div>
              <div className="input-contain col-span-2">
                <select name="preferredMode" value={formData.preferredMode} onChange={handleChange} required>
                  <option value="">PREFERRED LOCATION</option>
                  <option value="Google Meet (Online)">Google Meet (Online)</option>
                  <option value="Office Visit">Office Visit</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>
              <div className="input-contain col-span-2">
                <textarea name="message" rows={2} value={formData.message} onChange={handleChange} placeholder=" " required></textarea>
                <label className="placeholder-text">HOW CAN WE HELP?</label>
              </div>
            </div>

            <div className="recaptcha-field" ref={recaptchaRef} />
            {!isRecaptchaReady && (
              <p className="recaptcha-status">
                {recaptchaError || "Captcha is loading..."}
              </p>
            )}
            <button type="submit" disabled={isSubmitting} className="w-full bg-main-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[0.98]">
              {isSubmitting ? "SENDING..." : "CONFIRM SCHEDULE"}
            </button>
          </form>
        </div>

        {/* Right Side: Why Choose Us / Trust Section */}
        <div className="lg:pl-10">
          <div className="inline-block px-4 py-1 rounded-full bg-main-red/10 border border-main-red/20 text-main-red text-sm font-bold mb-4">
            LEVEL UP YOUR BUSINESS
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
            Ready to start your <br /> 
            <span className="text-main-red italic underline decoration-zinc-700">Digital Journey?</span>
          </h3>
          <p className="text-zinc-400 text-lg mb-8">
            Schedule a 15-minute discovery call where we'll discuss your goals, challenges, and how we can help you scale.
          </p>

          {/* Benefit Cards */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-main-red/50 transition-colors">
                <Zap className="text-main-red w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold">Fast Response</h4>
                <p className="text-zinc-500 text-sm">We get back to you within 24 business hours.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-main-red/50 transition-colors">
                <ShieldCheck className="text-main-red w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold">Expert Advice</h4>
                <p className="text-zinc-500 text-sm">Direct consultation with industry specialists.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-main-red/50 transition-colors">
                <Users className="text-main-red w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold">Tailored Solutions</h4>
                <p className="text-zinc-500 text-sm">Every plan is customized for your specific needs.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EnquireSection;
