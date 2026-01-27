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
      // Get CHC test result directly using testKey
      const chcTestResult = chcTestResults?.[test.testKey as keyof ChcState] ?? null;

      return {
        ...test,
        score: chcTestResult && chcTestResult.completed ? chcTestResult.score : 0,
        total: chcTestResult ? chcTestResult.total : 10,
        progress: chcTestResult && chcTestResult.completed ? chcTestResult.percentage : 0,
      };
    })
    .filter((test) => {
      const chcTestResult = chcTestResults?.[test.testKey as keyof ChcState];
      return Boolean(chcTestResult?.completed);
    }) as TestDisplayItem[];
}
