import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProtectedRoute({ children }: any) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  // Se não houver user → manda para Login
  if (!user) {
    navigation.navigate("Login");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se houver user → mostra o conteúdo protegido
  return children;
}
