"use client";

import { useState, useRef, useEffect } from "react";
import SEOManagement from "../../components/seo/SEOManagement";

const Brochure = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const brochureRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth page transitions
  const changePage = (newPage: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setTimeout(() => setIsTransitioning(false), 400);
    }, 200);
  };

  // Floating animation for background elements
  useEffect(() => {
    const floatingElements =
      document.querySelectorAll<HTMLElement>(".floating-bg");
    floatingElements.forEach((el, index) => {
      const speed = 0.3 + index * 0.1;
      const range = 15 + index * 5;

      setInterval(() => {
        const offset = Math.sin(Date.now() * 0.001 * speed) * range;
        el.style.transform = `translateY(${offset}px) rotate(${
          offset * 0.5
        }deg)`;
      }, 16);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const pages = [
    { id: "hero", title: "Home", num: "01" },
    { id: "about", title: "About", num: "02" },
    { id: "software", title: "Software", num: "03" },
    { id: "marketing", title: "Marketing", num: "04" },
    { id: "film", title: "Film", num: "05" },
    { id: "contact", title: "Contact", num: "06" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOManagement title="This is the title for brochurepdf page" description="This iss description for the about page" keywords="about us " canonical="/about" />
      {/* Sophisticated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-16 grid-rows-16 h-full w-full">
            {Array.from({ length: 256 }).map((_, i) => (
              <div
                key={i}
                className="border border-gray-600"
                style={{ animationDelay: `${i * 0.05}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 border border-gray-800 rounded-full floating-bg opacity-20"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 border border-gray-700 transform rotate-45 floating-bg opacity-15"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gray-900 floating-bg opacity-30"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent floating-bg"></div>

        {/* Subtle mouse follower */}
        <div
          className="absolute w-96 h-96 bg-radial-gradient from-white/5 to-transparent rounded-full transition-all duration-500 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-px bg-gray-900 z-50">
        <div
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${(currentPage / (pages.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Minimalist Navigation */}
      <nav className="top-40 left-0 right-0 z-40">
        <div className="max-w-8xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 bg-white text-black rounded-none flex items-center justify-center font-bold text-lg">
              J
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-light tracking-wider">
                Jaivik Technology
              </h1>
              <p className="text-xs text-gray-500 tracking-widest uppercase font-mono">
                Digital Innovation Studio
              </p>
            </div>
          </div>

          <div className="flex space-x-8">
            {pages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => changePage(index)}
                className={`group relative font-mono text-sm tracking-wider transition-all duration-300 ${
                  currentPage === index
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="block">{page.num}</span>
                <span className="block text-xs mt-1 opacity-70">
                  {page.title}
                </span>
                {currentPage === index && (
                  <div className="absolute -bottom-2 left-0 w-full h-px bg-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Floating Actions */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4">
        <button
          onClick={handlePrint}
          className="group w-14 h-14 bg-gray-900 border border-gray-700 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>

        {/* Page Indicators */}
        <div className="flex flex-col space-y-3">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => changePage(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                currentPage === index
                  ? "bg-white scale-125"
                  : "bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div ref={brochureRef} className="relative">
        {/* HERO SECTION */}
        <section
          className={`min-h-screen flex items-center justify-center px-8 transition-all duration-700 ${
            currentPage === 0
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <div className="mb-12">
                <span className="text-sm tracking-widest text-gray-500 uppercase mb-8 block font-mono">
                  Digital Innovation Studio
                </span>
                <h1 className="text-8xl md:text-9xl font-thin mb-6 leading-none tracking-tight">
                  Jaivik Technology
                </h1>
                <div className="text-3xl md:text-4xl font-light text-gray-400 mb-8 tracking-widest">
                  TECHNOLOGY
                </div>
              </div>

              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-12">
                  Where precision meets innovation. Crafting digital experiences
                  that define the future of business.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {[
                    "SOFTWARE DEVELOPMENT",
                    "DIGITAL MARKETING",
                    "FILM PRODUCTION",
                  ].map((service, index) => (
                    <div key={service} className="group">
                      <div className="border border-gray-800 p-6 hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-300">
                        <span className="text-xs font-mono tracking-widest text-gray-400 block mb-2">
                          0{index + 1}
                        </span>
                        <span className="text-sm font-light text-gray-200 tracking-wide">
                          {service}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => changePage(1)}
                className="group relative px-12 py-4 border border-white text-white font-light text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">EXPLORE FURTHER</span>
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-700 ${
            currentPage === 1
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="mb-12">
                  <span className="text-xs tracking-widest text-gray-500 uppercase mb-6 block font-mono">
                    02 — Our Foundation
                  </span>
                  <h2 className="text-5xl md:text-6xl font-thin text-white mb-8 leading-tight">
                    CRAFTING
                    <br />
                    <span className="text-gray-400">DIGITAL EXCELLENCE</span>
                  </h2>
                </div>

                <div className="space-y-8 text-lg text-gray-300 leading-relaxed font-light">
                  <div className="border-l border-gray-700 pl-6">
                    <p>
                      Since 2016, Jaivik Technology has been architecting the
                      intersection of technology and creativity, delivering
                      solutions that transcend conventional boundaries.
                    </p>
                  </div>
                  <div className="border-l border-gray-700 pl-6">
                    <p>
                      From our headquarters in Noida to our strategic locations
                      in Kolkata and Bangalore, we've cultivated partnerships
                      with over 600 manufacturing enterprises.
                    </p>
                  </div>
                  <div className="border-l border-white pl-6">
                    <p className="text-white font-normal italic">
                      "We don't just build solutions; we architect experiences
                      that define tomorrow."
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      number: "600+",
                      label: "Clients Served",
                      position: "top-left",
                    },
                    {
                      number: "8+",
                      label: "Years Excellence",
                      position: "top-right",
                    },
                    {
                      number: "3",
                      label: "Strategic Locations",
                      position: "bottom-left",
                    },
                    {
                      number: "24/7",
                      label: "Dedicated Support",
                      position: "bottom-right",
                    },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="group relative bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300"
                    >
                      <div className="absolute top-4 left-4 text-xs font-mono text-gray-600">
                        0{index + 1}
                      </div>
                      <div className="text-4xl font-thin text-white mb-3">
                        {stat.number}
                      </div>
                      <div className="text-gray-400 font-light text-sm tracking-wide uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOFTWARE SECTION */}
        <section
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-700 ${
            currentPage === 2
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-xs tracking-widest text-gray-500 uppercase mb-6 block font-mono">
                03 — Technology
              </span>
              <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">
                SOFTWARE
                <span className="text-gray-400 block"> DEVELOPMENT</span>
              </h2>
              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
                Precision-engineered solutions tailored to your unique
                operational requirements
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {[
                {
                  title: "Web Development",
                  code: "WEB_DEV",
                  description:
                    "Sophisticated web solutions with flawless user experiences",
                  features: [
                    "E-Commerce Platforms",
                    "CMS Integration",
                    "Performance Optimization",
                    "SEO Architecture",
                  ],
                },
                {
                  title: "Mobile Applications",
                  code: "MOBILE_APP",
                  description:
                    "Native and cross-platform applications with intuitive design",
                  features: [
                    "iOS Development",
                    "Android Solutions",
                    "Cross-Platform",
                    "UI/UX Excellence",
                  ],
                },
                {
                  title: "CRM Systems",
                  code: "CRM_SYS",
                  description:
                    "Comprehensive customer relationship management platforms",
                  features: [
                    "Sales Management",
                    "Customer Analytics",
                    "Workflow Automation",
                    "Integration Ready",
                  ],
                },
                {
                  title: "ERP Solutions",
                  code: "ERP_SOL",
                  description:
                    "Enterprise resource planning for operational excellence",
                  features: [
                    "Financial Management",
                    "Supply Chain",
                    "HR Solutions",
                    "Business Intelligence",
                  ],
                },
              ].map((service, index) => (
                <div key={service.title} className="group relative">
                  <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-500 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-xs font-mono text-gray-500 tracking-widest">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-widest">
                        {service.code}
                      </div>
                    </div>

                    <h3 className="text-xl font-light text-white mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 font-light mb-6 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-500 font-light text-xs"
                        >
                          <div className="w-1 h-1 bg-gray-600 mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKETING SECTION */}
        <section
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-700 ${
            currentPage === 3
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-xs tracking-widest text-gray-500 uppercase mb-6 block font-mono">
                04 — Marketing
              </span>
              <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">
                DIGITAL
                <span className="text-gray-400 block"> PRESENCE</span>
              </h2>
              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
                Strategic marketing orchestration that amplifies your brand's
                digital footprint
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Social Media Strategy",
                  code: "SMM",
                  description:
                    "Cultivate authentic brand connections across all major digital platforms through data-driven engagement.",
                },
                {
                  title: "Search Engine Optimization",
                  code: "SEO",
                  description:
                    "Enhance organic visibility and drive qualified traffic through technical excellence and content strategy.",
                },
                {
                  title: "Paid Advertising",
                  code: "PPC",
                  description:
                    "Precision-targeted campaigns across Google, Meta, and YouTube for measurable business impact.",
                },
                {
                  title: "Brand Development",
                  code: "BRD",
                  description:
                    "Elevate your brand identity and establish commanding market presence through strategic positioning.",
                },
                {
                  title: "Content Marketing",
                  code: "CNT",
                  description:
                    "Compelling content strategies that educate, engage, and convert your target audience effectively.",
                },
                {
                  title: "Analytics & Insights",
                  code: "ANL",
                  description:
                    "Advanced data analysis and performance optimization to maximize return on marketing investment.",
                },
              ].map((service, index) => (
                <div key={service.title} className="group">
                  <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-500 h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-xs font-mono text-gray-500 tracking-widest">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-widest">
                        {service.code}
                      </div>
                    </div>

                    <h3 className="text-xl font-light text-white mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 font-light leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FILM SECTION */}
        <section
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-700 ${
            currentPage === 4
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-xs tracking-widest text-gray-500 uppercase mb-6 block font-mono">
                05 — Creative
              </span>
              <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">
                FILM
                <span className="text-gray-400 block"> PRODUCTION</span>
              </h2>
              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
                Cinematic storytelling that transforms brand narratives into
                compelling visual experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Corporate Films",
                  code: "CORP",
                  description:
                    "Professional corporate presentations that articulate your company's vision and values with cinematic precision and emotional resonance.",
                },
                {
                  title: "Product Showcases",
                  code: "PROD",
                  description:
                    "Dynamic product demonstrations that illuminate features and benefits through compelling visual narratives and strategic storytelling.",
                },
                {
                  title: "Television Commercials",
                  code: "TVC",
                  description:
                    "High-impact television advertisements engineered for maximum audience engagement, brand recall, and market penetration.",
                },
                {
                  title: "Digital Video Content",
                  code: "DVC",
                  description:
                    "Platform-optimized video content for YouTube and social media channels, designed to reach and engage your ideal audience segments.",
                },
                {
                  title: "Photography Services",
                  code: "PHOTO",
                  description:
                    "Professional photography encompassing product imagery, corporate portraits, and marketing materials with meticulous attention to detail.",
                },
                {
                  title: "Executive Interviews",
                  code: "INT",
                  description:
                    "Polished interview content that positions your leadership team as authoritative industry voices and thought leaders.",
                },
              ].map((service, index) => (
                <div key={service.title} className="group">
                  <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-500 h-full relative">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-xs font-mono text-gray-500 tracking-widest">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-widest">
                        {service.code}
                      </div>
                    </div>

                    <h3 className="text-xl font-light text-white mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 font-light leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          className={`min-h-screen flex items-center px-8 py-20 transition-all duration-700 ${
            currentPage === 5
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-20">
              <span className="text-xs tracking-widest text-gray-500 uppercase mb-6 block font-mono">
                06 — Connect
              </span>
              <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">
                LET'S
                <span className="text-gray-400 block"> COLLABORATE</span>
              </h2>
              <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto mb-16">
                Ready to architect your digital transformation? Connect with our
                team of innovation specialists.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-xs font-mono text-gray-500">01</div>
                  <div className="text-xs font-mono text-gray-600">HQ</div>
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  Headquarters
                </h3>
                <p className="text-gray-400 font-light">Noida, India</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-xs font-mono text-gray-500">02</div>
                  <div className="text-xs font-mono text-gray-600">BRANCH</div>
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  Branch Offices
                </h3>
                <p className="text-gray-400 font-light">Kolkata & Bangalore</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-xs font-mono text-gray-500">03</div>
                  <div className="text-xs font-mono text-gray-600">CLIENTS</div>
                </div>
                <h3 className="text-xl font-light text-white mb-2">
                  Portfolio
                </h3>
                <p className="text-gray-400 font-light">600+ Enterprises</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button className="px-12 py-4 bg-white text-black font-light text-lg tracking-wider hover:bg-gray-200 transition-all duration-300">
                INITIATE CONTACT
              </button>
              <button className="px-12 py-4 border border-gray-600 text-gray-300 font-light text-lg tracking-wider hover:border-gray-400 hover:text-white transition-all duration-300">
                REQUEST PROPOSAL
              </button>
            </div>

            <div className="border-t border-gray-800 pt-12">
              <p className="text-2xl font-thin text-gray-400 italic tracking-wide">
                "Excellence is the gradual result of always striving to do
                better."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Brochure;
