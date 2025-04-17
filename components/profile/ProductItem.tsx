import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

interface ProductItemProps {
  imageUrl: string;
  views: number;
  price: number;
  onPress: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  imageUrl,
  views,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.views}>{views}</Text>
        <Text style={styles.price}>¥{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 230,
    backgroundColor: "#f0f0f0",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  views: {
    fontSize: 16,
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#FF4D4F",
    fontWeight: "bold",
  },
});

export default ProductItem;
