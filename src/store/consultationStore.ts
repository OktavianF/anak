import { create } from 'zustand';
import { apiClient } from '../lib/axios';

interface ConsultationState {
  doctors: any[];
  appointments: any[];
  isLoading: boolean;
  
  // Actions
  fetchDoctors: () => Promise<void>;
  fetchAppointments: () => Promise<void>;
  bookAppointment: (data: any) => Promise<void>;
}

export const useConsultationStore = create<ConsultationState>((set, get) => ({
  doctors: [],
  appointments: [],
  isLoading: false,

  fetchDoctors: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<any>('/doctors');
      set({ doctors: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch doctors', error);
    }
  },

  fetchAppointments: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<any>('/appointments');
      set({ appointments: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch appointments', error);
    }
  },

  bookAppointment: async (data) => {
    set({ isLoading: true });
    try {
      await apiClient.post('/appointments', data);
      await get().fetchAppointments();
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));
