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
        <div className="text-center py-12 bg-black">
          <h2 className="text-3xl font-bold text-red-500 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-200">
            Please try refreshing the page or contact support.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Define types for section content with two images
interface Section {
  title: string;
  content: React.ReactNode;
  images: [string, string];
  alts: [string, string];
  reverse?: boolean;
}

interface ExpandedSections {
  [key: number]: boolean;
}

const CRMPage: React.FC = () => {
  const [expandedSections] = useState<ExpandedSections>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [heroRef, heroInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // Define sections array with two images each
  const sections: Section[] = [
    {
      title: "What Is CRM?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            CRM, which stands for Customer Relationship Management, refers to a
            strategic method of interacting with a company and its present and
            potential customers. It combines technology, processes, and data to
            efficiently operate sales, marketing, and consumer care.
          </p>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            CRMs act as a central house for businesses to keep vital information
            on their customers: contact information, sales history,
            communication logs, etc. It is not merely a large database but a
            business operation backbone encouraging staff collaboration,
            automation of mundane tasks, and the construction of genuine
            camaraderie with its clientele.
          </p>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Modern CRMs feature artificial intelligence insights as well as the
            possibility of integrating more advanced ways for achievement
            purposes, which help a business significantly forward its capacity
            to make clear, goal-aligning decisions. In the end, it is a
            principle of a customer strategy applicable to businesses in all
            territories, regardless of their size or industry.
          </p>
          {expandedSections[0] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Jaivik Technology CRM Solutions
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                At <span className="font-semibold">Jaivik Technology</span>,
                our CRM solutions are designed to empower businesses by
                integrating seamlessly with existing systems, offering
                customizable workflows, and providing real-time insights.
                Whether you're a small startup or a large enterprise, our CRM
                adapts to your needs, ensuring you stay connected with your
                audience at every touchpoint. From lead generation to post-sale
                support, CRM transforms how businesses nurture relationships and
                drive growth.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Competitive Advantage
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                In today's fast-paced digital landscape, businesses must
                prioritize customer relationships to stay competitive. A CRM
                system is not just a tool but a strategic asset that helps
                companies understand their customers better, anticipate their
                needs, and deliver exceptional experiences. For instance, a
                retail business using CRM can analyze customer purchase patterns
                to offer personalized discounts, while a healthcare provider can
                use it to send timely reminders for appointments, reducing
                no-shows and improving patient satisfaction.
              </p>
            </motion.div>
          )}
        </>
      ),
      images: [
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/crm.avif",
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/hand-drawn-crm.avif",
      ],
      alts: [
        "CRM illustration showing people and technology",
        "Hand drawn CRM concept with charts and graphs",
      ],
    },
    {
      title: "What Does CRM Do?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            At its core, a CRM is designed to aid businesses in organizing,
            tracking, and enhancing their interactions with customers. Here is
            the rundown on its functionality:
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Centralizing Customer Data
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            Every detail concerning a customer is to be managed by the CRM in a
            single database. This embraces insightful facts such as contact
            details, sales history, preferences, and communication threads. This
            in turn guarantees that information does not get lost or overlooked
            and is instantly available to responsible units.
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            Administering Sales Pipelines
          </h4>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            A CRM system is able to monitor leads along several stages of the
            sales process. This empowers salespeople to see who is most likely
            to convert and where efforts should be concentrated.
          </p>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Automation of Repetitive Tasks
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                In essence, an application that is CRM-basedalbums an automate
                tasks. Such tasks include email follow-ups, reminders,
                invoicing, and many others. Democratizing workflow could
                streamline operations while reducing error margin and time
                needed while maintaining overall quality control.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Marketing Tools
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Built-in the same system, CRM provides marketing automation with
                a program automatizing campaign preparation, audience segments,
                and an overarching view on one's marketing ROI.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Customer Support
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                CRM can be useful in solving helpdesk inquiries, complaints, and
                service requests to make sure that every single customer
                experiences the best disposition in a commensurate and timely
                response.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Advanced Features
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Beyond these essentials,{" "}
                <span className="font-semibold">Jaivik Technology's</span> CRM
                offers advanced features like AI-driven predictive analytics to
                forecast customer behavior, mobile app access for on-the-go
                management, and integration with tools like Slack, Google
                Workspace, and accounting software. This ensures your team stays
                productive and your customers stay engaged, no matter where
                business takes you.
              </p>
            </motion.div>
          )}
        </>
      ),
      images: [
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/hand-drawn-crm-infographic.avif",
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/gradient-crm-illustration.avif",
      ],
      alts: [
        "CRM infographic showing workflow",
        "Gradient CRM illustration with charts",
      ],
      reverse: true,
    },
    {
      title: "Why Should Enterprises Opt for CRMs?",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            There are so many reasons why CRM systems are essential:
          </p>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              <span className="font-semibold text-lg md:text-xl text-red-500">
                Customer-Centric:
              </span>{" "}
              Vital in creating and sustaining strong customer satisfaction
              through personalized care.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl text-red-500">
                Insight into Data:
              </span>{" "}
              Harnessing analytical functionalities, a CRM makes it possible to
              comport data into palatable, relevant understandings that can
              guide forecasting, measurement, and opportunity identification
              accurately.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl text-red-500">
                Scalability:
              </span>{" "}
              CRMs are adaptable to businesses of any size, growing with the
              organization.
            </li>
            <li>
              <span className="font-semibold text-lg md:text-xl text-red-500">
                Increased Efficiency:
              </span>{" "}
              By allowing hands-free attention to lower priorities during the
              progress of tasks, CRM brings higher efficiency to the business.
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
                Savings in Cost
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Removing manual effort and thus improving productivity while
                helping eliminate potential errors offers far-reaching resource
                savings for the business.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Essential Blocks Of CRM
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Contact Management:
                  </span>{" "}
                  Base-structured entities of all CRM. It seeks to arrange all
                  customer information into manageable forms for easy retrieval
                  and use.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Sales Automation:
                  </span>{" "}
                  Sales aggregation tool for leads, deals, and tracking
                  activities at each stage of a sales cycle.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Marketing Integration:
                  </span>{" "}
                  Email or campaign track worsens with audience segmentation;
                  Marketing tools form part of CRM for many companies.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Customer Service Desk:
                  </span>{" "}
                  Manifold interweaving with customer service would mean dealing
                  with service tickets and inquiries into pertinent information
                  concerning various CRM modules.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Analytics and Reports:
                  </span>{" "}
                  Mitigate in-depth business analytics from reporting tools; it
                  shows performance with clients, customer behavior, and market
                  trends.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Collaboration Tools:
                  </span>{" "}
                  Occupy unique calendars amongst others, which encourage
                  teamwork, be in task management, unified communication, or
                  discussion mode.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Jaivik Technology Benefits
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Enterprises choosing{" "}
                <span className="font-semibold">Jaivik Technology's</span> CRM
                also benefit from enhanced security with encrypted data storage,
                24/7 customer support, and regular updates that keep your system
                ahead of industry trends. Studies show businesses using CRM can
                see up to a{" "}
                <span className="font-semibold">
                  300% increase in lead conversion rates
                </span>{" "}
                and a{" "}
                <span className="font-semibold">
                  30% reduction in operational costs
                </span>
                —proof that CRM isn't just a tool, it's a competitive advantage.
              </p>
            </motion.div>
          )}
        </>
      ),
      images: [
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/gradient-crm-illustration1.avif",
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/hand-drawn-crm-infographic.avif",
      ],
      alts: [
        "Gradient CRM illustration showing benefits",
        "Hand drawn CRM concept with people",
      ],
    },
    {
      title: "CRM for Different Ventures",
      content: (
        <>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
            The use of CRMs has advanced in many industries today. It allows the
            provision of tailor-made solutions for meeting specified operational
            needs. An overview is now presented for how various industries
            employ CRM for increased efficiency and to better customer
            relationships:
          </p>
          <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
            1. Retail and E-commerce
          </h4>
          <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
            <li>
              CRMs help retailers to track customer preferences, monitor
              customer habits of purchase, and produce custom marketing
              promotions.
            </li>
            <li>
              E-commerce platforms utilize CRM information to serve customer
              requirements better with custom offers or deal with loyalty
              programs and cases optimized for convenient shopping.
            </li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-5"
            >
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Healthcare Continued
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  They resume a digitized treatment history and provide a bridge
                  for seamless interaction between medical staff and clients.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                3. Real Estate
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRM helps real estate agents manage property listings, monitor
                  customer inquiries, and track the sales cycle.
                </li>
                <li>
                  Agents use the CRM for follow-ups and to supply timely updates
                  to clients on properties.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                4. Nonprofit Organizations
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRM has empowered nonprofit organizations to develop
                  strategies of fundraising besides administering campaigns to
                  reach their governing bodies and donors.
                </li>
                <li>
                  CRM-based key performance indicators support donor development
                  immensely.
                </li>
                <li>
                  The crux of CRM, as a tool, is to enable impactful donor
                  engagement.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                5. B2B Enterprises
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRMs for B2B businesses are considered handy for generating
                  leads, nurturing relationships, and making sales forecasts.
                </li>
                <li>
                  Their common application includes the management of long-term
                  contracts and for effective execution of inter-divisional
                  coordination.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                6. Education
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRMs are used by schools, colleges, and training centers to
                  manage student applications, monitor enrollment data, and
                  maintain alumni relationships.
                </li>
                <li>
                  They help enhance interdepartmental communication, staff
                  communication, and communication with guardians.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                7. Hospitality
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Hoteliers and F&B providers use CRM tools to track preferences
                  of guests concerning hospitality, reservations, and other
                  similar services.
                </li>
                <li>
                  They can also keep channelized promotional messages to retain
                  loyal customers.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Business-to-Business Contacts
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                CRM is a source of lead generation capacity, which might lead to
                nurturing a 10-15-year partnership, far longer than what most
                people right now could envisage. For B2B, one additional service
                involves collaboration within internal teams to ascertain their
                customer/deal-follow issues faster than everyone else arduous,
                time-saving efforts with positive outcomes like improving profit
                expectations for forecasting sales revenues, service and
                consultation processes, etc.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Who Can Implement CRM?
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                The use of CRMs is not reserved for a particular industry or
                business size. Their versatility and adaptability have led to
                them serving users in a broad variety of areas. The following is
                a breakdown of some CRM users:
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                1. Small Businesses
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Most small businesses do not have the resources to boast about
                  more complicated procedures, hence the importance of CRM in
                  pushing the consolidation of their work.
                </li>
                <li>
                  It helps in tracking leads, automating follow-up, and managing
                  data entry until you have a large team to help.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                2. Big Enterprises
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Large organizations are bound to have distributions of CRMs to
                  control their vast client bases as well as employ huge numbers
                  of sales pipelines and an array of complex layers of marketing
                  systems.
                </li>
                <li>
                  With advanced analytics and integration capabilities, this
                  tool brings together data for various departments, leading to
                  efficiency and collaboration.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                3. Sales Teams
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Sales executives need CRM to be the hub of their lead
                  tracking, deal management, and automating routine work like
                  follow-ups and data entry.
                </li>
                <li>
                  This system provides visibility over a sales pipeline with a
                  more solid support to forecasting and performance tracking.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                4. Marketing Teams
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRM gives marketing people the ability to segment their
                  market, craft personalized campaigns, and measure the impact
                  on ROI.
                </li>
                <li>
                  It is indispensable for digital marketing with its email
                  automation, social media tracking, and campaign analytics.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                5. Customer Service Teams
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRMs make ticket resolution quicker and more efficient for
                  service representatives and retain files on what interaction
                  each customer has had with them, improving customer happiness
                  and retention.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                6. Freelancers and Consultants
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Freelancers and independent consultants turn to CRMs to manage
                  their client base, track project deadlines, and schedule
                  follow-ups.
                </li>
                <li>
                  Invoicing and reporting have been simplified by CRMs so that
                  they can focus on their real services.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                7. Nonprofit Organizations
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRMs have empowered nonprofits to manage donor relationships,
                  plan fundraising campaigns, and track volunteer activities.
                </li>
                <li>
                  They foster optimization of outreach strategies to maximize
                  impact.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                8. Educational Institutions
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Universities and schools use CRM to streamline enrollment,
                  manage student information, and create alumni relations.
                </li>
                <li>
                  They also tie staff, students, and parents for enhanced
                  communication.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                9. Healthcare Providers
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Healthcare service providers use CRMs for patient record
                  management, appointment organization, and treatment plan
                  management.
                </li>
                <li>This improves patient care and operational efficiency.</li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                10. E-commerce Platforms
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  CRMs are vital to tracking customer activities and
                  interactions for e-commerce businesses, managing stimulus
                  programs, or making product suggestions via recommendations.
                </li>
                <li>
                  They also increase retention by allowing for solid
                  personalized shopping experiences.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                11. Real Estate Agents
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  Real estate practitioners capitalize on CRMs to manage
                  property listings, customize email campaign activities for
                  each client's interest, and make appointments with their
                  clients.
                </li>
                <li>
                  It helps in building a good client relationship in the long
                  run.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                CRM Versatility
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                A definable feature of CRMs is that they present numerous
                possibilities and scalability, making them ideal for anyone
                needing effective customer relationship management, increased
                efficiency, and better business growth. Whichever level you are
                on, solo entrepreneur to multinational corporation, CRM will be
                the change that turns all the events for you by nurturing the
                success and growth of managing your interactions.
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Benefits of Using a CRM
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Improved Business-Customer Relationships:
                  </span>{" "}
                  This implies a more specialized customer service experience,
                  hence an immediate leap in customer satisfaction and loyalty.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Streamline Business Processes:
                  </span>{" "}
                  Automation in streamlining processes gives businesses an
                  invaluable relief from burden.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Enhanced Sales Performance:
                  </span>{" "}
                  Data-based information provided within CRMs could help sales
                  teams push through leads, driving into winners for the
                  company.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Improved Collaboration:
                  </span>{" "}
                  Since it facilitates fast and efficient data accessibility,
                  this fosters good teamwork.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Reduced Costs:
                  </span>{" "}
                  By doing away with manual administrative activities, CRMs can
                  cut down operational costs caused by inefficiencies and
                  incomplete projects, meaning CRMs serve as cost-effective
                  machines.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Key Attributes of CRM
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Personalized Dashboards:
                  </span>{" "}
                  Grant the user a deep-level, personal view of tasks,
                  priorities, and carefully mapped metrics across
                  real-time-competitive levels.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Mobile Access:
                  </span>{" "}
                  Access through a mobile device has turned into an essential
                  means for productivity.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    AI Insights:
                  </span>{" "}
                  CRM insight cycles lead to forecasting and directing correct
                  data at scalable levels using AI logic.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Automation of Tasks:
                  </span>{" "}
                  Sequencing through the workflow to automate post-task
                  activities to leverage resources.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Integration:
                  </span>{" "}
                  The CRM application connects with email applications,
                  e-commerce platforms, or accounting programs.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Implementing a CRM Solution
              </h4>
              <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Set Goals:
                  </span>{" "}
                  Define the reason for purchasing your system, for instance,
                  better customer service, streamlining of sales, or
                  simplification of processes.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Choose a CRM Platform:
                  </span>{" "}
                  Review different CRM solutions until you find one that fits
                  your goals.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Train Your Team:
                  </span>{" "}
                  Help your team become familiar with the software.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Migrating Data:
                  </span>{" "}
                  Get the current customer data into the new CRM with diligence
                  enforced for accuracy and timeliness.
                </li>
                <li>
                  <span className="font-semibold text-lg md:text-xl text-red-500">
                    Monitor and Evaluate:
                  </span>{" "}
                  Define benchmarks to monitor: user adoption, task completion
                  time, and customer response to CRM functions.
                </li>
              </ul>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Embark Your CRM Journey with Jaivik Technology
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Undertaking your CRM journey with{" "}
                <span className="font-semibold">Jaivik Technology</span> will
                carefully encompass the needs of your business. We dedicate
                several forces in creating innovative CRM strategies that
                facilitate broader networking, enhance efficiency, and bring
                about business growth. The team of professionals works together
                with you to seek an understanding of all your specific business
                requirements and to suggest the ideal CRM strategy and tools
                that would inject commerce elixir into your business model.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                <span className="font-semibold">Jaivik Technology</span> is
                considered one of the best software companies in Delhi NCR that
                provides CRM solutions. Tailored exclusively to lift customer
                satisfaction levels, streamline sales channels, and enhance
                productivity, Jaivik Technology's CRM Solutions can be custom-fitted to
                the needs of any buyer. CRM solutions offer 100% flexibility,
                range, and user-friendliness to facilitate easy interaction with
                your existing systems to enable you to cater to your customer
                data management, track today's interactions in your customer
                life, and automate the best possible business process.
              </p>
              <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
                Get into{" "}
                <span className="font-semibold">Jaivik Technology</span> for an
                all-inclusive, customer-generating environment with a huge
                competitive advantage. Allow us to redefine customer engagement
                capabilities and grow your business beyond that level!
              </p>
              <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
                Industry-Specific Benefits
              </h4>
              <p className="text-base md:text-lg font-normal leading-relaxed text-gray-200">
                Additionally,{" "}
                <span className="font-semibold">Jaivik Technology's</span> CRM
                supports industries like manufacturing (for supply chain
                management), hospitality (for guest experience tracking), and
                finance (for client portfolio management). For example, a retail
                business might use our CRM to reduce cart abandonment by{" "}
                <span className="font-semibold">25%</span> through automated
                reminders, while a healthcare provider could cut appointment
                no-shows by <span className="font-semibold">15%</span> with SMS
                notifications. Whatever your sector, our CRM delivers measurable
                results tailored to your unique challenges.
              </p>
            </motion.div>
          )}
        </>
      ),
      images: [
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/gradient-crm-illustration1.avif",
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/flat-design-crm-concept.avif",
      ],
      alts: [
        "Gradient CRM infographic showing different industries",
        "Flat design CRM concept",
      ],
      reverse: true,
    },
  ];

  const sectionRefs = sections.map(() =>
    useInView({ threshold: 0.2, triggerOnce: true })
  );

  // const toggleSection = (sectionId: number) => {
  //   setExpandedSections((prev) => ({
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
  return (
    <ErrorBoundary>
      <div className="font-sans text-gray-100 bg-black min-h-screen relative overflow-hidden">
        <SEOManagement title="Best CRM Software for Business Growth – Jaivik Technology" 
        description="Boost customer relationships with the best CRM software by Jaivik Technology. Streamlined CRM solutions tailored to manage sales, leads, and customer support." 
        keywords="Best CRM software " 
        canonical=""/>
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
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          aria-label="CRM Solutions Hero"
          id="jt-crm-hero"
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
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Transform Your Business with CRM
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg font-normal text-gray-100 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Unlock the power of customer relationships with{" "}
              <span className="font-semibold">Jaivik Technology</span>
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("jt-crm-overview")}
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
              aria-label="Explore CRM Solutions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
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

        {/* Main Content */}
        <div
          className="w-full mx-auto px-4 py-12 md:py-16 relative z-20 bg-black/50"
          id="jt-crm-overview"
        >
          <div className="max-w-8xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                ref={sectionRefs[index][0]}
                className={`flex flex-col ${
                  section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-10 items-center bg-gray-900/20 p-6 md:p-10 rounded-xl shadow-sm mb-12 hover:shadow-md hover:shadow-red-500/20 transition-shadow duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  sectionRefs[index][1]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    sectionRefs[index][1]
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.h2
                    className="text-2xl md:text-3xl font-semibold text-red-500 mb-6 tracking-tight drop-shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {section.title}
                  </motion.h2>

                  {/* Scrollable Text Container */}
                  <div className="relative group">
                    <motion.div
                      className="text-gray-200 leading-relaxed h-[400px] overflow-y-hidden transition-all duration-300 group-hover:overflow-y-auto group-hover:pr-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      {section.content}
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>

                {/* Image container with two images */}
                <motion.div
                  className="w-full lg:w-1/2 flex flex-col gap-6"
                  initial={{ x: section.reverse ? -100 : 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative group overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={section.images[0]}
                      alt={section.alts[0]}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">
                        {section.alts[0]}
                      </span>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={section.images[1]}
                      alt={section.alts[1]}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">
                        {section.alts[1]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            className="text-base md:text-lg mb-12 bg-gray-900/20 p-6 md:p-10 rounded-xl shadow-sm hover:shadow-red-500/20 transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Frequently Asked Questions"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-red-500 mb-6 tracking-tight drop-shadow-sm">
              FAQs About CRM
            </h2>
            <div>
              {[
                {
                  question:
                    "Define CRM and how it is significant for a Business",
                  answer:
                    "CRM stands for Customer Relationship Management. It is a tool used to further manage operations, streamline processes, and increase important customer relationships. It is important for centralizing information, improving customer satisfaction, enhancing team collaboration, and culminating in increased sales and profitability as workflows are automated and useful insights help in decision-making.",
                },
                {
                  question: "Is CRM useful for small businesses?",
                  answer:
                    "Yes, small businesses can benefit from using CRM. It's not just for large corporations. CRMs organize customer data, automate tasks, and personalize communication, leading to streamlined efficiencies, time management, and positive customer experiences without spending too much on resources.",
                },
                {
                  question:
                    "What are the primary features to be looked at in a CRM?",
                  answer:
                    "Key features include contact and lead management, sales pipeline tracking, marketing automation, reporting and analytics, integration with other tools (email, calendars, etc.), and mobile accessibility. These functionalities increase productivity and decision-making.",
                },
                {
                  question: "How can CRM contribute to customer satisfaction?",
                  answer:
                    "CRM provides user data, interaction records, and insight into customer preferences. This allows businesses to deliver personalized services, respond promptly to concerns, and achieve a higher degree of satisfaction and loyalty from the customer.",
                },
                {
                  question: "How difficult is it to implement a CRM?",
                  answer:
                    "The implementation of CRM varies case by case depending on the complexity of the system and the size of the business. However, several CRMs offer interfaces that are easy to use and onboarding support for training and tutorials. Working with a CRM implementation team will simplify the process.",
                },
                {
                  question: "Can CRM integrate with other tools and software?",
                  answer:
                    "Yes, most modern CRM versions easily integrate with lots of other tools and software, mainly emails, project management, e-commerce storefronts, and accounting software. Such integrations facilitate smooth workflows and harmonized data sync between each of your business systems.",
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
                  <summary className="text-base md:text-lg font-semibold text-gray-100 cursor-pointer hover:text-red-400 transition-colors duration-300">
                    {faq.question}
                  </summary>
                  <div className="relative group mt-2">
                    <p className="text-base md:text-lg text-gray-200 max-h-32 overflow-y-hidden transition-all duration-300 group-hover:overflow-y-auto group-hover:pr-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-transparent">
                      {faq.answer}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CRMPage;
