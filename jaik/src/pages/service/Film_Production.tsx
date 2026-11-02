"use client";

import * as React from "react";
import { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import filmData from "../../components/servicePageContent/filmProducton/filmproduction.json";
import SEOManagement from "../../components/seo/SEOManagement";

// Define the Content type for section content items
type Content =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: { title: string; text: string }[] }
  | { type: "faq"; question: string; answer: string };

// Define the Section interface
interface Section {
  title: string;
  content: Content[];
  image: string;
  alt: string;
  reverse?: boolean;
  id?: string;
  order?: number;
  active?: boolean;
}

interface ExpandedSections {
  [key: string]: boolean;
}

// Define the FilmData interface to match the JSON structure
interface FilmData {
  meta: {
    title: string;
    description: string;
    adminTheme: string;
    lastUpdated: string;
  };
  hero: {
    title: string;
    description: string;
    cta: string;
    image: string;
  };
  sections: { [key: string]: Section };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

const filmDataTyped = filmData as FilmData;

const FilmProduction: React.FC = () => {
  // Initialize expanded sections
  const initialExpandedSections: ExpandedSections = {};
  Object.keys(filmDataTyped.sections).forEach((sectionId) => {
    initialExpandedSections[sectionId] = false;
  });
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    initialExpandedSections
  );

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Hero section inView
  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Convert sections object to array and sort by order
  const sections: Section[] = Object.entries(filmDataTyped.sections)
    .map(([id, section]: [string, Section]) => ({
      ...section,
      id,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Initialize sectionRefs
  const sectionRefs = sections.map(() =>
    useInView({ threshold: 0.2, triggerOnce: true })
  );

  const toggleSection = (sectionId: string) => {
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

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderContent = (content: Content) => {
    switch (content.type) {
      case "paragraph":
        return (
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            {content.text}
          </p>
        );
      case "heading":
        return (
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            {content.text}
          </h4>
        );
      case "list":
        return (
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            {content.items.map((item, index: number) => (
              <li key={index}>
                <span className="font-semibold text-red-500">{item.title}</span>{" "}
                {item.text}
              </li>
            ))}
          </ul>
        );
      case "faq":
        return (
          <>
            <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
              {content.question}
            </h4>
            <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
              {content.answer}
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
      <SEOManagement title=" Film Production Services – Jaivik Technology | Video & Ad Creation" 
      description="Jaivik Technology offers professional film production services including corporate videos, ad films, brand stories, and creative video content for powerful visual marketing." 
      keywords="Film Production Services" 
      canonical="" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-12 left-6 w-24 h-24 bg-red-600 rounded-full opacity-10 blur-2xl" />
        <div className="absolute bottom-12 right-6 w-36 h-36 bg-red-600 rounded-full opacity-10 blur-2xl" />
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
        aria-label="Film Production Hero"
        id="film-hero"
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
            {filmDataTyped.hero.title}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg font-normal text-gray-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filmDataTyped.hero.description}
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("film-production")}
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            aria-label="Explore Film Production Services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {filmDataTyped.hero.cta}
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <FaChevronDown className="ml-2" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div
        className="w-full mx-auto px-4 py-12 md:py-16 relative z-20 bg-black/50"
        id="film-overview"
      >
        <div className="max-w-8xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id || `section-${index}`}
              ref={sectionRefs[index][0]}
              id={section.id}
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
                  {section.content.map((content: Content, i: number) => (
                    <React.Fragment key={i}>
                      {renderContent(content)}
                    </React.Fragment>
                  ))}
                </motion.div>
                {section.id && (
                  <motion.button
                    onClick={() => section.id && toggleSection(section.id)} // Type guard for section.id
                    className="flex items-center text-red-500 font-semibold text-base mt-5 transition-colors duration-300 hover:text-red-400"
                    whileHover={{ x: 5 }}
                    aria-label={`Toggle ${section.title}`}
                  >
                    {section.id && expandedSections[section.id]
                      ? "Show Less"
                      : "Read More"}
                    <FaArrowRight
                      className={`ml-2 transition-transform duration-300 ${
                        section.id && expandedSections[section.id]
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </motion.button>
                )}
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
    </div>
  );
};

export default FilmProduction;
