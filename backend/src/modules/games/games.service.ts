import prisma from '../../config/database';
import { NotFoundError, ForbiddenError } from '../../utils/errors';
import { calculateAssessment, getAdaptiveDifficulty } from '../assessments/irt-engine.service';
import type { SubmitSessionInput } from './games.schema';

export class GamesService {
  /** Submit a game session with telemetry → auto-calculate assessment */
  async submitSession(childId: string, parentId: string, data: SubmitSessionInput) {
    // Verify child ownership
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    // Calculate assessment via IRT engine
    const assessment = calculateAssessment(data.chcDomain, data.telemetry);

    // Create session + telemetry + assessment in transaction
    const result = await prisma.$transaction(async (tx) => {
      const session = await tx.anak_game_sessions.create({
        data: {
          child_id: childId,
          game_type: data.gameType,
          chc_domain: data.chcDomain,
          score: data.score,
          duration: data.duration,
          level: data.level,
          difficulty: data.difficulty,
        },
      });

      await tx.anak_game_telemetry.create({
        data: {
          session_id: session.id,
          accuracy: data.telemetry.accuracy,
          completion_time: data.telemetry.completionTime,
          errors: data.telemetry.errors,
          attempts: data.telemetry.attempts,
          hints_used: data.telemetry.hintsUsed ?? 0,
          consecutive_correct: data.telemetry.consecutiveCorrect ?? 0,
          complexity_level: data.telemetry.complexityLevel,
          pattern_recognition_score: data.telemetry.patternRecognitionScore,
          average_time_per_problem: data.telemetry.averageTimePerProblem,
          tap_precision: data.telemetry.tapPrecision,
          rotation_accuracy: data.telemetry.rotationAccuracy,
          visual_scan_time: data.telemetry.visualScanTime,
          moves_count: data.telemetry.movesCount,
          movement_efficiency: data.telemetry.movementEfficiency,
          memory_capacity: data.telemetry.memoryCapacity,
          sequence_accuracy: data.telemetry.sequenceAccuracy,
          recall_delay: data.telemetry.recallDelay,
          order_errors: data.telemetry.orderErrors,
          item_errors: data.telemetry.itemErrors,
          longest_streak: data.telemetry.longestStreak,
          max_combo: data.telemetry.maxCombo,
        },
      });

      const assessmentResult = await tx.anak_assessment_results.create({
        data: {
          child_id: childId,
          session_id: session.id,
          chc_domain: data.chcDomain,
          game_type: data.gameType,
          final_score: assessment.finalScore,
          star_rating: assessment.starRating,
          development_level: assessment.developmentLevel,
          score_breakdown: assessment.scoreBreakdown,
          feedback: assessment.feedback,
          parent_recommendation: assessment.parentRecommendation,
        },
      });

      return { session, assessment: assessmentResult };
    });

    // Get adaptive difficulty for next session
    const recentScores = await prisma.anak_assessment_results.findMany({
      where: { child_id: childId, chc_domain: data.chcDomain },
      orderBy: { created_at: 'desc' },
      take: 5,
      select: { final_score: true },
    });
    const nextDifficulty = getAdaptiveDifficulty(recentScores.map((r) => r.final_score));

    return { ...result, nextDifficulty };
  }

  /** Get all game progress for a child */
  async getProgress(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    const sessions = await prisma.anak_game_sessions.findMany({
      where: { child_id: childId },
      include: { telemetry: true, assessment_result: true },
      orderBy: { completed_at: 'desc' },
    });

    // Aggregate by domain
    const domainSummary = await prisma.anak_assessment_results.groupBy({
      by: ['chc_domain'],
      where: { child_id: childId },
      _avg: { final_score: true, star_rating: true },
      _count: { id: true },
    });

    return { sessions, domainSummary };
  }

  /** Get progress per game type */
  async getGameTypeProgress(childId: string, parentId: string, gameType: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    return prisma.anak_game_sessions.findMany({
      where: { child_id: childId, game_type: gameType },
      include: { telemetry: true, assessment_result: true },
      orderBy: { completed_at: 'desc' },
    });
  }
}

export const gamesService = new GamesService();
