"use client";

import { useEffect, useRef } from "react";

const HOME_SCROLL_KEY = "home:scroll-y";

const parseScrollY = (value: string | null): number => {
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const HomeScrollStabilizer = () => {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const savedScrollY = parseScrollY(sessionStorage.getItem(HOME_SCROLL_KEY));
    if (savedScrollY > 0) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, behavior: "auto" });
      });
    }

    const persistScrollY = () => {
      lastScrollY.current = window.scrollY;
      sessionStorage.setItem(HOME_SCROLL_KEY, String(lastScrollY.current));
    };

    let frameId = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(persistScrollY);
    };

    const onResize = () => {
      const previousScroll = lastScrollY.current;
      window.requestAnimationFrame(() => {
        if (previousScroll > 120 && window.scrollY === 0) {
          window.scrollTo({ top: previousScroll, behavior: "auto" });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("beforeunload", persistScrollY);

    return () => {
      window.cancelAnimationFrame(frameId);
      persistScrollY();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("beforeunload", persistScrollY);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
};

export default HomeScrollStabilizer;
