import React, { createContext, useState } from "react";

interface AuthContextType {
  user: any | null;
  signUp: (userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  async function signUp(userData: any) {
    try {
      const response = await fetch("http://10.0.2.2:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error("Erro no signup:", error);
      return { error: "Erro ao comunicar com o servidor" };
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await fetch("http://10.0.2.2:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message };
      }

      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return { error: "Erro ao comunicar com o servidor" };
    }
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