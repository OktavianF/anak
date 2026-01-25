// App-wide type definitions
// Re-export CHC types from hook for convenience
export type {
  ChcDomainKey,
  ChcTestResult,
  ChcState,
} from '../hooks/useChc';

export type AppMode = 'child' | 'parent';

export type ScreenName =
  | 'splash'
  | 'survey'
  | 'home'
  | 'game'
  | 'memory-game'
  | 'word-puzzle-game'
  | 'number-sequence-game'
  | 'pattern-recognition-game'
  | 'motor-test-game'
  | 'progress'
  | 'profile'
  | 'stickers'
  | 'consultation'
  | 'doctor-list'
  | 'doctor-detail'
  | 'payment'
  | 'chat'
  | 'parent-guide'
  | 'community'
  | 'child-assessment'
  | 'child-profile';

export interface ProfileData {
  avatar: string;
  backgroundColor: string;
  favoriteColor: string;
  badges: string[];
}

export interface Doctor {
  id?: string;
  name?: string;
  specialty?: string;
  rating?: number;
  price?: number;
  [key: string]: unknown;
}

export interface NavigateFunction {
  (screen: string, data?: Record<string, unknown>): void;
}

export interface CommonScreenProps {
  navigateTo: NavigateFunction;
  isParentMode: boolean;
  setIsParentMode: (value: boolean) => void;
  addSticker: (stickerId: string) => void;
  collectedStickers: string[];
}
