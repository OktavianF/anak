/**
 * Shared Types untuk Game Components
 * 
 * Tipe-tipe yang digunakan bersama di semua komponen game
 */

import type { ReactNode } from 'react';

// ============================================================================
// THEME & STYLING
// ============================================================================

export type GameTheme = 'purple' | 'blue' | 'green' | 'orange' | 'pink';

export interface ThemeColors {
  primary: string;       // from-color
  secondary: string;     // to-color
  accent: string;        // untuk highlight
  textMuted: string;     // untuk teks sekunder
  bgLight: string;       // background terang
}

export const GAME_THEMES: Record<GameTheme, ThemeColors> = {
  purple: {
    primary: 'purple-500',
    secondary: 'pink-600',
    accent: 'purple-400',
    textMuted: 'purple-100',
    bgLight: 'purple-50',
  },
  blue: {
    primary: 'blue-500',
    secondary: 'indigo-600',
    accent: 'blue-400',
    textMuted: 'blue-100',
    bgLight: 'blue-50',
  },
  green: {
    primary: 'emerald-500',
    secondary: 'teal-600',
    accent: 'emerald-400',
    textMuted: 'emerald-100',
    bgLight: 'emerald-50',
  },
  orange: {
    primary: 'orange-500',
    secondary: 'amber-600',
    accent: 'orange-400',
    textMuted: 'orange-100',
    bgLight: 'orange-50',
  },
  pink: {
    primary: 'pink-500',
    secondary: 'rose-600',
    accent: 'pink-400',
    textMuted: 'pink-100',
    bgLight: 'pink-50',
  },
};

// ============================================================================
// GAME STATE
// ============================================================================

export type Difficulty = 'easy' | 'medium' | 'hard';
export type FeedbackType = 'correct' | 'wrong' | null;

export interface GameState {
  isStarted: boolean;
  isCompleted: boolean;
  currentLevel: number;
  maxLevel: number;
  score: number;
  lives: number;
  maxLives: number;
  timeLeft: number;
  hintsUsed: number;
  correctAnswers: number;
  errors: number;
}

export interface GameStats {
  level: number;
  maxLevel: number;
  score: number;
  lives: number;
  maxLives: number;
  timeLeft?: number;
  showTimer?: boolean;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface BaseGameProps {
  navigateTo: (screen: string) => void;
  addSticker: (sticker: string) => void;
  updateGameAssessment: (gameType: string, sessionData: unknown) => void;
}

export interface GameLayoutProps {
  children: ReactNode;
  theme?: GameTheme;
}

export interface GameHeaderProps {
  title: string;
  theme?: GameTheme;
  onBack: () => void;
  onReset: () => void;
  showReset?: boolean;
}

export interface GameStatsProps extends GameStats {
  theme?: GameTheme;
}

export interface GameStartScreenProps {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  theme?: GameTheme;
  features?: GameFeature[];
  levelInfo?: LevelInfo[];
  onStart: () => void;
  onBack: () => void;
  buttonText?: string;
}

export interface GameFeature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface LevelInfo {
  range: string;
  label: string;
  description: string;
  color: 'green' | 'yellow' | 'red';
}

export interface GameCompletionScreenProps {
  title: string;
  message: string;
  score: number;
  stats: CompletionStat[];
  theme?: GameTheme;
  stickerEarned?: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export interface CompletionStat {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

export interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: 'sm' | 'md' | 'lg';
}

export interface LivesIndicatorProps {
  current: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface TimerDisplayProps {
  timeLeft: number;
  theme?: GameTheme;
  warning?: number; // Show warning when time is below this
  size?: 'sm' | 'md' | 'lg';
}

export interface HintButtonProps {
  isActive: boolean;
  onUseHint: () => void;
  disabled?: boolean;
}

export interface AnswerFeedbackProps {
  type: FeedbackType;
  correctMessage?: string;
  wrongMessage?: string;
  show?: boolean;
}

export interface ChoiceButtonProps<T> {
  value: T;
  isSelected: boolean;
  feedbackType: FeedbackType;
  onClick: (value: T) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

// ============================================================================
// ASSESSMENT TYPES
// ============================================================================

export interface GameSessionData {
  accuracy: number;
  totalTime: number;
  averageResponseTime: number;
  hintsUsed: number;
  errors: number;
  correctAnswers: number;
  totalQuestions: number;
  levelReached: number;
  maxLevel: number;
  difficulty: Difficulty;
}

export interface AssessmentResult {
  domain: 'Gf' | 'Gv' | 'Gsm';
  score: number;
  percentile: number;
  level: 'rendah' | 'sedang' | 'tinggi';
  recommendations: string[];
}
