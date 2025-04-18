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
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/context/AuthProvider";
import Toast from "@/components/Toast";
import apiClient from "@/api/apiClient";

export default function loginCodeVerify() {
  const { height } = Dimensions.get("window");
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0); // Track focused input
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendModalVisible, setResendModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { signIn } = useAuth();

  const params = useLocalSearchParams<{ email: string }>();
  const email = params.email || "your@example-email.com";

  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
    setFocusedIndex(0);
  }, []);

  useEffect(() => {
    const enteredCode = code.join("");
    if (enteredCode.length === code.length) {
      handleVerify(enteredCode);
    }
  }, [code]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

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
    setError(null);
  };

  const handleResend = async () => {
    showResendModal();
  };

  const handleVerify = async (enteredCode: string) => {
    if (isLoading) return;

    Keyboard.dismiss();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/verify-code", {
        email: email,
        code: enteredCode,
      });
      const data = response.data;

      await signIn(data.accessToken);
    } catch (err: any) {
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

  const showResendModal = () => {
    setResendModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideResendModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setResendModalVisible(false);
    });
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.post("/auth/request-code", {
        email: email,
      });
      setCode(["", "", "", ""]); // Clear inputs
      inputRefs.current[0]?.focus(); // Focus first input
    } catch (err: any) {
      setError(err.message || "Could not resend code.");
    } finally {
      setIsLoading(false);
    }
    hideResendModal();
    showToast("Email code has been re-sent!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
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
                editable={!isLoading}
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
      {/* Resend Modal */}
      <Modal
        visible={resendModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideResendModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.overlayBackground}
            activeOpacity={1}
            onPress={hideResendModal}
          />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Resend code to:</Text>
              <Text style={styles.modalEmail}>{email}</Text>

              <TouchableOpacity
                style={styles.resendConfirmButton}
                onPress={handleResendCode}
              >
                <Text style={styles.resendConfirmText}>Resend</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={hideResendModal}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onDismiss={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    backButtonTop: {
      position: "absolute",
      top: Platform.OS === "ios" ? 20 : 10,
      left: theme.spacing.md,
      zIndex: 10,
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
    // Modal styles
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
    },
    overlayBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    modalBody: {
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 14,
      marginBottom: 10,
    },
    modalEmail: {
      fontSize: 14,
      marginBottom: 20,
    },
    resendConfirmButton: {
      backgroundColor: theme.colors.primary,
      width: "100%",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 12,
    },
    resendConfirmText: {
      color: theme.colors.textOnPrimary,
      fontSize: 14,
      fontWeight: "500",
    },
    cancelButton: {
      backgroundColor: theme.colors.surfaceVariant,
      width: "100%",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    cancelText: {
      fontSize: 14,
      fontWeight: "500",
    },
  });
