import React from "react";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthProvider";

export default function AuthLayout() {
  const { userToken } = useAuth();

  if (userToken) {
    return <Redirect href="/home" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
