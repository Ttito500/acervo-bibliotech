import axios from "axios";
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
    const response = await axios.get<GetSecaoResponse[]>(API_URL);
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
    const response = await axios.post<CreateSecaoResponse>(API_URL, secao);
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
    const response = await axios.put<UpdateSecaoResponse>(
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
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar seção:", error);
    throw error;
  }
};

export const deleteSecaoEstantePrateleira = async (idSecao: number, idPrateleira: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${idSecao}/prateleira/${idPrateleira}`);
  } catch (error) {
    console.error("Erro ao deletar seção:", error);
    throw error;
  }
};

export const getSecaoEstantePrateleiras = async (idSecao: number): Promise<GetSecaoEstantePrateleiraResponse[]> => {
  try {
    const response = await axios.get<GetSecaoEstantePrateleiraResponse[]>(`${API_URL}/${idSecao}/estanteprateleiras/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar seções:", error);
    throw error;
  }
};

export const addSecaoEstantePrateleira = async (idSecao: number, idEstantePrateleira: number): Promise<any> => {
  try {
    const response = await axios.post<any>(`${API_URL}/${idSecao}/estanteprateleiras/${idEstantePrateleira}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar estante-prateleira na seção:", error);
    throw error;
  }
};