import { Platform } from "react-native";

const PRIMARY_COLOR = "#D75F28";
const SECONDARY_COLOR = "#6c757d";
const ACCENT_COLOR = "#F5CBA7";

export const typography = {
  fonts: {
    regular: Platform.select({ ios: "System", android: "sans-serif" }),
    medium: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    bold: Platform.select({ ios: "System", android: "sans-serif-bold" }),
    light: Platform.select({ ios: "System", android: "sans-serif-light" }),
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
  },
  lineHeights: { body: 22, heading: 36 },
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 999 };

export const borders = {
  borderWidths: { sm: 0.5, md: 1, lg: 2 },
};

export const lightColors = {
  primary: PRIMARY_COLOR,
  primaryDarker: "#B84D1C",
  primaryLighter: ACCENT_COLOR,
  secondary: SECONDARY_COLOR,
  accent: ACCENT_COLOR,

  background: "#FFFFFF",
  surface: "#F8F9FA",
  surfaceVariant: "#E9ECEF",

  textPrimary: "#212529",
  textSecondary: "#6c757d",
  textDisabled: "#adb5bd",
  textOnPrimary: "#FFFFFF",
  textOnSecondary: "#FFFFFF",

  border: "#CED4DA",
  borderVariant: "#DEE2E6",

  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",

  // Specific UI elements
  tabBarBackground: "#FFFFFF",
  tabBarActiveTint: PRIMARY_COLOR, // Active tabs use the new primary color
  tabBarInactiveTint: "#8E8E93",
  shadow: "#000000",
};

export const darkColors = {
  primary: PRIMARY_COLOR,
  primaryDarker: "#B84D1C",
  primaryLighter: "#E58A5F",
  secondary: "#ADB5BD",
  accent: "#E58A5F",

  background: "#121212",
  surface: "#1C1C1E",
  surfaceVariant: "#2C2C2E",

  textPrimary: "#EAEAEA",
  textSecondary: "#ADB5BD",
  textDisabled: "#6c757d",
  textOnPrimary: "#FFFFFF",
  textOnSecondary: "#212529",

  border: "#495057",
  borderVariant: "#343A40",

  success: "#20c997",
  error: "#f17c88",
  warning: "#ffd364",
  info: "#66d9e8",

  // Specific UI elements
  tabBarBackground: "#1C1C1E",
  tabBarActiveTint: ACCENT_COLOR, // Use the lighter peach accent for active tabs in dark mode
  tabBarInactiveTint: "#8E8E93",
  shadow: "#000000", // Dark themes often still use black shadows, just less opaque
};

const baseTheme = {
  typography,
  spacing,
  radii,
  borders,
};

export const lightTheme = {
  ...baseTheme,
  colors: lightColors,
  dark: false,
};

export const darkTheme = {
  ...baseTheme,
  colors: darkColors,
  dark: true,
};

export const defaultTheme = lightTheme;
