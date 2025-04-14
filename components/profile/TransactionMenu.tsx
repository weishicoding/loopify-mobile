import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface TransactionMenuProps {
  purchasedCount: number;
}

const TransactionMenu: React.FC<TransactionMenuProps> = ({
  purchasedCount,
}) => {
  return (
    <View style={styles.transactionSection}>
      <Text style={styles.sectionTitle}>My Transactions</Text>
      <View style={styles.transactionMenu}>
        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="document-outline" size={24} color="#333" />
          </View>
          <Text style={styles.menuLabel}>Items I Posted</Text>
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <FontAwesome name="dollar" size={24} color="#333" />
          </View>
          <Text style={styles.menuLabel}>Items I Sold</Text>
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <MaterialIcons name="shopping-bag" size={24} color="#333" />
          </View>
          <Text style={styles.menuLabel}>Items I Purchased</Text>
          {purchasedCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{purchasedCount}</Text>
            </View>
          )}
        </View>

        <View style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <MaterialIcons name="rate-review" size={24} color="#333" />
          </View>
          <Text style={styles.menuLabel}>Awaiting Review</Text>
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  transactionMenu: {
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
