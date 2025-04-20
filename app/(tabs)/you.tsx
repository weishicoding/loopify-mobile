import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import YouHeader from "@/components/you/YouHeader";
import YouStats from "@/components/you/YouStats";
import TipsSection from "@/components/you/TipsSection";
import TransactionMenu from "@/components/you/TransactionMenu";
import Address from "@/components/you/Address";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import { useTheme } from "@/context/ThemeProvider";
import { lightTheme } from "@/theme/theme";

type Theme = typeof lightTheme;

interface YouData {
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
  messageCounts: number;
}

const YouPage: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyle(theme);
  // You can manage your profile data here
  const profileData: YouData = {
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
    messageCounts: 12,
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <ScrollView>
          <YouHeader
            username={profileData.username}
            points={profileData.points}
          />

          <View style={styles.contextContiner}>
            <YouStats
              collections={profileData.stats.collections}
              history={profileData.stats.history}
              following={profileData.stats.following}
              vouchers={profileData.stats.vouchers}
            />

            <TipsSection tipText={profileData.tip} />

            <TransactionMenu purchasedCount={profileData.purchasedCount} />
            <Address />
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const createStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    contextContiner: {
      paddingHorizontal: theme.spacing.xs,
    },
  });

export default YouPage;
