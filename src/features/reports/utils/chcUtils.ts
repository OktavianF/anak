import type {
  ChcTest,
  ChcTestResults,
  ChcAssessments,
  ChcDomainKey,
} from '../constants/chcData';
import { chcProgressDataBase } from '../constants/chcData';

export interface ChcUserStats {
  name: string;
  level: number;
  score: number;
  cognitiveProfile: string;
  completedTests: number;
  totalTests: number;
  strengths: Array<{ domain?: string; score: number; developmentLevel: string }>;
  needsImprovement: Array<{ domain?: string; score: number; developmentLevel: string }>;
  overallCognitiveAge: number;
}

export const isCompletedChcTest = (test?: ChcTest): test is ChcTest =>
  !!test && !!test.chcDomain && test.completed === true;

export function calculateChcUserStats(
  childName: string,
  chcTestResults: ChcTestResults
): ChcUserStats {
  const chcDomains = Object.values(chcTestResults).filter(isCompletedChcTest);
  const completedTests = chcDomains.length;
  const totalChcTests = 8;

  let totalScore = 0;
  let totalPossible = 0;

  chcDomains.forEach((test) => {
    if (test.completed && test.score !== undefined) {
      totalScore += test.score;
      totalPossible += test.total ?? 0;
    }
  });

  const averagePercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  let cognitiveProfile = 'Perkembangan Awal';
  if (averagePercentage >= 85) cognitiveProfile = 'Profil Kognitif Superior';
  else if (averagePercentage >= 70) cognitiveProfile = 'Profil Kognitif Rata-rata Tinggi';
  else if (averagePercentage >= 55) cognitiveProfile = 'Profil Kognitif Rata-rata';
  else if (averagePercentage >= 40) cognitiveProfile = 'Profil Kognitif Rata-rata Rendah';

  const domainPerformance = chcDomains
    .map((test) => ({
      domain: test.chcDomain,
      score: test.percentage || 0,
      developmentLevel: test.developmentLevel || 'Belum Diukur',
    }))
    .sort((a, b) => b.score - a.score);

  return {
    name: childName,
    level: completedTests + 1,
    score: averagePercentage,
    cognitiveProfile,
    completedTests,
    totalTests: totalChcTests,
    strengths: domainPerformance.slice(0, 3),
    needsImprovement: domainPerformance.slice(-2),
    overallCognitiveAge: Math.round(averagePercentage / 10) + 4,
  };
}

export interface ChcProgressDomain {
  chcCode: string;
  category: string;
  categoryIndonesian: string;
  color: string;
  testId: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  keyDomain: ChcDomainKey;
  narrowAbilities: string[];
  developmentLevel: string;
  cognitiveImportance: string;
  ageRange: string;
  score?: number;
  completedDate?: string;
  narrowAbilityScores?: Record<string, number>;
  gamePerformance?: {
    averageScore?: number;
    totalPlayed?: number;
    lastPlayed?: string;
  };
}

export function generateChcProgressData(
  chcTestResults: ChcTestResults,
  chcAssessments: ChcAssessments
): ChcProgressDomain[] {
  const progressData = chcProgressDataBase.map((domain) => ({
    ...domain,
    score: undefined as number | undefined,
    completedDate: undefined as string | undefined,
    narrowAbilityScores: {} as Record<string, number>,
    gamePerformance: undefined as
      | { averageScore?: number; totalPlayed?: number; lastPlayed?: string }
      | undefined,
  }));

  progressData.forEach((domain) => {
    const testResult = chcTestResults[domain.keyDomain];
    const assessmentResult = chcAssessments[domain.keyDomain];

    if (testResult && testResult.completed) {
      domain.developmentLevel = testResult.developmentLevel || domain.developmentLevel;
      domain.score = testResult.percentage || 0;
      domain.completedDate = testResult.completedDate;
      domain.narrowAbilityScores = testResult.narrowAbilityScores || {};
    }

    if (assessmentResult && (assessmentResult.totalPlayed ?? 0) > 0) {
      domain.developmentLevel = assessmentResult.developmentLevel || domain.developmentLevel;
      domain.gamePerformance = {
        averageScore: assessmentResult.averageScore,
        totalPlayed: assessmentResult.totalPlayed,
        lastPlayed: assessmentResult.lastPlayed,
      };
    }
  });

  return progressData;
}

export interface ColorClasses {
  bg: string;
  stroke: string;
  text: string;
  light: string;
  border: string;
  icon: string;
}

export function getColorClasses(color: string): ColorClasses {
  const colorMap: Record<string, ColorClasses> = {
    blue: {
      bg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      stroke: 'stroke-indigo-500',
      text: 'text-indigo-600',
      light: 'bg-indigo-50',
      border: 'border-indigo-200',
      icon: 'text-indigo-500',
    },
    orange: {
      bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      stroke: 'stroke-amber-500',
      text: 'text-amber-600',
      light: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'text-amber-500',
    },
    purple: {
      bg: 'bg-gradient-to-br from-violet-500 to-purple-600',
      stroke: 'stroke-violet-500',
      text: 'text-violet-600',
      light: 'bg-violet-50',
      border: 'border-violet-200',
      icon: 'text-violet-500',
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-500 to-green-600',
      stroke: 'stroke-emerald-500',
      text: 'text-emerald-600',
      light: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: 'text-emerald-500',
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
      stroke: 'stroke-indigo-500',
      text: 'text-indigo-600',
      light: 'bg-indigo-50',
      border: 'border-indigo-200',
      icon: 'text-indigo-500',
    },
    pink: {
      bg: 'bg-gradient-to-br from-pink-500 to-rose-600',
      stroke: 'stroke-pink-500',
      text: 'text-pink-600',
      light: 'bg-pink-50',
      border: 'border-pink-200',
      icon: 'text-pink-500',
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      stroke: 'stroke-teal-500',
      text: 'text-teal-600',
      light: 'bg-teal-50',
      border: 'border-teal-200',
      icon: 'text-teal-500',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      stroke: 'stroke-amber-500',
      text: 'text-amber-600',
      light: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'text-amber-500',
    },
  };

  return (
    colorMap[color] || {
      bg: 'bg-gradient-to-br from-slate-500 to-gray-600',
      stroke: 'stroke-slate-500',
      text: 'text-slate-600',
      light: 'bg-slate-50',
      border: 'border-slate-200',
      icon: 'text-slate-500',
    }
  );
}
