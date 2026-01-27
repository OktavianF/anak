// Reports feature services - CHC Theory based
import { apiClient } from '@/lib/axios';

export interface ProgressReport {
  childId: string;
  period: string;
  // CHC Domain Progress
  fluidReasoningProgress: number;      // Gf
  comprehensionKnowledgeProgress: number; // Gc
  visualProcessingProgress: number;    // Gv
  workingMemoryProgress: number;       // Gsm
  processingSpeedProgress: number;     // Gs
  auditoryProcessingProgress: number;  // Ga
  longTermMemoryProgress: number;      // Glr
  reactionSpeedProgress: number;       // Gt
  overallProgress: number;
  recommendations: string[];
}

export const reportsService = {
  getProgressReport: async (childId: string, period?: string): Promise<ProgressReport> => {
    const response = await apiClient.get(`/reports/${childId}/progress`, {
      params: { period },
    });
    return response.data;
  },

  generateReport: async (childId: string): Promise<ProgressReport> => {
    const response = await apiClient.post(`/reports/${childId}/generate`);
    return response.data;
  },

  downloadReport: async (childId: string, format: 'pdf' | 'xlsx'): Promise<Blob> => {
    const response = await apiClient.get(`/reports/${childId}/download`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },
};
