import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";


export default function NavbarComLogin() {
    const navigation = useNavigation<any>();
  
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require("../assets/Icons/Search.png")} style={styles.icon} />
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Image source={require("../assets/Icons/Home.png")} style={styles.icon} />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Image source={require("../assets/Icons/Profile.png")} style={styles.icon} />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Notifications")}>
        <Image source={require("../assets/Icons/Bell.png")} style={styles.icon} />
        <Text style={styles.navText}>Notifications</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
});