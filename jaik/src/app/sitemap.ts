import type { MetadataRoute } from "next";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.jaikvik.in").replace(
    /\/$/,
    ""
  );

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/blogs",
  "/branding",
  "/brochure",
  "/careers",
  "/contact-us",
  "/crm",
  "/cusotmized-software",
  "/digital-marketing-agency-in-india",
  "/erp",
  "/film-production",
  "/gallery",
  "/java",
  "/javascript",
  "/jquery",
  "/laravel",
  "/mobile-application",
  "/mongodb",
  "/node-js",
  "/portfolio",
  "/privacy-policy",
  "/python",
  "/react-js",
  "/seo-services-in-india",
  "/social-media-marketing",
  "/sql",
  "/website-development-company",
  "/wordpress",
  "/youtube-meta-ads",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
