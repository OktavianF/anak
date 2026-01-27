import type { ChcState } from '@/shared/hooks/useChc';
import { testDisplayConfig } from '../constants/homeConfig';

export interface TestDisplayItem {
  id: string;
  title: string;
  IconComponent: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  bgColor: string;
  progressColor: string;
  testKey: string;
  score: number | string;
  total: number | string;
  progress: number;
}

export function getTestDisplayData(chcTestResults?: ChcState): TestDisplayItem[] {
  return testDisplayConfig
    .map((test) => {
      if (test.testKey === 'personality') {
        // Special handling for personality test
        const p = chcTestResults?.personality as unknown as
          | { completed?: boolean; animal?: string }
          | undefined;
        return {
          ...test,
          score: p && p.completed ? 'Selesai' : 'Belum',
          total: p && p.completed ? p.animal || 'Selesai' : 'Mulai',
          progress: p && p.completed ? 100 : 0,
        };
      } else {
        // Handle CHC tests - map old keys to new CHC structure
        let chcTestResult = null;
        if (test.testKey === 'cognitive') {
          chcTestResult = chcTestResults?.fluidReasoning ?? null;
        } else if (test.testKey === 'linguistic') {
          chcTestResult = chcTestResults?.comprehensionKnowledge ?? null;
        } else if (test.testKey === 'motor') {
          chcTestResult = chcTestResults?.workingMemory ?? null; // Map motor to working memory for now
        }

        return {
          ...test,
          score: chcTestResult && chcTestResult.completed ? chcTestResult.score : 0,
          total: chcTestResult ? chcTestResult.total : 10,
          progress: chcTestResult && chcTestResult.completed ? chcTestResult.percentage : 0,
        };
      }
    })
    .filter((test) => {
      if (test.testKey === 'personality') {
        return Boolean(chcTestResults?.personality?.completed);
      } else if (test.testKey === 'cognitive') {
        return Boolean(chcTestResults?.fluidReasoning?.completed);
      } else if (test.testKey === 'linguistic') {
        return Boolean(chcTestResults?.comprehensionKnowledge?.completed);
      } else if (test.testKey === 'motor') {
        return Boolean(chcTestResults?.workingMemory?.completed);
      }
      return false;
    }) as TestDisplayItem[];
}
