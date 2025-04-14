import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileHeaderProps {
  username: string;
  points: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, points }) => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileLeftSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.points}>{points} points</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  profileLeftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  points: {
    fontSize: 14,
    color: "#888",
    marginTop: 3,
  },
  settingsButton: {
    padding: 5,
  },
});

export default ProfileHeader;
