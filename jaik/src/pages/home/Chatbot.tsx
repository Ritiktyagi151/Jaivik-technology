"use client";

import * as React from "react";
import { useMemo, useState, useRef, useEffect } from "react";
import { sendExternalLead } from "@/lib/externalLead";

// ─── Types ───────────────────────────────────────────────────────────────────

type Sender = "assistant" | "user";
type Lang = "en" | "hi" | "hg"; // english | hindi | hinglish

type Message = {
  id: string;
  sender: Sender;
  text: string;
};

type MenuOption = {
  id: string;
  label: string;
  emoji: string;
};

type ScreenKey = "home" | "software" | "website" | "marketing" | "seo" | "film" | "contact";

type LeadFormData = {
  name: string;
  phone: string;
  location: string;
  email: string;
  service: string;
  message: string;
};

// ─── Constants ───────────────────────────────────────────────────────────────

const PHONE_NUMBER = "918874882735";
const EMAIL_ADDRESS = "";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ─── Language Detection ───────────────────────────────────────────────────────

const HINDI_SCRIPT = /[\u0900-\u097F]/;
const HINGLISH_WORDS =
  /\b(haan|nahi|kya|kaise|kitna|kab|kar|karo|karein|chahiye|batao|bata|dedo|denge|milega|accha|acha|tha|thi|the|hai|hain|hum|aap|mujhe|mera|apna|wala|wali|bahut|bilkul|zaroor|sahi|madad|seedha|abhi|phir|aur|lekin|toh|par|pe|se|ko|ka|ki|ke|ek|do|teen|website|software|app|price|contact)\b/i;

const detectLang = (text: string): Lang => {
  if (HINDI_SCRIPT.test(text)) return "hi";
  if (HINGLISH_WORDS.test(text)) return "hg";
  return "en";
};

// ─── All UI text in 3 languages ──────────────────────────────────────────────

