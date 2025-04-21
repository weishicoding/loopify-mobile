import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useUser } from "@/context/UserProvider";

const YouHeader: React.FC = () => {
  const { currentUser } = useUser();
  const handleSetting = () => {
    router.push({
      pathname: "/setting",
    });
  };
  const handleProfile = () => {
    router.push({
      pathname: "/profile",
      params: { userId: currentUser?.id },
    });
  };
  return (
    <View style={styles.profileHeader}>
      <TouchableOpacity
        style={styles.profileLeftSection}
        onPress={handleProfile}
      >
        <Image
          source="https://picsum.photos/seed/696/3000/2000"
          style={styles.profileImage}
          contentFit="cover"
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{currentUser?.nickname}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={handleSetting}>
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
