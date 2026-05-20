import { create } from 'zustand';
import { apiClient } from '../lib/axios';

interface AssessmentState {
  chcSummary: any | null;
  recommendations: any | null;
  progressReports: any[];
  isLoading: boolean;
  
  // Actions
  fetchChcSummary: (childId: string) => Promise<void>;
  fetchRecommendations: (childId: string) => Promise<void>;
  fetchProgressReports: (childId: string) => Promise<void>;
  generateReport: (childId: string) => Promise<void>;
  submitGameSession: (childId: string, sessionData: any) => Promise<any>;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  chcSummary: null,
  recommendations: null,
  progressReports: [],
  isLoading: false,

  fetchChcSummary: async (childId) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<any>(`/children/${childId}/assessments/chc-summary`);
      set({ chcSummary: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch CHC summary', error);
    }
  },

  fetchRecommendations: async (childId) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<any>(`/children/${childId}/assessments/recommendations`);
      set({ recommendations: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch recommendations', error);
    }
  },

  fetchProgressReports: async (childId) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<any>(`/children/${childId}/reports`);
      set({ progressReports: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch progress reports', error);
    }
  },

  generateReport: async (childId) => {
    set({ isLoading: true });
    try {
      await apiClient.post(`/children/${childId}/reports/generate`);
      // Refetch
      const response = await apiClient.get<any>(`/children/${childId}/reports`);
      set({ progressReports: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  submitGameSession: async (childId, sessionData) => {
    try {
      const response = await apiClient.post<any>(`/children/${childId}/games/sessions`, sessionData);
      // Optional: Refetch summary here
      return response.data;
    } catch (error) {
      console.error('Failed to submit game session', error);
      throw error;
    }
  }
}));
