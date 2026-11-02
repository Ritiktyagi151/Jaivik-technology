"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Globe,
  Target,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Play,
} from "lucide-react";
import SEOManagement from "../../components/seo/SEOManagement";

const Portfolio = () => {
  const [activeService, setActiveService] = useState(0);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    growth: 0,
    satisfaction: 0,
  });

  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Digital Strategy & Consulting",
      description:
        "Comprehensive digital transformation strategies tailored to your business goals",
      features: [
        "Market Analysis",
        "Competitor Research",
        "Growth Planning",
        "ROI Optimization",
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Performance Marketing",
      description:
        "Data-driven campaigns that deliver measurable results and sustained growth",
      features: [
        "PPC Management",
        "Social Media Ads",
        "Conversion Optimization",
        "Analytics & Reporting",
      ],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Digital Presence",
      description:
        "Building powerful online presence that connects with your target audience",
      features: [
        "Website Development",
        "SEO Optimization",
        "Content Strategy",
        "Brand Identity",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Engagement",
      description:
        "Creating meaningful connections between your brand and customers",
      features: [
        "Social Media Management",
        "Email Marketing",
        "Community Building",
        "Influencer Partnerships",
      ],
    },
  ];

  const projects = [
    {
      title: "E-Commerce Revolution",
      category: "Digital Transformation",
      description:
        "Transformed a traditional retailer into a digital powerhouse with 300% revenue growth",
      metrics: { growth: "300%", conversion: "4.2%", traffic: "250K" },
      image: "bg-gradient-to-br from-red-600 to-red-800",
    },
    {
      title: "SaaS Scaling Success",
      category: "Performance Marketing",
      description:
        "Scaled a B2B SaaS platform from startup to market leader through strategic campaigns",
      metrics: { growth: "450%", leads: "2.5K", cost: "-60%" },
      image: "bg-gradient-to-br from-red-700 to-black",
    },
    {
      title: "Healthcare Digital Hub",
      category: "Digital Presence",
      description:
        "Created comprehensive digital ecosystem for healthcare provider network",
      metrics: { patients: "15K+", engagement: "85%", bookings: "200%" },
      image: "bg-gradient-to-br from-black to-red-800",
    },
    {
      title: "EdTech Engagement",
      category: "Customer Experience",
      description:
        "Built engaging learning platform that revolutionized online education delivery",
      metrics: { users: "50K+", retention: "92%", completion: "78%" },
      image: "bg-gradient-to-br from-red-500 to-red-900",
    },
  ];

  useEffect(() => {
    const animateCounters = () => {
      const targetValues = {
        projects: 500,
        clients: 150,
        growth: 350,
        satisfaction: 98,
      };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounters({
          projects: Math.floor(targetValues.projects * progress),
          clients: Math.floor(targetValues.clients * progress),
          growth: Math.floor(targetValues.growth * progress),
          satisfaction: Math.floor(targetValues.satisfaction * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targetValues);
        }
      }, increment);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === "stats") {
          animateCounters();
        }
      });
    });

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SEOManagement title="This is the title for portfolio" description="This iss description for the about page" keywords="about us " canonical="/about" />
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent,rgba(239,68,68,0.05),transparent)]"></div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
            <Zap className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-sm text-gray-300">
              Digital Excellence Since 2020
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent leading-tight">
            Jaivik Technology
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
            India Private Limited
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            We utilise our experience and world-class knowledge to help
            businesses reach their full online and digital potential, ensuring
            steady growth through our team of highly dedicated digital marketing
            experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-900 transform hover:scale-105 transition-all duration-300 flex items-center">
              Explore Our Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all duration-300 flex items-center">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                {counters.projects}+
              </div>
              <div className="text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                {counters.clients}+
              </div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {counters.growth}%
              </div>
              <div className="text-gray-400">Avg Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                {counters.satisfaction}%
              </div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-black">
        <div className=" Maximal 7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-3 bg-clip-text text-transparent">
              Our Digital Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive digital solutions that transform businesses and
              drive sustainable growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 border ${
                    activeService === index
                      ? "bg-gradient-to-r from-red-900/50 to-red-800/50 border-red-500/50"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-lg mr-4 ${
                        activeService === index ? "bg-red-600" : "bg-white/10"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  {activeService === index && (
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-red-600/20 to-red-800/20 border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center">
                    {services[activeService].icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gray-400">
                    {services[activeService].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real results for real businesses - see how we've transformed
              digital landscapes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500"
              >
                <div className={`h-48 ${project.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.metrics).map(
                      ([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-bold text-red-400">
                            {value}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {key}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <button className="w-full bg-gradient-to-r from-red-600 to-red-800 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300">
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
