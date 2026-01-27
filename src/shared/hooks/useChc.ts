import { useCallback, useState } from 'react';

export type ChcDomainKey =
  | 'fluidReasoning'
  | 'comprehensionKnowledge'
  | 'visualProcessing'
  | 'workingMemory'
  | 'processingSpeed'
  | 'auditoryProcessing'
  | 'reactionSpeed'
  | 'longTermMemory';

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
  comprehensionKnowledge: { completed: false, score: 0, total: 10, percentage: 0 },
  visualProcessing: { completed: false, score: 0, total: 10, percentage: 0 },
  workingMemory: { completed: false, score: 0, total: 10, percentage: 0 },
  processingSpeed: { completed: false, score: 0, total: 10, percentage: 0 },
  auditoryProcessing: { completed: false, score: 0, total: 10, percentage: 0 },
  reactionSpeed: { completed: false, score: 0, total: 10, percentage: 0 },
  longTermMemory: { completed: false, score: 0, total: 10, percentage: 0 },
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
      // Minimal mapping example; can be extended and moved to a config file
      const gameToChcMapping: Record<string, ChcDomainKey | undefined> = {
        numberSequence: 'fluidReasoning',
        patternRecognition: 'visualProcessing',
        memory: 'workingMemory',
        wordPuzzle: 'comprehensionKnowledge',
        motor: 'reactionSpeed',
        auditory: 'auditoryProcessing',
        processing: 'processingSpeed',
        longTermMemory: 'longTermMemory',
      };

      const domain = gameToChcMapping[gameType];
      if (!domain) return;

      // Example: update with a simple score/percentage
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
