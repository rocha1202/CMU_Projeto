import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const earthAnim = useRef(new Animated.Value(0)).current; // posição Y
  const textOpacity = useRef(new Animated.Value(0)).current; // fade-in

  useEffect(() => {
    // 1. Terra aparece e sobe
    Animated.timing(earthAnim, {
      toValue: -20, // sobe 40px
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // 2. Texto aparece depois
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        //aguarda 1 segundo antes de prosseguir para o onboarding ou home
        setTimeout(() => {
          // Aqui você pode navegar para a próxima tela, por exemplo:
          navigation.replace("Onboarding1");
        }, 1000);
      });
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/SplashScreen/Gradient Animation.png")}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* EARTH ANIMADA */}
        <Animated.Image
          source={require("../assets/SplashScreen/Zito.png")}
          style={[styles.earth, { transform: [{ translateY: earthAnim }] }]}
        />

        {/* TEXTO COM FADE-IN */}
        <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
          EcoZitos
        </Animated.Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  earth: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1.5,
  },
});
