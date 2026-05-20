import { Request, Response, NextFunction } from 'express';
import { gamesService } from './games.service';
import { sendSuccess } from '../../utils/apiResponse';

export class GamesController {
  async submitSession(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await gamesService.submitSession(req.params.childId as string, req.user!.userId, req.body);
      sendSuccess({ res, statusCode: 201, message: 'Game session berhasil disimpan', data: result });
    } catch (error) { next(error); }
  }

  async getProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await gamesService.getProgress(req.params.childId as string, req.user!.userId);
      sendSuccess({ res, message: 'Progress berhasil diambil', data: progress });
    } catch (error) { next(error); }
  }

  async getGameTypeProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await gamesService.getGameTypeProgress(req.params.childId as string, req.user!.userId, req.params.gameType as string);
      sendSuccess({ res, message: 'Progress per game berhasil diambil', data: progress });
    } catch (error) { next(error); }
  }
}

export const gamesController = new GamesController();
