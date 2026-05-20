import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../utils/apiResponse';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      sendSuccess({ res, statusCode: 201, message: 'Registrasi berhasil', data: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      sendSuccess({ res, message: 'Login berhasil', data: result });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.refreshToken(req.body.refreshToken);
      sendSuccess({ res, message: 'Token refreshed', data: result });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.body.refreshToken);
      sendSuccess({ res, message: 'Logout berhasil' });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.getMe(req.user!.userId);
      sendSuccess({ res, message: 'User data retrieved', data: result });
    } catch (error) {
      next(error);
    }
  }

  async setPin(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.setPin(req.user!.userId, req.body.pin);
      sendSuccess({ res, message: 'PIN berhasil diatur' });
    } catch (error) {
      next(error);
    }
  }

  async verifyPin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.verifyPin(req.user!.userId, req.body.pin);
      sendSuccess({ res, message: 'PIN valid', data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
