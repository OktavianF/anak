import { Request, Response, NextFunction } from 'express';
import { communityService } from './community.service';
import { sendSuccess, sendPaginated } from '../../utils/apiResponse';

export class CommunityController {
  async listPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const { posts, total } = await communityService.listPosts(page, limit);
      sendPaginated(res, 'Daftar post', posts, total, page, limit);
    } catch (error) { next(error); }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await communityService.createPost(req.user!.userId, req.body.content, req.body.tags);
      sendSuccess({ res, statusCode: 201, message: 'Post berhasil dibuat', data: post });
    } catch (error) { next(error); }
  }

  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await communityService.toggleLike(req.params.id as string, req.user!.userId);
      sendSuccess({ res, message: result.liked ? 'Post di-like' : 'Like dihapus', data: result });
    } catch (error) { next(error); }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await communityService.getComments(req.params.id as string);
      sendSuccess({ res, message: 'Komentar berhasil diambil', data: comments });
    } catch (error) { next(error); }
  }

  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await communityService.addComment(req.params.id as string, req.user!.userId, req.body.content);
      sendSuccess({ res, statusCode: 201, message: 'Komentar berhasil ditambahkan', data: comment });
    } catch (error) { next(error); }
  }

  async listGuides(req: Request, res: Response, next: NextFunction) {
    try {
      const guides = await communityService.listGuides(req.query.category as string);
      sendSuccess({ res, message: 'Daftar panduan', data: guides });
    } catch (error) { next(error); }
  }
}

export const communityController = new CommunityController();
