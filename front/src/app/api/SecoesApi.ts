import api from "../shared/axios/axios";
import {
  GetSecaoResponse,
  CreateSecaoRequest,
  CreateSecaoResponse,
  UpdateSecaoRequest,
  UpdateSecaoResponse,
  GetSecaoEstantePrateleiraResponse,
} from "../interfaces/secao";

const API_URL = "http://localhost:8090/secoes";

export const getSecoes = async (): Promise<GetSecaoResponse[]> => {
  try {
    const response = await api.get<GetSecaoResponse[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar seções:", error);
    throw error;
  }
};

export const createSecao = async (
  secao: CreateSecaoRequest
): Promise<CreateSecaoResponse> => {
  try {
    const response = await api.post<CreateSecaoResponse>(API_URL, secao);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar seção:", error);
    throw error;
  }
};

export const updateSecao = async (
  id: number,
  secao: UpdateSecaoRequest
): Promise<UpdateSecaoResponse> => {
  try {
    const response = await api.patch<UpdateSecaoResponse>(
      `${API_URL}/${id}`,
      secao
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar seção:", error);
    throw error;
  }
};

export const deleteSecao = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar seção:", error);
    throw error;
  }
};

export const deleteSecaoEstantePrateleira = async (idSecao: number, idEstantePrateleira: number): Promise<void> => {
  try {
    await api.delete(`http://localhost:8090/estantesecao`, { data: { idSecao, idEstantePrateleira } });
  } catch (error) {
    console.error("Erro ao deletar prateleira da seção:", error);
    throw error;
  }
};

export const getSecaoEstantePrateleiras = async (idSecao: number): Promise<GetSecaoEstantePrateleiraResponse[]> => {
  try {
    const response = await api.get<GetSecaoEstantePrateleiraResponse[]>(`${API_URL}/${idSecao}/estanteprateleiras/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar seções:", error);
    throw error;
  }
};

export const addSecaoEstantePrateleira = async (idSecao: number, idEstantePrateleira: number): Promise<any> => {
  try {
    const response = await api.post<any>(`http://localhost:8090/estantesecao`, { idSecao, idEstantePrateleira });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar estante-prateleira na seção:", error);
    throw error;
  }
};