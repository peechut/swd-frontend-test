// utils/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      layoutStyle: "Layout & style"
    }
  },
  th: {
    translation: {
      layoutStyle: "การจัดการหน้าเว็ป"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // กำหนดภาษาหลัก
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
