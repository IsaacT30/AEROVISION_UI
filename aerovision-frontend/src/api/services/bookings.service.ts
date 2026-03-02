import { apiClient } from '../client';
import type { PaginatedResponse } from '@/types/api.types';
import type { Booking, BookingCreateDTO } from '@/types/booking.types';

export const bookingsService = {
  // Listar reservas
  getAll: async (params?: { estado?: string; fecha?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<Booking>>('/reservas/', { params });
    return data;
  },

  // Crear reserva
  create: async (booking: BookingCreateDTO) => {
    const { data } = await apiClient.post<Booking>('/reservas/', booking);
    return data;
  },

  // Obtener por ID
  getById: async (id: number) => {
    const { data } = await apiClient.get<Booking>(`/reservas/${id}/`);
    return data;
  },

  // Actualizar estado
  updateStatus: async (id: number, estado: string) => {
    const { data } = await apiClient.patch<Booking>(`/reservas/${id}/`, { estado });
    return data;
  },

  // Verificar disponibilidad
  checkAvailability: async (
    servicio: number,
    fecha: string,
    hora_inicio: string,
    hora_fin: string
  ) => {
    const { data } = await apiClient.post<{ disponible: boolean; mensaje?: string }>(
      '/reservas/verificar_disponibilidad/',
      {
        servicio,
        fecha,
        hora_inicio,
        hora_fin,
      }
    );
    return data;
  },

  // Eliminar reserva
  delete: async (id: number) => {
    await apiClient.delete(`/reservas/${id}/`);
  },
};
