import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import apiClient from "@/api/apiClient";
import { useAuth } from "./AuthProvider";
import { UserInfo } from "@/types";

interface UserContextType {
  currentUser: UserInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
  clearUserProfile: () => void; // Function to clear data on logout
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userToken, isLoading: isAuthLoading } = useAuth();

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<UserInfo>("/users/me");
      setCurrentUser(response.data);
    } catch (err: any) {
      setError("Could not load user profile.");
      setCurrentUser(null);
      setIsLoading(false);
    }
  }, []);

  const clearUserProfile = useCallback(() => {
    setCurrentUser(null);
    setError(null);
    setIsLoading(false);
  }, []);

  // Effect to fetch profile when user logs in (token appears)
  // or clear profile when user logs out (token disappears)
  useEffect(() => {
    // Only run this effect once auth loading is finished
    if (!isAuthLoading) {
      if (userToken) {
        if (!currentUser) {
          fetchUserProfile();
        }
      } else {
        clearUserProfile();
      }
    }
  }, [
    userToken,
    isAuthLoading,
    fetchUserProfile,
    clearUserProfile,
    currentUser,
  ]);

  const contextValue = {
    currentUser,
    isLoading,
    error,
    fetchUserProfile,
    clearUserProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
