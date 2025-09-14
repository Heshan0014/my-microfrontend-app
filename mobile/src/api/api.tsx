// src/api/api.ts
import axios from "axios";

// Configure base URL for backend
const API = axios.create({
  baseURL: "http://localhost:8080/api", // update if deployed
});

// --- Types ---
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

// --- API Calls ---
export const login = (data: LoginRequest) => {
  return API.post<LoginResponse>("/auth/login", data);
};

export const register = (data: any) => {
  return API.post("/auth/register", data);
};

export const testApi = () => {
  return API.get<string>("/auth/test");
};
