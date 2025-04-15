import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Address: React.FC = () => {
  return (
    <View style={styles.Address}>
      <View style={styles.addressContent}>
        <Ionicons name="location-outline" size={20} color="black" />
        <Text style={styles.addressTitle}>Address</Text>
      </View>
      <View style={styles.addressIcon}>
        <Ionicons name="chevron-forward" size={16} color="#888" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Address: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15,
  },
  addressContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  addressTitle: {
    paddingLeft: 10,
    fontWeight: "medium",
    marginRight: 8,
    color: "#333",
    alignItems: "center",
  },
  addressText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  addressIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ff9500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  iconText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default Address;
