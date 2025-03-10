import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Importing the language files that defines the translation
import en from "./locales/en.json";
import sv from "./locales/sv.json";

/**
 * Initializes and configures i18next for internationalization.
 *
 * - Loads Swedish  and English translations.
 * - Defaults to Swedish (`sv`) if no language is detected.
 *
 * @constant {i18n} i18n - The initialized i18next instance.
 */
i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  
  /**
   * Defines the translation resources for supported languages.
   *
   * @property {Object} resources contains:
   * 
   * - @property {Object} resources.sv - Swedish translations.
   * - @property {Object} resources.en - English translations.
   */
  resources: {
    sv: { translation: sv }, 
    en: { translation: en } 
  },
});

export default i18n;