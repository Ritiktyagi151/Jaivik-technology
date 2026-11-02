"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const resData = await response.json();

      if (response.ok) {
        // ✅ KEY FIXED: 'admin-auth' use kiya hai jo Layout se match karega
        localStorage.setItem("admin-auth", resData.data.token);
        router.push("/admin/dashboard");
      } else {
        setError(resData.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server connection failed. Please check your internet or API URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">ADMIN ACCESS</h2>
          
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 p-3 bg-red-900/30 text-red-300 border border-red-800 rounded-lg text-sm text-center">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-red-500 pr-12" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <button type="button" onClick={() => router.push("/admin/forgot-password")} className="text-xs text-red-400 hover:underline">Forgot Password?</button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition disabled:opacity-50">
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;