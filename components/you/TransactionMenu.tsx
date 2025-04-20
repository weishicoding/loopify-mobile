import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

interface TransactionMenuProps {
  purchasedCount: number;
}

const TransactionMenu: React.FC<TransactionMenuProps> = ({
  purchasedCount,
}) => {
  return (
    <View style={styles.transactionSection}>
      <Text style={styles.sectionTitle}>My Trades</Text>
      <View style={styles.transactionMenu}>
        <View style={styles.menuItem}>
          <Ionicons name="bag-handle-outline" size={24} color="black" />
          <Text style={styles.menuLabel}>Posted</Text>
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="file-tray-full-outline" size={24} color="black" />
          <Text style={styles.menuLabel}>Sold</Text>
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="basket-outline" size={24} color="black" />
          <Text style={styles.menuLabel}>Purchased {purchasedCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionSection: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  transactionMenu: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuItem: {
    alignItems: "center",
    paddingBottom: 10,
    position: "relative",
    width: "25%",
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  menuLabel: {
    marginTop: 10,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    right: 15,
    top: 0,
    backgroundColor: "#ff3b30",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default TransactionMenu;
