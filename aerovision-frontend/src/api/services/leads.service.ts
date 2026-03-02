import { apiClient } from '../client';
import type { PaginatedResponse } from '@/types/api.types';
import type { Lead, LeadCreateDTO } from '@/types/lead.types';

export const leadsService = {
  // Listar consultas/leads (admin)
  getAll: async (params?: { estado?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<Lead>>('/consultas/', { params });
    return data;
  },

  // Crear lead (público - formulario de contacto)
  create: async (lead: LeadCreateDTO) => {
    const { data } = await apiClient.post<Lead>('/consultas/', lead);
    return data;
  },

  // Obtener por ID (admin)
  getById: async (id: number) => {
    const { data } = await apiClient.get<Lead>(`/consultas/${id}/`);
    return data;
  },

  // Actualizar estado (admin)
  updateStatus: async (id: number, estado: string) => {
    const { data } = await apiClient.patch<Lead>(`/consultas/${id}/`, { estado });
    return data;
  },

  // Eliminar lead (admin)
  delete: async (id: number) => {
    await apiClient.delete(`/consultas/${id}/`);
  },
};
