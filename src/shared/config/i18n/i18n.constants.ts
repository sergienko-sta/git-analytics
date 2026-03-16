import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import { defaultLanguage } from '../../constants';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // debug: true,
        fallbackLng: defaultLanguage,

        interpolation: {
            escapeValue: false,
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },

        detection: {
            order: ['localStorage', 'cookie', 'navigator'],
            lookupLocalStorage: 'preferredLanguage',
            lookupCookie: 'preferredLanguage',
            caches: ['localStorage', 'cookie'],
        },

        ns: ['common', 'navigation', 'features'],
        defaultNS: 'common',
    })
    .then(() => {
        console.warn('i18next initialized successfully');
    })
    .catch((error) => {
        console.error('Failed to initialize i18next:', error);
    });

export { i18n };
