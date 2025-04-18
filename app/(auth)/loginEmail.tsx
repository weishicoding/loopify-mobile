import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTheme } from "@/context/ThemeProvider";
import GoogleColorLogo from "@/assets/images/icons8-google.svg";
import { router } from "expo-router";
import apiClient from "@/api/apiClient";

const LoginEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const styles = createStyles(theme, error);

  const requestCode = async () => {
    if (isLoading) return;
    const validation = validateEmail(email);

    if (!validation.isValid) {
      setError(validation.message);
      return;
    } else {
      setError(null);
    }

    setIsLoading(true);
    try {
      await apiClient.post("/auth/request-code", {
        email: email,
      });
      setIsLoading(false);
      router.push({
        pathname: "/(auth)/loginCodeVerify",
        params: { email: email },
      });
    } catch (e: any) {
      setIsLoading(false);
      console.log(e.message || "An error occured");
      return;
    }
  };
  const handleEmailChange = (text: string) => {
    setError(null);
    setEmail(text);
  };

  const isValidEmail = (email: string): boolean => {
    // Regular expression for validating email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  const validateEmail = (
    email: string
  ): { isValid: boolean; message: string } => {
    if (!email || email.trim() === "") {
      return { isValid: false, message: "Please enter your email." };
    }

    if (!isValidEmail(email)) {
      return { isValid: false, message: "Please enter a valid email address." };
    }

    return { isValid: true, message: "" };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerTitle}>
          <Text style={styles.header}>Welcome to Loopify</Text>
        </View>

        {/* Phone Input Section */}
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.emailInputContainer}>
          <View style={styles.emailInput}>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              keyboardType="email-address"
              returnKeyType="done"
              value={email}
              onChangeText={(text) => handleEmailChange(text)}
            />
          </View>
        </View>
        {error && <Text style={styles.emailInputError}>{error}</Text>}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => requestCode()}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <GoogleColorLogo width={20} height={20} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any, error: string | null) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    content: {
      padding: 20,
      flex: 1,
    },
    logoContainer: {
      alignItems: "center",
      marginVertical: 30,
    },
    logo: {
      width: 70,
      height: 70,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    logoImage: {
      width: 50,
      height: 30,
    },
    headerTitle: {
      alignItems: "center",
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 30,
    },
    inputLabel: {
      fontSize: 16,
      marginBottom: 8,
    },
    emailInputContainer: {
      flexDirection: "row",
      marginBottom: 5,
    },
    emailInput: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: error ? 5 : 20,
    },
    emailInputError: {
      fontSize: 14,
      color: theme.colors.error,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    contactIcon: {
      marginLeft: 5,
    },
    continueButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      marginBottom: 20,
    },
    continueButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "500",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: "#ddd",
    },
    dividerText: {
      marginHorizontal: 10,
      color: "#888",
    },
    socialButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      paddingVertical: 14,
    },
    socialIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    socialButtonText: {
      fontSize: 14,
      fontWeight: "500",
    },
  });

export default LoginEmail;
