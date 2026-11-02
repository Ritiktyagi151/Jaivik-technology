"use client";

import { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEOManagement from "../../components/seo/SEOManagement";

interface Section {
  id: number;
  title: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  sectionId: string;
}

interface SectionRef {
  ref: (node?: Element | null) => void;
  inView: boolean;
}

const SocialMediaMarketing = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >(
    Array.from({ length: 18 }).reduce<Record<number, boolean>>(
      (acc, _, index) => ({ ...acc, [index]: false }),
      {}
    )
  );

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
  const sections: Section[] = [
    {
      id: 0,
      title:
        "Social Media Marketing Introduction: Connecting Brands with Audiences",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">
              Social Media Marketing (SMM)
            </span>{" "}
            involves using social media networks strategically to promote a{" "}
            <span className="font-bold text-red-400">
              brand, product, or service
            </span>
            . Its activities include producing and sharing marketing content,
            running targeted advertisements, and interacting directly with
            audiences to achieve business objectives.
          </p>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            The experience of social media elevates digital marketing through{" "}
            <span className="font-bold text-red-400">
              real-time communication
            </span>
            , fostering{" "}
            <span className="font-bold text-red-400">brand loyalty</span>, and
            delivering measurable outcomes. It complements strategies like{" "}
            <span className="font-bold text-red-400">
              SEO, email marketing, and content marketing
            </span>
            , providing straightforward access to audiences where they spend
            much of their time online.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                SMM leverages platforms like{" "}
                <span className="font-bold text-red-400">
                  Facebook, Instagram, LinkedIn, and Twitter
                </span>{" "}
                to create meaningful connections. By combining creativity with
                analytics, businesses can craft campaigns that resonate deeply.
                At{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>
                , we specialize in tailored SMM strategies that align with your
                business goals for maximum impact and measurable results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Social-Media-Marketing-Introduction.avif",
      alt: "Social Media Marketing Introduction",
      sectionId: "smm-introduction",
    },
    {
      id: 1,
      title: "Social Media Marketing Importance in the Digital Age",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Social media platforms like{" "}
            <span className="font-bold text-red-400">
              Facebook, Instagram, LinkedIn, and Twitter
            </span>{" "}
            offer millions to billions of opportunities for businesses to
            connect with their audience.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Increase Brand Awareness:
              </span>{" "}
              Social media channels enable brands to reach diverse global
              audiences effortlessly.
            </li>
            <li>
              <span className="font-bold text-red-400">Boost Engagement:</span>{" "}
              Businesses can create connections through likes, comments, and
              shares.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Customer Relationship Insights:
              </span>{" "}
              Analytical tools provide deep insights into audience behavior and
              preferences.
            </li>
            <li>
              <span className="font-bold text-red-400">
                More Traffic and Higher Conversion Rates:
              </span>{" "}
              Compelling posts and ads drive users to websites or e-commerce
              platforms.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Drive Brand Loyalty:
              </span>{" "}
              Consistent engagement builds trust and long-term relationships.
            </li>
          </ul>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Social media’s pivotal role offers businesses unparalleled
                opportunities to connect globally. By leveraging targeted
                campaigns and real-time analytics, brands can optimize for
                measurable growth.{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology’s SMM solutions
                </span>{" "}
                help you stay competitive in a digital-first world.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/SMM-Importance.webp",
      alt: "SMM Importance",
      reverse: true,
      sectionId: "smm-importance",
    },
    {
      id: 2,
      title: "Overview of Social Media Platforms",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Each social media platform serves a unique audience, making it
            essential to understand their distinct features:
          </p>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                Facebook
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span> Young
                teenagers to seniors.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Business pages,
                groups, live videos, marketplace, and targeted ads.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Brand
                storytelling, community building, and lead generation.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                Instagram
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span>{" "}
                Image-centric Millennials and Gen Z.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Stories, Reels,
                IGTV, and shopping options.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Visual
                storytelling, influencer marketing, product showcasing.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                LinkedIn
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span>{" "}
                Professionals and B2B businesses.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Company pages, job
                applications, professional networking, thought leadership
                content.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Employer branding,
                lead generation, industry insights.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
                Twitter
              </h4>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Target Audience:</span> News-savvy,
                tech enthusiasts, and trend followers.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Features:</span> Real-time updates,
                hashtags, polls, and concise messaging.
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold">Use Cases:</span> Customer service,
                brand voice establishment, crisis communication.
              </p>
            </div>
          </div>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Understanding each platform’s strengths allows businesses to
                tailor strategies effectively. For example,{" "}
                <span className="font-bold text-red-400">
                  Instagram’s visual focus
                </span>{" "}
                suits lifestyle brands, while{" "}
                <span className="font-bold text-red-400">
                  LinkedIn’s professional network
                </span>{" "}
                is ideal for B2B companies.{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                optimizes platform selection to maximize reach and engagement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/smm-platforms.avif",
      alt: "Social Media Platforms",
      sectionId: "smm-platforms",
    },
    {
      id: 3,
      title: "The Importance of Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            In today’s digital-first world, social media marketing is a
            necessity for businesses aiming to thrive in a competitive market.
            It offers unparalleled opportunities to grow and connect with
            customers. Here are the top five reasons why every brand needs SMM:
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Expanding Brand Recognition:
              </span>{" "}
              Social media reaches billions, enabling brands to increase
              visibility through engaging content, creating a strong online
              presence globally.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Increased Engagement with the Target Audience:
              </span>{" "}
              Social media enables two-way communication through comments,
              likes, shares, and direct messages, fostering trust and strong
              relationships.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Affordable Advertisement:
              </span>{" "}
              SMM offers targeted advertising at a fraction of traditional
              costs, delivering measurable results without breaking budgets.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Insight and Analytics for Optimization:
              </span>{" "}
              Social media provides robust analytics for tracking audience
              preferences, content performance, and campaign effectiveness,
              enabling data-driven decisions.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Connect Directly with Customers and Prospects:
              </span>{" "}
              Brands can address queries, collect feedback, and build personal
              relationships, improving satisfaction and loyalty.
            </li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                Social media’s pivotal role offers businesses unparalleled
                opportunities to connect globally. By leveraging targeted
                campaigns and real-time analytics, brands can optimize for
                measurable growth.{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology’s SMM solutions
                </span>{" "}
                help you stay competitive in a digital-first world.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/smm-Importance.avif",
      alt: "SMM Importance",
      reverse: true,
      sectionId: "smm-importance-extended",
    },
    {
      id: 4,
      title: "Setting Goals for Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            The first step to successful social media marketing is clearly
            defined goals. They ensure your efforts align with your business
            strategy and deliver measurable results.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Importance of SMART Goals
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Specific:</span> Clearly
              state what you aim to accomplish. Example: "Increase Instagram
              followers by 20%."
            </li>
            <li>
              <span className="font-bold text-red-400">Measurable:</span> Use
              quantifiable metrics to track progress. Example: "Generate 50
              leads through LinkedIn campaigns."
            </li>
            <li>
              <span className="font-bold text-red-400">Achievable:</span> Set
              realistic targets based on resources and past performance.
              Example: "Boost website traffic by 10% in three months."
            </li>
            <li>
              <span className="font-bold text-red-400">Relevant:</span> Align
              goals with overall business objectives. Example: "Improve brand
              visibility to attract potential customers."
            </li>
            <li>
              <span className="font-bold text-red-400">Time-Bound:</span>{" "}
              Specify a deadline for goal completion. Example: "Achieve a 5%
              increase in sales within six months."
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Examples of Common Social Media Marketing Objectives
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Brand Awareness:</span>{" "}
              Reach 5,000 additional followers on Instagram in six months,
              increasing brand visibility.
            </li>
            <li>
              <span className="font-bold text-red-400">Lead Generation:</span>{" "}
              Collect 100 leads through Facebook ads within a month, bringing
              potential customers into the sales funnel.
            </li>
            <li>
              <span className="font-bold text-red-400">Website Traffic:</span>{" "}
              Achieve a 15% increase in website visitors from Twitter campaigns
              over the next quarter.
            </li>
            <li>
              <span className="font-bold text-red-400">Sales Growth:</span>{" "}
              Produce $10,000 in sales through Instagram shoppable posts within
              three months, directly improving revenue.
            </li>
          </ul>
          {expandedSections[4] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                A well-crafted SMM strategy with SMART goals aligns with your
                marketing objectives and leverages platform features. At{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>
                , we develop customized strategies that reflect your brand voice
                and deliver measurable results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/SMM-Goal-Setting.avif",
      alt: "SMM Goal Setting",
      sectionId: "smm-goals",
    },
    {
      id: 5,
      title: "Know the Target Audience in Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Understanding your audience is critical for creating effective
            social media marketing campaigns that resonate with them.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Importance of Audience Research
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Customize Content:</span>{" "}
              Tailor content to the interests, demands, and pain points of your
              prospects.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Construct Engagement:
              </span>{" "}
              Create content that speaks directly to the preferences and
              behavior of your target group.
            </li>
            <li>
              <span className="font-bold text-red-400">Optimize Ad Spend:</span>{" "}
              Reach the right people to avoid wasting resources.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Tools for Audience Analysis
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Google Analytics:</span>{" "}
              Tracks website visitors’ behavior, demographics, and interests to
              identify high-performing social platforms.
            </li>
            <li>
              <span className="font-bold text-red-400">Facebook Insights:</span>{" "}
              Provides analytics on page and post performance, including
              audience demographics and engagement.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Instagram Insights:
              </span>{" "}
              Offers metrics on engagement, reach, and follower demographics to
              optimize content.
            </li>
            <li>
              <span className="font-bold text-red-400">Twitter Analytics:</span>{" "}
              Tracks tweet performance and audience interests to refine content
              strategy.
            </li>
            <li>
              <span className="font-bold text-red-400">
                LinkedIn Analytics:
              </span>{" "}
              Provides follower demographics and post-performance data for B2B
              audiences.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Developing Buyer Personas
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            A buyer persona is a semi-fictional representation of your ideal
            customer based on real data. Creating personas helps craft targeted
            content.
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Demographics:</span> Age,
              gender, location, job title, income level.
            </li>
            <li>
              <span className="font-bold text-red-400">Psychographics:</span>{" "}
              Interests, behaviors, values, lifestyle.
            </li>
            <li>
              <span className="font-bold text-red-400">Pain Points:</span>{" "}
              Challenges and struggles.
            </li>
            <li>
              <span className="font-bold text-red-400">Goals:</span> Personal
              and professional aspirations.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Preferred Channels:
              </span>{" "}
              Platforms where they spend time online (e.g., Facebook,
              Instagram).
            </li>
          </ul>
          {expandedSections[5] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                At{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>
                , we use advanced audience analysis tools and persona
                development to create targeted SMM campaigns that resonate with
                your audience and drive results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Audience-Research.webp",
      alt: "Audience Research",
      reverse: true,
      sectionId: "smm-audience",
    },
    {
      id: 6,
      title: "Choosing the Right Social Media Platforms",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Choosing the right social media platforms is critical for the
            success of your marketing strategies. Each platform appeals to
            specific audiences and offers unique advantages.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Platform-Specific Advantages
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Facebook - Broader Reach:
              </span>{" "}
              Over 2.9 billion monthly active users of various age groups. Ideal
              for brand awareness, community engagement, and targeted ads.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Instagram - Visual Focus:
              </span>{" "}
              Appeals to Millennials and Gen Z with high-quality photos, reels,
              and stories. Best for influencer marketing and e-commerce.
            </li>
            <li>
              <span className="font-bold text-red-400">
                LinkedIn - B2B Marketing:
              </span>{" "}
              Targets professionals and businesses for networking, thought
              leadership, and lead generation.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Twitter - Real-Time Updates:
              </span>{" "}
              Suits news-savvy audiences for customer support, public relations,
              and trending conversations.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Aligning Platforms with Goals
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Know Your Audience:
              </span>{" "}
              Use analytics tools to identify where your audience spends time
              online.
            </li>
            <li>
              <span className="font-bold text-red-400">Define Your Goals:</span>{" "}
              Choose platforms based on objectives (e.g., sales via Instagram,
              professional connections via LinkedIn).
            </li>
            <li>
              <span className="font-bold text-red-400">
                Match Content to Platforms:
              </span>{" "}
              Tailor content to each platform’s strengths (e.g., reels on
              Instagram, articles on LinkedIn).
            </li>
          </ul>
          {expandedSections[6] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                helps you select and optimize the right platforms to align with
                your audience demographics and business goals, ensuring maximum
                impact.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Platform-Selection.webp",
      alt: "Platform Selection",
      sectionId: "smm-platform-selection",
    },
    {
      id: 7,
      title: "Content Creation for Social Media",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Engaging content is the cornerstone of successful{" "}
            <span className="font-bold text-red-400">
              social media marketing
            </span>
            .
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Significance of Quality Content
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Quality content delivers value by informing, entertaining, or
            solving problems, compelling users to engage and return. It
            positions your brand as a trusted authority, building loyalty and
            credibility.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Content Types
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Images:</span>{" "}
              High-quality photos and infographics for immediate impact.
            </li>
            <li>
              <span className="font-bold text-red-400">Videos:</span> Short
              clips, tutorials, or behind-the-scenes content for deeper
              engagement.
            </li>
            <li>
              <span className="font-bold text-red-400">Infographics:</span>{" "}
              Simplified presentations of complex data or concepts.
            </li>
            <li>
              <span className="font-bold text-red-400">Stories:</span>{" "}
              Temporary, interactive posts for immediate updates.
            </li>
            <li>
              <span className="font-bold text-red-400">Reels:</span> Short-form
              videos for trends and entertainment.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Balancing Content Types
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Promotional Content:
              </span>{" "}
              Showcase products subtly, keeping it value-driven.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Educational Content:
              </span>{" "}
              Provide guides, tips, or industry insights addressing pain points.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Entertaining Content:
              </span>{" "}
              Use humor, trends, or relatable stories for emotional connections.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Harnessing User-Generated Content (UGC)
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Why It Works:</span> UGC
              like reviews and customer posts builds authenticity and trust.
            </li>
            <li>
              <span className="font-bold text-red-400">How to Apply It:</span>{" "}
              Encourage customers to share experiences and feature them in
              campaigns.
            </li>
          </ul>
          {expandedSections[7] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                At{" "}
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>
                , we specialize in creating platform-specific content that
                drives engagement and conversions, aligning with your brand
                identity and business objectives.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=740&q=80",
      alt: "Content Creation",
      reverse: true,
      sectionId: "smm-content",
    },
    {
      id: 8,
      title: "Harness the Power of Paid Social Media Campaigns",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Paid social media campaigns are invaluable for businesses looking to
            scale and connect with their audience in the digital era.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Overview of Paid Campaigns
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Paid campaigns promote content or advertisements via platforms like
            Facebook, Instagram, LinkedIn, and Twitter, using advanced targeting
            algorithms.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Key Benefits
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Accurate Targeting:
              </span>{" "}
              Target audiences by demographics, interests, behavior, and
              geography.
            </li>
            <li>
              <span className="font-bold text-red-400">Scalable:</span> Flexible
              budgets allow starting small and scaling based on results.
            </li>
            <li>
              <span className="font-bold text-red-400">Instant Results:</span>{" "}
              Paid ads provide immediate visibility and measurable impact.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Ad Types
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Sponsored Posts:</span>{" "}
              Native ads integrated into feeds for visibility.
            </li>
            <li>
              <span className="font-bold text-red-400">Carousels:</span>{" "}
              Showcase multiple products or services through slides.
            </li>
            <li>
              <span className="font-bold text-red-400">Stories:</span> Engaging,
              short-form content on Instagram, Facebook, or Snapchat.
            </li>
            <li>
              <span className="font-bold text-red-400">Videos:</span> Compelling
              visuals to capture attention and convey messages.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Managing Budgets
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Start with a small budget to test ad performance, then invest in
            high-performing formats to maximize ROI.
          </p>
          {expandedSections[8] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                creates data-driven ad campaigns that maximize ROI, refining
                targeting and messaging for optimal results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/SMM-Goal-Setting.avif",
      alt: "Paid Campaigns",
      sectionId: "smm-paid-campaigns",
    },
    {
      id: 9,
      title: "A Detailed Guide to Creating a Content Calendar",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            A content calendar is a vital tool for creating and distributing
            content reliably and efficiently, ensuring consistency and strategic
            alignment.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Why Planning and Consistency Matter
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Clarity and Organization:
              </span>{" "}
              Aligns content with business goals and audience interests.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Effective Time Management:
              </span>{" "}
              Reduces last-minute pressures and improves productivity.
            </li>
            <li>
              <span className="font-bold text-red-400">Consistency:</span>{" "}
              Builds trust through regular posting.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Strategic Alignment:
              </span>{" "}
              Aligns content with key dates, events, and campaigns.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Tools for Scheduling
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Hootsuite:</span> Manages
              multiple platforms with scheduling, analytics, and collaboration
              tools.
            </li>
            <li>
              <span className="font-bold text-red-400">Buffer:</span> Simplifies
              post scheduling and tracking across channels.
            </li>
            <li>
              <span className="font-bold text-red-400">Later:</span> Focuses on
              visual platforms like Instagram with drag-and-drop scheduling.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Balancing Evergreen and Trending Content
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Evergreen Content:</span>{" "}
              Timeless content like guides and FAQs drives long-term traffic.
            </li>
            <li>
              <span className="font-bold text-red-400">Trending Topics:</span>{" "}
              Relate to current events or trends for higher engagement.
            </li>
            <li>
              <span className="font-bold text-red-400">Integration:</span>{" "}
              Combine evergreen and trending topics for a balanced strategy.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Steps to Create a Content Calendar
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Set Goals:</span> Define
              objectives like engagement or conversions.
            </li>
            <li>
              <span className="font-bold text-red-400">Identify Audience:</span>{" "}
              Understand audience needs and behavior.
            </li>
            <li>
              <span className="font-bold text-red-400">Pick Format:</span> Use
              tools like Google Sheets or Trello for planning.
            </li>
            <li>
              <span className="font-bold text-red-400">Thematize Content:</span>{" "}
              Schedule themed posts for relevance.
            </li>
            <li>
              <span className="font-bold text-red-400">Schedule Posts:</span>{" "}
              Automate posting with scheduling tools.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Analyze and Adjust:
              </span>{" "}
              Refine based on performance metrics.
            </li>
          </ul>
          {expandedSections[9] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                creates tailored content calendars that streamline your SMM
                efforts, ensuring consistency and strategic alignment.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/smm-Importance.avif",
      alt: "Content Calendar",
      reverse: true,
      sectionId: "smm-content-calendar",
    },
    {
      id: 10,
      title: "Interacting with Your Audience",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Audience engagement is the heart of building trust, fostering
            relationships, and driving growth through social media.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            React to Comments and Messages
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Show Attentiveness:
              </span>{" "}
              Prompt responses to comments and messages build trust.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Personalize Responses:
              </span>{" "}
              Use names and show genuine interest to enhance interaction.
            </li>
            <li>
              <span className="font-bold text-red-400">Address Issues:</span>{" "}
              Solve queries and redirect complex issues to appropriate channels.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Live Sessions, Q&A, and Polls
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Host Live Sessions:
              </span>{" "}
              Share insights or tutorials on Instagram, YouTube, or LinkedIn,
              engaging viewers in real time.
            </li>
            <li>
              <span className="font-bold text-red-400">Ask Questions:</span> Use
              features like Instagram’s “Questions” sticker to encourage
              audience interaction.
            </li>
            <li>
              <span className="font-bold text-red-400">Polls and Surveys:</span>{" "}
              Collect opinions with quick polls on Instagram Stories or Twitter.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Deliver Consistent Value
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Educational Content:
              </span>{" "}
              Share tips, tutorials, or industry news aligned with audience
              interests.
            </li>
            <li>
              <span className="font-bold text-red-400">Entertainment:</span> Use
              humor or relatable stories to engage.
            </li>
            <li>
              <span className="font-bold text-red-400">Exclusive Rewards:</span>{" "}
              Offer insider information or discounts to boost engagement.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            User-Generated Content
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Customer Testimonials:
              </span>{" "}
              Highlight reviews or success stories to build trust.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Encourage Content Creation:
              </span>{" "}
              Feature user posts with incentives like discounts or shoutouts.
            </li>
          </ul>
          {expandedSections[10] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                develops engagement strategies that foster authentic
                connections, driving trust and loyalty with your audience.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Interacting-with-Your-Audience.webp",
      alt: "Audience Engagement",
      sectionId: "smm-engagement",
    },
    {
      id: 11,
      title: "Analysing Metrics and Performance",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Analyzing metrics ensures your social media efforts are successful
            and informs strategy improvements.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Key Metrics for Monitoring
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Reach:</span> Measures
              the total number of people who see your content, indicating
              audience size.
            </li>
            <li>
              <span className="font-bold text-red-400">Engagement:</span> Tracks
              likes, shares, comments, and saves to gauge content resonance.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Click-Through Rates (CTR):
              </span>{" "}
              Percentage of users clicking links, reflecting content
              effectiveness.
            </li>
            <li>
              <span className="font-bold text-red-400">Conversion Rate:</span>{" "}
              Measures users completing desired actions, like purchases or
              sign-ups.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Analytical Tools
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Meta Business Suite:
              </span>{" "}
              Manages and analyzes metrics for Facebook and Instagram, including
              reach and demographics.
            </li>
            <li>
              <span className="font-bold text-red-400">Twitter Analytics:</span>{" "}
              Reports tweet performance, impressions, and engagement rates.
            </li>
            <li>
              <span className="font-bold text-red-400">LinkedIn Insights:</span>{" "}
              Provides data on follower demographics and post performance for
              B2B audiences.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Harnessing Data
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Identify Patterns:</span>{" "}
              Spot trends in post types or timing for optimization.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Experiment and Optimize:
              </span>{" "}
              Use A/B testing to refine formats and schedules.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Focus on Weak Links:
              </span>{" "}
              Improve low-performing areas like CTR with better headlines.
            </li>
            <li>
              <span className="font-bold text-red-400">Set Clear Goals:</span>{" "}
              Use data to set measurable objectives, like boosting engagement by
              15%.
            </li>
          </ul>
          {expandedSections[11] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                provides comprehensive analytics dashboards and performance
                reports, transforming data into actionable insights for
                continuous improvement.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Analysing-Metrics-and-Performance.jpg",
      alt: "Social Media Analytics",
      reverse: true,
      sectionId: "smm-analytics",
    },
    {
      id: 12,
      title: "Trends in Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Staying ahead of{" "}
            <span className="font-bold text-red-400">emerging trends</span>{" "}
            keeps your social strategy relevant and effective.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Social Commerce and Shoppable Posts
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Shoppable Posts:</span>{" "}
              Enable direct purchases from posts on platforms like Instagram and
              Pinterest.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Live Shopping Events:
              </span>{" "}
              Showcase products in real time for interactive shopping
              experiences.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Integrated Storefronts:
              </span>{" "}
              Facebook and Instagram’s shopping features simplify conversions.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Sustainability and Authenticity
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Sustainability Messaging:
              </span>{" "}
              Highlight eco-friendly practices to appeal to conscious audiences.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Authentic Storytelling:
              </span>{" "}
              Share genuine stories to build trust and emotional connections.
            </li>
            <li>
              <span className="font-bold text-red-400">Transparency:</span> Open
              business practices foster credibility and loyalty.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            AI and AR Integration
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                AI-Powered Personalization:
              </span>{" "}
              Tailor ads and content using machine learning.
            </li>
            <li>
              <span className="font-bold text-red-400">
                AR-Enhanced Engagement:
              </span>{" "}
              Offer virtual try-ons for interactive experiences.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Chatbot Automation:
              </span>{" "}
              Provide customer support to enhance satisfaction.
            </li>
          </ul>
          {expandedSections[12] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                monitors the social media landscape to implement innovative
                trends, ensuring your strategy remains cutting-edge.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Trends-in-Social-Media-Marketing.jpg",
      alt: "Social Media Trends",
      sectionId: "smm-trends",
    },
    {
      id: 13,
      title: "Common Mistakes to Avoid in Digital Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Avoiding common digital marketing mistakes ensures your efforts are
            effective and protect your brand reputation.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Over-Promotion or Spam
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Balance Content:</span>{" "}
              Follow the 80/20 rule—80% value-driven, 20% promotional.
            </li>
            <li>
              <span className="font-bold text-red-400">Segment Audience:</span>{" "}
              Tailor messages to specific groups instead of generic blasts.
            </li>
            <li>
              <span className="font-bold text-red-400">Track Frequency:</span>{" "}
              Avoid overwhelming audiences with excessive posts or emails.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Ignoring Negative Feedback
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Act Quickly:</span>{" "}
              Acknowledge complaints promptly to show responsiveness.
            </li>
            <li>
              <span className="font-bold text-red-400">Avoid Arguments:</span>{" "}
              Respond professionally and empathetically to resolve issues.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Listen to Feedback:
              </span>{" "}
              Use constructive criticism to improve.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Inconsistent Posting
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Plan Ahead:</span> Use a
              content calendar for regular posting.
            </li>
            <li>
              <span className="font-bold text-red-400">Set Goals:</span> Define
              clear objectives for your marketing efforts.
            </li>
            <li>
              <span className="font-bold text-red-400">Track Performance:</span>{" "}
              Use analytics to identify effective content types.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Failing to Understand Audience
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Market Research:</span>{" "}
              Identify audience preferences, pain points, and behavior.
            </li>
            <li>
              <span className="font-bold text-red-400">Buyer Personas:</span>{" "}
              Create profiles for targeted campaigns.
            </li>
            <li>
              <span className="font-bold text-red-400">Direct Engagement:</span>{" "}
              Use polls and messages to gather firsthand insights.
            </li>
          </ul>
          {expandedSections[13] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                helps you avoid common pitfalls, ensuring your digital marketing
                strategy is effective and aligned with best practices.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Social-Media-Marketing-Introduction.avif",
      alt: "Digital Marketing Mistakes",
      reverse: true,
      sectionId: "smm-mistakes",
    },
    {
      id: 14,
      title: "The Future of Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            The future of social media marketing is shaped by emerging
            platforms, technologies, and evolving trends.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Emerging Platforms and Technologies
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Niche Platforms:</span>{" "}
              Platforms like Discord, BeReal, and Clubhouse target specific
              communities.
            </li>
            <li>
              <span className="font-bold text-red-400">AR and VR:</span> Enable
              virtual try-ons and immersive experiences like 360-degree tours.
            </li>
            <li>
              <span className="font-bold text-red-400">AI-Related:</span>{" "}
              Enhance personalization, customer care, and predictive campaign
              strategies.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Evolution of SMM
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Video Content:</span>{" "}
              Growing demand for short-form videos and live streaming for
              real-time engagement.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Authenticity Over Perfection:
              </span>{" "}
              Consumers prefer relatable, user-generated content over polished
              ads.
            </li>
            <li>
              <span className="font-bold text-red-400">Social Commerce:</span>{" "}
              Integrated shopping features simplify the buyer’s journey.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Community Building:
              </span>{" "}
              Create real connections through polls, Q&A, and community groups.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Forecasts for the Future
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Hyper-Personalized Content:
              </span>{" "}
              Deliver tailored content using data-driven insights.
            </li>
            <li>
              <span className="font-bold text-red-400">Ethical Marketing:</span>{" "}
              Build trust through transparency and compliance with privacy
              regulations.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Metaverse Integration:
              </span>{" "}
              Engage users in virtual worlds as platforms like Meta expand.
            </li>
            <li>
              <span className="font-bold text-red-400">Sustainability:</span>{" "}
              Highlight commitments to environmental and social causes.
            </li>
          </ul>
          {expandedSections[14] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                keeps you ahead of the curve by integrating emerging trends and
                technologies into your SMM strategy.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/The-Future-of-Social-Media-Marketing.webp",
      alt: "Future of SMM",
      sectionId: "smm-future",
    },
    {
      id: 15,
      title: "Case Studies and Success Stories",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Successful social media marketing campaigns offer valuable insights
            for improving your strategies.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Notable Campaigns
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">
                Nike’s “You Can’t Stop Us”:
              </span>{" "}
              A video campaign blending user-generated and professional footage,
              resonating globally on Instagram and YouTube.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Wendy’s Twitter Roasts:
              </span>{" "}
              Witty, playful roasts on Twitter created viral moments,
              establishing a unique brand voice.
            </li>
            <li>
              <span className="font-bold text-red-400">Spotify Wrapped:</span>{" "}
              Personalized, shareable music summaries became a viral marketing
              tool across platforms.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Glossier’s Community Approach:
              </span>{" "}
              Built an active Instagram community by featuring customers and
              incorporating their feedback.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Key Takeaways
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Authenticity:</span>{" "}
              Emotional storytelling and genuine content build trust and
              loyalty.
            </li>
            <li>
              <span className="font-bold text-red-400">Personalization:</span>{" "}
              Personalized experiences drive user participation and sharing.
            </li>
            <li>
              <span className="font-bold text-red-400">Boldness:</span> A
              unique, humorous voice can differentiate your brand.
            </li>
            <li>
              <span className="font-bold text-red-400">
                User-Generated Content:
              </span>{" "}
              Incorporating UGC enhances relatability and engagement.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Consistency and Innovation:
              </span>{" "}
              Maintain a consistent message while adapting to trends and
              platforms.
            </li>
          </ul>
          {expandedSections[15] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                draws on proven strategies from successful campaigns to craft
                impactful SMM approaches tailored to your brand.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Case-Studies-and-Success-Stories.webp",
      alt: "Case Studies",
      reverse: true,
      sectionId: "smm-case-studies",
    },
    {
      id: 16,
      title: "Conclusion: The Power of Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            <span className="font-bold text-red-400">
              Social Media Marketing
            </span>{" "}
            is a necessity for connecting with audiences, building brand trust,
            and achieving business growth in a competitive digital landscape.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Recap: Significance of SMM
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Wider Visibility:</span>{" "}
              Amplifies brand awareness across global audiences.
            </li>
            <li>
              <span className="font-bold text-red-400">Direct Engagement:</span>{" "}
              Fosters trust and stronger customer relationships.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Cost-Effective Ads:
              </span>{" "}
              Offers high ROI through targeted advertising.
            </li>
            <li>
              <span className="font-bold text-red-400">
                Real-Time Feedback:
              </span>{" "}
              Enables instant insights for strategy adjustments.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Call to Action
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Adopt SMM:</span> Start
              on platforms where your audience is active.
            </li>
            <li>
              <span className="font-bold text-red-400">Improve Campaigns:</span>{" "}
              Optimize using performance data and trends.
            </li>
            <li>
              <span className="font-bold text-red-400">Stay Consistent:</span>{" "}
              Build trust with regular posting and branding.
            </li>
            <li>
              <span className="font-bold text-red-400">Go Pro:</span> Partner
              with agencies for maximum impact.
            </li>
          </ul>
          {expandedSections[16] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology’s expertise
                </span>{" "}
                ensures your SMM strategy delivers campaigns that enhance
                visibility, engagement, and measurable growth.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "  ",
      alt: "SMM Conclusion",
      sectionId: "smm-conclusion",
    },
    {
      id: 17,
      title: "FAQs on Social Media Marketing",
      content: (
        <>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Answers to common questions about{" "}
            <span className="font-bold text-red-400">
              social media marketing
            </span>{" "}
            to guide your strategy.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            What is social media marketing?
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            SMM uses platforms like Facebook, Instagram, and LinkedIn to promote
            brands, engage audiences, and achieve goals like sales or website
            traffic.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Why is SMM important for businesses?
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>Increases brand visibility.</li>
            <li>Builds customer relationships.</li>
            <li>Drives targeted website traffic.</li>
            <li>Provides insights into audience behavior.</li>
            <li>Offers cost-effective advertising.</li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Which platforms should I focus on?
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Facebook:</span> Broad
              demographics and ads.
            </li>
            <li>
              <span className="font-bold text-red-400">Instagram:</span> Visual
              content for younger audiences.
            </li>
            <li>
              <span className="font-bold text-red-400">LinkedIn:</span> B2B and
              professional networking.
            </li>
            <li>
              <span className="font-bold text-red-400">Twitter:</span> Real-time
              updates and customer interaction.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            How often should I post?
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>
              <span className="font-bold text-red-400">Facebook:</span> 3-5
              times/week.
            </li>
            <li>
              <span className="font-bold text-red-400">Instagram:</span> 3-7
              times/week (including stories).
            </li>
            <li>
              <span className="font-bold text-red-400">Twitter:</span> 1-5
              times/day.
            </li>
            <li>
              <span className="font-bold text-red-400">LinkedIn:</span> 2-5
              times/week.
            </li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            What content performs best?
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>Videos for immediate impact.</li>
            <li>Images and infographics.</li>
            <li>Interactive posts like polls and quizzes.</li>
            <li>User-generated content.</li>
            <li>Educational guides and tutorials.</li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            How do I measure success?
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>Engagement rate (likes, comments, shares).</li>
            <li>Follower growth.</li>
            <li>Website traffic from social media.</li>
            <li>Conversion rates.</li>
            <li>ROI from paid ads.</li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Is paid advertising necessary?
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">
            Paid ads enhance organic reach by targeting specific audiences,
            promoting content, and delivering quicker results.
          </p>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Tips for small businesses
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>Focus on platforms popular with your audience.</li>
            <li>Use engagement techniques to build buzz.</li>
            <li>Leverage free scheduling and analytics tools.</li>
            <li>Maximize user-generated content.</li>
            <li>Experiment with affordable ads.</li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Biggest challenges in SMM
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>Adapting to algorithm changes.</li>
            <li>Producing consistently compelling content.</li>
            <li>Measuring effective ROI.</li>
            <li>Managing negative feedback.</li>
          </ul>
          <h4 className="text-xl font-bold text-red-400 mb-4 uppercase">
            Staying updated on trends
          </h4>
          <ul className="list-disc list-inside text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200 space-y-4">
            <li>Read industry blogs and follow influencers.</li>
            <li>Join SMM groups and forums.</li>
            <li>Monitor competitor strategies.</li>
            <li>Experiment with new platform features.</li>
          </ul>
          {expandedSections[17] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                <span className="font-bold text-red-400">
                  Jaivik Technology
                </span>{" "}
                provides expert guidance to address these FAQs, helping you
                navigate SMM challenges and opportunities.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/smm-Importance.avif",
      alt: "SMM FAQs",
      sectionId: "smm-faqs",
    },
  ];

  const sectionRefs: SectionRef[] = sections.map(() => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    return { ref, inView };
  });

  return (
    <div className="font-sans text-gray-200 bg-black min-h-screen relative overflow-hidden">
      <SEOManagement title=" Social Media Marketing Services – Jaivik Technology" 
      description="Boost your brand with Jaivik Technology’s expert social media marketing services. We manage, grow, and optimize your presence on Facebook, Instagram, LinkedIn & more." 
      keywords="Social Media Marketing Services" 
      canonical="" />
      <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-red-900 rounded-lg opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-red-800 rounded-lg opacity-10 blur-3xl"></div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10"
        style={{
          backgroundImage: `url('')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="SMM Hero"
        id="smm-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <motion.div
          className="relative z-20 px-4 w-full max-w-6xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Social Media Marketing: Strategies for Success
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-200 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover how Social Media Marketing can transform your brand's
            online presence with{" "}
            <span className="font-bold">Jaivik Technology</span>.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("smm-introduction")}
            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            aria-label="Explore SMM Strategies"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explore Now
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <FaChevronDown className="ml-3" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div
        className="w-full mx-auto px-4 py-16 md:py-20 relative z-20 bg-black/90"
        id="smm-overview"
      >
        <div className="max-w-8xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              ref={sectionRefs[index].ref}
              id={section.sectionId}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300`}
              initial="hidden"
              animate={sectionRefs[index].inView ? "visible" : "hidden"}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex-1"
                variants={staggerContainer}
                initial="hidden"
                animate={sectionRefs[index].inView ? "visible" : "hidden"}
              >
                <motion.h2
                  variants={staggerItem}
                  className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
                >
                  {section.title}
                </motion.h2>
                <motion.div
                  variants={staggerItem}
                  className="text-gray-200 leading-relaxed"
                >
                  {section.content}
                </motion.div>
                <motion.button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center text-red-400 font-bold text-lg mt-6 transition-colors duration-300 hover:text-red-300"
                  whileHover={{ x: 5 }}
                  aria-label={`Toggle ${section.title}`}
                >
                  {expandedSections[section.id] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-3 transition-transform duration-300 ${
                      expandedSections[section.id] ? "rotate-90" : ""
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
                  className="w-full h-80 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 object-cover"
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

export default SocialMediaMarketing;
