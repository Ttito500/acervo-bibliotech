export interface CreateEstantePrateleiraRequest {
  estante: string;
  prateleira: number;
}

export interface CreateEstantePrateleiraResponse {
  id: number;
  estante: string;
  prateleira: number;
}

export interface UpdateEstantePrateleiraRequest {
  estante: string;
  prateleira: number;
}

export interface UpdateEstantePrateleiraResponse {
  id: number;
  estante: string;
  prateleira: number;
}

export interface GetEstantePrateleiraResponse {
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