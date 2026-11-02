"use client";

import { useEffect } from "react";

const GA_ID = "G-B99PTB12R1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const InteractionAnalytics = () => {
  useEffect(() => {
    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
    };

    const options: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", loadAnalytics, options);
    window.addEventListener("keydown", loadAnalytics, { once: true });

    return () => {
      window.removeEventListener("pointerdown", loadAnalytics);
      window.removeEventListener("keydown", loadAnalytics);
    };
  }, []);

  return null;
};

export default InteractionAnalytics;
