import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";
import Navbar from "../components/Navbar";
import challengesData from "../api/challenges.json";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const carouselImages = [
  { id: "1", image: require("../assets/carousel1.png") },
  { id: "2", image: require("../assets/carousel2.png") },
  { id: "3", image: require("../assets/carousel3.png") },
];

export default function HomeScreen() {
  const challenges = challengesData;
  const navigation = useNavigation<any>();

  const getImage = (path: string) => {
    if (path.includes("challenge1.png")) {
      return require("../assets/challenge1.png");
    }
    if (path.includes("challenge2.png")) {
      return require("../assets/challenge2.png");
    }
    if (path.includes("challenge3.png")) {
      return require("../assets/challenge3.png");
    }
    return require("../assets/challenge1.png");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Navigation */}
      <View style={styles.navButtons}>
        <TouchableOpacity style={[styles.navButton, styles.activeButton]}>
          <Image
            source={require("../assets/Icons/Home.png")}
            style={[styles.navIcon, {tintColor: colors.white}]}
          />
          <Text style={[styles.navText, styles.activeText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}
        onPress={() => navigation.navigate("MyActivity")}>
          <Image
            source={require("../assets/Icons/Home.png")}
            style={[styles.navIcon, {tintColor: colors.primary}]}
          />
          
          <Text style={styles.navText}>My activity</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.container}>
        {/* Latest Articles */}

        <Text style={styles.subtitle}>Latest Articles</Text>

        {/* Carousel */}
        <FlatList
          data={carouselImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={item.image} style={styles.carouselImage} />
          )}
        />

        {/* Challenges */}
        <Text style={styles.subtitle}>Challenges</Text>
        {challenges.map((item) => (
          <View
            key={item.id}
            style={[styles.card, item.id % 2 === 0 ? styles.cardReverse : null]}
          >
            <Image source={getImage(item.image)} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.text}</Text>
              <Text style={styles.link}>See more</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <Navbar logged={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  topBarButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  articlesImage: {
    width: width - 32,
    height: 180,
    borderRadius: 16,
    marginBottom: 20,
  },
  carouselImage: {
    width: width - 32,
    height: 180,
    borderRadius: 16,
    marginRight: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardReverse: {
    flexDirection: "row-reverse",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 4,
    fontSize: 16,
    color: colors.textPrimary,
  },
  cardText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  link: {
    marginTop: 8,
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  navButtons: {
  flexDirection: "row",
  justifyContent: "center",
  gap: 12,
  marginTop: 10,
  marginBottom: 10,
},

navButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.primary,
},

activeButton: {
  backgroundColor: colors.primary,
},

navText: {
  fontSize: 16,
  fontWeight: "600",
  marginLeft: 8,
  color: colors.primary,
},

activeText: {
  color: colors.white,
},

navIcon: {
  width: 20,
  height: 20,
},
});
