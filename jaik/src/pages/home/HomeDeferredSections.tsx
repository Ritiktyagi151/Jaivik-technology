"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import LazySection from "@/components/performance/LazySection";

const withSectionFallback = (
  importer: () => Promise<{ default: ComponentType<Record<string, never>> }>,
  minHeight: number
) =>
  dynamic(importer, {
    loading: () => <div style={{ minHeight }} aria-hidden="true" />,
  });

const WebsiteSection = withSectionFallback(() => import("./WebsiteSection"), 350);
const OurTechnologies = withSectionFallback(() => import("./OurTechnologies"), 260);
const SocialMediaSection = withSectionFallback(
  () => import("./SocialMediaSection"),
  360
);
const MobileAppSection = withSectionFallback(
  () => import("./MobileAppSection"),
  520
);
const SocialMediaPostSection = withSectionFallback(
  () => import("./SocialMediaPostSection"),
  180
);
const OurVideosSection = withSectionFallback(() => import("./OurVideosSection"), 220);
const GalleryImages = withSectionFallback(() => import("./GalleryImages"), 220);
const CorporateVideosSection = withSectionFallback(
  () => import("./CorporateVideosSection"),
  320
);
const OurTestimonials = withSectionFallback(
  () => import("./OurTestimonials"),
  220
);
const BlogsSection = withSectionFallback(() => import("./BlogsSection"), 240);
const OurServices = withSectionFallback(() => import("./OurSerives"), 220);
const TeamVideoSlider = withSectionFallback(() => import("./TeamVideoSlider"), 220);
const ReviewsSection = withSectionFallback(() => import("./ReviewsSection"), 220);
const OurClients = withSectionFallback(() => import("./OurClients"), 140);
const EnquireSection = withSectionFallback(() => import("./EnquireSection"), 220);

const HomeDeferredSections = () => {
  return (
    <>
      <LazySection minHeight={390} rootMargin="0px 0px">
        <WebsiteSection />
      </LazySection>
      <LazySection minHeight={260}>
        <OurTechnologies />
      </LazySection>
      <LazySection minHeight={360}>
        <SocialMediaSection />
      </LazySection>
      <LazySection minHeight={520}>
        <MobileAppSection />
      </LazySection>
      <LazySection minHeight={180}>
        <SocialMediaPostSection />
      </LazySection>
      <LazySection minHeight={220}>
        <OurVideosSection />
      </LazySection>
      <LazySection minHeight={220}>
        <GalleryImages />
      </LazySection>
      <LazySection minHeight={320}>
        <CorporateVideosSection />
      </LazySection>
      <LazySection minHeight={220}>
        <OurTestimonials />
      </LazySection>
      <LazySection minHeight={240}>
        <BlogsSection />
      </LazySection>
      <LazySection minHeight={220}>
        <OurServices />
      </LazySection>
      <LazySection minHeight={220}>
        <TeamVideoSlider />
      </LazySection>
      <LazySection minHeight={220}>
        <ReviewsSection />
      </LazySection>
      <LazySection minHeight={140}>
        <OurClients />
      </LazySection>
      <LazySection minHeight={220}>
        <EnquireSection />
      </LazySection>
    </>
  );
};

export default HomeDeferredSections;
