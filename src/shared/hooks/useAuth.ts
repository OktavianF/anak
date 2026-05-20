import { useAuthStore } from '../../store/authStore';

export function useAuth() {
  const store = useAuthStore();
  
  return {
    appMode: store.appMode,
    isAuthenticated: store.isAuthenticated,
    isParentMode: store.isParentMode,
    showPINModal: store.showPINModal,
    setIsParentMode: (mode: boolean) => store.setAppMode(mode ? 'parent' : 'child'),
    switchToParentMode: () => store.setAppMode('parent'),
    switchToChildMode: () => store.setAppMode('child'),
    requestParentAccess: () => store.setShowPINModal(true),
    closePINModal: () => store.setShowPINModal(false),
    authenticate: () => {}, // Handled by login now
    completeFirstTimeSetup: () => {}, 
    // Add real methods
    login: store.login,
    logout: store.logout,
    verifyPIN: store.verifyPIN,
    user: store.user,
    fetchProfile: store.fetchProfile,
  };
}
