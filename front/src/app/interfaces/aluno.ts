export interface CreateAlunoRequest {
  nome: string
  email: string
  telefone: string
  idTurma: IdTurma
}

export interface UpdateAlunoRequest {
  nome: string
  email: string
  telefone: string
  idTurma: IdTurma
  situacao: string
}

export interface CreateAlunoResponse {
  id: number
  idTurma: IdTurma
  nome: string
  email: string
  telefone: string
  situacao: string
}

export interface GetAlunoResponse {
  id: number
  idTurma: IdTurma
  nome: string
  email: string
  telefone: string
  situacao: string
}

export interface UpdateAlunoResponse {
  id: number
  idTurma: IdTurma
  nome: string
  email: string
  telefone: string
  situacao: string
}

export interface IdTurma {
  id: number
  serie: number
  turma: string
}
