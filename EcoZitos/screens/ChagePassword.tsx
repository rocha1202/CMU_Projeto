import React, { useContext } from "react";
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

export default function ChangePassword() {
  const navigation = useNavigation<any>();
  const { user, signUp } = useContext(AuthContext)!;

  // ESTADOS
  const [oldPass, setOldPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");

  async function handleSave() {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPass !== confirmPass) {
      Alert.alert("Error", "The new password does not match.");
      return;
    }

    try {
      const res = await fetch(
        `http://10.0.2.2:5000/users/${user._id}/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: oldPass,
            newPassword: newPass,
          }),
        },
      );

      const data = await res.json();

      if (!data.success) {
        Alert.alert("Error", data.message || "Unable to change password.");
        return;
      }

      // Atualizar AuthContext
      signUp(data.user);

      Alert.alert("Success", "Password updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the password.");
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

        <Text style={styles.headerTitle}>Change password</Text>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* INPUT OLD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            value={oldPass}
            onChangeText={setOldPass}
            placeholder="••••••••"
            placeholderTextColor="#7FAEAA"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* INPUT NEW */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            value={newPass}
            onChangeText={setNewPass}
            placeholder="••••••••"
            placeholderTextColor="#7FAEAA"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* INPUT CONFIRM */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password Confirmation</Text>
          <TextInput
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="••••••••"
            placeholderTextColor="#7FAEAA"
            secureTextEntry
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
