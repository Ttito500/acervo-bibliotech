import { GetMonitorResponse } from "./monitor"

export interface CreateCronogramaRequest {
  idAlunoMonitor: number
  diaDaSemana: string
}

export interface GetCronogramaResponse {
  id: number
  alunoMonitor: GetMonitorResponse
  diaDaSemana: string
}

export interface Cronograma {
  diaDaSemana: string;
  items: GetCronogramaResponse[]
}