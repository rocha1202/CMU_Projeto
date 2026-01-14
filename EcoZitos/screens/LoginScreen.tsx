import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { signIn } = React.useContext(AuthContext);

  // ESTADOS (adicionados)
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin() {
    const result = signIn(email, password);

    if (result?.error) {
      Alert.alert("Erro", result.error);
      return;
    }

    navigation.navigate("HomeComLogin");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.backgroundTop, colors.backgroundBottom]}
        style={styles.container}
      >
        <Image
          source={require("../assets/ecozitos.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>EcoZitos</Text>
        <Text style={styles.subtitle}>Sign in</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Are you new?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("SignUp")}
          >
            Create an account
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
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 32,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    fontSize: 16,
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
    color: colors.textPrimary,
    textDecorationLine: "underline",
  },
});
