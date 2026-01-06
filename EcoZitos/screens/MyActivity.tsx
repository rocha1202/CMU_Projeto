import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme/colors";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";

export default function ActivityScreen() {
  const navigation = useNavigation<any>();

  const activities = [
    {
      id: 1,
      type: "comment",
      text: "You commented on the challenge.\nI turned off the tap while brushing my teeth and saved tons of water!",
      stars: 4,
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "follow",
      text: "You started following you",
      stars: null,
      time: "2 mins ago",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top Navigation */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("HomeComLogin")}
        >
          <Image
            source={require("../assets/Icons/Home.png")}
            style={[styles.navIcon, { tintColor: colors.primary }]}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, styles.activeButton]}>
          <Image
            source={require("../assets/Icons/Home.png")}
            style={[styles.navIcon, { tintColor: colors.white }]}
          />
          <Text style={[styles.navText, styles.activeText]}>My activity</Text>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Activity</Text>
      </View>

      {/* Activity List */}
<ScrollView style={styles.container}>
  {activities.map((item) => (
    <View key={item.id} style={styles.activityCard}>
      <Image
        source={require("../assets/Icons/Avatar.png")}
        style={styles.avatar}
      />
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>{item.text}</Text>
        {item.stars && (
          <View style={styles.stars}>
            {Array.from({ length: item.stars }).map((_, i) => (
              <Image
                key={i}
                source={require("../assets/Icons/Stars.png")}
                style={styles.starIcon}
              />
            ))}
          </View>
        )}
        <Text style={styles.timestamp}>{item.time}</Text>
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
  header: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  activityText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  avatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 12,
},

activityCard: {
  flexDirection: "row",
  alignItems: "flex-start",
  backgroundColor: colors.white,
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
},

activityContent: {
  flex: 1,
},
});