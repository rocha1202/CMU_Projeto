import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function ChangePersonalData() {
  const navigation = useNavigation<any>();
  const { user, signUp } = useContext(AuthContext)!;

  // ESTADOS COM VALORES ATUAIS
  const [email, setEmail] = React.useState(user?.email || "");
  const [username, setUsername] = React.useState(user?.username || "");

async function handleSave() {
  if (!email || !username) {
    Alert.alert("Erro", "Preencha todos os campos");
    return;
  }

  try {
    const res = await fetch(`http://10.0.2.2:5000/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username }),
    });

    const updatedUser = await res.json();

    // Atualiza o AuthContext
    signUp(updatedUser);

    Alert.alert("Sucess", "The data has been successfully updated!\nHowever, please log in again to see the changes.");
    navigation.goBack();
  } catch (error) {
    Alert.alert("Error", "Cloud not update data. Please try again later.");
    console.log(error);
  }
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

        <Text style={styles.headerTitle}>Change personal data</Text>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            placeholderTextColor="#7FAEAA"
            style={styles.input}
          />
        </View>

        {/* USERNAME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Ecozitos"
            placeholderTextColor="#7FAEAA"
            style={styles.input}
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    paddingBottom: 160,
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
