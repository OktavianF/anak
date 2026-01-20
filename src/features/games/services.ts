// Games feature services
import { apiClient } from '@/lib/axios';
import type { GameSession, GameProgress } from './types';

export const gamesService = {
  submitGameSession: async (childId: string, session: GameSession): Promise<void> => {
    await apiClient.post(`/games/${childId}/sessions`, session);
  },

  getGameProgress: async (childId: string, gameType: string): Promise<GameProgress> => {
    const response = await apiClient.get(`/games/${childId}/progress/${gameType}`);
    return response.data;
  },

  getAllGameProgress: async (childId: string): Promise<Record<string, GameProgress>> => {
    const response = await apiClient.get(`/games/${childId}/progress`);
    return response.data;
  },
};
