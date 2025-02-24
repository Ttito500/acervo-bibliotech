import { GetTurmaResponse } from "./turma"

export interface CreateAlunoRequest {
  nome: string
  email: string
  telefone?: string
  idTurma: number
}

export interface CreateAlunoResponse {
  id: number
  nome: string
  email: string
  telefone?: string
  turma: GetTurmaResponse
  situacao: string
  ativo: boolean
}

export interface UpdateAlunoRequest {
  nome: string
  email: string
  telefone?: string
  idTurma: number
  situacao: string
}

export interface UpdateAlunoResponse {
  id: number
  nome: string
  email: string
  telefone?: string
  turma: GetTurmaResponse
  situacao: string
  ativo: boolean
}

export interface GetAlunoResponse {
  id: number
  nome: string
  email: string
  telefone?: string
  turma: GetTurmaResponse
  situacao: string
  ativo: boolean
}

export interface AlunoFiltros {
  serie?: number
  turma?: string
  nome?: string
  situacao?: string
  ativo?: boolean
  page?: number
  size?: number
}