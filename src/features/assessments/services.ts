// Assessments feature services
import { apiClient } from '@/lib/axios';
import type { TestResult, ChcAssessment } from './types';

export const assessmentsService = {
  submitTestResult: async (childId: string, result: TestResult): Promise<void> => {
    await apiClient.post(`/assessments/${childId}/results`, result);
  },

  getTestResults: async (childId: string): Promise<TestResult[]> => {
    const response = await apiClient.get(`/assessments/${childId}/results`);
    return response.data;
  },

  getChcAssessments: async (childId: string): Promise<ChcAssessment[]> => {
    const response = await apiClient.get(`/assessments/${childId}/chc`);
    return response.data;
  },

  updateChcAssessment: async (
    childId: string,
    domain: string,
    data: Partial<ChcAssessment>
  ): Promise<ChcAssessment> => {
    const response = await apiClient.put(`/assessments/${childId}/chc/${domain}`, data);
    return response.data;
  },
};
