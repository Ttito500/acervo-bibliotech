import { GetEstantePrateleiraResponse } from "./estante-prateleira"
import { GetSecaoResponse } from "./secao"

export interface GetExemplarResponse {
  id: number
  estanteprateleira: GetEstantePrateleiraResponse
  secao: GetSecaoResponse
  observacao: string
  numero: number
  situacao: string
}

export interface CreateExemplarRequest {
  idLivro: number
  idSecao: number
  qtdExemplares: number
  idEstanteprateleira: number
}

export interface UpdateExemplarRequest {
  idLivro: number
  idEstantePrateleira: number
  idSecao: number
  situacao: string
  observacao: string
}