import api from "../shared/axios/axios";
import { LoginRequest, LoginResponse } from "../interfaces/usuario";

const API_URL = "/usuarios";

export const login = async (
  body: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(`${API_URL}/login`, body);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
