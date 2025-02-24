import { GetAlunoResponse } from "./aluno"

export interface GetFrequenciaResponse {
  id: number
  aluno: GetAlunoResponse
  registradaPor: RegistradaPor
  atividade: string
  data: string
}

export interface FrequenciaFiltros {
  data: string
}

export interface RegistradaPor {
  id: number
  nome: string
  cargo: string
  ativo: boolean
  email: string
  dataUltimoAcesso?: string
}

export interface CreateFrequenciaRequest {
  idAluno: number
  registradaPor: number
  atividade: string
}