/**
 * RECOMMENDATION RULES - Panduan Rekomendasi Game Berdasarkan Skor CHC
 * 
 * File ini berisi mapping lengkap untuk model rekomendasi:
 * - Domain CHC: Gf (Fluid Reasoning), Gv (Visual Processing), Gsm (Working Memory)
 * - Score Range: rendah (0-40%), sedang (41-70%), tinggi (71-100%)
 * - Rekomendasi game dengan level kesulitan yang sesuai
 * 
 * Referensi Teori CHC (Cattell-Horn-Carroll):
 * - Gf: Kemampuan berpikir logis dan memecahkan masalah baru
 * - Gv: Kemampuan memproses dan memanipulasi informasi visual
 * - Gsm: Kemampuan menyimpan dan memanipulasi informasi jangka pendek
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ChcDomain = 'Gf' | 'Gv' | 'Gsm';

export type ScoreLevel = 'rendah' | 'sedang' | 'tinggi';

export interface GameRecommendation {
  gameId: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3; // 1=mudah, 2=sedang, 3=sulit
  durationMinutes: number;
  targetSkill: string;
  parameters: Record<string, number | string>;
}

export interface DomainRecommendationRule {
  domain: ChcDomain;
  domainName: string;
  scoreRange: [number, number]; // [min, max] dalam persen
  level: ScoreLevel;
  levelDescription: string;
  recommendations: GameRecommendation[];
  parentTips: string[];
}

// ============================================================================
// ASSESSMENT PARAMETERS (untuk referensi model)
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
// RECOMMENDATION RULES - FLUID REASONING (Gf)
// ============================================================================

export const GF_RECOMMENDATIONS: DomainRecommendationRule[] = [
  {
    domain: 'Gf',
    domainName: 'Fluid Reasoning - Penalaran Logis',
    scoreRange: [0, 40],
    level: 'rendah',
    levelDescription: 'Anak membutuhkan stimulasi tambahan untuk penalaran logis',
    recommendations: [
      {
        gameId: 'pattern-recognition',
        title: 'Tebak Pola Warna',
        description: 'Mengenali dan melanjutkan pola 2 warna berulang',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'sequential_reasoning',
        parameters: {
          patternLength: 3,
          colorCount: 2,
          repetitions: 2,
          hintAvailable: true,
        },
      },
      {
        gameId: 'number-sequence-easy',
        title: 'Urutan Angka Mudah',
        description: 'Melanjutkan urutan sederhana seperti 1,2,3,?',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'quantitative_reasoning',
        parameters: {
          sequenceType: 'linear',
          increment: 1,
          startNumber: 1,
          missingPosition: 'end',
        },
      },
      {
        gameId: 'puzzle-4piece',
        title: 'Puzzle 4 Keping',
        description: 'Menyusun puzzle gambar sederhana',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'spatial_reasoning',
        parameters: {
          pieceCount: 4,
          gridSize: '2x2',
          imageComplexity: 'simple',
          rotationEnabled: false,
        },
      },
      {
        gameId: 'sorting-basic',
        title: 'Sortir Bentuk Dasar',
        description: 'Mengelompokkan objek berdasarkan 1 atribut (warna atau bentuk)',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'classification',
        parameters: {
          attributeCount: 1,
          objectCount: 6,
          categoryCount: 2,
        },
      },
    ],
    parentTips: [
      'Ajak anak bermain tebak-tebakan pola sederhana di rumah',
      'Gunakan benda nyata seperti LEGO untuk latihan pola',
      'Beri pujian untuk setiap usaha, bukan hanya jawaban benar',
      'Bermain bersama dan tunjukkan cara berpikir langkah demi langkah',
    ],
  },
  {
    domain: 'Gf',
    domainName: 'Fluid Reasoning - Penalaran Logis',
    scoreRange: [41, 70],
    level: 'sedang',
    levelDescription: 'Anak menunjukkan kemampuan penalaran yang berkembang dengan baik',
    recommendations: [
      {
        gameId: 'pattern-recognition-medium',
        title: 'Tebak Pola Lanjutan',
        description: 'Mengenali pola dengan 3-4 warna dan variasi bentuk',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'sequential_reasoning',
        parameters: {
          patternLength: 4,
          colorCount: 3,
          repetitions: 2,
          includeShapes: true,
          hintAvailable: true,
        },
      },
      {
        gameId: 'number-sequence-medium',
        title: 'Urutan Angka Menengah',
        description: 'Melanjutkan urutan seperti 2,4,6,? atau 5,10,15,?',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'quantitative_reasoning',
        parameters: {
          sequenceType: 'arithmetic',
          incrementRange: [2, 5],
          missingPosition: 'middle_or_end',
        },
      },
      {
        gameId: 'puzzle-9piece',
        title: 'Puzzle 9 Keping',
        description: 'Menyusun puzzle dengan kompleksitas sedang',
        difficulty: 2,
        durationMinutes: 8,
        targetSkill: 'spatial_reasoning',
        parameters: {
          pieceCount: 9,
          gridSize: '3x3',
          imageComplexity: 'medium',
          rotationEnabled: false,
        },
      },
      {
        gameId: 'matrix-reasoning-2x2',
        title: 'Matrix Reasoning 2x2',
        description: 'Menemukan pola dalam matriks 2x2',
        difficulty: 2,
        durationMinutes: 8,
        targetSkill: 'inductive_reasoning',
        parameters: {
          gridSize: '2x2',
          attributeCount: 2,
          transformationType: 'simple',
        },
      },
      {
        gameId: 'sorting-dual',
        title: 'Sortir 2 Atribut',
        description: 'Mengelompokkan objek berdasarkan 2 atribut sekaligus',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'classification',
        parameters: {
          attributeCount: 2,
          objectCount: 12,
          categoryCount: 4,
        },
      },
    ],
    parentTips: [
      'Tantang anak dengan puzzle yang lebih kompleks',
      'Ajak anak menjelaskan alasan di balik jawabannya',
      'Perkenalkan permainan strategi sederhana seperti tic-tac-toe',
      'Dorong anak untuk mencoba tanpa bantuan terlebih dahulu',
    ],
  },
  {
    domain: 'Gf',
    domainName: 'Fluid Reasoning - Penalaran Logis',
    scoreRange: [71, 100],
    level: 'tinggi',
    levelDescription: 'Anak memiliki kemampuan penalaran logis yang sangat baik',
    recommendations: [
      {
        gameId: 'pattern-recognition-advanced',
        title: 'Pola Kompleks',
        description: 'Mengenali pola multi-dimensi dengan aturan tersembunyi',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'sequential_reasoning',
        parameters: {
          patternLength: 5,
          colorCount: 4,
          includeShapes: true,
          includeSize: true,
          hiddenRule: true,
          hintAvailable: false,
        },
      },
      {
        gameId: 'number-sequence-advanced',
        title: 'Urutan Fibonacci & Geometri',
        description: 'Melanjutkan urutan kompleks seperti 1,1,2,3,5,? atau 2,4,8,16,?',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'quantitative_reasoning',
        parameters: {
          sequenceType: 'fibonacci_or_geometric',
          missingPosition: 'any',
          multipleRules: true,
        },
      },
      {
        gameId: 'puzzle-16piece',
        title: 'Puzzle 16 Keping',
        description: 'Menyusun puzzle kompleks dengan gambar detail',
        difficulty: 3,
        durationMinutes: 12,
        targetSkill: 'spatial_reasoning',
        parameters: {
          pieceCount: 16,
          gridSize: '4x4',
          imageComplexity: 'complex',
          rotationEnabled: true,
        },
      },
      {
        gameId: 'matrix-reasoning-3x3',
        title: 'Matrix Reasoning 3x3',
        description: 'Menemukan pola kompleks dalam matriks 3x3',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'inductive_reasoning',
        parameters: {
          gridSize: '3x3',
          attributeCount: 3,
          transformationType: 'complex',
        },
      },
      {
        gameId: 'logic-puzzle',
        title: 'Puzzle Logika',
        description: 'Memecahkan masalah dengan petunjuk dan eliminasi',
        difficulty: 3,
        durationMinutes: 12,
        targetSkill: 'deductive_reasoning',
        parameters: {
          clueCount: 4,
          variableCount: 3,
          requiresElimination: true,
        },
      },
    ],
    parentTips: [
      'Perkenalkan permainan strategi seperti catur atau checkers',
      'Ajak anak memecahkan masalah sehari-hari bersama',
      'Dorong anak untuk membuat puzzle sendiri untuk orang lain',
      'Eksplorasi coding dasar atau robotika untuk anak',
    ],
  },
];

// ============================================================================
// RECOMMENDATION RULES - VISUAL PROCESSING (Gv)
// ============================================================================

export const GV_RECOMMENDATIONS: DomainRecommendationRule[] = [
  {
    domain: 'Gv',
    domainName: 'Visual Processing - Pemrosesan Visual',
    scoreRange: [0, 40],
    level: 'rendah',
    levelDescription: 'Anak membutuhkan stimulasi tambahan untuk pemrosesan visual',
    recommendations: [
      {
        gameId: 'find-difference-easy',
        title: 'Cari Perbedaan (Mudah)',
        description: 'Menemukan 3 perbedaan pada gambar sederhana',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'visual_discrimination',
        parameters: {
          differenceCount: 3,
          imageComplexity: 'simple',
          colorContrast: 'high',
          timeLimit: 'none',
        },
      },
      {
        gameId: 'coloring-simple',
        title: 'Mewarnai Gambar Sederhana',
        description: 'Mewarnai gambar dengan area besar dan jelas',
        difficulty: 1,
        durationMinutes: 8,
        targetSkill: 'visual_motor_integration',
        parameters: {
          areaCount: 5,
          boundaryThickness: 'thick',
          colorOptions: 6,
        },
      },
      {
        gameId: 'tangram-3piece',
        title: 'Tangram 3 Keping',
        description: 'Menyusun bentuk dasar dengan 3 keping tangram',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'spatial_visualization',
        parameters: {
          pieceCount: 3,
          targetShapeComplexity: 'simple',
          showOutline: true,
          rotationRequired: false,
        },
      },
      {
        gameId: 'matching-shapes',
        title: 'Cocokkan Bentuk',
        description: 'Mencocokkan bentuk yang sama dari pilihan',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'form_perception',
        parameters: {
          shapeCount: 4,
          optionCount: 3,
          includeRotation: false,
        },
      },
    ],
    parentTips: [
      'Ajak anak bermain mencari benda tersembunyi di rumah',
      'Latih mewarnai dengan crayon yang besar dan mudah digenggam',
      'Bermain menyusun balok bersama',
      'Perkenalkan buku cari perbedaan untuk anak',
    ],
  },
  {
    domain: 'Gv',
    domainName: 'Visual Processing - Pemrosesan Visual',
    scoreRange: [41, 70],
    level: 'sedang',
    levelDescription: 'Anak menunjukkan kemampuan visual yang berkembang dengan baik',
    recommendations: [
      {
        gameId: 'find-difference-medium',
        title: 'Cari Perbedaan (Menengah)',
        description: 'Menemukan 5 perbedaan pada gambar detail',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'visual_discrimination',
        parameters: {
          differenceCount: 5,
          imageComplexity: 'medium',
          colorContrast: 'medium',
          timeLimit: 120,
        },
      },
      {
        gameId: 'puzzle-3x3',
        title: 'Puzzle Gambar 3x3',
        description: 'Menyusun puzzle gambar dalam grid 3x3',
        difficulty: 2,
        durationMinutes: 8,
        targetSkill: 'spatial_visualization',
        parameters: {
          gridSize: '3x3',
          pieceCount: 9,
          imageComplexity: 'medium',
        },
      },
      {
        gameId: 'tangram-5piece',
        title: 'Tangram 5 Keping',
        description: 'Menyusun bentuk menengah dengan 5 keping tangram',
        difficulty: 2,
        durationMinutes: 8,
        targetSkill: 'spatial_visualization',
        parameters: {
          pieceCount: 5,
          targetShapeComplexity: 'medium',
          showOutline: true,
          rotationRequired: true,
        },
      },
      {
        gameId: 'rotation-90',
        title: 'Rotasi Bentuk 90°',
        description: 'Memilih gambar yang dirotasi 90 derajat',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'mental_rotation',
        parameters: {
          rotationAngle: 90,
          shapeComplexity: 'medium',
          optionCount: 4,
        },
      },
      {
        gameId: 'hidden-pictures',
        title: 'Gambar Tersembunyi',
        description: 'Menemukan objek tersembunyi dalam gambar ramai',
        difficulty: 2,
        durationMinutes: 8,
        targetSkill: 'figure_ground_perception',
        parameters: {
          hiddenObjectCount: 5,
          backgroundComplexity: 'medium',
        },
      },
    ],
    parentTips: [
      'Ajak anak menggambar dan menceritakan gambarnya',
      'Bermain tebak bentuk dengan mata tertutup (sentuh dan tebak)',
      'Perkenalkan origami sederhana',
      'Latih membaca peta sederhana saat jalan-jalan',
    ],
  },
  {
    domain: 'Gv',
    domainName: 'Visual Processing - Pemrosesan Visual',
    scoreRange: [71, 100],
    level: 'tinggi',
    levelDescription: 'Anak memiliki kemampuan pemrosesan visual yang sangat baik',
    recommendations: [
      {
        gameId: 'find-difference-hard',
        title: 'Cari Perbedaan (Sulit)',
        description: 'Menemukan 7+ perbedaan halus pada gambar kompleks',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'visual_discrimination',
        parameters: {
          differenceCount: 7,
          imageComplexity: 'complex',
          colorContrast: 'low',
          timeLimit: 90,
        },
      },
      {
        gameId: 'puzzle-4x4',
        title: 'Puzzle Gambar 4x4',
        description: 'Menyusun puzzle kompleks dalam grid 4x4',
        difficulty: 3,
        durationMinutes: 12,
        targetSkill: 'spatial_visualization',
        parameters: {
          gridSize: '4x4',
          pieceCount: 16,
          imageComplexity: 'complex',
          irregularPieces: true,
        },
      },
      {
        gameId: 'tangram-7piece',
        title: 'Tangram 7 Keping Klasik',
        description: 'Menyusun bentuk kompleks dengan tangram lengkap',
        difficulty: 3,
        durationMinutes: 12,
        targetSkill: 'spatial_visualization',
        parameters: {
          pieceCount: 7,
          targetShapeComplexity: 'complex',
          showOutline: false,
          rotationRequired: true,
          flipRequired: true,
        },
      },
      {
        gameId: 'rotation-180',
        title: 'Rotasi Bentuk 180°',
        description: 'Memilih gambar yang dirotasi 180 derajat atau dicerminkan',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'mental_rotation',
        parameters: {
          rotationAngle: 180,
          includeMirror: true,
          shapeComplexity: 'complex',
          optionCount: 5,
        },
      },
      {
        gameId: 'maze-complex',
        title: 'Labirin Kompleks',
        description: 'Menyelesaikan labirin dengan multiple path',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'spatial_scanning',
        parameters: {
          mazeSize: 'large',
          deadEndCount: 'many',
          visualObstacles: true,
        },
      },
    ],
    parentTips: [
      'Dorong hobi menggambar atau melukis',
      'Perkenalkan model kit atau LEGO kompleks',
      'Ajak anak membaca peta dan navigasi',
      'Eksplorasi aplikasi desain atau seni digital',
    ],
  },
];

// ============================================================================
// RECOMMENDATION RULES - WORKING MEMORY (Gsm)
// ============================================================================

export const GSM_RECOMMENDATIONS: DomainRecommendationRule[] = [
  {
    domain: 'Gsm',
    domainName: 'Working Memory - Memori Kerja',
    scoreRange: [0, 40],
    level: 'rendah',
    levelDescription: 'Anak membutuhkan stimulasi tambahan untuk memori kerja',
    recommendations: [
      {
        gameId: 'memory-card-2x2',
        title: 'Memory Card 2x2',
        description: 'Mencocokkan 4 kartu (2 pasang)',
        difficulty: 1,
        durationMinutes: 3,
        targetSkill: 'visual_memory',
        parameters: {
          gridSize: '2x2',
          cardCount: 4,
          pairCount: 2,
          flipDuration: 2000,
          imageType: 'simple_icons',
        },
      },
      {
        gameId: 'simon-says-3',
        title: 'Simon Says (3 Langkah)',
        description: 'Mengikuti urutan 3 warna/suara',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'sequential_memory',
        parameters: {
          sequenceLength: 3,
          colorCount: 4,
          displaySpeed: 'slow',
          repeatAllowed: true,
        },
      },
      {
        gameId: 'sequence-recall-3',
        title: 'Ingat Urutan (3 Item)',
        description: 'Mengingat dan mengulangi urutan 3 gambar/angka',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'sequential_memory',
        parameters: {
          itemCount: 3,
          itemType: 'pictures',
          displayTime: 3000,
          recallType: 'forward',
        },
      },
      {
        gameId: 'whats-missing-easy',
        title: 'Apa yang Hilang? (Mudah)',
        description: 'Mengidentifikasi 1 objek yang hilang dari 4 objek',
        difficulty: 1,
        durationMinutes: 5,
        targetSkill: 'visual_memory',
        parameters: {
          objectCount: 4,
          missingCount: 1,
          displayTime: 5000,
        },
      },
    ],
    parentTips: [
      'Bermain "Simon Says" versi sederhana di rumah',
      'Latih mengingat daftar belanja pendek bersama',
      'Gunakan lagu untuk membantu mengingat (ABC, angka)',
      'Beri waktu lebih saat anak perlu mengingat sesuatu',
    ],
  },
  {
    domain: 'Gsm',
    domainName: 'Working Memory - Memori Kerja',
    scoreRange: [41, 70],
    level: 'sedang',
    levelDescription: 'Anak menunjukkan kemampuan memori kerja yang berkembang dengan baik',
    recommendations: [
      {
        gameId: 'memory-card-3x4',
        title: 'Memory Card 3x4',
        description: 'Mencocokkan 12 kartu (6 pasang)',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'visual_memory',
        parameters: {
          gridSize: '3x4',
          cardCount: 12,
          pairCount: 6,
          flipDuration: 1500,
          imageType: 'detailed_pictures',
        },
      },
      {
        gameId: 'simon-says-5',
        title: 'Simon Says (5 Langkah)',
        description: 'Mengikuti urutan 5 warna/suara',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'sequential_memory',
        parameters: {
          sequenceLength: 5,
          colorCount: 4,
          displaySpeed: 'medium',
          repeatAllowed: false,
        },
      },
      {
        gameId: 'sequence-recall-5',
        title: 'Ingat Urutan (5 Item)',
        description: 'Mengingat dan mengulangi urutan 5 gambar/angka',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'sequential_memory',
        parameters: {
          itemCount: 5,
          itemType: 'mixed',
          displayTime: 2500,
          recallType: 'forward',
        },
      },
      {
        gameId: 'backward-digit-3',
        title: 'Angka Terbalik (3 Digit)',
        description: 'Mengulang 3 angka dalam urutan terbalik',
        difficulty: 2,
        durationMinutes: 7,
        targetSkill: 'working_memory_manipulation',
        parameters: {
          digitCount: 3,
          displayMode: 'audio_visual',
          recallType: 'backward',
        },
      },
      {
        gameId: 'n-back-1',
        title: 'N-Back Level 1',
        description: 'Mengidentifikasi jika item sama dengan 1 item sebelumnya',
        difficulty: 2,
        durationMinutes: 8,
        targetSkill: 'working_memory_updating',
        parameters: {
          nBackLevel: 1,
          itemType: 'shapes',
          trialCount: 20,
          targetPercentage: 30,
        },
      },
    ],
    parentTips: [
      'Bermain kartu memori dengan variasi lebih banyak',
      'Ajak anak menceritakan ulang film/cerita yang baru ditonton',
      'Latih mengingat instruksi 2-3 langkah sekaligus',
      'Gunakan teknik chunking (pengelompokan) untuk mengingat',
    ],
  },
  {
    domain: 'Gsm',
    domainName: 'Working Memory - Memori Kerja',
    scoreRange: [71, 100],
    level: 'tinggi',
    levelDescription: 'Anak memiliki kemampuan memori kerja yang sangat baik',
    recommendations: [
      {
        gameId: 'memory-card-4x4',
        title: 'Memory Card 4x4',
        description: 'Mencocokkan 16 kartu (8 pasang)',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'visual_memory',
        parameters: {
          gridSize: '4x4',
          cardCount: 16,
          pairCount: 8,
          flipDuration: 1000,
          imageType: 'similar_pictures',
        },
      },
      {
        gameId: 'simon-says-7',
        title: 'Simon Says (7 Langkah)',
        description: 'Mengikuti urutan 7 warna/suara',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'sequential_memory',
        parameters: {
          sequenceLength: 7,
          colorCount: 6,
          displaySpeed: 'fast',
          repeatAllowed: false,
        },
      },
      {
        gameId: 'sequence-recall-7',
        title: 'Ingat Urutan (7 Item)',
        description: 'Mengingat dan mengulangi urutan 7 gambar/angka',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'sequential_memory',
        parameters: {
          itemCount: 7,
          itemType: 'abstract',
          displayTime: 2000,
          recallType: 'forward',
        },
      },
      {
        gameId: 'backward-digit-5',
        title: 'Angka Terbalik (5 Digit)',
        description: 'Mengulang 5 angka dalam urutan terbalik',
        difficulty: 3,
        durationMinutes: 10,
        targetSkill: 'working_memory_manipulation',
        parameters: {
          digitCount: 5,
          displayMode: 'audio_only',
          recallType: 'backward',
        },
      },
      {
        gameId: 'n-back-2',
        title: 'N-Back Level 2',
        description: 'Mengidentifikasi jika item sama dengan 2 item sebelumnya',
        difficulty: 3,
        durationMinutes: 12,
        targetSkill: 'working_memory_updating',
        parameters: {
          nBackLevel: 2,
          itemType: 'letters_and_positions',
          trialCount: 25,
          targetPercentage: 25,
        },
      },
      {
        gameId: 'dual-task-memory',
        title: 'Dual Task Memory',
        description: 'Mengingat visual sambil melakukan tugas verbal',
        difficulty: 3,
        durationMinutes: 12,
        targetSkill: 'working_memory_capacity',
        parameters: {
          visualTaskComplexity: 'medium',
          verbalTaskComplexity: 'medium',
          switchingRequired: true,
        },
      },
    ],
    parentTips: [
      'Tantang dengan permainan memori yang lebih kompleks',
      'Ajak anak belajar bahasa baru atau alat musik',
      'Latih multitasking sederhana dengan pengawasan',
      'Dorong penggunaan strategi memori (mnemonics)',
    ],
  },
];

// ============================================================================
// COMBINED RULES & HELPER FUNCTIONS
// ============================================================================

export const ALL_RECOMMENDATION_RULES: DomainRecommendationRule[] = [
  ...GF_RECOMMENDATIONS,
  ...GV_RECOMMENDATIONS,
  ...GSM_RECOMMENDATIONS,
];

/**
 * Mendapatkan level berdasarkan skor
 */
