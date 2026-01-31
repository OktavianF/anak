/**
 * RECOMMENDATION RULES - Panduan Rekomendasi Game Berdasarkan USIA & Skor CHC
 *
 * PERBEDAAN DENGAN VERSI 1:
 * Sistem rekomendasi menggunakan MATRIX 2 dimensi:
 * 1. Kelompok Usia: 4-5, 6-7, 8-9, 10-12 tahun
 * 2. Level Skor: rendah (0-40%), sedang (41-70%), tinggi (71-100%)
 *
 * Ini menghasilkan 6 DIFFICULTY LEVELS (bukan 3):
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │                    MATRIX REKOMENDASI                               │
 * ├─────────────┬───────────────┬───────────────┬───────────────────────┤
 * │             │ Skor Rendah   │ Skor Sedang   │ Skor Tinggi           │
 * │             │ (0-40%)       │ (41-70%)      │ (71-100%)             │
 * ├─────────────┼───────────────┼───────────────┼───────────────────────┤
 * │ Usia 4-5    │ Level 1       │ Level 2       │ Level 3               │
 * │ Usia 6-7    │ Level 2       │ Level 3       │ Level 4               │
 * │ Usia 8-9    │ Level 3       │ Level 4       │ Level 5               │
 * │ Usia 10-12  │ Level 4       │ Level 5       │ Level 6               │
 * └─────────────┴───────────────┴───────────────┴───────────────────────┘
 *
 * Total kombinasi: 4 usia × 3 level skor × 3 domain = 36 kombinasi unik
 *
 * Contoh:
 * - Anak 4 tahun dengan skor tinggi → Level 3 (challenging untuk usia 4)
 * - Anak 12 tahun dengan skor rendah → Level 4 (sesuai usia tapi lebih mudah)
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ChcDomain = 'Gf' | 'Gv' | 'Gsm';
export type ScoreLevel = 'rendah' | 'sedang' | 'tinggi';
export type AgeGroup = '4-5' | '6-7' | '8-9' | '10-12';

/** Difficulty level 1-6 berdasarkan kombinasi usia dan skor */
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface GameRecommendation {
  gameId: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  targetSkill: string;
  ageAppropriate: AgeGroup[];
  parameters: Record<string, number | string | boolean>;
}

// ============================================================================
// AGE-SCORE MATRIX - Menentukan difficulty level
// ============================================================================

/**
 * Matrix untuk menentukan difficulty level berdasarkan usia dan skor
 * Difficulty 1 = paling mudah, 6 = paling sulit
 */
export const AGE_SCORE_DIFFICULTY_MATRIX: Record<AgeGroup, Record<ScoreLevel, DifficultyLevel>> = {
  '4-5': { rendah: 1, sedang: 2, tinggi: 3 },
  '6-7': { rendah: 2, sedang: 3, tinggi: 4 },
  '8-9': { rendah: 3, sedang: 4, tinggi: 5 },
  '10-12': { rendah: 4, sedang: 5, tinggi: 6 },
};

// ============================================================================
// DIFFICULTY LEVEL DESCRIPTIONS
// ============================================================================

export const DIFFICULTY_DESCRIPTIONS: Record<DifficultyLevel, string> = {
  1: 'Sangat Dasar - Pengenalan konsep dengan bantuan visual maksimal',
  2: 'Dasar - Latihan fondasi dengan panduan',
  3: 'Pemula - Tantangan ringan dengan feedback langsung',
  4: 'Menengah - Tantangan seimbang untuk pengembangan',
  5: 'Lanjutan - Tantangan kompleks untuk penguatan',
  6: 'Mahir - Tantangan tinggi untuk optimalisasi',
};

// ============================================================================
// ASSESSMENT PARAMETERS (untuk referensi model ML)
// ============================================================================

export const ASSESSMENT_PARAMETERS = {
  Gf: {
    domainName: 'Fluid Reasoning - Penalaran Logis',
    parameters: [
      { name: 'accuracy', description: 'Jumlah jawaban benar vs salah', weight: 0.40 },
      { name: 'completionTime', description: 'Kecepatan menyelesaikan pola/puzzle', weight: 0.25 },
      { name: 'complexity', description: 'Level kesulitan yang berhasil diselesaikan', weight: 0.25 },
      { name: 'hintUsage', description: 'Berapa kali minta bantuan', weight: 0.10 },
    ],
    exampleGames: ['Pattern Recognition', 'Puzzle Logika', 'Matrix Reasoning', 'Number Sequence'],
  },
  Gv: {
    domainName: 'Visual Processing - Pemrosesan Visual',
    parameters: [
      { name: 'accuracy', description: 'Ketepatan identifikasi visual', weight: 0.35 },
      { name: 'completionTime', description: 'Kecepatan pemrosesan visual', weight: 0.25 },
      { name: 'tapPrecision', description: 'Presisi sentuhan/gerakan', weight: 0.25 },
      { name: 'mentalRotation', description: 'Kemampuan memvisualisasikan rotasi', weight: 0.15 },
    ],
    exampleGames: ['Puzzle Gambar', 'Find the Difference', 'Tangram', 'Mewarnai'],
  },
  Gsm: {
    domainName: 'Working Memory - Memori Kerja',
    parameters: [
      { name: 'capacity', description: 'Jumlah item yang bisa diingat', weight: 0.40 },
      { name: 'accuracy', description: 'Urutan yang benar', weight: 0.30 },
      { name: 'responseTime', description: 'Delay sebelum menjawab', weight: 0.20 },
      { name: 'sequenceError', description: 'Salah posisi vs salah item', weight: 0.10 },
    ],
    exampleGames: ['Memory Card', 'Simon Says', 'Sequence Recall'],
  },
} as const;

