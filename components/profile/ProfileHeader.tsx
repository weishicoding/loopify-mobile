import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileHeaderProps {
  username: string;
  followers: number;
  lastVisit: string;
  onEditPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  followers,
  lastVisit,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.usernameHeader}>{username}</Text>

        <View style={styles.rightIcons}>
          <Ionicons
            name="shirt-outline"
            size={26}
            color="white"
            style={styles.icon}
          />
          <Ionicons name="share-outline" size={26} color="white" />
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/90" }}
          style={styles.profileImage}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>{followers} followers</Text>
            <Text style={styles.statsText}>{lastVisit}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00AA3E",
    paddingBottom: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
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
    padding: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "white",
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
  },
  statsText: {
    color: "rgba(255, 255, 255, 0.8)",
    marginRight: 10,
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileHeader;
