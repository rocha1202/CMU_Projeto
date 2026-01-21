import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function NavbarComLogin() {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext)!;

  return (
    <View style={styles.navbar}>

      {/* Search */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Search")}
      >
        <Image
          source={require("../assets/Icons/Search.png")}
          style={styles.icon}
        />
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>

      {/* Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("HomeComLogin")}
      >
        <Image
          source={require("../assets/Icons/Home.png")}
          style={styles.icon}
        />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("../assets/Icons/Profile.png")}
          style={styles.icon}
        />
        <Text style={styles.navText}>
          {user ? user.username : "Profile"}
        </Text>
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

        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
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
