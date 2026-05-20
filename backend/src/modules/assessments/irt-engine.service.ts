/**
 * IRT Engine Service - CHC Assessment Calculation
 * 
 * Implements weighted scoring per CHC domain using IRT-inspired (Rasch model)
 * approach for calculating child cognitive development scores.
 * 
 * Domains:
 * - Gf (Fluid Reasoning): Logic, pattern recognition, problem solving
 * - Gv (Visual Processing): Visual-spatial processing, precision
 * - Gsm (Working Memory): Short-term memory, sequence recall
 */

// ==================== TYPES ====================

export interface TelemetryInput {
  accuracy: number;
  completionTime: number;
  errors: number;
  attempts: number;
  hintsUsed?: number;
  consecutiveCorrect?: number;
  // Gf
  complexityLevel?: number;
  patternRecognitionScore?: number;
  averageTimePerProblem?: number;
  // Gv
  tapPrecision?: number;
  rotationAccuracy?: number;
  visualScanTime?: number;
  movesCount?: number;
  movementEfficiency?: number;
  // Gsm
  memoryCapacity?: number;
  sequenceAccuracy?: number;
  recallDelay?: number;
  orderErrors?: number;
  itemErrors?: number;
  longestStreak?: number;
  maxCombo?: number;
}

export type ChcDomain = 'Gf' | 'Gv' | 'Gsm';
export type DevelopmentLevel = 'BELOW' | 'AVERAGE' | 'ABOVE' | 'EXCELLENT';

export interface AssessmentOutput {
  finalScore: number;
  starRating: number;
  developmentLevel: DevelopmentLevel;
  scoreBreakdown: Record<string, number>;
  feedback: string;
  parentRecommendation: string;
}

// ==================== WEIGHTS ====================

const GF_WEIGHTS = {
  accuracy: 0.35,
  completionTime: 0.20,
  complexityLevel: 0.25,
  hintUsage: 0.10,
  patternRecognition: 0.10,
};

const GV_WEIGHTS = {
  accuracy: 0.30,
  completionTime: 0.20,
  tapPrecision: 0.20,
  movementEfficiency: 0.15,
  rotationAccuracy: 0.15,
};

const GSM_WEIGHTS = {
  accuracy: 0.25,
  memoryCapacity: 0.30,
  sequenceAccuracy: 0.25,
  recallDelay: 0.10,
  longestStreak: 0.10,
};

// ==================== NORMALIZATION HELPERS ====================

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

/** Normalize time score: faster = better, with expected time baseline */
function normalizeTimeScore(time: number, expectedTime: number): number {
  if (time <= 0) return 100;
  const ratio = expectedTime / time;
  return clamp(ratio * 100);
}

/** Normalize hint usage: fewer hints = higher score */
function normalizeHintScore(hintsUsed: number, maxHints = 5): number {
  return clamp((1 - hintsUsed / maxHints) * 100);
}

/** Normalize memory capacity: scale 1-10 to 0-100 */
function normalizeCapacity(capacity: number, maxCapacity = 10): number {
  return clamp((capacity / maxCapacity) * 100);
}

/** Normalize streak: scale based on expected max */
function normalizeStreak(streak: number, maxStreak = 15): number {
  return clamp((streak / maxStreak) * 100);
}

// ==================== DOMAIN CALCULATORS ====================

function calculateGfScore(telemetry: TelemetryInput): { score: number; breakdown: Record<string, number> } {
  const accuracyScore = clamp(telemetry.accuracy);
  const timeScore = normalizeTimeScore(telemetry.completionTime, 120);
  const complexityScore = clamp((telemetry.complexityLevel || 1) * 12.5); // scale 1-8 to ~12.5-100
  const hintScore = normalizeHintScore(telemetry.hintsUsed || 0);
  const patternScore = clamp(telemetry.patternRecognitionScore || telemetry.accuracy);

  const breakdown = {
    accuracy: accuracyScore,
    completionTime: timeScore,
    complexityLevel: complexityScore,
    hintUsage: hintScore,
    patternRecognition: patternScore,
  };

  const score =
    accuracyScore * GF_WEIGHTS.accuracy +
    timeScore * GF_WEIGHTS.completionTime +
    complexityScore * GF_WEIGHTS.complexityLevel +
    hintScore * GF_WEIGHTS.hintUsage +
    patternScore * GF_WEIGHTS.patternRecognition;

  return { score: clamp(score), breakdown };
}

