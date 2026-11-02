"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import BookingPillButton from "@/components/buttons/BookingPillButton";

const NavLayerTop = dynamic(() => import("./NavLayerTop"), {
  loading: () => null,
});

const NavLayerBottom = dynamic(() => import("./NavLayerBottom"), {
  loading: () => null,
});

const MobileOffCanvas = dynamic(() => import("./MobileOffCanvas"), {
  ssr: false,
  loading: () => null,
});

const Navbar: React.FC = () => {
  // State for popups and off-canvas menu
  // const [isTranslatePopupOpen, setIsTranslatePopupOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  // const [isSticky, setIsSticky] = useState(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});

  // Handle scroll for sticky navbar
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const syncViewport = () => {
      setIsDesktop(desktopQuery.matches);
      if (desktopQuery.matches) {
        setIsOffCanvasOpen(false);
        document.body.classList.remove("overflow-hidden");
      }
    };

    const handleScroll = () => {
      if (!desktopQuery.matches) return;
      const windowTop = window.scrollY;
      setIsSticky(windowTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    desktopQuery.addEventListener("change", syncViewport);

    // Trigger once on mount in case user is already scrolled
    syncViewport();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      desktopQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen((current) => {
      document.body.classList.toggle("overflow-hidden", !current);
      return !current;
    });
  };
  const toggleSubmenu = (menuKey: string) => {
    if (menuKey === "services") {
      setExpandedMenus((prev) => ({
        services: !prev.services,
        software: false,
        website: false,
        digital: false,
        seo: false,
        film: false,
      }));
    } else {
      setExpandedMenus((prev) => ({
        ...prev,
        software: menuKey === "software" ? !prev.software : false,
        website: menuKey === "website" ? !prev.website : false,
        digital: menuKey === "digital" ? !prev.digital : false,
        seo: menuKey === "seo" ? !prev.seo : false,
        film: menuKey === "film" ? !prev.film : false,
      }));
    }
  };

  return (
    <>
      <style>
        {`
    @keyframes rgbBorder {
      0% { border-color: #ff0000; }
      33% { border-color: #00ff00; }
      66% { border-color: #0000ff; }
      100% { border-color: #ff0000; }
    }

    @keyframes slideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideInRight {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes sticky {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(0); }
    }

    .menu-expand::before,
    .menu-expand::after {
      position: absolute;
      top: calc(50% - 1px);
      left: calc(50% - 7px);
      width: 14px;
      height: 2px;
      content: "";
      transition: all 0.5s ease;
      transform: scale(0.75);
      background-color: white;
    }

    .menu-expand::after {
      transform: rotate(90deg) scale(0.75);
    }

    .menu-expand.active::after {
      transform: rotate(0) scale(0.75);
    }

    .offcanvas-close::after,
    .offcanvas-close::before {
      position: absolute;
      top: calc(50% - 1px);
      left: 50%;
      margin-left: -10px;
      width: 20px;
      height: 2px;
      content: "";
      transition: all 0.5s ease;
      background-color: #fff;
    }

    .offcanvas-close::before {
      transform: rotate(45deg);
    }

    .offcanvas-close::after {
      transform: rotate(-45deg);
    }

    .offcanvas-close:hover::before {
      transform: rotate(180deg);
    }

    .offcanvas-close:hover::after {
      transform: rotate(0deg);
    }

    .quote-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid #ff4d4d;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(255, 77, 77, 0.35);
      z-index: 0;
    }

    .customScroll {
      scrollbar-width: thin;
      scrollbar-color: #ef4444 #1f2937;
    }

    .customScroll::-webkit-scrollbar {
      width: 6px;
    }

    .customScroll::-webkit-scrollbar-track {
      background: #1f2937;
    }

    .customScroll::-webkit-scrollbar-thumb {
      background: #ef4444;
      border-radius: 3px;
    }

    .sub-menu {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .sub-menu.expanded {
      max-height: 500px;
      transition: max-height 0.3s ease-in;
    }

    .menu-item-with-arrow {
      position: relative;
    }

    .menu-arrow {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.3s ease;
    }

    .menu-arrow.expanded {
      transform: translateY(-50%) rotate(180deg);
    }

    .mobile-sticky-header {
      position: sticky;
      top: 0;
      z-index: 990;
      transition: all 0.3s ease;
      animation: ${isSticky ? "sticky 0.3s ease" : "none"};
      box-shadow: ${isSticky ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none"};
      background: ${isSticky ? "rgba(0, 0, 0, 0.95)" : "black"};
      backdrop-filter: ${isSticky ? "blur(10px)" : "none"};
    }

    @media (max-width: 768px) {
      .offcanvas {
        width: 280px !important;
      }
      
      .translate-popup {
        right: 10px !important;
        top: 60px !important;
        width: calc(100vw - 20px) !important;
        max-width: 280px !important;
      }
    }

    @media (max-width: 480px) {
      .offcanvas {
        width: 100vw !important;
      }
      
      .translate-popup {
        right: 5px !important;
        top: 50px !important;
        width: calc(100vw - 10px) !important;
        max-width: none !important;
      }
    }
  `}
      </style>

      {isDesktop && <NavLayerTop />}

      {/* Mobile Header - Sticky */}
      {!isDesktop && (
      <div className="mobile-sticky-header">
        <div className="flex justify-between items-center py-2 px-4">
          <Link href="/" className="w-24 h-8">
            <img
              src="/Jaivik-logo.webp"
              alt="logo"
              className="h-full object-contain"
              width={96}
              height={32}
              decoding="async"
              fetchPriority="high"
            />
          </Link>
          <div className="flex items-center space-x-3">
            <BookingPillButton className="h-8 gap-1.5 px-2.5 text-[10px]">
              <span className="whitespace-nowrap">Book</span>
            </BookingPillButton>
            <button
              onClick={toggleOffCanvas}
              className="text-white hover:text-red-500 transition-colors p-1"
              aria-label="Open menu"
            >
              <MenuIcon aria-hidden="true" size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Desktop Navigation */}
      {isDesktop && <NavLayerBottom isSticky={isSticky} />}

      {/* OffCanvas Overlay */}
      {isOffCanvasOpen && (
        <MobileOffCanvas
          expandedMenus={expandedMenus}
          toggleOffCanvas={toggleOffCanvas}
          toggleSubmenu={toggleSubmenu}
        />
      )}
    </>
  );
};

export default Navbar;