// ============================================================================
// FLUID REASONING (Gf) - GAME RECOMMENDATIONS PER DIFFICULTY
// ============================================================================

export const GF_GAMES_BY_DIFFICULTY: Record<DifficultyLevel, GameRecommendation[]> = {
  // Level 1: Usia 4-5 dengan skor rendah
  1: [
    {
      gameId: 'gf-pattern-color-2',
      title: 'Tebak Warna Berikutnya',
      description: 'Mengenali pola 2 warna berulang (merah-biru-merah-?)',
      difficulty: 1,
      durationMinutes: 3,
      targetSkill: 'basic_pattern_recognition',
      ageAppropriate: ['4-5'],
      parameters: { patternLength: 2, colorCount: 2, showHint: true, audioFeedback: true },
    },
    {
      gameId: 'gf-sorting-1attr',
      title: 'Kelompokkan yang Sama',
      description: 'Mengelompokkan objek berdasarkan 1 atribut (warna ATAU bentuk)',
      difficulty: 1,
      durationMinutes: 4,
      targetSkill: 'single_attribute_classification',
      ageAppropriate: ['4-5'],
      parameters: { attributeType: 'color_only', objectCount: 4, categoryCount: 2 },
    },
    {
      gameId: 'gf-puzzle-2x2-guided',
      title: 'Puzzle Gambar 4 Keping',
      description: 'Menyusun puzzle dengan panduan posisi',
      difficulty: 1,
      durationMinutes: 4,
      targetSkill: 'basic_spatial_reasoning',
      ageAppropriate: ['4-5'],
      parameters: { pieceCount: 4, showOutline: true, snapToPlace: true },
    },
    {
      gameId: 'gf-sequence-123',
      title: 'Lanjutkan 1-2-3',
      description: 'Melanjutkan urutan angka sederhana',
      difficulty: 1,
      durationMinutes: 3,
      targetSkill: 'basic_number_sequence',
      ageAppropriate: ['4-5'],
      parameters: { maxNumber: 5, missingPosition: 'end_only', visualAid: true },
    },
  ],

  // Level 2: Usia 4-5 skor sedang ATAU Usia 6-7 skor rendah
  2: [
    {
      gameId: 'gf-pattern-color-3',
      title: 'Pola 3 Warna',
      description: 'Mengenali pola 3 warna berulang',
      difficulty: 2,
      durationMinutes: 4,
      targetSkill: 'pattern_recognition',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { patternLength: 3, colorCount: 3, hintDelay: 10000 },
    },
    {
      gameId: 'gf-sorting-shape',
      title: 'Sortir Bentuk',
      description: 'Mengelompokkan objek berdasarkan bentuk geometri',
      difficulty: 2,
      durationMinutes: 5,
      targetSkill: 'shape_classification',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { shapeTypes: 'circle_square_triangle', objectCount: 9 },
    },
    {
      gameId: 'gf-puzzle-2x3',
      title: 'Puzzle 6 Keping',
      description: 'Menyusun puzzle dengan outline bantuan',
      difficulty: 2,
      durationMinutes: 5,
      targetSkill: 'spatial_reasoning',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { pieceCount: 6, showOutline: true },
    },
    {
      gameId: 'gf-sequence-skip1',
      title: 'Urutan Loncat 2',
      description: 'Melanjutkan urutan seperti 2-4-6-?',
      difficulty: 2,
      durationMinutes: 4,
      targetSkill: 'skip_counting',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { skipValue: 2, maxNumber: 10 },
    },
    {
      gameId: 'gf-oddoneout-easy',
      title: 'Mana yang Berbeda?',
      description: 'Menemukan objek yang tidak cocok dalam kelompok',
      difficulty: 2,
      durationMinutes: 4,
      targetSkill: 'odd_one_out',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { objectCount: 4, differenceType: 'obvious' },
    },
  ],

  // Level 3: Usia 4-5 skor tinggi ATAU Usia 6-7 skor sedang ATAU Usia 8-9 skor rendah
  3: [
    {
      gameId: 'gf-pattern-shape-color',
      title: 'Pola Bentuk & Warna',
      description: 'Mengenali pola yang melibatkan bentuk DAN warna',
      difficulty: 3,
      durationMinutes: 5,
      targetSkill: 'dual_attribute_pattern',
      ageAppropriate: ['4-5', '6-7', '8-9'],
      parameters: { patternLength: 4, includeShape: true, includeColor: true },
    },
    {
      gameId: 'gf-sorting-2attr',
      title: 'Sortir 2 Ciri',
      description: 'Mengelompokkan berdasarkan 2 atribut (warna DAN bentuk)',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'dual_attribute_classification',
      ageAppropriate: ['4-5', '6-7', '8-9'],
      parameters: { attributeCount: 2, objectCount: 12 },
    },
    {
      gameId: 'gf-puzzle-3x3',
      title: 'Puzzle 9 Keping',
      description: 'Menyusun puzzle tanpa outline penuh',
      difficulty: 3,
      durationMinutes: 7,
      targetSkill: 'spatial_reasoning',
      ageAppropriate: ['4-5', '6-7', '8-9'],
      parameters: { pieceCount: 9, showOutline: false, showPreview: true },
    },
    {
      gameId: 'gf-matrix-2x2-simple',
      title: 'Matrix Sederhana 2x2',
      description: 'Menemukan pola dalam grid 2x2',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'matrix_reasoning',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { gridSize: '2x2', transformationType: 'single' },
    },
  ],

  // Level 4: Usia 6-7 skor tinggi ATAU Usia 8-9 skor sedang ATAU Usia 10-12 skor rendah
  4: [
    {
      gameId: 'gf-pattern-rules',
      title: 'Temukan Aturan Pola',
      description: 'Mengidentifikasi aturan tersembunyi dalam pola',
      difficulty: 4,
      durationMinutes: 7,
      targetSkill: 'rule_discovery',
      ageAppropriate: ['6-7', '8-9', '10-12'],
      parameters: { patternLength: 5, ruleComplexity: 'moderate' },
    },
    {
      gameId: 'gf-matrix-2x2-transform',
      title: 'Matrix dengan Transformasi',
      description: 'Matrix 2x2 dengan rotasi atau refleksi',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'matrix_transformation',
      ageAppropriate: ['6-7', '8-9', '10-12'],
      parameters: { transformationType: 'rotation_or_reflection', optionCount: 4 },
    },
    {
      gameId: 'gf-puzzle-3x4',
      title: 'Puzzle 12 Keping',
      description: 'Puzzle lebih kompleks dengan rotasi piece',
      difficulty: 4,
      durationMinutes: 10,
      targetSkill: 'complex_spatial_reasoning',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { pieceCount: 12, rotationEnabled: true },
    },
    {
      gameId: 'gf-logic-grid-easy',
      title: 'Teka-Teki Logika Dasar',
      description: 'Memecahkan puzzle dengan petunjuk sederhana',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'deductive_reasoning',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { clueCount: 3, variableCount: 2 },
    },
  ],

  // Level 5: Usia 8-9 skor tinggi ATAU Usia 10-12 skor sedang
  5: [
    {
      gameId: 'gf-pattern-multi-rule',
      title: 'Pola Multi-Aturan',
      description: 'Pola dengan 2+ aturan yang bekerja bersamaan',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'complex_pattern_analysis',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { patternLength: 6, ruleCount: 2 },
    },
    {
      gameId: 'gf-matrix-3x3',
      title: 'Matrix Reasoning 3x3',
      description: 'Menemukan pola kompleks dalam grid 3x3',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'advanced_matrix_reasoning',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { gridSize: '3x3', transformationType: 'combined', timeLimit: 120 },
    },
    {
      gameId: 'gf-puzzle-4x4',
      title: 'Puzzle 16 Keping',
      description: 'Puzzle kompleks dengan piece yang bisa dirotasi',
      difficulty: 5,
      durationMinutes: 12,
      targetSkill: 'advanced_spatial_reasoning',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { pieceCount: 16, rotationEnabled: true },
    },
    {
      gameId: 'gf-logic-grid-medium',
      title: 'Teka-Teki Logika Menengah',
      description: 'Puzzle logika dengan 4-5 petunjuk',
      difficulty: 5,
      durationMinutes: 12,
      targetSkill: 'intermediate_deductive_reasoning',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { clueCount: 5, eliminationRequired: true },
    },
  ],

  // Level 6: Usia 10-12 skor tinggi
  6: [
    {
      gameId: 'gf-pattern-abstract',
      title: 'Pola Abstrak',
      description: 'Pola dengan simbol abstrak dan aturan kompleks',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'abstract_reasoning',
      ageAppropriate: ['10-12'],
      parameters: { patternLength: 7, symbolType: 'abstract', ruleCount: 3 },
    },
    {
      gameId: 'gf-matrix-3x3-advanced',
      title: 'Matrix Reasoning Lanjutan',
      description: 'Matrix 3x3 dengan transformasi berlapis',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'expert_matrix_reasoning',
      ageAppropriate: ['10-12'],
      parameters: { transformationType: 'layered', optionCount: 6, timeLimit: 90 },
    },
    {
      gameId: 'gf-logic-grid-hard',
      title: 'Teka-Teki Logika Sulit',
      description: 'Puzzle logika kompleks dengan 6+ petunjuk',
      difficulty: 6,
      durationMinutes: 15,
      targetSkill: 'advanced_deductive_reasoning',
      ageAppropriate: ['10-12'],
      parameters: { clueCount: 7, negativeClues: true, conditionalClues: true },
    },
    {
      gameId: 'gf-sequence-mixed',
      title: 'Urutan Campuran',
      description: 'Urutan dengan pola Fibonacci, geometri, dll',
      difficulty: 6,
      durationMinutes: 10,
      targetSkill: 'complex_sequence_analysis',
      ageAppropriate: ['10-12'],
      parameters: { patternTypes: 'fibonacci_geometric_alternating', sequenceLength: 8 },
    },
  ],
};

