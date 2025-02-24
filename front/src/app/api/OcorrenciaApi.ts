import api from "../shared/axios/axios";
import { getQueryString } from "../shared/utils";
import { CreateOcorrenciaRequest, OcorrenciaFiltros, GetOcorrenciaResponse } from "../interfaces/ocorrencia";

const API_URL = "http://localhost:8090/ocorrencias";

export const getOcorrencias = async (filtros: OcorrenciaFiltros): Promise<GetOcorrenciaResponse[]> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}?${queryString}` : `${API_URL}`;
    
    const response = await api.get<GetOcorrenciaResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ocorrencias:", error);
    throw error;
  }
};

export const createOcorrencia = async (
  ocorrencia: CreateOcorrenciaRequest
): Promise<any> => {
  try {
    const response = await api.post<any>(API_URL, ocorrencia);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar ocorrencia:", error);
    throw error;
  }
};

export const deleteOcorrencia = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar ocorrencia:", error);
    throw error;
  }
};

