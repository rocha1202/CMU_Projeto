import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

const { width, height } = Dimensions.get("window");

export default function Onboarding1() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Personagem da Terra */}
      <Image
        source={require("../assets/SplashScreen/Flores.png")}
        style={styles.earth}
      />
      {/* Indicador de progresso */}
      <View style={styles.progressDots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      {/* Texto de boas-vindas */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>Welcome to EcoZitos!</Text>
        <Text style={styles.subtitle}>
          Join Zito and discover how small actions can change the planet!
        </Text>
      </View>
      {/* Navegação */}
      <View style={styles.navFixed}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate("Onboarding2")}
        >
          <Image
            source={require("../assets/Icons/ArrowRight.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  earth: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 30,
  },
  textBlock: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryDark,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
    lineHeight: 22,
  },
  progressDots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
  },
  skip: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  arrow: {
    width: 32,
    height: 32,
    tintColor: colors.primary,
  },
  navFixed: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  arrowButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },

  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});
