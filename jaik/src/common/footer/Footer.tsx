"use client";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
  FaPhone,  
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { cachedGet } from "@/lib/clientApiCache";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const API_URL = `${API_BASE}/footer`;
const FOOTER_EMAIL = "";

type Office = {
  address: string;
};

type FooterData = {
  description?: string;
  socials?: Record<string, string>;
  contacts?: {
    offices?: Office[];
    phones?: string[];
  };
  copyright?: string;
};

const DESKTOP_USEFUL_LINKS = [
  { text: "About Us", url: "/about" },
  { text: "Portfolio", url: "/portfolio" },
  { text: "Our Blogs", url: "/blogs" },
  { text: "Career", url: "/careers" },
  { text: "Privacy Policy", url: "/privacy-policy" },
  { text: "Contact Us", url: "/contact-us" },
  {
    text: "Brochure",
    url: "",
    isExternal: true,
  },
];

const DESKTOP_SERVICES_LINKS = [
  { text: "Digital Marketing", url: "/digital-marketing-agency-in-india" },
  { text: "Software Development", url: "/cusotmized-software" },
  { text: "Film Making", url: "/film-production" },
  { text: "SEO (Search Engine Optimization)", url: "/seo-services-in-india" },
  { text: "E-Commerce", url: "/website-development-company" },
  { text: "Website Development", url: "/website-development-company" },
];

