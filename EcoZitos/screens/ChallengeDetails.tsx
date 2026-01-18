import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

type RouteParams = {
  id: string;
};

export default function ChallengeDetails() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext)!;

  const { id } = route.params as RouteParams;

  const [challenge, setChallenge] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [participating, setParticipating] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleToggleLike = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://10.0.2.2:5000/challenges/${id}/toggle-like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        },
      );

      const data = await res.json();

      setChallenge((prev: any) =>
        prev ? { ...prev, likes: data.likes } : prev,
      );

      setLiked((prev) => !prev);
    } catch (error) {
      console.log("Erro ao alternar like:", error);
    }
  };
  useEffect(() => {
    async function fetchChallenge() {
      try {
        const res = await fetch(`http://10.0.2.2:5000/challenges/${id}`);
        const data = await res.json();
        setChallenge(data);

        // PARTICIPAÇÃO
        if (
          user &&
          data.participants?.some(
            (p: any) => p === user._id || p._id === user._id,
          )
        ) {
          setParticipating(true);
        }

        // LIKE
        if (
          user &&
          data.likes?.some((u: any) => u === user._id || u._id === user._id)
        ) {
          setLiked(true);
        }
      } catch (error) {
        console.log("Erro ao buscar challenge:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge();
  }, [id]);
  const getImage = (imagePath: string) => {
    if (!imagePath) return require("../assets/Challenges/challenge1.png");

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
  const handleShare = () => {
    console.log("Partilhar challenge:", challenge.title, challenge._id);
    // Aqui podes abrir modal, enviar para amigos, etc.
  };
  const handleParticipate = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://10.0.2.2:5000/challenges/${id}/participate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        },
      );

      const data = await res.json();

      // Atualiza o challenge localmente
      setChallenge((prev: any) =>
        prev ? { ...prev, participants: data.participants } : prev,
      );

      // Atualiza o estado do botão
      setParticipating(true);
    } catch (error) {
      console.log("Erro ao participar:", error);
    }
  };
  const handleUnparticipate = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://10.0.2.2:5000/challenges/${id}/unparticipate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        },
      );

      const data = await res.json();

      setChallenge((prev: any) =>
        prev ? { ...prev, participants: data.participants } : prev,
      );

      setParticipating(false);
    } catch (error) {
      console.log("Erro ao remover participação:", error);
    }
  };
  if (loading || !challenge) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const participantsCount = challenge.participants?.length || 0;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";

    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const calculateProgress = () => {
    const start = new Date(challenge.dateStart).getTime();
    const end = new Date(challenge.dateEnd).getTime();
    const now = Date.now();

    if (now <= start) return 0; // ainda não começou
    if (now >= end) return 100; // já terminou

    const total = end - start;
    const elapsed = now - start;

    return Math.round((elapsed / total) * 100);
  };
  const progress = calculateProgress();
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/Icons/Next.png")}
            style={[styles.backIcon, { transform: [{ rotate: "180deg" }] }]}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Challenge</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TÍTULO + AÇÕES */}

        <View style={styles.topRow}>
          <Image source={getImage(challenge.image)} style={styles.mainImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.text}</Text>
          </View>

          <View style={styles.actionsColumn}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleToggleLike}
            >
              <Image
                source={
                  liked
                    ? require("../assets/Icons/heart2.png") // coração cheio
                    : require("../assets/Icons/heart1.png") // coração vazio
                }
                style={styles.actionIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Image
                source={require("../assets/Icons/share.png")}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* PARTICIPANTES + DATA */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Participants: {participantsCount}</Text>
          <Text style={styles.metaText}>
            {formatDate(challenge.dateStart)} - {formatDate(challenge.dateEnd)}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% completed</Text>
        </View>

        {/* PHOTO LIBRARY */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Photo Library</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photoRow}
        >
          {challenge.photos && challenge.photos.length > 0 ? (
            challenge.photos.map((p: string, index: number) => (
              <View key={index} style={styles.photoItem}>
                {/* Se forem URLs reais, usar source={{ uri: p }} */}
                <Image
                  source={require("../assets/Photos/photo1.png")}
                  style={styles.photoImage}
                />
              </View>
            ))
          ) : (
            <>
              <View style={styles.photoItem}>
                <Image
                  source={require("../assets/Photos/photo1.png")}
                  style={styles.photoImage}
                />
              </View>
              <View style={styles.photoItem}>
                <Image
                  source={require("../assets/Photos/photo2.png")}
                  style={styles.photoImage}
                />
              </View>
              <View style={styles.photoItem}>
                <Image
                  source={require("../assets/Photos/photo3.png")}
                  style={styles.photoImage}
                />
              </View>
            </>
          )}
        </ScrollView>

        {/* REVIEWS */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Reviews</Text>
        </View>

        {challenge.reviews && challenge.reviews.length > 0 ? (
          challenge.reviews.map((rev: any, index: number) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewRow1}>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
                <Image
                  source={require("../assets/Icons/Stars.png")}
                  style={styles.starsRow}
                />
              </View>

              <View style={styles.reviewRow3}>
                <View style={styles.reviewUser}>
                  <Image
                    source={require("../assets/Icons/Avatar.png")}
                    style={styles.reviewAvatar}
                  />
                  <Text style={styles.reviewUserName}>
                    {rev.user?.username || "User"}
                  </Text>
                </View>

                <View style={styles.reviewHearts}>
                  <Image
                    source={require("../assets/Icons/heart.png")}
                    style={styles.heartIcon}
                  />
                  <Text style={styles.heartCount}>{rev.hearts || 0}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        )}

        {/* BOTÃO PARTICIPAR */}
        {!participating ? (
          <TouchableOpacity
            style={styles.participateButton}
            onPress={handleParticipate}
          >
            <Text style={styles.participateText}>Participate</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.participatingActions}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={navigation.navigate("ShareChallenge", { challenge })}
            >
              <Text style={styles.shareText}>Share Challenge</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.leaveButton}
              onPress={handleUnparticipate}
            >
              <Text style={styles.leaveText}>Leave Challenge</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.primary,
  },
  actionsColumn: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  iconButton: {
    padding: 6,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  metaText: {
    fontSize: 13,
    color: colors.primary,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBarBackground: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  progressText: {
    marginTop: 6,
    fontSize: 12,
    color: colors.primary,
  },
  sectionHeaderRow: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  photoRow: {
    flexDirection: "row",
  },
  mainImage: {
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: "cover",
  },
  photoItem: {
    marginRight: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  photoImage: {
    width: 120,
    height: 90,
    borderRadius: 12,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
  },
  reviewRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewComment: {
    flex: 1,
    fontSize: 14,
    color: colors.primary,
    marginRight: 10,
  },
  starsRow: {
    width: 80,
    height: 16,
    resizeMode: "contain",
  },
  reviewRow3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  reviewUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  reviewHearts: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  heartCount: {
    fontSize: 14,
    color: colors.primary,
  },
  noReviewsText: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 6,
  },
  participateButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  participateText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  participatingActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  shareButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    marginRight: 10,
    alignItems: "center",
  },

  leaveButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 24,
    marginLeft: 10,
    alignItems: "center",
  },

  shareText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  leaveText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
