/**
 * CHC-Based Game Assessment Parameters
 * 
 * Parameter penilaian untuk 3 domain CHC utama yang diukur:
 * - Gf  (Fluid Reasoning)    - Penalaran Logis
 * - Gv  (Visual Processing)  - Pemrosesan Visual
 * - Gsm (Working Memory)     - Memori Kerja
 */

// ============================================
// BASE TYPES
// ============================================

/**
 * Parameter dasar yang ada di semua game
 */
export interface BaseAssessmentParams {
  /** Persentase akurasi jawaban benar (0-100) */
  accuracy: number;
  /** Waktu penyelesaian dalam detik */
  completionTime: number;
  /** Jumlah kesalahan */
  errors: number;
  /** Jumlah percobaan */
  attempts: number;
  /** Timestamp session */
  timestamp: string;
  /** Level kesulitan */
  difficulty: 'easy' | 'medium' | 'hard';
}

// ============================================
// DOMAIN-SPECIFIC PARAMETERS (4 Domain)
// ============================================

/**
 * Fluid Reasoning (Gf) - Penalaran Logis
 * Games: Pattern Recognition, Number Sequence, Logic Puzzles
 * 
 * Mengukur kemampuan:
 * - Mengenali pola baru
 * - Penalaran induktif & deduktif
 * - Problem-solving tanpa pengetahuan prior
 */
export interface FluidReasoningParams extends BaseAssessmentParams {
  /** Level kompleksitas tertinggi yang dicapai */
  complexityLevel: number;
  /** Berapa kali menggunakan hint/bantuan */
  hintUsage: number;
  /** Skor pengenalan pola (0-100) */
  patternRecognitionScore: number;
  /** Jumlah langkah yang benar berurutan */
  consecutiveCorrect: number;
  /** Waktu rata-rata per soal (detik) */
  averageTimePerProblem: number;
}

/**
 * Visual Processing (Gv) - Pemrosesan Visual
 * Games: Puzzle, Coloring, Find Difference, Tangram
 * 
 * Mengukur kemampuan:
 * - Ketepatan visual
 * - Rotasi mental
 * - Visualisasi spasial
 */
export interface VisualProcessingParams extends BaseAssessmentParams {
  /** Presisi sentuhan/gerakan dalam pixel dari target */
  tapPrecision: number;
  /** Akurasi rotasi mental (0-100) */
  rotationAccuracy: number;
  /** Waktu scanning visual rata-rata (ms) */
  visualScanTime: number;
  /** Jumlah gerakan yang dilakukan */
  movesCount: number;
  /** Efisiensi gerakan (optimal vs actual) */
  movementEfficiency: number;
}

/**
 * Working Memory (Gsm) - Memori Kerja
 * Games: Memory Card, Simon Says, Sequence Recall
 * 
 * Mengukur kemampuan:
 * - Kapasitas memori jangka pendek
 * - Akurasi urutan
 * - Kecepatan recall
 */
export interface WorkingMemoryParams extends BaseAssessmentParams {
  /** Jumlah item maksimal yang berhasil diingat */
  memoryCapacity: number;
  /** Akurasi urutan (0-100) */
  sequenceAccuracy: number;
  /** Delay sebelum recall (ms) */
  recallDelay: number;
  /** Kesalahan urutan (salah posisi) */
  orderErrors: number;
  /** Kesalahan item (salah isi) */
  itemErrors: number;
  /** Streak terpanjang (matches berturut-turut) */
  longestStreak: number;
  /** Combo multiplier tertinggi */
  maxCombo: number;
}

// ============================================
// UNION TYPES & MAPPINGS
// ============================================

/** 3 Domain CHC yang didukung */
export type ChcDomain = 
  | 'Gf'   // Fluid Reasoning - Penalaran Logis
  | 'Gv'   // Visual Processing - Pemrosesan Visual
  | 'Gsm'; // Working Memory - Memori Kerja

