import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import ClientLayoutWrapper from "@/layouts/ClientLayoutWrapper";
import { pageMetadata } from "@/lib/seo";
import InteractionAnalytics from "@/components/performance/InteractionAnalytics";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  ...pageMetadata("/"),
  verification: {
    google: "X2yD33PfPoVCpTrJj89X2NimQXPRWR76wfD1Z28kUQA",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/logos/favicon.png",
        type: "image/png",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "",
      name: "Jaivik Technology",
      image: "",
      url: "",
      logo: "",
      description:
        "Jaivik Technology offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more. Trusted tech partner for business growth.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "A 82, Sector 63",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201301",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "28.6280",
        longitude: "77.3705",
      },
      telephone: "+91-9220826934",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9220826934",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
      sameAs: [
        "https://www.facebook.com/jaikviktechnology",
        "https://www.instagram.com/jaikviktechnology/",
        "https://twitter.com/jaikvik",
        "https://www.youtube.com/@jaikviktechnology",
        "https://www.linkedin.com/company/jaikviktechnology/",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      ],
      priceRange: "$$",
    },
  ],
};

const organizationSchema = {
  "@context": "",
  "@type": "Organization",
  "@id": "",
  name: "Jaivik Technology",
  url: "",
  logo: "",
  description:
    "Jaivik Technology offers digital marketing, SEO services, web and mobile app development, ERP, CRM, and more. Trusted tech partner for business growth.",
  sameAs: [
    "https://www.facebook.com/jaikviktechnology",
    "https://www.instagram.com/jaikviktechnology/",
    "https://twitter.com/jaikvik",
    "https://www.youtube.com/@jaikviktechnology",
    "https://www.linkedin.com/company/jaikviktechnology/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://jaikvik.in" />
        <link rel="preconnect" href="https://jaikvik.in" crossOrigin="anonymous" />
      </head>
      <body className={mulish.className} suppressHydrationWarning>
        <InteractionAnalytics />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <AppProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
