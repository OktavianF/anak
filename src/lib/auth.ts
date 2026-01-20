/**
 * Auth library utilities
 * Token management and authentication helpers
 */

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

export const authLib = {
  getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
  
  setToken: (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  
  removeToken: () => localStorage.removeItem(AUTH_TOKEN_KEY),
  
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: unknown) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  
  removeUser: () => localStorage.removeItem(USER_KEY),
  
  isAuthenticated: () => !!localStorage.getItem(AUTH_TOKEN_KEY),
  
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default authLib;
