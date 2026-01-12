import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
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

export default function ChangePersonalData() {
  const navigation = useNavigation<any>();
  const { user, updateUser, checkEmailExists } = useContext(AuthContext);

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const [emailExists, setEmailExists] = useState(false);

  // -----------------------------
  // ESTADOS DE ERRO VISUAL
  // -----------------------------
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // -----------------------------
  // VALIDAÇÃO EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
    if (username.length === 0) return setUsernameError("");
    if (!isValidUsername(username))
      return setUsernameError(
        "O username deve ter pelo menos 3 caracteres e apenas letras, números ou _"
      );
    setUsernameError("");
  }, [username]);

  useEffect(() => {
    if (email.length === 0) return setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError("Email inválido");
      return;
    }

    if (email !== user.email && emailExists) {
      setEmailError("Este email já está registado");
      return;
    }

    setEmailError("");
  }, [email, emailExists]);

  // -----------------------------
  // VERIFICAÇÃO DE EMAIL EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
    let timeout = setTimeout(async () => {
      if (email !== user.email && isValidEmail(email)) {
        const exists = await checkEmailExists(email);
        setEmailExists(exists);
      } else {
        setEmailExists(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [email]);

  // -----------------------------
  // SUBMISSÃO
  // -----------------------------
  async function handleSave() {
    // ❌ Se houver erros visuais, não avança
    if (usernameError || emailError) {
      Alert.alert("Erro", "Corrija os erros antes de continuar");
      return;
    }

    // ❌ Se campos estiverem vazios
    if (!username || !email) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // ❌ Validação extra de segurança
    if (!isValidUsername(username)) {
      Alert.alert(
        "Erro",
        "O username deve ter pelo menos 3 caracteres e apenas letras, números ou _"
      );
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Insira um email válido");
      return;
    }

    if (email !== user.email && emailExists) {
      Alert.alert("Erro", "Este email já está registado");
      return;
    }

    // ✔ Dados válidos → atualizar
    const updated = {
      ...user,
      username,
      email,
    };

    const result = await updateUser(updated);

    if (result.error) {
      Alert.alert("Erro", result.error);
      return;
    }

    Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/Icons/Next.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Change Personal Data</Text>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* USERNAME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Your username"
            placeholderTextColor="#7FAEAA"
            style={[
              styles.input,
              usernameError
                ? styles.inputError
                : username.length > 0
                ? styles.inputSuccess
                : null,
            ]}
            value={username}
            onChangeText={setUsername}
          />
          {usernameError !== "" && (
            <Text style={styles.errorText}>{usernameError}</Text>
          )}
        </View>

        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email@example.com"
            placeholderTextColor="#7FAEAA"
            style={[
              styles.input,
              emailError
                ? styles.inputError
                : email.length > 0
                ? styles.inputSuccess
                : null,
            ]}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backIcon: {
    width: 28,
    height: 28,
    transform: [{ rotate: "180deg" }],
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* INPUT GROUP */
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
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
    marginTop: 4,
  },

  /* SAVE BUTTON */
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
