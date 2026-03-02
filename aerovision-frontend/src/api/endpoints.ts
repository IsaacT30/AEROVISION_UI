export const ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login/',
  AUTH_REGISTER: '/auth/register/',
  
  // Services
  SERVICES: '/servicios/',
  SERVICES_DETAIL: (id: number) => `/servicios/${id}/`,
  
  // Bookings
  BOOKINGS: '/reservas/',
  BOOKINGS_DETAIL: (id: number) => `/reservas/${id}/`,
  BOOKINGS_VERIFY: '/reservas/verificar_disponibilidad/',
  
  // Leads
  LEADS: '/consultas/',
  LEADS_DETAIL: (id: number) => `/consultas/${id}/`,
  
  // Portfolio
  PORTFOLIO: '/portafolio/',
  PORTFOLIO_DETAIL: (id: number) => `/portafolio/${id}/`,
};
