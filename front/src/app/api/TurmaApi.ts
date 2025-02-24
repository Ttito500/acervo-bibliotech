import api from "../shared/axios/axios";
import { CreateTurmaRequest, CreateTurmaResponse, GetTurmaResponse, TurmaFiltros, UpdateTurmaRequest, UpdateTurmaResponse } from "../interfaces/turma";
import { getQueryString } from "../shared/utils";

const API_URL = "http://localhost:8090/turmas";

export const getTurmas = async (filtros?: TurmaFiltros): Promise<GetTurmaResponse[]> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}/filtrar?${queryString}` : `${API_URL}/filtrar`;
    
    const response = await api.get<GetTurmaResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    throw error;
  }
};

export const createTurma = async (
  turma: CreateTurmaRequest
): Promise<CreateTurmaResponse> => {
  try {
    const response = await api.post<CreateTurmaResponse>(API_URL, turma);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    throw error;
  }
};

export const updateTurma = async (
  id: number,
  turma: UpdateTurmaRequest
): Promise<UpdateTurmaResponse> => {
  try {
    const response = await api.put<UpdateTurmaResponse>(
      `${API_URL}/${id}`,
      turma
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    throw error;
  }
};

export const inativarTurma = async (id: number): Promise<void> => {
  try {
    await api.patch(`${API_URL}/inativar/${id}`);
  } catch (error) {
    console.error("Erro ao inativar turma:", error);
    throw error;
  }
};

export const ativarTurma = async (id: number): Promise<void> => {
  try {
    await api.patch(`${API_URL}/ativar/${id}`);
  } catch (error) {
    console.error("Erro ao ativar turma:", error);
    throw error;
  }
};

