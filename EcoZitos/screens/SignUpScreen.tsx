import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

// -----------------------------
// VALIDADORES
// -----------------------------
function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidUsername(username: string) {
  const regex = /^[a-zA-Z0-9_]{3,}$/;
  return regex.test(username);
}

function isStrongPassword(password: string) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  return regex.test(password);
}

// -----------------------------
// CÁLCULO DA FORÇA DA PASSWORD
// -----------------------------
function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score; // 0 a 5
}

export default function SignUpScreen({ navigation }: any) {
  const { signUp, checkEmailExists } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  // -----------------------------
  // ESTADOS DE ERRO VISUAL
  // -----------------------------
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // -----------------------------
  // VALIDAÇÃO EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
    if (username.length === 0) return setUsernameError("");
    if (!isValidUsername(username))
      return setUsernameError("O username deve ter pelo menos 3 caracteres e apenas letras, números ou _");
    setUsernameError("");
  }, [username]);

  useEffect(() => {
    if (email.length === 0) return setEmailError("");
    if (!isValidEmail(email)) return setEmailError("Email inválido");
    if (emailExists) return setEmailError("Este email já está registado");
    setEmailError("");
  }, [email, emailExists]);

  useEffect(() => {
    if (password.length === 0) return setPasswordError("");
    if (!isStrongPassword(password))
      return setPasswordError("A password deve ter pelo menos 6 caracteres, incluindo letras e números");
    setPasswordError("");
  }, [password]);

  useEffect(() => {
    if (confirm.length === 0) return setConfirmError("");
    if (confirm !== password) return setConfirmError("As passwords não coincidem");
    setConfirmError("");
  }, [confirm, password]);

  // -----------------------------
  // VERIFICAÇÃO DE EMAIL EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
    let timeout = setTimeout(async () => {
      if (isValidEmail(email)) {
        const exists = await checkEmailExists(email);
        setEmailExists(exists);
      } else {
        setEmailExists(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [email]);

  // -----------------------------
  // SUBMISSÃO DO FORMULÁRIO
  // -----------------------------
  async function handleSignUp() {
    if (usernameError || emailError || passwordError || confirmError) {
      Alert.alert("Erro", "Corrija os erros antes de continuar");
      return;
    }

    if (!username || !email || !password || !confirm) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const result = await signUp({ username, email, password });

    if (result.error) {
      Alert.alert("Erro", result.error);
      return;
    }

    Alert.alert("Conta criada!", "Agora podes iniciar sessão.");
    navigation.navigate("Login");
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* USERNAME */}
      <Text>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={[
          styles.input,
          usernameError ? styles.inputError : username.length > 0 ? styles.inputSuccess : null,
        ]}
      />
      {usernameError !== "" && <Text style={styles.errorText}>{usernameError}</Text>}

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

      {/* BARRA DE FORÇA */}
      {password.length > 0 && (
        <View style={{ height: 6, backgroundColor: "#ddd", marginBottom: 10 }}>
          <View
            style={{
              height: 6,
              width: `${(passwordStrength / 5) * 100}%`,
              backgroundColor:
                passwordStrength <= 2
                  ? "red"
                  : passwordStrength === 3
                  ? "orange"
                  : "green",
            }}
          />
        </View>
      )}

      {/* CONFIRM PASSWORD */}
      <Text>Confirmar Password</Text>
      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={!showConfirm}
        autoCapitalize="none"
        style={[
          styles.input,
          confirmError ? styles.inputError : confirm.length > 0 ? styles.inputSuccess : null,
        ]}
      />
      {confirmError !== "" && <Text style={styles.errorText}>{confirmError}</Text>}

      {/* BOTÃO */}
      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Criar Conta</Text>
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
