export interface CreateTurmaRequest {
  serie: number;
  turma: string;
  anoDeEntrada: number
}

export interface CreateTurmaResponse {
  id: number
  serie: number
  turma: string
  anoDeEntrada: number
  ativo: boolean
}

export interface UpdateTurmaRequest {
  serie: number
  turma: string
  anoDeEntrada: number
}

export interface UpdateTurmaResponse {
  id: number
  serie: number
  turma: string
  anoDeEntrada: number
  ativo: boolean
}

export interface GetTurmaResponse {
  id: number
  serie: number
  turma: string
  anoDeEntrada: number
  ativo: boolean
}

export interface TurmaFiltros {
  serie?: number
  turma?: string
  anoDeEntrada?: number
  ativo?: boolean
}