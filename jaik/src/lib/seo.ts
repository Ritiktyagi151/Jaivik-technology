import type { Metadata } from "next";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.jaikvik.in").replace(
    /\/$/,
    ""
  );

const SITE_NAME = "Jaivik Technology";
const DEFAULT_TITLE = "Jaivik Technology – Digital Marketing, SEO & Web Development";
const DEFAULT_DESCRIPTION =
  "Jaivik Technology offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more. Trusted tech partner for business growth.";
const DEFAULT_OG_IMAGE = "https://jaikvik.in/img/logo/og-image.jpg";
const DEFAULT_KEYWORDS = [
  "digital marketing agency",
  "SEO services",
  "web development",
  "mobile app development",
  "Jaivik Technology",
].join(", ");

type PageSeoConfig = {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
};

const PUBLIC_PAGE_SEO: Record<string, PageSeoConfig> = {
  "/": {
    title: "Jaivik Technology – Digital Marketing, SEO & Web Development",
    description:
      "Jaivik Technology offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more. Trusted tech partner for business growth.",
  },
  "/about": {
    title: "About Jaivik Technology – Leading IT & Digital Solutions Company",
    description:
      "Learn about Jaivik Technology, a top IT company offering SEO, digital marketing, web development, CRM, ERP & mobile app solutions for business success.",
  },
  "/blogs": {
    title: "Jaivik Technology Blogs – SEO, Digital Marketing, Web & Tech Insights in India",
    description:
      "Explore expert blogs by Jaivik Technology on SEO, digital marketing, web development, mobile apps, ERP, CRM, and the latest IT trends to grow your business.",
  },
  "/blogs/[id]": {
    title: "Blog Details",
    description:
      "Explore detailed blog insights from Jaivik Technology on marketing, SEO, and development trends.",
  },
  "/blog/[slug]": {
    title: "Blog Details",
    description:
      "Explore detailed blog insights from Jaivik Technology on marketing, SEO, and development trends.",
  },
  "/branding": {
    title: "Branding Services in India – Jaivik Technology | Build Your Brand",
    description:
      "Jaivik Technology offers expert branding services in India including logo design, brand strategy, identity, and positioning to help businesses stand out and grow effectively.",
  },
  "/brochure": {
    title: "Company Brochure",
    description:
      "Download the official Jaivik Technology company brochure and explore our services.",
  },
  "/careers": {
    title: "Careers at Jaivik Technology – Join Top IT & Digital Company in India",
    description:
      "Explore exciting career opportunities at Jaivik Technology. Join our team of experts in SEO, web development, digital marketing, ERP, CRM, and more.",
  },
  "/contact-us": {
    title: "Contact Jaivik Technology – SEO, Web & Digital Experts",
    description:
      "Get in touch with Jaivik Technology for expert SEO, digital marketing, web development, CRM, ERP, and mobile app services. We're here to help your business grow.",
  },
  "/crm": {
    title: "Best CRM Software for Business Growth – Jaivik Technology",
    description:
      "Boost customer relationships with the best CRM software by Jaivik Technology. Streamlined CRM solutions tailored to manage sales, leads, and customer support.",
  },
  "/cusotmized-software": {
    title: "Customized Software Solutions – Jaivik Technology",
    description:
      "Jaivik Technology offers customized software tailored to your business needs. Scalable, secure, and efficient custom software solutions to drive digital transformation.",
  },
  "/coustmised-software": {
    title: "Customized Software Solutions – Jaivik Technology",
    description:
      "Jaivik Technology offers customized software tailored to your business needs. Scalable, secure, and efficient custom software solutions to drive digital transformation.",
  },
  "/digital-marketing-agency-in-india": {
    title: "Top Digital Marketing Agency in India – Jaivik Technology | Marketing Company",
    description:
      "Jaivik Technology is a leading digital marketing agency in India offering expert digital marketing services. Trusted digital marketing company for growth-driven strategies.",
    keywords:
      "Digital marketing agency in india, Digital Marketing, Digital Marketing Agency, Digital Marketing Company, digital marketing services",
  },
  "/erp": {
    title: "Best ERP Software for Business Efficiency – Jaivik Technology",
    description:
      "Streamline your operations with the best ERP software by Jaivik Technology. Scalable, secure, and tailored ERP solutions to boost productivity and performance.",
    keywords: "best erp software",
  },
  "/film-production": {
    title: "Film Production Services – Jaivik Technology | Video & Ad Creation",
    description:
      "Jaivik Technology offers professional film production services including corporate videos, ad films, brand stories, and creative video content for powerful visual marketing.",
  },
  "/java": {
    title: "Java Development",
    description:
      "Enterprise-grade Java development services for robust, scalable, and secure business applications.",
  },
  "/javascript": {
    title: "JavaScript Development",
    description:
      "Modern JavaScript development for fast, interactive web apps and scalable front-end experiences.",
  },
  "/jquery": {
    title: "jQuery Development",
    description:
      "Efficient jQuery development support for dynamic UI enhancements and legacy project maintenance.",
  },
  "/laravel": {
    title: "Laravel Development",
    description:
      "Custom Laravel web application development with secure architecture and high-performance backend.",
  },
  "/mobile-application": {
    title: "Mobile Application Development Company in India – Jaivik Technology",
    description:
      "Jaivik Technology is a top mobile application development company in India offering custom mobile app solutions to grow your business with scalable and user-friendly apps.",
    keywords:
      "mobile application development company in india, mobile application development company",
  },
  "/mongodb": {
    title: "MongoDB Development",
    description:
      "MongoDB-powered app architecture and backend development for high-scale data-driven applications.",
  },
  "/node-js": {
    title: "Node.js Development",
    description:
      "High-performance Node.js backend development for APIs, real-time systems, and web platforms.",
  },
  "/portfolio": {
    title: "Our Portfolio",
    description:
      "Explore Jaivik Technology's portfolio of digital marketing, software, and web development projects.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "Read Jaivik Technology's privacy policy and how we collect, process, and secure user information.",
  },
  "/python": {
    title: "Python Development",
    description:
      "Python development services for automation, backend systems, and scalable business applications.",
  },
  "/react-js": {
    title: "React.js Development",
    description:
      "React.js development services for modern, high-performance, and SEO-conscious web interfaces.",
  },
  "/seo-services-in-india": {
    title: "SEO Services in India | Best SEO Company & SEO Agency in India",
    description:
      "Looking for professional SEO Services in India? Jaivik Technology is a trusted SEO Agency in India offering Search Engine Optimization, Best SEO Company, local SEO.",
    keywords:
      "SEO agency in India, Best SEO Company, Best SEO Company in India, best seo services in India, ecommerce seo agency, ecommerce seo services, Google seo service, e commerce seo, ecommerce seo, Google Search Engine Optimization, Search Engine Optimisation, SEO, seo agency near me, seo digital marketing, seo for ecommerce website, seo marketing company near me, SEO on Page, SEO Services, SEO Services in India, seo strategy for ecommerce website, seo on shopify, on Page SEO, off Page SEO, technical SEO, website audit",
  },
  "/social-media-marketing": {
    title: "Social Media Marketing Services – Jaivik Technology",
    description:
      "Boost your brand with Jaivik Technology's expert social media marketing services. We manage, grow, and optimize your presence on Facebook, Instagram, LinkedIn & more.",
  },
  "/sql": {
    title: "SQL Development",
    description:
      "SQL database design, optimization, and management solutions for secure and reliable data systems.",
  },
  "/website-development-company": {
    title: "Top Website Development Company in India – Jaivik Technology | Website Solutions",
    description:
      "Jaivik Technology is among the top 10 website development companies in India. A leading website development company offering expert website development for all business needs.",
    keywords:
      "website development companies in India, Website Development Companies, Website Development Company, Website development, Web Development Company, Top 10 web development company",
  },
  "/wordpress": {
    title: "WordPress Development",
    description:
      "WordPress website development, customization, and optimization services for business growth.",
  },
  "/youtube-meta-ads": {
    title: "YouTube & Meta Ads Services – Jaivik Technology",
    description:
      "Jaivik Technology offers expert YouTube and Meta (Facebook & Instagram) Ads services. Boost visibility, drive traffic, and grow your business with high-converting campaigns.",
  },
  "/admin": {
    title: "Admin Login – Jaivik Technology",
    description:
      "Secure admin login page for Jaivik Technology. Authorized personnel only. Access digital operations, web, SEO, and client management tools here.",
    noIndex: true,
  },
};

const normalizePath = (path: string) => {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

const toCanonicalUrl = (path: string) => `${SITE_URL}${normalizePath(path)}`;

export const pageMetadata = (path: string): Metadata => {
  const normalizedPath = normalizePath(path);
  const pageConfig = PUBLIC_PAGE_SEO[normalizedPath];
  const title = pageConfig?.title
    ? `${pageConfig.title}`
    : `${DEFAULT_TITLE} | ${SITE_NAME}`;
  const description = pageConfig?.description || DEFAULT_DESCRIPTION;
  const keywords = pageConfig?.keywords || DEFAULT_KEYWORDS;
  const canonical = toCanonicalUrl(normalizedPath);
  const shouldNoIndex = Boolean(pageConfig?.noIndex);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: shouldNoIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
};

export const adminNoIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};
