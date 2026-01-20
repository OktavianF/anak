// Auth feature services
import { apiClient } from '@/lib/axios';
import type { LoginCredentials, User } from './types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  register: async (data: Record<string, unknown>): Promise<User> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
};
