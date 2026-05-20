import { calculateAssessment, getAdaptiveDifficulty } from '../irt-engine.service';
import type { TelemetryInput } from '../irt-engine.service';

describe('IRT Engine Service', () => {
  describe('calculateAssessment - Gf (Fluid Reasoning)', () => {
    it('should return EXCELLENT for high accuracy and fast completion', () => {
      const telemetry: TelemetryInput = {
        accuracy: 95, completionTime: 60, errors: 0, attempts: 1,
        hintsUsed: 0, complexityLevel: 8, patternRecognitionScore: 92,
      };
      const result = calculateAssessment('Gf', telemetry);
      expect(result.developmentLevel).toBe('EXCELLENT');
      expect(result.starRating).toBeGreaterThanOrEqual(4);
      expect(result.finalScore).toBeGreaterThanOrEqual(85);
      expect(result.feedback).toContain('Luar biasa');
    });

    it('should return BELOW for low accuracy with many hints', () => {
      const telemetry: TelemetryInput = {
        accuracy: 25, completionTime: 300, errors: 8, attempts: 5,
        hintsUsed: 5, complexityLevel: 1, patternRecognitionScore: 20,
      };
      const result = calculateAssessment('Gf', telemetry);
      expect(result.developmentLevel).toBe('BELOW');
      expect(result.starRating).toBeLessThanOrEqual(2);
      expect(result.finalScore).toBeLessThan(50);
    });

    it('should return AVERAGE for moderate performance', () => {
      const telemetry: TelemetryInput = {
        accuracy: 65, completionTime: 120, errors: 3, attempts: 2,
        hintsUsed: 1, complexityLevel: 4, patternRecognitionScore: 60,
      };
      const result = calculateAssessment('Gf', telemetry);
      expect(['AVERAGE', 'ABOVE']).toContain(result.developmentLevel);
      expect(result.finalScore).toBeGreaterThanOrEqual(40);
      expect(result.finalScore).toBeLessThan(85);
    });
  });

  describe('calculateAssessment - Gv (Visual Processing)', () => {
    it('should return EXCELLENT for precise visual processing', () => {
      const telemetry: TelemetryInput = {
        accuracy: 98, completionTime: 90, errors: 0, attempts: 1,
        tapPrecision: 95, rotationAccuracy: 92, movementEfficiency: 0.95,
      };
      const result = calculateAssessment('Gv', telemetry);
      expect(result.developmentLevel).toBe('EXCELLENT');
      expect(result.starRating).toBe(5);
      expect(result.parentRecommendation).toContain('visual');
    });

    it('should return BELOW for poor visual processing', () => {
      const telemetry: TelemetryInput = {
        accuracy: 20, completionTime: 400, errors: 10, attempts: 5,
        tapPrecision: 15, rotationAccuracy: 18, movementEfficiency: 0.2,
      };
      const result = calculateAssessment('Gv', telemetry);
      expect(result.developmentLevel).toBe('BELOW');
      expect(result.finalScore).toBeLessThan(50);
    });
  });

  describe('calculateAssessment - Gsm (Working Memory)', () => {
    it('should return EXCELLENT for high memory capacity', () => {
      const telemetry: TelemetryInput = {
        accuracy: 95, completionTime: 60, errors: 0, attempts: 1,
        memoryCapacity: 9, sequenceAccuracy: 94, recallDelay: 1, longestStreak: 12,
      };
      const result = calculateAssessment('Gsm', telemetry);
      expect(result.developmentLevel).toBe('EXCELLENT');
      expect(result.feedback).toContain('Memori');
    });

    it('should return BELOW for low memory performance', () => {
      const telemetry: TelemetryInput = {
        accuracy: 30, completionTime: 200, errors: 7, attempts: 4,
        memoryCapacity: 2, sequenceAccuracy: 25, recallDelay: 10, longestStreak: 1,
      };
      const result = calculateAssessment('Gsm', telemetry);
      expect(result.developmentLevel).toBe('BELOW');
      expect(result.starRating).toBeLessThanOrEqual(2);
    });
  });

  describe('Score output structure', () => {
    it('should contain all required fields', () => {
      const telemetry: TelemetryInput = {
        accuracy: 70, completionTime: 100, errors: 2, attempts: 1,
      };
      const result = calculateAssessment('Gf', telemetry);

      expect(result).toHaveProperty('finalScore');
      expect(result).toHaveProperty('starRating');
      expect(result).toHaveProperty('developmentLevel');
      expect(result).toHaveProperty('scoreBreakdown');
      expect(result).toHaveProperty('feedback');
      expect(result).toHaveProperty('parentRecommendation');
      expect(typeof result.finalScore).toBe('number');
      expect(result.finalScore).toBeGreaterThanOrEqual(0);
      expect(result.finalScore).toBeLessThanOrEqual(100);
      expect(result.starRating).toBeGreaterThanOrEqual(1);
      expect(result.starRating).toBeLessThanOrEqual(5);
    });

    it('should clamp scores between 0 and 100', () => {
      const overflowTelemetry: TelemetryInput = {
        accuracy: 150, completionTime: 0, errors: 0, attempts: 1,
        memoryCapacity: 20, sequenceAccuracy: 200,
      };
      const result = calculateAssessment('Gsm', overflowTelemetry);
      expect(result.finalScore).toBeLessThanOrEqual(100);
      expect(result.finalScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getAdaptiveDifficulty', () => {
    it('should return EASY for empty scores', () => {
      expect(getAdaptiveDifficulty([])).toBe('EASY');
    });

    it('should return EASY for low scores', () => {
      expect(getAdaptiveDifficulty([20, 30, 35])).toBe('EASY');
    });

    it('should return MEDIUM for moderate scores', () => {
      expect(getAdaptiveDifficulty([50, 60, 55])).toBe('MEDIUM');
    });

    it('should return HARD for high scores', () => {
      expect(getAdaptiveDifficulty([80, 85, 90])).toBe('HARD');
    });

    it('should handle single score', () => {
      expect(getAdaptiveDifficulty([95])).toBe('HARD');
      expect(getAdaptiveDifficulty([25])).toBe('EASY');
    });
  });
});
