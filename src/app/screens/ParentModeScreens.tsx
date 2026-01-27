import React from 'react';
import {
  NewSplashScreen,
  HomeScreen,
} from '@/features/auth';
import {
  MemoryGameScreen,
  WordPuzzleGameScreen,
  NumberSequenceGameScreen,
  PatternRecognitionGameScreen,
} from '@/features/games';
import { ProgressScreen } from '@/features/reports';
import {
  ProfileScreen,
  ChildAssessmentScreen,
  ChildProfileScreen,
} from '@/features/children';
import {
  ConsultationScreen,
  DoctorListScreen,
  DoctorDetailScreen,
  PaymentScreen,
  ChatScreen,
} from '@/features/consultation';
import { CommunityScreen, ParentGuideScreen } from '@/features/community';
import type { CommonScreenProps, ProfileData, Doctor } from '@/shared/types';
import type { ChcAssessments } from '@/shared/constants';
import type { ChcState, ChcDomainKey, ChcTestResult } from '@/shared/hooks/useChc';

interface ParentModeScreensProps extends CommonScreenProps {
  currentScreen: string;
  childName: string;
  setChildName: (name: string) => void;
  childGender: string;
  setChildGender: (gender: string) => void;
  childAge: number;
  setChildAge: (age: number) => void;
  profileData: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  chcTests: ChcState;
  chcAssessments: ChcAssessments;
  updateChcTestResults: (domain: ChcDomainKey, results: Partial<ChcTestResult>) => void;
  updateChcAssessment: (gameType: string, sessionData: unknown) => void;
  selectedDoctor: Doctor | null;
  switchToChildMode: () => void;
}

export function ParentModeScreens({
  currentScreen,
  navigateTo,
  isParentMode,
  setIsParentMode,
  addSticker,
  collectedStickers,
  childName,
  setChildName,
  childGender,
  setChildGender,
  childAge,
  setChildAge,
  profileData,
  updateProfile,
  chcTests,
  chcAssessments,
  updateChcTestResults,
  updateChcAssessment,
  selectedDoctor,
  switchToChildMode,
}: ParentModeScreensProps) {
  const commonProps = {
    navigateTo,
    isParentMode,
    setIsParentMode,
    addSticker,
    collectedStickers,
  };

  switch (currentScreen) {
    case 'splash':
      return <NewSplashScreen />;

    case 'home':
      return (
        <HomeScreen
          {...commonProps}
          childName={childName}
          profileData={profileData}
          chcTestResults={chcTests as any}
          switchToChildMode={switchToChildMode}
        />
      );

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

    case 'progress':
      return (
        <ProgressScreen
          {...commonProps}
          childName={childName}
          chcTestResults={chcTests as any}
          chcAssessments={chcAssessments as any}
        />
      );

    case 'profile':
      return (
        <ProfileScreen
          {...commonProps}
          childName={childName}
          setChildName={setChildName}
          profileData={profileData as any}
          updateProfile={updateProfile as any}
        />
      );

    case 'consultation':
      return <ConsultationScreen {...commonProps} setIsParentMode={setIsParentMode} />;

    case 'doctor-list':
      return <DoctorListScreen {...commonProps} setIsParentMode={setIsParentMode} />;

    case 'doctor-detail':
      return <DoctorDetailScreen {...commonProps} doctor={selectedDoctor} />;

    case 'payment':
      return <PaymentScreen {...commonProps} doctor={selectedDoctor} />;

    case 'chat':
      return <ChatScreen {...commonProps} doctor={selectedDoctor as any} />;

    case 'parent-guide':
      return <ParentGuideScreen {...commonProps} childName={childName} />;

    case 'community':
      return (
        <CommunityScreen {...commonProps} childName={childName} isParentMode={isParentMode} />
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
        <HomeScreen
          {...commonProps}
          childName={childName}
          profileData={profileData}
          chcTestResults={chcTests as any}
          switchToChildMode={switchToChildMode}
        />
      );
  }
}
