export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}