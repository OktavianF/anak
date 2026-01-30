import { Brain, Target, Zap } from 'lucide-react';

/**
 * 3 Domain CHC yang didukung:
 * - Gf  (Fluid Reasoning)    - Penalaran Logis
 * - Gv  (Visual Processing)  - Pemrosesan Visual
 * - Gsm (Working Memory)     - Memori Kerja
 */
export type ChcDomainKey = 'fluidReasoning' | 'visualProcessing' | 'workingMemory';

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
    visualProcessing: 58,
    workingMemory: 72,
  },
  {
    week: 'Minggu 2',
    fluidReasoning: 68,
    visualProcessing: 62,
    workingMemory: 75,
  },
  {
    week: 'Minggu 3',
    fluidReasoning: 72,
    visualProcessing: 65,
    workingMemory: 78,
  },
  {
    week: 'Minggu 4',
    fluidReasoning: 75,
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
];
