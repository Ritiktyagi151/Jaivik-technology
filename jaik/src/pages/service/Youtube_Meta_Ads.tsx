"use client";

import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEOManagement from "../../components/seo/SEOManagement";

// Define types for sections
interface Section {
  title: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}

interface ExpandedSections {
  [key: number]: boolean;
}

const Youtube_Meta_Ads: React.FC = () => {
  // Initialize expandedSections for sections (0–16)
  const initialExpandedSections: ExpandedSections = {};
  for (let i = 0; i <= 16; i++) {
    initialExpandedSections[i] = false;
  }
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    initialExpandedSections
  );

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const sections: Section[] = [
    {
      title: "Understanding Digital Advertising",
      content: (
        <>
          A Brief Overview of the Digital Advertising Landscape: Digital
          advertising has revolutionized how businesses connect with audiences,
          offering precise targeting and real-time performance measurement.
          Unlike traditional methods, it enables dynamic campaign adjustments
          across diverse channels like search engines, social media, video
          platforms, and display networks. This multi-channel approach allows
          tailored messaging based on user preferences, behavior, and
          demographics.
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Approach: Jaivik Technology designs integrated campaigns
              across these platforms, optimizing performance to achieve your
              business goals and maximize ROI.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Social-Media-Marketing-Introduction.avif",
      alt: "Digital Advertising Overview",
    },
    {
      title: "Why PPC, Meta, and YouTube Ads Matter",
      content: (
        <>
          Modern Marketing Strategy - Importance of PPC, Meta, and YouTube Ads:
          These platforms are critical for digital success. PPC connects
          businesses with high-intent users via Google and Bing, driving instant
          traffic. Meta Ads leverage billions of users on Facebook and Instagram
          for precise audience segmentation, ideal for awareness, leads, and
          sales. YouTube, the second-largest search engine, combines massive
          reach with video storytelling for engaging brand visibility.
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Strategy: Jaivik Technology leverages their strengths to
              create cohesive campaigns, maximizing reach and conversions.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Why-PPC-Meta,-and-YouTube-Ads-Matter.webp",
      alt: "Role of PPC, Meta, YouTube",
      reverse: true,
    },
    {
      title: "What is PPC Advertising?",
      content: (
        <>
          What is PPC (Pay-Per-Click)? PPC is an online advertising model where
          advertisers pay only when their ad is clicked, driving targeted
          website visits. It’s effective for generating leads and sales by
          reaching users actively searching for relevant products or services.
          Advertisers bid on keywords to display ads during relevant searches,
          using tools like Google Keyword Planner for strategic keyword
          selection.
          <br />
          How PPC Works:
          <br />• Keyword Research: Identify relevant, high-volume,
          low-competition keywords.
          <br />• Ad Creation: Craft compelling ads with headlines, CTAs, and
          visuals.
          <br />• Bidding: Set max bids for clicks, determined by ad auctions.
          <br />• Ad Auction: Ads compete based on bid, relevance, and expected
          CTR.
          <br />• Cost Per Click (CPC): Pay only for clicks, often below max
          bid.
          <br />• Performance Tracking: Monitor impressions, clicks, CTR,
          conversions, and ROAS.
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Expertise: Jaivik Technology optimizes PPC campaigns with
              strategic keyword selection and ad creation for cost-effective
              results.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-Advertising.webp",
      alt: "PPC Overview",
    },
    {
      title: "Benefits of PPC Ads",
      content: (
        <>
          The Benefit of PPC Ads: PPC drives quality traffic with measurable
          results. Key benefits include:
          <br />• Quick Results: Instant traffic once campaigns go live.
          <br />• Measurable ROI: Track CTR, conversions, CPC, and ROAS.
          <br />• Budget Control: Set daily budgets and pay only for clicks.
          <br />• High-Intent Targeting: Reach users via keywords, demographics,
          location, and retargeting.
          <br />• Cost-Effectiveness: No minimum spend, adjustable budgets.
          <br />• Instant Impact: Ideal for new businesses, seasonal promotions,
          or events.
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Commitment: Jaivik Technology ensures PPC campaigns deliver
              high-intent traffic and measurable outcomes.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Benefits-of-PPC-Ads.webp",
      alt: "PPC Benefits",
      reverse: true,
    },
    {
      title: "Components of a PPC Campaign",
      content: (
        <>
          Key Components to a PPC Campaign: Effective PPC campaigns include:
          <br />• Keywords: Research high-volume, low-competition terms using
          Google Keyword Planner. Use broad, phrase, exact, and negative match
          types.
          <br />• Ad Copy: Craft compelling headlines, descriptions, and CTAs
          highlighting USPs.
          <br />• Landing Pages: Design relevant, user-friendly pages with clear
          CTAs and trust signals.
          <br />• Quality Score: Improve ad relevance, CTR, and landing page
          experience to lower CPC and boost ad rank.
          {expandedSections[4] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Approach: Jaivik Technology fine-tunes each component to
              drive quality traffic and conversions.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-Campaign.webp",
      alt: "PPC Components",
    },
    {
      title: "Types of PPC Ads",
      content: (
        <>
          PPC Ads: Kinds of PPC Ads: Common formats include:
          <br />• Search Ads: Text-based ads on SERPs for high-intent users,
          ideal for local and service-based businesses.
          <br />• Display Ads: Visual banners on Google Display Network for
          brand awareness.
          <br />• Shopping Ads: Product listings with images and prices for
          e-commerce.
          <br />• Remarketing Ads: Re-engage users who interacted with your
          brand.
          {expandedSections[5] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Selection: Jaivik Technology selects optimal ad types for
              your goals, ensuring engagement and conversions.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-Ad-Types.avif",
      alt: "PPC Ad Types",
      reverse: true,
    },
    {
      title: "Strategies for PPC Success",
      content: (
        <>
          Best Strategies for PPC Success: Maximize results with:
          <br />• Comprehensive Keyword Research: Use Google Keyword Planner for
          high-value, long-tail keywords.
          <br />• Optimized Ad Copy: Create compelling headlines and CTAs with
          emotional triggers.
          <br />• A/B Testing: Test ad creatives, headlines, and targeting for
          performance.
          <br />• Monitor Metrics: Track CPC, CTR, and conversion rates for
          optimization.
          {expandedSections[6] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Strategy: Jaivik Technology uses data-driven strategies to
              enhance PPC performance and ROI.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-Strategies.webp",
      alt: "PPC Strategies",
    },
    {
      title: "Introduction to Meta Ads",
      content: (
        <>
          Meta Ads Overview: Meta Ads reach over 3 billion monthly users on
          Facebook, Instagram, Messenger, and WhatsApp, offering:
          <br />• Global Audience: Target local and international markets.
          <br />• Advanced Targeting: Segment by demographics, interests, and
          behaviors.
          <br />• Diverse Ad Formats: Photo, video, carousel, and Stories ads.
          <br />• Unified Management: Ads Manager simplifies cross-platform
          campaigns.
          <br />• Advanced Analytics: Real-time insights via Ads Manager and
          Business Suite.
          {expandedSections[7] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Expertise: Jaivik Technology creates Meta Ads campaigns that
              drive engagement and conversions.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Meta-Ads-Introduction.webp",
      alt: "Meta Ads Introduction",
      reverse: true,
    },
    {
      title: "Meta Ad Formats",
      content: (
        <>
          A Guide to Meta Ad Formats: Key formats include:
          <br />• Image Ads: Simple visuals with engaging text and CTAs.
          <br />• Video Ads: Storytelling with mobile-optimized formats and
          captions.
          <br />• Carousel Ads: Display up to 10 images/videos with individual
          links.
          <br />• Collection Ads: Mobile-friendly product showcases with Instant
          Experience.
          <br />• Stories/Reels Ads: Full-screen, immersive ads with interactive
          elements.
          <br />• Lead/Instant Experience Ads: Capture leads or create
          interactive content.
          {expandedSections[8] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Optimization: Jaivik Technology optimizes formats for
              campaign objectives, boosting results.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Meta-Ad-Formats.webp",
      alt: "Meta Ad Formats",
    },
    {
      title: "Meta Audience Targeting",
      content: (
        <>
          Understanding Audience Targeting Options on Meta: Options include:
          <br />• Demographic Targeting: Filter by age, gender, education, job
          title, etc.
          <br />• Interests/Behavior Targeting: Target hobbies, purchase habits,
          or device usage.
          <br />• Custom Audiences: Retarget website visitors or engaged users.
          <br />• Lookalike Audiences: Reach users similar to existing
          customers.
          <br />• Geographical/Device Targeting: Target by location or device
          type.
          {expandedSections[9] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Precision: Jaivik Technology reaches the right audiences for
              high relevance and success.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Meta-Audience-Targeting.webp",
      alt: "Meta Audience Targeting",
      reverse: true,
    },
    {
      title: "Creating Meta Ads",
      content: (
        <>
          The Ad Creation Process: Steps include:
          <br />• Set Objectives: Define goals (awareness, consideration,
          conversions).
          <br />• Master Visuals/Copy: Use high-quality visuals and compelling
          CTAs.
          <br />• Configure Campaign: Set audience, budget, and schedule via
          Meta Ads Manager.
          <br />• Optimization: Use A/B testing, analytics, and automated
          bidding for performance.
          {expandedSections[10] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Craftsmanship: Jaivik Technology crafts ads that resonate and
              deliver results.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Meta-Ad-Creation.webp",
      alt: "Meta Ad Creation",
    },
    {
      title: "Why Choose YouTube Ads?",
      content: (
        <>
          Why Advertise on YouTube? Benefits include:
          <br />• Massive Reach: Over 2 billion monthly users across 100+
          countries.
          <br />• High Engagement: Video storytelling with visuals, sound, and
          motion.
          <br />• Advanced Targeting: Reach users by demographics, interests, or
          behaviors.
          <br />• Versatile Formats: Skippable, non-skippable, bumper, and
          discovery ads.
          <br />• Global Access: Available in 80 languages with cross-device
          support.
          {expandedSections[11] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Impact: Jaivik Technology creates YouTube campaigns for brand
              impact and conversions.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Platform-Selection.webp",
      alt: "YouTube Ads",
      reverse: true,
    },
    {
      title: "Types of YouTube Ads",
      content: (
        <>
          Types of YouTube Ads: Formats include:
          <br />• Skippable In-Stream Ads: Skip after 5 seconds, cost-effective
          for engagement.
          <br />• Non-Skippable In-Stream Ads: 15-20 seconds for full message
          delivery.
          <br />• Bumper Ads: 6-second, non-skippable ads for quick impact.
          <br />• Discovery Ads: Appear in search results or recommendations.
          <br />• Sponsored Ads: Overlay banners for subtle promotion.
          {expandedSections[12] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Selection: Jaivik Technology selects formats for engagement
              and efficiency.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Why-PPC-Meta,-and-YouTube-Ads-Matter.webp",
      alt: "YouTube Ad Types",
    },
    {
      title: "Avoiding PPC Mistakes",
      content: (
        <>
          Common Mistakes in PPC Ads: Avoid errors like:
          <br />• Neglecting Negative Keywords: Wastes budget on irrelevant
          clicks.
          <br />• Poor Landing Pages: Causes high bounce rates.
          <br />• Ignoring Mobile Optimization: Misses mobile users.
          <br />• Lack of Monitoring: Fails to optimize performance.
          <br />• Low Quality Score: Increases CPC and reduces ad visibility.
          <br />• Ignoring Audience Segmentation: Leads to generic messaging.
          <br />• No Conversion Tracking: Hinders performance measurement.
          {expandedSections[13] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Prevention: Jaivik Technology avoids pitfalls with strategic
              planning and optimization.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-Mistakes.webp",
      alt: "PPC Mistakes",
      reverse: true,
    },
    {
      title: "PPC vs. Meta vs. YouTube Ads",
      content: (
        <>
          Comparison between PPC, Meta, and YouTube Ads: Strengths and
          weaknesses:
          <br />• PPC: High-intent targeting, quick results, but costly for
          competitive keywords and limited visual appeal.
          <br />• Meta: Advanced targeting, engaging formats, but faces privacy
          challenges and declining organic reach.
          <br />• YouTube: Powerful video storytelling, massive reach, but
          requires content investment and less conversion-focused.
          {expandedSections[14] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Integration: Jaivik Technology integrates platforms for
              effective advertising.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-vs-Meta-vs-YouTube-Ads.avif",
      alt: "Ads Comparison",
    },
    {
      title: "Success Stories",
      content: (
        <>
          PPC, Meta, and YouTube Ads Success Stories: Examples include:
          <br />• PPC: E-commerce brand increased conversions by 45% with Google
          Ads.
          <br />• Meta: Local restaurant boosted foot traffic by 25% with
          targeted ads.
          <br />• YouTube: SaaS company saw 300% increase in free trial
          sign-ups.
          <br /> Key Takeaways: Combine platforms, optimize for mobile, and use
          remarketing for success.
          {expandedSections[15] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Results: Jaivik Technology delivers results with tailored
              campaigns.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Success-Stories.webp",
      alt: "Success Stories",
      reverse: true,
    },
    {
      title: "The Power of PPC, Meta, and YouTube Ads",
      content: (
        <>
          Conclusion: The Strength of PPC, Meta, and YouTube Ads: These
          platforms excel at:
          <br />• PPC: Capturing high-intent users for quick conversions.
          <br />• Meta: Engaging diverse audiences with precise targeting.
          <br />• YouTube: Building trust through video storytelling.
          <br /> Combine them for a comprehensive strategy. Experiment with
          formats, track metrics, and scale campaigns for measurable growth.
          {expandedSections[16] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Assurance: Jaivik Technology ensures campaigns achieve
              visibility and conversions.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Platform-Selection.webp",
      alt: "Conclusion",
    },
    {
      title: "Tools and Resources for PPC, Meta, and YouTube Ads",
      content: (
        <>
          PPC, YouTube, and Meta Ads Tools and Resources: Essential tools
          include:
          <br />• Campaign Creation: Google Ads Editor, Meta Ads Manager, Canva,
          SEMrush/Ahrefs.
          <br />• Optimization: Google Analytics, Meta Pixel Helper, TubeBuddy,
          Optmyzr, Hotjar.
          <br />• Automation: Zapier, AdEspresso, Google Data Studio,
          Supermetrics, Buffer/Hootsuite, Skai.
          <br />• Collaboration: Asana/Trello, Slack, Figma for streamlined
          workflows.
          {expandedSections[17] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Expertise: Jaivik Technology leverages these tools to
              streamline and optimize campaigns for maximum impact.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/PPC-Campaign.webp",
      alt: "Tools and Resources",
    },
    {
      title: "Best Practices for YouTube Ads",
      content: (
        <>
          Best Practices YouTube Ads: Maximize engagement with:
          <br />• Compelling Content: Hook viewers in the first 5 seconds with
          storytelling and quality production.
          <br />• Short Ads: Keep skippable ads 15-30 seconds, front-load key
          messages.
          <br />• Strong CTAs: Use clear, actionable phrases and visual cues.
          <br />• Mobile Optimization: Use vertical/square formats and legible
          fonts.
          <br />• Precise Targeting: Leverage demographics, interests, and
          remarketing.
          <br />• Performance Tracking: Monitor view rate, CPV, watch time, and
          engagement metrics.
          {expandedSections[18] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Approach: Jaivik Technology crafts YouTube ads that captivate
              and convert.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Best-Practices-for-YouTube-Ads.avif",
      alt: "YouTube Best Practices",
      reverse: true,
    },
    {
      title: "FAQ for PPC, Meta, and YouTube Ads",
      content: (
        <>
          FAQ:
          <br />• Budgets: Start with $20-$50/day for PPC, $10-$30/day for Meta,
          $50-$100/day for YouTube.
          <br />• Ad Types: PPC (text, shopping, display), Meta (image, video,
          carousel), YouTube (skippable, non-skippable, bumper).
          <br />• Improvement Tips: A/B test creatives, retarget users, optimize
          budgets.
          <br />• Monitoring: Use Google Ads, YouTube Studio, Meta Ads Manager
          for metrics like CTR, CPC, ROAS.
          <br />• Cross-Platform: Combine PPC for intent, Meta for engagement,
          YouTube for awareness.
          <br />• Professional Help: Optional for advanced optimization and
          better ROI.
          <br />• Results Timeline: PPC (days), Meta (1-2 weeks), YouTube
          (longer for engagement).
          <br />• Mistakes to Avoid: Unclear objectives, poor targeting,
          low-quality creatives, lack of monitoring.
          {expandedSections[19] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <br />
              Our Guidance: Jaivik Technology provides expert support to
              navigate these platforms for optimal results.
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Why-PPC-Meta,-and-YouTube-Ads-Matter.webp",
      alt: "FAQ",
    },
  ];

  // Initialize sectionRefs for sections
  const sectionRefs = sections.map(() =>
    useInView({ threshold: 0.2, triggerOnce: true })
  );

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="font-sans text-gray-100 bg-gray-900 m-0 p-0 box-border relative z-0 overflow-hidden">
      <SEOManagement title="YouTube & Meta Ads Services – Jaivik Technology" 
      description=" Jaivik Technology offers expert YouTube and Meta (Facebook & Instagram) Ads services. Boost visibility, drive traffic, and grow your business with high-converting campaigns." 
      keywords=" YouTube & Meta Ads Services" 
      canonical=""/>
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-900 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-purple-900 rounded-full filter blur-3xl opacity-20"></div>
      </motion.div>

      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10 overflow-hidden"
        style={{
          backgroundImage: `url('')`,
          opacity, // Apply the scroll-based opacity transform
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="PPC Hero"
        id="ppc-hero"
      >
        <div className="absolute inset-0 bg-opacity-80 z-10"></div>
        <motion.div
          className="relative z-20 px-5 w-full max-w-7xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Master PPC, Meta, and YouTube Ads with Jaivik Technology
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Unlock the power of PPC, Meta, and YouTube Ads to drive targeted
            traffic, engage audiences, and boost conversions with expert
            strategies from Jaivik Technology.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("ppc-overview")}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
            aria-label="Explore PPC Strategies"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explore Now
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaChevronDown className="ml-2" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      <div
        className="w-full mx-auto px-5 py-12 md:py-16 relative z-20 bg-gray-900"
        id="ppc-overview"
      >
        <div className="mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              ref={sectionRefs[index][0]}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 items-center bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm mb-12 hover:shadow-lg hover:shadow-blue-900/20`}
              initial="hidden"
              animate={sectionRefs[index][1] ? "visible" : "hidden"}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex-1"
                variants={staggerContainer}
                initial="hidden"
                animate={sectionRefs[index][1] ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={staggerItem}
                  className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6"
                >
                  {section.title}
                </motion.h2>
                <motion.div
                  variants={staggerItem}
                  className="text-gray-300 leading-relaxed mb-4"
                >
                  {section.content}
                </motion.div>
                <motion.button
                  onClick={() => toggleSection(index)}
                  className="flex items-center text-blue-400 font-medium mt-4 transition-colors duration-300 hover:text-blue-300"
                  whileHover={{ x: 5 }}
                  aria-label={`Toggle ${section.title}`}
                >
                  {expandedSections[index] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${
                      expandedSections[index] ? "transform rotate-90" : ""
                    }`}
                  />
                </motion.button>
              </motion.div>
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ x: section.reverse ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-96 rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Youtube_Meta_Ads;
