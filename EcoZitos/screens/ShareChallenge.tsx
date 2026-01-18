import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../theme/colors";
import Navbar from "../components/Navbar";

export default function ShareChallenge() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { challenge } = route.params as any;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSelectStar = (value: number) => {
    setRating(value);
  };

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

        <Text style={styles.headerTitle}>{challenge.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TEXTO DO CHALLENGE */}
        <Text style={styles.challengeText}>{challenge.text}</Text>

        {/* RATING */}
        <Text style={styles.sectionTitle}>Your Rating</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleSelectStar(star)}>
              <Image
                source={
                  star <= rating
                    ? require("../assets/Icons/star1.png")
                    : require("../assets/Icons/star2.png")
                }
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* REVIEW */}
        <Text style={styles.sectionTitle}>Your Review</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your thoughts..."
          placeholderTextColor="#999"
          multiline
          value={review}
          onChangeText={setReview}
        />

        {/* UPLOAD DE FOTOS */}
        <Text style={styles.sectionTitle}>Upload Photos</Text>

        <TouchableOpacity style={styles.uploadBox}>
          <Image
            source={require("../assets/Icons/upload.png")}
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadText}>Add photos</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTÃO SHARE */}
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>

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
    paddingVertical: 10,
  },

  backIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  challengeText: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  starsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  starIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },

  reviewInput: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 14,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 16,
    color: colors.textPrimary,
  },

  uploadBox: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },

  uploadText: {
    fontSize: 16,
    color: colors.primary,
  },

  shareButton: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  shareButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});