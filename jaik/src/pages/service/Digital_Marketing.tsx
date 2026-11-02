"use client";

import React, { useState } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
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

const DigitalMarketing: React.FC = () => {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Hero section visibility
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const sections: Section[] = [
    {
      title: "Creative Digital Marketing Services to Boost Your Brand",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Digital Marketing refers to the process of marketing products and services through online platforms, which include websites, search engines, social media, email and mobile applications. It has become a component of the business of the current world as individuals now spend the majority of their time online- searching, comparing brands and making purchase decisions. This change in consumerism has seen Online Marketing emerge as one of the best means of business to connect with its audience, earn trust, and nurture its brand.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            In the current new era and age of online business, sheer presence in the digital world enables the business to remain visible and competitive. It could be better ranking of the websites, higher use of the social media or targeted ads, and the digital marketing services enable companies to reach the right people at the right time.
          </p>
          
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Social-Media-Marketing-Introduction.avif",
      alt: "Digital Marketing Overview",
    },
    {
      title: "What Is Digital Marketing?",
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
           <a className="underline text-bold text-blue-500" href="https://www.jaikvik.in/blogs">Digital Marketing </a>  involves all online marketing activities that are applied to market a business online. It consists of different techniques comprising SEO, social media marketing, email marketing, advertising, content development, and web optimization. The idea is to approach the appropriate people, attract them and make them become regular customers.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-gray-300">
            Web Marketing is not similar to traditional marketing in a number of ways. Conventional channels such as newspaper advertisements, flyers, bill boards, and television advertisements will reach out to a general audience but are expensive and not easily quantifiable. Digital Marketing on the other hand is specific and is real-time and enables brands to engage directly with customers.
          </p>
          {expandedSections[1] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-lg leading-relaxed mb-6 text-gray-300">A full-scale online marketing package consists of several elements that include:</p>
              <ul>
                <li>● Search Engine Optimization (SEO).</li>
                <li>● Social Media Marketing (SMM)</li>
                <li>● Content Marketing</li>
                <li>● Pay-Per-Click Advertising (PPC)</li>
                <li>● Email Marketing</li>
                <li>● Website Optimization</li>
              </ul>
              <br />
              <p className="text-lg leading-relaxed mb-6 text-gray-300">
                Any Digital Marketing Company implements the online strategies as they provide the enhanced reach, the increased visibility and the quantifiable performance. The brands will be able to follow the clicks, impressions, engagement, and conversions in real-time and make changes to their strategy at any time.
              </p>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Evolution-of-Digital-Marketing.avif",
      alt: "Evolution of Digital Marketing",
      reverse: true,
    },
    {
      title: "Why Digital Marketing Is Important in Today's Online World",
      content: (
        <>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400">
                Rapid Digital Shift:<br />
              </span>{" "}
              The majority of individuals have to spend hours per day on the Internet.<br />
              Shopping, learning, entertainment all take place on the digital platform.<br />
              Companies have to remain active online in order to access their customers.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Consumer Behaviour Changes:<br />
              </span>{" "}
              Before customers make purchases, they do research.<br />
              They compare prices, review them, and track brands on the Internet.<br />
              Good digital presence is useful in shaping their choices.
            </li>
          </ul>
          {expandedSections[2] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <li>
                <span className="font-semibold text-purple-400">
                  Importance for Small and Large Businesses:<br />
                </span>{" "}
                Marketing is now affordable to small businesses.<br />
                Global presence is achieved through digital approaches by large businesses.<br />
               <a className="text-bold text-blue-500 underline" href="https://www.jaikvik.in/">Digital</a>  Marketing puts everybody on the same growth level.
              </li>
              <br />
              <li>
                <span className="font-semibold text-purple-400">
                  How a Digital Marketing Agency Helps Brands Grow:<br />
                </span>{" "}
                Offers professional offerings such as search engine optimization, social media, paid advertisements, and content.<br />
                Helps businesses reach the appropriate audience.<br />
                Offers are quantified with the help of analytics and reporting.
              </li>
              <br />
              <li>
                <span className="font-semibold text-purple-400">
                  Importance of Having Online Visibility:<br />
                </span>{" "}
                Develops trust and credibility.<br />
                Easy to make customers learn about the brand.<br />
                Assists in long-term business development and interaction with customers.
              </li>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Significance-of-Digital-Marketing.avif",
      alt: "Significance of Digital Marketing",
    },
    {
      title: "Key Components of Digital Marketing",
      content: (
        <>
          <h3 className="font-semibold text-purple-400">
            Search Engine Optimization (SEO)
          </h3>
          <br />
          <h4 className="font-semibold text-purple-400 mb-3">What It Is</h4>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
            <li>Strategy to enhance ranking of the websites on search engines.</li>
          </ul>

          <h4 className="font-semibold text-purple-400 mb-3">Why Businesses Need SEO</h4>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
            <li>The increased visibility implies increased traffic.</li>
            <li>Builds trust with users.</li>
            <li>Enhances the possibility of receiving leads and sales.</li>
          </ul>

          <h4 className="font-semibold text-purple-400 mb-3">Examples</h4>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-8">
            <li>Adding relevant keywords.</li>
            <li>Improving website speed.</li>
            <li>Production of quality material.</li>
          </ul>
          {expandedSections[3] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="font-semibold text-purple-400 mb-4">
                Social Media Marketing (SMM)
              </h3>
              <h4 className="font-semibold text-purple-400 mb-3">How Brands Engage With Audiences</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
                <li>Posting updates, videos, stories, and posts.</li>
                <li>Reaction to messages and comments.</li>
              </ul>

              <h4 className="font-semibold text-purple-400 mb-3">Major Platforms</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
                <li>YouTube</li>
                <li>Twitter</li>
              </ul>

              <h4 className="font-semibold text-purple-400 mb-3">Why Every Digital Marketing Company Focuses on SMM</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-8">
                <li>Helps brands entertain huge masses of people.</li>
                <li>Enhances brand recognition and credibility.</li>
                <li>Enhances sponsored advertisements to achieve quicker outcomes.</li>
              </ul>

              <h3 className="font-semibold text-purple-400 mb-4">
                Pay-per-Click Advertising (PPC)
              </h3>
              <h4 className="text-xl font-medium text-white mb-3">Simple Explanation</h4>
              <p className="text-lg text-gray-300 mb-6">
                The paid advertisements in which companies only pay on clicking.
              </p>

              <h4 className="font-semibold text-purple-400 mb-3">Benefits</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-8">
                <li>Immediate traffic and leads.</li>
                <li>Complete budget and targeting control.</li>
                <li>Easy to track performance.</li>
              </ul>

              <h3 className="font-semibold text-purple-400 mb-4">
                Content Marketing
              </h3>
              <h4 className="font-semibold text-purple-400 mb-3">Importance of High-Quality Content</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
                <li>Trains the customers in terms of products and services.</li>
                <li>Attracts and engages users.</li>
                <li>Builds brand authority.</li>
              </ul>

              <h4 className="font-semibold text-purple-400 mb-3">Role in Digital Marketing Services</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-8">
                <li>Favors SEO, social media, email campaigns and lead generation.</li>
                <li>Helps brands reach their audience in a natural way.</li>
              </ul>

              <h3 className="font-semibold text-purple-400 mb-4">
                Email Marketing
              </h3>
              <h4 className="font-semibold text-purple-400 mb-3">Why It Still Works</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-6">
                <li>Face to face and interpersonal communication.</li>
                <li>Good in terms of updates, offers, reminders.</li>
                <li>Low cost but high impact.</li>
              </ul>

              <h4 className="font-semibold text-purple-400 mb-3">Best Practices</h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2 mb-8">
                <li>Use clear subject lines.</li>
                <li>Be brief and helpful.</li>
                <li>Increase better response by personalizing messages.</li>
              </ul>

              <h3 className="font-semibold text-purple-400 mb-4">
                Website Optimization
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Most web users favor websites that are easy to use.
              </p>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                <li>Produces an effective first impression.</li>
                <li>Improves user experience.</li>
                <li>Helps reduce bounce rates.</li>
              </ul>

              <h4 className="font-semibold text-purple-400 mb-3 mt-6">
                Position with Digital Marketing Agency Performance
              </h4>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                <li>Fullers SEO, advertisements and social media traffic.</li>
                <li>Assist in turning visitors into customers.</li>
                <li>Enhances any marketing campaigns.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image: "",
      alt: "Basics of Digital Marketing",
      reverse: true,
    },
    {
      title: "How Digital Marketing Works: Step-by-Step Explanation",
      content: (
        <>
          <p className="font-semibold text-purple-400 mb-7">
            Understanding the Target Audience
          </p>
          <h3 className="text-xl font-semibold text-purple-400 mb-3">Research and Analysis</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
            <li>Research age, whereabouts, likes and dislikes of customers.</li>
            <li>Determine what customers are searching and what issues they are seeking to address.</li>
            <li>Examine competitor strategies in order to know the market demand.</li>
          </ul>

          <h3 className="font-semibold text-purple-400 mb-3">Creating a Digital Strategy</h3>
          <h4 className="font-semibold text-purple-400 mb-2">Setting Goals</h4>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
            <li>Set specific objectives like increased traffic to the site, generation of leads or brand recognition.</li>
            <li>Make short and long-term decisions better.</li>
          </ul>
          {expandedSections[4] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h4 className="font-semibold text-purple-400 mb-2">Selecting Platforms</h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
                <li>Select the appropriate channels such as Google, Facebook, Instagram, LinkedIn, or YouTube.</li>
                <li>Align your platforms to the online behaviour of the audience.</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-400 mb-3">Implementing Online Tools and Techniques</h3>
              <p className="font-semibold text-purple-400 mb-3">
                Social Media, SEO, Ads, Email etc.
              </p>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
                <li>Optimize the search positioning.</li>
                <li>Post and interact with people on social media.</li>
                <li>Post sponsored advertisements in order to achieve fast exposure and sales.</li>
                <li>Direct communication and updates should be conducted through email marketing.</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-400 mb-3">Tracking Results and Analytics</h3>
              <h4 className="font-semibold text-purple-400 mb-2">Importance of Data</h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
                <li>Information indicates what is going well and what requires to be better.</li>
                <li>Helps get to know the behavior of the user, the source of traffic, and the rate at which they convert.</li>
              </ul>

              <h4 className="font-semibold text-purple-400 mb-2">How a Digital Marketing Agency Uses Analytics</h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
                <li>Real-time campaign monitoring.</li>
                <li>Modifies performance-based strategies.</li>
                <li>Gives reports in detail to assist businesses make better decisions.</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-400 mb-3">Continuous Improvement</h3>
              <h4 className="font-semibold text-purple-400 mb-2">Testing and Optimization</h4>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
                <li>Experiment with content types, keywords and advertisements.</li>
                <li>Enhance web experience and performance.</li>
                <li>New update plans after every few months to fit trends and customer needs.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image: "",
      alt: "Components of Digital Marketing",
    },
    {
      title: "Benefits of Digital Marketing for Businesses",
      content: (
        <>
          <h3 className="font-semibold text-purple-400 mb-6">More Visibility</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 text-gray-300 space-y-2">
            <li>The helping brands are visible on search engines or social media.</li>
            <li>Grow brand awareness and recognition.</li>
          </ul>

          <h3 className="font-semibold text-purple-400 mb-6">Higher Online Reach</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 text-gray-300 space-y-2">
            <li>Bonds business to the international market.</li>
            <li>Accesses customers in any place and at any time.</li>
          </ul>

          <h3 className="font-semibold text-purple-400 mb-6">Affordable Marketing</h3>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 text-gray-300 space-y-2">
            <li>It is less expensive than conventional advertising.</li>
            <li>Has flexible budgets of small and large companies.</li>
          </ul>
          {expandedSections[5] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <h3 className="font-semibold text-purple-400 mb-6">Measurable Results</h3>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 text-gray-300 space-y-2">
                <li>All the clicks, views and conversions are trackable.</li>
                <li>Helps brands be aware of the return on investment (ROI).</li>
              </ul>

              <h3 className="font-semibold text-purple-400 mb-6">Why Hiring a Digital Marketing Company Helps</h3>
              <ul className="list-disc list-inside text-lg leading-relaxed text-gray-300 space-y-2">
                <li>Delivers professional knowledge and technology.</li>
                <li>Saves time and with improved results.</li>
                <li>Develops strategies to grow in the long term.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image: "",
      alt: "Benefits of Digital Marketing for Businesses",
      reverse: true,
    },
    {
      title: "Why Businesses Choose a Digital Marketing Agency in India",
      content: (
        <>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-7 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-purple-400 mb-8">
                Cost-Effective Digital Marketing Services<br />
              </span>{" "}
              Individual agencies provide quality work at low costs.<br />
              Helps save money and at the same time save big business without losing results.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Skilled Professionals<br />
              </span>{" "}
              India boasts of a vast talent base of SEO specialists, content developers, designers, and planners.<br />
              Agencies keep abreast with current trends in the digital domain around the globe.
            </li>
            <li>
              <span className="font-semibold text-purple-400">
                Global Demand<br />
              </span>{" "}
              India has many international brands which outsource their marketing.<br />
              Renowned by quality performance and on-time delivery.
            </li>
          </ul>
          {expandedSections[6] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <li>
                <span className="font-semibold text-purple-400">
                  Digital Ecosystem that Grows Rapidly<br />
                </span>{" "}
                India has been amongst the fastest growing <a className="underline text-blue-500 text-bold" href="https://www.jaikvik.in/blog/digital-marketing-strategies-for-business-growth-in-2026">Digital marketing agency in India</a> .<br />
                High level of technology use and new methods of digital solutions.
              </li>
              <br />
              <h3 className="font-semibold text-purple-400">Subtopics</h3>
              <br />
              <li>
                <span className="font-semibold text-purple-400">
                  Rise of Indian Startups<br />
                </span>{" "}
                The modern tools, platforms and marketing solutions are developed by startups.<br />
                Creative thinking keeps the agencies up to date.
              </li>
              <br />
              <li>
                <span className="font-semibold text-purple-400">
                  Outsourcing Benefits<br />
                </span>{" "}
                Companies enjoy professional services at reduced prices.<br />
                Around the clock support and work models.
              </li>
            </motion.div>
          )}
        </>
      ),
      image: "",
      alt: "Benefits of Digital Marketing",
    },
    {
      title: "How to Choose the Right Digital Marketing Agency",
      content: (
        <>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Things to Look For
            </span>{" "}
            <li>Industry experience</li>
            <li>Clear strategies</li>
            <li>Professional approach</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Portfolio and Experience
            </span>{" "}
            <li>Review previous job and customer work.</li>
            <li>Find agencies that have operated within the same industries.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Services Provided
            </span>{" "}
            <li>SEO, social media, advertisements, branding, content, and others.</li>
            <li>Full <a className="text-blue-500 text-bold underline" href="https://en.wikipedia.org/wiki/Digital_marketing">Digital Marketing</a>  Agency provides full marketing services.</li>
          </ul>
          {expandedSections[7] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">
                  Use of Technology and Tools
                </span>{" "}
                <li>Modern tools must be used by agencies regarding analytics, key word research, and automation.</li>
                <li>Helps enhance precision and performance.</li>
              </ul>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">
                  Transparency and Communication
                </span>{" "}
                <li>There should be regular sharing of reports between agencies.</li>
                <li>Effective communication establishes confidence and mutual relationships.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/Digital-Marketing-Trends.avif",
      alt: "Digital Marketing Trends",
      reverse: true,
    },
    {
      title: "Types of Digital Marketing Services Offered by Agencies",
      content: (
        <>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">SEO Services</span>{" "}
            <li>On-page SEO, link building, technical SEO, keyword research.</li>
            <li>Helps enhance ranking of web sites and organic traffic.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">Website Development</span>{" "}
            <li>Development of user-friendly, fast and responsive websites.</li>
            <li>Facilitates search optimization and user experience.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">Social Media Management</span>{" "}
            <li>Creation of content, content posting, engagement and analytics.</li>
            <li>Helps create brand awareness and credibility.</li>
          </ul>
          {expandedSections[8] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">Paid Ads (Google Ads, Meta Ads)</span>{" "}
                <li>Placing targeted advertisements to achieve fast outcomes.</li>
                <li>Contemplates search adverts, display adverts, and social media adverts.</li>
              </ul>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">Content Creation</span>{" "}
                <li>Blogs, video, graphics, product descriptions and so on.</li>
                <li>Establishes power and aids in SEO.</li>
              </ul>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">Branding and Design</span>{" "}
                <li>Logo design, brand, and packaging and creatives.</li>
                <li>Benefit businesses to be unique in the market.</li>
              </ul>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">What Full-Service Digital Marketing Company Delivers</span>{" "}
                <li>Full package with SEO, advertisement, design, social media, websites, and strategy.</li>
                <li>Time-saving and standardized branding.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image: "",
      alt: "Digital Marketing Strategies",
    },
    {
      title: "Mistakes to Avoid in Digital Marketing",
      content: (
        <>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Ignoring SEO
            </span>{" "}
            <li>Lowers the visibility and organic traffic.</li>
            <li>Makes competition online hard.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Posting Inconsistent Content
            </span>{" "}
            <li>Breaks the engagement of the audience and loses brand reach.</li>
            <li>Impacts the social media performance.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Not Analyzing Results
            </span>{" "}
            <li>Lack of data prevents businesses from responding to strategies.</li>
            <li>Results in time wastage and expenditure.</li>
          </ul>
          {expandedSections[9] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">
                  Choosing the Wrong Platform
                </span>{" "}
                <li>It is ineffective to reach out to the wrong audience.</li>
                <li>Not every platform will fit every business.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/SEO-Techniques.avif",
      alt: "SEO Techniques",
      reverse: true,
    },
    {
      title: "Future of Digital Marketing",
      content: (
        <>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              AI and Automation
            </span>{" "}
            <li>Intelligent advertisements, customer service and content.</li>
            <li>Enhances productivity and less manual labor.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Voice Search
            </span>{" "}
            <li>There are more users of smart speakers and voice assistants.</li>
            <li>Voice query optimization is gaining relevance.</li>
          </ul>
          <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
            <span className="font-semibold text-purple-400">
              Influencer Marketing
            </span>{" "}
            <li>Influencers work with brands because they are trusted and reach easily.</li>
            <li>Lifestyle, fashion and tech brands work best.</li>
          </ul>
          {expandedSections[10] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">
                  Short Video Marketing Trends
                </span>{" "}
                <li>On Reels, YouTube Shorts, and Tik Tok, short videos are increasing at a very fast pace.</li>
                <li>Brands help attract attention in a short time.</li>
              </ul>
              <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
                <span className="font-semibold text-purple-400">
                  Growth of Digital Marketing Services Worldwide
                </span>{" "}
                <li>The global business is moving towards digital-first.</li>
                <li>The demand for digital marketing agencies is increasing.</li>
              </ul>
            </motion.div>
          )}
        </>
      ),
      image:
        "https://jaikvik.in/lab/cloud/jaikvik/assets/images/pages_images/SMM-Strategies.avif",
      alt: "SMM Strategies",
    },
  ];

  // Toggle section expansion
  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
        <SEOManagement title="Top Digital Marketing Agency in India | Digital Marketing Services"
          description="Leading Digital Marketing Agency in India offering expert Digital Marketing Services. A trusted Digital Marketing Company for growth-driven results."
          keywords="Digital marketing agency in india, Digital Marketing, Digital Marketing Agency, Digital Marketing Company, digital marketing services"
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
          id="smm-hero-section"
          aria-label="Digital Marketing Hero"
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
              Elevate Your Brand with Jaivik Technology
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock cutting-edge digital marketing strategies to boost
              visibility, engage audiences, and drive conversions.
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("smm-overview")}
              className="bg-purple-500 text-white px-8 py-2 rounded-full font-semibold hover:bg-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              aria-label="Explore Digital Marketing Solutions"
            >
              Discover Now <FaChevronDown className="ml-2 inline" />
            </motion.button>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="max-w-8xl mx-auto px-6 py-16" id="smm-overview">
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
                <h2 className="text-3xl font-semibold text-purple-400 mb-6">
                  {section.title}
                </h2>
                <div className="text-gray-300">{section.content}</div>
                <button
                  onClick={() => toggleSection(index)}
                  className="mt-6 text-purple-400 font-semibold flex items-center hover:text-purple-300 transition-colors duration-300"
                  aria-label={`Toggle ${section.title} section`}
                >
                  {expandedSections[index] ? "Show Less" : "Read More"}
                  <FaArrowRight
                    className={`ml-2 transition-transform duration-300 ${
                      expandedSections[index] ? "rotate-90" : ""
                    }`}
                  />
                </button>
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

         
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default DigitalMarketing;
