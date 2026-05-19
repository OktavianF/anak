import { useState, useCallback, useMemo } from 'react';

type TabType = 'current' | 'weekly' | 'charts';

interface ChcTest {
  chcDomain?: string;
  completed?: boolean;
  score?: number;
  total?: number;
  percentage?: number;
  developmentLevel?: string;
  completedDate?: string;
  narrowAbilityScores?: Record<string, number>;
}

interface ChcAssess {
  totalPlayed?: number;
  developmentLevel?: string;
  averageScore?: number;
  lastPlayed?: string;
}

type ChcDomainKey =
  | 'fluidReasoning'
  | 'comprehensionKnowledge'
  | 'visualProcessing'
  | 'workingMemory'
  | 'longTermMemory'
  | 'processingSpeed'
  | 'auditoryProcessing'
  | 'reactionSpeed';

type ChcTestResults = Partial<Record<ChcDomainKey, ChcTest>>;
type ChcAssessments = Partial<Record<ChcDomainKey, ChcAssess>>;

interface UseProgressOptions {
  chcTestResults?: ChcTestResults;
  chcAssessments?: ChcAssessments;
  initialTab?: TabType;
}

const isCompletedChcTest = (test?: ChcTest): test is ChcTest =>
  !!test && !!test.chcDomain && test.completed === true;

export function useProgress(options: UseProgressOptions = {}) {
  const { chcTestResults = {}, chcAssessments = {} } = options;
  const [activeTab, setActiveTab] = useState<TabType>(options.initialTab ?? 'current');

  const calculateChcUserStats = useCallback(() => {
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

    return {
      testsCompleted: `${completedTests}/${totalChcTests}`,
      averageScore: averagePercentage,
      lastActivity: getLatestActivity(chcDomains),
      totalPlayed: calculateTotalPlayed(chcAssessments),
    };
  }, [chcTestResults, chcAssessments]);

  const getLatestActivity = (chcDomains: ChcTest[]) => {
    const latestTest = chcDomains
      .filter((t) => t.completedDate)
      .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime())[0];
    return latestTest?.completedDate || 'Belum ada';
  };

  const calculateTotalPlayed = (assessments: ChcAssessments) => {
    return Object.values(assessments).reduce((total, assess) => total + (assess?.totalPlayed ?? 0), 0);
  };

  const stats = useMemo(() => calculateChcUserStats(), [calculateChcUserStats]);

  return {
    activeTab,
    setActiveTab,
    stats,
    chcTestResults,
    chcAssessments,
  };
}

export default useProgress;
export type { TabType, ChcTest, ChcAssess, ChcDomainKey, ChcTestResults, ChcAssessments };
