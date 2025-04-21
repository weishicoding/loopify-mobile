import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Tab {
  id: string;
  label: string;
  superscript?: number;
}

interface ProductTabProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  showSearch?: boolean;
}

const ProductTab: React.FC<ProductTabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  showSearch = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showSearch && (
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFCC00",
  },
  tabLabel: {
    fontSize: 14,
    color: "#666",
  },
  activeTabLabel: {
    color: "#000",
    fontWeight: "bold",
  },
  superscript: {
    fontSize: 12,
    lineHeight: 14,
    position: "absolute",
    top: -5,
    right: -10,
  },
  searchButton: {
    width: 50,
    justifyContent: "center",
  },
});

export default ProductTab;