// ============================================================================
// VISUAL PROCESSING (Gv) - GAME RECOMMENDATIONS PER DIFFICULTY
// ============================================================================

export const GV_GAMES_BY_DIFFICULTY: Record<DifficultyLevel, GameRecommendation[]> = {
  1: [
    {
      gameId: 'gv-matching-identical',
      title: 'Cocokkan yang Sama',
      description: 'Mencocokkan gambar identik',
      difficulty: 1,
      durationMinutes: 3,
      targetSkill: 'visual_matching',
      ageAppropriate: ['4-5'],
      parameters: { imageCount: 4, rotated: false, highContrast: true },
    },
    {
      gameId: 'gv-find-diff-2',
      title: 'Cari 2 Perbedaan',
      description: 'Menemukan 2 perbedaan besar pada gambar sederhana',
      difficulty: 1,
      durationMinutes: 4,
      targetSkill: 'visual_discrimination',
      ageAppropriate: ['4-5'],
      parameters: { differenceCount: 2, differenceSize: 'large', complexity: 'very_simple' },
    },
    {
      gameId: 'gv-coloring-guided',
      title: 'Mewarnai dengan Panduan',
      description: 'Mewarnai area besar dengan panduan warna',
      difficulty: 1,
      durationMinutes: 5,
      targetSkill: 'color_recognition',
      ageAppropriate: ['4-5'],
      parameters: { areaCount: 4, boundaryThickness: 'very_thick', colorGuide: true },
    },
    {
      gameId: 'gv-tangram-2',
      title: 'Tangram 2 Keping',
      description: 'Menyusun bentuk sederhana dengan 2 keping',
      difficulty: 1,
      durationMinutes: 4,
      targetSkill: 'basic_spatial_visualization',
      ageAppropriate: ['4-5'],
      parameters: { pieceCount: 2, showFullOutline: true, rotationRequired: false },
    },
  ],

  2: [
    {
      gameId: 'gv-find-diff-3',
      title: 'Cari 3 Perbedaan',
      description: 'Menemukan 3 perbedaan pada gambar sederhana',
      difficulty: 2,
      durationMinutes: 5,
      targetSkill: 'visual_discrimination',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { differenceCount: 3, differenceSize: 'medium', complexity: 'simple' },
    },
    {
      gameId: 'gv-coloring-free',
      title: 'Mewarnai Bebas',
      description: 'Mewarnai dengan pilihan warna sendiri',
      difficulty: 2,
      durationMinutes: 6,
      targetSkill: 'visual_creativity',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { areaCount: 6, colorOptions: 8 },
    },
    {
      gameId: 'gv-tangram-3',
      title: 'Tangram 3 Keping',
      description: 'Menyusun bentuk dengan 3 keping tangram',
      difficulty: 2,
      durationMinutes: 5,
      targetSkill: 'spatial_visualization',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { pieceCount: 3, showOutline: true, rotationRequired: false },
    },
    {
      gameId: 'gv-shadow-match',
      title: 'Cocokkan Bayangan',
      description: 'Mencocokkan objek dengan bayangannya',
      difficulty: 2,
      durationMinutes: 4,
      targetSkill: 'form_perception',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { objectCount: 4, shadowType: 'simple' },
    },
  ],

  3: [
    {
      gameId: 'gv-find-diff-5',
      title: 'Cari 5 Perbedaan',
      description: 'Menemukan 5 perbedaan pada gambar menengah',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'visual_discrimination',
      ageAppropriate: ['4-5', '6-7', '8-9'],
      parameters: { differenceCount: 5, complexity: 'medium', timeLimit: 180 },
    },
    {
      gameId: 'gv-tangram-5',
      title: 'Tangram 5 Keping',
      description: 'Menyusun bentuk menengah dengan rotasi',
      difficulty: 3,
      durationMinutes: 7,
      targetSkill: 'spatial_manipulation',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { pieceCount: 5, showOutline: true, rotationRequired: true },
    },
    {
      gameId: 'gv-rotation-90',
      title: 'Tebak Rotasi 90°',
      description: 'Memilih gambar yang dirotasi 90 derajat',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'mental_rotation',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { rotationAngle: 90, shapeComplexity: 'simple', optionCount: 3 },
    },
    {
      gameId: 'gv-hidden-objects-easy',
      title: 'Objek Tersembunyi (Mudah)',
      description: 'Menemukan objek yang tersembunyi dalam gambar',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'figure_ground_perception',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { hiddenCount: 4, backgroundComplexity: 'low' },
    },
  ],

  4: [
    {
      gameId: 'gv-find-diff-7',
      title: 'Cari 7 Perbedaan',
      description: 'Menemukan 7 perbedaan dengan time limit',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'visual_scanning',
      ageAppropriate: ['6-7', '8-9', '10-12'],
      parameters: { differenceCount: 7, complexity: 'detailed', timeLimit: 120 },
    },
    {
      gameId: 'gv-tangram-7',
      title: 'Tangram Klasik (7 Keping)',
      description: 'Tangram lengkap dengan rotasi dan flip',
      difficulty: 4,
      durationMinutes: 10,
      targetSkill: 'advanced_spatial_visualization',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { pieceCount: 7, showOutline: true, rotationRequired: true },
    },
    {
      gameId: 'gv-rotation-180',
      title: 'Tebak Rotasi 180°',
      description: 'Memilih gambar yang dirotasi 180 derajat',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'advanced_mental_rotation',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { rotationAngle: 180, shapeComplexity: 'medium', optionCount: 4 },
    },
    {
      gameId: 'gv-maze-medium',
      title: 'Labirin Menengah',
      description: 'Menyelesaikan labirin dengan beberapa jalan buntu',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'spatial_planning',
      ageAppropriate: ['6-7', '8-9', '10-12'],
      parameters: { mazeSize: 'medium', deadEndCount: 5 },
    },
  ],

  5: [
    {
      gameId: 'gv-find-diff-10',
      title: 'Cari 10 Perbedaan',
      description: 'Menemukan 10 perbedaan halus',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'expert_visual_discrimination',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { differenceCount: 10, differenceSize: 'subtle', timeLimit: 150 },
    },
    {
      gameId: 'gv-tangram-no-outline',
      title: 'Tangram Tanpa Panduan',
      description: 'Tangram 7 keping tanpa outline bantuan',
      difficulty: 5,
      durationMinutes: 12,
      targetSkill: 'spatial_memory',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { pieceCount: 7, showOutline: false, targetDisplayTime: 5000 },
    },
    {
      gameId: 'gv-rotation-mirror',
      title: 'Rotasi dan Cermin',
      description: 'Membedakan rotasi dan pencerminan',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'rotation_vs_reflection',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { includeRotation: true, includeMirror: true, optionCount: 5 },
    },
    {
      gameId: 'gv-hidden-objects-hard',
      title: 'Objek Tersembunyi (Sulit)',
      description: 'Menemukan objek kecil dalam gambar ramai',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'advanced_figure_ground',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { hiddenCount: 8, backgroundComplexity: 'high', timeLimit: 180 },
    },
  ],

  6: [
    {
      gameId: 'gv-spot-diff-extreme',
      title: 'Cari Perbedaan Ekstrem',
      description: 'Perbedaan sangat halus pada gambar kompleks',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'master_visual_discrimination',
      ageAppropriate: ['10-12'],
      parameters: { differenceCount: 12, differenceSize: 'very_subtle', timeLimit: 120 },
    },
    {
      gameId: 'gv-tangram-complex',
      title: 'Tangram Bentuk Kompleks',
      description: 'Membuat bentuk abstrak tanpa panduan',
      difficulty: 6,
      durationMinutes: 15,
      targetSkill: 'spatial_creativity',
      ageAppropriate: ['10-12'],
      parameters: { pieceCount: 7, showOutline: false, targetType: 'abstract_shape' },
    },
    {
      gameId: 'gv-3d-rotation',
      title: 'Rotasi 3D Mental',
      description: 'Membayangkan rotasi objek 3D',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: '3d_mental_rotation',
      ageAppropriate: ['10-12'],
      parameters: { rotationAxes: 'xyz', shapeType: '3d_blocks', timeLimit: 90 },
    },
    {
      gameId: 'gv-maze-complex',
      title: 'Labirin Kompleks',
      description: 'Labirin multi-level dengan rintangan',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'complex_spatial_navigation',
      ageAppropriate: ['10-12'],
      parameters: { mazeSize: 'large', levels: 2, obstacles: true },
    },
  ],
};

