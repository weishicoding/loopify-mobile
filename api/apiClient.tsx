import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as RSecureStore from "expo-secure-store";
import { router } from "expo-router";

const ACCESS_TOKEN_KEY = "userAuthToken";

const API_BASE_URL = "http://192.168.31.70:8888/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // important: Enable sending cookies
  withCredentials: true,
});

//This solution ensures that when a token expires,
// only one refresh request is made, and all pending API calls are properly queued
// and retried once the new token is available.
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor (remains largely the same - adds Access Token)
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await RSecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (accessToken && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Refresh logic changes)
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const authHeader = originalRequest.headers?.["Authorization"];

      // Only attempt refresh if the 401 was likely due to an expired *access* token
      if (authHeader && (authHeader as string).startsWith("Bearer ")) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = "Bearer " + token;
              }
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await apiClient.post("/auth/refresh");

          const { accessToken: newAccessToken } = response.data as {
            accessToken: string;
          };

          await RSecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);

          if (apiClient.defaults.headers.common) {
            apiClient.defaults.headers.common["Authorization"] =
              "Bearer " + newAccessToken;
          }
          if (originalRequest.headers) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          }

          processQueue(null, newAccessToken);
          isRefreshing = false;
          return apiClient(originalRequest);
        } catch (refreshError: any) {
          console.error(
            "Failed to refresh token (HttpOnly):",
            refreshError?.response?.data || refreshError.message
          );

          await RSecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);

          processQueue(refreshError, null);
          isRefreshing = false;
          router.replace("/(auth)/loginEmail");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
