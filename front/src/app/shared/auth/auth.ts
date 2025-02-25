import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  iss: string
  sub: string
  nome: string
  id: number
  exp: number
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false; 

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token inválido", error);
    return false;
  }
};
