import jwt from 'jsonwebtoken';
import { env } from '../../src/config/env';
import type { JwtPayload } from '../../src/middleware/auth.middleware';

export function generateTestToken(payload: Partial<JwtPayload> = {}): string {
  const defaultPayload: JwtPayload = {
    userId: 'test-user-id',
    email: 'test@example.com',
    role: 'PARENT',
    ...payload,
  };
  return jwt.sign(defaultPayload, env.JWT_SECRET, { expiresIn: '1h' } as jwt.SignOptions);
}

export function generateExpiredToken(): string {
  return jwt.sign(
    { userId: 'test', email: 'test@example.com', role: 'PARENT' },
    env.JWT_SECRET,
    { expiresIn: '0s' } as jwt.SignOptions
  );
}