const T = {
  // Welcome
  welcome: {
    en: "Hello! 👋 Welcome to *Jaivik Technology*.\n\nHow can we help you today?\nPlease choose an option below:",
    hi: "Namaste! 🙏 *Jaivik Technology* mein aapka swagat hai.\n\nAap kaise help chahte hain?\nNeeche se ek option choose karein:",
    hg: "Hello! 👋 *Jaivik Technology* mein aapka swagat hai.\n\nAapko kaise help kar sakte hain?\nNeeche se ek option choose karein:",
  },

  // Screen titles
  software_title: { en: "💻 *Software Development*\n\nWhat would you like us to build?", hi: "💻 *Software Development*\n\nHum aapke liye kya banayein?", hg: "💻 *Software Development*\n\nHum aapke liye kya bana sakte hain?" },
  website_title:  { en: "🌐 *Website Development*\n\nWhat type of website do you need?", hi: "🌐 *Website Development*\n\nAapko kaunsi website chahiye?", hg: "🌐 *Website Development*\n\nKaunsi type ki website chahiye aapko?" },
  marketing_title:{ en: "📣 *Digital Marketing*\n\nWhich service are you interested in?", hi: "📣 *Digital Marketing*\n\nKis service mein aapki dilchaspi hai?", hg: "📣 *Digital Marketing*\n\nKis platform ya service mein interested hain?" },
  seo_title:      { en: "🔍 *Google SEO Services*\n\nWhat does your website need?", hi: "🔍 *Google SEO Services*\n\nAapki website ke liye kya chahiye?", hg: "🔍 *Google SEO Services*\n\nAapki website ke liye kya chahiye?" },
  film_title:     { en: "🎬 *Film Production*\n\nWhat type of video do you need?", hi: "🎬 *Film Production*\n\nAapko kaunsa video chahiye?", hg: "🎬 *Film Production*\n\nKaunsi type ka video chahiye aapko?" },
  contact_title:  {
    en: "📋 *Get a Quote*\n\nShare your details and our team will connect with you within 24 hours! 🙏",
    hi: "📋 *Quote Lein*\n\nApni details share karein, hamare team 24 ghante mein sampark karega! 🙏",
    hg: "📋 *Quote / Contact*\n\nApni details share karein, hamare team 24 ghante mein aapse connect karega! 🙏",
  },

  // Option labels (menu buttons — always in English as labels but bot text switches)
  opt_contact: { en: "Get a Quote", hi: "Quote Lein", hg: "Quote lena hai" },
  opt_home:    { en: "🏠 Go to Main Menu", hi: "🏠 Main Menu par jaayein", hg: "🏠 Main Menu pe jaayein" },
  opt_back:    { en: "⬅️ Go Back", hi: "⬅️ Wapas", hg: "⬅️ Wapas Jaayein" },

  // Sub-info CTA
  cta_form:    { en: "📋 Fill Form — Get Free Quote", hi: "📋 Form Bharein — Free Quote Lein", hg: "📋 Form Fill Karein — Free Quote Lein" },
  cta_home:    { en: "Go to Main Menu", hi: "Main Menu par jaayein", hg: "Main Menu pe jaayein" },

  // Form labels
  form_title:       { en: "Your Details", hi: "Apni Jaankari Bharein", hg: "Apni Details Bharein" },
  form_name:        { en: "Your full name *", hi: "Aapka poora naam *", hg: "Aapka naam *" },
  form_phone:       { en: "WhatsApp / Phone number *", hi: "WhatsApp / Phone number *", hg: "WhatsApp / Phone number *" },
  form_location:    { en: "City & State (e.g. Delhi, UP) *", hi: "Sheher aur Rajya (jaise Delhi, UP) *", hg: "City & State (e.g. Delhi, UP) *" },
  form_email:       { en: "Email address *", hi: "Email address *", hg: "Email address *" },
  form_service:     { en: "Select service *", hi: "Service chunein *", hg: "Service select karein *" },
  form_message:     { en: "Tell us about your project *", hi: "Apne project ke baare mein batayein *", hg: "Apne project ke baare mein batayein *" },
  form_cancel:      { en: "Cancel", hi: "Radd Karein", hg: "Cancel" },
  form_submit:      { en: "Submit", hi: "Bhejein", hg: "Submit Karein" },
  form_submitting:  { en: "Submitting…", hi: "Bhej raha hoon…", hg: "Bhej raha hoon…" },
  form_phone_error: { en: "Please enter a valid phone number.", hi: "Sahi phone number darj karein.", hg: "Valid phone number enter karein." },
  form_api_error:   { en: "Form service is unavailable right now.", hi: "Form service abhi uplabdh nahi hai.", hg: "Form service abhi available nahi hai." },
  form_generic_error:{ en: "Something went wrong. Please try again.", hi: "Kuch galat hua. Dobara koshish karein.", hg: "Kuch galat hua. Dobara try karein." },

  // Success message after submit
  submit_success: {
    en: "✅ *Thank you!*\n\nWe have received your details.\nOur team will contact you via WhatsApp or call within 24 hours. 🙏",
    hi: "✅ *Shukriya!*\n\nAapki details hamare team ko mil gayi hain.\n24 ghante mein WhatsApp ya call pe sampark karenge. 🙏",
    hg: "✅ *Shukriya!*\n\nAapki details hamare team ko mil gayi hain.\n24 ghante ke andar aapse WhatsApp ya call pe connect karenge. 🙏",
  },

  // Nav user messages
  nav_back: { en: "⬅️ Back", hi: "⬅️ Wapas", hg: "⬅️ Wapas" },
  nav_home: { en: "🏠 Main Menu", hi: "🏠 Main Menu", hg: "🏠 Main Menu" },
  nav_form: { en: "📋 Fill the Form", hi: "📋 Form Bharein", hg: "📋 Form Fill Karna Hai" },

  // Footer
  footer_label: { en: "Contact directly:", hi: "Seedha sampark karein:", hg: "Direct sampark:" },

  // Header subtitle per screen
  header_home:      { en: "Smart Digital Assistant", hi: "Digital Sahayak", hg: "Smart Digital Assistant" },
  header_software:  { en: "Software Development", hi: "Software Development", hg: "Software Development" },
  header_website:   { en: "Website Development", hi: "Website Development", hg: "Website Development" },
  header_marketing: { en: "Digital Marketing", hi: "Digital Marketing", hg: "Digital Marketing" },
  header_seo:       { en: "SEO Services", hi: "SEO Services", hg: "SEO Services" },
  header_film:      { en: "Film Production", hi: "Film Production", hg: "Film Production" },
  header_contact:   { en: "Get a Quote", hi: "Quote Lein", hg: "Quote Lein" },
};

