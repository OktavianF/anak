import { useCallback, useState } from 'react';

/**
 * 3 Domain CHC yang didukung:
 * - fluidReasoning (Gf)  - Penalaran Logis
 * - visualProcessing (Gv) - Pemrosesan Visual  
 * - workingMemory (Gsm)   - Memori Kerja
 */
export type ChcDomainKey = 'fluidReasoning' | 'visualProcessing' | 'workingMemory';

export type ChcTestResult = {
  completed: boolean;
  score?: number;
  total?: number;
  percentage?: number;
  completedDate?: string | null;
};

export type ChcState = Record<ChcDomainKey, ChcTestResult>;

const initialState: ChcState = {
  fluidReasoning: { completed: false, score: 0, total: 10, percentage: 0 },
  visualProcessing: { completed: false, score: 0, total: 10, percentage: 0 },
  workingMemory: { completed: false, score: 0, total: 10, percentage: 0 },
};

export function useChc() {
  const [chcTests, setChcTests] = useState<ChcState>(initialState);

  const updateChcTestResults = useCallback(
    (domain: ChcDomainKey, results: Partial<ChcTestResult>) => {
      setChcTests((prev) => ({
        ...prev,
        [domain]: {
          ...prev[domain],
          ...results,
          completed: true,
          completedDate: new Date().toISOString(),
        },
      }));
    },
    []
  );

  const updateChcAssessment = useCallback(
    (gameType: string, sessionData: any) => {
      // Mapping game types ke 3 domain CHC
      const gameToChcMapping: Record<string, ChcDomainKey | undefined> = {
        // Fluid Reasoning (Gf)
        numberSequence: 'fluidReasoning',
        patternRecognition: 'fluidReasoning',
        logicPuzzle: 'fluidReasoning',
        wordPuzzle: 'fluidReasoning', // Fallback ke Gf
        // Visual Processing (Gv)
        puzzle: 'visualProcessing',
        coloring: 'visualProcessing',
        findDifference: 'visualProcessing',
        tangram: 'visualProcessing',
        // Working Memory (Gsm)
        memory: 'workingMemory',
        simonSays: 'workingMemory',
        sequenceRecall: 'workingMemory',
      };

      const domain = gameToChcMapping[gameType];
      if (!domain) return;

      const score = sessionData?.score ?? 0;
      const total = sessionData?.total ?? 10;
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

      updateChcTestResults(domain, { score, total, percentage });
    },
    [updateChcTestResults]
  );

  return {
    chcTests,
    updateChcTestResults,
    updateChcAssessment,
  } as const;
}
