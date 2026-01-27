import {
  Brain,
  MessageCircle,
  Target,
  Zap,
  Award,
  Sparkles,
  Heart,
  Trophy,
} from 'lucide-react';

export type ChcDomainKey =
  | 'fluidReasoning'
  | 'comprehensionKnowledge'
  | 'visualProcessing'
  | 'workingMemory'
  | 'longTermMemory'
  | 'processingSpeed'
  | 'auditoryProcessing'
  | 'reactionSpeed';

export interface ChcTest {
  chcDomain?: string;
  completed?: boolean;
  score?: number;
  total?: number;
  percentage?: number;
  developmentLevel?: string;
  completedDate?: string;
  narrowAbilityScores?: Record<string, number>;
}

export interface ChcAssess {
  totalPlayed?: number;
  developmentLevel?: string;
  averageScore?: number;
  lastPlayed?: string;
}

export type ChcTestResults = Partial<Record<ChcDomainKey, ChcTest>>;
export type ChcAssessments = Partial<Record<ChcDomainKey, ChcAssess>>;

export const chcWeeklyData = [
  {
    week: 'Minggu 1',
    fluidReasoning: 65,
    comprehensionKnowledge: 70,
    visualProcessing: 58,
    workingMemory: 72,
  },
  {
    week: 'Minggu 2',
    fluidReasoning: 68,
    comprehensionKnowledge: 73,
    visualProcessing: 62,
    workingMemory: 75,
  },
  {
    week: 'Minggu 3',
    fluidReasoning: 72,
    comprehensionKnowledge: 76,
    visualProcessing: 65,
    workingMemory: 78,
  },
  {
    week: 'Minggu 4',
    fluidReasoning: 75,
    comprehensionKnowledge: 82,
    visualProcessing: 68,
    workingMemory: 82,
  },
];

export const chcChartData = {
  fluidReasoning: [
    {
      narrowAbility: 'Penalaran Induktif',
      score: 78,
      target: 85,
      description: 'Kemampuan menalar pola dan aturan',
    },
    {
      narrowAbility: 'Penalaran Deduktif',
      score: 72,
      target: 80,
      description: 'Kemampuan menerapkan aturan logis',
    },
    {
      narrowAbility: 'Penalaran Kuantitatif',
      score: 68,
      target: 75,
      description: 'Kemampuan menalar dengan angka',
    },
  ],
  comprehensionKnowledge: [
    {
      narrowAbility: 'Perkembangan Bahasa',
      score: 85,
      target: 90,
      description: 'Pemahaman bahasa dan komunikasi',
    },
    {
      narrowAbility: 'Pengetahuan Leksikal',
      score: 82,
      target: 85,
      description: 'Kosakata dan makna kata',
    },
    {
      narrowAbility: 'Informasi Umum',
      score: 78,
      target: 82,
      description: 'Pengetahuan dunia dan budaya',
    },
  ],
  visualProcessing: [
    {
      narrowAbility: 'Visualisasi',
      score: 65,
      target: 75,
      description: 'Kemampuan membayangkan objek dalam ruang',
    },
    {
      narrowAbility: 'Penalaran Spasial',
      score: 68,
      target: 78,
      description: 'Pemahaman hubungan spasial',
    },
    {
      narrowAbility: 'Kecepatan Penutupan',
      score: 72,
      target: 80,
      description: 'Mengenali objek dari bagian yang tidak lengkap',
    },
  ],
  workingMemory: [
    {
      narrowAbility: 'Memori Angka',
      score: 75,
      target: 82,
      description: 'Mengingat urutan angka',
    },
    {
      narrowAbility: 'Memori Kerja',
      score: 78,
      target: 85,
      description: 'Mengolah informasi dalam pikiran',
    },
    {
      narrowAbility: 'Rentang Memori',
      score: 82,
      target: 88,
      description: 'Kapasitas memori jangka pendek',
    },
  ],
  longTermMemory: [
    {
      narrowAbility: 'Memori Asosiasi',
      score: 70,
      target: 78,
      description: 'Mengingat hubungan antar informasi',
    },
    {
      narrowAbility: 'Pembelajaran Bermakna',
      score: 75,
      target: 82,
      description: 'Menyimpan informasi dengan makna',
    },
    {
      narrowAbility: 'Pemanggilan Bebas',
      score: 68,
      target: 75,
      description: 'Mengingat tanpa petunjuk',
    },
  ],
  processingSpeed: [
    {
      narrowAbility: 'Kecepatan Persepsi',
      score: 85,
      target: 90,
      description: 'Kecepatan mengenali informasi visual',
    },
    {
      narrowAbility: 'Kecepatan Numerik',
      score: 82,
      target: 88,
      description: 'Kecepatan dalam tugas numerik',
    },
    {
      narrowAbility: 'Kecepatan Membaca',
      score: 78,
      target: 85,
      description: 'Kecepatan dalam membaca',
    },
  ],
  auditoryProcessing: [
    {
      narrowAbility: 'Kodifikasi Fonetik',
      score: 72,
      target: 80,
      description: 'Memproses bunyi bahasa',
    },
    {
      narrowAbility: 'Diskriminasi Bunyi',
      score: 75,
      target: 82,
      description: 'Membedakan bunyi serupa',
    },
    {
      narrowAbility: 'Pemrosesan Temporal',
      score: 68,
      target: 75,
      description: 'Memproses urutan bunyi',
    },
  ],
  reactionSpeed: [
    {
      narrowAbility: 'Waktu Reaksi Sederhana',
      score: 80,
      target: 85,
      description: 'Kecepatan respons dasar',
    },
    {
      narrowAbility: 'Waktu Reaksi Pilihan',
      score: 75,
      target: 82,
      description: 'Kecepatan membuat keputusan',
    },
    {
      narrowAbility: 'Kecepatan Perbandingan Mental',
      score: 78,
      target: 85,
      description: 'Kecepatan membandingkan informasi',
    },
  ],
};

