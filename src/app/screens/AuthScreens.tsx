import React from 'react';
import { NewSplashScreen } from '@/features/auth';
import LoginScreen from '@/features/auth/pages/LoginScreen';

interface AuthScreensProps {
  currentScreen: string;
  navigateTo: (screen: string) => void;
  // Simpan untuk future use
  childName?: string;
  setChildName?: (name: string) => void;
  childGender?: string;
  setChildGender?: (gender: string) => void;
  childAge?: number;
  setChildAge?: (age: number) => void;
}

export function AuthScreens({
  currentScreen,
  navigateTo
}: AuthScreensProps) {
  switch (currentScreen) {
    case 'login':
      return <LoginScreen navigateTo={() => navigateTo('home')} />;
    case 'splash':
    default:
      return <NewSplashScreen />;
  }
}
