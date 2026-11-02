"use client";

import { useEffect, useRef, useState } from "react";

interface CountryType {
  code: string;
  name: string;
  langCode: string;
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    __jaikTranslateLoading?: Promise<boolean>;
    __jaikTranslateReady?: boolean;
  }
}

const countries: CountryType[] = [
  { code: "US", name: "English", langCode: "en" },
  { code: "FR", name: "Francais", langCode: "fr" },
  { code: "DE", name: "Deutsch", langCode: "de" },
  { code: "ES", name: "Espanol", langCode: "es" },
  { code: "IN", name: "Hindi", langCode: "hi" },
  { code: "CN", name: "Chinese", langCode: "zh-CN" },
  { code: "JP", name: "Japanese", langCode: "ja" },
  { code: "RU", name: "Russian", langCode: "ru" },
  { code: "IT", name: "Italiano", langCode: "it" },
  { code: "BR", name: "Portugues (Brasil)", langCode: "pt" },
  { code: "SA", name: "Arabic", langCode: "ar" },
  { code: "KR", name: "Korean", langCode: "ko" },
  { code: "TR", name: "Turkce", langCode: "tr" },
  { code: "IR", name: "Persian", langCode: "fa" },
  { code: "PK", name: "Urdu", langCode: "ur" },
  { code: "BD", name: "Bangla", langCode: "bn" },
  { code: "CA", name: "Francais (Canada)", langCode: "fr" },
  { code: "MX", name: "Espanol (Mexico)", langCode: "es" },
  { code: "ZA", name: "Afrikaans", langCode: "af" },
  { code: "NG", name: "Yoruba", langCode: "yo" },
  { code: "AR", name: "Espanol (Argentina)", langCode: "es" },
  { code: "CL", name: "Espanol (Chile)", langCode: "es" },
  { code: "CO", name: "Espanol (Colombia)", langCode: "es" },
  { code: "EG", name: "Arabic (Egypt)", langCode: "ar" },
  { code: "ID", name: "Bahasa Indonesia", langCode: "id" },
  { code: "TH", name: "Thai", langCode: "th" },
  { code: "VN", name: "Vietnamese", langCode: "vi" },
  { code: "IL", name: "Hebrew", langCode: "iw" },
  { code: "PL", name: "Polski", langCode: "pl" },
  { code: "NL", name: "Nederlands", langCode: "nl" },
  { code: "SE", name: "Svenska", langCode: "sv" },
  { code: "NO", name: "Norsk", langCode: "no" },
  { code: "FI", name: "Suomi", langCode: "fi" },
  { code: "DK", name: "Dansk", langCode: "da" },
  { code: "GR", name: "Greek", langCode: "el" },
  { code: "PT", name: "Portugues", langCode: "pt" },
  { code: "BE", name: "Nederlands (Belgium)", langCode: "nl" },
  { code: "CH", name: "Deutsch (Swiss)", langCode: "de" },
  { code: "AT", name: "Deutsch (Austria)", langCode: "de" },
  { code: "CZ", name: "Cestina", langCode: "cs" },
  { code: "HU", name: "Magyar", langCode: "hu" },
  { code: "RO", name: "Romana", langCode: "ro" },
  { code: "UA", name: "Ukrainian", langCode: "uk" },
  { code: "SK", name: "Slovencina", langCode: "sk" },
  { code: "HR", name: "Hrvatski", langCode: "hr" },
  { code: "RS", name: "Srpski", langCode: "sr" },
  { code: "BG", name: "Bulgarian", langCode: "bg" },
];

const TRANSLATE_SCRIPT_ID = "google-translate-script";

const getFlagUrl = (countryCode: string) =>
  `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const ensureTranslateLoaded = async (): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  const win = window as Window & {
    google?: { translate?: unknown };
  };

  if (window.__jaikTranslateReady && win.google?.translate) return true;

  if (window.__jaikTranslateLoading) {
    return window.__jaikTranslateLoading;
  }

  window.__jaikTranslateLoading = new Promise<boolean>((resolve) => {
    const finalize = (ok: boolean) => {
      window.__jaikTranslateReady = ok;
      resolve(ok);
    };

    window.googleTranslateElementInit = () => {
      try {
        const google = win.google as
          | { translate?: { TranslateElement?: new (...args: unknown[]) => unknown } }
          | undefined;
        if (!google?.translate?.TranslateElement) return finalize(false);
        new google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
        finalize(true);
      } catch {
        finalize(false);
      }
    };

    const existingScript = document.getElementById(
      TRANSLATE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      // If script is already present, allow callback path to complete.
      setTimeout(() => {
        if (win.google?.translate) {
          window.googleTranslateElementInit?.();
        } else {
          finalize(false);
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.id = TRANSLATE_SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => finalize(false);
    document.body.appendChild(script);
  });

  return window.__jaikTranslateLoading;
};

const LanguageSelector = () => {
  const [selected, setSelected] = useState<CountryType>(countries[0]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<number | null>(null);

  const closeDropdown = () => {
    setOpen(false);
    setSearch("");
  };

  const applyLanguage = (langCode: string) => {
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (!combo) return false;
    if (combo.value === langCode) return true;
    combo.value = langCode;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };

  const changeLanguage = async (country: CountryType) => {
    setSelected(country);
    closeDropdown();

    const ready = await ensureTranslateLoaded();
    if (!ready) return;

    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }

    let tries = 0;
    pollRef.current = window.setInterval(() => {
      tries += 1;
      const done = applyLanguage(country.langCode);
      if (done || tries > 20) {
        if (pollRef.current) {
          window.clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    }, 200);
  };

  const filteredList = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) closeDropdown();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div id="google_translate_element" className="hidden" />

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 whitespace-nowrap rounded-md bg-red-600 px-2.5 py-2 text-sm text-white shadow transition hover:bg-black xl:px-4"
      >
        <img
          src={getFlagUrl(selected.code)}
          alt={`${selected.name} flag`}
          className="h-4 w-6 rounded-sm border border-white/40 object-cover"
          loading="lazy"
          decoding="async"
          width={24}
          height={16}
        />
        <span className="max-w-[82px] truncate xl:max-w-none">{selected.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-black text-white border border-white rounded-md shadow-lg z-50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-white rounded-md bg-transparent"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredList.map((country) => (
              <button
                key={country.code}
                onClick={() => changeLanguage(country)}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-600"
              >
                <img
                  src={getFlagUrl(country.code)}
                  alt={`${country.name} flag`}
                  className="h-4 w-6 shrink-0 rounded-sm border border-white/30 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={24}
                  height={16}
                />
                <span>{country.name}</span>
              </button>
            ))}
            {filteredList.length === 0 && (
              <p className="text-center py-3 text-gray-400">No match found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
