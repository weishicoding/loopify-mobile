import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeContext";

export default function TabLayout() {
  const { userToken, isLoading } = useAuth(); // Get auth state and loading status
  const { theme } = useTheme();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !userToken) {
  //     router.replace("/(auth)/login");
  //   }
  // }, [userToken, isLoading, router]);

  // if (isLoading) {
  //   return null;
  // }

  // if (!userToken) {
  //   return <Redirect href="/(auth)/login" />;
  // }
  const purchasedCount = 12;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: "Sell",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <>
              <Ionicons name="chatbubble-outline" size={24} color={color} />
              {purchasedCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{purchasedCount}</Text>
                </View>
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: "You",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -4,
    top: 0,
    backgroundColor: "#ff3b30",
    width: 16,
    height: 16,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "medium",
  },
});
