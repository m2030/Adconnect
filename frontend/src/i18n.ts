// frontend/src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 1) Minimal resources (expand anytime)
const resources = {
  en: {
    common: {
      appName: "AdConnect",
      register: "Register",
      login: "Login",
      logout: "Logout",
      back: "Back",
    },
    registration: {
      start_title: "Open a new account",
      start_option_provider: "Service Provider",
      start_option_seeker: "Service Seeker",
      provider_choice_title: "Choose provider type",
      provider_marketing: "Marketing/Advertising Agencies",
      provider_sponsorship_entities: "Entities seeking sponsors",
      provider_influencers: "Celebrities & Influencers",
      seeker_title: "Service Seeker",
      next: "Next",
      submit: "Submit",
      company_name: "Company name",
      activity: "Activity",
      permits: "Government permits & documents",
      yes: "Yes",
      no: "No",
    },
  },
  ar: {
    common: {
      appName: "AdConnect",
      register: "تسجيل",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      back: "رجوع",
    },
    registration: {
      start_title: "فتح حساب جديد",
      start_option_provider: "مقدم خدمة",
      start_option_seeker: "طالب خدمة",
      provider_choice_title: "اختر نوع مقدم الخدمة",
      provider_marketing: "شركات ووكالات التسويق والإعلان",
      provider_sponsorship_entities: "جهات تحتاج رعاة",
      provider_influencers: "المشاهير والمؤثرون",
      seeker_title: "طالب خدمة",
      next: "التالي",
      submit: "إرسال",
      company_name: "اسم الشركة",
      activity: "النشاط",
      permits: "التراخيص والوثائق الحكومية",
      yes: "نعم",
      no: "لا",
    },
  },
};

// 2) Helpers
const RTL_LANGS = ["ar", "fa", "ur", "he"];
export function isRtl(lang: string) {
  const base = lang.toLowerCase().split("-")[0];
  return RTL_LANGS.includes(base);
}

export function applyLangDir(lang: string) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = isRtl(lang) ? "rtl" : "ltr";
  // Optional: add a class to easily flip some utilities if needed
  html.classList.toggle("rtl", isRtl(lang));
}

// prefer query param (to match Keycloak), else localStorage, else browser
function detectInitialLang(): string {
  try {
    const u = new URL(window.location.href);
    const fromKC = u.searchParams.get("ui_locales") || u.searchParams.get("kc_locale");
    const fromQuery = u.searchParams.get("lang");
    const stored = localStorage.getItem("lang");
    const nav = navigator.language || "en";
    return (fromKC || fromQuery || stored || nav || "en").toLowerCase();
  } catch {
    return "en";
  }
}

const initialLang = detectInitialLang();

// 3) Init i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    ns: ["common", "registration"],
    defaultNS: "common",
    returnNull: false,
  })
  .then(() => {
    applyLangDir(i18n.language);
  });

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
  applyLangDir(lng);
});

export default i18n;
