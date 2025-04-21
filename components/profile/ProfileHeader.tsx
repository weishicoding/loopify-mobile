import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useUser } from "@/context/UserProvider";
import { router } from "expo-router";

interface ProfileHeaderProps {
  userId: number;
  username: string;
  followers: number;
  lastVisit: string;
  onEditPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userId,
  username,
  followers,
  lastVisit,
  onEditPress,
}) => {
  const { currentUser } = useUser();
  const ifMe = userId !== currentUser?.id;
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source="https://picsum.photos/seed/696/3000/2000"
          style={styles.profileImage}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>{followers} followers</Text>
            <Text style={styles.statsText}>{followers} followers</Text>
          </View>
          <Text style={styles.statsText}>{lastVisit}</Text>
        </View>

        <TouchableOpacity
          style={ifMe ? styles.followButton : null}
          onPress={onEditPress}
        >
          {ifMe ? <Text style={styles.followButtonText}>Follow</Text> : <></>}
        </TouchableOpacity>
      </View>
      <Text style={styles.bioText}>Bio: {12123123}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00AA3E",
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  topSection: {
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  usernameHeader: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 45,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  statsText: {
    color: "rgba(255, 255, 255, 0.8)",
    marginRight: 10,
    fontSize: 14,
  },
  followButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bioText: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ProfileHeader;