export const chcProgressDataBase = [
  {
    chcCode: 'Gf',
    category: 'Fluid Reasoning',
    categoryIndonesian: 'Penalaran Cair',
    color: 'blue',
    testId: 'fluid-reasoning-test',
    icon: Brain,
    description: 'Kemampuan menalar dan memecahkan masalah baru secara logis',
    keyDomain: 'fluidReasoning' as ChcDomainKey,
    narrowAbilities: ['Penalaran Induktif', 'Penalaran Deduktif', 'Penalaran Kuantitatif'],
    developmentLevel: 'Sesuai Usia',
    cognitiveImportance: 'Sangat Penting untuk belajar konsep baru dan pemecahan masalah',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Gc',
    category: 'Comprehension-Knowledge',
    categoryIndonesian: 'Pemahaman-Pengetahuan',
    color: 'orange',
    testId: 'comprehension-knowledge-test',
    icon: MessageCircle,
    description: 'Pengetahuan yang diperoleh dan kemampuan memahami bahasa',
    keyDomain: 'comprehensionKnowledge' as ChcDomainKey,
    narrowAbilities: ['Perkembangan Bahasa', 'Pengetahuan Leksikal', 'Informasi Umum'],
    developmentLevel: 'Sangat Baik',
    cognitiveImportance: 'Fundamental untuk prestasi akademik dan komunikasi',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Gv',
    category: 'Visual Processing',
    categoryIndonesian: 'Pemrosesan Visual',
    color: 'purple',
    testId: 'visual-processing-test',
    icon: Target,
    description: 'Kemampuan menganalisis dan memanipulasi informasi visual-spasial',
    keyDomain: 'visualProcessing' as ChcDomainKey,
    narrowAbilities: ['Visualisasi', 'Penalaran Spasial', 'Kecepatan Penutupan'],
    developmentLevel: 'Perlu Perhatian Lebih',
    cognitiveImportance: 'Penting untuk matematika, seni, dan pemecahan masalah visual',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Gsm',
    category: 'Short-Term Working Memory',
    categoryIndonesian: 'Memori Kerja Jangka Pendek',
    color: 'green',
    testId: 'working-memory-test',
    icon: Zap,
    description: 'Kemampuan menyimpan dan memanipulasi informasi dalam pikiran',
    keyDomain: 'workingMemory' as ChcDomainKey,
    narrowAbilities: ['Memori Angka', 'Memori Kerja', 'Rentang Memori'],
    developmentLevel: 'Sesuai Usia',
    cognitiveImportance: 'Krusial untuk perhatian, konsentrasi, dan pembelajaran',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Glr',
    category: 'Long-Term Storage & Retrieval',
    categoryIndonesian: 'Penyimpanan & Pemanggilan Memori',
    color: 'indigo',
    testId: 'long-term-memory-test',
    icon: Award,
    description: 'Kemampuan menyimpan dan mengambil informasi jangka panjang',
    keyDomain: 'longTermMemory' as ChcDomainKey,
    narrowAbilities: ['Memori Asosiasi', 'Pembelajaran Bermakna', 'Pemanggilan Bebas'],
    developmentLevel: 'Baik',
    cognitiveImportance: 'Esensial untuk pembelajaran dan akumulasi pengetahuan',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Gs',
    category: 'Processing Speed',
    categoryIndonesian: 'Kecepatan Pemrosesan',
    color: 'pink',
    testId: 'processing-speed-test',
    icon: Sparkles,
    description: 'Kecepatan melakukan tugas kognitif sederhana dengan akurat',
    keyDomain: 'processingSpeed' as ChcDomainKey,
    narrowAbilities: ['Kecepatan Persepsi', 'Kecepatan Numerik', 'Kecepatan Membaca'],
    developmentLevel: 'Sangat Baik',
    cognitiveImportance: 'Mendukung efisiensi dalam tugas akademik dan sehari-hari',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Ga',
    category: 'Auditory Processing',
    categoryIndonesian: 'Pemrosesan Auditori',
    color: 'teal',
    testId: 'auditory-processing-test',
    icon: Heart,
    description: 'Kemampuan memproses dan menganalisis informasi auditori',
    keyDomain: 'auditoryProcessing' as ChcDomainKey,
    narrowAbilities: ['Kodifikasi Fonetik', 'Diskriminasi Bunyi', 'Pemrosesan Temporal'],
    developmentLevel: 'Sesuai Usia',
    cognitiveImportance: 'Fundamental untuk perkembangan bahasa dan membaca',
    ageRange: '5-12 tahun',
  },
  {
    chcCode: 'Gt',
    category: 'Reaction & Decision Speed',
    categoryIndonesian: 'Kecepatan Reaksi & Keputusan',
    color: 'amber',
    testId: 'reaction-speed-test',
    icon: Trophy,
    description: 'Kecepatan dalam mengambil keputusan dan bereaksi',
    keyDomain: 'reactionSpeed' as ChcDomainKey,
    narrowAbilities: [
      'Waktu Reaksi Sederhana',
      'Waktu Reaksi Pilihan',
      'Kecepatan Perbandingan Mental',
    ],
    developmentLevel: 'Baik',
    cognitiveImportance: 'Penting untuk respons cepat dan pengambilan keputusan',
    ageRange: '5-12 tahun',
  },
];
