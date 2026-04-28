import { api } from "./apiClient";

export async function checkout(payload) {
  const { data } = await api.post("/orders", payload);
  return data;
}

export async function myOrders() {
  const { data } = await api.get("/orders/mine");
  return data;
}

