import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  // Evita navegação durante o render
  useEffect(() => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [user]);

  // Enquanto o redirect acontece, mostra um loading
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}
