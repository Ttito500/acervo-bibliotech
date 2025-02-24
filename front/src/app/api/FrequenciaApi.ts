import api from "../shared/axios/axios";
import { getQueryString } from "../shared/utils";
import { CreateFrequenciaRequest, FrequenciaFiltros, GetFrequenciaResponse } from "../interfaces/frequencia";

const API_URL = "http://localhost:8090/frequencia-alunos";

export const getFrequencias = async (filtros: FrequenciaFiltros): Promise<GetFrequenciaResponse[]> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}?${queryString}` : `${API_URL}`;
    
    const response = await api.get<GetFrequenciaResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar frequencias:", error);
    throw error;
  }
};

export const createFrequencia = async (
  frequencia: CreateFrequenciaRequest
): Promise<any> => {
  try {
    const response = await api.post<any>(API_URL, frequencia);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar frequencia:", error);
    throw error;
  }
};

export const deleteFrequencia = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar frequencia:", error);
    throw error;
  }
};

