import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import * as cartApi from "../services/cartApi";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { status } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (status !== "authed") {
      setCart([]);
      return;
    }
    setLoading(true);
    try {
      const { cart: c } = await cartApi.getCart();
      setCart(c);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async ({ productId, qty = 1, shade = null }) => {
    const { cart: c } = await cartApi.addToCart({ productId, qty, shade });
    setCart(c);
    return c;
  }, []);

  const update = useCallback(async (productId, payload) => {
    const { cart: c } = await cartApi.updateCartItem(productId, payload);
    setCart(c);
    return c;
  }, []);

  const remove = useCallback(async (productId) => {
    const { cart: c } = await cartApi.removeCartItem(productId);
    setCart(c);
    return c;
  }, []);

  const count = useMemo(() => cart.reduce((s, it) => s + (it.qty ?? 0), 0), [cart]);

  const value = useMemo(() => ({ cart, count, loading, refresh, add, update, remove }), [cart, count, loading, refresh, add, update, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

