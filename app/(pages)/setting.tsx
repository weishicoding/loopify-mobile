import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import { useAuth } from "@/context/AuthProvider";

export default function Setting() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <SafeAreaWrapper>
      <View>
        <Text>setting</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}
