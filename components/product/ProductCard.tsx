import React, { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Theme, useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ProductItem {
  id: string;
  imageUrl: string;
  imageAspectRatio?: number; // Aspect ratio (width / height)
  title: string;
  price: number;
  oldPrice?: number;
  sellerName: string;
  sellerAvatarUrl?: string;
}

interface ProductCardProps {
  item: ProductItem;
}

const screenWidth = Dimensions.get("window").width;
const listPaddingHorizontal = 8;
const cardMargin = 4; // Margin applied to each card
const numColumns = 2;
const columnWidth =
  (screenWidth - listPaddingHorizontal * 2 - cardMargin * 2 * numColumns) /
  numColumns;

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { theme } = useTheme();
  const styles = createCardStyles(theme);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!item.imageAspectRatio) {
      Image.getSize(
        item.imageUrl,
        (width, height) => {
          //   console.log(height);
          const aspectRatio = width / height;
          setImageHeight(columnWidth / aspectRatio);
        },
        (error) => {
          console.error("Failed to get image size:", error);
          setImageHeight(columnWidth * 1); // Fallback on error
        }
      );
    } else {
      setImageHeight(columnWidth / item.imageAspectRatio);
    }
  }, [item.imageUrl, item.imageAspectRatio]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.imageUrl }}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.publishTimeLine}>
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.background]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Ionicons
                name="time-outline"
                size={14}
                color={theme.colors.textPrimary}
              />
              <Text style={styles.publishText}>{`Posted 48 hours`}</Text>
            </LinearGradient>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>€{item.price}</Text>
            {item.oldPrice && (
              <Text style={styles.oldPrice}>€{item.price}</Text>
            )}
          </View>
          <View style={styles.sellerContainer}>
            {item.sellerAvatarUrl && (
              <Image
                source={{ uri: item.sellerAvatarUrl }}
                style={styles.avatar}
              />
            )}
            <Text style={styles.sellerName} numberOfLines={1}>
              {item.sellerName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const createCardStyles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      margin: cardMargin,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    card: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.sm,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      backgroundColor: theme.colors.surfaceVariant,
    },
    infoContainer: {
      padding: theme.spacing.sm,
    },
    title: {
      fontSize: theme.typography.fontSizes.sm,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.xs,
    },
    publishTimeLine: {
      flexDirection: "row",
      marginBottom: theme.spacing.xs,
    },
    publishText: {
      fontSize: theme.typography.fontSizes.xs,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.textPrimary,
      marginLeft: theme.spacing.xxs,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: theme.spacing.xs,
    },
    price: {
      fontSize: theme.typography.fontSizes.md,
      fontFamily: theme.typography.fonts.bold,
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    oldPrice: {
      fontSize: theme.typography.fontSizes.sm,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xxs,
      textDecorationLine: "line-through",
    },
    sellerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: theme.spacing.xs,
      backgroundColor: theme.colors.border,
    },
    sellerName: {
      fontSize: theme.typography.fontSizes.xs,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.textSecondary,
      flex: 1,
    },
    gradient: {
      flexDirection: "row",
      borderRadius: 30,
      padding: 1,
    },
  });

export default ProductCard;
