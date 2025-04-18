import { useTheme } from "@/context/ThemeProvider";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface ToastProps {
  visible: boolean;
  message: string;
  onDismiss?: () => void;
}

const Toast = ({ visible, message, onDismiss }: ToastProps) => {
  const opacity = useState(new Animated.Value(0))[0];
  const { theme } = useTheme();
  const styles = createStyle(theme);

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss && onDismiss();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const createStyle = (theme: any) =>
  StyleSheet.create({
    toastContainer: {
      position: "absolute",
      top: 100,
      alignSelf: "center",
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 12,
    },
    toastText: {
      color: theme.colors.textPrimary,
      fontSize: 14,
    },
  });

export default Toast;
