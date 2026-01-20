import { useState, useCallback } from 'react';
import { AppMode } from '../types/app';

export function useAuth() {
  const [appMode, setAppMode] = useState<AppMode>('child');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isParentMode, setIsParentMode] = useState(false);
  const [showPINModal, setShowPINModal] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const switchToParentMode = useCallback(() => {
    setAppMode('parent');
    setIsParentMode(true);
    setShowPINModal(false);
  }, []);

  const switchToChildMode = useCallback(() => {
    setAppMode('child');
    setIsParentMode(false);
  }, []);

  const requestParentAccess = useCallback(() => {
    setShowPINModal(true);
  }, []);

  const closePINModal = useCallback(() => {
    setShowPINModal(false);
  }, []);

  const authenticate = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const completeFirstTimeSetup = useCallback(() => {
    setIsFirstTime(false);
    setIsAuthenticated(true);
    setAppMode('parent');
    setIsParentMode(true);
  }, []);

  return {
    appMode,
    isAuthenticated,
    isParentMode,
    showPINModal,
    isFirstTime,
    setIsParentMode,
    switchToParentMode,
    switchToChildMode,
    requestParentAccess,
    closePINModal,
    authenticate,
    completeFirstTimeSetup,
  };
}
