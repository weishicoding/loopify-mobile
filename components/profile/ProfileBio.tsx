import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfileBioProps {
  bioText: string;
  onMorePress: () => void;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bioText, onMorePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.bioText}>{bioText}</Text>
      <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
        <Text style={styles.moreText}>More</Text>
        <Ionicons name="chevron-forward" size={16} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
  },
  bioText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreText: {
    color: "#888",
    marginRight: 5,
  },
});

export default ProfileBio;