const Footer = () => {
  const [data, setData] = useState<FooterData>({});

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await cachedGet<any>(API_URL);
        const footerData = res.data?.data || res.data;
        if (footerData && typeof footerData === "object") {
          setData(footerData);
        }
      } catch (err) {
        console.error("Footer load error:", err);
      }
    };
    fetchFooter();
  }, []);

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("facebook")) return <FaFacebookF />;
    if (p.includes("instagram")) return <FaInstagram />;
    if (p.includes("twitter") || p.includes("x")) return <FaXTwitter />;
    if (p.includes("youtube")) return <FaYoutube />;
    if (p.includes("linkedin")) return <FaLinkedinIn />;
    return <FaGlobe />;
  };

  return (
    <footer className="relative isolate overflow-hidden bg-main-primary pt-12 px-4 md:px-12 lg:pt-12 lg:px-[28px]">

      <div
        aria-hidden="true"
        className="select-none whitespace-nowrap"
        style={{
          position: "absolute",
          display: "block",
          left: "50%",
          top: "50%",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          fontSize: "clamp(5rem, 17vw, 16rem)",
          fontWeight: 900,
          letterSpacing: "0.08em",
          lineHeight: 1,
          color: "rgba(255, 255, 255, 0.055)",
        }}
      >
        JAIVIK
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="relative z-10 block space-y-8 md:hidden">

        {/* Row 1: Description & Socials — full width */}
        <div>
          <div className="flex gap-6 mb-4">
            {Object.entries(data.socials || {}).map(([platform, url]) =>
              url && (
                <Link key={platform} href={url} target="_blank" rel="noopener noreferrer">
                  <span className="text-white text-xl hover:text-main-red transition-all">
                    {getSocialIcon(platform)}
                  </span>
                </Link>
              )
            )}
          </div>
          <p className="text-main-gray text-[16px]">
            {data.description}
            <Link href="/about" className="text-main-red hover:underline ml-1">
              More...
            </Link>
          </p>
        </div>

        {/* Row 2: Useful Links + Our Services — side by side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Useful Links */}
          <div>
            <h3 className="text-lg text-gray-200 mb-2 font-bold">
              Useful Links
            </h3>
            <ul className="list-none p-0 m-0 text-[15px]">
              {DESKTOP_USEFUL_LINKS.map((item) => (
                <li key={item.text} className="mt-2">
                  {item.isExternal ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-main-gray hover:underline cursor-pointer"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link href={item.url} className="text-main-gray hover:underline">
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg text-gray-200 mb-2 font-bold">
              Our Services
            </h3>
            <ul className="list-none p-0 m-0 text-[15px]">
              {DESKTOP_SERVICES_LINKS.map((item) => (
                <li key={item.text} className="mt-2">
                  <Link href={item.url} className="text-main-gray hover:underline">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Get In Touch — full width */}
        <div>
          <h3 className="text-lg text-gray-200 mb-2 font-bold">
            Get In Touch
          </h3>
          <ul className="list-none p-0 m-0">
            {data.contacts?.offices?.map((off, i) => (
              <li key={i} className="flex items-start gap-2 mt-2">
                <FaMapMarkerAlt className="text-main-red shrink-0 mt-1" />
                <p className="text-main-gray text-[16px]">{off.address}</p>
              </li>
            ))}
            <li className="flex items-center gap-2 mt-2">
              <FaEnvelopeOpenText className="text-main-red" />
              <a href={`mailto:${FOOTER_EMAIL}`} className="text-main-gray hover:underline">
                {FOOTER_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2 mt-2 text-[16px]">
              <FaPhone className="text-main-red rotate-120" />
              <ul className="flex flex-wrap gap-2 p-0 m-0 leading-4">
                {data.contacts?.phones?.map((ph, i) => (
                  <li key={i}>
                    <a href={`tel:${ph}`} className="text-main-gray hover:underline">
                      {ph}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (md+) — unchanged ── */}
      <div className="relative z-10 hidden grid-cols-1 gap-10 md:grid md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_2fr]">

        {/* Section 1: Description & Socials */}
        <div>
          <div className="flex gap-6 mb-4">
            {Object.entries(data.socials || {}).map(([platform, url]) =>
              url && (
                <Link key={platform} href={url} target="_blank" rel="noopener noreferrer">
                  <span className="text-white text-xl hover:text-main-red transition-all">
                    {getSocialIcon(platform)}
                  </span>
                </Link>
              )
            )}
          </div>
          <p className="text-main-gray text-[16px]">
            {data.description}
            <Link href="/about" className="text-main-red hover:underline ml-1">
              More...
            </Link>
          </p>
        </div>

        {/* Section 2: Useful Links */}
        <div>
          <h3 className="text-lg text-gray-200 mb-2 font-bold">Useful Links</h3>
          <ul className="list-none p-0 m-0 text-[16px]">
            {DESKTOP_USEFUL_LINKS.map((item) => (
              <li key={item.text} className="mt-2">
                {item.isExternal ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-main-gray hover:underline cursor-pointer"
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link href={item.url} className="text-main-gray hover:underline">
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Our Services */}
        <div>
          <h3 className="text-lg text-gray-200 mb-2 font-bold">Our Services</h3>
          <ul className="list-none p-0 m-0 text-[16px]">
            {DESKTOP_SERVICES_LINKS.map((item) => (
              <li key={item.text} className="mt-2">
                <Link href={item.url} className="text-main-gray hover:underline">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Get In Touch */}
        <div>
          <h3 className="text-lg text-gray-200 mb-2 font-bold">Get In Touch</h3>
          <ul className="list-none p-0 m-0">
            {data.contacts?.offices?.map((off, i) => (
              <li key={i} className="flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-main-red shrink-0" />
                <p className="text-main-gray text-[16px]">{off.address}</p>
              </li>
            ))}
            <li className="flex items-center gap-2 mt-2">
              <FaEnvelopeOpenText className="text-main-red" />
              <a href={`mailto:${FOOTER_EMAIL}`} className="text-main-gray hover:underline">
                {FOOTER_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2 mt-2 text-[16px]">
              <FaPhone className="text-main-red rotate-120" />
              <ul className="flex flex-wrap gap-2 p-0 m-0 leading-4">
                {data.contacts?.phones?.map((ph, i) => (
                  <li key={i}>
                    <a href={`tel:${ph}`} className="text-main-gray hover:underline">
                      {ph}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-4 border-t border-white/5 py-4 text-center">
        <p className="text-main-gray text-[15px]">
          {(data.copyright || "© 2016 All Rights Reserved").replace(/jaikvik/gi, "Jaivik")}
          <Link href="/" className="text-main-red hover:underline ml-1">
            Jaivik Technology India Pvt. Ltd.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
