export type PortfolioCategory = 
  | 'EVENTOS'
  | 'INMOBILIARIO'
  | 'TURISMO'
  | 'INSPECCION'
  | 'PRODUCCION';

export type MediaType = 'FOTO' | 'VIDEO';

export interface PortfolioItem {
  id: number;
  titulo: string;
  categoria: PortfolioCategory;
  tipo_medio: MediaType;
  url_medio: string;
  descripcion?: string;
  destacado: boolean;
  orden: number;
  created_at: string;
}

export interface PortfolioCreateDTO {
  titulo: string;
  categoria: PortfolioCategory;
  tipo_medio: MediaType;
  url_medio: string;
  descripcion?: string;
  destacado?: boolean;
}
