import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import language files that defines the lexicon
import en from "./locales/en.json";
import sv from "./locales/sv.json";

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  lng: "sv", 
  resources: {
    sv: { translation: sv }, // accesses the right translation import 
    en: { translation: en } 
  },
});

export default i18n;