// ============================================================================
// WORKING MEMORY (Gsm) - GAME RECOMMENDATIONS PER DIFFICULTY
// ============================================================================

export const GSM_GAMES_BY_DIFFICULTY: Record<DifficultyLevel, GameRecommendation[]> = {
  1: [
    {
      gameId: 'gsm-memory-2x2',
      title: 'Kartu Memori 2x2',
      description: 'Mencocokkan 2 pasang kartu',
      difficulty: 1,
      durationMinutes: 3,
      targetSkill: 'basic_visual_memory',
      ageAppropriate: ['4-5'],
      parameters: { gridSize: '2x2', pairCount: 2, flipDuration: 3000, audioAssist: true },
    },
    {
      gameId: 'gsm-simon-2',
      title: 'Simon Says 2 Langkah',
      description: 'Mengikuti urutan 2 warna/suara',
      difficulty: 1,
      durationMinutes: 4,
      targetSkill: 'basic_sequential_memory',
      ageAppropriate: ['4-5'],
      parameters: { sequenceLength: 2, displaySpeed: 'very_slow', repeatAllowed: true },
    },
    {
      gameId: 'gsm-remember-2',
      title: 'Ingat 2 Gambar',
      description: 'Mengingat 2 gambar lalu memilih yang benar',
      difficulty: 1,
      durationMinutes: 3,
      targetSkill: 'basic_recall',
      ageAppropriate: ['4-5'],
      parameters: { itemCount: 2, displayTime: 5000, optionCount: 3 },
    },
    {
      gameId: 'gsm-whats-gone-2',
      title: 'Apa yang Hilang? (2 dari 4)',
      description: 'Mengidentifikasi objek yang hilang',
      difficulty: 1,
      durationMinutes: 4,
      targetSkill: 'visual_memory',
      ageAppropriate: ['4-5'],
      parameters: { totalObjects: 4, removedCount: 1, displayTime: 5000 },
    },
  ],

  2: [
    {
      gameId: 'gsm-memory-2x3',
      title: 'Kartu Memori 2x3',
      description: 'Mencocokkan 3 pasang kartu',
      difficulty: 2,
      durationMinutes: 4,
      targetSkill: 'visual_memory',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { gridSize: '2x3', pairCount: 3, flipDuration: 2500 },
    },
    {
      gameId: 'gsm-simon-3',
      title: 'Simon Says 3 Langkah',
      description: 'Mengikuti urutan 3 warna/suara',
      difficulty: 2,
      durationMinutes: 5,
      targetSkill: 'sequential_memory',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { sequenceLength: 3, displaySpeed: 'slow', repeatAllowed: true },
    },
    {
      gameId: 'gsm-sequence-forward-3',
      title: 'Ulangi Urutan 3',
      description: 'Mengingat dan mengulangi 3 item secara berurutan',
      difficulty: 2,
      durationMinutes: 5,
      targetSkill: 'forward_span',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { itemCount: 3, displayTime: 3000, recallType: 'forward' },
    },
    {
      gameId: 'gsm-copy-pattern-3',
      title: 'Tiru Pola 3 Warna',
      description: 'Mengingat dan mereproduksi pola 3 warna',
      difficulty: 2,
      durationMinutes: 4,
      targetSkill: 'pattern_memory',
      ageAppropriate: ['4-5', '6-7'],
      parameters: { patternLength: 3, displayTime: 4000 },
    },
  ],

  3: [
    {
      gameId: 'gsm-memory-3x4',
      title: 'Kartu Memori 3x4',
      description: 'Mencocokkan 6 pasang kartu',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'intermediate_visual_memory',
      ageAppropriate: ['4-5', '6-7', '8-9'],
      parameters: { gridSize: '3x4', pairCount: 6, flipDuration: 2000 },
    },
    {
      gameId: 'gsm-simon-4',
      title: 'Simon Says 4 Langkah',
      description: 'Mengikuti urutan 4 warna/suara',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'sequential_memory',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { sequenceLength: 4, displaySpeed: 'medium', repeatAllowed: false },
    },
    {
      gameId: 'gsm-backward-2',
      title: 'Urutan Terbalik 2 Item',
      description: 'Mengulang 2 item dalam urutan terbalik',
      difficulty: 3,
      durationMinutes: 5,
      targetSkill: 'backward_span',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { itemCount: 2, recallType: 'backward' },
    },
    {
      gameId: 'gsm-whats-different',
      title: 'Apa yang Berubah?',
      description: 'Mengidentifikasi perubahan posisi/warna objek',
      difficulty: 3,
      durationMinutes: 6,
      targetSkill: 'change_detection',
      ageAppropriate: ['6-7', '8-9'],
      parameters: { objectCount: 4, changeType: 'position_or_color', displayTime: 3000 },
    },
  ],

  4: [
    {
      gameId: 'gsm-memory-4x4',
      title: 'Kartu Memori 4x4',
      description: 'Mencocokkan 8 pasang kartu',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'advanced_visual_memory',
      ageAppropriate: ['6-7', '8-9', '10-12'],
      parameters: { gridSize: '4x4', pairCount: 8, flipDuration: 1500 },
    },
    {
      gameId: 'gsm-simon-5',
      title: 'Simon Says 5 Langkah',
      description: 'Mengikuti urutan 5 warna/suara',
      difficulty: 4,
      durationMinutes: 7,
      targetSkill: 'extended_sequential_memory',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { sequenceLength: 5, displaySpeed: 'medium' },
    },
    {
      gameId: 'gsm-backward-3',
      title: 'Urutan Terbalik 3 Item',
      description: 'Mengulang 3 angka dalam urutan terbalik',
      difficulty: 4,
      durationMinutes: 7,
      targetSkill: 'working_memory_manipulation',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { itemCount: 3, recallType: 'backward', displayMode: 'audio_visual' },
    },
    {
      gameId: 'gsm-n-back-1',
      title: 'N-Back Level 1',
      description: 'Tekan jika sama dengan 1 item sebelumnya',
      difficulty: 4,
      durationMinutes: 8,
      targetSkill: 'updating',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { nBackLevel: 1, trialCount: 20, targetPercentage: 30 },
    },
  ],

  5: [
    {
      gameId: 'gsm-memory-5x4',
      title: 'Kartu Memori 5x4',
      description: 'Mencocokkan 10 pasang kartu',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'expert_visual_memory',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { gridSize: '5x4', pairCount: 10, flipDuration: 1200 },
    },
    {
      gameId: 'gsm-simon-6',
      title: 'Simon Says 6 Langkah',
      description: 'Mengikuti urutan 6 warna/suara',
      difficulty: 5,
      durationMinutes: 9,
      targetSkill: 'extended_sequential_memory',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { sequenceLength: 6, displaySpeed: 'fast' },
    },
    {
      gameId: 'gsm-backward-4',
      title: 'Urutan Terbalik 4 Item',
      description: 'Mengulang 4 angka dalam urutan terbalik',
      difficulty: 5,
      durationMinutes: 9,
      targetSkill: 'advanced_working_memory',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { itemCount: 4, recallType: 'backward', displayMode: 'audio_only' },
    },
    {
      gameId: 'gsm-n-back-2',
      title: 'N-Back Level 2',
      description: 'Tekan jika sama dengan 2 item sebelumnya',
      difficulty: 5,
      durationMinutes: 10,
      targetSkill: 'complex_updating',
      ageAppropriate: ['8-9', '10-12'],
      parameters: { nBackLevel: 2, trialCount: 25, targetPercentage: 25 },
    },
  ],

  6: [
    {
      gameId: 'gsm-memory-6x4',
      title: 'Kartu Memori 6x4',
      description: 'Mencocokkan 12 pasang kartu mirip',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'master_visual_memory',
      ageAppropriate: ['10-12'],
      parameters: { gridSize: '6x4', pairCount: 12, flipDuration: 1000, imageType: 'very_similar' },
    },
    {
      gameId: 'gsm-simon-7',
      title: 'Simon Says 7+ Langkah',
      description: 'Mengikuti urutan 7 atau lebih warna/suara',
      difficulty: 6,
      durationMinutes: 10,
      targetSkill: 'expert_sequential_memory',
      ageAppropriate: ['10-12'],
      parameters: { sequenceLength: 7, displaySpeed: 'fast', incrementOnSuccess: true },
    },
    {
      gameId: 'gsm-backward-5',
      title: 'Urutan Terbalik 5 Item',
      description: 'Mengulang 5 angka dalam urutan terbalik',
      difficulty: 6,
      durationMinutes: 10,
      targetSkill: 'expert_working_memory',
      ageAppropriate: ['10-12'],
      parameters: { itemCount: 5, recallType: 'backward', displayMode: 'audio_only' },
    },
    {
      gameId: 'gsm-dual-task',
      title: 'Dual Task Memory',
      description: 'Mengingat visual sambil melakukan tugas verbal',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'dual_task_processing',
      ageAppropriate: ['10-12'],
      parameters: { visualTaskItems: 4, verbalTaskItems: 3, switchingRequired: true },
    },
    {
      gameId: 'gsm-n-back-3',
      title: 'N-Back Level 3',
      description: 'Tekan jika sama dengan 3 item sebelumnya',
      difficulty: 6,
      durationMinutes: 12,
      targetSkill: 'expert_updating',
      ageAppropriate: ['10-12'],
      parameters: { nBackLevel: 3, trialCount: 30, targetPercentage: 20 },
    },
  ],
};

