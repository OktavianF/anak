import { useCallback, useRef } from 'react';
import {
  ChcDomain,
  GAME_TO_CHC_MAPPING,
  DOMAIN_SCORE_WEIGHTS,
  GameAssessmentResult,
  BaseAssessmentParams,
  FluidReasoningParams,
  VisualProcessingParams,
  WorkingMemoryParams,
} from '../types/assessmentParams';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Normalize nilai ke range 0-100
 */
function normalizeScore(value: number, min: number, max: number, inverse = false): number {
  const normalized = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return inverse ? 100 - normalized : normalized;
}

/**
 * Get development level berdasarkan skor
 */
function getDevelopmentLevel(score: number): GameAssessmentResult['developmentLevel'] {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'above';
  if (score >= 50) return 'average';
  return 'below';
}

/**
 * Get star rating (1-5) berdasarkan skor
 */
function getStarRating(score: number): number {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  return 1;
}

/**
 * Generate feedback untuk anak berdasarkan skor (4 domain)
 */
function generateChildFeedback(score: number, domain: ChcDomain): string {
  const feedbackMap: Record<ChcDomain, Record<string, string>> = {
    Gf: {
      excellent: '🌟 Wah hebat! Kamu sangat pintar menemukan pola-pola tersembunyi!',
      above: '👏 Bagus sekali! Kamu pandai menyelesaikan teka-teki!',
      average: '😊 Kerja bagus! Terus berlatih ya supaya makin jago!',
      below: '💪 Ayo semangat! Pasti bisa lebih baik lagi!',
    },
    Gv: {
      excellent: '🌟 Matamu sangat jeli! Kamu ahli dalam melihat detail!',
      above: '👏 Bagus sekali! Kamu pandai menyusun gambar!',
      average: '😊 Kerja bagus! Terus latih matamu ya!',
      below: '💪 Ayo perhatikan lebih teliti lagi!',
    },
    Gsm: {
      excellent: '🌟 Wah ingatanmu super! Kamu bisa mengingat banyak hal!',
      above: '👏 Hebat! Memori kamu sangat bagus!',
      average: '😊 Bagus! Terus latih daya ingatmu ya!',
      below: '💪 Ayo konsentrasi dan ingat lebih baik!',
    },
  };

  const level = getDevelopmentLevel(score);
  return feedbackMap[domain]?.[level] || '😊 Kerja bagus!';
}

/**
 * Generate rekomendasi untuk orang tua (4 domain)
 */
function generateParentRecommendation(
  score: number,
  domain: ChcDomain,
  params: Partial<BaseAssessmentParams>
): string {
  const level = getDevelopmentLevel(score);
  
  const recommendations: Record<ChcDomain, Record<string, string>> = {
    Gf: {
      excellent: 'Anak menunjukkan kemampuan penalaran yang sangat baik. Berikan tantangan pola yang lebih kompleks.',
      above: 'Kemampuan penalaran di atas rata-rata. Lanjutkan dengan puzzle dan teka-teki logika.',
      average: 'Penalaran berkembang sesuai usia. Latih dengan permainan pola sederhana secara rutin.',
      below: 'Perlu latihan lebih untuk penalaran. Mulai dengan pola sederhana dan berikan banyak contoh.',
    },
    Gv: {
      excellent: 'Kemampuan visual sangat baik. Berikan puzzle dan aktivitas konstruksi yang lebih kompleks.',
      above: 'Pemrosesan visual bagus. Lanjutkan dengan aktivitas menggambar dan menyusun.',
      average: 'Kemampuan visual berkembang normal. Latih dengan puzzle dan permainan bentuk.',
      below: 'Perlu latihan visual lebih. Mulai dengan puzzle sederhana dengan potongan besar.',
    },
    Gsm: {
      excellent: 'Memori kerja sangat baik. Berikan tantangan mengingat yang lebih panjang.',
      above: 'Memori berkembang bagus. Lanjutkan dengan permainan ingatan secara rutin.',
      average: 'Memori sesuai perkembangan usia. Latih dengan permainan kartu memori sederhana.',
      below: 'Perlu latihan memori. Mulai dengan 2-3 item dan tingkatkan bertahap.',
    },
  };

  let recommendation = recommendations[domain]?.[level] || '';
  
  // Tambahkan insight spesifik berdasarkan params
  if (params.errors && params.errors > 3) {
    recommendation += ' Perhatikan jumlah kesalahan - mungkin perlu lebih fokus.';
  }
  if (params.completionTime && params.completionTime > 180) {
    recommendation += ' Waktu penyelesaian cukup lama - latih secara bertahap.';
  }

  return recommendation;
}

