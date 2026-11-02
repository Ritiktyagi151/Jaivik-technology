"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Lock,
  Users,
  FileText,
  ChevronRight,
  Globe,
  Database,
  Cookie,
  UserCheck,
  Zap,
  Star,
  Heart,
  Sparkles,
  Layers,
  Target,
} from "lucide-react";
import SEOManagement from "../../components/seo/SEOManagement";

const AnimatedPrivacyPolicy: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-section") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`absolute animate-float ${
            i % 3 === 0
              ? "w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500"
              : i % 3 === 1
              ? "w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500"
              : "w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"
          } rounded-full opacity-30`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );

  const HeroSection = () => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent)] animate-pulse" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent)] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-70 animate-pulse" />
            <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 w-32 h-32 rounded-full flex items-center justify-center">
              <Shield className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
        </div>

        <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
          Privacy Policy
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Your data protection is our priority. Discover how we safeguard your
          privacy with cutting-edge security measures.
        </p>

        <div className="flex items-center justify-center space-x-3 mb-12">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <span className="text-lg text-gray-300">
            Last Updated: December 2024
          </span>
        </div>

        <div className="animate-bounce">
          <ChevronRight className="w-8 h-8 text-white mx-auto rotate-90" />
        </div>
      </div>
    </div>
  );

  const sections = [
    {
      title: "Introduction",
      icon: Sparkles,
      gradient: "from-violet-600 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      content: (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl p-10 border-2 border-violet-200">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-violet-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-2xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to Jaivik Technology
                </h3>
                <p className="text-violet-600 font-medium">
                  Where innovation meets privacy protection
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  We utilize our experience and world-class knowledge to help
                  businesses reach their full online and digital potential while
                  ensuring steady growth.
                </p>
                <div className="flex items-center space-x-3 p-4 bg-white/70 rounded-xl">
                  <Target className="w-6 h-6 text-violet-500" />
                  <span className="text-gray-700 font-medium">
                    Dedicated to protecting your privacy
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-lg">
                  This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you engage with our
                  digital marketing solutions.
                </p>
                <div className="flex items-center space-x-3 p-4 bg-white/70 rounded-xl">
                  <Layers className="w-6 h-6 text-purple-500" />
                  <span className="text-gray-700 font-medium">
                    Transparent data practices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Information Collection",
      icon: Database,
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
      content: (
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="group">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-8 border-2 border-cyan-200 hover:shadow-2xl transition-all duration-700 hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6 group-hover:rotate-12 transition-transform duration-500">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Personal Data
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Star, text: "Name and contact details" },
                  { icon: Mail, text: "Email addresses and phone numbers" },
                  {
                    icon: Globe,
                    text: "Business information and company details",
                  },
                  { icon: Lock, text: "Payment and billing information" },
                  { icon: Heart, text: "Communication preferences" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-4 bg-white/80 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 w-10 h-10 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-8 border-2 border-emerald-200 hover:shadow-2xl transition-all duration-700 hover:scale-105">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6 group-hover:rotate-12 transition-transform duration-500">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Technical Data
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Globe, text: "IP addresses and device identifiers" },
                  { icon: Eye, text: "Browser type and version" },
                  { icon: Zap, text: "Website usage data and analytics" },
                  { icon: Cookie, text: "Cookies and tracking technologies" },
                  { icon: Target, text: "Digital marketing campaign data" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-4 bg-white/80 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-400 w-10 h-10 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data Usage",
      icon: Zap,
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      content: (
        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-12 border-2 border-orange-200">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Service Excellence
                </h3>
              </div>

              <div className="grid gap-4">
                {[
                  "Provide digital marketing services",
                  "Manage client campaigns and projects",
                  "Process payments and billing",
                  "Deliver exceptional customer support",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-5 bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-red-400 w-3 h-3 rounded-full animate-pulse" />
                    <span className="text-gray-700 font-medium text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Business Growth
                </h3>
              </div>

              <div className="grid gap-4">
                {[
                  "Enhance our services and website",
                  "Conduct market research and analytics",
                  "Send valuable marketing communications",
                  "Maintain legal compliance",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-5 bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <div className="bg-gradient-to-r from-red-400 to-pink-400 w-3 h-3 rounded-full animate-pulse" />
                    <span className="text-gray-700 font-medium text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Security Measures",
      icon: Shield,
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      content: (
        <div className="space-y-10">
          <div className="text-center">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Military-Grade Protection
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We implement state-of-the-art security measures to protect your
              personal information against any unauthorized access.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Advanced Encryption",
                desc: "SSL/TLS encryption protocols for all data transmission and storage",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Shield,
                title: "Access Control",
                desc: "Multi-layer authentication with restricted access to authorized personnel only",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Eye,
                title: "24/7 Monitoring",
                desc: "Continuous security monitoring with real-time threat detection and response",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-700 hover:scale-110">
                  <div
                    className={`bg-gradient-to-r ${item.color} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-2xl`}
                  >
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-4 text-2xl">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Your Rights",
      icon: UserCheck,
      gradient: "from-indigo-600 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      content: (
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-12 border-2 border-indigo-200">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-20 h-20 rounded-3xl flex items-center justify-center mr-6">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Data Rights
              </h3>
            </div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Under applicable data protection laws, you have comprehensive
              rights over your personal data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Access",
                desc: "Right to access your personal data",
              },
              {
                icon: FileText,
                title: "Rectify",
                desc: "Right to correct inaccurate information",
              },
              {
                icon: Lock,
                title: "Erase",
                desc: "Right to delete your personal data",
              },
              {
                icon: Shield,
                title: "Restrict",
                desc: "Right to limit data processing",
              },
              {
                icon: Database,
                title: "Portability",
                desc: "Right to transfer your data",
              },
              {
                icon: UserCheck,
                title: "Object",
                desc: "Right to object to processing",
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="bg-white/90 rounded-2xl p-6 hover:bg-white transition-all duration-500 hover:scale-105 hover:shadow-xl border border-white/50">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-indigo-400 to-purple-400 w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: Mail,
      gradient: "from-pink-600 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      content: (
        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-12 border-2 border-pink-200">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              Let's Connect
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Have questions about our privacy practices? We're here to help and
              ensure complete transparency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-6 p-6 bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg group">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-600 text-lg"></p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-6 bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg group">
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    Call Us
                  </h4>
                  <p className="text-gray-600 text-lg">
                    +91 [Your Phone Number]
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white/90 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xl mb-2">
                  Visit Our Office
                </h4>
                <p className="text-gray-700 font-medium">
                  Jaivik Technology
                </p>
                <p className="text-gray-600">[Your Complete Address]</p>
                <p className="text-gray-600">India</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black min-h-screen">
      <SEOManagement title="This is the title for privacy policy" description="This iss description for the about page" keywords="about us " canonical="/about" />
      <FloatingElements />
      <ProgressBar />

      <HeroSection />

      <div className="relative z-10 space-y-32 pb-32">
        {sections.map((section, index) => (
          <div
            key={index}
            data-section={index}
            className={`transform transition-all duration-1000 ${
              visibleSections.has(index)
                ? "translate-y-0 opacity-100"
                : "translate-y-32 opacity-0"
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`bg-gradient-to-r ${
                      section.gradient
                    } w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl ${
                      hoveredCard === index
                        ? "scale-125 rotate-12"
                        : "scale-100 rotate-0"
                    } transition-all duration-500`}
                  >
                    <section.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {section.title}
                </h2>
              </div>

              <div className="relative">{section.content}</div>
            </div>
          </div>
        ))}

        {/* Additional Sections */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-10 border-2 border-amber-200 hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                  <Cookie className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Cookies & Tracking
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze website traffic, and improve our
                digital marketing services. You have full control over your
                cookie preferences.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl p-10 border-2 border-teal-200 hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mr-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Policy Updates
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                We continuously improve our privacy practices and will notify
                you of any material changes. Your continued use of our services
                indicates acceptance of updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(5deg);
          }
          66% {
            transform: translateY(-10px) rotate(-5deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedPrivacyPolicy;