// ============================================================================
// PARENT TIPS BY AGE GROUP
// ============================================================================

export const PARENT_TIPS_BY_AGE: Record<AgeGroup, Record<ChcDomain, string[]>> = {
  '4-5': {
    Gf: [
      'Bermain tebak-tebakan pola warna dengan balok atau crayon',
      'Ajak anak menyortir mainan berdasarkan warna atau bentuk',
      'Gunakan puzzle 4-6 keping dengan gambar familiar',
      'Beri pujian untuk setiap usaha, bukan hanya jawaban benar',
    ],
    Gv: [
      'Bermain mencari benda tersembunyi di buku atau ruangan',
      'Mewarnai bersama dengan area besar dan garis tebal',
      'Bermain tebak bentuk awan atau objek sekitar',
      'Gunakan playdough untuk membentuk dan mengenali bentuk',
    ],
    Gsm: [
      'Bermain "Simon Says" versi sederhana dengan 2-3 instruksi',
      'Nyanyikan lagu dengan gerakan untuk latihan mengingat',
      'Bermain kartu memori dengan 4-6 kartu saja',
      'Minta anak mengingat 2-3 item saat berbelanja',
    ],
  },
  '6-7': {
    Gf: [
      'Bermain board game sederhana seperti Snakes and Ladders',
      'Ajak anak memecahkan teka-teki sederhana bersama',
      'Gunakan LEGO untuk membuat pola berulang',
      'Tanyakan "Bagaimana kalau..." untuk melatih berpikir',
    ],
    Gv: [
      'Ajak anak menggambar dan menceritakan gambarnya',
      'Bermain origami sederhana (pesawat, perahu)',
      'Bermain tebak bayangan dengan senter',
      'Ikuti instruksi menggambar step-by-step',
    ],
    Gsm: [
      'Bermain kartu memori dengan lebih banyak kartu',
      'Minta anak menceritakan ulang cerita yang dibaca',
      'Latih mengikuti instruksi 3-4 langkah',
      'Bermain "Saya Pergi ke Pasar" untuk melatih mengingat',
    ],
  },
  '8-9': {
    Gf: [
      'Perkenalkan permainan strategi seperti checkers',
      'Ajak anak memecahkan sudoku level mudah',
      'Diskusikan sebab-akibat dari kejadian sehari-hari',
      'Gunakan coding game visual seperti Scratch Jr',
    ],
    Gv: [
      'Ajak membuat model 3D dari kertas atau kardus',
      'Bermain game spot the difference yang lebih kompleks',
      'Perkenalkan membaca peta sederhana',
      'Eksplorasi aplikasi menggambar digital',
    ],
    Gsm: [
      'Latih mengingat nomor telepon atau alamat penting',
      'Bermain kata berantai atau story chain',
      'Gunakan teknik chunking untuk mengingat informasi',
      'Ajak bermain catur atau game strategi memori',
    ],
  },
  '10-12': {
    Gf: [
      'Perkenalkan catur dan strategi permainan',
      'Ajak memecahkan puzzle logika kompleks',
      'Diskusikan masalah nyata dan solusinya',
      'Eksplorasi dasar-dasar programming',
    ],
    Gv: [
      'Dorong hobi seperti menggambar, desain, atau fotografi',
      'Ajak membaca peta dan navigasi saat traveling',
      'Perkenalkan model kit atau LEGO Technic',
      'Eksplorasi aplikasi desain grafis sederhana',
    ],
    Gsm: [
      'Latih teknik memori untuk belajar (mnemonics)',
      'Ajak belajar bahasa baru atau alat musik',
      'Diskusikan dan analisis buku atau film bersama',
      'Latih multitasking dengan pengawasan',
    ],
  },
};

