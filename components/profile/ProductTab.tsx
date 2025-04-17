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
              {tab.superscript && (
                <Text style={styles.superscript}>{tab.superscript}</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showSearch && (
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFCC00",
  },
  tabLabel: {
    fontSize: 16,
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductTab;
