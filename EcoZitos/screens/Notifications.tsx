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

export default function Notifications() {
  const navigation = useNavigation<any>();

  const notifications = [
    {
      id: 1,
      initials: "DA",
      text: "Diana likes your post.\nI turned off the tap while brushing my teeth and saved tons of water!",
      stars: 5,
      time: "2 mins ago",
    },
    {
      id: 2,
      initials: "NK",
      text: "Nick started following you",
      stars: null,
      time: "2 mins ago",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Mentions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Replies</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <ScrollView style={styles.container}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>{item.initials}</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationText}>{item.text}</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  markRead: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    textDecorationLine: "underline",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  activeTabText: {
    color: colors.white,
  },
  notificationCard: {
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
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarInitials: {
    color: "white",
    fontWeight: "700",
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
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
});