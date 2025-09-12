import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: { translation: {
    login: "Log in",
    register: "Register",
    email: "Email",
    password: "Password"
  }},
  ar: { translation: {
    login: "تسجيل الدخول",
    register: "تسجيل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور"
  }}
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;