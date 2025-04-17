import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthProvider";

export default function loginCodeVerify() {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0); // Track focused input
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { signIn } = useAuth();

  const params = useLocalSearchParams<{ email: string }>();
  const email = params.email || "your@default-email.com";

  const { theme } = useTheme();
  const styles = createStyles(theme, focusedIndex, code, error);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
    setFocusedIndex(0);
  }, []);

  // Check if code is complete for auto-submission
  useEffect(() => {
    const enteredCode = code.join("");
    if (enteredCode.length === code.length) {
      handleVerify(enteredCode);
    }
  }, [code]);

  const handleCodeChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError(null); // Clear error on input change

    // Auto-focus next input if a digit was entered
    if (digit.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // If the last digit is entered, verification will trigger via useEffect
  };

  const handleKeyPress = (
    { nativeEvent: { key: keyValue } }: { nativeEvent: { key: string } },
    index: number
  ) => {
    // Handle backspace: Clear current input & focus previous if current is empty
    if (keyValue === "Backspace") {
      const newCode = [...code];
      newCode[index - 1] = "";
      if (newCode[index - 1] === "" && index > 0) {
        // If current is empty, focus previous
        inputRefs.current[index - 1]?.focus();
      }
      setCode(newCode);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    setError(null); // Clear error on focus
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        throw new Error("Failed to resend code.");
      }
      setCode(["", "", "", ""]); // Clear inputs
      inputRefs.current[0]?.focus(); // Focus first input
    } catch (err: any) {
      setError(err.message || "Could not resend code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (enteredCode: string) => {
    if (isLoading) return;

    Keyboard.dismiss();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, code: enteredCode }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Verification failed.");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      if (enteredCode !== "1234") {
        throw new Error("The email code is incorrect.");
      }
      const mockToken = "fake-jwt-token-" + Date.now(); // Mock token

      await signIn(mockToken);
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "An error occurred during verification.");
      setCode(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      setFocusedIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (!isLoading) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {/* Back Button (Top Left) */}
        <TouchableOpacity style={styles.backButtonTop} onPress={handleBack}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            Enter the 4-digit code sent to you at:
          </Text>
          <Text style={styles.emailText}>{email}</Text>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  styles.codeInput,
                  focusedIndex === index && styles.codeInputFocused,
                  error && styles.codeInputError,
                  error && index > 0 && styles.codeInputErrorNonFirst,
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
                keyboardType="number-pad"
                ref={(el) => (inputRefs.current[index] = el as TextInput)}
                maxLength={1}
                editable={!isLoading} // Disable input while loading
              />
            ))}
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <Text style={styles.tipText}>
            Tip: Be sure to check your inbox and spam folders
          </Text>

          <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
            <Text style={styles.resendButtonButtonText}>Resend</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (
  theme: any,
  focusedIndex: number | null,
  code: string[],
  error: string | null
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    backButtonTop: {
      position: "absolute",
      top: Platform.OS === "ios" ? 20 : 10, // Adjust as needed
      left: theme.spacing.md,
      zIndex: 10,
      //   padding: theme.spacing.xs, // Add padding for easier tap
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    header: {
      marginTop: 160,
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    formContainer: {
      marginTop: 20,
    },
    instructionText: {
      fontSize: 14,
    },
    emailText: {
      fontSize: 14,
      marginBottom: 40,
    },
    codeContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 15,
    },
    codeInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 12,
      marginRight: 10,
      textAlign: "center",
      fontSize: 20,
      backgroundColor: "#f5f5f5",
    },
    tipText: {
      fontSize: 12,
      color: "#666",
      marginBottom: 30,
    },
    resendButton: {
      backgroundColor: theme.colors.surfaceVariant,
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 30,
      alignSelf: "flex-start",
      marginBottom: 15,
    },
    resendButtonButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.textPrimary,
    },
    navigationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "auto",
      marginBottom: 40,
    },
    button: {
      flexDirection: "row",
      backgroundColor: theme.colors.surfaceVariant,
      paddingVertical: 15,
      paddingHorizontal: 35,
      borderRadius: 30,
      alignItems: "center",
    },
    nextButtonText: {
      fontSize: 14,
      marginRight: 10,
      color: theme.colors.textPrimary,
      fontWeight: "500",
    },
    backButtonText: {
      marginLeft: 10,
      color: theme.colors.textPrimary,
      fontSize: 14,
      fontWeight: "500",
    },
    codeInputFocused: {
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.secondary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    codeInputError: {
      borderColor: theme.colors.primary,
    },
    codeInputErrorNonFirst: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginBottom: 10,
    },
  });
