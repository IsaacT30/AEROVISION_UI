export type LeadStatus = 'NUEVO' | 'CONTACTADO' | 'CERRADO';

export interface Lead {
  id: number;
  nombre: string;
  telefono: string;
  email?: string;
  mensaje: string;
  estado: LeadStatus;
  created_at: string;
}

export interface LeadCreateDTO {
  nombre: string;
  telefono: string;
  email?: string;
  mensaje: string;
}
