import axios from 'axios';
import { CreateLivroRequest, CreateLivroResponse, GetLivroResponse, UpdateLivroRequest, UpdateLivroResponse } from '../interfaces/acervo';

const API_URL = 'http://localhost:8090/livros';

export const getLivros = async (): Promise<GetLivroResponse[]> => {
  try {
    const response = await axios.get<GetLivroResponse[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export const createLivro = async (livro: CreateLivroRequest): Promise<CreateLivroResponse> => {
  try {
    const response = await axios.post<CreateLivroResponse>(API_URL, livro);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    throw error;
  }
};

export const updateLivro = async (id: number, livro: UpdateLivroRequest): Promise<UpdateLivroResponse> => {
  try {
    const response = await axios.patch<UpdateLivroResponse>(`${API_URL}/${id}`, livro);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    throw error;
  }
};

export const deleteLivro = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    throw error;
  }
};