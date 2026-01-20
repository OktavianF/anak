// Children feature services
import { apiClient } from '@/lib/axios';
import type { Child, ProfileData } from './types';

export const childrenService = {
  getChild: async (id: string): Promise<Child> => {
    const response = await apiClient.get(`/children/${id}`);
    return response.data;
  },

  updateChild: async (id: string, data: Partial<Child>): Promise<Child> => {
    const response = await apiClient.put(`/children/${id}`, data);
    return response.data;
  },

  getProfile: async (childId: string): Promise<ProfileData> => {
    const response = await apiClient.get(`/children/${childId}/profile`);
    return response.data;
  },

  updateProfile: async (childId: string, data: Partial<ProfileData>): Promise<ProfileData> => {
    const response = await apiClient.put(`/children/${childId}/profile`, data);
    return response.data;
  },

  getStickers: async (childId: string): Promise<string[]> => {
    const response = await apiClient.get(`/children/${childId}/stickers`);
    return response.data;
  },

  addSticker: async (childId: string, stickerId: string): Promise<void> => {
    await apiClient.post(`/children/${childId}/stickers`, { stickerId });
  },
};
