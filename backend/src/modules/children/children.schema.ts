import { z } from 'zod';

export const createChildSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    gender: z.enum(['MALE', 'FEMALE'], { required_error: 'Gender wajib diisi' }),
    birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Format tanggal tidak valid'),
    age: z.number().int().min(1).max(18),
    avatar: z.string().optional(),
    backgroundColor: z.string().optional(),
    favoriteColor: z.string().optional(),
  }),
});

export const updateChildSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name: z.string().min(2).optional(),
    avatar: z.string().optional(),
    backgroundColor: z.string().optional(),
    favoriteColor: z.string().optional(),
    age: z.number().int().min(1).max(18).optional(),
  }),
});

export const childParamSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

export const awardStickerSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    stickerId: z.string().min(1, 'Sticker ID wajib diisi'),
  }),
});

export type CreateChildInput = z.infer<typeof createChildSchema>['body'];
export type UpdateChildInput = z.infer<typeof updateChildSchema>['body'];