function calculateGvScore(telemetry: TelemetryInput): { score: number; breakdown: Record<string, number> } {
  const accuracyScore = clamp(telemetry.accuracy);
  const timeScore = normalizeTimeScore(telemetry.completionTime, 180);
  const precisionScore = clamp(telemetry.tapPrecision || telemetry.accuracy);
  const efficiencyScore = clamp((telemetry.movementEfficiency || 0.7) * 100);
  const rotationScore = clamp(telemetry.rotationAccuracy || telemetry.accuracy);

  const breakdown = {
    accuracy: accuracyScore,
    completionTime: timeScore,
    tapPrecision: precisionScore,
    movementEfficiency: efficiencyScore,
    rotationAccuracy: rotationScore,
  };

  const score =
    accuracyScore * GV_WEIGHTS.accuracy +
    timeScore * GV_WEIGHTS.completionTime +
    precisionScore * GV_WEIGHTS.tapPrecision +
    efficiencyScore * GV_WEIGHTS.movementEfficiency +
    rotationScore * GV_WEIGHTS.rotationAccuracy;

  return { score: clamp(score), breakdown };
}

function calculateGsmScore(telemetry: TelemetryInput): { score: number; breakdown: Record<string, number> } {
  const accuracyScore = clamp(telemetry.accuracy);
  const capacityScore = normalizeCapacity(telemetry.memoryCapacity || 5);
  const sequenceScore = clamp(telemetry.sequenceAccuracy || telemetry.accuracy);
  const delayScore = normalizeTimeScore(telemetry.recallDelay || 2, 5);
  const streakScore = normalizeStreak(telemetry.longestStreak || 3);

  const breakdown = {
    accuracy: accuracyScore,
    memoryCapacity: capacityScore,
    sequenceAccuracy: sequenceScore,
    recallDelay: delayScore,
    longestStreak: streakScore,
  };

  const score =
    accuracyScore * GSM_WEIGHTS.accuracy +
    capacityScore * GSM_WEIGHTS.memoryCapacity +
    sequenceScore * GSM_WEIGHTS.sequenceAccuracy +
    delayScore * GSM_WEIGHTS.recallDelay +
    streakScore * GSM_WEIGHTS.longestStreak;

  return { score: clamp(score), breakdown };
}

// ==================== CLASSIFICATION ====================

function classifyDevelopmentLevel(score: number): DevelopmentLevel {
  if (score >= 85) return 'EXCELLENT';
  if (score >= 70) return 'ABOVE';
  if (score >= 50) return 'AVERAGE';
  return 'BELOW';
}

function calculateStarRating(score: number): number {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  return 1;
}

// ==================== FEEDBACK ====================

const FEEDBACK_MAP: Record<ChcDomain, Record<DevelopmentLevel, string>> = {
  Gf: {
    EXCELLENT: '🌟 Luar biasa! Kamu sangat pintar menyelesaikan teka-teki dan menemukan pola!',
    ABOVE: '🧩 Bagus sekali! Kemampuan berpikirmu sudah sangat berkembang!',
    AVERAGE: '💪 Kerja bagus! Terus latihan ya, kamu pasti makin pintar!',
    BELOW: '🤗 Jangan menyerah! Ayo coba lagi pelan-pelan, kamu pasti bisa!',
  },
  Gv: {
    EXCELLENT: '🌟 Matamu sangat jeli! Kamu hebat dalam melihat detail dan menyusun gambar!',
    ABOVE: '👁️ Bagus! Kamu pandai mengenali bentuk dan warna!',
    AVERAGE: '🎨 Terus berlatih ya! Matamu akan semakin tajam!',
    BELOW: '🤗 Ayo coba lagi! Perhatikan gambar dengan lebih teliti ya!',
  },
  Gsm: {
    EXCELLENT: '🌟 Memorimu luar biasa! Kamu bisa mengingat banyak hal sekaligus!',
    ABOVE: '🧠 Hebat! Daya ingatmu sudah sangat bagus!',
    AVERAGE: '💪 Bagus! Terus latih ingatanmu dengan bermain memory game!',
    BELOW: '🤗 Jangan khawatir! Coba ingat pelan-pelan, sedikit demi sedikit ya!',
  },
};

