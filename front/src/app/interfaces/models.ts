export interface Aluno {
  id: number
  idTurma: Turma
  nome: string
  email: string
  telefone: string
  situacao: string
}

export interface Secao {
  id: number
  nome: string
}

export interface EstantePrateleira {
  id: number
  estante: number
  prateleira: number
}

export interface Turma {
  id: number
  serie: number
  turma: string
}

export interface Livro {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: Secao
  idEstantePrateleira: EstantePrateleira
}
