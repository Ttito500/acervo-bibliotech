import { Turma } from "./models"

export interface CreateAlunoRequest {
  nome: string
  email: string
  telefone: string
  idTurma: Turma
}

export interface UpdateAlunoRequest {
  nome: string
  email: string
  telefone: string
  idTurma: Turma
  situacao: string
}

export interface CreateAlunoResponse {
  id: number
  idTurma: Turma
  nome: string
  email: string
  telefone: string
  situacao: string
}

export interface GetAlunoResponse {
  id: number
  idTurma: Turma
  nome: string
  email: string
  telefone: string
  situacao: string
}

export interface UpdateAlunoResponse {
  id: number
  idTurma: Turma
  nome: string
  email: string
  telefone: string
  situacao: string
}