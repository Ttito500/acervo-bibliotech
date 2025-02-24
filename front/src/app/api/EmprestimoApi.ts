import { ConcluirEmprestimoRequest, CreateEmprestimoRequest, EmprestimosFiltros, EmprestimosPorAlunoFiltros, EmprestimosPorLivroFiltros, GetEmprestimoPorAlunoResponse, GetEmprestimoPorLivroResponse, GetEmprestimoResponse } from "../interfaces/emprestimo";
import { ResponsePagination } from "../interfaces/pagination";
import api from "../shared/axios/axios";
import { getQueryString } from "../shared/utils";

const API_URL = "http://localhost:8090/emprestimos";

export const getEmprestimos = async (filtros?: EmprestimosFiltros): Promise<ResponsePagination<GetEmprestimoResponse>> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}?${queryString}` : `${API_URL}`;
    
    const response = await api.get<ResponsePagination<GetEmprestimoResponse>>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empréstimos:", error);
    throw error;
  }
};

export const getEmprestimosPorAluno = async (idAluno: number, filtros: EmprestimosPorAlunoFiltros): Promise<ResponsePagination<GetEmprestimoPorAlunoResponse>> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}/aluno/${idAluno}?${queryString}` : `${API_URL}/aluno/${idAluno}`;
    
    const response = await api.get<ResponsePagination<GetEmprestimoPorAlunoResponse>>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empréstimos por aluno:", error);
    throw error;
  }
};

export const getEmprestimosPorLivro = async (idLivro: number, filtros: EmprestimosPorLivroFiltros): Promise<ResponsePagination<GetEmprestimoPorLivroResponse>> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}/livro/${idLivro}?${queryString}` : `${API_URL}/livro/${idLivro}`;
    
    const response = await api.get<ResponsePagination<GetEmprestimoPorLivroResponse>>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empréstimos por livro:", error);
    throw error;
  }
};

export const createEmprestimo = async (emprestimo: CreateEmprestimoRequest): Promise<GetEmprestimoResponse> => {
  try {
    const response = await api.post<GetEmprestimoResponse>(API_URL, emprestimo);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error);
    throw error;
  }
};

export const renovarPrazo = async (idEmprestimo: number): Promise<any> => {
  try {
    const url =`${API_URL}/renovar/${idEmprestimo}`;
    
    const response = await api.patch(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao renovar empréstimo:", error);
    throw error;
  }
};

export const cancelarEmprestimo = async (idEmprestimo: number): Promise<any> => {
  try {
    const url =`${API_URL}/cancelar/${idEmprestimo}`;
    
    const response = await api.patch(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao cancelar empréstimo:", error);
    throw error;
  }
};

export const concluirEmprestimo = async (idEmprestimo: number, body: ConcluirEmprestimoRequest): Promise<any> => {
  try {
    const url =`${API_URL}/concluir/${idEmprestimo}`;
    
    const response = await api.patch(url, body);
    return response.data;
  } catch (error) {
    console.error("Erro ao concluir empréstimo:", error);
    throw error;
  }
};

export const notificarAtrasos = async (): Promise<any> => {
  try {
    const url =`${API_URL}/enviar-email`;
    
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao notificar atrasos:", error);
    throw error;
  }
};

