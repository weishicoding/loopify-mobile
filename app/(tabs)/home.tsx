import React, { useState, useCallback } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import ProductCard from "@/components/product/ProductCard";
import { Theme, useTheme } from "@/context/ThemeProvider";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";

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
const generateMockData = (count = 20): ProductItem[] => {
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

export default function Home() {
  const [products, setProducts] = useState<ProductItem[]>(generateMockData());
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const styles = createStyle(theme);

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
    <SafeAreaWrapper>
      <View style={styles.container}>
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
      </View>
    </SafeAreaWrapper>
  );
}

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    listContentContainer: {
      paddingHorizontal: theme.spacing.xxs,
      paddingVertical: theme.spacing.xs,
    },
  });
