import React from 'react';
import type { ChcState } from '@/shared/hooks/useChc';
import { getTestDisplayData } from '../utils/testDataUtils';
import {
  HomeHeader,
  AdventureButton,
  ScheduleReminders,
  ChcRecommendations,
  RecentActivities,
  HomeBottomNav,
} from '../components';

interface HomeScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode?: boolean;
  setIsParentMode?: (mode: boolean) => void;
  collectedStickers?: string[];
  profileData?: {
    avatar?: string;
    backgroundColor?: string;
    favoriteColor?: string;
    badges?: string[];
  };
  chcTestResults?: ChcState;
  switchToChildMode?: () => void;
}

export default function HomeScreen(props: HomeScreenProps) {
  const { navigateTo, childName, chcTestResults, switchToChildMode } = props;

  const recentTests = getTestDisplayData(chcTestResults);

  const handleStartAdventure = () => {
    if (switchToChildMode) {
      switchToChildMode();
    } else {
      navigateTo('child-assessment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HomeHeader />

      <div className="px-6 pb-24">
        {/* Main Adventure Button */}
        <AdventureButton childName={childName} onStartAdventure={handleStartAdventure} />

        {/* Schedule & Important Reminders */}
        <ScheduleReminders childName={childName} />

        {/* CHC-Based Recommendations */}
        <ChcRecommendations onViewProgress={() => navigateTo('progress')} />

        {/* Recently - Game-Based Assessments */}
        <RecentActivities childName={childName} recentTests={recentTests} />
      </div>

      {/* Bottom Navigation */}
      <HomeBottomNav navigateTo={navigateTo} activeScreen="home" />
    </div>
  );
}

