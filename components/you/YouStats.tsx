import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface YouStatsProps {
  collections: number;
  history: number;
  following: number;
  vouchers: number;
}

const YouStats: React.FC<YouStatsProps> = ({
  collections,
  history,
  following,
  vouchers,
}) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{collections}</Text>
        <Text style={styles.statLabel}>Collections</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{history}</Text>
        <Text style={styles.statLabel}>Browsing History</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{following}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});

export default YouStats;
