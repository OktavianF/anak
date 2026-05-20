import { Request, Response, NextFunction } from 'express';
import { assessmentsService } from './assessments.service';
import { sendSuccess } from '../../utils/apiResponse';

export class AssessmentsController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await assessmentsService.listAssessments(req.params.childId as string, req.user!.userId);
      sendSuccess({ res, message: 'Assessment results retrieved', data: results });
    } catch (error) { next(error); }
  }

  async getChcSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await assessmentsService.getChcSummary(req.params.childId as string, req.user!.userId);
      sendSuccess({ res, message: 'CHC summary retrieved', data: summary });
    } catch (error) { next(error); }
  }

  async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const recs = await assessmentsService.getRecommendations(req.params.childId as string, req.user!.userId);
      sendSuccess({ res, message: 'Recommendations retrieved', data: recs });
    } catch (error) { next(error); }
  }
}

export const assessmentsController = new AssessmentsController();
