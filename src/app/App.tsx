import React, { useEffect } from 'react';

// Custom Hooks from shared
import { useAuth } from '@/shared/hooks/useAuth';
import { useChildProfile } from '@/features/children/hooks/useChildProfile';
import { useChc } from '@/shared/hooks/useChc';
import { useChcAssessments } from '@/shared/hooks/useChcAssessments';
import { useNavigation } from '@/shared/hooks/useNavigation';
import { useStickers } from '@/features/children/hooks/useStickers';

// Shared Components
import { StickerNotification, PINInputModal } from '@/shared/components';

// Screen Renderers
import { AuthScreens } from './screens/AuthScreens';
import { ChildModeScreens } from './screens/ChildModeScreens';
import { ParentModeScreens } from './screens/ParentModeScreens';

export default function App() {
  // Initialize custom hooks
  const auth = useAuth();
  const childProfile = useChildProfile();
  const { chcTests, updateChcTestResults, updateChcAssessment } = useChc();
  const { chcAssessments } = useChcAssessments();
  const navigation = useNavigation();
  const stickers = useStickers();

  // Auto-navigate from splash to home after 3 seconds
  useEffect(() => {
    if (navigation.currentScreen === 'splash') {
      const timer = setTimeout(() => {
        auth.authenticate();
        navigation.setCurrentScreen('home');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigation.currentScreen, auth, navigation]);

  // Handle parent mode switch with navigation
  const handleSwitchToParentMode = () => {
    auth.switchToParentMode();
    navigation.setCurrentScreen('home');
  };

  // Handle child mode switch with navigation
  const handleSwitchToChildMode = () => {
    auth.switchToChildMode();
    navigation.setCurrentScreen('game');
  };

  // Render authentication screens (splash, survey) if not authenticated
  if (!auth.isAuthenticated) {
    return (
      <AppContainer>
        <AuthScreens
          currentScreen={navigation.currentScreen}
          childName={childProfile.childName}
          setChildName={childProfile.setChildName}
          childGender={childProfile.childGender}
          setChildGender={childProfile.setChildGender}
          childAge={childProfile.childAge}
          setChildAge={childProfile.setChildAge}
        />
      </AppContainer>
    );
  }

  // Render child mode screens
  if (auth.appMode === 'child') {
    return (
      <AppContainer>
        <ChildModeScreens
          currentScreen={navigation.currentScreen}
          navigateTo={navigation.navigateTo}
          isParentMode={auth.isParentMode}
          setIsParentMode={auth.setIsParentMode}
          addSticker={stickers.addSticker}
          collectedStickers={stickers.collectedStickers}
          childName={childProfile.childName}
          profileData={childProfile.profileData}
          chcAssessments={chcAssessments}
          updateChcAssessment={updateChcAssessment}
          updateProfile={childProfile.updateProfile}
          requestParentAccess={auth.requestParentAccess}
        />
        <StickerNotification
          sticker={stickers.notification}
          onClose={stickers.clearNotification}
        />
        <PINInputModal
          isOpen={auth.showPINModal}
          onClose={auth.closePINModal}
          onSuccess={handleSwitchToParentMode}
        />
      </AppContainer>
    );
  }

  // Render parent mode screens
  return (
    <AppContainer>
      <ParentModeScreens
        currentScreen={navigation.currentScreen}
        navigateTo={navigation.navigateTo}
        isParentMode={auth.isParentMode}
        setIsParentMode={auth.setIsParentMode}
        addSticker={stickers.addSticker}
        collectedStickers={stickers.collectedStickers}
        childName={childProfile.childName}
        setChildName={childProfile.setChildName}
        childGender={childProfile.childGender}
        setChildGender={childProfile.setChildGender}
        childAge={childProfile.childAge}
        setChildAge={childProfile.setChildAge}
        profileData={childProfile.profileData}
        updateProfile={childProfile.updateProfile}
        chcTests={chcTests}
        chcAssessments={chcAssessments}
        updateChcTestResults={updateChcTestResults}
        updateChcAssessment={updateChcAssessment}
        selectedDoctor={navigation.selectedDoctor}
        switchToChildMode={handleSwitchToChildMode}
      />
      <StickerNotification
        sticker={stickers.notification}
        onClose={stickers.clearNotification}
      />
      <PINInputModal
        isOpen={auth.showPINModal}
        onClose={auth.closePINModal}
        onSuccess={handleSwitchToParentMode}
      />
    </AppContainer>
  );
}

// App Container Component
interface AppContainerProps {
  children: React.ReactNode;
}

function AppContainer({ children }: AppContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
        {children}
      </div>
    </div>
  );
}
