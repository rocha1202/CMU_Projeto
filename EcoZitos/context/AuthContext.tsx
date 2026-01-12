import React, { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

const API_URL = "http://localhost:3000";

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);

  // ---------------------------------------------------
  // LOGIN
  // ---------------------------------------------------
  async function signIn(email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/users?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        return { error: "Email não encontrado." };
      }

      const foundUser = data[0];

      if (foundUser.password !== password) {
        return { error: "Password incorreta." };
      }

      setUser(foundUser);
      return { success: true };
    } catch (err) {
      return { error: "Erro ao comunicar com o servidor." };
    }
  }

  // ---------------------------------------------------
  // SIGN UP (corrigido — nunca envia id)
  // ---------------------------------------------------
  async function signUp({ username, email, password }: any) {
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || "Erro ao criar conta." };
      }

      const createdUser = await res.json();
      return { success: true, user: createdUser };
    } catch (err) {
      return { error: "Erro ao comunicar com o servidor." };
    }
  }

  // ---------------------------------------------------
  // UPDATE USER (mantém id — correto)
  // ---------------------------------------------------
  async function updateUser(updatedUser: any) {
    try {
      const res = await fetch(`${API_URL}/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || "Erro ao atualizar dados." };
      }

      const savedUser = await res.json();
      setUser(savedUser);
      return { success: true };
    } catch (err) {
      return { error: "Erro ao comunicar com o servidor." };
    }
  }

  // ---------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------
  function logout() {
    setUser(null);
  }

  // ---------------------------------------------------
  // VERIFICAÇÃO DE EMAIL EM TEMPO REAL
  // ---------------------------------------------------
  async function checkEmailExists(email: string) {
    if (!email) return false;

    try {
      const res = await fetch(`${API_URL}/users?email=${email}`);
      const data = await res.json();
      return data.length > 0;
    } catch {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        updateUser,
        logout,
        checkEmailExists,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
