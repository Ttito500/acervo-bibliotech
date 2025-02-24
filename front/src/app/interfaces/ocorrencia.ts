import { GetAlunoResponse } from "./aluno"

export interface GetOcorrenciaResponse {
  id: number
  aluno: GetAlunoResponse
  registradaPor: RegistradaPor
  detalhes: string
  data: string
}

export interface OcorrenciaFiltros {
  dataInicio: string
  dataFim: string
}

export interface RegistradaPor {
  id: number
  nome: string
  cargo: string
  ativo: boolean
  email: string
  dataUltimoAcesso?: string
}

export interface CreateOcorrenciaRequest {
  idAluno: number
  registradaPor: number
  detalhes: string
}