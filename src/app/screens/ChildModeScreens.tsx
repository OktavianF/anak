import React from 'react';
import {
  MemoryGameScreen,
  WordPuzzleGameScreen,
  NumberSequenceGameScreen,
  PatternRecognitionGameScreen,
  GameScreen,
} from '@/features/games';
import { ChildAssessmentScreen, ChildProfileScreen } from '@/features/children';
import type { CommonScreenProps, ProfileData } from '@/shared/types';
import type { ChcAssessments } from '@/shared/constants';

interface ChildModeScreensProps extends CommonScreenProps {
  currentScreen: string;
  childName: string;
  profileData: ProfileData;
  chcAssessments: ChcAssessments;
  updateChcAssessment: (domain: string, data: Record<string, unknown>) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
  requestParentAccess: () => void;
}

export function ChildModeScreens({
  currentScreen,
  navigateTo,
  isParentMode,
  setIsParentMode,
  addSticker,
  collectedStickers,
  childName,
  profileData,
  chcAssessments,
  updateChcAssessment,
  updateProfile,
  requestParentAccess,
}: ChildModeScreensProps) {
  const commonProps = {
    navigateTo,
    isParentMode,
    setIsParentMode,
    addSticker,
    collectedStickers,
  };

  switch (currentScreen) {
    case 'memory-game':
      return <MemoryGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;

    case 'word-puzzle-game':
      return <WordPuzzleGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;

    case 'number-sequence-game':
      return (
        <NumberSequenceGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />
      );

    case 'pattern-recognition-game':
      return (
        <PatternRecognitionGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />
      );

    case 'child-assessment':
      return (
        <ChildAssessmentScreen
          navigateTo={navigateTo}
          childName={childName}
          isParentMode={isParentMode}
          setIsParentMode={setIsParentMode}
          chcAssessments={chcAssessments}
        />
      );

    case 'child-profile':
      return (
        <ChildProfileScreen
          navigateTo={navigateTo}
          childName={childName}
          isParentMode={isParentMode}
          setIsParentMode={setIsParentMode}
          collectedStickers={collectedStickers}
          profileData={profileData}
          updateProfile={updateProfile}
        />
      );

    default:
      return (
        <GameScreen
          {...commonProps}
          chcAssessments={chcAssessments}
          requestParentAccess={requestParentAccess}
          showParentAccessButton={true}
        />
      );
  }
}
