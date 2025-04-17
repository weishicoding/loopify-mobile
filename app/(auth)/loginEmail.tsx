// LoginScreen.tsx
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
import { useTheme } from "@/context/ThemeContext";
import GoogleColorLogo from "@/assets/images/icons8-google.svg";
import { router } from "expo-router";

const LoginEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const requestCode = () => {
    router.push("/loginCodeVerify");
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
              onChangeText={setEmail}
            />
          </View>
        </View>

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

const createStyles = (theme: any) =>
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
      marginBottom: 20,
    },
    emailInput: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 12,
      paddingHorizontal: 15,
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
      backgroundColor: "#f0f0f0",
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
