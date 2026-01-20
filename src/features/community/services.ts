// Community feature services
import { apiClient } from '@/lib/axios';
import type { Post, Comment, Guide } from './types';

export const communityService = {
  getPosts: async (page = 1, limit = 10): Promise<Post[]> => {
    const response = await apiClient.get('/community/posts', {
      params: { page, limit },
    });
    return response.data;
  },

  createPost: async (content: string, tags: string[]): Promise<Post> => {
    const response = await apiClient.post('/community/posts', { content, tags });
    return response.data;
  },

  likePost: async (postId: string): Promise<void> => {
    await apiClient.post(`/community/posts/${postId}/like`);
  },

  getComments: async (postId: string): Promise<Comment[]> => {
    const response = await apiClient.get(`/community/posts/${postId}/comments`);
    return response.data;
  },

  addComment: async (postId: string, content: string): Promise<Comment> => {
    const response = await apiClient.post(`/community/posts/${postId}/comments`, { content });
    return response.data;
  },

  getGuides: async (category?: string): Promise<Guide[]> => {
    const response = await apiClient.get('/community/guides', {
      params: { category },
    });
    return response.data;
  },

  getGuideById: async (id: string): Promise<Guide> => {
    const response = await apiClient.get(`/community/guides/${id}`);
    return response.data;
  },
};
