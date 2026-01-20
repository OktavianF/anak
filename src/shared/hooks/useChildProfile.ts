import { useState, useCallback } from 'react';
import { ProfileData, SurveyData } from '../types/app';

const INITIAL_PROFILE: ProfileData = {
  avatar: '🦄',
  backgroundColor: '#3B82F6', // blue-500
  favoriteColor: 'blue',
  badges: ['super-star', 'brain-explorer'],
};

const INITIAL_SURVEY: SurveyData = {};

export function useChildProfile() {
  // Child basic info
  const [childName, setChildName] = useState('');
  const [childGender, setChildGender] = useState('male');
  const [childAge, setChildAge] = useState(6);

  // Profile customization
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE);

  // Survey data
  const [surveyData, setSurveyData] = useState<SurveyData>(INITIAL_SURVEY);

  // MBTI result
  const [mbtiResult, setMbtiResult] = useState<string | null>(null);

  const updateProfile = useCallback((newData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
  }, []);

  const updateSurveyData = useCallback((newData: Partial<SurveyData>) => {
    setSurveyData((prev) => ({ ...prev, ...newData }));
  }, []);

  return {
    // Child info
    childName,
    setChildName,
    childGender,
    setChildGender,
    childAge,
    setChildAge,

    // Profile
    profileData,
    updateProfile,

    // Survey
    surveyData,
    updateSurveyData,

    // MBTI
    mbtiResult,
    setMbtiResult,
  };
}
