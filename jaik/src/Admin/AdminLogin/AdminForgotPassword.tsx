"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AdminForgotPassword = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage("OTP sent to your registered contact!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, otp, newPassword }),
      });
      if (res.ok) {
        alert("Password reset successfully!");
        router.push("/admin");
      } else {
        alert("Invalid OTP or error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-gray-800">
        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">RESET ADMIN ACCESS</h2>
        
        {message && <p className="mb-4 text-green-400 text-sm text-center">{message}</p>}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <p className="text-gray-400 text-sm">Enter registered Email or Mobile Number</p>
            <input type="text" placeholder="Email or +91..." className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500" value={contact} onChange={(e) => setContact(e.target.value)} required />
            <button className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold">
              {loading ? "Sending..." : "SEND OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            <input type="text" placeholder="6 Digit OTP" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <input type="password" placeholder="New Strong Password" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <button className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold">
              {loading ? "Resetting..." : "UPDATE PASSWORD"}
            </button>
          </form>
        )}
        <button onClick={() => router.push("/admin")} className="w-full mt-4 text-gray-500 text-sm hover:text-gray-300">Back to Login</button>
      </motion.div>
    </div>
  );
};

export default AdminForgotPassword;