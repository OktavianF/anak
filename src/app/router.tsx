/**
 * Application Router Configuration
 * Define all routes and navigation here
 */

export type ScreenName =
  | 'splash'
  | 'home'
  | 'cognitive-test'
  | 'test-room'
  | 'game'
  | 'memory-game'
  | 'word-puzzle-game'
  | 'number-sequence-game'
  | 'pattern-recognition-game'
  | 'motor-tips'
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

export interface NavigateFunction {
  (screen: ScreenName, data?: Record<string, unknown>): void;
}
