// app/_layout.jsx
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRTL } from '@/hooks/useRTL';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import 'react-native-reanimated';
import '../i18n';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isRTL } = useRTL();

  useEffect(() => {
    console.log("Current RTL status: ", isRTL); // true
    console.log("I18nManager.isRTL: ", I18nManager.isRTL); // false
  }, [isRTL]);
  
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          animation: isRTL ? 'slide_from_left' : 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            animation: isRTL ? 'slide_from_left' : 'slide_from_right',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}