// ============================================================================
// DEVELOPMENTAL MILESTONES
// ============================================================================

export const DEVELOPMENTAL_NOTES: Record<AgeGroup, Record<ChcDomain, string>> = {
  '4-5': {
    Gf: 'Anak mulai memahami konsep "lebih/kurang" dan pola sederhana. Berpikir masih sangat konkret.',
    Gv: 'Kemampuan mengenali bentuk dasar berkembang. Koordinasi mata-tangan masih dalam tahap pengembangan.',
    Gsm: 'Kapasitas memori kerja sekitar 2-3 item. Mudah terdistraksi dan memerlukan bantuan mengingat.',
  },
  '6-7': {
    Gf: 'Kemampuan berpikir logis mulai berkembang. Bisa memahami aturan sederhana dan sebab-akibat dasar.',
    Gv: 'Kemampuan spasial meningkat pesat. Bisa membedakan kiri-kanan dan mengenali perspektif sederhana.',
    Gsm: 'Kapasitas memori kerja meningkat menjadi 3-4 item. Mulai bisa mengikuti instruksi multi-langkah.',
  },
  '8-9': {
    Gf: 'Berpikir abstrak mulai berkembang. Mampu memahami konsep hipotesis dan membuat prediksi.',
    Gv: 'Rotasi mental dan manipulasi spasial meningkat. Bisa memahami peta dan diagram sederhana.',
    Gsm: 'Kapasitas memori kerja mencapai 4-5 item. Mulai bisa menggunakan strategi mengingat.',
  },
  '10-12': {
    Gf: 'Kemampuan berpikir abstrak semakin matang. Mampu memecahkan masalah kompleks dan berpikir sistematis.',
    Gv: 'Kemampuan visual-spasial mendekati level dewasa. Bisa memahami representasi 3D dan transformasi kompleks.',
    Gsm: 'Kapasitas memori kerja 5-7 item. Mampu menggunakan berbagai strategi memori secara efektif.',
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/** Menentukan kelompok usia dari angka tahun */
export function getAgeGroup(age: number): AgeGroup {
  if (age <= 5) return '4-5';
  if (age <= 7) return '6-7';
  if (age <= 9) return '8-9';
  return '10-12';
}

/** Menentukan level skor dari persentase */
export function getScoreLevel(score: number): ScoreLevel {
  if (score <= 40) return 'rendah';
  if (score <= 70) return 'sedang';
  return 'tinggi';
}

/** Mendapatkan difficulty level berdasarkan usia dan skor */
export function getDifficultyLevel(age: number, score: number): DifficultyLevel {
  const ageGroup = getAgeGroup(age);
  const scoreLevel = getScoreLevel(score);
  return AGE_SCORE_DIFFICULTY_MATRIX[ageGroup][scoreLevel];
}

/** Mendapatkan rekomendasi game berdasarkan domain, usia, dan skor */
export function getGameRecommendations(
  domain: ChcDomain,
  age: number,
  score: number
): GameRecommendation[] {
  const difficulty = getDifficultyLevel(age, score);

  switch (domain) {
    case 'Gf':
      return GF_GAMES_BY_DIFFICULTY[difficulty];
    case 'Gv':
      return GV_GAMES_BY_DIFFICULTY[difficulty];
    case 'Gsm':
      return GSM_GAMES_BY_DIFFICULTY[difficulty];
  }
}

/** Mendapatkan tips untuk orang tua */
export function getParentTips(domain: ChcDomain, age: number): string[] {
  const ageGroup = getAgeGroup(age);
  return PARENT_TIPS_BY_AGE[ageGroup][domain];
}

/** Mendapatkan catatan perkembangan */
export function getDevelopmentalNote(domain: ChcDomain, age: number): string {
  const ageGroup = getAgeGroup(age);
  return DEVELOPMENTAL_NOTES[ageGroup][domain];
}

/** Mendapatkan rekomendasi lengkap untuk satu anak */
export function getFullRecommendation(
  age: number,
  scores: Record<ChcDomain, number>
) {
  const ageGroup = getAgeGroup(age);

  const domains = (Object.keys(scores) as ChcDomain[]).map((domain) => {
    const score = scores[domain];
    const scoreLevel = getScoreLevel(score);
    const difficultyLevel = getDifficultyLevel(age, score);

    return {
      domain,
      score,
      scoreLevel,
      difficultyLevel,
      difficultyDescription: DIFFICULTY_DESCRIPTIONS[difficultyLevel],
      games: getGameRecommendations(domain, age, score),
      parentTips: getParentTips(domain, age),
      developmentalNote: getDevelopmentalNote(domain, age),
    };
  });

  return { childAge: age, ageGroup, domains };
}

/** Export data untuk training ML model */
export function exportForMLTraining() {
  const gamesByDomain = [
    { domain: 'Gf' as ChcDomain, games: GF_GAMES_BY_DIFFICULTY },
    { domain: 'Gv' as ChcDomain, games: GV_GAMES_BY_DIFFICULTY },
    { domain: 'Gsm' as ChcDomain, games: GSM_GAMES_BY_DIFFICULTY },
  ].map(({ domain, games }) => ({
    domain,
    games: Object.entries(games).map(([diff, gameList]) => ({
      difficulty: Number(diff) as DifficultyLevel,
      gameCount: gameList.length,
      gameDetails: gameList.map((g) => ({
        gameId: g.gameId,
        targetSkill: g.targetSkill,
        ageAppropriate: g.ageAppropriate,
        parameters: g.parameters,
      })),
    })),
  }));

  return {
    parameters: ASSESSMENT_PARAMETERS,
    difficultyMatrix: AGE_SCORE_DIFFICULTY_MATRIX,
    gamesByDomain,
    totalCombinations: 36, // 4 age groups × 3 score levels × 3 domains
  };
}

export default {
  ASSESSMENT_PARAMETERS,
  AGE_SCORE_DIFFICULTY_MATRIX,
  DIFFICULTY_DESCRIPTIONS,
  GF_GAMES_BY_DIFFICULTY,
  GV_GAMES_BY_DIFFICULTY,
  GSM_GAMES_BY_DIFFICULTY,
  PARENT_TIPS_BY_AGE,
  DEVELOPMENTAL_NOTES,
  getAgeGroup,
  getScoreLevel,
  getDifficultyLevel,
  getGameRecommendations,
  getParentTips,
  getDevelopmentalNote,
  getFullRecommendation,
  exportForMLTraining,
};
