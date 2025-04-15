import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

interface YouHeaderProps {
  username: string;
  points: number;
}

const YouHeader: React.FC<YouHeaderProps> = ({ username, points }) => {
  return (
    <View style={styles.profileHeader}>
      <TouchableOpacity style={styles.profileLeftSection}>
        <Image
          source="https://picsum.photos/seed/696/3000/2000"
          style={styles.profileImage}
          contentFit="cover"
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={20} color="black" />
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

export default YouHeader;