// ─── Sub-option info cards ────────────────────────────────────────────────────

type SubInfo = { service: string; text: Record<Lang, string> };

const SUB_INFO: Record<string, SubInfo> = {
  sub_sw_webapp: {
    service: "Software Development",
    text: {
      en: "🖥️ *Web Application*\n\nWe build scalable SaaS products and portals using React, Next.js, Node.js, and Python.\n\nShare your project and get a *free quote*!",
      hi: "🖥️ *Web Application*\n\nHum React, Next.js, Node.js, Python se scalable SaaS products aur portals banate hain.\n\nApna project batayein aur *free quote* lein!",
      hg: "🖥️ *Web Application*\n\nHum React, Next.js, Node.js, Python se scalable SaaS products aur portals banate hain.\n\nApne project ke baare mein bata kar *free quote* le sakte hain!",
    },
  },
  sub_sw_mobile: {
    service: "Software Development",
    text: {
      en: "📱 *Mobile App*\n\nWe build Android, iOS, and cross-platform apps using Flutter.\n\nShare your app idea — we'll give you a quote!",
      hi: "📱 *Mobile App*\n\nAndroid, iOS aur cross-platform apps Flutter se banate hain.\n\nApna app idea share karein — hum quote denge!",
      hg: "📱 *Mobile App*\n\nAndroid, iOS aur cross-platform apps Flutter se banate hain.\n\nApna app idea share karein — hum quote denge!",
    },
  },
  sub_sw_api: {
    service: "Software Development",
    text: {
      en: "⚙️ *API / Backend*\n\nREST APIs, GraphQL, microservices — we handle it all.\n\nShare your requirements!",
      hi: "⚙️ *API / Backend*\n\nREST APIs, GraphQL, microservices — sab sambhalte hain.\n\nApni zarooraten share karein!",
      hg: "⚙️ *API / Backend*\n\nREST APIs, GraphQL, microservices — sab handle karte hain.\n\nRequirements share karein!",
    },
  },
  sub_sw_crm: {
    service: "Software Development",
    text: {
      en: "📊 *CRM / ERP / Dashboard*\n\nCustom business tools that automate your workflow.\n\nTell us your requirements!",
      hi: "📊 *CRM / ERP / Dashboard*\n\nCustom business tools jo aapka kaam automate karein.\n\nApni zaroorat batayein!",
      hg: "📊 *CRM / ERP / Dashboard*\n\nCustom business tools jo aapke kaam ko automate karein.\n\nApni zaroorat batayein!",
    },
  },
  sub_web_business: {
    service: "Website Development",
    text: {
      en: "🏢 *Business Website*\n\nFully responsive, SEO-ready, and fast-loading professional websites.\n\nShare your project details!",
      hi: "🏢 *Business Website*\n\nFully responsive, SEO-ready aur fast-loading professional website.\n\nProject details share karein!",
      hg: "🏢 *Business Website*\n\nFully responsive, SEO-ready aur fast-loading professional website.\n\nProject details share karein!",
    },
  },
  sub_web_ecom: {
    service: "Website Development",
    text: {
      en: "🛒 *E-Commerce Store*\n\nShopify, WooCommerce, or custom — complete online store setup.\n\nTell us your requirements!",
      hi: "🛒 *E-Commerce Store*\n\nShopify, WooCommerce ya custom — complete online store setup.\n\nApni zaroorat batayein!",
      hg: "🛒 *E-Commerce Store*\n\nShopify, WooCommerce ya custom — complete online store setup.\n\nApni requirements batayein!",
    },
  },
  sub_web_landing: {
    service: "Website Development",
    text: {
      en: "📄 *Landing Page*\n\nHigh-converting, beautifully designed landing pages.\n\nTell us about your project and get a quote!",
      hi: "📄 *Landing Page*\n\nHigh-converting aur sundar landing pages.\n\nProject ke baare mein batayein aur quote lein!",
      hg: "📄 *Landing Page*\n\nHigh-converting, beautifully designed landing pages.\n\nProject ke baare mein bata kar quote lein!",
    },
  },
  sub_web_portfolio: {
    service: "Website Development",
    text: {
      en: "🎨 *Portfolio Site*\n\nA unique design to showcase your personality and work.\n\nShare your details!",
      hi: "🎨 *Portfolio Site*\n\nAapki personality aur kaam dikhane ke liye unique design.\n\nDetails share karein!",
      hg: "🎨 *Portfolio Site*\n\nAapki personality aur kaam ko showcase karne ke liye unique design.\n\nDetails share karein!",
    },
  },
  sub_mkt_social: {
    service: "Digital Marketing",
    text: {
      en: "📱 *Social Media Management*\n\nInstagram, Facebook, LinkedIn, YouTube — regular posts, stories, and engagement.\n\nTell us your goal!",
      hi: "📱 *Social Media Management*\n\nInstagram, Facebook, LinkedIn, YouTube — niyamit posts, stories aur engagement.\n\nApna lakshya batayein!",
      hg: "📱 *Social Media Management*\n\nInstagram, Facebook, LinkedIn, YouTube — regular posts, stories aur engagement.\n\nApna goal batayein!",
    },
  },
  sub_mkt_ads: {
    service: "Digital Marketing",
    text: {
      en: "💰 *Paid Advertising*\n\nWe run targeted campaigns via Meta Ads and Google Ads.\n\nShare your budget and goal!",
      hi: "💰 *Paid Advertising*\n\nMeta Ads aur Google Ads se targeted campaigns chalate hain.\n\nBudget aur lakshya share karein!",
      hg: "💰 *Paid Advertising*\n\nMeta Ads aur Google Ads se targeted campaigns run karte hain.\n\nBudget aur goal share karein!",
    },
  },
  sub_mkt_content: {
    service: "Digital Marketing",
    text: {
      en: "✍️ *Content & Branding*\n\nGraphics, copywriting, brand identity — all in one place.\n\nTell us about your brand!",
      hi: "✍️ *Content & Branding*\n\nGraphics, copywriting, brand identity — sab ek jagah.\n\nApne brand ke baare mein batayein!",
      hg: "✍️ *Content & Branding*\n\nGraphics, copywriting, brand identity — sab ek jagah.\n\nBrand ke baare mein batayein!",
    },
  },
  sub_mkt_influencer: {
    service: "Digital Marketing",
    text: {
      en: "🌟 *Influencer Marketing*\n\nWe connect your brand with the right influencers.\n\nShare your campaign idea!",
      hi: "🌟 *Influencer Marketing*\n\nSahi influencers se aapke brand ko promote karwate hain.\n\nCampaign idea share karein!",
      hg: "🌟 *Influencer Marketing*\n\nSahi influencers se aapke brand ko promote karwate hain.\n\nCampaign idea share karein!",
    },
  },
  sub_seo_audit: {
    service: "Google SEO Services",
    text: {
      en: "📋 *SEO Audit*\n\nA complete SEO health check and action plan for your website.\n\nShare your website URL!",
      hi: "📋 *SEO Audit*\n\nAapki website ki poori SEO health check aur action plan.\n\nWebsite URL share karein!",
      hg: "📋 *SEO Audit*\n\nAapki website ki complete SEO health check aur action plan.\n\nWebsite URL share karein!",
    },
  },
  sub_seo_onpage: {
    service: "Google SEO Services",
    text: {
      en: "📝 *On-Page SEO*\n\nKeywords, meta tags, content optimization — we cover it all.\n\nShare your details!",
      hi: "📝 *On-Page SEO*\n\nKeywords, meta tags, content optimization — sab cover karte hain.\n\nDetails batayein!",
      hg: "📝 *On-Page SEO*\n\nKeywords, meta tags, content optimization — sab cover karte hain.\n\nDetails batayein!",
    },
  },
  sub_seo_offpage: {
    service: "Google SEO Services",
    text: {
      en: "🔗 *Off-Page SEO*\n\nHigh-quality backlinks to grow your domain authority.\n\nShare your website!",
      hi: "🔗 *Off-Page SEO*\n\nHigh-quality backlinks se domain authority badhate hain.\n\nApni website share karein!",
      hg: "🔗 *Off-Page SEO*\n\nHigh-quality backlinks se domain authority badhate hain.\n\nApni website share karein!",
    },
  },
  sub_seo_local: {
    service: "Google SEO Services",
    text: {
      en: "📍 *Local SEO*\n\nOptimize your Google My Business to reach local customers.\n\nTell us your city and business type!",
      hi: "📍 *Local SEO*\n\nGoogle My Business optimize karke local customers tak pahunchein.\n\nSheher aur business type batayein!",
      hg: "📍 *Local SEO*\n\nGoogle My Business optimize karke local customers tak pahunchein.\n\nCity aur business type batayein!",
    },
  },
  sub_film_corporate: {
    service: "Film Production",
    text: {
      en: "🎥 *Corporate Film*\n\nA professional brand story or company overview video.\n\nShare your vision!",
      hi: "🎥 *Corporate Film*\n\nProfessional brand story ya company overview video.\n\nApna vision share karein!",
      hg: "🎥 *Corporate Film*\n\nProfessional brand story ya company overview video.\n\nVision share karein!",
    },
  },
  sub_film_ad: {
    service: "Film Production",
    text: {
      en: "📺 *Ad Film / TVC*\n\nFull production from creative script to final edit.\n\nShare your idea!",
      hi: "📺 *Ad Film / TVC*\n\nCreative script se final edit tak poori production.\n\nApna idea share karein!",
      hg: "📺 *Ad Film / TVC*\n\nCreative script se final edit tak poori production.\n\nIdea share karein!",
    },
  },
  sub_film_reels: {
    service: "Film Production",
    text: {
      en: "▶️ *Reels / YouTube*\n\nEngaging short-form and long-form video content.\n\nTell us about your channel or campaign!",
      hi: "▶️ *Reels / YouTube*\n\nEngaging short-form aur long-form video content.\n\nChannel ya campaign ke baare mein batayein!",
      hg: "▶️ *Reels / YouTube*\n\nEngaging short-form aur long-form video content.\n\nChannel ya campaign ke baare mein bata dein!",
    },
  },
  sub_film_product: {
    service: "Film Production",
    text: {
      en: "📸 *Product Shoot*\n\nProfessional photography and videography for your products.\n\nShare your product details!",
      hi: "📸 *Product Shoot*\n\nApne products ke liye professional photography aur videography.\n\nProduct details share karein!",
      hg: "📸 *Product Shoot*\n\nProfessional photography aur videography apne products ke liye.\n\nProduct details share karein!",
    },
  },
};

