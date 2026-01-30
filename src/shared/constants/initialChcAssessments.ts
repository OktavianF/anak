// CHC-Based Assessment Initial State
// Based on Cattell-Horn-Carroll theory of cognitive abilities
// 3 Domain yang didukung: Gf, Gv, Gsm

export interface ChcAssessmentSession {
  date: string;
  score: number;
  time: number;
  errors: number;
}

export interface ChcAssessment {
  totalPlayed: number;
  averageTime: number;
  averageErrors: number;
  averageScore: number;
  bestScore: number;
  difficulty: string;
  chcDomain: string;
  narrowAbilities: string[];
  lastPlayed: string | null;
  sessions: ChcAssessmentSession[];
  developmentLevel: string;
}

export interface ChcAssessments {
  fluidReasoning: ChcAssessment;
  visualProcessing: ChcAssessment;
  workingMemory: ChcAssessment;
}

export const initialChcAssessments: ChcAssessments = {
  // Fluid Reasoning (Gf) - Kemampuan menalar & memecahkan masalah baru
  fluidReasoning: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Gf',
    narrowAbilities: ['Penalaran Induktif', 'Penalaran Deduktif', 'Penalaran Kuantitatif'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Sesuai Usia',
  },
  // Visual Processing (Gv) - Kemampuan analisis & manipulasi visual
  visualProcessing: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Gv',
    narrowAbilities: ['Visualisasi', 'Penalaran Spasial', 'Kecepatan Penutupan'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Perlu Perhatian Lebih',
  },
  // Short-Term Working Memory (Gsm) - Kemampuan mengingat & menggunakan info singkat
  workingMemory: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Gsm',
    narrowAbilities: ['Memori Angka', 'Memori Kerja', 'Rentang Memori'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Sesuai Usia',
  },
};
