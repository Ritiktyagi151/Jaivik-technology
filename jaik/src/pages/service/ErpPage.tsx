"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEOManagement from "../../components/seo/SEOManagement";

// ErrorBoundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 bg-gray-900">
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-300">
            Please try refreshing the page or contact support.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Define types for section content
interface Section {
  title: string;
  content: React.ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
}

const ErpPage: React.FC = () => {
  // State for expanded sections
  const [expandedSections] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Hero section visibility
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Define sections array
  const sections: Section[] = [
    {
      title: "What Is ERP?",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            ERP, or Enterprise Resource Planning, is a strategic approach to
            managing core business processes. It combines technology, processes,
            and data to streamline operations in finance, supply chain,
            manufacturing, human resources, and more.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            ERP systems serve as a central hub, managing critical data like
            inventory, production schedules, financial records, and employee
            information. They facilitate collaboration, automate tasks, and
            provide real-time insights, enhanced by AI, analytics, and
            integrations for data-driven decisions.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h4 className="text-xl font-semibold text-purple-400 mb-3 uppercase">
                Jaivik Technology ERP Solutions
              </h4>
              <p className="text-lg text-gray-300">
                Jaivik Technology’s ERP solutions integrate seamlessly with
                existing systems, offering customizable workflows and real-time
                insights. From startups to enterprises, our ERP ensures control
                over processes, transforming operations in today’s digital
                economy.
              </p>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Competitive Advantage
              </h4>
              <p className="text-lg text-gray-300">
                ERP is a strategic asset, automating processes, reducing costs,
                and enhancing decision-making. Manufacturers optimize
                production, while retailers manage multi-location inventory,
                boosting productivity and customer service for a competitive
                edge.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/hand-drawn-flat-design-erp-illustration.webp",
      alt: "ERP Solutions",
    },
    {
      title: "What Does ERP Do?",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            ERP systems integrate and automate core business processes,
            enhancing efficiency across departments. Key functionalities
            include:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Centralizing Data:
              </span>{" "}
              Consolidates financials, inventory, and HR into one database for
              consistency and visibility.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Streamlining Operations:
              </span>{" "}
              Connects functions, reduces silos, and improves workflows.
            </li>
          </ul>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h4 className="text-xl font-semibold text-purple-400 mb-3 uppercase">
                Automation
              </h4>
              <p className="text-lg text-gray-300">
                Automates tasks like order processing, payroll, and reporting,
                reducing errors and freeing up time.
              </p>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Financial Management
              </h4>
              <p className="text-lg text-gray-300">
                Manages general ledger, budgeting, and compliance with robust
                financial tools.
              </p>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Supply Chain
              </h4>
              <p className="text-lg text-gray-300">
                Optimizes procurement, inventory, and delivery for efficiency.
              </p>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Advanced Features
              </h4>
              <p className="text-lg text-gray-300">
                Jaivik Technology’s ERP includes AI forecasting, mobile access,
                and integrations with e-commerce, CRM, and BI tools, ensuring
                agility and competitiveness.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/enterprise-resource.webp",
      alt: "ERP Features",
      reverse: true,
    },
    {
      title: "Why Should Enterprises Opt for ERP?",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            ERP systems are essential for modern businesses, offering:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Operational Efficiency:
              </span>{" "}
              Automates tasks and eliminates redundant processes.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Data Visibility:
              </span>{" "}
              Provides real-time analytics for informed decisions.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Scalability:
              </span>{" "}
              Adapts to business growth and expansion.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Cost Reduction:
              </span>{" "}
              Lowers operational costs through efficiency.
            </li>
          </ul>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h4 className="text-xl font-semibold text-purple-400 mb-3 uppercase">
                Regulatory Compliance
              </h4>
              <p className="text-lg text-gray-300">
                Ensures accurate records and compliance with industry
                regulations.
              </p>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Core Components
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">
                    Financial Management:
                  </span>{" "}
                  Handles accounting and reporting.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Supply Chain:
                  </span>{" "}
                  Manages procurement and logistics.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Manufacturing:
                  </span>{" "}
                  Plans production and quality control.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Human Resources:
                  </span>{" "}
                  Manages employee data and payroll.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">CRM:</span>{" "}
                  Enhances customer interactions.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Business Intelligence:
                  </span>{" "}
                  Offers advanced analytics.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Jaivik Technology Benefits
              </h4>
              <p className="text-lg text-gray-300">
                Jaivik Technology’s ERP provides enhanced security, 24/7
                support, and regular updates, reducing costs by up to 40% and
                improving order fulfillment by 30%.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/enterprise-resource-planning-holographic-interface.webp",
      alt: "ERP Benefits",
    },
    {
      title: "ERP for Different Industries",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            ERP solutions are tailored to meet industry-specific needs, driving
            efficiency and growth across sectors:
          </p>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Manufacturing:
              </span>{" "}
              Optimizes production, inventory, and quality control.
            </li>
            <li>
              <span className="font-semibold text-purple-400">Retail:</span>{" "}
              Manages multi-location inventory and sales trends.
            </li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h4 className="text-xl font-semibold text-purple-400 mb-3 uppercase">
                Additional Industries
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">
                    Healthcare:
                  </span>{" "}
                  Manages patient records and compliance.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Construction:
                  </span>{" "}
                  Tracks projects and costs.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Professional Services:
                  </span>{" "}
                  Optimizes project management and billing.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Who Can Implement ERP?
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">
                    Small Businesses:
                  </span>{" "}
                  Automates processes affordably.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Mid-Sized Companies:
                  </span>{" "}
                  Supports growth and complexity.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Large Enterprises:
                  </span>{" "}
                  Standardizes global operations.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Manufacturers, Distributors, Services, Nonprofits,
                    Government:
                  </span>{" "}
                  Meets diverse needs.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Benefits
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">
                    Efficiency:
                  </span>{" "}
                  Automates tasks.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Decisions:
                  </span>{" "}
                  Enhances analytics.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Collaboration:
                  </span>{" "}
                  Breaks silos.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Compliance:
                  </span>{" "}
                  Ensures regulatory adherence.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Scalability:
                  </span>{" "}
                  Supports growth.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Modern ERP Attributes
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">Cloud:</span>{" "}
                  Accessible anywhere.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">Mobile:</span>{" "}
                  Supports remote management.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">AI/ML:</span>{" "}
                  Improves forecasting.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Integrations:
                  </span>{" "}
                  Connects with CRM and BI.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Implementation Steps
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">
                    Define Requirements:
                  </span>{" "}
                  Identify needs.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Select ERP:
                  </span>{" "}
                  Choose industry-fit solution.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Prepare Data:
                  </span>{" "}
                  Ensure accuracy.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Train Team:
                  </span>{" "}
                  Ensure adoption.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Go Live:
                  </span>{" "}
                  Launch and optimize.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Jaivik Technology’s ERP
              </h4>
              <p className="text-lg text-gray-300">
                Jaivik Technology delivers tailored ERP solutions in Delhi NCR,
                enhancing efficiency, reducing costs, and ensuring scalability.
                From manufacturing to financial control, our user-friendly ERP
                drives success.
              </p>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                FAQs
              </h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <li>
                  <span className="font-semibold text-purple-400">
                    What is ERP?:
                  </span>{" "}
                  Integrates business processes for efficiency.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    For Small Businesses?:
                  </span>{" "}
                  Yes, cloud ERP is affordable.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Key Features?:
                  </span>{" "}
                  Finance, supply chain, analytics, integrations.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Implementation Time?:
                  </span>{" "}
                  3-18 months, based on size.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    ERP vs. Accounting?:
                  </span>{" "}
                  ERP covers all functions, not just finance.
                </li>
                <li>
                  <span className="font-semibold text-purple-400">
                    Integrations?:
                  </span>{" "}
                  Connects with CRM, e-commerce, BI.
                </li>
              </ul>
              <h4 className="text-xl font-semibold text-purple-400 mb-3 mt-4 uppercase">
                Industry Benefits
              </h4>
              <p className="text-lg text-gray-300">
                Jaivik Technology’s ERP supports education, agriculture, and
                logistics, reducing waste by 20% in food processing or improving
                utilization by 15% in services.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/erp-infographic.webp",
      alt: "ERP Use Cases",
      reverse: true,
    },
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <ErrorBoundary>
      <div className="font-sans text-gray-100 bg-gray-950 min-h-screen relative overflow-hidden">
        <SEOManagement title=" Best ERP Software for Business Efficiency – Jaivik Technology" 
        description="Streamline your operations with the best ERP software by Jaivik Technology. Scalable, secure, and tailored ERP solutions to boost productivity and performance." 
        keywords="Best erp software" 
        canonical="" />
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y }}
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-3xl" />
        </motion.div>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center"
          style={{
            backgroundImage: `url('')`,
          }}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          id="erp-hero-section"
          aria-label="ERP Solutions Hero"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
          <div className="relative z-10 px-6 max-w-6xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-purple-400 mb-6 tracking-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              Transform Your Business with Jaivik Technology ERP
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock integrated, scalable ERP solutions to streamline
              operations, reduce costs, and drive growth.
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("erp-overview")}
              className="bg-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              aria-label="Explore ERP Solutions"
            >
              Discover Now <FaChevronDown className="ml-2 inline" />
            </motion.button>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-8xl mx-auto px-6 py-16" id="erp-overview">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-8 bg-gray-900/30 p-8 rounded-xl mb-12 shadow-lg hover:shadow-purple-500/20 transition-shadow duration-500`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-purple-400 mb-4">
                  {section.title}
                </h2>
                <div className="relative group">
                  <div className="text-gray-300 max-h-96 overflow-y-hidden hover:overflow-y-auto hover:pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent transition-all duration-300">
                    {section.content}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: section.reverse ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}

          {/* FAQ Section */}
          <motion.div
            className="text-lg mb-12 bg-gray-900/30 p-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-shadow duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Frequently Asked Questions"
          >
            <h2 className="text-3xl font-semibold text-purple-400 mb-6">
              FAQs About ERP
            </h2>
            <div>
              {[
                {
                  question: "What is ERP?",
                  answer:
                    "ERP (Enterprise Resource Planning) is software that integrates core business processes like finance, supply chain, HR, and manufacturing into a centralized system to improve efficiency and decision-making.",
                },
                {
                  question: "Why is ERP important for businesses?",
                  answer:
                    "ERP enhances efficiency, provides real-time data, reduces costs, ensures scalability, and improves collaboration, making it vital for competitiveness.",
                },
                {
                  question: "Which industries benefit from ERP?",
                  answer:
                    "Manufacturing, retail, healthcare, construction, professional services, and more benefit from tailored ERP solutions for operational efficiency.",
                },
                {
                  question: "How long does ERP implementation take?",
                  answer:
                    "Implementation typically takes 3-18 months, depending on business size, complexity, and customization needs.",
                },
                {
                  question: "Can small businesses use ERP?",
                  answer:
                    "Yes, cloud-based ERP solutions are affordable and scalable, ideal for small businesses to automate processes.",
                },
                {
                  question: "What are the key features of ERP?",
                  answer:
                    "Key features include financial management, supply chain optimization, HR management, analytics, and integrations with CRM and BI tools.",
                },
                {
                  question: "How does ERP differ from accounting software?",
                  answer:
                    "ERP covers all business functions (finance, HR, supply chain, etc.), while accounting software focuses solely on financial tasks.",
                },
                {
                  question: "What tools integrate with ERP?",
                  answer:
                    "ERP systems integrate with CRM, e-commerce platforms, business intelligence tools, and more for seamless operations.",
                },
                {
                  question:
                    "What are the benefits of Jaivik Technology's ERP?",
                  answer:
                    "Jaivik Technology's ERP offers tailored solutions, enhanced security, scalability, and 24/7 support, reducing costs and boosting efficiency.",
                },
                {
                  question: "How does ERP support compliance?",
                  answer:
                    "ERP ensures accurate record-keeping and compliance with industry regulations like GDPR, CCPA, and others through robust reporting tools.",
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-600 py-4"
                >
                  <summary className="text-lg font-semibold text-gray-100 cursor-pointer hover:text-purple-400 transition-colors duration-300">
                    {faq.question}
                  </summary>
                  <div className="relative group">
                    <p className="text-lg text-gray-300 mt-2 max-h-32 overflow-y-hidden hover:overflow-y-auto hover:pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent transition-all duration-300">
                      {faq.answer}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.section
          className="bg-blue-600 py-16 text-center px-4 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          role="complementary"
          aria-label="Call to Action"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-white max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Partner with Jaivik Technology to leverage innovative ERP
              solutions for streamlined operations.
            </motion.p>
            <motion.button
              className="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-600 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              aria-label="Get Started with ERP"
            >
              Get Started
            </motion.button>
          </div>
        </motion.section>
      </div>
    </ErrorBoundary>
  );
};

export default ErpPage;
