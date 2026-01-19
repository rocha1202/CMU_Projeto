import React, { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";

export default function Settings() {
  const navigation = useNavigation<any>();

  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [location, fingerprint] = useState(true);
  const { logout } = useContext(AuthContext)!;
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

        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* PERSONAL DATA */}
        <View style={styles.sectionPrimary}>
          <Text style={styles.sectionPrimaryText}>Personal Data</Text>
        </View>

        {/* CHANGE PERSONAL DATA */}
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => navigation.navigate("ChangePersonalData")}
        >
          <Image
            source={require("../assets/Icons/user.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionItemText}>Change personal data</Text>
        </TouchableOpacity>

        {/* CHANGE PASSWORD */}
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Image
            source={require("../assets/Icons/key.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionItemText}>Change Password</Text>
        </TouchableOpacity>

        

      </ScrollView>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout(); // limpa o user do contexto
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    paddingBottom: 140,
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

  /* LOGOUT BUTTON */
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    bottom: 80,
  },
  logoutText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },

  /* PRIMARY SECTIONS */
  sectionPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionPrimaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },

  /* NORMAL ITEM */
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 12,
  },
  sectionItemText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "600",
  },

  sectionIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },

  /* SWITCH ROWS */
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 12,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
  },
});
