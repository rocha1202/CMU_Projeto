import { AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";

export default function Search() {
  const navigation = useNavigation<any>();

  const [selected, setSelected] = useState("challenges");
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(AuthContext)!;

  const [friends, setFriends] = useState<string[]>(user?.friends || []);

  const toggleFollow = async (targetId: string) => {
    const isFollowing = friends.includes(targetId);

    const url = isFollowing
      ? `http://10.0.2.2:5000/users/${targetId}/unfollow`
      : `http://10.0.2.2:5000/users/${targetId}/follow`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    });

    const data = await response.json();

    // Atualiza estado local
    setFriends(data.friends);

    // Atualiza o user global (para o Profile e outros ecrãs)
    setUser((prev: any) => ({
      ...prev,
      friends: data.friends,
    }));
  };
  // USERS (para ranks)
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // RANK CATEGORY
  const [rankCategory, setRankCategory] = useState<
    "teams" | "classroom" | "app"
  >("teams");

  // CHALLENGES
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);

  // Buscar challenges ao backend
  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://10.0.2.2:5000/challenges");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Erro ao buscar challenges:", error);
      } finally {
        setLoadingChallenges(false);
      }
    }
    fetchChallenges();
  }, []);

  // Buscar users ao backend
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://10.0.2.2:5000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar utilizadores:", error);
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchUsers();
  }, []);
  const onlyStudents = users.filter((u) => u.type === "Student");
  const filteredStudents = onlyStudents.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  // Separar users por categoria
  const teams = users
    .filter((u) => u.type === "Team")
    .sort((a, b) => b.points - a.points);

  const classroom = users
    .filter((u) => u.type === "Teacher")
    .sort((a, b) => b.points - a.points);

  const appUsers = users
    .filter((u) => u.type === "Student")
    .sort((a, b) => b.points - a.points);

  const ranksData = {
    teams,
    classroom,
    app: appUsers,
  };
  const filteredRanks = ranksData[rankCategory].filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  const getImage = (imagePath: string) => {
    if (imagePath.includes("challenge1")) {
      return require("../assets/Challenges/challenge1.png");
    }
    if (imagePath.includes("challenge2")) {
      return require("../assets/Challenges/challenge2.png");
    }
    if (imagePath.includes("challenge3")) {
      return require("../assets/Challenges/challenge3.png");
    }
    if (imagePath.includes("challenge4")) {
      return require("../assets/Challenges/challenge4.png");
    }
    if (imagePath.includes("challenge5")) {
      return require("../assets/Challenges/challenge5.png");
    }
    if (imagePath.includes("challenge6")) {
      return require("../assets/Challenges/challenge6.png");
    }
    return require("../assets/Challenges/challenge1.png");
  };

  const filteredChallenges = challenges.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const Top3 = ({ data }: { data: any[] }) => {
    if (!data || data.length < 3) return null;

    return (
      <View style={styles.top3Container}>
        <View style={styles.podiumRow}>
          {/* 2nd */}
          <View style={[styles.podiumCard, styles.secondPlace]}>
            <Image
              source={require("../assets/Icons/Avatar.png")}
              style={styles.podiumAvatar}
            />
            <Text style={styles.podiumName}>{data[1].username}</Text>
            <Text style={styles.podiumPoints}>{data[1].points} pts</Text>
          </View>

          {/* 1st */}
          <View style={[styles.podiumCard, styles.firstPlace]}>
            <Image
              source={require("../assets/Icons/Avatar.png")}
              style={styles.podiumAvatar}
            />
            <Text style={styles.podiumName}>{data[0].username}</Text>
            <Text style={styles.podiumPoints}>{data[0].points} pts</Text>
          </View>

          {/* 3rd */}
          <View style={[styles.podiumCard, styles.thirdPlace]}>
            <Image
              source={require("../assets/Icons/Avatar.png")}
              style={styles.podiumAvatar}
            />
            <Text style={styles.podiumName}>{data[2].username}</Text>
            <Text style={styles.podiumPoints}>{data[2].points} pts</Text>
          </View>
        </View>
      </View>
    );
  };

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
        {["challenges", "ranks", "users"].map((key) => {
          const isSelected = selected === key;
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.menuItem,
                isSelected ? styles.menuItemSelected : styles.menuItemDefault,
              ]}
              onPress={() => setSelected(key)}
            >
              <Text
                style={[
                  styles.menuLabel,
                  isSelected
                    ? styles.menuLabelSelected
                    : styles.menuLabelDefault,
                ]}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* DYNAMIC AREA */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* CHALLENGES */}
        {selected === "challenges" &&
          (loadingChallenges ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : filteredChallenges.length === 0 ? (
            <View style={styles.noResultsBox}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          ) : (
            filteredChallenges.map((item) => (
              <View
                key={item._id}
                style={[
                  styles.card,
                  item._id % 2 === 0 ? styles.cardReverse : null,
                ]}
              >
                <Image source={getImage(item.image)} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.text}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ChallengeDetails", { id: item._id })
                    }
                  >
                    <Text style={styles.link}>See more</Text>
                  </TouchableOpacity>
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

            {/* LOADING USERS */}
            {loadingUsers ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                {/* TOP 3 */}
                <Top3 data={ranksData[rankCategory]} />

                {/* LISTA COMPLETA */}
                <View style={styles.fullList}>
                  {filteredRanks.slice(3).map((item) => (
                    <View key={item._id} style={styles.fullListItem}>
                      <Image
                        source={require("../assets/Icons/Avatar.png")}
                        style={styles.fullListAvatar}
                      />
                      <Text style={styles.fullListName}>{item.username}</Text>
                      <Text style={styles.fullListPoints}>
                        {item.points} pts
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </>
        )}

        {/* USERS */}
        {selected === "users" && (
          <View style={styles.usersList}>
            {filteredStudents.map((user) => (
              <View key={user._id} style={styles.userItem}>
                <Image
                  source={require("../assets/Icons/Avatar.png")}
                  style={styles.userAvatar}
                />

                <Text style={styles.userName}>{user.username}</Text>

                <TouchableOpacity onPress={() => toggleFollow(user._id)}>
                  <Image
                    source={
                      friends.includes(user._id)
                        ? require("../assets/Icons/FlowUser.png")
                        : require("../assets/Icons/addUser.png")
                    }
                    style={styles.followIcon}
                  />
                </TouchableOpacity>
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
  safe: { flex: 1, backgroundColor: colors.white },
  inputGroup: { padding: 16 },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  menuItemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  menuItemDefault: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
  },
  menuLabel: { fontWeight: "600" },
  menuLabelSelected: { color: colors.white },
  menuLabelDefault: { color: colors.primary },
  scrollContent: { padding: 16 },

  /* CHALLENGE CARDS */
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
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  cardText: { fontSize: 13, color: "#555" },
  link: {
    marginTop: 8,
    color: colors.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  noResultsBox: { padding: 20, alignItems: "center" },
  noResultsText: { color: "#777" },

  /* RANKS */
  top3Container: { marginVertical: 20 },
  podiumRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  podiumCard: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    width: 100,
  },
  firstPlace: { backgroundColor: "#ffe680", transform: [{ scale: 1.1 }] },
  secondPlace: { backgroundColor: "#d9d9d9" },
  thirdPlace: { backgroundColor: "#f7c08a" },
  podiumAvatar: { width: 50, height: 50, marginBottom: 6 },
  podiumName: { fontWeight: "700", fontSize: 14 },
  podiumPoints: { fontSize: 12, color: "#555" },

  fullList: { marginTop: 20 },
  fullListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  fullListAvatar: { width: 40, height: 40, marginRight: 12 },
  fullListName: { flex: 1, fontSize: 16 },
  fullListPoints: { fontWeight: "700", color: colors.primary },

  usersList: {
    marginTop: 20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  userAvatar: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  userType: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
  },
  followIcon: {
    width: 28,
    height: 28,
    tintColor: colors.primary,
  },
});