const RECOMMENDATION_MAP: Record<ChcDomain, Record<DevelopmentLevel, string>> = {
  Gf: {
    EXCELLENT: 'Kemampuan penalaran anak sangat baik. Berikan tantangan puzzle yang lebih kompleks dan permainan strategi.',
    ABOVE: 'Penalaran berkembang baik. Lanjutkan dengan teka-teki logika dan permainan urutan angka.',
    AVERAGE: 'Penalaran cukup baik. Stimulasi dengan puzzle sederhana, permainan pola, dan tanya-jawab logis.',
    BELOW: 'Perlu stimulasi penalaran lebih. Mulai dari puzzle dasar, sorting warna/bentuk, dan permainan sebab-akibat.',
  },
  Gv: {
    EXCELLENT: 'Pemrosesan visual sangat baik. Coba aktivitas menggambar detail, LEGO kompleks, dan labirin.',
    ABOVE: 'Visual processing bagus. Lanjutkan dengan puzzle, mewarnai, dan find-the-difference.',
    AVERAGE: 'Cukup baik. Stimulasi dengan menyusun balok, mencocokkan bentuk, dan mewarnai.',
    BELOW: 'Perlu stimulasi visual lebih. Mulai dari mencocokkan warna dasar, menyortir bentuk, dan tracing garis.',
  },
  Gsm: {
    EXCELLENT: 'Memori kerja sangat baik! Berikan tantangan ingatan lebih panjang dan permainan multi-step.',
    ABOVE: 'Memori berkembang bagus. Lanjutkan dengan memory card, Simon Says, dan menghafal urutan.',
    AVERAGE: 'Memori cukup baik. Latih dengan permainan ingatan sederhana secara rutin.',
    BELOW: 'Perlu latihan memori. Mulai dari mengingat 2-3 item, lalu tambah bertahap. Gunakan lagu dan cerita.',
  },
};

// ==================== MAIN ENGINE ====================

export function calculateAssessment(domain: ChcDomain, telemetry: TelemetryInput): AssessmentOutput {
  let result: { score: number; breakdown: Record<string, number> };

  switch (domain) {
    case 'Gf':
      result = calculateGfScore(telemetry);
      break;
    case 'Gv':
      result = calculateGvScore(telemetry);
      break;
    case 'Gsm':
      result = calculateGsmScore(telemetry);
      break;
  }

  const developmentLevel = classifyDevelopmentLevel(result.score);
  const starRating = calculateStarRating(result.score);
  const feedback = FEEDBACK_MAP[domain][developmentLevel];
  const parentRecommendation = RECOMMENDATION_MAP[domain][developmentLevel];

  return {
    finalScore: Math.round(result.score * 100) / 100,
    starRating,
    developmentLevel,
    scoreBreakdown: result.breakdown,
    feedback,
    parentRecommendation,
  };
}

/** Determine next difficulty based on cumulative scores */
export function getAdaptiveDifficulty(recentScores: number[]): 'EASY' | 'MEDIUM' | 'HARD' {
  if (recentScores.length === 0) return 'EASY';
  const avg = recentScores.reduce((sum, s) => sum + s, 0) / recentScores.length;
  if (avg >= 71) return 'HARD';
  if (avg >= 41) return 'MEDIUM';
  return 'EASY';
}
