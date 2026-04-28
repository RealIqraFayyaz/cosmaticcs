import { api, setToken } from "./apiClient";

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  setToken(data.token);
  return data;
}

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  setToken(data.token);
  return data;
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data;
}

export function logout() {
  setToken(null);
}

