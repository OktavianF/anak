import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '../lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  occupation?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  appMode: 'parent' | 'child';
  isParentMode: boolean;
  showPINModal: boolean;
  
  // Actions
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  setAppMode: (mode: 'parent' | 'child') => void;
  setShowPINModal: (show: boolean) => void;
  verifyPIN: (pin: string) => Promise<boolean>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      appMode: 'parent', // Start in parent mode or whichever makes sense
      isParentMode: true,
      showPINModal: false,

      login: async (credentials) => {
        const response = await apiClient.post<any>('/auth/login', credentials);
        const { token, user } = response.data;
        
        // Save token to localStorage for apiClient to use
        localStorage.setItem('authToken', token);
        
        set({
          user,
          token,
          isAuthenticated: true,
          appMode: 'parent',
          isParentMode: true,
        });
      },

      logout: () => {
        localStorage.removeItem('authToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          appMode: 'parent',
          isParentMode: true,
        });
      },

      setAppMode: (mode) => {
        set({
          appMode: mode,
          isParentMode: mode === 'parent',
        });
      },

      setShowPINModal: (show) => {
        set({ showPINModal: show });
      },

      verifyPIN: async (pin: string) => {
        try {
          await apiClient.post('/auth/verify-pin', { pin });
          set({
            appMode: 'parent',
            isParentMode: true,
            showPINModal: false,
          });
          return true;
        } catch (error) {
          return false;
        }
      },

      fetchProfile: async () => {
        try {
          const response = await apiClient.get<any>('/auth/me');
          set({ user: response.data });
        } catch (error) {
          // If profile fetch fails, they might be unauthenticated
          get().logout();
        }
      }
    }),
    {
      name: 'anak-auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        isAuthenticated: state.isAuthenticated, 
        user: state.user,
        appMode: state.appMode,
        isParentMode: state.isParentMode
      }),
    }
  )
);