// ─── Menu options per screen (labels are fixed English — professional look) ───

const SCREEN_OPTIONS: Record<ScreenKey, MenuOption[]> = {
  home: [
    { id: "software",  label: "Software Development",   emoji: "💻" },
    { id: "website",   label: "Website Development",    emoji: "🌐" },
    { id: "marketing", label: "Digital Marketing",      emoji: "📣" },
    { id: "seo",       label: "Google SEO Services",    emoji: "🔍" },
    { id: "film",      label: "Film Production",        emoji: "🎬" },
    { id: "contact",   label: "Contact / Get a Quote",  emoji: "📋" },
  ],
  software: [
    { id: "sub_sw_webapp", label: "Web Application (SaaS / Portal)", emoji: "🖥️" },
    { id: "sub_sw_mobile", label: "Mobile App (Android / iOS)",      emoji: "📱" },
    { id: "sub_sw_api",    label: "API / Backend Development",       emoji: "⚙️" },
    { id: "sub_sw_crm",    label: "CRM / ERP / Dashboard",           emoji: "📊" },
    { id: "contact",       label: "Get a Quote",                     emoji: "📋" },
  ],
  website: [
    { id: "sub_web_business",  label: "Business / Corporate Website", emoji: "🏢" },
    { id: "sub_web_ecom",      label: "E-Commerce Store",             emoji: "🛒" },
    { id: "sub_web_landing",   label: "Landing Page",                 emoji: "📄" },
    { id: "sub_web_portfolio", label: "Portfolio / Personal Site",    emoji: "🎨" },
    { id: "contact",           label: "Get a Quote",                  emoji: "📋" },
  ],
  marketing: [
    { id: "sub_mkt_social",     label: "Social Media Management",    emoji: "📱" },
    { id: "sub_mkt_ads",        label: "Paid Ads (Meta / Google)",   emoji: "💰" },
    { id: "sub_mkt_content",    label: "Content Creation & Branding",emoji: "✍️" },
    { id: "sub_mkt_influencer", label: "Influencer Marketing",       emoji: "🌟" },
    { id: "contact",            label: "Get a Quote",                emoji: "📋" },
  ],
  seo: [
    { id: "sub_seo_audit",   label: "SEO Audit & Strategy",          emoji: "📋" },
    { id: "sub_seo_onpage",  label: "On-Page SEO",                   emoji: "📝" },
    { id: "sub_seo_offpage", label: "Off-Page SEO / Link Building",  emoji: "🔗" },
    { id: "sub_seo_local",   label: "Local SEO / Google My Business",emoji: "📍" },
    { id: "contact",         label: "Get a Quote",                   emoji: "📋" },
  ],
  film: [
    { id: "sub_film_corporate", label: "Corporate Film / Brand Video",    emoji: "🎥" },
    { id: "sub_film_ad",        label: "Ad Film / TVC",                   emoji: "📺" },
    { id: "sub_film_reels",     label: "Reels / Shorts / YouTube",        emoji: "▶️" },
    { id: "sub_film_product",   label: "Product Shoot / Photography",     emoji: "📸" },
    { id: "contact",            label: "Get a Quote",                     emoji: "📋" },
  ],
  contact: [],
};

