// i18n.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './locales/ar.json';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Language direction mapping
export const languageDirection = {
  en: 'ltr',
  fr: 'ltr',
  ar: 'rtl',
  es: 'ltr',
};

// Get saved language from AsyncStorage
const getSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('user-language');
    console.log('Saved language:', savedLanguage);
    return savedLanguage || 'en';
  } catch (error) {
    console.error('Error getting saved language:', error);
    return 'en';
  }
};

// Initialize i18n
const initI18n = async () => {
  const lng = await getSavedLanguage();
  
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: lng,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: 'v3',
    });
};

initI18n();

export default i18n;