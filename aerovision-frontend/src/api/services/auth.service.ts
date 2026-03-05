import { apiClient } from '../client';
import type { LoginDTO, RegisterDTO, User, LoginResponse } from '@/types/user.types';

export const authService = {
  // Register
  register: async (userData: RegisterDTO) => {
    const { data } = await apiClient.post('/auth/register/', userData);
    return data;
  },

  // Login
  login: async (credentials: LoginDTO) => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login/', credentials);
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const { data } = await apiClient.get<User>('/auth/me/');
    return data;
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
