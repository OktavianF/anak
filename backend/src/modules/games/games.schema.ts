import { z } from 'zod';

export const submitSessionSchema = z.object({
  params: z.object({ childId: z.string().uuid() }),
  body: z.object({
    gameType: z.string().min(1),
    chcDomain: z.enum(['Gf', 'Gv', 'Gsm']),
    score: z.number().int().min(0),
    duration: z.number().int().min(0),
    level: z.number().int().min(1),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    telemetry: z.object({
      accuracy: z.number().min(0).max(100),
      completionTime: z.number().min(0),
      errors: z.number().int().min(0),
      attempts: z.number().int().min(1),
      hintsUsed: z.number().int().min(0).optional(),
      consecutiveCorrect: z.number().int().min(0).optional(),
      // Gf-specific
      complexityLevel: z.number().int().optional(),
      patternRecognitionScore: z.number().optional(),
      averageTimePerProblem: z.number().optional(),
      // Gv-specific
      tapPrecision: z.number().optional(),
      rotationAccuracy: z.number().optional(),
      visualScanTime: z.number().optional(),
      movesCount: z.number().int().optional(),
      movementEfficiency: z.number().optional(),
      // Gsm-specific
      memoryCapacity: z.number().int().optional(),
      sequenceAccuracy: z.number().optional(),
      recallDelay: z.number().optional(),
      orderErrors: z.number().int().optional(),
      itemErrors: z.number().int().optional(),
      longestStreak: z.number().int().optional(),
      maxCombo: z.number().int().optional(),
    }),
  }),
});

export const childIdParamSchema = z.object({
  params: z.object({ childId: z.string().uuid() }),
});

export const gameProgressSchema = z.object({
  params: z.object({
    childId: z.string().uuid(),
    gameType: z.string().min(1),
  }),
});

export type SubmitSessionInput = z.infer<typeof submitSessionSchema>['body'];
