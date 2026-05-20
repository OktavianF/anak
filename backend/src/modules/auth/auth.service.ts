import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../config/database';
import { env } from '../../config/env';
import { ConflictError, UnauthorizedError, NotFoundError, BadRequestError } from '../../utils/errors';
import type { RegisterInput, LoginInput } from './auth.schema';
import type { JwtPayload } from '../../middleware/auth.middleware';

export class AuthService {
  async register(data: RegisterInput) {
    const existing = await prisma.anak_users.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictError('Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.anak_users.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'PARENT',
      },
      select: { id: true, email: true, name: true, role: true, created_at: true },
    });

    const tokens = this.generateTokens({ userId: user.id, email: user.email, role: user.role });
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async login(data: LoginInput) {
    const user = await prisma.anak_users.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError('Email atau password salah');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Email atau password salah');
    }

    const tokens = this.generateTokens({ userId: user.id, email: user.email, role: user.role });
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    const stored = await prisma.anak_refresh_tokens.findUnique({
      where: { token: refreshToken },
      include: { anak_users: true },
    });

    if (!stored || stored.expires_at < new Date()) {
      if (stored) {
        await prisma.anak_refresh_tokens.delete({ where: { id: stored.id } });
      }
      throw new UnauthorizedError('Refresh token tidak valid atau sudah expired');
    }

    const user = stored.anak_users;
    const tokens = this.generateTokens({ userId: user.id, email: user.email, role: user.role });

    // Rotate refresh token
    await prisma.anak_refresh_tokens.delete({ where: { id: stored.id } });
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      ...tokens,
    };
  }

  async logout(refreshToken: string) {
    await prisma.anak_refresh_tokens.deleteMany({
      where: { token: refreshToken },
    });
  }

  async getMe(userId: string) {
    const user = await prisma.anak_users.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, pin: true, created_at: true },
    });

    if (!user) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return { ...user, hasPin: !!user.pin, pin: undefined };
  }

  async setPin(userId: string, pin: string) {
    const hashedPin = await bcrypt.hash(pin, 10);
    await prisma.anak_users.update({
      where: { id: userId },
      data: { pin: hashedPin },
    });
  }

  async verifyPin(userId: string, pin: string) {
    const user = await prisma.anak_users.findUnique({
      where: { id: userId },
      select: { pin: true },
    });

    if (!user || !user.pin) {
      throw new BadRequestError('PIN belum diatur');
    }

    const isValid = await bcrypt.compare(pin, user.pin);
    if (!isValid) {
      throw new UnauthorizedError('PIN salah');
    }

    return { valid: true };
  }

  // --- Private helpers ---

  private generateTokens(payload: JwtPayload) {
    const accessToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as string as any,
    } as jwt.SignOptions);

    const refreshToken = uuidv4();

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.anak_refresh_tokens.create({
      data: { token, user_id: userId, expires_at: expiresAt },
    });
  }
}

export const authService = new AuthService();
