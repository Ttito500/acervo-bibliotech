import { CreateLivroRequest, CreateLivroResponse, GetLivroResponse, LivroFiltros, UpdateLivroRequest, UpdateLivroResponse } from '../interfaces/acervo';
import { getQueryString } from '../shared/utils';
import { ResponsePagination } from '../interfaces/pagination';
import { CreateExemplarRequest, GetExemplarResponse, UpdateExemplarRequest } from '../interfaces/exemplar';
import api from '../shared/axios/axios';

const API_URL = 'http://localhost:8090/livros';

export const getLivros = async (filtros: LivroFiltros): Promise<ResponsePagination<GetLivroResponse>> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}/filtrar?${queryString}` : `${API_URL}/filtrar`;
    
    const response = await api.get<ResponsePagination<GetLivroResponse>>(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const createLivro = async (livro: CreateLivroRequest): Promise<CreateLivroResponse> => {
  try {
    const response = await api.post<CreateLivroResponse>(API_URL, livro);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    throw error;
  }
};

export const updateLivro = async (id: number, livro: UpdateLivroRequest): Promise<UpdateLivroResponse> => {
  try {
    const response = await api.patch<UpdateLivroResponse>(`${API_URL}/${id}`, livro);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    throw error;
  }
};

export const inativarLivro = async (id: number): Promise<void> => {
  try {
    await api.patch(`${API_URL}/inativar/${id}`);
  } catch (error) {
    console.error('Erro ao inativar Livro:', error);
    throw error;
  }
};

export const ativarLivro = async (id: number): Promise<void> => {
  try {
    await api.patch(`${API_URL}/ativar/${id}`);
  } catch (error) {
    console.error('Erro ao ativar Livro:', error);
    throw error;
  }
};

export const getExemplares = async (idLivro: number): Promise<GetExemplarResponse[]> => {
  try {
    const url = `${API_URL}/exemplares/${idLivro}`;
    
    const response = await api.get<GetExemplarResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar exemplares do livro:', error);
    throw error;
  }
};

export const createExemplar = async (exemplar: CreateExemplarRequest): Promise<any> => {
  try {
    const response = await api.post<any>(`${API_URL}/exemplares`, exemplar);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar exemplares:', error);
    throw error;
  }
};

export const updateExemplar = async (idExemplar: number, exemplar: UpdateExemplarRequest): Promise<any> => {
  try {
    const response = await api.patch<any>(`${API_URL}/exemplares/atualizar/${idExemplar}`, exemplar);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar exemplares:', error);
    throw error;
  }
};