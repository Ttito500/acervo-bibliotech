import { getQueryString } from '../shared/utils';
import api from '../shared/axios/axios';
import { GetMonitorResponse } from '../interfaces/monitor';

const API_URL = '/usuarios';

export const getMonitores = async (): Promise<GetMonitorResponse[]> => {
  try {
    const queryString = getQueryString({ ativo: true, cargo: 'aluno_monitor' });
    const url = queryString ? `${API_URL}/filtrar?${queryString}` : `${API_URL}/filtrar`;

    const response = await api.get<GetMonitorResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar monitores:', error);
    throw error;
  }
};