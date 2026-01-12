import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

// -----------------------------
// VALIDADORES
// -----------------------------
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

export default function ChangePassword({ navigation }: any) {
  const { user, updateUser } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = getPasswordStrength(newPassword);

  // -----------------------------
  // ESTADOS DE ERRO VISUAL
  // -----------------------------
  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // -----------------------------
  // VALIDAÇÃO EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
    if (currentPassword.length === 0) return setCurrentError("");
    if (currentPassword !== user.password)
      return setCurrentError("A password atual está incorreta");
    setCurrentError("");
  }, [currentPassword]);

  useEffect(() => {
    if (newPassword.length === 0) return setNewError("");
    if (!isStrongPassword(newPassword))
      return setNewError("A nova password deve ter pelo menos 6 caracteres, incluindo letras e números");
    setNewError("");
  }, [newPassword]);

  useEffect(() => {
    if (confirm.length === 0) return setConfirmError("");
    if (confirm !== newPassword)
      return setConfirmError("As passwords não coincidem");
    setConfirmError("");
  }, [confirm, newPassword]);

  // -----------------------------
  // SUBMISSÃO
  // -----------------------------
  async function handleChangePassword() {
    // ❌ Bloqueia se houver erros visuais
    if (currentError || newError || confirmError) {
      Alert.alert("Erro", "Corrija os erros antes de continuar");
      return;
    }

    // ❌ Bloqueia se campos estiverem vazios
    if (!currentPassword || !newPassword || !confirm) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // ❌ Segurança extra
    if (currentPassword !== user.password) {
      Alert.alert("Erro", "A password atual está incorreta");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      Alert.alert(
        "Erro",
        "A nova password deve ter pelo menos 6 caracteres, incluindo letras e números"
      );
      return;
    }

    if (newPassword !== confirm) {
      Alert.alert("Erro", "As passwords não coincidem");
      return;
    }

    // ✔ Atualizar password
    const updatedUser = { ...user, password: newPassword };
    const result = await updateUser(updatedUser);

    if (result.error) {
      Alert.alert("Erro", result.error);
      return;
    }

    Alert.alert("Sucesso", "Password alterada com sucesso!");
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* PASSWORD ATUAL */}
      <Text>Password Atual</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrent}
          autoCapitalize="none"
          style={[
            styles.input,
            currentError ? styles.inputError : currentPassword.length > 0 ? styles.inputSuccess : null,
          ]}
        />

        <TouchableOpacity
          onPress={() => setShowCurrent(!showCurrent)}
          style={{ position: "absolute", right: 10, top: 12 }}
        >
          <Text>{showCurrent ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {currentError !== "" && <Text style={styles.errorText}>{currentError}</Text>}

      {/* NOVA PASSWORD */}
      <Text>Nova Password</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNew}
          autoCapitalize="none"
          style={[
            styles.input,
            newError ? styles.inputError : newPassword.length > 0 ? styles.inputSuccess : null,
          ]}
        />

        <TouchableOpacity
          onPress={() => setShowNew(!showNew)}
          style={{ position: "absolute", right: 10, top: 12 }}
        >
          <Text>{showNew ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {newError !== "" && <Text style={styles.errorText}>{newError}</Text>}

      {/* BARRA DE FORÇA */}
      {newPassword.length > 0 && (
        <View style={{ height: 6, backgroundColor: "#ddd", marginBottom: 20 }}>
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

      {/* CONFIRMAR PASSWORD */}
      <Text>Confirmar Nova Password</Text>
      <View style={{ position: "relative" }}>
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

        <TouchableOpacity
          onPress={() => setShowConfirm(!showConfirm)}
          style={{ position: "absolute", right: 10, top: 12 }}
        >
          <Text>{showConfirm ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {confirmError !== "" && <Text style={styles.errorText}>{confirmError}</Text>}

      {/* BOTÃO */}
      <TouchableOpacity
        onPress={handleChangePassword}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Alterar Password
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
