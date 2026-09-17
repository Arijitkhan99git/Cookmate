import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import HomeCategories from "../../../features/home/components/HomeCategories";
import HomeFeatured from "../../../features/home/components/HomeFeatured";
import HomeHeader from "../../../features/home/components/HomeHeader";
import HomeSearch from "../../../features/home/components/HomeSearch";

export default function Index() {
  const { background, text } = useThemeColors();
  const colors = useThemeColors();

  const isDark = colors.isDarkMode;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            rowGap: 30,
          }}
        >
          <HomeHeader />
          <HomeSearch />
          <HomeCategories />
          <HomeFeatured />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
