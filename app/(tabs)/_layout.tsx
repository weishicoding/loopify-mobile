import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/context/ThemeProvider";
import AnimatedTabIcon from "@/components/AnimatedTabIcon";

export default function TabLayout() {
  const { userToken, isLoading } = useAuth(); // Get auth state and loading status
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.replace("/(auth)/loginEmail");
    }
  }, [userToken, isLoading, router]);

  if (isLoading) {
    return null;
  }

  if (!userToken) {
    return <Redirect href="/(auth)/loginEmail" />;
  }
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
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              outlineName="home-outline"
              filledName="home-sharp"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: "Sell",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              outlineName="add-circle-outline"
              filledName="add-circle"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused }) => (
            <>
              <AnimatedTabIcon
                focused={focused}
                outlineName="chatbubble-ellipses-outline"
                filledName="chatbubble-ellipses-sharp"
                badge={purchasedCount}
                color={color}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: "You",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              outlineName="person-outline"
              filledName="person"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
