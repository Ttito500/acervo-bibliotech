import api from '../shared/axios/axios';
import { CreateCronogramaRequest, GetCronogramaResponse } from '../interfaces/cronograma';

const API_URL = '/cronograma';

export const getCronogramas = async (): Promise<GetCronogramaResponse[]> => {
  try {
    const url =`${API_URL}`;
    const response = await api.get<GetCronogramaResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cronograma:', error);
    throw error;
  }
};

export const createCronograma = async (cronograma: CreateCronogramaRequest): Promise<any> => {
  try {
    const response = await api.post<any>(API_URL, cronograma);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cronograma:', error);
    throw error;
  }
};

export const deleteCronograma = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar cronograma:', error);
    throw error;
  }
};
