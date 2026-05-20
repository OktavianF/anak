import prisma from '../../config/database';
import { NotFoundError } from '../../utils/errors';

export class CommunityService {
  async listPosts(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      prisma.anak_posts.findMany({
        skip, take: limit,
        include: {
          author: { select: { id: true, name: true } },
          _count: { select: { comments: true, likes: true } },
        },
        orderBy: { created_at: 'desc' },
      }),
      prisma.anak_posts.count(),
    ]);
    return { posts, total, page, limit };
  }

  async createPost(authorId: string, content: string, tags: string[] = []) {
    return prisma.anak_posts.create({
      data: { author_id: authorId, content, tags },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async toggleLike(postId: string, userId: string) {
    const existing = await prisma.anak_post_likes.findUnique({
      where: { post_id_user_id: { post_id: postId, user_id: userId } },
    });

    if (existing) {
      await prisma.anak_post_likes.delete({ where: { id: existing.id } });
      return { liked: false };
    } else {
      await prisma.anak_post_likes.create({ data: { post_id: postId, user_id: userId } });
      return { liked: true };
    }
  }

  async getComments(postId: string) {
    return prisma.anak_comments.findMany({
      where: { post_id: postId },
      include: { author: { select: { id: true, name: true } } },
      orderBy: { created_at: 'asc' },
    });
  }

  async addComment(postId: string, authorId: string, content: string) {
    const post = await prisma.anak_posts.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundError('Post tidak ditemukan');

    return prisma.anak_comments.create({
      data: { post_id: postId, author_id: authorId, content },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async listGuides(category?: string) {
    return prisma.anak_guides.findMany({
      where: category ? { category } : undefined,
      orderBy: { created_at: 'desc' },
    });
  }
}

export const communityService = new CommunityService();
