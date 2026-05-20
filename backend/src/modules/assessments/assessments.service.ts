import prisma from '../../config/database';
import { NotFoundError, ForbiddenError } from '../../utils/errors';

export class AssessmentsService {
  /** List all assessment results for a child */
  async listAssessments(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    return prisma.anak_assessment_results.findMany({
      where: { child_id: childId },
      orderBy: { created_at: 'desc' },
    });
  }

  /** Get CHC domain summary (avg scores per Gf, Gv, Gsm) */
  async getChcSummary(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    const summary = await prisma.anak_assessment_results.groupBy({
      by: ['chc_domain'],
      where: { child_id: childId },
      _avg: { final_score: true, star_rating: true },
      _max: { final_score: true },
      _min: { final_score: true },
      _count: { id: true },
    });

    // Get latest assessment per domain
    const latest = await Promise.all(
      (['Gf', 'Gv', 'Gsm'] as const).map(async (domain) => {
        const result = await prisma.anak_assessment_results.findFirst({
          where: { child_id: childId, chc_domain: domain },
          orderBy: { created_at: 'desc' },
        });
        return { domain, latest: result };
      })
    );

    return { summary, latestPerDomain: latest };
  }

  /** Get game recommendations based on CHC scores */
  async getRecommendations(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    // Get latest assessment per domain
    const domains = ['Gf', 'Gv', 'Gsm'] as const;
    const recommendations = await Promise.all(
      domains.map(async (domain) => {
        const results = await prisma.anak_assessment_results.findMany({
          where: { child_id: childId, chc_domain: domain },
          orderBy: { created_at: 'desc' },
          take: 5,
          select: { final_score: true, development_level: true, parent_recommendation: true, game_type: true },
        });

        if (results.length === 0) {
          return { domain, avgScore: 0, level: 'NOT_ASSESSED', recommendation: 'Belum ada asesmen. Mulai bermain game!', suggestedDifficulty: 'EASY' };
        }

        const avgScore = results.reduce((sum, r) => sum + r.final_score, 0) / results.length;
        const suggestedDifficulty = avgScore >= 71 ? 'HARD' : avgScore >= 41 ? 'MEDIUM' : 'EASY';

        return {
          domain,
          avgScore: Math.round(avgScore * 100) / 100,
          level: results[0].development_level,
          recommendation: results[0].parent_recommendation,
          suggestedDifficulty,
          recentGames: results.map((r) => r.game_type),
        };
      })
    );

    return recommendations;
  }
}

export const assessmentsService = new AssessmentsService();
