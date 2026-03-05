export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_staff: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
}
