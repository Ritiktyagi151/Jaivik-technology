"use client";

import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SEOManagement from "../../components/seo/SEOManagement";

interface ExpandedSections {
  [key: number]: boolean;
}

interface Section {
  id: number;
  title: string;
  subtitle: string;
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

const WebDevelopment = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );
  const sections: Section[] = [
    {
      id: 0,
      title: "Website Development That Grows Your Business",
      subtitle: "",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            In the modern digital state of affairs, no business can afford not to have a good online presence to remain competitive and visible. The customers will be exposed to your brand through your site and start engaging with the brand and that is why Website Development is a necessary aspect of business expansion. Every one of these aspects is enhanced by creating a well-developed site which will create trust, enhance user experience and ensure your business reaches the correct audience at the correct time.
            <br /><br />
            The selection of a professional Website Development Company is a significant contribution to the realization of these outcomes. Professionals have knowledge on the current design trends, user experience and the technical aspects that are necessary to develop a quick, secure and responsive web page. They have the experience to make your web site not only look good, but also be effective on all devices.
            <br /><br />
          {expandedSections[0] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              We shall discuss here the meaning of Website Development, its importance, the main features that assist in business growth, and how the top Website Development Companies can assist businesses to grow by using intelligent strategies and development practices.
            </motion.span>
          )}
          </p>
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Website-Development.avif",
      alt: "Website Development",
      sectionId: "website-development",
    },
    {
      id: 1,
      title: "What Is Website Development?",
      subtitle: "Aligning Your Website with Business Goals",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            <a className="text-blue-700 underline font-bold" href="https://www.jaikvik.in/blog/website-development-blueprint-for-business-growth-online">Website Development </a> refers to the act of developing a well operational, easily usable, and attractive site that markets your business online. It includes various technical and creative processes that collaborate to provide an uncomplicated online experience. The major details that outline Website Development are as follows:
            <br />
            <br />
            <strong className="text-blue-300">
              1. Design & Layout Creation:<br />
            </strong>{" "}
            Designing the web site structure, color scheme, layout and graphics.<br />
            Having the design to represent your brand.
            <br /><br/>
            <strong className="text-blue-300">2. Coding & Programming:</strong><br />
            Creation of the site with such languages as HTML, CSS, JavaScript and frameworks.<br />
            Ensuring that all the features are smooth.
            <br /><br/>
           
          {expandedSections[1] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
               <strong className="text-blue-300">
              3. Content Development:<br />
            </strong>{" "}
            Composing, structuring text, pictures, videos and photographs.<br />
            Making the content clear, useful and optimized.<br /><br/>
            
              <strong className="text-blue-300">
              4. Website Functionality:<br />
            </strong>{" "}
            Incorporating the much needed features like forms, buttons, menus and integrations.<br />
            Increasing user interaction and navigation.<br /><br/>
            <strong className="text-blue-300">
              5. Mobile Responsiveness:<br />
            </strong>{" "}
            Ensuring that the site is flawless on mobile devices, tablets and desktops.<br />
            Ensuring that the user experience is not broken.<br /><br/>
            <strong className="text-blue-300">
              6. Speed Optimization:<br />
            </strong>{" "}
            Improving loading time to improve the performance and minimize bounces.<br /><br/>
             <strong className="text-blue-300">
              7. SEO Compatibility:<br />
            </strong>{" "}
            Coding the webpage in clean, meta tags, and using optimized URLs to enable the webpage to be ranked higher.<br /><br/>
            <strong className="text-blue-300">
              8. DIY vs Professional Development:<br />
            </strong>{" "}
            DIY website builders have fewer functionality and slower speed.<br /><br />
            A business oriented Web Development Company provides a quick, safe and scalable site to meet the business expansion requirement.
            </motion.span>
          )}
          </p>
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Website-Types.avif",
      alt: "Website Types",
      reverse: true,
      sectionId: "website-types",
    },
    {
      id: 2,
      title: "Why Website Development Matters for Business Growth",
      subtitle: "Gathers Consolidated Business Credibility.",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            ●	An impression made by a professionally designed site is good.
            <br />
            ●	Trust can be earned with clean design, good graphics and functionality.
            <br />
            ●	Customers are confident in companies that have an updated and modern online presence.<br /><br />
            <strong className="text-blue-300">Increases Customer Interaction:</strong><br />●	Products and services can be explored easily by users due to well-structured pages.<br></br>
            ●	Interactive features such as chat support, blogs, buttons and forms enhance interaction.<br />
            ●	The simple navigation helps make the visitors spend more time and interact more.<br />
            <br />
          </p>
          {expandedSections[2] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Uses Lead Generation & Conversions:</strong> <br />
            ●	A site that is growth-oriented directs the user to an action (buy, ask, subscribe).<br />
            ●	Clear CTAs and streamlined landing pages serve the purpose of changing visitors into customers.<br />
            ●	Design improvement = increase in conversion.
            <br /><br />
              <strong className="text-blue-300">
              Relevance of Mobile Responsiveness:<br />
            </strong>{" "}
            ●	Most users browsing are on mobile gadgets.<br />
            ●	A mobile design is easy to use on any size of the screen.<br />
            ●	Increased mobile performance increases Google rankings.
            <br /><br />
               <strong className="text-blue-300">
              Fast Loading Speed Matters:<br />
            </strong>{" "}
            ●	Slow websites raise the rates of bouncing.<br />
            ●	The quick and streamlined site keeps the users busy and enhances better search visibility.
            <br /><br />
            <strong className="text-blue-300">
              Website Development Company Support:<br />
            </strong>{" "}
            ●	Professional developers develop easy to use, secure and scalable websites.<br />
            ●	They combine such highly developed functions as CRM, payment gateways, chatbots, and others.<br />
            ●	Website Development Companies also keep and refresh your site on a regular basis.<br /><br />
            <strong className="text-blue-300">
              Works as a 24/7 Sales Tool:<br />
            </strong>{" "}
            ●	Your web pages advertise your business 24 hours a day.<br />
            ●	Whenever customers want to shop, they can compare and buy.<br />
            ●	It will be your most powerful online sales person.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Web-Benefits.avif",
      alt: "Web Benefits",
      sectionId: "web-benefits",
    },
    {
      id: 3,
      title: "Key Features of Growth-Focused Website Development",
      subtitle: "Mobile-Friendly and Responsive Design",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            ●	Scales well on both mobiles, tablets, and desktops.<br />
            ●	Improves the readability and enhances the user interaction.<br />
            ●	Mobile-first design improves the work of the SEO.<br />
            ●	Minimizes bounce rate and has a wider audience.<br /><br />
            <strong className="text-blue-300">SEO-Optimized Structure</strong>
            <br />
            ●	Fast crawling and indexing of code.<br />
            ●	Optimized URLs, title tags, meta description and headers.<br />
            ●	Schema markup enhances the appearance of search.<br />
            ●	Grow your business higher and have more organic traffic.<br /><br />
          </p>
          {expandedSections[3] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
               <strong className="text-blue-300">Fast Loading Speed</strong>
            <br />
            ●	Speedy loading enhances satisfaction of the user.<br />
            ●	Minimizes the bounce rate.<br />
            ●	Before sending images, Development Companies do optimization, decrease file sizes, and employ fast servers.<br />
            ●	Web sites that load faster are more converted and do well in search.<br /><br />
             <strong className="text-blue-300">Secure Website Architecture</strong>
            <br />
            ●	SSL certificates ensure the security of sensitive data.<br />
            ●	The frequent backups ensure loss of data is avoided.<br />
            ●	Attacks are guarded by firewalls and security patches.<br />
            ●	Security creates user confidence and promotes brand reliability.<br /><br />
            <strong className="text-blue-300">User-Centric Interface (UI/UX)</strong>
            <br />
            ●	Easy navigation will guarantee that users get information fast.<br />
            ●	The brand identity is created by appealing layouts and similarity in appearances.<br />
            ●	There are clear CTAs that direct the traffic to such actions as Buy Now or Contact Us.<br />
            ●	Good UI/UX makes the site spend time and improve conversions.<br /><br />
            <strong className="text-blue-300">Scalability and Future-Proofing</strong>
            <br />
            ●	Facilitates the addition of new features (CRM, payment tools, inventory tools) easily.<br />
            ●	Saves on the time and effort of redesigning the entire web site to support the growth of business.<br />
            ●	Future-proof design is used to adapt to new trends and technologies.<br />
            ●	Maintains stability and performance in the long-term.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Web-Use-Cases.avif",
      alt: "Web Use Cases",
      reverse: true,
      sectionId: "web-industries",
    },
    {
      id: 4,
      title: "How a Web Development Company Helps You Grow",
      subtitle: "Strategic Planning Preface to Development.",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            ●	Any good <a className="text-blue-700 underline font-bold" href="https://www.jaikvik.in/blogs">Web Development Company </a> would start with the knowledge of your business objectives, your target market, and your competitors.<br />
            ●	They develop an excellent layout, feature, technology and user experience plan.<br />
            ●	This is to make sure that the completed site corresponds with your brand purpose and growth objectives.
            <br />
            <br />
            <strong className="text-blue-300">Custom Website Development</strong>
            <br />
            ●	Custom websites designed to suit your business.<br />
            ●	Design is unique, performance is improved and it is fully scalable.<br />
            ●	Apposite where the brand would like to have full control of features and appearance.<br /><br />
          </p>
          {expandedSections[4] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Internet-based Business Growth</strong>{" "}<br />
              ●	Creation of online stores that have secure payment gateways, product management and orders tracking.<br />
              ●	Provides seamless checkout process and high performer product pages.<br />
              ●	Best in companies that sell goods via the Internet.<br />
              <br />
              <strong className="text-blue-300">Corporate Websites</strong>{" "}<br />
              ●	Professional layouts that are clean and are preferred by companies that desire a good brand image.<br />
              ●	It has service pages, portfolios, blogs, and contact sections.<br />
              <br />
              <strong className="text-blue-300">
                Website development based on the CMS<br />
              </strong>{" "}
              ●	Was built on WordPress, Shopify, or Magento.<br />
              ●	Enables non-technical easy content updates.<br />
              ●	Small businesses, dynamic websites and blogs.<br />
              <br />
              <strong className="text-blue-300">Website Redesign Services</strong><br />
              ●	Updates the old websites and makes them newer and better designed in terms of structure, visuals and speed.<br />
              ●	Assist in promoting interest and visibility.
              <br />
              <br />
              <strong className="text-blue-300">Application of Recent Tools and Technology.</strong><br />
              ●	The latest frameworks, plugins, and development tools are used in professional companies.<br />
              ●	Brings superior speed, security, search engine, and sustainability.
              <br />
              <br />
              <strong className="text-blue-300">Guaranteeing Long-lasting Website Performance.</strong><br />
              ●	Frequent updates, security patches, backups, and performance monitoring.<br />
              ●	Ongoing maintenance to maintain the site with bugs.<br />
              ●	Keep your website within the shifting business requirement.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/E-commerce-Websites.avif",
      alt: "E-commerce Websites",
      sectionId: "ecommerce-websites",
    },
    {
      id: 5,
      title: "Choosing the Right Website Development Company",
      subtitle: "Experience & Portfolio",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            ●	Ask how many years the company has been operating in the industry.<br />
            ●	Examine previous projects of their design and technical capabilities.<br />
            ●	The portfolio they have shows that they can cope with various kinds of websites.
            <br />
            <br />
            <strong className="text-blue-300">Knowledge of Your Industry.</strong>
            <br />
            ●	Specific websites that are industry-focused are better since they are in line with customer expectations.<br />
            ●	Select a business partner that has dealt with other businesses in the past.<br />
            ●	They are able to point you to the right features and best practices to use in your niche.<br /><br />
            <strong className="text-blue-300">Transparent Pricing & Communication</strong><br />
            ●	A great business does not have any non-disclosed prices.<br />
            ●	Constant update and flow of information avoid delays and misunderstandings.<br />
            ●	Transparency will make sure that you understand what you are actually paying.
          </p>
          {expandedSections[5] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Use of Latest Technologies</strong><br />
              ●	The performance is improved by the use of new development tools: HTML5, CSS3, JavaScript frameworks, and CMS platforms.<br />
              ●	Businesses that apply AI-enabled tools and high-level security provide more powerful websites.<br />
              ●	Modernised technology will keep your site competitive.<br /><br />
              <strong className="text-blue-300">Reviews & Reputation</strong><br />
              ●	Examine Google feedback, reviews, and ratings.<br />
              ●	Trust, timely delivery and professional service are reflected in good reviews.<br />
              ●	A good reputation is a positive predictor of dependability.<br /><br />
              <strong className="text-blue-300">Post-Launch Support</strong><br />
              ●	Websites require frequent updates, maintenance, bugs and security.<br />
              ●	Select a firm that is willing to support long-term but not only development.<br />
              ●	After sales service insures your site against downtime and hacking.<br /><br />
              <strong className="text-blue-300">Closing Reminder</strong><br />
              The choice of <a className="text-blue-500 font-bold underline" href="https://www.jaikvik.in/">Website Development</a> Company influences your business growth in the long term directly. A trusted partner will make your site stay fast, secure, scalable and can yield good results over several years.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/woocommerce-websites.avif",
      alt: "Choosing Website Development Company",
      reverse: true,
      sectionId: "choosing-company",
    },
    {
      id: 6,
      title: "Types of Website Development Services Offered by Website Development Companies",
      subtitle: "Custom Website Development",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            ●	The Website Development Companies are the ones that are developed all the way to meet the business requirements.<br />
            ●	Propositions distinctive design, total control and unlimited scalability.<br />
            ●	Helps brands are also differentiated and provide custom user experiences.<br /><br />
            <strong className="text-blue-300">Ecommerce Web Page Development.</strong>
            <br />
            ●	It has product listing, shopping carts, secure payment gateways and order management.<br />
            ●	Created to offer a seamless purchasing process and boost the sales.<br />
            ●	United in businesses dealing with products over the internet.
          </p>
          {expandedSections[6] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">CMS Website Development</strong><br />
              ●	Sites are created based on the WordPress, Shopify, and Magento platforms.<br />
              ●	Enables easy updating of content without the technical expertise.<br />
              ●	Sponsors blogs, online business websites and small stores.<br /><br />
              <strong className="text-blue-300">Website Redesign Services</strong><br />
              ●	Updates the old websites to be designed in a contemporary manner, enhanced UX, and increased speed.<br />
              ●	Supports businesses to be competitive and relevant in the digital world.<br />
              ●	Increases interaction and transactions.<br /><br />
              <strong className="text-blue-300">Landing Page Development</strong><br />
              ●	Ads, promotional pages and conversion-oriented pages.<br />
              ●	Geared towards boosting subscriptions, inquiries and purchases.<br />
              ●	Being important to enhance ROI in digital marketing.<br /><br />
              <strong className="text-blue-300 block mt-8 text-xl">Value Added to Business Development:</strong><br />
              The services enhance online presence, enhance user experience, and facilitate conversions. Under the shield of the right <a className="text-blue-500 font-bold underline" href="https://en.wikipedia.org/wiki/Web_development">Website Development</a>  Company, the businesses receive a professional and high performance platform leading to long term growth.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Corporate-Websites.avif",
      alt: "Website Development Services",
      sectionId: "development-services",
    },
    {
      id: 7,
      title: "Website Development Best Practices that Move Results",
      subtitle: "Clear Brand Messaging",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Your message must tell what you are and what you sell.<br />
            A powerful message creates confidence and assists the user to relate with your brand.<br /><br />
            <strong className="text-blue-300">Visual Consistency</strong><br />
            Apply uniform colors, fonts and design styles.<br />
            Having a homogeneous appearance will improve brand recognition and the readability.<br /><br />
            <strong className="text-blue-300">Optimized Content</strong><br />
            The content must be plain, educative, and search engine optimized.<br />
            Quality content makes it more interesting and more popular in search engines.<br /><br />
          </p>
          {expandedSections[7] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">Strong Calls-to-Action (CTAs)</strong><br />
              The users are guided by such buttons as Buy Now, Contact Us, or Get Quote.<br />
              Easy CTAs have a great effect on conversion.<br /><br />
              <strong className="text-blue-300">Analytics and Tracking.</strong><br />
              Such tools as Google Analytics can assist you to comprehend the behavior of users.<br />
              Performance tracking enables business entities to remedy the areas which are underperforming and enhance performance.<br /><br />
              <strong className="text-blue-300">Periodical Updates and Maintenance.</strong><br />
              Maintaining your website with updating of the plugins, content and security makes it a reliable one.<br />
              Frequent enhancements are used to improve user experience and site performance.<br /><br />
              <strong className="text-blue-300">Ease of use and Conformance.</strong><br />
              The websites must be user-friendly to every visitor, even the disabled.<br />
              Adherence enhances satisfaction and prevents lawsuits.<br /><br />
              <strong className="text-blue-300 block mt-8 text-xl">How These Practices Help:</strong><br />
              These best practices will produce a smooth, trusting and conversion-specific site. Companies that apply them experience improved interaction, improved ranking, and enhanced growth of income.
            </motion.span>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Online-Portals.avif",
      alt: "Best Practices",
      reverse: true,
      sectionId: "best-practices",
    },
    {
      id: 8,
      title: "Common Mistakes Businesses Make in Website Development",
      subtitle: "Using Outdated Designs",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            Outdated designs create a bad impression and less interaction.<br /><br />
            <strong className="text-blue-300">Poor Navigation</strong><br />
            Complicated hierarchies create problems with confusion of menus and they result in high bounces.<br /><br />
            <strong className="text-blue-300">Slow Website Speed</strong><br />
            Web sites that take long to load lose customers and harm SEO scores.<br /><br />
            <strong className="text-blue-300">Weak or Unclear Content</strong><br />
            Bad content does not describe your services and decreases conversions.<br /><br />

          {expandedSections[8] && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="block mt-4"
            >
              <strong className="text-blue-300">No SEO Strategy</strong><br />
              In the absence of SEO, websites cannot rank and get organic traffic.<br /><br />
              <strong className="text-blue-300">Lack of Security Measures</strong><br />
              Lack of backups, firewalls, or SSL puts websites at risk of cyber attacks.<br /><br />
              <strong className="text-blue-300">The importance of avoiding these mistakes is as follows:</strong><br />
              ●	With these typical mistakes avoided, companies are able to develop well performing websites, which gain increased visitors, confidence and compel conversions.<br />
              ●	It results in improved user experience, enhanced online presence, and success in the long run in the digital space.
            </motion.span>
          )}
          </p>
        </>
      ),
      image: "",
      alt: "Common Mistakes",
      sectionId: "common-mistakes",
    },
    {
      id: 9,
      title: "Future Trends in Website Development",
      subtitle: "AI-Powered Website Features",
      content: (
        <>
          <p className="text-gray-300 leading-relaxed mb-4">
            The AI technologies help to make the content personal, automated and provide better user experience.
            <br /><br />
            <strong className="text-blue-300">Instant Support Chatbots.</strong>
            <br />
            Chatbots provide the response in time and improve interaction with customers 24 hours.
            <br /><br />
            <strong className="text-blue-300">Voice Search Optimization</strong>
            <br />
            Websites will be forced to adapt to voice search as voice assistants will continue to grow.
            <br /><br />
            <strong className="text-blue-300">Enhanced Personalization</strong>
            <br />
            The websites will be displayed according to the user behavior and location as well as preferences.
            <br /><br />
           
            {expandedSections[9] && (
              <motion.span
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                className="block mt-4"
              >
                <strong className="text-blue-300">Rapid Enhances with new Structures</strong>
                <br />
                Current systems such as Next.js and React ensure enhanced performance and speed.
                <br /><br />
                <strong className="text-blue-300">Mobile-First Indexing</strong>
                <br />
                ●	Websites are first ranked by Google on their mobile version.<br />
                ●	The mobile friendly design is now a requirement in order to be seen.
                <br /><br />
                <strong className="text-blue-300 text-xl block mt-8">Why It Matters:</strong>
                <br />
                Partnering with a current Website Development Company keeps your site abreast of the current trends, technologies and user demands - this keeps you on top of your rivals and more customers are drawn to your site.
              </motion.span>
            )}
          </p>
        </>
      ),
      image: "",
      alt: "Future Trends",
      reverse: true,
      sectionId: "future-trends",
    },
  ];

  // Initialize expandedSections after sections definition
  React.useEffect(() => {
    setExpandedSections(
      sections.reduce((acc, section) => ({ ...acc, [section.id]: false }), {})
    );
  }, []);

  const sectionRefs: SectionRef[] = sections.map(() => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    return { ref, inView };
  });

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev: ExpandedSections) => ({
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
    <div className="font-sans text-gray-100 bg-gray-900 min-h-screen relative overflow-hidden">
      <SEOManagement title="Top Web Development Company | Leading Website Development Company"
        description="Looking for expert Website Development Companies? Our Web Development Company delivers high-quality website development services to help your business grow."
        keywords="Web development Company, Website Development Companies,Website Development Company, Website development"
        canonical="" />
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-purple-900 rounded-full blur-3xl opacity-20" />
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center z-10 overflow-hidden"
        style={{
          backgroundImage: `url('')`,
        }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        aria-label="Web Solutions Hero"
        id="web-hero"
      >
        <div className="absolute inset-0 bg-black/80 z-10" />
        <motion.div
          className="relative z-20 px-5 w-full max-w-7xl mx-auto"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Empower Your Business Online
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Build stunning e-commerce, corporate websites, WooCommerce stores,
            and online portals with Jaivik Technology
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("web-overview")}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
            aria-label="Explore Web Solutions"
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

      {/* Main Content Sections */}
      <div
        className="w-full mx-auto px-5 py-12 md:py-16 relative z-20 bg-gray-900"
        id="web-overview"
      >
        <div className="max-w-8xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              ref={sectionRefs[index].ref}
              id={section.sectionId}
              className={`flex flex-col ${section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-10 items-center bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm mb-12 hover:shadow-lg hover:shadow-blue-900/20`}
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
                  className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6"
                >
                  {section.title}
                </motion.h2>
                <motion.h3
                  variants={staggerItem}
                  className="text-xl text-blue-300 mb-4"
                >
                  {section.subtitle}
                </motion.h3>
                <motion.div
                  variants={staggerItem}
                  className="text-gray-300 leading-relaxed mb-4"
                >
                  {section.content}
                </motion.div>
                <motion.button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center text-blue-400 font-medium mt-4 transition-colors duration-300 hover:text-blue-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Toggle ${section.title} Description`}
                >
                  {expandedSections[section.id] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${expandedSections[section.id] ? "transform rotate-90" : ""
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
                  className="w-full h-96 rounded-lg shadow-md transition-transform duration-500 hover:scale-105 object-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="bg-gray-900 py-16 px-5 text-center relative overflow-hidden"
        style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Empower Your Business Online?
          </motion.h2>
          <motion.p
            className="text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our web solutions can enhance your digital presence,
            drive sales, and improve customer engagement.
          </motion.p>
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            aria-label="Get Started with Web Solutions"
          >
            Get Started Today
          </motion.button>
        </div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(56, 182, 255, 0.1) 0%, transparent 70%)",
            opacity,
          }}
        />
      </motion.div>
    </div>
  );
};
export default WebDevelopment;
