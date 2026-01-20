import React from 'react';
import { NewSplashScreen, SurveyScreen } from '@/features/auth';
import type { SurveyData } from '@/shared/types';

interface AuthScreensProps {
  currentScreen: string;
  childName: string;
  setChildName: (name: string) => void;
  childGender: string;
  setChildGender: (gender: string) => void;
  childAge: number;
  setChildAge: (age: number) => void;
  surveyData: SurveyData;
  updateSurveyData: (data: Partial<SurveyData>) => void;
  onSurveyComplete: () => void;
}

export function AuthScreens({
  currentScreen,
  childName,
  setChildName,
  childGender,
  setChildGender,
  childAge,
  setChildAge,
  surveyData,
  updateSurveyData,
  onSurveyComplete,
}: AuthScreensProps) {
  switch (currentScreen) {
    case 'survey':
      return (
        <SurveyScreen
          navigateTo={onSurveyComplete}
          childName={childName}
          setChildName={setChildName}
          childGender={childGender}
          setChildGender={setChildGender}
          childAge={childAge}
          setChildAge={setChildAge}
          surveyData={surveyData}
          updateSurveyData={updateSurveyData}
        />
      );

    case 'splash':
    default:
      return <NewSplashScreen />;
  }
}
