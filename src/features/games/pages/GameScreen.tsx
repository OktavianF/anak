import React from 'react';
import { motion } from 'motion/react';
import { chcDomainsData } from '../constants';
import {
  DomainCard,
  BackgroundDecoration,
  EncouragementSection,
} from '../components';

interface GameScreenProps {
  navigateTo: (screen: string) => void;
  isParentMode?: boolean;
  setIsParentMode?: (mode: boolean) => void;
  chcAssessments?: unknown;
  addSticker?: (sticker: string) => void;
  collectedStickers?: string[];
  requestParentAccess?: () => void;
  showParentAccessButton?: boolean;
  childName?: string;
  childCoins?: number;
}

export default function GameScreen({
  navigateTo,
  childName = 'Maya',
  childCoins = 150,
}: GameScreenProps) {
  const handleDomainClick = (gameScreen: string) => {
    navigateTo(gameScreen);
  };

  const handleProfileClick = () => {
    navigateTo('child-profile');
  };

  const handleParentModeClick = () => {
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative">
      {/* Animated Background */}
      <BackgroundDecoration />

      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-4xl mx-auto">
        {/* Header */}
        <GameHeader
          childName={childName}
          childCoins={childCoins}
          onProfileClick={handleProfileClick}
          onParentModeClick={handleParentModeClick}
        />

        {/* CHC Domain Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {chcDomainsData.map((domain, index) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              index={index}
              onClick={() => handleDomainClick(domain.gameScreen)}
            />
          ))}
        </motion.div>

        {/* Encouragement Section */}
        <EncouragementSection />
      </div>
    </div>
  );
}
