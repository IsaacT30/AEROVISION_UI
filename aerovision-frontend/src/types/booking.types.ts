export type BookingStatus = 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';

export interface Booking {
  id: number;
  servicio: number;
  servicio_nombre?: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email?: string;
  ciudad?: string;
  mensaje?: string;
  estado: BookingStatus;
  total_cotizado?: string;
  created_at: string;
}

export interface BookingCreateDTO {
  servicio: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  cliente_nombre: string;
  cliente_telefono: string;
  cliente_email?: string;
  ciudad?: string;
  mensaje?: string;
}
