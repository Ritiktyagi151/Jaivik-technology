"use client";

// import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEOManagement from "../../components/seo/SEOManagement";

// Define TypeScript interface for expandedSections state
// interface ExpandedSections {
//   [key: number]: boolean;
// }

const MobileApplication = () => {
  // const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
  //   0: false,
  //   1: false,
  //   2: false,
  //   3: false,
  // });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [section1Ref, section1InView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [section2Ref, section2InView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [section3Ref, section3InView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [section4Ref, section4InView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // const toggleSection = (sectionId: number) => {
  //   setExpandedSections((prev: ExpandedSections) => ({
  //     ...prev,
  //     [sectionId]: !prev[sectionId],
  //   }));
  // };

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
      <SEOManagement title="Mobile Application Development Company in India – Jaivik Technology" 
      description="Jaivik Technology is a top mobile application development company in India offering custom mobile app solutions to grow your business with scalable and user-friendly apps." 
      keywords="Mobile application development company in india, mobile application development company" 
      canonical="" />
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y, opacity }}
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
        aria-label="Mobile Application Solutions Hero"
        id="mobile-app-hero"
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
            Empower Your Business with Mobile Apps
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-medium text-gray-200 mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Build innovative mobile applications with{" "}
            <span className="font-bold">Jaivik Technology</span>
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("mobile-app-overview")}
            className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            aria-label="Explore Mobile App Solutions"
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

      {/* Main Content */}
      <div
        className="w-full mx-auto px-4 py-16 md:py-20 relative z-20 bg-black/90"
        id="mobile-app-overview"
      >
        <div className="max-w-8xl mx-auto">
          {/* Section 1 */}
          <motion.div
            ref={section1Ref}
            className="flex flex-col lg:flex-row gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300"
            initial="hidden"
            animate={section1InView ? "visible" : "hidden"}
            variants={fadeIn}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              animate={section1InView ? "visible" : "hidden"}
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
              >
                What Are Mobile Applications?
              </motion.h2>
              <div className="relative group">
                <motion.div
                  variants={staggerItem}
                  className="text-gray-200 leading-relaxed text-lg md:text-xl font-medium max-h-96 overflow-y-hidden hover:overflow-y-auto hover:pr-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent transition-all duration-300"
                >
                  <p className="mb-6">
                    Mobile applications, or apps, are software programs designed
                    to run on mobile devices like smartphones and tablets. They
                    provide users with seamless access to services, information,
                    and functionalities tailored for mobile use. Apps leverage
                    device capabilities such as GPS, cameras, and touch
                    interfaces to deliver intuitive experiences.
                  </p>
                  <p className="mb-6">
                    At <span className="font-bold">Jaivik Technology</span>, we
                    develop custom mobile apps that align with your business
                    goals, whether for iOS, Android, or cross-platform
                    solutions. Our apps are built to enhance user engagement,
                    streamline operations, and drive growth by integrating
                    advanced features like push notifications, offline
                    capabilities, and secure payment gateways.
                  </p>
                  <p className="mb-6">
                    Mobile apps are essential in today's digital-first world,
                    enabling businesses to connect with customers anytime,
                    anywhere. From e-commerce platforms to fitness trackers,
                    apps transform how businesses operate and engage with their
                    audience.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Our Development Process
                  </h3>
                  <p className="mb-6">
                    Our development process emphasizes user-centric design,
                    ensuring apps are intuitive and visually appealing. We
                    incorporate technologies like AI, AR, and IoT to create
                    cutting-edge solutions. For example, a retail app we
                    developed increased user retention by 40% through
                    personalized recommendations, while a healthcare app reduced
                    patient wait times by 20% with real-time scheduling.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Business Impact
                  </h3>
                  <p>
                    Mobile apps empower businesses to stay competitive by
                    offering convenience, personalization, and accessibility.
                    Whether you're a startup or an enterprise, our scalable
                    solutions adapt to your needs, delivering measurable results
                    and a strong return on investment.
                  </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/representation-user-experience-interface-design.avif"
                alt="Mobile Application Solutions"
                className="w-full h-80 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            ref={section2Ref}
            className="flex flex-col lg:flex-row-reverse gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300"
            initial="hidden"
            animate={section2InView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 100 },
              },
            }}
          >
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              animate={section2InView ? "visible" : "hidden"}
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
              >
                What Do Mobile Apps Do?
              </motion.h2>
              <div className="relative group">
                <motion.div
                  variants={staggerItem}
                  className="text-gray-200 leading-relaxed text-lg md:text-xl font-medium max-h-96 overflow-y-hidden hover:overflow-y-auto hover:pr-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent transition-all duration-300"
                >
                  <p className="mb-6">
                    Mobile apps serve as powerful tools to enhance business
                    operations and customer engagement. Here's how they
                    function:
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    User Engagement
                  </h3>
                  <p className="mb-6">
                    Apps provide personalized experiences through features like
                    push notifications, in-app messaging, and tailored content,
                    keeping users connected with your brand.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Streamlined Operations
                  </h3>
                  <p className="mb-6">
                    Apps automate tasks such as order processing, appointment
                    scheduling, and customer support, improving efficiency and
                    reducing manual workloads.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Data Insights
                  </h3>
                  <p className="mb-6">
                    Mobile apps collect valuable user data, such as behavior
                    patterns and preferences, enabling businesses to make
                    informed decisions and optimize strategies.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Cross-Platform Accessibility
                  </h3>
                  <p className="mb-6">
                    With frameworks like Flutter and React Native, we create
                    apps that work seamlessly on both iOS and Android,
                    maximizing reach without compromising performance.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Integration Capabilities
                  </h3>
                  <p className="mb-6">
                    Our apps integrate with existing systems like CRM, ERP, or
                    payment gateways, ensuring a cohesive digital ecosystem.
                  </p>
                  <p>
                    <span className="font-bold">Jaivik Technology's</span>{" "}
                    mobile apps also offer advanced features like geolocation
                    services, real-time analytics, and secure authentication.
                    For instance, a logistics app we built improved delivery
                    efficiency by 30% through optimized route planning,
                    showcasing the transformative power of mobile solutions.
                  </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/application-interface.webp"
                alt="Mobile App Features"
                className="w-full h-80 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            ref={section3Ref}
            className="flex flex-col lg:flex-row gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={section3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring" }}
          >
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              animate={section3InView ? "visible" : "hidden"}
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
              >
                Why Choose Mobile Apps for Your Business?
              </motion.h2>
              <div className="relative group">
                <motion.div
                  variants={staggerItem}
                  className="text-gray-200 leading-relaxed text-lg md:text-xl font-medium max-h-96 overflow-y-hidden hover:overflow-y-auto hover:pr-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent transition-all duration-300"
                >
                  <p className="mb-6">
                    Mobile apps offer unmatched advantages for businesses aiming
                    to stay competitive:
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Enhanced Customer Experience
                  </h3>
                  <p className="mb-6">
                    Apps deliver personalized, on-the-go access to services,
                    boosting customer satisfaction and loyalty.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Increased Reach
                  </h3>
                  <p className="mb-6">
                    With billions of smartphone users worldwide, apps provide a
                    direct channel to engage a global audience.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Operational Efficiency
                  </h3>
                  <p className="mb-6">
                    Automation and integration streamline processes, saving time
                    and reducing costs.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Scalability
                  </h3>
                  <p className="mb-6">
                    Apps grow with your business, supporting new features and
                    user growth without compromising performance.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Competitive Advantage
                  </h3>
                  <p className="mb-6">
                    A well-designed app sets you apart from competitors,
                    offering unique features and a modern user experience.
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    Core Components of Mobile Apps
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      <span className="font-bold text-red-400">
                        User Interface (UI/UX)
                      </span>
                      : Intuitive designs that ensure ease of use and
                      engagement.
                    </li>
                    <li>
                      <span className="font-bold text-red-400">
                        Backend Development
                      </span>
                      : Secure servers and APIs to handle data processing and
                      storage.
                    </li>
                    <li>
                      <span className="font-bold text-red-400">
                        Push Notifications
                      </span>
                      : Real-time alerts to keep users informed and engaged.
                    </li>
                    <li>
                      <span className="font-bold text-red-400">Analytics</span>:
                      Tools to track user behavior and app performance.
                    </li>
                    <li>
                      <span className="font-bold text-red-400">Security</span>:
                      Encryption and authentication to protect user data.
                    </li>
                    <li>
                      <span className="font-bold text-red-400">
                        Performance Optimization
                      </span>
                      : Ensuring fast loading times and smooth operation across
                      devices.
                    </li>
                  </ul>
                  <p>
                    <span className="font-bold">Jaivik Technology's</span> apps
                    are built with cutting-edge security protocols, 24/7
                    support, and regular updates. Businesses using our apps
                    report up to a 200% increase in customer engagement and a
                    25% reduction in operational costs, proving the value of
                    mobile solutions.
                  </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ rotate: -5, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <img
                src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/businessman-using-smartphone.avif"
                alt="Mobile App Benefits"
                className="w-full h-80 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            ref={section4Ref}
            className="flex flex-col lg:flex-row-reverse gap-12 items-center bg-gray-900/50 p-8 md:p-12 rounded-2xl shadow-md mb-16 hover:shadow-xl hover:shadow-red-500/20 transition-shadow duration-300"
            initial={{ opacity: 0 }}
            animate={section4InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              animate={section4InView ? "visible" : "hidden"}
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-md"
              >
                Mobile Apps Across Industries
              </motion.h2>
              <div className="relative group">
                <motion.div
                  variants={staggerItem}
                  className="text-gray-200 leading-relaxed text-lg md:text-xl font-medium max-h-96 overflow-y-hidden hover:overflow-y-auto hover:pr-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent transition-all duration-300"
                >
                  <p className="mb-6">
                    Mobile apps are versatile, serving diverse industries with
                    tailored solutions:
                  </p>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    1. Retail and E-commerce
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps enable seamless shopping with features like product
                      catalogs, secure checkouts, and loyalty programs.
                    </li>
                    <li>
                      Push notifications drive sales through personalized offers
                      and cart abandonment reminders.
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    2. Healthcare
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps manage patient records, schedule appointments, and
                      provide telemedicine services.
                    </li>
                    <li>
                      They improve patient engagement with reminders and health
                      tracking features.
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    3. Real Estate
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps showcase property listings, virtual tours, and
                      facilitate client communication.
                    </li>
                    <li>
                      Agents use apps to manage inquiries and track deals in
                      real time.
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    4. Nonprofit Organizations
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps streamline fundraising, volunteer management, and
                      donor engagement.
                    </li>
                    <li>
                      They enhance outreach with event notifications and
                      donation portals.
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    5. B2B Enterprises
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps support lead generation, contract management, and
                      team collaboration, ensuring efficient B2B interactions.
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    6. Education
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps deliver e-learning content, manage student data, and
                      facilitate parent-teacher communication.
                    </li>
                    <li>
                      They enhance engagement with interactive tools and
                      progress tracking.
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-red-400 mb-4">
                    7. Hospitality
                  </h3>
                  <ul className="list-disc list-inside mb-6 space-y-3">
                    <li>
                      Apps manage bookings, guest preferences, and loyalty
                      programs.
                    </li>
                    <li>
                      They improve guest experiences with real-time updates and
                      feedback systems.
                    </li>
                  </ul>
                  <p>
                    <span className="font-bold">Jaivik Technology's</span> apps
                    are customized for industries like logistics (for real-time
                    tracking), finance (for secure transactions), and
                    entertainment (for streaming services). For example, our
                    e-commerce app boosted sales by 35% through personalized
                    recommendations, while a fitness app increased user activity
                    by 50% with gamified features.
                  </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ rotate: 5, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <img
                src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/representations-user-experience-interface-design.avif"
                alt="Mobile App Use Cases"
                className="w-full h-80 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-b from-black to-gray-900 py-20 px-4 text-center relative overflow-hidden"
        style={{ y }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-red-500 mb-8 tracking-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Business with Mobile Apps?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-medium text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our mobile app solutions can streamline your
            operations, boost engagement, and enhance customer satisfaction.
          </motion.p>
          <motion.button
            className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
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
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 0.3]),
          }}
        />
      </motion.div>
    </div>
  );
};

export default MobileApplication;
