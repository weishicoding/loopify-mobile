import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface PostButtonProps {
  onPress: () => void;
}

const PostButton: React.FC<PostButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>+ Post</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#FFDD00",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostButton;
