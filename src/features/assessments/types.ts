// Assessments feature types
export interface TestResult {
  testType: string;
  score: number;
  total: number;
  percentage: number;
  completedDate: string;
  duration: number;
}

export interface ChcAssessment {
  domain: string;
  totalPlayed: number;
  averageScore: number;
  bestScore: number;
  developmentLevel: string;
}

export interface CognitiveTestData {
  type: 'logic' | 'attention' | 'memory' | 'pattern';
  questions: Question[];
}

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string | number;
  image?: string;
}
