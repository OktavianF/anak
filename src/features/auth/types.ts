// Auth feature types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'child';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SurveyData {
  parentName?: string;
  relationship?: string;
  childBirthDate?: string;
  concerns?: string[];
  goals?: string[];
}
