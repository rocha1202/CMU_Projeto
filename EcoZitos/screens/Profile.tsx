import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState("badges");

  // 🔥 Dados reais do utilizador autenticado
  const { user } = useContext(AuthContext);

  const menuItems = [
    { key: "badges", label: "Badges" },
    { key: "trophies", label: "Trophies" },
    { key: "challenges", label: "Challenges" },
    { key: "reviews", label: "Reviews" },
    { key: "photos", label: "Photo Library" },
  ];

  const challenges = [
    {
      id: 1,
      title: "Recycling Hero Challenge",
      image: require("../assets/Challenges/challenge1.png"),
    },
    {
      id: 2,
      title: "Save water, Save the Planet",
      image: require("../assets/Challenges/challenge2.png"),
    },
    {
      id: 3,
      title: "Switch Off & Shine",
      image: require("../assets/Challenges/challenge3.png"),
    },
    {
      id: 4,
      title: "Too Good To Go Away",
      image: require("../assets/Challenges/challenge4.png"),
    },
    {
      id: 5,
      title: "Green Commuter Challenge",
      image: require("../assets/Challenges/challenge5.png"),
    },
    {
      id: 6,
      title: "Plastic-Free Pioneer",
      image: require("../assets/Challenges/challenge6.png"),
    },
  ];

  const reviews = [
    {
      id: 1,
      challengeTitle: "Recycling Hero Challenge",
      comment: "Aprendi imenso! Muito divertido e útil.",
      avatar: require("../assets/Icons/Avatar.png"),
      name: user?.username || "User",
      stars: 4,
      hearts: 12,
    },
    {
      id: 2,
      challengeTitle: "Save water, Save the Planet",
      comment: "Gostei bastante, fez-me pensar no desperdício.",
      avatar: require("../assets/Icons/Avatar.png"),
      name: user?.username || "User",
      stars: 5,
      hearts: 20,
    },
    {
      id: 3,
      challengeTitle: "Switch Off & Shine",
      comment: "Muito simples mas eficaz!",
      avatar: require("../assets/Icons/Avatar.png"),
      name: user?.username || "User",
      stars: 3,
      hearts: 8,
    },
  ];

  const photos = [
    { id: 1, image: require("../assets/Photos/photo1.png") },
    { id: 2, image: require("../assets/Photos/photo2.png") },
    { id: 3, image: require("../assets/Photos/photo3.png") },
    { id: 4, image: require("../assets/Photos/photo4.png") },
    { id: 5, image: require("../assets/Photos/photo5.png") },
    { id: 6, image: require("../assets/Photos/photo6.png") },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* PROFILE INFO */}
      <View style={styles.profileRow}>
        <Image
          source={require("../assets/Icons/Avatar.png")}
          style={styles.avatar}
        />

        <View style={styles.infoColumn}>
          {/* 🔥 Nome real */}
          <Text style={styles.name}>{user?.username || "User"}</Text>

          {/* 🔥 Email real */}
          <Text style={styles.subInfo}>{user?.email || "email@example.com"}</Text>

          {/* Mock data */}
          <Text style={styles.subInfo}>10 Following</Text>
          <Text style={styles.subInfo}>10 Followers</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            source={require("../assets/Icons/settings.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* TOP MENU */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => {
          const isSelected = selected === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuItem,
                isSelected ? styles.menuItemSelected : styles.menuItemDefault,
              ]}
              onPress={() => setSelected(item.key)}
            >
              <Text
                style={[
                  styles.menuLabel,
                  isSelected
                    ? styles.menuLabelSelected
                    : styles.menuLabelDefault,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* DYNAMIC AREA */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* BADGES */}
        {selected === "badges" && (
          <View style={styles.grid}>
            {Array.from({ length: 9 }).map((_, index) => (
              <View key={index} style={styles.gridItem}>
                <Image
                  source={require("../assets/Badges/Badge 1.png")}
                  style={styles.badgeImage}
                />
              </View>
            ))}
          </View>
        )}

        {/* TROPHIES */}
        {selected === "trophies" && (
          <View style={styles.grid}>
            {Array.from({ length: 9 }).map((_, index) => (
              <View key={index} style={styles.gridItem}>
                <Image
                  source={require("../assets/Trophies/Trophy1.png")}
                  style={styles.badgeImage}
                />
              </View>
            ))}
          </View>
        )}

        {/* CHALLENGES */}
        {selected === "challenges" && (
          <View style={{ width: "100%" }}>
            <View style={styles.challengeTopBar}>
              <Text style={styles.challengeTopBarText}>In progress</Text>
              <Image
                source={require("../assets/Icons/Next.png")}
                style={styles.progressIcon}
              />
            </View>

            <View style={styles.challengeRow}>
              {challenges.slice(0, 3).map((item) => (
                <View key={item.id} style={styles.challengeCard}>
                  <Image source={item.image} style={styles.challengeImage} />
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                </View>
              ))}
            </View>

            <View style={styles.challengeTopBar}>
              <Text style={styles.challengeTopBarText}>Favourites</Text>
              <Image
                source={require("../assets/Icons/Next.png")}
                style={styles.progressIcon}
              />
            </View>

            <View style={styles.challengeRow}>
              {challenges.slice(-3).map((item) => (
                <View key={item.id} style={styles.challengeCard}>
                  <Image source={item.image} style={styles.challengeImage} />
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* REVIEWS */}
        {selected === "reviews" && (
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            {reviews.map((item) => (
              <View key={item.id} style={styles.reviewCard}>
                <View style={styles.reviewRow1}>
                  <Text style={styles.reviewTitle}>{item.challengeTitle}</Text>
                  <Image
                    source={require("../assets/Icons/Stars.png")}
                    style={styles.starsRow}
                  />
                </View>

                <Text style={styles.reviewComment}>{item.comment}</Text>

                <View style={styles.reviewRow3}>
                  <View style={styles.reviewUser}>
                    <Image source={item.avatar} style={styles.reviewAvatar} />
                    <Text style={styles.reviewUserName}>{item.name}</Text>
                  </View>

                  <View style={styles.reviewHearts}>
                    <Image
                      source={require("../assets/Icons/heart.png")}
                      style={styles.heartIcon}
                    />
                    <Text style={styles.heartCount}>{item.hearts}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* PHOTO LIBRARY */}
        {selected === "photos" && (
          <View style={styles.photoGrid}>
            {photos.slice(0, 6).map((item) => (
              <View key={item.id} style={styles.photoItem}>
                <Image source={item.image} style={styles.photoImage} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Navbar logged={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoColumn: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  subInfo: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  settingsButton: {
    padding: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
  },
  menuItem: {
    width: 88,
    height: 88,
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  menuItemSelected: {
    backgroundColor: colors.primaryDark,
  },
  menuItemDefault: {
    backgroundColor: colors.white,
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 4,
  },
  menuLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  menuLabelSelected: {
    color: colors.white,
    fontWeight: "bold",
  },
  menuLabelDefault: {
    color: colors.black,
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 120,
  },

  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    rowGap: 20,
  },
  gridItem: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  dynamicArea: {
    paddingTop: 40,
    alignItems: "center",
  },
  dynamicText: {
    fontSize: 18,
    color: colors.textPrimary,
  },

  challengeTopBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  challengeTopBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkblue,
  },
  progressIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  challengeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  challengeCard: {
    width: "30%",
    alignItems: "center",
  },
  challengeImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  challengeTitle: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: colors.black,
    fontWeight: "600",
  },

  reviewCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  reviewRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  starsRow: {
    flexDirection: "row",
    gap: 4,
  },

  reviewComment: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  reviewRow3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },

  reviewHearts: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
  },
  heartCount: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },

  photoGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    rowGap: 20,
    marginTop: 10,
  },

  photoItem: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
