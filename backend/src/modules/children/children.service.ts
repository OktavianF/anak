import prisma from '../../config/database';
import { NotFoundError, ForbiddenError } from '../../utils/errors';
import type { CreateChildInput, UpdateChildInput } from './children.schema';

export class ChildrenService {
  async listChildren(parentId: string) {
    return prisma.anak_children.findMany({
      where: { parent_id: parentId },
      include: {
        child_stickers: { include: { sticker: true } },
        _count: { select: { game_sessions: true, assessment_results: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getChild(childId: string, parentId: string) {
    const child = await prisma.anak_children.findUnique({
      where: { id: childId },
      include: {
        child_stickers: { include: { sticker: true } },
        _count: { select: { game_sessions: true, assessment_results: true } },
      },
    });

    if (!child) throw new NotFoundError('Anak tidak ditemukan');
    if (child.parent_id !== parentId) throw new ForbiddenError('Akses ditolak');

    return child;
  }

  async createChild(parentId: string, data: CreateChildInput) {
    return prisma.anak_children.create({
      data: {
        parent_id: parentId,
        name: data.name,
        gender: data.gender,
        birth_date: new Date(data.birthDate),
        age: data.age,
        avatar: data.avatar,
        background_color: data.backgroundColor,
        favorite_color: data.favoriteColor,
      },
    });
  }

  async updateChild(childId: string, parentId: string, data: UpdateChildInput) {
    await this.getChild(childId, parentId); // verify ownership

    return prisma.anak_children.update({
      where: { id: childId },
      data: {
        name: data.name,
        avatar: data.avatar,
        background_color: data.backgroundColor,
        favorite_color: data.favoriteColor,
        age: data.age,
        updated_at: new Date(),
      },
    });
  }

  async deleteChild(childId: string, parentId: string) {
    await this.getChild(childId, parentId); // verify ownership
    await prisma.anak_children.delete({ where: { id: childId } });
  }

  async getStickers(childId: string, parentId: string) {
    await this.getChild(childId, parentId);

    return prisma.anak_child_stickers.findMany({
      where: { child_id: childId },
      include: { sticker: true },
      orderBy: { earned_at: 'desc' },
    });
  }

  async awardSticker(childId: string, parentId: string, stickerSlug: string) {
    await this.getChild(childId, parentId);

    const sticker = await prisma.anak_stickers.findUnique({
      where: { sticker_id: stickerSlug },
    });

    if (!sticker) throw new NotFoundError('Stiker tidak ditemukan');

    // Upsert - don't error if already earned
    return prisma.anak_child_stickers.upsert({
      where: {
        child_id_sticker_id: { child_id: childId, sticker_id: sticker.id },
      },
      update: {},
      create: { child_id: childId, sticker_id: sticker.id },
      include: { sticker: true },
    });
  }
}

export const childrenService = new ChildrenService();
