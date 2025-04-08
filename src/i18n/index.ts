import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import zh from './locales/zh.json';
import zhTW from './locales/zh-TW.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      zh: { translation: zh },
      'zh-TW': { translation: zhTW },
      fr: { translation: fr },
    },
    lng: 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    supportedLngs: ['en', 'es', 'zh', 'zh-TW', 'fr'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 