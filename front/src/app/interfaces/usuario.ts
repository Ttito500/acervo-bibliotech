export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CreateUsuarioRequest {
  nome: string;
  cargo: string;
  email: string;
  senha: string;
}

export interface CreateUsuarioResponse {
  id: number
  nome: string
  cargo: string
  ativo: boolean
  email: string
  dataUltimoAcesso: string
}

export interface UpdateUsuarioRequest {
  nome: string
  cargo: string
  ativo: boolean
  email: string
  senha?: string
}

export interface UpdateUsuarioResponse {
  id: number;
  nome: string;
  cargo: string;
  email: string;
  ativo: boolean;
  dataUltimoAcesso: string;
}

export interface GetUsuarioResponse {
  id: number;
  nome: string;
  cargo: string;
  ativo: boolean;
  email: string;
  dataUltimoAcesso: string;
}

export interface UsuarioFiltros {
  nome?: string;
  cargo?: string;
  ativo?: boolean;
}