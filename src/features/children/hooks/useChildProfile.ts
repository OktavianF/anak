import { useState, useCallback, useEffect } from 'react';
import { ProfileData } from '../../../shared/types/app';
import { useChildrenStore } from '../../../store/childrenStore';

const INITIAL_PROFILE: ProfileData = {
  avatar: '🦄',
  backgroundColor: '#3B82F6',
  favoriteColor: 'blue',
  badges: ['super-star', 'brain-explorer'],
};

export function useChildProfile() {
  const store = useChildrenStore();
  const activeChild = store.children.find((c) => c.id === store.activeChildId);

  // Local state for forms
  const [childName, setChildName] = useState(activeChild?.name || '');
  const [childGender, setChildGender] = useState(activeChild?.gender?.toLowerCase() || 'male');
  const [childAge, setChildAge] = useState(activeChild?.age || 6);
  const [profileData, setProfileData] = useState<ProfileData>({
    ...INITIAL_PROFILE,
    avatar: activeChild?.avatar || INITIAL_PROFILE.avatar,
    backgroundColor: activeChild?.background_color || INITIAL_PROFILE.backgroundColor,
    favoriteColor: activeChild?.favorite_color || INITIAL_PROFILE.favoriteColor,
  });

  // Sync state when active child changes
  useEffect(() => {
    if (activeChild) {
      setChildName(activeChild.name);
      setChildGender(activeChild.gender.toLowerCase());
      setChildAge(activeChild.age);
      setProfileData((prev) => ({
        ...prev,
        avatar: activeChild.avatar || prev.avatar,
        backgroundColor: activeChild.background_color || prev.backgroundColor,
        favoriteColor: activeChild.favorite_color || prev.favoriteColor,
      }));
    }
  }, [activeChild]);

  const updateProfile = useCallback(async (newData: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
    
    // Also save to backend if there's an active child
    if (store.activeChildId) {
      const updates: any = {};
      if (newData.avatar) updates.avatar = newData.avatar;
      if (newData.backgroundColor) updates.background_color = newData.backgroundColor;
      if (newData.favoriteColor) updates.favorite_color = newData.favoriteColor;
      
      if (Object.keys(updates).length > 0) {
        try {
          await store.updateChild(store.activeChildId, updates);
        } catch (e) {
          console.error("Failed to update profile", e);
        }
      }
    }
  }, [store]);

  return {
    childName,
    setChildName,
    childGender,
    setChildGender,
    childAge,
    setChildAge,
    profileData,
    updateProfile,
    // Add store methods
    children: store.children,
    activeChildId: store.activeChildId,
    setActiveChild: store.setActiveChild,
    addChild: store.addChild,
    deleteChild: store.deleteChild,
    fetchChildren: store.fetchChildren,
    isLoading: store.isLoading
  };
}
