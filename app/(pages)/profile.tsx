import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProductTab from "@/components/profile/ProductTab";
import PostButton from "@/components/PostButton";
import { Theme, useTheme } from "@/context/ThemeProvider";
import { MasonryFlashList } from "@shopify/flash-list";
import ProductCard from "@/components/product/ProductCard";
import { useLocalSearchParams } from "expo-router";

interface ProductItem {
  id: string; // Or number
  imageUrl: string;
  imageAspectRatio?: number; // IMPORTANT: Store aspect ratio if known, or calculate
  title: string;
  price: number;
  sellerName: string;
  sellerAvatarUrl?: string;
  // ... other properties like location, tags, etc.
}

// Mock data for example
const generateMockData = (count = 1): ProductItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    imageUrl: `https://picsum.photos/300/${
      Math.floor(Math.random() * 200) + 300
    }?random=${i}`,
    title: `Item ${i} with a potentially longer title example`,
    price: Math.floor(Math.random() * 2000) + 10,
    sellerName: `Seller ${i}`,
    sellerAvatarUrl: `https://i.pravatar.cc/50?u=seller${i}`,
  }));
};

const ProfilePage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(generateMockData());
  const [activeTab, setActiveTab] = useState("posts");
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const styles = createStyle(theme);

  const params = useLocalSearchParams();
  const userId = Number(params.userId);

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "activity", label: "Activity" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleEditPress = () => {
    console.log("Edit profile pressed");
  };

  const handlePostPress = () => {
    console.log("Post button pressed");
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setProducts(generateMockData());
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMore = () => {
    console.log("Load more triggered...");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader
          userId={userId}
          username="tbNick_x7k72"
          followers={0}
          lastVisit="1 minute ago"
          onEditPress={handleEditPress}
        />

        <View style={styles.productContainer}>
          <ProductTab
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {activeTab === "posts" && (
            <MasonryFlashList
              data={products}
              numColumns={2} // Essential for 2 columns
              renderItem={({ item }: { item: ProductItem }) => (
                <ProductCard item={item} />
              )}
              keyExtractor={(item) => item.id}
              estimatedItemSize={250}
              contentContainerStyle={styles.listContentContainer}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={theme.colors.primary}
                />
              }
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
            />
          )}

          {activeTab === "activity" && (
            <View style={styles.emptyState}>
              <Text>No activity yet</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <PostButton onPress={handlePostPress} />
    </View>
  );
};

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    emptyState: {
      padding: theme.spacing.md,
      alignItems: "center",
    },
    productContainer: {
      position: "relative",
      top: -16,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    listContentContainer: {
      paddingHorizontal: theme.spacing.xxs,
      paddingVertical: theme.spacing.xs,
    },
  });

export default ProfilePage;
