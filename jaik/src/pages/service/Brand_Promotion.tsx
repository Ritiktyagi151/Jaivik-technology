"use client";

import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEOManagement from "../../components/seo/SEOManagement";

// Define types for section content
interface Section {
  title: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}

const Brand_Promotion = () => {
  // Define type for expandedSections state
  type ExpandedSections = { [key: number]: boolean };
  const initialExpandedSections: ExpandedSections = {};
  for (let i = 0; i <= 3; i++) {
    initialExpandedSections[i] = false;
  }
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    initialExpandedSections
  );

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Define sections array with explicit type
  const sections: Section[] = [
    {
      title: "What Is Brand Promotion?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            <span className="font-semibold">Brand promotion</span> encompasses
            strategies and tactics designed to increase{" "}
            <span className="font-semibold">brand awareness</span>, enhance
            brand perception, and drive customer loyalty. It integrates creative
            campaigns, digital marketing, and data-driven insights to position a
            brand effectively in the market.
          </p>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Brand promotion goes beyond advertising—it's about crafting a
            compelling narrative that resonates with your audience. This
            involves <span className="font-semibold">storytelling</span>,
            consistent messaging across channels, and engaging with customers
            through social media, content marketing, and influencer
            partnerships.
          </p>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            At <span className="font-semibold">Jaivik Technology</span>, our
            brand promotion solutions leverage advanced analytics and creative
            tools to ensure your brand stands out. From startups to established
            enterprises, we tailor strategies to amplify your brand's voice and
            connect with your target audience.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Our approach combines <span className="font-semibold">SEO</span>
                , social media campaigns, and targeted advertising to maximize
                reach and engagement. We focus on building emotional connections
                with customers, fostering trust, and creating memorable
                experiences that drive long-term loyalty.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Effective brand promotion also involves monitoring brand
                sentiment and adapting strategies based on real-time feedback.
                By analyzing customer interactions, we help businesses refine
                their messaging and optimize campaigns for better ROI. For
                example, a retail brand might use our solutions to increase
                online engagement by <span className="font-semibold">40%</span>{" "}
                through personalized social media content, while a B2B company
                could enhance its industry reputation with thought leadership
                articles.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Brand-Promotion-Solutions.avif",
      alt: "Brand Promotion Solutions",
    },
    {
      title: "What Does Brand Promotion Do?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Brand promotion is designed to build and sustain a strong brand
            identity. Here's how it works:
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Enhancing Brand Visibility
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Through targeted campaigns, brand promotion ensures your brand
            reaches the right audience via{" "}
            <span className="font-semibold">social media</span>, search engines,
            and traditional media. This increases recognition and recall.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Building Customer Trust
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Consistent messaging and authentic{" "}
            <span className="font-semibold">storytelling</span> foster trust,
            making customers more likely to choose your brand over competitors.
          </p>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Driving Engagement
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Interactive campaigns, such as social media contests or{" "}
                <span className="font-semibold">influencer collaborations</span>
                , encourage customers to engage with your brand, boosting
                loyalty and advocacy.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Optimizing Marketing ROI
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                By leveraging{" "}
                <span className="font-semibold">data analytics</span>, brand
                promotion ensures campaigns are cost-effective, targeting
                high-value audiences with precision.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed mt-5 text-gray-200">
                <span className="font-semibold">Jaivik Technology's</span>{" "}
                solutions include AI-driven insights to predict campaign
                performance, cross-platform nurturing for seamless messaging,
                and real-time analytics to track engagement. Whether you're
                launching a new product or rebranding, our tools help you
                achieve measurable results.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Brand-Promotion-Benefits.avif",
      alt: "Brand Promotion Strategies",
      reverse: true,
    },
    {
      title: "Why Should Businesses Invest in Brand Promotion?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Brand promotion offers numerous benefits for businesses aiming to
            grow:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Increased Brand Awareness:
              </span>{" "}
              Effective campaigns ensure your brand is top-of-mind for
              consumers.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Improved Customer Loyalty:
              </span>{" "}
              Engaging content and personalized experiences foster long-term
              relationships.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Competitive Advantage:
              </span>{" "}
              A strong brand identity differentiates you in crowded markets.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Measurable Results:
              </span>{" "}
              Data-driven strategies provide insights into campaign performance,
              enabling continuous improvement.
            </li>
          </ul>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Cost Efficiency
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Targeted campaigns reduce wasted ad spend, maximizing{" "}
                <span className="font-semibold">ROI</span>.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Key Components of Brand Promotion
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Social Media Marketing:
                  </span>{" "}
                  Engaging audiences on platforms like Instagram and LinkedIn.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Content Creation:
                  </span>{" "}
                  Producing blogs, videos, and infographics to tell your brand's
                  story.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    SEO Optimization:
                  </span>{" "}
                  Improving search engine rankings to drive organic traffic.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Influencer Partnerships:
                  </span>{" "}
                  Collaborating with influencers to expand reach.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Analytics and Reporting:
                  </span>{" "}
                  Tracking campaign performance to refine strategies.
                </li>
              </ul>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Businesses using{" "}
                <span className="font-semibold">Jaivik Technology's</span>{" "}
                solutions can see up to a{" "}
                <span className="font-semibold">
                  200% increase in brand engagement
                </span>{" "}
                and a{" "}
                <span className="font-semibold">
                  25% boost in customer retention
                </span>
                . Our secure platforms, 24/7 support, and regular updates ensure
                your brand stays ahead of trends.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Brand-Promotion-Benefits.avif",
      alt: "Brand Promotion Benefits",
    },
    {
      title: "Brand Promotion Across Industries",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Brand promotion adapts to the unique needs of various industries:
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            1. Retail and E-commerce
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              Social media campaigns and personalized ads drive online sales and
              customer loyalty.
            </li>
            <li>
              Influencer collaborations showcase products to targeted audiences.
            </li>
          </ul>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            2. Healthcare
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              Educational content and community engagement build trust in
              healthcare providers.
            </li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Email campaigns promote wellness programs and patient
                  services.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                3. Real Estate
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Virtual tours and targeted ads highlight property listings.
                </li>
                <li>
                  SEO strategies improve visibility for real estate agencies.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                4. Nonprofits
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Storytelling campaigns inspire donations and volunteer
                  engagement.
                </li>
                <li>Social media amplifies mission-driven messages.</li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                5. B2B Enterprises
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Thought leadership content establishes industry authority.
                </li>
                <li>LinkedIn campaigns generate high-value leads.</li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                6. Education
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>Digital ads promote courses and attract students.</li>
                <li>Alumni engagement campaigns strengthen community ties.</li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                7. Hospitality
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Social media showcases guest experiences and promotions.
                </li>
                <li>Review management enhances brand reputation.</li>
              </ul>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                <span className="font-semibold">Jaivik Technology's</span>{" "}
                solutions deliver results like a{" "}
                <span className="font-semibold">
                  30% increase in social media engagement
                </span>{" "}
                for retailers or a{" "}
                <span className="font-semibold">
                  20% boost in lead generation
                </span>{" "}
                for B2B firms. Our tools are scalable, making them ideal for
                businesses of all sizes.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Brand-Promotion-Use-Cases.avif",
      alt: "Brand Promotion Use Cases",
      reverse: true,
    },
  ];

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
    <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
      <SEOManagement title=" Branding Services in India – Jaivik Technology | Build Your Brand" 
      description="Jaivik Technology offers expert branding services in India including logo design, brand strategy, identity, and positioning to help businesses stand out and grow effectively." 
      keywords="Branding Services"
      canonical="" />
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-12 left-6 w-24 h-24 bg-red-600 rounded-full opacity-10 blur-2xl" />
        <div className="absolute bottom-12 right-6 w-36 h-36 bg-red-600 rounded-full opacity-10 blur-2xl" />
      </motion.div>

      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10"
        style={{
          backgroundImage: `url('')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="Brand Promotion Hero"
        id="brand-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <motion.div
          className="relative z-20 px-4 w-full max-w-7xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 mb-6 tracking-tight drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Elevate Your Brand with Strategic Promotion
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg font-normal text-gray-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Amplify your presence with{" "}
            <span className="font-semibold">Jaivik Technology's</span> Brand
            Promotion Solutions
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("brand-overview")}
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            aria-label="Explore Brand Promotion Solutions"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Explore Now
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <FaChevronDown className="ml-2" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      <div
        className="w-full mx-auto px-4 py-12 md:py-16 relative z-20 bg-black/50"
        id="brand-overview"
      >
        <div className="max-w-8xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              ref={sectionRefs[index][0]}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 items-center bg-gray-900/20 p-6 md:p-10 rounded-xl shadow-sm mb-12 hover:shadow-md hover:shadow-red-500/20 transition-shadow duration-300`}
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
                  className="text-2xl md:text-3xl font-semibold text-red-500 mb-6 tracking-tight drop-shadow-sm"
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
                  onClick={() => toggleSection(index)}
                  className="flex items-center text-red-500 font-semibold text-base mt-5 transition-colors duration-300 hover:text-red-400"
                  whileHover={{ x: 5 }}
                  aria-label={`Toggle ${section.title}`}
                >
                  {expandedSections[index] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${
                      expandedSections[index] ? "rotate-90" : ""
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
                  className="w-full h-72 rounded-md shadow-md transition-transform duration-500 hover:scale-105 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="bg-black py-16 px-4 text-center relative overflow-hidden"
        style={{ y }}
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-red-500 mb-6 tracking-tight drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Elevate Your Brand?
          </motion.h2>
          <motion.p
            className="text-base md:text-lg font-normal text-gray-200 mb-8 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our brand promotion strategies can boost your{" "}
            <span className="font-semibold">
              visibility, engagement, and growth
            </span>
            .
          </motion.p>
          <motion.button
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Get Started Today
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-radial from-red-600/10 to-transparent"
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 0.3]),
          }}
        />
      </motion.div>
    </div>
  );
};

export default Brand_Promotion;
