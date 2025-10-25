// hooks/useRTL.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

export const languageDirection = {
  en: 'ltr',
  ar: 'rtl',
};

export const useRTL = () => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = async (lng) => {
    try {
      console.log(`🔄 Starting language change to: ${lng}`);
      
      // Save language preference
      await AsyncStorage.setItem('user-language', lng);
      
      // Change i18n language
      await i18n.changeLanguage(lng);
      setCurrentLanguage(lng);
      
      // Handle RTL/LTR direction
      const shouldBeRTL = languageDirection[lng] === 'rtl';
      
      console.log(`📝 Language: ${lng}, Should be RTL: ${shouldBeRTL}`);
      console.log(`📊 Current I18nManager.isRTL: ${I18nManager.isRTL}`);
      
      // Update state immediately for UI responsiveness
      setIsRTL(shouldBeRTL);
      
      // Set RTL for next app launch (this is persistent)
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.forceRTL(shouldBeRTL);
        I18nManager.allowRTL(shouldBeRTL);
        console.log(`✅ RTL set to ${shouldBeRTL} for next launch`);
      }
      
    } catch (error) {
      console.error('❌ Error changing language:', error);
    }
  };

  // Initialize direction on app start
  useEffect(() => {
    const initDirection = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('user-language');
        const lang = savedLanguage || 'en';
        const shouldBeRTL = languageDirection[lang] === 'rtl';
        
        console.log(`🚀 App starting - Language: ${lang}`);
        console.log(`📊 I18nManager.isRTL: ${I18nManager.isRTL}`);
        console.log(`📊 Should be RTL: ${shouldBeRTL}`);
        
        // Set i18n language
        await i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
        
        // Use I18nManager.isRTL as source of truth on startup
        // (it will be correct if app was restarted after RTL change)
        setIsRTL(I18nManager.isRTL);
        
        // Ensure RTL is set correctly for current session and next launch
        if (I18nManager.isRTL !== shouldBeRTL) {
          console.log(`⚠️ RTL mismatch. Setting to ${shouldBeRTL}`);
          I18nManager.forceRTL(shouldBeRTL);
          I18nManager.allowRTL(shouldBeRTL);
          // Also update state to match what we want
          setIsRTL(shouldBeRTL);
        }
        
      } catch (error) {
        console.error('❌ Error initializing language direction:', error);
      }
    };

    initDirection();
  }, []);

  return {
    changeLanguage,
    currentLanguage,
    isRTL
  };
};