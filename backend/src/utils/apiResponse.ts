import { Response } from 'express';

interface ApiResponseOptions<T> {
  res: Response;
  statusCode?: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export function sendSuccess<T>({ res, statusCode = 200, message, data, meta }: ApiResponseOptions<T>) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
    ...(meta && { meta }),
  });
}

export function sendError(res: Response, statusCode: number, message: string, errors?: unknown) {
  const body: Record<string, unknown> = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
}

export function sendPaginated<T>(
  res: Response,
  message: string,
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
