"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import aboutContent from "./aboutContent.json";

// Animation & SEO
import "../../styles/aboutAnimations.css";
import SEOManagement from "../../components/seo/SEOManagement";

// ✅ API Config
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
// Agar leaders ki images backend folder mein hain toh iska use hoga
const MEDIA_BASE = API_BASE.replace('/api', ''); 

// --- Interfaces ---
interface AboutContentData {
  heroSection: any;
  aboutSection: { title: string; content: string[] };
  missionVision: { mission: any; vision: any };
  whyUs: any;
  stats: { title: string; stats: { value: number; label: string }[] };
  whyChooseUs: any;
  promoters: {
    name: string;
    role: string;
    image: string;
    bio: string[];
    companies: string[];
    additionalInfo: string[];
    color: string;
    accent: string;
  }[];
  clients: any;
  cta: any;
}

const About: React.FC = () => {
  const statNumbersRef = useRef<NodeListOf<HTMLElement> | null>(null);
  
  const [backendData, setBackendData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Backend API Fetch with Dynamic URL
  const fetchAboutData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/about?t=${new Date().getTime()}`);
      
      // Checking both possible structures
      const data = res.data.aboutPage || res.data.data?.aboutPage || res.data;
      setBackendData(data);
    } catch (err) {
      console.error("Backend fetch failed, using local fallback:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  // 2️⃣ Merge Logic
  const staticData = aboutContent.aboutPage as AboutContentData;

  const finalData: AboutContentData = {
    ...staticData,
    aboutSection: backendData?.aboutSection || staticData.aboutSection,
    missionVision: backendData?.missionVision || staticData.missionVision,
    stats: backendData?.stats || staticData.stats,
    promoters: backendData?.promoters
      ? backendData.promoters.map((p: any, i: number) => {
          // Check if image is a path or base64/external URL
          const imageUrl = p.image?.startsWith('http') || p.image?.startsWith('data:') 
            ? p.image 
            : `${MEDIA_BASE}${p.image}`;

          return {
            ...staticData.promoters[i], 
            ...p, 
            image: imageUrl,
            color: p.color || staticData.promoters[i]?.color || "from-red-600 to-black",
            accent: p.accent || staticData.promoters[i]?.accent || "red",
            additionalInfo: p.additionalInfo || staticData.promoters[i]?.additionalInfo || [],
          };
        })
      : staticData.promoters,
  };

  // 3️⃣ Animation logic (Stats Counter)
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.getAttribute("data-id") || "0");
          let current = 0;
          const duration = 2000;
          const increment = target / (duration / 20);
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target.toString();
              clearInterval(counter);
            } else {
              el.textContent = Math.ceil(current).toString();
            }
          }, 20);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbersRef.current = document.querySelectorAll("[data-id]");
    statNumbersRef.current?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, [loading, backendData]);

  if (loading) return (
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold tracking-widest animate-pulse">LOADING Jaivik Technology...</p>
    </div>
  );

  return (
    <div className="font-mulish bg-black text-white">
      <SEOManagement 
        title="About Jaivik Technology" 
        description="Learn more about our mission, vision and leadership team." 
        keywords="About Jaivik Technology, Technology Leaders, Mission Vision" 
        canonical="" 
      />
      
      <HeroSection content={finalData.heroSection} />
      <PromotersSection content={finalData.promoters} />
      <AboutSection content={finalData.aboutSection} />
      <MissionVision content={finalData.missionVision} />
      <WhyUsSection content={finalData.whyUs} />
      <StatesSection content={finalData.stats} />
      <WhyChooseUs content={finalData.whyChooseUs} />
      <ClientsSection content={finalData.clients} />
      <CTASection content={finalData.cta} />
    </div>
  );
};

// --- Sub-Components ---

const HeroSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center"
    style={{ backgroundImage: content?.backgroundImage ? `url(${content.backgroundImage})` : 'none' }}>
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative z-10 px-4">
      <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">{content?.title}</h1>
      <p className="text-xl mt-5 text-red-500 font-medium">{content?.subtitle}</p>
    </div>
  </section>
);

const PromotersSection: React.FC<{ content: AboutContentData["promoters"] }> = ({ content }) => (
  <section className="py-20 bg-black overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-4 mb-16 justify-center">
        <div className="h-px bg-gray-800 flex-1 hidden md:block"></div>
        <h2 className="text-4xl md:text-5xl font-black text-white text-center uppercase">Our Leadership</h2>
        <div className="h-px bg-gray-800 flex-1 hidden md:block"></div>
      </div>
      
      <div className="space-y-24">
        {content?.map((promoter, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}>
            <div className="w-full lg:w-1/2">
               <div className={`bg-gradient-to-br ${promoter.color} p-1 rounded-[2.5rem] shadow-2xl`}>
                  <div className="bg-white rounded-[2.3rem] p-8 text-center">
                    <img 
                      src={promoter.image} 
                      alt={promoter.name} 
                      className="w-48 h-48 md:w-72 md:h-72 object-cover rounded-3xl mx-auto mb-6 shadow-xl border-4 border-gray-100" 
                    />
                    <h3 className="text-3xl font-black text-gray-900">{promoter.name}</h3>
                    <p className={`text-xl font-bold bg-gradient-to-r ${promoter.color} bg-clip-text text-transparent`}>{promoter.role}</p>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      {promoter.companies?.map((c, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider">{c}</span>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
            <div className="w-full lg:w-1/2 bg-[#0a0a0a] p-10 rounded-[3rem] border border-gray-900 relative">
               <div className={`absolute top-0 ${index % 2 === 0 ? 'left-10' : 'right-10'} -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-full font-black text-sm`}>EXECUTIVE BIO</div>
               {promoter.bio?.map((p, i) => <p key={i} className="text-gray-300 mb-6 leading-relaxed text-lg">{p}</p>)}
               <div className={`w-24 h-1.5 bg-gradient-to-r ${promoter.color} my-8 rounded-full`}></div>
               <div className="space-y-2">
                 {promoter.additionalInfo?.map((p, i) => <p key={i} className="text-gray-500 text-sm italic flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> {p}</p>)}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Rest of sections remain same but with content check ---
const AboutSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-zinc-900 py-20 text-center border-y border-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-black mb-10 uppercase tracking-widest">{content?.title}</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {content?.content?.map((p: any, i: number) => <p key={i} className="text-xl text-gray-300 leading-relaxed">{p}</p>)}
      </div>
    </div>
  </section>
);

const MissionVision: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-black py-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center gap-10">
      <div className="bg-zinc-900 p-12 rounded-[2rem] max-w-md border border-gray-800 hover:border-red-600 transition-colors group">
        <h3 className="text-3xl font-black text-red-600 mb-6 uppercase group-hover:tracking-widest transition-all">{content?.mission?.title}</h3>
        <p className="text-gray-300 leading-loose">{content?.mission?.content}</p>
      </div>
      <div className="bg-zinc-900 p-12 rounded-[2rem] max-w-md border border-gray-800 hover:border-blue-600 transition-colors group">
        <h3 className="text-3xl font-black text-blue-600 mb-6 uppercase group-hover:tracking-widest transition-all">{content?.vision?.title}</h3>
        <p className="text-gray-300 leading-loose">{content?.vision?.content}</p>
      </div>
    </div>
  </section>
);

const StatesSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-zinc-900 py-20 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-black mb-16 uppercase">{content?.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {content?.stats?.map((s: any, i: number) => (
          <div key={i} className="bg-black p-10 rounded-[2rem] border border-gray-800">
            <div className="text-5xl font-black text-red-600 mb-4" data-id={s.value}>0</div>
            <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ... (Baaki Sections WhyUs, WhyChooseUs, Clients, CTA unchanged lekin dynamic props ke saath)

const WhyUsSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-black py-20">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
      <div className="w-full lg:w-1/3 h-[450px] bg-cover rounded-[3rem] border-4 border-zinc-800 shadow-2xl" style={{ backgroundImage: `url(${content?.image})` }}></div>
      <div className="w-full lg:w-2/3">
        <h2 className="text-4xl font-black mb-10 uppercase">{content?.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content?.services?.map((s: any, i: number) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-2xl border-l-8 border-red-600 hover:bg-zinc-800 transition-all">
              <h3 className="text-xl font-black text-red-600 mb-3 uppercase tracking-tighter">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const WhyChooseUs: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-zinc-900 py-20 border-y border-gray-800">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
      <div className="w-full lg:w-1/2">
        <h2 className="text-4xl font-black mb-12 uppercase">{content?.title}</h2>
        {content?.points?.map((p: any, i: number) => (
          <div key={i} className="mb-10 group">
            <div className="flex justify-between mb-2">
               <h3 className="font-black text-white uppercase tracking-tighter">{p.title}</h3>
               <span className="text-red-600 font-black">{p.value}%</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{p.description}</p>
            <div className="bg-black h-3 rounded-full overflow-hidden p-0.5 border border-gray-800">
               <div className="bg-red-600 h-full rounded-full transition-all duration-1000" style={{ width: `${p.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-1/2 h-[500px] bg-cover rounded-[3rem] shadow-2xl border-4 border-black" style={{ backgroundImage: `url(${content?.image})` }}></div>
    </div>
  </section>
);

const ClientsSection: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-black py-20 text-center">
    <h2 className="text-3xl font-black mb-16 uppercase tracking-[0.3em] text-gray-500">{content?.title}</h2>
    <div className="flex flex-wrap justify-center gap-10 opacity-60 hover:opacity-100 transition-opacity">
      {content?.logos?.map((c: any, i: number) => (
        <div key={i} className="bg-white/5 p-6 rounded-2xl w-40 h-28 flex items-center justify-center transition-all border border-transparent hover:border-gray-800">
          <img src={c.logo} alt={c.name} className="max-h-14 object-contain" />
        </div>
      ))}
    </div>
  </section>
);

const CTASection: React.FC<{ content: any }> = ({ content }) => (
  <section className="bg-red-600 py-24 text-center relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex items-center justify-center">
        <h1 className="text-[20rem] font-black text-black select-none">Jaivik Technology</h1>
    </div>
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-black mb-10 uppercase italic">{content?.title}</h2>
      <Link href={content?.button?.link || "#"} className="bg-black text-white py-5 px-14 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">
        {content?.button?.text}
      </Link>
    </div>
  </section>
);

export default About;