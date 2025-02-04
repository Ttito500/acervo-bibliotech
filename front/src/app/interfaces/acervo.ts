import { EstantePrateleira, Secao } from "./models"

export interface CreateLivroRequest {
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: Secao
  idEstantePrateleira: EstantePrateleira
}

export interface UpdateLivroRequest {
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: Secao
  idEstantePrateleira: EstantePrateleira
}

export interface CreateLivroResponse {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: Secao
  idEstantePrateleira: EstantePrateleira
}

export interface GetLivroResponse {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: Secao
  idEstantePrateleira: EstantePrateleira
}

export interface UpdateLivroResponse {
  id: number
  isbn: string
  titulo: string
  autor: string
  situacao: string
  observacao: string
  idSecao: Secao
  idEstantePrateleira: EstantePrateleira
}