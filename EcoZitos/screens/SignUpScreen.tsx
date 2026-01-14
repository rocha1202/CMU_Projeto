import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function SignUpScreen() {
  const navigation = useNavigation<any>();
  const { signUp } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [type, setType] = React.useState("");

  async function handleSignUp() {
    if (!email || !password || !username || !type) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const result = await signUp({ email, password, username, type });

    if (result?.error) {
      Alert.alert("Erro", result.error);
      return;
    }

    Alert.alert("Conta criada!", "Agora pode iniciar sessão.");
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.backgroundTop, colors.backgroundBottom]}
        style={styles.container}
      >
        <Text style={styles.title}>EcoZitos</Text>
        <Text style={styles.subtitle}>Signup</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ecozito@gmail.com"
            placeholderTextColor="#7FAEAA"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#7FAEAA"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="EcoZito"
            placeholderTextColor="#7FAEAA"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <TextInput
            value={type}
            onChangeText={setType}
            placeholder="Student/Teacher"
            placeholderTextColor="#7FAEAA"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Do you already have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Sign in
          </Text>
        </Text>

        <Text
          style={styles.skip}
          onPress={() => navigation.navigate("HomeSemLogin")}
        >
          Skip
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 32,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "700",
  },
  footerText: {
    marginTop: 20,
    color: colors.textPrimary,
  },
  link: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  skip: {
    marginTop: 30,
    textDecorationLine: "underline",
    color: colors.textPrimary,
  },
});