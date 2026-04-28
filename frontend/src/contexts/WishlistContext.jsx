import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import * as wishlistApi from "../services/wishlistApi";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { status } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const refresh = useCallback(async () => {
    if (status !== "authed") {
      setWishlist([]);
      return;
    }
    const { wishlist: w } = await wishlistApi.getWishlist();
    setWishlist(w);
  }, [status]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(async (productId) => {
    const { wishlist: w } = await wishlistApi.toggleWishlist(productId);
    setWishlist(w);
    return w;
  }, []);

  const value = useMemo(() => ({ wishlist, refresh, toggle }), [wishlist, refresh, toggle]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = React.useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