export function getScoreLevel(score: number): ScoreLevel {
  if (score <= 40) return 'rendah';
  if (score <= 70) return 'sedang';
  return 'tinggi';
}

/**
 * Mendapatkan rekomendasi berdasarkan domain dan skor
 */
export function getRecommendations(domain: ChcDomain, score: number): DomainRecommendationRule | undefined {
  const level = getScoreLevel(score);
  return ALL_RECOMMENDATION_RULES.find(
    rule => rule.domain === domain && rule.level === level
  );
}

/**
 * Mendapatkan semua rekomendasi untuk profil CHC lengkap
 */
export function getFullProfileRecommendations(scores: Record<ChcDomain, number>): {
  domain: ChcDomain;
  score: number;
  level: ScoreLevel;
  recommendations: DomainRecommendationRule | undefined;
}[] {
  return (Object.entries(scores) as [ChcDomain, number][]).map(([domain, score]) => ({
    domain,
    score,
    level: getScoreLevel(score),
    recommendations: getRecommendations(domain, score),
  }));
}

/**
 * Format data untuk training ML model
 */
export function exportForMLTraining(): {
  parameters: typeof ASSESSMENT_PARAMETERS;
  rules: {
    domain: ChcDomain;
    scoreMin: number;
    scoreMax: number;
    level: ScoreLevel;
    gameCount: number;
    games: {
      gameId: string;
      difficulty: number;
      targetSkill: string;
      parameters: Record<string, number | string>;
    }[];
  }[];
} {
  return {
    parameters: ASSESSMENT_PARAMETERS,
    rules: ALL_RECOMMENDATION_RULES.map(rule => ({
      domain: rule.domain,
      scoreMin: rule.scoreRange[0],
      scoreMax: rule.scoreRange[1],
      level: rule.level,
      gameCount: rule.recommendations.length,
      games: rule.recommendations.map(game => ({
        gameId: game.gameId,
        difficulty: game.difficulty,
        targetSkill: game.targetSkill,
        parameters: game.parameters,
      })),
    })),
  };
}

export default {
  ASSESSMENT_PARAMETERS,
  GF_RECOMMENDATIONS,
  GV_RECOMMENDATIONS,
  GSM_RECOMMENDATIONS,
  ALL_RECOMMENDATION_RULES,
  getScoreLevel,
  getRecommendations,
  getFullProfileRecommendations,
  exportForMLTraining,
};
