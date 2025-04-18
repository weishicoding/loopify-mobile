import React, { createContext, useState, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../theme/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const deviceScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceScheme === "dark");

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Use useMemo to prevent recalculating theme on every render unless isDarkMode changes
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark: isDarkMode,
    }),
    [theme, isDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
