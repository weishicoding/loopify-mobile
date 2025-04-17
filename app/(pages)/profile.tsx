import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";

// Import components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileBio from "@/components/profile/ProfileBio";
import ProductTab from "@/components/profile/ProductTab";
import ProductItem from "@/components/profile/ProductItem";
import PostButton from "@/components/PostButton";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    { id: "products", label: "Products", superscript: 1 },
    { id: "reviews", label: "Reviews", superscript: 2 },
    { id: "activity", label: "Activity", superscript: 3 },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleEditPress = () => {
    console.log("Edit profile pressed");
  };

  const handleMorePress = () => {
    console.log("More info pressed");
  };

  const handleProductPress = () => {
    console.log("Product pressed");
  };

  const handlePostPress = () => {
    console.log("Post button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader
          username="tbNick_x7k72"
          followers={0}
          lastVisit="1 minute ago"
          onEditPress={handleEditPress}
        />

        <ProfileBio
          bioText="This user is very mysterious and hasn't written a personal introduction."
          onMorePress={handleMorePress}
        />

        <ProductTab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {activeTab === "products" && (
          <View>
            <ProductItem
              imageUrl="https://via.placeholder.com/400x300"
              views={111}
              price={1}
              onPress={handleProductPress}
            />
            <Text style={styles.endText}>You've reached the bottom~</Text>
          </View>
        )}

        {activeTab === "reviews" && (
          <View style={styles.emptyState}>
            <Text>No reviews yet</Text>
          </View>
        )}

        {activeTab === "activity" && (
          <View style={styles.emptyState}>
            <Text>No activity yet</Text>
          </View>
        )}
      </ScrollView>

      <PostButton onPress={handlePostPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
  },
  endText: {
    textAlign: "center",
    color: "#999",
    padding: 20,
  },
});

export default ProfilePage;
