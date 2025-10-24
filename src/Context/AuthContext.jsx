

import React, { createContext, useContext, useState } from "react";
import { loginWithEmail } from "../Utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("clinicUser");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(email, password) {
    const res = await loginWithEmail(email, password);
    if (res.user) {
      setUser(res.user);
      localStorage.setItem("clinicUser", JSON.stringify(res.user));
      return { ok: true };
    }
    return { ok: false, error: res.error };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("clinicUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
