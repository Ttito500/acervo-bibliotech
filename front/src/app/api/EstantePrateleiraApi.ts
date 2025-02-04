import axios from "axios";
import {
  CreateEstantePrateleiraRequest,
  CreateEstantePrateleiraResponse,
  GetEstantePrateleiraResponse,
  UpdateEstantePrateleiraRequest,
  UpdateEstantePrateleiraResponse,
} from "../interfaces/estante-prateleira";

const API_URL = "http://localhost:8090/estanteprateleira";

export const getEstantePrateleiras = async (): Promise<GetEstantePrateleiraResponse[]> => {
  try {
    const response = await axios.get<GetEstantePrateleiraResponse[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estantes e prateleiras:", error);
    throw error;
  }
};

export const createEstantePrateleira = async (
  secao: CreateEstantePrateleiraRequest
): Promise<CreateEstantePrateleiraResponse> => {
  try {
    const response = await axios.post<CreateEstantePrateleiraResponse>(API_URL, secao);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar estante-prateleira:", error);
    throw error;
  }
};

export const updateEstantePrateleira = async (
  id: number,
  estantePrateleira: UpdateEstantePrateleiraRequest
): Promise<UpdateEstantePrateleiraResponse> => {
  try {
    const response = await axios.put<UpdateEstantePrateleiraResponse>(
      `${API_URL}/${id}`,
      estantePrateleira
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar estante-prateleira:", error);
    throw error;
  }
};

export const deleteEstantePrateleira = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar estante-prateleira:", error);
    throw error;
  }
};

