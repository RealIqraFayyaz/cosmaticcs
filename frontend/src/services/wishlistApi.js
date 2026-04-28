import { api } from "./apiClient";

export async function getWishlist() {
  const { data } = await api.get("/wishlist");
  return data;
}

export async function toggleWishlist(productId) {
  const { data } = await api.post("/wishlist/toggle", { productId });
  return data;
}

