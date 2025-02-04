export interface CreateSecaoRequest {
  nome: string;
  descricao: string;
}

export interface CreateSecaoResponse {
  id: number;
  nome: string;
  descricao: string;
}

export interface GetSecaoResponse {
  id: number;
  nome: string;
  descricao: string;
}

export interface UpdateSecaoRequest {
  nome: string
  descricao: string;
}

export interface UpdateSecaoResponse {
  id: number;
  nome: string;
  descricao: string;
}

export interface GetSecaoEstantePrateleiraResponse {
  id: number;
  estante: string;
  prateleira: number;
}

export interface Estante {
  estante: string;
  prateleiras: Prateleira[];
}

export interface Prateleira {
  id: number;
  prateleira: number;
}