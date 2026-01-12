import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

// -----------------------------
// VALIDADOR DE EMAIL
// -----------------------------
function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // -----------------------------
  // ESTADOS DE ERRO VISUAL
  // -----------------------------
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // -----------------------------
  // VALIDAÇÃO EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
    if (email.length === 0) return setEmailError("");
    if (!isValidEmail(email)) return setEmailError("Email inválido");
    setEmailError("");
  }, [email]);

  useEffect(() => {
    if (password.length === 0) return setPasswordError("");
    setPasswordError("");
  }, [password]);

  // -----------------------------
  // SUBMISSÃO DO LOGIN
  // -----------------------------
  async function handleLogin() {
    if (emailError || passwordError) {
      Alert.alert("Erro", "Corrija os erros antes de continuar");
      return;
    }

    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Insira um email válido");
      return;
    }

    const result = await signIn(email, password);

    if (result.error) {
      Alert.alert("Erro", result.error);
      return;
    }

    navigation.navigate("HomeComLogin");
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* EMAIL */}
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[
          styles.input,
          emailError ? styles.inputError : email.length > 0 ? styles.inputSuccess : null,
        ]}
      />
      {emailError !== "" && <Text style={styles.errorText}>{emailError}</Text>}

      {/* PASSWORD */}
      <Text>Password</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          style={[
            styles.input,
            passwordError ? styles.inputError : password.length > 0 ? styles.inputSuccess : null,
          ]}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 10, top: 12 }}
        >
          <Text>{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {passwordError !== "" && <Text style={styles.errorText}>{passwordError}</Text>}

      {/* BOTÃO LOGIN */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Entrar</Text>
      </TouchableOpacity>

      {/* LINK PARA CRIAR CONTA */}
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#4CAF50", textAlign: "center" }}>
          Criar nova conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  inputError: {
    borderColor: "red",
  },
  inputSuccess: {
    borderColor: "green",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
