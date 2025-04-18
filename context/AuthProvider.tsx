import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import apiClient from "@/api/apiClient";

const ACCESS_TOKEN_KEY = "userAuthToken";

interface AuthContextType {
  signIn: (accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  userToken: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      let storedAccessToken: string | null = null;
      try {
        storedAccessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
        setUserToken(storedAccessToken);
      } catch (e) {
        console.error("Failed to load auth token", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const signIn = async (accessToken: string) => {
    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      setUserToken(accessToken);
    } catch (e) {
      console.error("Failed to save auth token", e);
    }
  };

  const signOut = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (e: any) {
      console.error(
        "Backend logout call failed",
        e?.response?.data || e.message
      );
    } finally {
      try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        setUserToken(null);
      } catch (e) {
        console.error("Failed to delete access token during logout", e);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
