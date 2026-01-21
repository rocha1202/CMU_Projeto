import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
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
import { useRoute } from "@react-navigation/native";

export default function ProfileOtherUsers() {
  const route = useRoute<any>();
  const { userId } = route.params;
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState("badges");
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  //Dados reais do utilizador autenticado
  const { user, setUser } = useContext(AuthContext)!;

  const fetchOtherUser = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:5000/users/${userId}`);
      const data = await res.json();
      setOtherUser(data);
    } catch (error) {
      console.log("Erro ao buscar o outro user:", error);
    }
  };
  useEffect(() => {
    fetchOtherUser();
  }, [userId]);
  useEffect(() => {
    async function fetchChallenges() {
      try {
        const res = await fetch("http://10.0.2.2:5000/challenges");
        const data = await res.json();
        setChallenges(data);
      } catch (error) {
        console.log("Erro ao buscar challenges:", error);
      } finally {
        setLoadingChallenges(false);
      }
    }

    fetchChallenges();
  }, []);
  const inProgress = challenges.filter((ch) =>
    ch.participants?.some((p: any) => p === userId || p._id === userId),
  );

  const favourites = challenges.filter((ch) =>
    ch.likes?.some((l: any) => l === userId || l._id === userId),
  );

  const menuItems = [
    { key: "badges", label: "Badges" },
    { key: "trophies", label: "Trophies" },
    { key: "challenges", label: "Challenges" },
    { key: "reviews", label: "Reviews" },
    { key: "photos", label: "Photo Library" },
  ];

  const photos = [
    { id: 1, image: require("../assets/Photos/photo1.png") },
    { id: 2, image: require("../assets/Photos/photo2.png") },
    { id: 3, image: require("../assets/Photos/photo3.png") },
    { id: 4, image: require("../assets/Photos/photo4.png") },
    { id: 5, image: require("../assets/Photos/photo5.png") },
    { id: 6, image: require("../assets/Photos/photo6.png") },
  ];
  const getImage = (imagePath: string) => {
    if (!imagePath) return require("../assets/Challenges/challenge1.png");

    if (imagePath.includes("challenge1"))
      return require("../assets/Challenges/challenge1.png");
    if (imagePath.includes("challenge2"))
      return require("../assets/Challenges/challenge2.png");
    if (imagePath.includes("challenge3"))
      return require("../assets/Challenges/challenge3.png");
    if (imagePath.includes("challenge4"))
      return require("../assets/Challenges/challenge4.png");
    if (imagePath.includes("challenge5"))
      return require("../assets/Challenges/challenge5.png");
    if (imagePath.includes("challenge6"))
      return require("../assets/Challenges/challenge6.png");

    return require("../assets/Challenges/challenge1.png");
  };

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const res = await fetch(
          `http://10.0.2.2:5000/challenges/user/${userId}/reviews`,
        );
        const data = await res.json();
        setUserReviews(data);
      } catch (error) {
        console.log("Erro ao buscar reviews do user:", error);
      } finally {
        setLoadingReviews(false);
      }
    }

    if (userId) fetchUserReviews();
  }, [userId]);
  const renderStars = (rating: number) => (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Image
          key={star}
          source={
            star <= rating
              ? require("../assets/Icons/star1.png")
              : require("../assets/Icons/star2.png")
          }
          style={{ width: 15, height: 15, marginRight: 3 }}
        />
      ))}
    </View>
  );
const toggleFollow = async (targetId: string) => {
  const isFollowing = user.friends.includes(targetId);

  const url = isFollowing
    ? `http://10.0.2.2:5000/users/${targetId}/unfollow`
    : `http://10.0.2.2:5000/users/${targetId}/follow`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user._id }),
  });

  const data = await response.json();

  if (!data.success) return;

  // Atualiza o user autenticado globalmente
  setUser(data.updatedUser); 

  // Atualiza o outro user localmente
  setOtherUser(data.otherUser);

  // Recarrega do Mongo
  fetchOtherUser();
};
  if (!otherUser) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ padding: 20 }}>Loading profile...</Text>
      </SafeAreaView>
    );
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

        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      {/* PROFILE INFO */}
      <View style={styles.profileRow}>
        <Image
          source={require("../assets/Icons/Avatar.png")}
          style={styles.avatar}
        />

        <View style={styles.infoColumn}>
          {/* Nome real */}
          <Text style={styles.name}>{otherUser?.username}</Text>
          {/* Email real */}
          <Text style={styles.subInfo}>
            {otherUser?.email || "email@example.com"}
          </Text>

          {/* Mock data */}
          <Text style={styles.subInfo}>
            {otherUser?.friends?.length || 0} Following
          </Text>

          <Text style={styles.subInfo}>
            {otherUser?.followers?.length || 0} Followers
          </Text>
        </View>

        <TouchableOpacity
          style={styles.followButton}
          onPress={() => toggleFollow(otherUser._id)}
        >
          <Text style={styles.followText}>
            {user.friends?.includes(otherUser._id) ? "Unfollow" : "Follow"}
          </Text>
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
            {/* IN PROGRESS */}
            <View style={styles.challengeTopBar}>
              <Text style={styles.challengeTopBarText}>In progress</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.challengeRow}
            >
              {inProgress.length === 0 ? (
                <Text style={styles.emptyText}>No challenges in progress</Text>
              ) : (
                inProgress.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.challengeCard}
                    onPress={() =>
                      navigation.navigate("ChallengeDetails", { id: item._id })
                    }
                  >
                    <Image
                      source={getImage(item.image)}
                      style={styles.challengeImage}
                    />
                    <Text style={styles.challengeTitle}>{item.title}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>

            {/* FAVOURITES */}
            <View style={styles.challengeTopBar}>
              <Text style={styles.challengeTopBarText}>Favourites</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.challengeRow}
            >
              {favourites.length === 0 ? (
                <Text style={styles.emptyText}>No favourite challenges</Text>
              ) : (
                favourites.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.challengeCard}
                    onPress={() =>
                      navigation.navigate("ChallengeDetails", { id: item._id })
                    }
                  >
                    <Image
                      source={getImage(item.image)}
                      style={styles.challengeImage}
                    />
                    <Text style={styles.challengeTitle}>{item.title}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        )}
        {/* REVIEWS */}
        {selected === "reviews" && (
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            {loadingReviews ? (
              <Text style={styles.noReviewsText}>Loading reviews...</Text>
            ) : userReviews.length === 0 ? (
              <Text style={styles.noReviewsText}>
                You haven't written any reviews yet
              </Text>
            ) : (
              userReviews.map((rev, index) => (
                <View key={index} style={styles.reviewCard}>
                  {/* Challenge Title + Stars */}
                  <View style={styles.reviewRow1}>
                    <Text style={styles.reviewTitle}>{rev.challengeTitle}</Text>
                    {renderStars(rev.rating)}
                  </View>

                  {/* Comment */}
                  <Text style={styles.reviewComment}>{rev.comment}</Text>

                  {/* User */}
                  <View style={styles.reviewRow3}>
                    <View style={styles.reviewUser}>
                      <Image
                        source={require("../assets/Icons/Avatar.png")}
                        style={styles.reviewAvatar}
                      />
                      <Text style={styles.reviewUserName}>
                        {otherUser?.username}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
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
    marginTop: 20,
  },
  noReviewsText: {
    textAlign: "center",
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    opacity: 0.7,
  },
  followButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  followText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  menuItem: {
    width: 78,
    height: 78,
    padding: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
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
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
    paddingLeft: 10, // para não colar à esquerda
  },
  challengeCard: {
    width: 110,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  emptyText: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 20,
    opacity: 0.7,
  },
});
