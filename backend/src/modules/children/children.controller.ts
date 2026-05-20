import { Request, Response, NextFunction } from 'express';
import { childrenService } from './children.service';
import { sendSuccess } from '../../utils/apiResponse';

export class ChildrenController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const children = await childrenService.listChildren(req.user!.userId);
      sendSuccess({ res, message: 'Daftar anak berhasil diambil', data: children });
    } catch (error) { next(error); }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const child = await childrenService.getChild(req.params.id as string, req.user!.userId);
      sendSuccess({ res, message: 'Detail anak berhasil diambil', data: child });
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const child = await childrenService.createChild(req.user!.userId, req.body);
      sendSuccess({ res, statusCode: 201, message: 'Anak berhasil ditambahkan', data: child });
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const child = await childrenService.updateChild(req.params.id as string, req.user!.userId, req.body);
      sendSuccess({ res, message: 'Data anak berhasil diperbarui', data: child });
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await childrenService.deleteChild(req.params.id as string, req.user!.userId);
      sendSuccess({ res, message: 'Anak berhasil dihapus' });
    } catch (error) { next(error); }
  }

  async getStickers(req: Request, res: Response, next: NextFunction) {
    try {
      const stickers = await childrenService.getStickers(req.params.id as string, req.user!.userId);
      sendSuccess({ res, message: 'Stiker berhasil diambil', data: stickers });
    } catch (error) { next(error); }
  }

  async awardSticker(req: Request, res: Response, next: NextFunction) {
    try {
      const sticker = await childrenService.awardSticker(req.params.id as string, req.user!.userId, req.body.stickerId);
      sendSuccess({ res, statusCode: 201, message: 'Stiker berhasil diberikan', data: sticker });
    } catch (error) { next(error); }
  }
}

export const childrenController = new ChildrenController();
