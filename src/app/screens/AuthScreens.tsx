import React from 'react';
import { NewSplashScreen } from '@/features/auth';

interface AuthScreensProps {
  currentScreen: string;
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
}: AuthScreensProps) {
  switch (currentScreen) {
    case 'splash':
    default:
      return <NewSplashScreen />;
  }
}
