import prisma from '../../config/database';
import { NotFoundError, ForbiddenError } from '../../utils/errors';

export class ReportsService {
  async getReports(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    return prisma.anak_progress_reports.findMany({
      where: { child_id: childId },
      orderBy: { generated_at: 'desc' },
    });
  }

  async generateReport(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    // Aggregate scores per domain
    const domainScores = await prisma.anak_assessment_results.groupBy({
      by: ['chc_domain'],
      where: { child_id: childId },
      _avg: { final_score: true },
      _count: { id: true },
    });

    const gfScore = domainScores.find((d) => d.chc_domain === 'Gf')?._avg.final_score || 0;
    const gvScore = domainScores.find((d) => d.chc_domain === 'Gv')?._avg.final_score || 0;
    const gsmScore = domainScores.find((d) => d.chc_domain === 'Gsm')?._avg.final_score || 0;
    const overall = (gfScore + gvScore + gsmScore) / 3;

    // Generate recommendations
    const recommendations: string[] = [];
    if (gfScore < 50) recommendations.push('Tingkatkan stimulasi penalaran logis dengan puzzle dan teka-teki.');
    if (gvScore < 50) recommendations.push('Latih pemrosesan visual dengan aktivitas menggambar dan menyusun.');
    if (gsmScore < 50) recommendations.push('Perkuat memori kerja dengan permainan ingatan secara rutin.');
    if (overall >= 70) recommendations.push('Perkembangan kognitif sangat baik! Pertahankan konsistensi bermain.');
    if (recommendations.length === 0) recommendations.push('Lanjutkan bermain secara rutin untuk perkembangan optimal.');

    const now = new Date();
    const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    return prisma.anak_progress_reports.create({
      data: {
        child_id: childId,
        period,
        fluid_reasoning_progress: Math.round(gfScore * 100) / 100,
        visual_processing_progress: Math.round(gvScore * 100) / 100,
        working_memory_progress: Math.round(gsmScore * 100) / 100,
        overall_progress: Math.round(overall * 100) / 100,
        recommendations,
      },
    });
  }
}

export const reportsService = new ReportsService();
