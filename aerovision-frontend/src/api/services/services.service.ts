import { apiClient } from '../client';
import type { PaginatedResponse } from '@/types/api.types';
import type { Service, ServiceCreateDTO } from '@/types/service.types';

export const servicesService = {
  // Listar servicios (público)
  getAll: async (params?: { categoria?: string; activo?: boolean }) => {
    const { data } = await apiClient.get<PaginatedResponse<Service>>('/servicios/', { params });
    return data;
  },

  // Obtener por ID o slug
  getById: async (id: number | string) => {
    const { data } = await apiClient.get<Service>(`/servicios/${id}/`);
    return data;
  },

  // Crear servicio (admin)
  create: async (service: ServiceCreateDTO) => {
    const { data } = await apiClient.post<Service>('/servicios/', service);
    return data;
  },

  // Actualizar servicio (admin)
  update: async (id: number, service: Partial<ServiceCreateDTO>) => {
    const { data } = await apiClient.patch<Service>(`/servicios/${id}/`, service);
    return data;
  },

  // Eliminar servicio (admin)
  delete: async (id: number) => {
    await apiClient.delete(`/servicios/${id}/`);
  },
};
