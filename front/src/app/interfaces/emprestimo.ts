export interface GetEmprestimoResponse {
  id: number
  alunoId: number
  exemplarId: number
  numeroExemplar: number
  isbn: string
  tituloLivro: string
  nomeAluno: string
  realizadoPor: string
  concluidoPor: string
  observacao: string
  dataEmprestimo: string
  dataPrazo: string
  dataConclusao: string
  qtdRenovacao: number
  situacao: string
}

export interface CreateEmprestimoRequest {
  idAluno: number
  idExemplar: number
  observacao: string
  idUsuario: number
}

export interface ConcluirEmprestimoRequest {
  observacao: string
  extraviado: boolean
}

export interface GetEmprestimoPorAlunoResponse {
  id: number
  exemplarId: number
  numeroExemplar: number
  tituloLivro: string
  isbn: string
  dataEmprestimo: string
  dataConclusao: string
  situacao: string
}

export interface GetEmprestimoPorLivroResponse {
  id: number
  alunoId: number
  exemplarId: number
  numeroExemplar: number
  nomeAluno: string
  serieAluno: number
  turmaAluno: string
  dataEmprestimo: string
  dataConclusao: string
  situacao: string
}

export interface EmprestimosPorAlunoFiltros {
  page?: number
  size?: number
  dataEmprestimoInicio?: string
  dataEmprestimoFim?: string
}

export interface EmprestimosPorLivroFiltros {
  page?: number
  size?: number
  dataEmprestimoInicio?: string
  dataEmprestimoFim?: string
}

export interface EmprestimosFiltros {
  page?: number
  size?: number
  dataConclusao?: string
  dataPrazo?: string
  dataEmprestimo?: string
  nomeConcluidoPor?: string
  nomeRealizadoPor?: string
  situacao?: string
  isbn?: string
  tituloLivro?: string
  nomeAluno?: string
}