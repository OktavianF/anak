// Reports feature services - CHC Theory based (3 Domain: Gf, Gv, Gsm)
import { apiClient } from '@/lib/axios';

export interface ProgressReport {
  childId: string;
  period: string;
  // CHC Domain Progress (3 Domain)
  fluidReasoningProgress: number;      // Gf - Penalaran Logis
  visualProcessingProgress: number;    // Gv - Pemrosesan Visual
  workingMemoryProgress: number;       // Gsm - Memori Kerja
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
