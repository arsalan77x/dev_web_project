import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './public/locales/en/translation.json';
import translationFR from './public/locales/fr/translation.json';
import translationDE from './public/locales/de/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  }
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;