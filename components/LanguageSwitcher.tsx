// app/
import { useRTL } from '@/hooks/useRTL';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const languages = [
  { code: 'en', label: 'English', direction: 'ltr' },
  { code: 'fr', label: 'Français', direction: 'ltr' },
  { code: 'ar', label: 'العربية', direction: 'rtl' },
  { code: 'es', label: 'Español', direction: 'ltr' },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const { changeLanguage, isRTL } = useRTL();

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
  };

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={[styles.title, isRTL && styles.rtlText]}>
        {t('settings.language')}
      </Text>
      <View style={[styles.languageList, isRTL && styles.rtlLanguageList]}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              i18n.language === language.code && styles.selectedLanguage,
              isRTL && styles.rtlButton,
            ]}
            onPress={() => handleLanguageChange(language.code)}
          >
            <Text
              style={[
                styles.languageText,
                i18n.language === language.code && styles.selectedLanguageText,
                isRTL && styles.rtlText,
              ]}
            >
              {language.label}
            </Text>
            {i18n.language === language.code && (
              <Text style={[styles.checkmark, isRTL && styles.rtlText]}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  rtlContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'left',
  },
  languageList: {
    gap: 10,
  },
  rtlLanguageList: {
    alignItems: 'flex-end',
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '100%',
  },
  rtlButton: {
    flexDirection: 'row-reverse',
  },
  selectedLanguage: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
  },
  selectedLanguageText: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  checkmark: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});