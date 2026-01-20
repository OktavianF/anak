// Consultation feature services
import { apiClient } from '@/lib/axios';
import type { Doctor, Appointment, ChatMessage } from './types';

export const consultationService = {
  getDoctors: async (): Promise<Doctor[]> => {
    const response = await apiClient.get('/consultation/doctors');
    return response.data;
  },

  getDoctorById: async (id: string): Promise<Doctor> => {
    const response = await apiClient.get(`/consultation/doctors/${id}`);
    return response.data;
  },

  bookAppointment: async (data: Partial<Appointment>): Promise<Appointment> => {
    const response = await apiClient.post('/consultation/appointments', data);
    return response.data;
  },

  getAppointments: async (childId: string): Promise<Appointment[]> => {
    const response = await apiClient.get(`/consultation/appointments`, {
      params: { childId },
    });
    return response.data;
  },

  getChatMessages: async (appointmentId: string): Promise<ChatMessage[]> => {
    const response = await apiClient.get(`/consultation/chat/${appointmentId}`);
    return response.data;
  },

  sendMessage: async (appointmentId: string, content: string): Promise<ChatMessage> => {
    const response = await apiClient.post(`/consultation/chat/${appointmentId}`, { content });
    return response.data;
  },
};
