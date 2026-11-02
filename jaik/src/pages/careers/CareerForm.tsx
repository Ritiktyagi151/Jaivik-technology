"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { sendExternalLead } from "@/lib/externalLead";
import { useRecaptcha } from "@/lib/useRecaptcha";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const CareerForm = () => {
  const {
    getRecaptchaToken,
    isRecaptchaReady,
    recaptchaError,
    recaptchaRef,
    resetRecaptcha,
  } = useRecaptcha();
  const [formData, setFormData] = useState({
    fname: "",
    phone: "",
    email: "",
    resume: null as File | null,
    position: "",
    msg: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const data = new FormData();
      data.append("name", formData.fname);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("position", formData.position);
      data.append("message", formData.msg);
      data.append("recaptchaToken", recaptchaToken);
      if (formData.resume) data.append("resume", formData.resume);

      sendExternalLead({
        formName: "career-application-form",
        sourcePage: "careers",
        name: formData.fname,
        phone: formData.phone,
        email: formData.email,
        position: formData.position,
        message: formData.msg,
        resume: formData.resume
          ? {
              name: formData.resume.name,
              type: formData.resume.type,
              size: formData.resume.size,
            }
          : null,
      });

      // ✅ Updated API Endpoint to match your new backend structure
      const response = await axios.post(`${API_URL}/careers/submit`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-recaptcha-token": recaptchaToken,
        },
      });

      if (response.data.success) {
        setStatus({ success: true, message: "Application submitted successfully!" });
        setFormData({ fname: "", phone: "", email: "", resume: null, position: "", msg: "" });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      setStatus({ 
        success: false, 
        message: message || "Something went wrong" 
      });
    } finally {
      resetRecaptcha();
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div className={`p-3 rounded ${status.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
          {status.message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name" required className="bg-transparent border p-2 text-white" 
          value={formData.fname} onChange={(e)=>setFormData({...formData, fname: e.target.value})} />
        
        <input type="tel" placeholder="Phone" required className="bg-transparent border p-2 text-white" 
          value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
        
        <input type="email" placeholder="Email" required className="bg-transparent border p-2 text-white md:col-span-2" 
          value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />

        <div className="md:col-span-2">
          <label className="text-white text-sm block mb-1">Upload Resume (PDF/DOC)</label>
          <input type="file" ref={fileInputRef} required accept=".pdf,.doc,.docx" 
            onChange={(e)=>setFormData({...formData, resume: e.target.files![0]})}
            className="text-white file:bg-red-600 file:text-white file:border-0 p-2 border w-full" />
        </div>

        <input type="text" placeholder="Position Applied For" required className="bg-transparent border p-2 text-white md:col-span-2" 
          value={formData.position} onChange={(e)=>setFormData({...formData, position: e.target.value})} />

        <textarea placeholder="Message" rows={4} required className="bg-transparent border p-2 text-white md:col-span-2" 
          value={formData.msg} onChange={(e)=>setFormData({...formData, msg: e.target.value})} />

        <div className="recaptcha-field md:col-span-2" ref={recaptchaRef} />
        {!isRecaptchaReady && (
          <p className="recaptcha-status md:col-span-2">
            {recaptchaError || "Captcha is loading..."}
          </p>
        )}
        <button type="submit" disabled={isSubmitting} className="bg-red-600 text-white p-3 font-bold hover:bg-red-700 disabled:opacity-50">
          {isSubmitting ? "Uploading..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default CareerForm;
