"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
} from "lucide-react";

// --- Interfaces (Existing + New for API) ---
interface AdminData {
  name?: string;
  email?: string;
  role?: string;
}

interface CircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  delay?: number;
}

interface MiniCircleProgressProps {
  percentage: number;
  size?: number;
  color?: string;
}

interface AnimatedBarProps {
  height: number;
  color: string;
  delay: number;
  width?: number;
}

// --- Component Definition ---
const Dashboard: React.FC = () => {
  // New States for API Data
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- API Fetch Logic ---
  useEffect(() => {
    const getDashboardData = async () => {
      try {
        // Yahan aap apna backend URL daal sakte hain (Port 5002)
        // const res = await fetch("");
        // const result = await res.json();
        
        // Simulating API response for now to prevent "undefined" error
        const mockAdmin = {
          name: "Jaivik Technology Admin",
          email: "",
          role: "Super Administrator"
        };
        
        setAdmin(mockAdmin);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, []);

  // --- Helper Components (Internal) ---
  const CircleProgress: React.FC<CircleProgressProps> = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    color = "#3b82f6",
    delay = 0,
  }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = percentage / 60;
        const animate = () => {
          current += increment;
          if (current < percentage) {
            setAnimatedPercentage(current);
            requestAnimationFrame(animate);
          } else {
            setAnimatedPercentage(percentage);
          }
        };
        animate();
      }, delay);
      return () => clearTimeout(timer);
    }, [percentage, delay]);

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgb(55, 65, 81)" strokeWidth={strokeWidth} fill="none" className="opacity-20" />
          <circle
            cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(animatedPercentage)}%</span>
        </div>
      </div>
    );
  };

  const MiniCircleProgress: React.FC<MiniCircleProgressProps> = ({ percentage, size = 60, color = "#10b981" }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const radius = (size - 6) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = percentage / 30;
        const animate = () => {
          current += increment;
          if (current < percentage) {
            setAnimatedPercentage(current);
            requestAnimationFrame(animate);
          } else {
            setAnimatedPercentage(percentage);
          }
        };
        animate();
      }, 200);
      return () => clearTimeout(timer);
    }, [percentage]);

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgb(55, 65, 81)" strokeWidth={6} fill="none" className="opacity-30" />
          <circle
            cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-white">{Math.round(animatedPercentage)}%</span>
        </div>
      </div>
    );
  };

  const AnimatedBar: React.FC<AnimatedBarProps> = ({ height, color, delay, width = 8 }) => {
    const [barHeight, setBarHeight] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setBarHeight(height), delay);
      return () => clearTimeout(timer);
    }, [height, delay]);
    return (
      <div
        className={`bg-gradient-to-t ${color} rounded-t-lg transition-all duration-800 ease-out`}
        style={{ height: `${barHeight}px`, width: `${width}px` }}
      />
    );
  };

  // --- Data Arrays ---
  const stats = [
    { title: "Total Revenue", value: "$124,590", change: "+14.2%", progress: 78, icon: <DollarSign size={20} />, trend: "up", color: "text-emerald-400", bgColor: "bg-emerald-500/10", progressColor: "#10b981" },
    { title: "Active Users", value: "8,549", change: "+8.1%", progress: 65, icon: <Users size={20} />, trend: "up", color: "text-blue-400", bgColor: "bg-blue-500/10", progressColor: "#3b82f6" },
    { title: "Total Orders", value: "2,847", change: "+23.5%", progress: 92, icon: <ShoppingCart size={20} />, trend: "up", color: "text-purple-400", bgColor: "bg-purple-500/10", progressColor: "#8b5cf6" },
    { title: "Conversion Rate", value: "2.84%", change: "-1.2%", progress: 45, icon: <Activity size={20} />, trend: "down", color: "text-orange-400", bgColor: "bg-orange-500/10", progressColor: "#f59e0b" },
  ];

  const circleStats = [
    { title: "Performance Score", value: 87, color: "#10b981", subtitle: "Excellent", icon: <Award size={24} className="text-emerald-400" /> },
    { title: "Goal Achievement", value: 73, color: "#3b82f6", subtitle: "On Track", icon: <Target size={24} className="text-blue-400" /> },
    { title: "System Health", value: 95, color: "#8b5cf6", subtitle: "Optimal", icon: <Zap size={24} className="text-purple-400" /> },
  ];

  const transactions = [
    { id: 1, customer: "Emma Watson", product: "Premium Subscription", amount: "$99.00", status: "completed", time: "2m ago", avatar: "EW" },
    { id: 2, customer: "Michael Chen", product: "Design Package", amount: "$299.00", status: "completed", time: "15m ago", avatar: "MC" },
    { id: 3, customer: "Sarah Johnson", product: "Consultation", amount: "$150.00", status: "pending", time: "1h ago", avatar: "SJ" },
    { id: 4, customer: "David Rodriguez", product: "Annual Plan", amount: "$599.00", status: "completed", time: "2h ago", avatar: "DR" },
  ];

  const performanceBars = Array.from({ length: 12 }, (_, i) => ({
    id: i, height: Math.floor(Math.random() * 160 + 40), date: new Date(2025, 0, i * 2 + 1).toLocaleDateString("en", { day: "numeric" }),
  }));

  const monthlySales = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => ({
    month, currentYear: Math.floor(Math.random() * 120 + 40), lastYear: Math.floor(Math.random() * 100 + 30),
  }));

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-in-left { animation: slideInLeft 0.5s ease-out forwards; opacity: 0; }
      `}</style>
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Safe Access for admin */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              Welcome, {admin?.name || "Admin"}
            </h1>
            <p className="text-gray-400 flex items-center gap-2">
              <Calendar size={16} />
              {admin?.email || "Analytics Dashboard"} • June 26, 2025
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>{stat.icon}</div>
                <MiniCircleProgress percentage={stat.progress} color={stat.progressColor} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Circle Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {circleStats.map((stat, index) => (
            <div key={index} className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 text-center animate-fade-in" style={{ animationDelay: `${(index + 4) * 150}ms` }}>
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
              <CircleProgress percentage={stat.value} color={stat.color} delay={index * 200} />
              <p className="text-gray-400 mt-4 font-medium">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Performance & Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 animate-slide-up" style={{ animationDelay: "700ms" }}>
            <h2 className="text-xl font-semibold text-white mb-6">Performance Overview</h2>
            <div className="h-72 flex items-end justify-between p-6 bg-gray-900/30 rounded-xl">
              {performanceBars.map((bar, i) => (
                <div key={bar.id} className="flex flex-col items-center space-y-2 group">
                  <AnimatedBar height={bar.height} color="from-red-500 to-red-400" delay={i * 100 + 800} />
                  <span className="text-xs text-gray-400">{bar.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 animate-slide-up" style={{ animationDelay: "900ms" }}>
            <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((t, index) => (
                <div key={t.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 animate-slide-in-left" style={{ animationDelay: `${1000 + index * 100}ms` }}>
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">{t.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{t.customer}</p>
                    <p className="text-xs text-gray-500 truncate">{t.product}</p>
                  </div>
                  <div className="text-right text-sm font-semibold text-white">{t.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;