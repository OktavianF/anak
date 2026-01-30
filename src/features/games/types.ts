// Games feature types
export interface GameSession {
  gameType: string;
  score: number;
  duration: number;
  level: number;
  completedAt: string;
}

export interface GameProgress {
  totalPlayed: number;
  highScore: number;
  averageScore: number;
  currentLevel: number;
}

export type GameType = 
  | 'memory'
  | 'wordPuzzle'
  | 'numberSequence'
  | 'patternRecognition'
  | 'puzzle'
  | 'coloring';

// Re-export assessment types
export * from './types/assessmentParams';