import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../lib/axios';

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  birth_date: string;
  age: number;
  avatar?: string;
  background_color?: string;
  favorite_color?: string;
}

interface ChildrenState {
  children: Child[];
  activeChildId: string | null;
  isLoading: boolean;
  
  // Actions
  fetchChildren: () => Promise<void>;
  setActiveChild: (childId: string) => void;
  addChild: (data: Partial<Child>) => Promise<void>;
  updateChild: (id: string, data: Partial<Child>) => Promise<void>;
  deleteChild: (id: string) => Promise<void>;
}

export const useChildrenStore = create<ChildrenState>()(
  persist(
    (set) => ({
      children: [],
      activeChildId: null,
      isLoading: false,

      fetchChildren: async () => {
        set({ isLoading: true });
        try {
          const response = await apiClient.get<any>('/children');
          set({ children: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          console.error('Failed to fetch children', error);
        }
      },

      setActiveChild: (childId) => {
        set({ activeChildId: childId });
      },

      addChild: async (data) => {
        set({ isLoading: true });
        try {
          await apiClient.post('/children', data);
          // Re-fetch children after adding
          const response = await apiClient.get<any>('/children');
          set({ children: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateChild: async (id, data) => {
        set({ isLoading: true });
        try {
          await apiClient.put(`/children/${id}`, data);
          // Re-fetch
          const response = await apiClient.get<any>('/children');
          set({ children: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      deleteChild: async (id) => {
        set({ isLoading: true });
        try {
          await apiClient.delete(`/children/${id}`);
          // Re-fetch
          const response = await apiClient.get<any>('/children');
          set((state) => ({ 
            children: response.data, 
            isLoading: false,
            activeChildId: state.activeChildId === id ? null : state.activeChildId
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      }
    }),
    {
      name: 'anak-children-storage',
      partialize: (state) => ({ activeChildId: state.activeChildId })
    }
  )
);
