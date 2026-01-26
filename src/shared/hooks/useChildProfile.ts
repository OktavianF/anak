import { useState, useCallback } from 'react';
import { ProfileData } from '../types/app';

const INITIAL_PROFILE: ProfileData = {
  avatar: '🦄',
  backgroundColor: '#3B82F6', // blue-500
  favoriteColor: 'blue',
  badges: ['super-star', 'brain-explorer'],
};

export function useChildProfile() {
  // Child basic info
  const [childName, setChildName] = useState('');
  const [childGender, setChildGender] = useState('male');
  const [childAge, setChildAge] = useState(6);

  // Profile customization
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE);

  const updateProfile = useCallback((newData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
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
  };
}
