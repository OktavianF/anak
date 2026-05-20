import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/apiResponse';
import logger from '../utils/logger';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  logger.error('Unhandled error:', { error: err.message, stack: err.stack });
  return sendError(res, 500, 'Internal server error');
}

export function notFoundHandler(_req: Request, res: Response) {
  return sendError(res, 404, 'Route not found');
}
