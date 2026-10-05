import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { ScrollView, StyleSheet, View } from "react-native";
import HomeAreaList from "../../../features/home/components/HomeAreaList";
import HomeCategories from "../../../features/home/components/HomeCategories";
import HomeHeader from "../../../features/home/components/HomeHeader";
import HomeInspirations from "../../../features/home/components/HomeInspirations";
import HomePopularLunch from "../../../features/home/components/HomePopularLunch";
import HomeSearch from "../../../features/home/components/HomeSearch";
import TrendingMeal from "../../../features/home/components/TrendingMeal";

export default function Index() {
  const screenSafeArea = useScreenSafeArea();

  return (
    <View style={[screenSafeArea, styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
