/**
 * useGameState - Hook untuk mengelola state game
 * 
 * Menyediakan state management yang konsisten untuk semua game.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { GameState, Difficulty, FeedbackType } from '../components/shared/types';

export interface UseGameStateOptions {
  maxLevel?: number;
  maxLives?: number;
  initialTimePerLevel?: number;
  onLevelComplete?: (level: number, score: number) => void;
  onGameComplete?: (finalScore: number, stats: GameStats) => void;
  onGameOver?: (score: number, level: number) => void;
}

export interface GameStats {
  totalTime: number;
  correctAnswers: number;
  errors: number;
  hintsUsed: number;
  accuracy: number;
  levelReached: number;
  averageResponseTime: number;
}

export interface UseGameStateReturn {
  // State
  state: GameState;
  isStarted: boolean;
  isCompleted: boolean;
  currentLevel: number;
  score: number;
  lives: number;
  timeLeft: number;
  hintsUsed: number;
  correctAnswers: number;
  errors: number;
  answerFeedback: FeedbackType;
  showHint: boolean;
  
  // Actions
  startGame: () => void;
  resetGame: () => void;
  nextLevel: () => void;
  addScore: (points: number) => void;
  loseLife: () => void;
  useHint: () => void;
  recordCorrectAnswer: () => void;
  recordError: () => void;
  setAnswerFeedback: (feedback: FeedbackType) => void;
  clearAnswerFeedback: () => void;
  completeGame: () => void;
  
  // Computed
  getDifficulty: () => Difficulty;
  getStats: () => GameStats;
}

export function useGameState(options: UseGameStateOptions = {}): UseGameStateReturn {
  const {
    maxLevel = 15,
    maxLives = 3,
    initialTimePerLevel = 30,
    onLevelComplete,
    onGameComplete,
    onGameOver,
  } = options;

  // Core state
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(maxLives);
  const [timeLeft, setTimeLeft] = useState(initialTimePerLevel);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [errors, setErrors] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState<FeedbackType>(null);
  const [showHint, setShowHint] = useState(false);

  // Refs for timing
  const startTimeRef = useRef<Date | null>(null);
  const responseTimes = useRef<number[]>([]);
  const lastQuestionTime = useRef<Date | null>(null);

  // Timer effect
  useEffect(() => {
    if (!isStarted || isCompleted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - lose a life
          setLives((l) => l - 1);
          return initialTimePerLevel;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isCompleted, initialTimePerLevel]);

  // Check for game over
  useEffect(() => {
    if (lives <= 0 && isStarted && !isCompleted) {
      onGameOver?.(score, currentLevel);
    }
  }, [lives, isStarted, isCompleted, score, currentLevel, onGameOver]);

  // Actions
  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsCompleted(false);
    setCurrentLevel(1);
    setScore(0);
    setLives(maxLives);
    setTimeLeft(initialTimePerLevel);
    setHintsUsed(0);
    setCorrectAnswers(0);
    setErrors(0);
    setAnswerFeedback(null);
    setShowHint(false);
    startTimeRef.current = new Date();
    responseTimes.current = [];
    lastQuestionTime.current = new Date();
  }, [maxLives, initialTimePerLevel]);

  const resetGame = useCallback(() => {
    setIsStarted(false);
    setIsCompleted(false);
    setCurrentLevel(1);
    setScore(0);
    setLives(maxLives);
    setTimeLeft(initialTimePerLevel);
    setHintsUsed(0);
    setCorrectAnswers(0);
    setErrors(0);
    setAnswerFeedback(null);
    setShowHint(false);
    startTimeRef.current = null;
    responseTimes.current = [];
  }, [maxLives, initialTimePerLevel]);

  const nextLevel = useCallback(() => {
    if (currentLevel >= maxLevel) {
      completeGame();
      return;
    }

    onLevelComplete?.(currentLevel, score);
    setCurrentLevel((prev) => prev + 1);
    setTimeLeft(initialTimePerLevel);
    setShowHint(false);
    setAnswerFeedback(null);
    lastQuestionTime.current = new Date();
  }, [currentLevel, maxLevel, score, initialTimePerLevel, onLevelComplete]);

  const addScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  const loseLife = useCallback(() => {
    setLives((prev) => Math.max(0, prev - 1));
  }, []);

  const useHint = useCallback(() => {
    if (!showHint) {
      setShowHint(true);
      setHintsUsed((prev) => prev + 1);
    }
  }, [showHint]);

  const recordCorrectAnswer = useCallback(() => {
    setCorrectAnswers((prev) => prev + 1);
    
    // Record response time
    if (lastQuestionTime.current) {
      const responseTime = new Date().getTime() - lastQuestionTime.current.getTime();
      responseTimes.current.push(responseTime);
    }
    lastQuestionTime.current = new Date();
  }, []);

  const recordError = useCallback(() => {
    setErrors((prev) => prev + 1);
  }, []);

  const clearAnswerFeedback = useCallback(() => {
    setAnswerFeedback(null);
  }, []);

  const completeGame = useCallback(() => {
    setIsCompleted(true);
    const stats = getStats();
    onGameComplete?.(score, stats);
  }, [score, onGameComplete]);

  // Computed
  const getDifficulty = useCallback((): Difficulty => {
    if (currentLevel <= 5) return 'easy';
    if (currentLevel <= 10) return 'medium';
    return 'hard';
  }, [currentLevel]);

  const getStats = useCallback((): GameStats => {
    const totalQuestions = correctAnswers + errors;
    const totalTime = startTimeRef.current
      ? Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000)
      : 0;
    const averageResponseTime =
      responseTimes.current.length > 0
        ? responseTimes.current.reduce((a, b) => a + b, 0) / responseTimes.current.length
        : 0;

    return {
      totalTime,
      correctAnswers,
      errors,
      hintsUsed,
      accuracy: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
      levelReached: currentLevel,
      averageResponseTime: Math.round(averageResponseTime),
    };
  }, [correctAnswers, errors, hintsUsed, currentLevel]);

  // Build state object
  const state: GameState = {
    isStarted,
    isCompleted,
    currentLevel,
    maxLevel,
    score,
    lives,
    maxLives,
    timeLeft,
    hintsUsed,
    correctAnswers,
    errors,
  };

  return {
    state,
    isStarted,
    isCompleted,
    currentLevel,
    score,
    lives,
    timeLeft,
    hintsUsed,
    correctAnswers,
    errors,
    answerFeedback,
    showHint,
    
    startGame,
    resetGame,
    nextLevel,
    addScore,
    loseLife,
    useHint,
    recordCorrectAnswer,
    recordError,
    setAnswerFeedback,
    clearAnswerFeedback,
    completeGame,
    
    getDifficulty,
    getStats,
  };
}

export default useGameState;
