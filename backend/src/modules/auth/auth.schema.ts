import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    name: z.string().min(2, 'Nama minimal 2 karakter'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(1, 'Password wajib diisi'),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token wajib diisi'),
  }),
});

export const setPinSchema = z.object({
  body: z.object({
    pin: z.string().length(4, 'PIN harus 4 digit').regex(/^\d{4}$/, 'PIN harus berupa angka'),
  }),
});

export const verifyPinSchema = z.object({
  body: z.object({
    pin: z.string().length(4, 'PIN harus 4 digit'),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RefreshInput = z.infer<typeof refreshSchema>['body'];
export type SetPinInput = z.infer<typeof setPinSchema>['body'];
export type VerifyPinInput = z.infer<typeof verifyPinSchema>['body'];
