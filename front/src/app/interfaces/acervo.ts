export interface CreateLivroRequest {
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: IdSecao
  idEstantePrateleira: IdEstantePrateleira
}

export interface UpdateLivroRequest {
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: IdSecao
  idEstantePrateleira: IdEstantePrateleira
}

export interface IdSecao {
  id: number
  nome: string
}

export interface IdEstantePrateleira {
  id: number
  estante: string
  prateleira: string
}

export interface CreateLivroResponse {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: IdSecao
  idEstantePrateleira: IdEstantePrateleira
}

export interface GetLivroResponse {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: IdSecao
  idEstantePrateleira: IdEstantePrateleira
}

export interface UpdateLivroResponse {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: IdSecao
  idEstantePrateleira: IdEstantePrateleira
}