// src/services/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { showError } from './../components/error-toast/ErrorToast';
import { showSuccess } from './../components/success-toast/SuccessToast';
import NProgress from 'nprogress';

const api = axios.create({
  baseURL: 'http://localhost:8090'
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    NProgress.start();
    return config;
  },
  (error: AxiosError) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

const successMethods = ['post', 'put', 'patch', 'delete'];
const ignoredSuccessEndpoints = ['/auth/login', '/generos/sem-associacao', '/autor/sem-associacao', '/emprestimos/enviar-email'];
const ignoredErrorEndpoints = ['?'];

api.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done();
    const shouldIgnore = ignoredSuccessEndpoints.some(endpoint => response.config.url.includes(endpoint));

    if (successMethods.includes(response.config.method.toLowerCase() || '') && !shouldIgnore) {
      showSuccess('Operação realizada com sucesso!');
    }

    return response;
  },
  (error: AxiosError) => {
    NProgress.done();
    const errorMessage = (error.response.data as any).messages[0] || 'Não foi possível concluir a operação. Tente novamente.';
    const shouldIgnore = ignoredErrorEndpoints.some(endpoint => error.response.config.url.includes(endpoint));

    if(shouldIgnore) {
      return Promise.reject(error);
    }

    if (errorMessage) {
      showError(errorMessage);
    } else if (error.request) {
      showError('Nenhuma resposta do servidor. Verifique sua conexão.');
    } else {
      showError('Erro ao configurar a requisição.');
    }
    return Promise.reject(error);
  }
);

export default api;
