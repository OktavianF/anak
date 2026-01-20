// CHC-Based Assessment Initial State
// Based on Cattell-Horn-Carroll theory of cognitive abilities

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
  comprehensionKnowledge: ChcAssessment;
  visualProcessing: ChcAssessment;
  workingMemory: ChcAssessment;
  longTermMemory: ChcAssessment;
  processingSpeed: ChcAssessment;
  auditoryProcessing: ChcAssessment;
  reactionSpeed: ChcAssessment;
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
  // Comprehension-Knowledge (Gc) - Pengetahuan & pemahaman bahasa
  comprehensionKnowledge: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Gc',
    narrowAbilities: ['Perkembangan Bahasa', 'Pengetahuan Leksikal', 'Informasi Umum'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Sangat Baik',
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
  // Long-Term Storage and Retrieval (Glr) - Kemampuan menyimpan & mengambil memori jangka panjang
  longTermMemory: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Glr',
    narrowAbilities: [
      'Penyimpanan dan Pemanggilan',
      'Kelancaran Asosiasi',
      'Pembelajaran Bermakna',
    ],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Baik',
  },
  // Processing Speed (Gs) - Kecepatan melakukan tugas kognitif sederhana
  processingSpeed: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Gs',
    narrowAbilities: ['Kecepatan Persepsi', 'Kecepatan Numerik', 'Kecepatan Membaca'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Sangat Baik',
  },
  // Auditory Processing (Ga) - Kemampuan memproses suara & bunyi
  auditoryProcessing: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Ga',
    narrowAbilities: ['Diskriminasi Auditori', 'Memori Auditori', 'Pemrosesan Temporal'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Sesuai Usia',
  },
  // Reaction and Decision Speed (Gt) - Kecepatan dalam mengambil keputusan
  reactionSpeed: {
    totalPlayed: 0,
    averageTime: 0,
    averageErrors: 0,
    averageScore: 0,
    bestScore: 0,
    difficulty: 'medium',
    chcDomain: 'Gt',
    narrowAbilities: ['Waktu Reaksi Sederhana', 'Waktu Reaksi Pilihan', 'Kecepatan Keputusan'],
    lastPlayed: null,
    sessions: [],
    developmentLevel: 'Baik',
  },
};
