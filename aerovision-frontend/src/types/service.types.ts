export type ServiceCategory = 
  | 'EVENTOS'
  | 'INMOBILIARIO'
  | 'TURISMO'
  | 'INSPECCION'
  | 'PRODUCCION';

export interface Service {
  id: number;
  nombre: string;
  slug: string;
  categoria: ServiceCategory;
  descripcion: string;
  precio_base: string;
  precio_por_hora: string;
  horas_minimas: number;
  activo: boolean;
  imagen_url?: string;
  orden: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCreateDTO {
  nombre: string;
  categoria: ServiceCategory;
  descripcion: string;
  precio_base: number;
  precio_por_hora: number;
  horas_minimas: number;
  activo?: boolean;
  imagen_url?: string;
}
