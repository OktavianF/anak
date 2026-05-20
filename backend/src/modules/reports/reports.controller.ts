import { Request, Response, NextFunction } from 'express';
import { reportsService } from './reports.service';
import { sendSuccess } from '../../utils/apiResponse';

export class ReportsController {
  async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      const reports = await reportsService.getReports(req.params.childId as string, req.user!.userId);
      sendSuccess({ res, message: 'Laporan berhasil diambil', data: reports });
    } catch (error) { next(error); }
  }

  async generateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const report = await reportsService.generateReport(req.params.childId as string, req.user!.userId);
      sendSuccess({ res, statusCode: 201, message: 'Laporan berhasil dibuat', data: report });
    } catch (error) { next(error); }
  }
}

export const reportsController = new ReportsController();