// ─── Screen bot text (language-aware) ────────────────────────────────────────

const getScreenText = (screen: ScreenKey, lang: Lang): string => {
  const map: Record<ScreenKey, keyof typeof T> = {
    home:      "welcome",
    software:  "software_title",
    website:   "website_title",
    marketing: "marketing_title",
    seo:       "seo_title",
    film:      "film_title",
    contact:   "contact_title",
  };
  return (T[map[screen]] as Record<Lang, string>)[lang];
};

const getHeaderTitle = (screen: ScreenKey, lang: Lang): string => {
  const map: Record<ScreenKey, keyof typeof T> = {
    home:      "header_home",
    software:  "header_software",
    website:   "header_website",
    marketing: "header_marketing",
    seo:       "header_seo",
    film:      "header_film",
    contact:   "header_contact",
  };
  return (T[map[screen]] as Record<Lang, string>)[lang];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-orange-400 focus:outline-none transition";

const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/\*([^*]+)\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="font-semibold text-white">{part}</strong>
        : <React.Fragment key={i}>{part}</React.Fragment>
    )}
  </>
);

const t = <K extends keyof typeof T>(key: K, lang: Lang): string =>
  (T[key] as Record<Lang, string>)[lang];

// ─── Component ───────────────────────────────────────────────────────────────

