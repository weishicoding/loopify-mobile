import React, { useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeProvider";

type AnimatedTabIconProps = {
  focused: boolean;
  outlineName: string;
  filledName: string;
  color: string;
  badge?: number;
};

const AnimatedTabIcon: React.FC<AnimatedTabIconProps> = ({
  focused,
  outlineName,
  filledName,
  color,
  badge,
}) => {
  const [iconName, setIconName] = useState<string>(
    focused ? filledName : outlineName
  );

  const { theme } = useTheme();

  return (
    <View>
      <Ionicons
        name={iconName as any}
        size={focused ? 22 : 22}
        color={focused ? theme.colors.primary : color}
      />
      {badge && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -2,
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

export default AnimatedTabIcon;
