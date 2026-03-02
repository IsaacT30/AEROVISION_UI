import { apiClient } from '../client';
import type { PaginatedResponse } from '@/types/api.types';
import type { PortfolioItem, PortfolioCreateDTO } from '@/types/portfolio.types';

export const portfolioService = {
  // Listar items del portafolio (público)
  getAll: async (params?: { categoria?: string; tipo_medio?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<PortfolioItem>>('/portafolio/', { params });
    return data;
  },

  // Obtener por ID
  getById: async (id: number) => {
    const { data } = await apiClient.get<PortfolioItem>(`/portafolio/${id}/`);
    return data;
  },

  // Crear item (admin)
  create: async (item: PortfolioCreateDTO) => {
    const { data } = await apiClient.post<PortfolioItem>('/portafolio/', item);
    return data;
  },

  // Upload de archivo
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const { data } = await apiClient.post<{ url: string }>('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.url;
    } catch (error) {
      // Fallback: si no hay endpoint de upload, usar URL local temporal
      console.warn('Endpoint de upload no disponible, usando URL local temporal');
      return URL.createObjectURL(file);
    }
  },

  // Actualizar item (admin)
  update: async (id: number, item: Partial<PortfolioCreateDTO>) => {
    const { data } = await apiClient.patch<PortfolioItem>(`/portafolio/${id}/`, item);
    return data;
  },

  // Eliminar item (admin)
  delete: async (id: number) => {
    await apiClient.delete(`/portafolio/${id}/`);
  },
};
