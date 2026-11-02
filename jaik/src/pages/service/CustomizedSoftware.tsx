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

const CoustmisedSoftware = () => {
  // Define type for expandedSections state
  type ExpandedSections = { [key: number]: boolean };
  const initialExpandedSections: ExpandedSections = {
    0: false,
    1: false,
    2: false,
    3: false,
  };
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
      title: "What Is Custom Software?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Custom Software refers to applications and systems developed
            specifically to meet the unique needs of a business or organization.
            Unlike off-the-shelf software, custom solutions are tailored to fit
            specific workflows, processes, and objectives, offering unparalleled
            flexibility and efficiency.
          </p>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Custom software acts as a digital backbone, integrating seamlessly
            with existing systems, automating complex tasks, and providing a
            platform for innovation. It can range from mobile apps to enterprise
            systems, designed to enhance productivity and solve
            industry-specific challenges.
          </p>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            At <span className="font-semibold">Jaivik Technology</span>, our
            custom software solutions are built to empower businesses by
            aligning technology with their goals. Whether you're a startup or an
            enterprise, our solutions adapt to your requirements, ensuring
            scalability and performance.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Our development process involves close collaboration with
                clients to understand their needs, followed by designing,
                building, and deploying software that drives results. From
                streamlining operations to enhancing customer experiences,
                custom software transforms how businesses operate in a
                competitive digital landscape.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                For example, a logistics company might use custom software to
                optimize delivery routes, reducing fuel costs by{" "}
                <span className="font-semibold">20%</span>, while a retail
                business could deploy a tailored e-commerce platform to boost
                online sales by <span className="font-semibold">30%</span>. By
                leveraging custom software, businesses can achieve operational
                excellence, improve decision-making, and deliver exceptional
                value to their customers.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Custom-Software-Solutions.avif",
      alt: "Custom Software Solutions",
    },
    {
      title: "What Does Custom Software Do?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Custom software is designed to address specific business challenges
            by providing tailored functionality. Here's how it works:
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Process Optimization
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Custom software streamlines workflows by automating repetitive
            tasks, reducing manual errors, and integrating with existing tools,
            ensuring smooth operations.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Data Management
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            It centralizes data, offering real-time access to critical
            information, which enables faster decision-making and improved
            business insights.
          </p>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Scalable Solutions
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Custom software grows with your business, allowing for updates
                and new features as your needs evolve, ensuring long-term
                relevance.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Enhanced User Experience
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                By focusing on user-centric design, custom software provides
                intuitive interfaces that improve employee productivity and
                customer satisfaction.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed mt-5 text-gray-200">
                <span className="font-semibold">Jaivik Technology's</span>{" "}
                custom software includes features like AI-driven analytics,
                cloud integration, and mobile accessibility. For instance, a
                healthcare provider could use our software to manage patient
                records securely, while a manufacturing firm might deploy it to
                monitor production in real time, reducing downtime by{" "}
                <span className="font-semibold">15%</span>.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Custom-Software-Features.avif",
      alt: "Custom Software Features",
      reverse: true,
    },
    {
      title: "Why Should Enterprises Opt for Custom Software?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Custom software offers distinct advantages over generic solutions:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Tailored Fit:
              </span>{" "}
              Built to match your specific processes, ensuring maximum
              efficiency and minimal disruption.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Competitive Edge:
              </span>{" "}
              Unique features give businesses an advantage by addressing niche
              requirements that off-the-shelf software can't.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Cost Efficiency:
              </span>{" "}
              While initial costs may be higher, custom software reduces
              long-term expenses by eliminating unused features and licensing
              fees.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl">
                Security:
              </span>{" "}
              Custom solutions can include robust, industry-specific security
              measures, protecting sensitive data.
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
                Integration
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Seamlessly connects with existing systems, reducing silos and
                improving data flow across departments.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Core Components of Custom Software
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Custom APIs:
                  </span>{" "}
                  Enable integration with third-party tools and platforms for
                  enhanced functionality.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Workflow Automation:
                  </span>{" "}
                  Automates repetitive tasks, freeing up resources for strategic
                  initiatives.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    Analytics Dashboards:
                  </span>{" "}
                  Provide real-time insights into performance, helping
                  businesses make data-driven decisions.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl">
                    User Management:
                  </span>{" "}
                  Controls access and permissions, ensuring data security and
                  compliance.
                </li>
              </ul>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Enterprises choosing{" "}
                <span className="font-semibold">Jaivik Technology's</span>{" "}
                custom software benefit from end-to-end support, from ideation
                to maintenance. Our solutions have helped businesses achieve up
                to a{" "}
                <span className="font-semibold">
                  40% increase in operational efficiency
                </span>{" "}
                and a{" "}
                <span className="font-semibold">25% reduction in costs</span>,
                proving that custom software is a strategic investment.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Custom-Software-Benefits.avif",
      alt: "Custom Software Benefits",
    },
    {
      title: "Custom Software for Different Industries",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Custom software is versatile, serving various industries with
            tailored solutions:
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            1. Retail and E-commerce
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              Custom software creates personalized shopping experiences,
              optimizes inventory, and automates order processing.
            </li>
            <li>
              E-commerce platforms use custom solutions to enhance checkout
              processes and integrate with payment gateways.
            </li>
          </ul>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            2. Healthcare
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              Manages patient records, automates appointment scheduling, and
              ensures compliance with regulations like HIPAA.
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
                  Enables telemedicine platforms and integrates with medical
                  devices for real-time monitoring.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                3. Real Estate
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Streamlines property management, automates client
                  communications, and integrates with listing platforms.
                </li>
                <li>
                  Provides virtual tour capabilities and market analysis tools.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                4. Nonprofit Organizations
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Manages donor databases, automates fundraising campaigns, and
                  tracks volunteer activities.
                </li>
                <li>Enhances outreach with tailored communication tools.</li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                5. Manufacturing
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Optimizes supply chain management, monitors production in real
                  time, and automates quality control.
                </li>
                <li>Integrates with IoT devices for predictive maintenance.</li>
              </ul>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                <span className="font-semibold">Jaivik Technology's</span>{" "}
                custom software delivers measurable results. For example, a
                retail client reduced inventory costs by{" "}
                <span className="font-semibold">20%</span> with our stock
                management system, while a healthcare provider improved patient
                satisfaction by <span className="font-semibold">30%</span>{" "}
                through automated reminders. Our solutions are designed to meet
                the unique challenges of each industry, ensuring maximum impact.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Custom-Software-Use-Cases.avif",
      alt: "Custom Software Use Cases",
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
      <SEOManagement title="Customized Software Solutions – Jaivik Technology" 
      description="Jaivik Technology offers customized software tailored to your business needs. Scalable, secure, and efficient custom software solutions to drive digital transformation." 
      keywords="Customized Software" 
      canonical=""/>
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
        aria-label="Custom Software Solutions Hero"
        id="cs-hero"
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
            Transform Your Business with Custom Software
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg font-normal text-gray-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Unlock the power of tailored solutions with{" "}
            <span className="font-semibold">Jaivik Technology</span>
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("cs-overview")}
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
            aria-label="Explore Custom Software Solutions"
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
        id="cs-overview"
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
    </div>
  );
};

export default CoustmisedSoftware;