/** Domain info untuk display */
export const CHC_DOMAIN_INFO: Record<ChcDomain, { name: string; description: string; icon: string }> = {
  Gf: {
    name: 'Penalaran Logis',
    description: 'Kemampuan memecahkan masalah baru dan mengenali pola',
    icon: '🧩',
  },
  Gv: {
    name: 'Pemrosesan Visual',
    description: 'Kemampuan memproses dan memanipulasi informasi visual',
    icon: '👁️',
  },
  Gsm: {
    name: 'Memori Kerja',
    description: 'Kemampuan menyimpan dan menggunakan informasi jangka pendek',
    icon: '🧠',
  },
};

export type DomainAssessmentParams =
  | { domain: 'Gf'; params: FluidReasoningParams }
  | { domain: 'Gv'; params: VisualProcessingParams }
  | { domain: 'Gsm'; params: WorkingMemoryParams };

/** Mapping game type ke CHC domain */
export const GAME_TO_CHC_MAPPING: Record<string, ChcDomain> = {
  // Fluid Reasoning (Gf) - Penalaran Logis
  patternRecognition: 'Gf',
  numberSequence: 'Gf',
  logicPuzzle: 'Gf',
  
  // Visual Processing (Gv) - Pemrosesan Visual
  puzzle: 'Gv',
  coloring: 'Gv',
  findDifference: 'Gv',
  tangram: 'Gv',
  
  // Working Memory (Gsm) - Memori Kerja
  memory: 'Gsm',
  simonSays: 'Gsm',
  sequenceRecall: 'Gsm',
  speedMatching: 'Gsm', // Remap dari Gs
  quickTap: 'Gsm',      // Remap dari Gs
  sortingRace: 'Gsm',   // Remap dari Gs
  
  // Fallback untuk game yang belum di-mapping (default ke Gf)
  wordPuzzle: 'Gf', // WordPuzzle menggunakan Gf (Fluid Reasoning)
};

/** Weight untuk kalkulasi skor per domain */
export const DOMAIN_SCORE_WEIGHTS: Record<ChcDomain, Record<string, number>> = {
  Gf: {
    accuracy: 0.35,
    completionTime: 0.20,
    complexityLevel: 0.25,
    hintUsage: 0.10,
    patternRecognitionScore: 0.10,
  },
  Gv: {
    accuracy: 0.30,
    completionTime: 0.20,
    tapPrecision: 0.20,
    movementEfficiency: 0.15,
    rotationAccuracy: 0.15,
  },
  Gsm: {
    accuracy: 0.25,
    memoryCapacity: 0.30,
    sequenceAccuracy: 0.25,
    recallDelay: 0.10,
    longestStreak: 0.10,
  },
};

// ============================================
// RESULT TYPES
// ============================================

export interface GameAssessmentResult {
  gameType: string;
  domain: ChcDomain;
  /** Skor final (0-100) */
  finalScore: number;
  /** Rating bintang (1-5) */
  starRating: number;
  /** Parameter detail yang diukur */
  params: Partial<DomainAssessmentParams['params']>;
  /** Breakdown skor per parameter */
  scoreBreakdown: Record<string, number>;
  /** Feedback untuk anak */
  feedback: string;
  /** Rekomendasi untuk orang tua */
  parentRecommendation: string;
  /** Level perkembangan */
  developmentLevel: 'below' | 'average' | 'above' | 'excellent';
  timestamp: string;
}

export interface AssessmentSession {
  sessionId: string;
  childId: string;
  results: GameAssessmentResult[];
  totalDuration: number;
  completedAt: string;
}

/** Summary hasil assessment per domain */
export interface DomainAssessmentSummary {
  domain: ChcDomain;
  domainName: string;
  totalSessions: number;
  averageScore: number;
  bestScore: number;
  developmentLevel: 'below' | 'average' | 'above' | 'excellent';
  lastPlayed: string | null;
  trend: 'improving' | 'stable' | 'declining';
}
