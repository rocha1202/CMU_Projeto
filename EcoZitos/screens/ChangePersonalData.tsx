import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";

export default function ChangePassword() {
  const navigation = useNavigation<any>();

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

        <Text style={styles.headerTitle}>Change personal data</Text>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INPUT */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="ecozitos@email.com"
            placeholderTextColor="#7FAEAA"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Ecozitos"
            placeholderTextColor="#7FAEAA"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* FIXED NAVBAR */}
      <View style={styles.navbarWrapper}>
        <Navbar logged={true} />
      </View>
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

  /* SCROLL CONTENT */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 160, // espaço para navbar + botões
  },

  /* INPUT GROUP */
  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: colors.textPrimary,
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },

  /* SAVE BUTTON */
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  saveText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  /* LOGOUT BUTTON */
  logoutButton: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  /* NAVBAR FIXA */
  navbarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: colors.white,
  },
});
