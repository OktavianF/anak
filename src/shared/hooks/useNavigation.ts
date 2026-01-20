import { useState, useCallback } from 'react';
import { ScreenName, Doctor } from '../types/app';

export function useNavigation(initialScreen: ScreenName = 'splash') {
  const [currentScreen, setCurrentScreen] = useState<string>(initialScreen);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const navigateTo = useCallback((screen: string, data?: Record<string, unknown>) => {
    if (data && screen === 'doctor-detail') {
      setSelectedDoctor(data as Doctor);
    }
    setCurrentScreen(screen);
  }, []);

  const goBack = useCallback(() => {
    // Simple back navigation - can be extended with history stack
    setCurrentScreen('home');
  }, []);

  return {
    currentScreen,
    setCurrentScreen,
    selectedDoctor,
    navigateTo,
    goBack,
  };
}
