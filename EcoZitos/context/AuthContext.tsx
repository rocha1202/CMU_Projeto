import React, { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  function signUp(data: any) {
    setUser(data); // guarda o utilizador em memória
  }

  function signIn(email: string, password: string) {
    if (!user) return { error: "Nenhuma conta criada" };

    if (user.email !== email || user.password !== password) {
      return { error: "Credenciais inválidas" };
    }

    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
