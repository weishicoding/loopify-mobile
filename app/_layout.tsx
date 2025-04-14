import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";

export default function RootLayout() {
  useFonts({
    outfit: require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaWrapper>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaWrapper>
    </SafeAreaProvider>
  );
}
