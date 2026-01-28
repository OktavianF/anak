import React from 'react';

// Local components
import {
  AssessmentBackground,
  AssessmentHeader,
  DomainGrid,
  BottomEncouragement,
} from '../components/assessment';

// Local constants
import { chcDomains } from '../constants/chcDomains';

interface ChildAssessmentScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode: boolean;
  setIsParentMode: (mode: boolean) => void;
  chcAssessments?: unknown;
  requestParentAccess?: () => void;
}

export default function ChildAssessmentScreen({
  navigateTo,
  requestParentAccess,
}: ChildAssessmentScreenProps) {
  const handleDomainClick = (gameScreen: string) => {
    navigateTo(gameScreen);
  };

  const handleProfileClick = () => {
    navigateTo('child-profile');
  };

  const handleParentModeClick = () => {
    requestParentAccess?.();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 relative overflow-hidden"
      style={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Background puzzle pieces decoration */}
      <AssessmentBackground />

      {/* Header */}
      <AssessmentHeader
        onProfileClick={handleProfileClick}
        onParentModeClick={handleParentModeClick}
      />

      {/* CHC Domain Cards */}
      <DomainGrid domains={chcDomains} onDomainClick={handleDomainClick} />

      {/* Bottom encouragement */}
      <BottomEncouragement />
    </div>
  );
}
