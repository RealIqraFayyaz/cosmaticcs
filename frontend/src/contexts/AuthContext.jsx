import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getToken } from "../services/apiClient";
import * as authApi from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | authed | guest

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setStatus("guest");
      return;
    }
    setStatus("loading");
    try {
      const { user: u } = await authApi.me();
      setUser(u);
      setStatus("authed");
    } catch {
      authApi.logout();
      setUser(null);
      setStatus("guest");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (payload) => {
    setStatus("loading");
    const res = await authApi.login(payload);
    setUser(res.user);
    setStatus("authed");
    return res;
  }, []);

  const register = useCallback(async (payload) => {
    setStatus("loading");
    const res = await authApi.register(payload);
    setUser(res.user);
    setStatus("authed");
    return res;
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    setStatus("guest");
  }, []);

  const value = useMemo(() => ({ user, status, login, register, logout, refresh }), [user, status, login, register, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

