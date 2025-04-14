import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

// Import components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import TipsSection from "@/components/profile/TipsSection";
import TransactionMenu from "@/components/profile/TransactionMenu";

interface ProfileData {
  username: string;
  points: number;
  stats: {
    collections: number;
    history: number;
    following: number;
    vouchers: number;
  };
  purchasedCount: number;
  tip: string;
}

const ProfilePage: React.FC = () => {
  // You can manage your profile data here
  const profileData: ProfileData = {
    username: "tbNick_x7k72",
    points: 575,
    stats: {
      collections: 23,
      history: 85,
      following: 1,
      vouchers: 0,
    },
    purchasedCount: 4,
    tip: "When buying on Taobao, quickly check the value to see how much it costs",
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader
          username={profileData.username}
          points={profileData.points}
        />

        <View style={styles.contextContiner}>
          <ProfileStats
            collections={profileData.stats.collections}
            history={profileData.stats.history}
            following={profileData.stats.following}
            vouchers={profileData.stats.vouchers}
          />

          <TipsSection tipText={profileData.tip} />

          <TransactionMenu purchasedCount={profileData.purchasedCount} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contextContiner: {
    paddingHorizontal: 10,
  },
});

export default ProfilePage;
