import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthProvider";
import { ActivityIndicator, View } from "react-native";

export default function StartPage() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (userToken) {
    return <Redirect href="/(tabs)/you" />;
  } else {
    return <Redirect href="/(auth)/loginEmail" />;
  }
}
