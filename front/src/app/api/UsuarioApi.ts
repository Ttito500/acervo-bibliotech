import api from "../shared/axios/axios";
import {
  LoginRequest,
  LoginResponse,
  UsuarioFiltros,
  CreateUsuarioRequest,
  CreateUsuarioResponse,
  GetUsuarioResponse,
  UpdateUsuarioRequest,
  UpdateUsuarioResponse,
} from "../interfaces/usuario";
import { getQueryString } from "../shared/utils";

const API_URL = "/usuarios";

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(`${API_URL}/login`, body);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const getUsuarios = async (
    filtros?: UsuarioFiltros
): Promise<GetUsuarioResponse[]> => {
  try {
    const queryString = getQueryString(filtros);
    const url = queryString ? `${API_URL}/filtrar?${queryString}` : `${API_URL}/filtrar`;

    const response = await api.get<GetUsuarioResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const createUsuario = async (
    usuario: CreateUsuarioRequest
): Promise<CreateUsuarioResponse> => {
  try {
    const response = await api.post<CreateUsuarioResponse>(API_URL, usuario);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const updateUsuario = async (
    id: number,
    usuario: UpdateUsuarioRequest
): Promise<UpdateUsuarioResponse> => {
  try {
    const response = await api.put<UpdateUsuarioResponse>(
        `${API_URL}/${id}`,
        usuario
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const inativarUsuario = async (id: number): Promise<void> => {
  try {
    await api.patch(`${API_URL}/${id}/inativar`);
  } catch (error) {
    console.error("Erro ao inativar usuário:", error);
    throw error;
  }
};

export const ativarUsuario = async (id: number): Promise<void> => {
  try {
    await api.patch(`${API_URL}/${id}/ativar`);
  } catch (error) {
    console.error("Erro ao ativar usuário:", error);
    throw error;
  }
};

export const getUsuarioById = async (id: number): Promise<GetUsuarioResponse> => {
  try {
    const response = await api.get<GetUsuarioResponse>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  }
};