import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import language files
import en from "./locales/en.json";
import sv from "./locales/sv.json";

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  lng: "", 
  resources: {
    sv: { translation: sv },
    en: { translation: en }
  },
  
  fallbackLng: "sv", 
  interpolation: { escapeValue: false }
});

export default i18n;