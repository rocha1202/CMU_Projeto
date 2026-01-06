import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import challengesData from "../api/challenges.json";
import Navbar from "../components/Navbar";

export default function Profile() {
  const challenges = challengesData;
  const [selected, setSelected] = useState("challenges");
  const [search, setSearch] = useState("");

  const [rankCategory, setRankCategory] = useState<
    "teams" | "classroom" | "app"
  >("teams");

  const menuItems = [
    { key: "challenges", label: "Challenges" },
    { key: "ranks", label: "Ranks" },
    { key: "users", label: "Users" },
  ];

  const ranksData = {
    teams: [
      {
        id: 1,
        name: "Eco Guardians",
        points: 980,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 2,
        name: "Green Explorers",
        points: 920,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 3,
        name: "Plant Protectors",
        points: 880,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 4,
        name: "Nature Ninjas",
        points: 820,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 5,
        name: "Climate Heroes",
        points: 790,
        avatar: require("../assets/Icons/Avatar.png"),
      },
    ],
    classroom: [
      {
        id: 1,
        name: "Class B",
        points: 1200,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 2,
        name: "Class A",
        points: 1100,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 3,
        name: "Class Y",
        points: 1050,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 4,
        name: "Class T",
        points: 980,
        avatar: require("../assets/Icons/Avatar.png"),
      },
    ],
    app: [
      {
        id: 1,
        name: "ElissRich",
        points: 1500,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 2,
        name: "Mike Kwas",
        points: 1400,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 3,
        name: "Mert Mordd",
        points: 1300,
        avatar: require("../assets/Icons/Avatar.png"),
      },
      {
        id: 4,
        name: "Ricky Morthy",
        points: 1200,
        avatar: require("../assets/Icons/Avatar.png"),
      },
    ],
  };
  const getImage = (id: number) => {
    switch (id) {
      case 1:
        return require("../assets/Challenges/challenge1.png");
      case 2:
        return require("../assets/Challenges/challenge2.png");
      case 3:
        return require("../assets/Challenges/challenge3.png");
      case 4:
        return require("../assets/Challenges/challenge4.png");
      case 5:
        return require("../assets/Challenges/challenge5.png");
      case 6:
        return require("../assets/Challenges/challenge6.png");
      default:
        return require("../assets/Challenges/challenge1.png");
    }
  };
  const Top3 = ({ data }: { data: any[] }) => (
    <View style={styles.top3Container}>
      <View style={styles.podiumRow}>
        {/* 2nd */}
        <View style={[styles.podiumCard, styles.secondPlace]}>
          <Image source={data[1].avatar} style={styles.podiumAvatar} />
          <Text style={styles.podiumName}>{data[1].name}</Text>
          <Text style={styles.podiumPoints}>{data[1].points} pts</Text>
        </View>

        {/* 1st */}
        <View style={[styles.podiumCard, styles.firstPlace]}>
          <Image source={data[0].avatar} style={styles.podiumAvatar} />
          <Text style={styles.podiumName}>{data[0].name}</Text>
          <Text style={styles.podiumPoints}>{data[0].points} pts</Text>
        </View>

        {/* 3rd */}
        <View style={[styles.podiumCard, styles.thirdPlace]}>
          <Image source={data[2].avatar} style={styles.podiumAvatar} />
          <Text style={styles.podiumName}>{data[2].name}</Text>
          <Text style={styles.podiumPoints}>{data[2].points} pts</Text>
        </View>
      </View>
    </View>
  );

  const filteredChallenges = challenges.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* SEARCH */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#7FAEAA"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
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
        {/* CHALLENGES */}
        {selected === "challenges" &&
          (filteredChallenges.length === 0 ? (
            <View style={styles.noResultsBox}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            filteredChallenges.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.card,
                  item.id % 2 === 0 ? styles.cardReverse : null,
                ]}
              >
                <Image
                  source={getImage(item.id)}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.text}</Text>
                  <Text style={styles.link}>See more</Text>
                </View>
              </View>
            ))
          ))}

        {/* RANKS */}
        {selected === "ranks" && (
          <>
            {/* SUBMENU */}
            <View style={styles.menuContainer}>
              {["teams", "classroom", "app"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.menuItem,
                    rankCategory === cat && styles.menuItemSelected,
                  ]}
                  onPress={() => setRankCategory(cat as any)}
                >
                  <Text
                    style={[
                      styles.menuLabel,
                      rankCategory === cat && styles.menuLabelSelected,
                    ]}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* TOP 3 */}
            <Top3 data={ranksData[rankCategory]} />

            {/* LISTA COMPLETA */}
            <View style={styles.fullList}>
              {ranksData[rankCategory].slice(3).map((item) => (
                <View key={item.id} style={styles.fullListItem}>
                  <Image source={item.avatar} style={styles.fullListAvatar} />
                  <Text style={styles.fullListName}>{item.name}</Text>
                  <Text style={styles.fullListPoints}>{item.points} pts</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* USERS */}
        {selected === "users" && (
          <View style={styles.dynamicArea}>
            <Text style={styles.dynamicText}>USERS CONTENT HERE</Text>
          </View>
        )}
      </ScrollView>

      <Navbar logged={true} />
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },

  inputGroup: { paddingHorizontal: 20, marginBottom: 20 },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 20,
  },
  menuItem: {
    width: 120,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemSelected: { backgroundColor: colors.primaryDark },
  menuItemDefault: {
    backgroundColor: colors.white,
    elevation: 4,
  },
  menuLabel: { fontSize: 12 },
  menuLabelSelected: { color: colors.white, fontWeight: "bold" },
  menuLabelDefault: { color: colors.black },

  scrollContent: { paddingBottom: 120 },

  /* TOP 3 */
  top3Container: { paddingHorizontal: 20, marginTop: 20 },
  podiumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  podiumCard: {
    width: "30%",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 4,
  },

  podiumAvatar: { width: 60, height: 60, borderRadius: 30 },
  podiumName: { marginTop: 6, fontWeight: "600" },
  podiumPoints: { color: colors.primary, fontWeight: "700" },

  /* FULL LIST */
  fullList: { paddingHorizontal: 20, marginTop: 20 },
  fullListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    elevation: 3,
  },
  fullListAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  fullListName: { flex: 1, fontSize: 16, fontWeight: "600" },
  fullListPoints: { fontWeight: "700", color: colors.primary },

  /* CHALLENGES */
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    elevation: 5,
  },
  cardReverse: { flexDirection: "row-reverse" },
  cardImage: { width: 100, height: 100, borderRadius: 12 },
  cardContent: { flex: 1, marginLeft: 16 },
  cardTitle: { fontWeight: "700", fontSize: 16 },
  cardText: { fontSize: 13, color: "#555" },
  link: { marginTop: 8, color: colors.primary, fontWeight: "700" },

  noResultsBox: { alignItems: "center", paddingTop: 40 },
  noResultsText: { opacity: 0.6, fontSize: 18 },
  dynamicArea: {
    paddingTop: 40,
    alignItems: "center",
  },
  dynamicText: {
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: "center",
    fontWeight: "600",
  },
  firstPlace: {
    marginBottom: 30,
    backgroundColor: "#227C70",
  },

  secondPlace: {
    marginBottom: 10,
    backgroundColor: "#A4C9B5",
  },

  thirdPlace: {
    marginBottom: 10,
    backgroundColor: "#C8E4D5",
  },
});
