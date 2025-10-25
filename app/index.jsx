// app/index.jsx
import { useRTL } from '@/hooks/useRTL';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const languages = [
  { code: 'en', label: 'English', direction: 'ltr' },
  { code: 'ar', label: 'العربية', direction: 'rtl' },
];

const Home = () => {
  const { isRTL, changeLanguage, currentLanguage } = useRTL();
  const { t } = useTranslation();

  const handleLanguageChange = (languageCode) => {
    console.log(`🖱️ Button clicked: ${languageCode}`);
    changeLanguage(languageCode);
  };

  // This will run every time isRTL or currentLanguage changes
  useEffect(() => {
    console.log("🔄 useEffect triggered:");
    console.log("   isRTL ===> ", isRTL);
    console.log("   currentLanguage ===> ", currentLanguage);
    console.log("   I18nManager.isRTL ===> ", require('react-native').I18nManager.isRTL);
  }, [isRTL, currentLanguage]); // ✅ Add dependencies here

  // Log when component renders
  console.log("🎨 Component rendering:", { isRTL, currentLanguage });

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.container, 
        isRTL && styles.rtlContainer
      ]}
    >
      <Text style={[styles.title, isRTL && styles.rtlText]}>
        {t('welcome') || 'Welcome'}
      </Text>
      
      <Text style={[styles.subtitle, isRTL && styles.rtlText]}>
        {t('currentLanguage') || 'Current Language'}: {currentLanguage}
      </Text>
      
      <Text style={[styles.subtitle, isRTL && styles.rtlText]}>
        {t('rtlStatus') || 'RTL Status'}: {isRTL ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)'}
      </Text>

      <Text style={[styles.debugText, isRTL && styles.rtlText]}>
        Debug: I18nManager.isRTL = {require('react-native').I18nManager.isRTL ? 'true' : 'false'}
      </Text>

      <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
        {t('selectLanguage') || 'Select Language'}:
      </Text>

      <View style={styles.languageButtonsContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              currentLanguage === language.code && styles.selectedLanguageButton,
              isRTL && styles.rtlButton,
            ]}
            onPress={() => handleLanguageChange(language.code)}
          >
            <Text
              style={[
                styles.languageButtonText,
                currentLanguage === language.code && styles.selectedLanguageText,
                isRTL && styles.rtlText,
              ]}
            >
              {language.label}
            </Text>
            {currentLanguage === language.code && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.infoBox, isRTL && styles.rtlInfoBox]}>
        <Text style={[styles.infoText, isRTL && styles.rtlText]}>
          {isRTL 
            ? 'التطبيق يعمل الآن من اليمين إلى اليسار. هذا هو الوضع العربي.'
            : 'The app is now running from Left to Right. This is the English mode.'
          }
        </Text>
      </View>

      <Text style={[styles.note, isRTL && styles.rtlText]}>
        {isRTL 
          ? 'ملاحظة: قد تحتاج إلى إعادة تشغيل التطبيق لرؤية جميع التغييرات بشكل كامل.'
          : 'Note: You may need to restart the app to see all changes completely.'
        }
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  rtlContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'left',
    color: '#333',
  },
  debugText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    color: '#ff6b6b',
    fontFamily: 'monospace',
  },
  languageButtonsContainer: {
    gap: 12,
    width: '100%',
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  rtlButton: {
    flexDirection: 'row-reverse',
  },
  selectedLanguageButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  },
  languageButtonText: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'left',
  },
  selectedLanguageText: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  rtlText: {
    textAlign: 'right',
  },
  checkmark: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  rtlInfoBox: {
    borderLeftWidth: 0,
    borderRightWidth: 4,
    borderRightColor: '#ffc107',
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'left',
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'left',
  },
});

export default Home;