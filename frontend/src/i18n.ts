// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    nonExplicitSupportedLngs: true,   // en-US -> en, ar-SA -> ar
    load: "languageOnly",
    ns: ["common", "translation", "registration"],
    defaultNS: "translation",
    fallbackNS: ["common"],
    backend: {
      // served from /public/locales
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
    debug: import.meta.env.DEV,
  });

// expose + keep <html> dir/lang in sync
if (typeof window !== "undefined") {
  // @ts-expect-error debug-only
  window.__i18n = i18n;

  const applyDir = (lng?: string) => {
    const base = (lng ?? "en").toLowerCase().split("-")[0];
    const isRTL = base === "ar";
    document.documentElement.setAttribute("lang", base);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  };

  applyDir(i18n.resolvedLanguage || i18n.language);
  i18n.on("languageChanged", (lng) => applyDir(lng));
}

export default i18n;

