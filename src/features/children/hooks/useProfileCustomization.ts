import { useState } from 'react';

export interface ProfileData {
  avatar?: string;
  coins?: number;
  name?: string;
}

export function useProfileCustomization(
  initialCoins: number,
  profileData: ProfileData,
  updateProfile?: (data: Partial<ProfileData>) => void
) {
  const [showCustomization, setShowCustomization] = useState(false);
  const [currentCoins, setCurrentCoins] = useState(initialCoins);
  const [selectedCustomization, setSelectedCustomization] = useState('avatar');

  const purchaseItem = (item: Partial<ProfileData>, cost: number) => {
    if (currentCoins >= cost) {
      setCurrentCoins((prev) => prev - cost);
      updateProfile?.({ ...profileData, ...item });
    }
  };

  const toggleCustomization = () => setShowCustomization(!showCustomization);
  const closeCustomization = () => setShowCustomization(false);

  return {
    showCustomization,
    currentCoins,
    selectedCustomization,
    setSelectedCustomization,
    purchaseItem,
    toggleCustomization,
    closeCustomization,
  };
}