const Chatbot: React.FC = () => {
  const [isOpen,         setIsOpen]         = useState(false);
  const [messages,       setMessages]       = useState<Message[]>([]);
  const [lang,           setLang]           = useState<Lang>("en");
  const [currentScreen,  setCurrentScreen]  = useState<ScreenKey>("home");
  const [screenHistory,  setScreenHistory]  = useState<ScreenKey[]>([]);
  const [viewMode,       setViewMode]       = useState<"menu" | "sub_info" | "form">("menu");
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [submitStatus,   setSubmitStatus]   = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [leadForm,       setLeadForm]       = useState<LeadFormData>({
    name: "", phone: "", location: "", email: "", service: "", message: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // On first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMsg(t("welcome", lang));
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, viewMode]);

  const whatsappLink = useMemo(
    () => `"Hello! I'm interested in your services.")}`,
    []
  );

  // ── Message helpers ────────────────────────────────────────────────────────

  const addBotMsg = (text: string) =>
    setMessages((p) => [...p, { id: `b-${Date.now()}-${Math.random()}`, sender: "assistant", text }]);

  const addUserMsg = (text: string) =>
    setMessages((p) => [...p, { id: `u-${Date.now()}-${Math.random()}`, sender: "user", text }]);

  // ── Detect language from typed input ──────────────────────────────────────

  const handleTypedInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = (form.elements.namedItem("chat_input") as HTMLInputElement)?.value?.trim();
    if (!input) return;
    const detected = detectLang(input);
    setLang(detected);
    addUserMsg(input);
    // Guide user back to menu
    addBotMsg(getScreenText(currentScreen, detected));
    form.reset();
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const navigateTo = (targetId: string, userLabel: string) => {
    addUserMsg(userLabel);
    const subInfo = SUB_INFO[targetId];
    if (subInfo) {
      addBotMsg(subInfo.text[lang]);
      setLeadForm((f) => ({ ...f, service: subInfo.service }));
      setScreenHistory((h) => [...h, currentScreen]);
      setCurrentScreen("contact");
      setViewMode("sub_info");
      return;
    }
    const screen = targetId as ScreenKey;
    setScreenHistory((h) => [...h, currentScreen]);
    setCurrentScreen(screen);
    addBotMsg(getScreenText(screen, lang));
    setViewMode(screen === "contact" ? "sub_info" : "menu");
  };

  const goBack = () => {
    const hist = [...screenHistory];
    const prev = hist.pop() ?? "home";
    setScreenHistory(hist);
    setCurrentScreen(prev);
    setViewMode("menu");
    addUserMsg(t("nav_back", lang));
    addBotMsg(getScreenText(prev, lang));
  };

  const goHome = () => {
    setCurrentScreen("home");
    setScreenHistory([]);
    setViewMode("menu");
    addUserMsg(t("nav_home", lang));
    addBotMsg(getScreenText("home", lang));
  };

  const openForm = () => {
    addUserMsg(t("nav_form", lang));
    setViewMode("form");
  };

  // ── Form ───────────────────────────────────────────────────────────────────

  const handleLeadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLeadForm((p) => ({ ...p, [name]: value }));
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\+?[\d\s\-]{7,15}$/.test(leadForm.phone)) {
      setSubmitStatus({ type: "error", text: t("form_phone_error", lang) });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      if (!API_BASE) throw new Error(t("form_api_error", lang));
      const payload = {
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        location: leadForm.location,
        subject: leadForm.service || "Chatbot Enquiry",
        message: leadForm.message,
        preferredDate: new Date().toISOString().split("T")[0],
        preferredTime: "12:00",
        sourcePage: "website-chatbot",
      };

      sendExternalLead({
        formName: "chatbot-lead-form",
        ...payload,
      });

      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || t("form_generic_error", lang));
      addBotMsg(t("submit_success", lang));
      setLeadForm({ name: "", phone: "", location: "", email: "", service: "", message: "" });
      setSubmitStatus(null);
      setCurrentScreen("home");
      setScreenHistory([]);
      setViewMode("menu");
    } catch (err) {
      setSubmitStatus({ type: "error", text: err instanceof Error ? err.message : t("form_generic_error", lang) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canGoBack = screenHistory.length > 0;
  const currentOptions = SCREEN_OPTIONS[currentScreen] ?? [];

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-32 right-4 z-[9999] flex h-[78vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[28px] border border-white/15 bg-[#0b1120] text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:right-6 md:w-[400px]">

          {/* ── Header ── */}
          <div className="bg-gradient-to-r from-[#f97316] via-[#ef4444] to-[#1d4ed8] px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {canGoBack && (
                  <button type="button" onClick={goBack}
                    className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30"
                    aria-label="Back">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Jaivik Technology</p>
                  <h3 className="mt-0.5 text-sm font-semibold leading-tight">
                    {getHeaderTitle(currentScreen, lang)}
                  </h3>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25" aria-label="Close">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages + Options ── */}
          <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,#172554_0%,#0b1120_58%,#050816_100%)] px-4 py-4 space-y-3">

            {messages.map((msg) => (
              <div key={msg.id}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  msg.sender === "assistant"
                    ? "bg-white/10 text-white/90"
                    : "ml-auto bg-[#f97316] text-white"
                }`}
                style={{ whiteSpace: "pre-line" }}>
                {msg.sender === "assistant" ? <RichText text={msg.text} /> : msg.text}
              </div>
            ))}

            {/* ── Menu options ── */}
            {viewMode === "menu" && currentOptions.length > 0 && (
              <div className="space-y-2 pt-1">
                {currentOptions.map((opt) => (
                  <button key={opt.id} type="button"
                    onClick={() => navigateTo(opt.id, `${opt.emoji} ${opt.label}`)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white transition hover:bg-white/12 hover:border-orange-400/40 active:scale-[0.98]">
                    <span className="text-lg leading-none">{opt.emoji}</span>
                    <span className="flex-1 font-medium">{opt.label}</span>
                    <svg className="h-4 w-4 flex-shrink-0 text-white/35" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
                {currentScreen !== "home" && (
                  <button type="button" onClick={goHome}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/3 px-4 py-2.5 text-xs text-white/45 transition hover:bg-white/8 mt-1">
                    {t("opt_home", lang)}
                  </button>
                )}
              </div>
            )}

            {/* ── After sub-info or contact ── */}
            {viewMode === "sub_info" && (
              <div className="space-y-2 pt-1">
                <button type="button" onClick={openForm}
                  className="flex w-full items-center gap-3 rounded-2xl border border-orange-400/50 bg-orange-500/10 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-orange-500/20 active:scale-[0.98]">
                  <span className="text-lg">📋</span>
                  <span className="flex-1">{t("cta_form", lang)}</span>
                  <svg className="h-4 w-4 flex-shrink-0 text-orange-300" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" onClick={goHome}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/60 transition hover:bg-white/10">
                  <span className="text-lg">🏠</span>
                  <span className="flex-1">{t("cta_home", lang)}</span>
                </button>
              </div>
            )}

            {/* ── Lead Form ── */}
            {viewMode === "form" && (
              <form onSubmit={handleLeadSubmit}
                className="space-y-2.5 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/45 mb-1">
                  {t("form_title", lang)}
                </p>
                <input type="text" name="name" value={leadForm.name} onChange={handleLeadChange}
                  placeholder={t("form_name", lang)} required className={inputCls} />
                <input type="tel" name="phone" value={leadForm.phone} onChange={handleLeadChange}
                  placeholder={t("form_phone", lang)} required className={inputCls} />
                <input type="text" name="location" value={leadForm.location} onChange={handleLeadChange}
                  placeholder={t("form_location", lang)} required className={inputCls} />
                <input type="email" name="email" value={leadForm.email} onChange={handleLeadChange}
                  placeholder={t("form_email", lang)} required className={inputCls} />
                <select name="service" value={leadForm.service} onChange={handleLeadChange}
                  required className={inputCls}>
                  <option value="">{t("form_service", lang)}</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Google SEO Services">Google SEO Services</option>
                  <option value="Film Production">Film Production</option>
                </select>
                <textarea name="message" value={leadForm.message} onChange={handleLeadChange}
                  placeholder={t("form_message", lang)} rows={3} required className={inputCls} />
                {submitStatus && (
                  <p className={`text-xs ${submitStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
                    {submitStatus.text}
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={goHome}
                    className="flex-1 rounded-2xl border border-white/15 bg-white/5 py-2.5 text-sm text-white/60 transition hover:bg-white/10">
                    {t("form_cancel", lang)}
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ef4444] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? t("form_submitting", lang) : t("form_submit", lang)}
                  </button>
                </div>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Typed input (optional — for language detection) ── */}
          {viewMode === "menu" && (
            <form onSubmit={handleTypedInput}
              className="border-t border-white/8 bg-[#0a0f1e] px-4 py-2.5 flex gap-2">
              <input name="chat_input" type="text"
                placeholder={lang === "en" ? "Type a message…" : lang === "hi" ? "Kuch likhein…" : "Kuch type karein…"}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/35 focus:border-orange-400 focus:outline-none transition" />
              <button type="submit"
                className="rounded-full bg-gradient-to-r from-[#f97316] to-[#ef4444] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                {lang === "en" ? "Send" : "Bhejein"}
              </button>
            </form>
          )}

          {/* ── Footer ── */}
          <div className="border-t border-white/10 bg-[#08101f] px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-white/35">{t("footer_label", lang)}</span>
              <div className="flex gap-2">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-medium text-white">
                  WhatsApp
                </a>
                <a href={`tel:+${PHONE_NUMBER}`}
                  className="rounded-full bg-[#1d4ed8] px-3 py-1.5 text-xs font-medium text-white">
                  Call
                </a>
                <a href={`mailto:${EMAIL_ADDRESS}`}
                  className="rounded-full bg-[#ef4444] px-3 py-1.5 text-xs font-medium text-white">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <button type="button" onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-14 right-4 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316] via-[#ef4444] to-[#1d4ed8] text-white shadow-[0_20px_60px_rgba(239,68,68,0.45)] transition hover:scale-105 md:right-6"
        aria-label={isOpen ? "Close chat" : "Open chat"}>
        {isOpen ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
            <path d="M4 5.5C4 4.67 4.67 4 5.5 4h13C19.33 4 20 4.67 20 5.5v8c0 .83-.67 1.5-1.5 1.5H9l-4.5 4v-4H5.5C4.67 15 4 14.33 4 13.5v-8Z"
              stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </>
  );
};

export default Chatbot;
