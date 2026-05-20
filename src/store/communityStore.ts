import { create } from 'zustand';
import { apiClient } from '../lib/axios';

interface CommunityState {
  posts: any[];
  guides: any[];
  isLoading: boolean;
  
  // Actions
  fetchPosts: (page?: number) => Promise<void>;
  createPost: (content: string, tags: string[]) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  fetchGuides: (category?: string) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: [],
  guides: [],
  isLoading: false,

  fetchPosts: async (page = 1) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<any>(`/community/posts?page=${page}&limit=20`);
      set({ posts: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch posts', error);
    }
  },

  createPost: async (content, tags) => {
    set({ isLoading: true });
    try {
      await apiClient.post('/community/posts', { content, tags });
      await get().fetchPosts();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  toggleLike: async (postId) => {
    try {
      const response = await apiClient.post<any>(`/community/posts/${postId}/like`);
      // Update local state optimism
      set((state) => ({
        posts: state.posts.map((post) => 
          post.id === postId ? { ...post, likesCount: response.data.likesCount, isLiked: response.data.liked } : post
        )
      }));
    } catch (error) {
      console.error('Failed to like post', error);
    }
  },

  addComment: async (postId, content) => {
    try {
      await apiClient.post(`/community/posts/${postId}/comments`, { content });
      await get().fetchPosts();
    } catch (error) {
      console.error('Failed to add comment', error);
      throw error;
    }
  },

  fetchGuides: async (category?: string) => {
    set({ isLoading: true });
    try {
      const url = category ? `/community/guides?category=${category}` : '/community/guides';
      const response = await apiClient.get<any>(url);
      set({ guides: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch guides', error);
    }
  }
}));
