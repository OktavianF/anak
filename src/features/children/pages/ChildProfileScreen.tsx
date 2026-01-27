import React from 'react';
import { motion } from 'motion/react';
import { LogOut, ArrowLeft } from 'lucide-react';

// Local components
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { CoinsDisplay } from '../components/CoinsDisplay';
import { AchievementGallery } from '../components/AchievementGallery';
import { CustomizationModal } from '../components/CustomizationModal';

// Local hooks & constants
import { useProfileCustomization, ProfileData } from '../hooks/useProfileCustomization';
import { achievements } from '../constants/profileOptions';

interface ChildProfileScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode?: boolean;
  setIsParentMode?: (mode: boolean) => void;
  collectedStickers?: string[];
  profileData: ProfileData;
  updateProfile?: (data: Partial<ProfileData>) => void;
}

export default function ChildProfileScreen({
  navigateTo,
  childName,
  profileData,
  updateProfile,
  setIsParentMode,
}: ChildProfileScreenProps) {
  const {
    showCustomization,
    currentCoins,
    selectedCustomization,
    setSelectedCustomization,
    purchaseItem,
    toggleCustomization,
    closeCustomization,
  } = useProfileCustomization(2580, profileData, updateProfile);

  const handleSafeExit = () => {
    setIsParentMode?.(true);
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-500 relative overflow-hidden">
      <AnimatedBackground />

      {/* Header with Back Button */}
      <div className="relative z-10 pt-12 pb-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          onClick={() => navigateTo('child-assessment')}
          className="absolute top-4 left-6 w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.35)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
        </motion.button>

        {/* Avatar and Name */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <ProfileAvatar avatar={profileData.avatar} onCustomizeClick={toggleCustomization} />

          {/* Child Name with Fun Typography */}
          <motion.h1
            className="text-white font-heading text-4xl mb-2 drop-shadow-lg"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.8)',
                '0 0 10px rgba(255,255,255,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {childName} 🌟
          </motion.h1>

          <CoinsDisplay coins={currentCoins} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-20">
        <AchievementGallery achievements={achievements} />

        {/* Safe Exit Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleSafeExit}
          className="w-full bg-white/25 backdrop-blur-md rounded-3xl p-4 border border-white/40 flex items-center justify-center space-x-3 text-white font-heading text-lg"
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-6 h-6" />
          <span>Kembali</span>
        </motion.button>
      </div>

      {/* Customization Modal */}
      <CustomizationModal
        isOpen={showCustomization}
        currentCoins={currentCoins}
        selectedCategory={selectedCustomization}
        onCategorySelect={setSelectedCustomization}
        onPurchase={purchaseItem}
        onClose={closeCustomization}
      />
    </div>
  );
}
