"use client";

import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import sectionsData from "../../components/servicePageContent/Seoservices/seoServicesData.json";
import SEOManagement from "../../components/seo/SEOManagement";

interface SectionContent {
  title: string;
  content: string;
  image: string;
  alt: string;
  id?: string;
  // reverse property ab nahi chahiye → hum index se handle karenge
}

interface ExpandedSections {
  [key: number]: boolean;
}

const SeoServices: React.FC = () => {
  const typedSectionsData: SectionContent[] = sectionsData;

  const initialExpandedSections: ExpandedSections = {};
  typedSectionsData.forEach((_, i) => {
    initialExpandedSections[i] = false;
  });

  const [expandedSections, setExpandedSections] =
    useState<ExpandedSections>(initialExpandedSections);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const sectionRefs = typedSectionsData.map(() =>
    useInView({ threshold: 0.2, triggerOnce: true })
  );

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (id: string | undefined) => {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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

  const splitContent = (content: string) => {
    const paragraphs = content.split("</p>");
    const preview =
      paragraphs.slice(0, 2).join("</p>") + (paragraphs.length > 0 ? "</p>" : "");
    const rest = paragraphs.slice(2).join("</p>");
    return { preview, rest };
  };

  const parseContent = (content: string): React.ReactNode => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
      <SEOManagement
        title="SEO Services in India | Best SEO Company & SEO Agency in India"
        description="Looking for professional SEO Services in India? Jaivik Technology is a trusted SEO Agency in India offering Search Engine Optimization, Best SEO Company, local SEO."
        keywords="SEO Agency in India ,Best SEO Company ,SEO Services in India ,Best SEO Services,Search Engine Optimisation, Seo Agency Near Me"
        canonical=""
      />

      {/* Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-16 left-8 w-32 h-32 bg-red-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-16 right-8 w-48 h-48 bg-red-800 rounded-full opacity-20 blur-3xl" />
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
        aria-label="SEO Services Hero"
        id="seo-hero"
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
            SEO Services in India for Business Growth and Online Success
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-200 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Build long-term visibility with{" "}
            <span className="font-bold">Jaivik Technology's</span> professional
            SEO strategies.
          </motion.p>

          <motion.button
            onClick={() => scrollToSection("seo-overview")}
            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            aria-label="Explore SEO Services"
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
        id="seo-overview"
      >
        <div className="max-w-8xl mx-auto">
          {typedSectionsData.map((section, index) => {
            const { preview, rest } = splitContent(section.content);

            // Yeh line sabse important hai → automatic alternate layout
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={index}
                ref={sectionRefs[index][0]}
                id={section.id}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300`}
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
                 {section.title && (
  <motion.h2
    variants={staggerItem}
    className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
  >
    {section.title}
  </motion.h2>
)}

                  <motion.div variants={staggerItem}>
                    {parseContent(preview)}

                    {expandedSections[index] && (
                      <div className="mt-4">{parseContent(rest)}</div>
                    )}
                  </motion.div>

                  <motion.button
                    onClick={() => toggleSection(index)}
                    className="flex items-center text-red-400 font-bold text-lg mt-6 transition-colors duration-300 hover:text-red-300"
                    whileHover={{ x: 5 }}
                    aria-label={`Toggle ${section.title}`}
                  >
                    {expandedSections[index] ? "Show Less" : "Read More"}
                    <FaArrowRight
                      className={`ml-3 transition-transform duration-300 ${
                        expandedSections[index] ? "rotate-90" : ""
                      }`}
                    />
                  </motion.button>
                </motion.div>

                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ x: isReversed ? -100 : 100, opacity: 0 }}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeoServices;
