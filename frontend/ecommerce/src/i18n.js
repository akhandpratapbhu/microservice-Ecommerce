import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: false,

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    ns: ['navbar', 'signup', 'products'], // List of namespaces
    defaultNS: 'navbar', // default if namespace is not specified

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

