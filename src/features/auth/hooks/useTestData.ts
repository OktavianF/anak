import { useMemo } from 'react';
import type { ChcState } from '@/shared/hooks/useChc';

interface TestDisplayData {
  id: string;
  title: string;
  testKey: string;
  score: string | number;
  total: string | number;
  progress: number;
}

interface UseTestDataOptions {
  chcTestResults?: ChcState;
  tests: Array<{
    id: string;
    title: string;
    testKey: string;
  }>;
}

export function useTestData({ chcTestResults, tests }: UseTestDataOptions): TestDisplayData[] {
  return useMemo(() => {
    return tests.map((test) => {
      if (test.testKey === 'personality') {
        const p = chcTestResults?.personality as unknown as { completed?: boolean; animal?: string } | undefined;
        return {
          ...test,
          score: p && p.completed ? 'Selesai' : 'Belum',
          total: p && p.completed ? p.animal || 'Selesai' : 'Mulai',
          progress: p && p.completed ? 100 : 0,
        };
      }

      let chcTestResult = null;
      if (test.testKey === 'cognitive') {
        chcTestResult = chcTestResults?.fluidReasoning ?? null;
      } else if (test.testKey === 'linguistic') {
        chcTestResult = chcTestResults?.comprehensionKnowledge ?? null;
      } else if (test.testKey === 'motor') {
        chcTestResult = chcTestResults?.processingSpeed ?? null;
      }

      if (chcTestResult && chcTestResult.completed) {
        return {
          ...test,
          score: chcTestResult.score ?? 0,
          total: chcTestResult.total ?? 0,
          progress: chcTestResult.percentage ?? 0,
        };
      }

      return {
        ...test,
        score: 'Belum',
        total: 'Mulai',
        progress: 0,
      };
    });
  }, [chcTestResults, tests]);
}

export default useTestData;
