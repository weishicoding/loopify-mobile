import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TipsSectionProps {
  tipText: string;
}

const TipsSection: React.FC<TipsSectionProps> = ({ tipText }) => {
  return (
    <View style={styles.tipsSection}>
      <View style={styles.tipsContent}>
        <Text style={styles.tipsTitle}>TIPS</Text>
        <Text style={styles.tipsText}>{tipText}</Text>
      </View>
      <View style={styles.tipsIcon}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>TB</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#888" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tipsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15,
  },
  tipsContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tipsTitle: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  tipsText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  tipsIcon: {
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

export default TipsSection;
