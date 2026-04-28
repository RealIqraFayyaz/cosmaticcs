import { api } from "./apiClient";

export async function getCart() {
  const { data } = await api.get("/cart");
  return data;
}

export async function addToCart(payload) {
  const { data } = await api.post("/cart/items", payload);
  return data;
}

export async function updateCartItem(productId, payload) {
  const { data } = await api.patch(`/cart/items/${productId}`, payload);
  return data;
}

export async function removeCartItem(productId) {
  const { data } = await api.delete(`/cart/items/${productId}`);
  return data;
}

