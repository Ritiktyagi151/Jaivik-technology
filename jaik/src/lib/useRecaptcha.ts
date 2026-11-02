"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LeHo-csAAAAAA-RUUtC-xmee5YqI4LMF75";
const RECAPTCHA_CALLBACK_NAME = "__jaikvikRecaptchaLoaded";
const RECAPTCHA_SCRIPT_URL = `https://www.google.com/recaptcha/api.js?onload=${RECAPTCHA_CALLBACK_NAME}&render=explicit`;
const RECAPTCHA_LOAD_TIMEOUT_MS = 10000;

type RecaptchaRenderOptions = {
  sitekey: string;
  theme: "light";
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    __jaikvikRecaptchaLoaded?: () => void;
    grecaptcha?: {
      ready?: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        options: RecaptchaRenderOptions
      ) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
  }
}

let recaptchaScriptPromise: Promise<void> | null = null;

const waitForRecaptcha = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      if (window.grecaptcha?.render) {
        resolve();
        return;
      }

      if (Date.now() - startedAt > RECAPTCHA_LOAD_TIMEOUT_MS) {
        reject(
          new Error(
            "Captcha could not be loaded. Please disable ad blocker or browser tracking protection and refresh."
          )
        );
        return;
      }

      window.setTimeout(check, 100);
    };

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(check);
      return;
    }

    check();
  });

const loadRecaptchaScript = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Captcha is unavailable in this browser."));
  }

  if (window.grecaptcha?.render) {
    return Promise.resolve();
  }

  if (!recaptchaScriptPromise) {
    recaptchaScriptPromise = new Promise((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(
          new Error(
            "Captcha could not be loaded. Please disable ad blocker or browser tracking protection and refresh."
          )
        );
      }, RECAPTCHA_LOAD_TIMEOUT_MS);

      const resolveWhenReady = () => {
        waitForRecaptcha()
          .then(() => {
            window.clearTimeout(timeoutId);
            resolve();
          })
          .catch((error) => {
            window.clearTimeout(timeoutId);
            reject(error);
          });
      };

      window.__jaikvikRecaptchaLoaded = resolveWhenReady;
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src*="google.com/recaptcha/api.js"]'
      );

      if (existingScript) {
        resolveWhenReady();
        existingScript.addEventListener(
          "error",
          () => {
            window.clearTimeout(timeoutId);
            reject(new Error("Captcha could not be loaded."));
          },
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src = RECAPTCHA_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = resolveWhenReady;
      script.onerror = () => {
        window.clearTimeout(timeoutId);
        reject(new Error("Captcha could not be loaded."));
      };
      document.head.appendChild(script);
    });
  }

  return recaptchaScriptPromise;
};

export const useRecaptcha = () => {
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");

  const ensureWidget = useCallback(async () => {
    if (!RECAPTCHA_SITE_KEY) {
      throw new Error("Captcha is not configured.");
    }

    await loadRecaptchaScript();

    if (!recaptchaRef.current) {
      throw new Error("Captcha is unavailable. Please refresh and try again.");
    }

    const recaptcha = window.grecaptcha;
    if (!recaptcha?.render) {
      throw new Error("Captcha is unavailable. Please refresh and try again.");
    }

    if (widgetIdRef.current === null) {
      recaptchaRef.current.innerHTML = "";
      widgetIdRef.current = recaptcha.render(recaptchaRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: "light",
        "expired-callback": () => {
          if (widgetIdRef.current !== null) {
            window.grecaptcha?.reset(widgetIdRef.current);
          }
        },
        "error-callback": () => {
          if (widgetIdRef.current !== null) {
            window.grecaptcha?.reset(widgetIdRef.current);
          }
        },
      });
    }

    setIsRecaptchaReady(true);
    setRecaptchaError("");
    return widgetIdRef.current;
  }, []);

  useEffect(() => {
    ensureWidget().catch((error) => {
      const message =
        error instanceof Error ? error.message : "Captcha could not be loaded.";
      setRecaptchaError(message);
      setIsRecaptchaReady(false);
    });
  }, [ensureWidget]);

  const getRecaptchaToken = useCallback(async () => {
    const widgetId = await ensureWidget();
    const token = window.grecaptcha?.getResponse(widgetId) || "";

    if (!token) {
      throw new Error("Please complete captcha verification.");
    }

    return token;
  }, [ensureWidget]);

  const resetRecaptcha = useCallback(() => {
    if (widgetIdRef.current !== null && window.grecaptcha?.reset) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, []);

  return {
    getRecaptchaToken,
    isRecaptchaReady,
    recaptchaError,
    recaptchaRef,
    resetRecaptcha,
  };
};
