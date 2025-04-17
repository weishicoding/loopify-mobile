// app/index.tsx
import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthProvider"; // Adjust path if needed
import { ActivityIndicator, View } from "react-native"; // Or your custom loading component

export default function StartPage() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    // Optional: Return a proper loading screen component
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (userToken) {
    return <Redirect href="/(tabs)/you" />;
  } else {
    return <Redirect href="/(auth)/loginCodeVerify" />;
  }
}
