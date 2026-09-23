import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import HomeAreaList from "../../../features/home/components/HomeAreaList";
import HomeCategories from "../../../features/home/components/HomeCategories";
import HomeHeader from "../../../features/home/components/HomeHeader";
import HomeInspirations from "../../../features/home/components/HomeInspirations";
import HomePopularLunch from "../../../features/home/components/HomePopularLunch";
import HomeSearch from "../../../features/home/components/HomeSearch";
import TrendingMeal from "../../../features/home/components/TrendingMeal";

export default function Index() {
  const { background } = useThemeColors();
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
            paddingBottom: 100,
          }}
        >
          <HomeHeader />
          <HomeSearch />
          <HomeCategories />
          <HomePopularLunch />
          <TrendingMeal />
          <HomeInspirations />
          <HomeAreaList />
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