// ============================================
// SCORE CALCULATORS PER DOMAIN (4 Domain)
// ============================================

function calculateFluidReasoningScore(params: Partial<FluidReasoningParams>): Record<string, number> {
  const scores: Record<string, number> = {};
  
  // Accuracy (0-100)
  scores.accuracy = params.accuracy ?? 0;
  
  // Time score (faster = better, max 300 seconds expected)
  scores.completionTime = normalizeScore(params.completionTime ?? 300, 300, 30, true);
  
  // Complexity level (assuming max 10 levels)
  scores.complexityLevel = normalizeScore(params.complexityLevel ?? 1, 1, 10);
  
  // Hint usage (less = better, max 5 hints)
  scores.hintUsage = normalizeScore(params.hintUsage ?? 5, 5, 0, true);
  
  // Pattern recognition score
  scores.patternRecognitionScore = params.patternRecognitionScore ?? 0;
  
  return scores;
}

function calculateVisualScore(params: Partial<VisualProcessingParams>): Record<string, number> {
  const scores: Record<string, number> = {};
  
  scores.accuracy = params.accuracy ?? 0;
  scores.completionTime = normalizeScore(params.completionTime ?? 300, 300, 30, true);
  // Tap precision (lower pixel deviation = better)
  scores.tapPrecision = normalizeScore(params.tapPrecision ?? 50, 50, 5, true);
  scores.movementEfficiency = params.movementEfficiency ?? 0;
  scores.rotationAccuracy = params.rotationAccuracy ?? 0;
  
  return scores;
}

function calculateWorkingMemoryScore(params: Partial<WorkingMemoryParams>): Record<string, number> {
  const scores: Record<string, number> = {};
  
  scores.accuracy = params.accuracy ?? 0;
  // Memory capacity (assuming max 12 items for children)
  scores.memoryCapacity = normalizeScore(params.memoryCapacity ?? 2, 2, 12);
  scores.sequenceAccuracy = params.sequenceAccuracy ?? 0;
  // Recall delay (faster = better, max 5000ms)
  scores.recallDelay = normalizeScore(params.recallDelay ?? 5000, 5000, 500, true);
  // Longest streak
  scores.longestStreak = normalizeScore(params.longestStreak ?? 0, 0, 10);
  
  return scores;
}

// ============================================
// MAIN HOOK
// ============================================

