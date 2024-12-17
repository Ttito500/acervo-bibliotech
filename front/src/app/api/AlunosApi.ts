import axios from 'axios';
import { CreateAlunoRequest, CreateAlunoResponse, GetAlunoResponse, UpdateAlunoRequest, UpdateAlunoResponse } from '../interfaces/aluno';

const API_URL = 'http://localhost:8090/alunos';

export const getAlunos = async (): Promise<GetAlunoResponse[]> => {
  try {
    const response = await axios.get<GetAlunoResponse[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    throw error;
  }
};

export const createAluno = async (aluno: CreateAlunoRequest): Promise<CreateAlunoResponse> => {
  try {
    const response = await axios.post<CreateAlunoResponse>(API_URL, aluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    throw error;
  }
};

export const updateAluno = async (id: number, aluno: UpdateAlunoRequest): Promise<UpdateAlunoResponse> => {
  try {
    const response = await axios.put<UpdateAlunoResponse>(`${API_URL}/${id}`, aluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    throw error;
  }
};

export const deleteAluno = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    throw error;
  }
};