export function useGameAssessment() {
  const sessionStartTime = useRef<number>(Date.now());

  /**
   * Reset session timer
   */
  const startSession = useCallback(() => {
    sessionStartTime.current = Date.now();
  }, []);

  /**
   * Calculate final assessment dari raw game data
   */
  const calculateAssessment = useCallback((
    gameType: string,
    rawParams: Record<string, unknown>
  ): GameAssessmentResult => {
    const domain = GAME_TO_CHC_MAPPING[gameType] || 'Gf';
    const weights = DOMAIN_SCORE_WEIGHTS[domain];

    // Helper to safely get number values
    const getNumber = (value: unknown, fallback = 0): number => {
      if (typeof value === 'number') return value;
      return fallback;
    };

    const getString = (value: unknown, fallback = ''): string => {
      if (typeof value === 'string') return value;
      return fallback;
    };

    // Calculate base params
    const baseParams: Partial<BaseAssessmentParams> = {
      accuracy: getNumber(rawParams.accuracy) || (getNumber(rawParams.correctAnswers) && getNumber(rawParams.totalQuestions)
        ? (getNumber(rawParams.correctAnswers) / getNumber(rawParams.totalQuestions)) * 100
        : getNumber(rawParams.score)),
      completionTime: getNumber(rawParams.completionTime) || getNumber(rawParams.timeSpent) || getNumber(rawParams.gameTime),
      errors: getNumber(rawParams.errors),
      attempts: getNumber(rawParams.attempts) || getNumber(rawParams.moves) || 1,
      timestamp: new Date().toISOString(),
      difficulty: (getString(rawParams.difficulty) || 'easy') as 'easy' | 'medium' | 'hard',
    };

    // Calculate domain-specific scores (4 domains only)
    let scoreBreakdown: Record<string, number>;
    
    switch (domain) {
      case 'Gf':
        scoreBreakdown = calculateFluidReasoningScore({
          ...baseParams,
          complexityLevel: getNumber(rawParams.level) || getNumber(rawParams.complexityLevel) || 1,
          hintUsage: getNumber(rawParams.hintsUsed) || getNumber(rawParams.hintUsage),
          patternRecognitionScore: getNumber(rawParams.patternRecognitionScore) || baseParams.accuracy || 0,
          consecutiveCorrect: getNumber(rawParams.consecutiveCorrect) || getNumber(rawParams.correctAnswers),
          averageTimePerProblem: getNumber(rawParams.averageTimePerProblem) || 
            (baseParams.completionTime! / Math.max(1, getNumber(rawParams.totalQuestions) || 1)),
        } as FluidReasoningParams);
        break;
        
      case 'Gv':
        scoreBreakdown = calculateVisualScore({
          ...baseParams,
          tapPrecision: getNumber(rawParams.tapPrecision, 20),
          rotationAccuracy: getNumber(rawParams.rotationAccuracy) || baseParams.accuracy || 0,
          visualScanTime: getNumber(rawParams.visualScanTime, 1000),
          movesCount: getNumber(rawParams.moves) || getNumber(rawParams.movesCount),
          movementEfficiency: getNumber(rawParams.movementEfficiency) || 
            Math.min(100, (getNumber(rawParams.optimalMoves) || getNumber(rawParams.moves) || 1) / 
              Math.max(1, getNumber(rawParams.moves) || 1) * 100),
        } as VisualProcessingParams);
        break;
        
      case 'Gsm':
        scoreBreakdown = calculateWorkingMemoryScore({
          ...baseParams,
          memoryCapacity: getNumber(rawParams.memoryCapacity) || getNumber(rawParams.matchedPairs, 3),
          sequenceAccuracy: getNumber(rawParams.sequenceAccuracy) || baseParams.accuracy || 0,
          recallDelay: getNumber(rawParams.recallDelay, 1000),
          orderErrors: getNumber(rawParams.orderErrors),
          itemErrors: getNumber(rawParams.itemErrors) || baseParams.errors,
          longestStreak: getNumber(rawParams.longestStreak) || getNumber(rawParams.bestStreak) || getNumber(rawParams.streak),
          maxCombo: getNumber(rawParams.maxCombo) || getNumber(rawParams.comboMultiplier, 1),
        } as WorkingMemoryParams);
        break;
        
      default:
        // Fallback ke Gf jika domain tidak dikenal
        scoreBreakdown = calculateFluidReasoningScore({
          ...baseParams,
          complexityLevel: 1,
          hintUsage: 0,
          patternRecognitionScore: baseParams.accuracy || 0,
          consecutiveCorrect: 0,
          averageTimePerProblem: baseParams.completionTime || 0,
        } as FluidReasoningParams);
    }

    // Calculate weighted final score
    let finalScore = 0;
    let totalWeight = 0;
    
    for (const [key, weight] of Object.entries(weights)) {
      if (scoreBreakdown[key] !== undefined) {
        finalScore += scoreBreakdown[key] * weight;
        totalWeight += weight;
      }
    }
    
    // Normalize jika total weight < 1
    if (totalWeight > 0 && totalWeight < 1) {
      finalScore = finalScore / totalWeight;
    }
    
    finalScore = Math.round(Math.max(0, Math.min(100, finalScore)));

    const result: GameAssessmentResult = {
      gameType,
      domain,
      finalScore,
      starRating: getStarRating(finalScore),
      params: { ...baseParams, ...rawParams } as Partial<GameAssessmentResult['params']>,
      scoreBreakdown,
      feedback: generateChildFeedback(finalScore, domain),
      parentRecommendation: generateParentRecommendation(finalScore, domain, baseParams),
      developmentLevel: getDevelopmentLevel(finalScore),
      timestamp: new Date().toISOString(),
    };

    return result;
  }, []);

  /**
   * Quick score calculation untuk backward compatibility
   */
  const calculateQuickScore = useCallback((
    gameType: string,
    score: number,
    timeSpent: number,
    errors: number,
    difficulty: 'easy' | 'medium' | 'hard' = 'easy'
  ): number => {
    const result = calculateAssessment(gameType, {
      accuracy: score,
      completionTime: timeSpent,
      errors,
      difficulty,
    });
    return result.finalScore;
  }, [calculateAssessment]);

  return {
    startSession,
    calculateAssessment,
    calculateQuickScore,
    getDevelopmentLevel,
    getStarRating,
    generateChildFeedback,
    generateParentRecommendation,
  };
}

export default useGameAssessment;
