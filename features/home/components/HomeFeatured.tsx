import { AppText } from "@/components/AppText";
import { ArrowRight } from "lucide-react-native";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useFetchMealsByArea } from "../../../api/hooks/useFetchMealByArea";
import { useFetchMealsByIds } from "../../../api/hooks/useFetchMealsByIds";
import { useThemeColors } from "../../../constants/color-pallette";
import FeaturedCard from "./FeaturedCard";
import { SectionHeading } from "./SectionHeading";

const HomeFeatured = () => {
  const { orangeTint, isDarkMode } = useThemeColors();

  const swipeTint = isDarkMode ? "#dc956dff" : "#8d6046ff";

  const CARD_WIDTH = Dimensions.get("window").width * 0.75;

  const gap = 20;

  const { data: italianData, isLoading: italianLoading } =
    useFetchMealsByArea("Italian");
  const { data: chineseData, isLoading: chineseLoading } =
    useFetchMealsByArea("China");
  const { data: indianData, isLoading: indianLoading } =
    useFetchMealsByArea("India");

  const featuredMeals = [
    ...(chineseData?.meals ?? []).slice(0, 3),
    ...(italianData?.meals ?? []).slice(0, 3),
    ...(indianData?.meals ?? []).slice(0, 3),
  ];

  const featuredMealIds = featuredMeals.map((meal) => meal.idMeal);

  const { meals, isLoading } = useFetchMealsByIds(featuredMealIds);

  //   console.log(meals, isLoading);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={{ gap: 0 }}>
          <AppText style={{ color: orangeTint, fontSize: 11 }}>
            CHEF'S SPOTLIGHT
          </AppText>
          <SectionHeading>Popular Lunch</SectionHeading>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <AppText
            style={{
              color: swipeTint,
              fontSize: 13,
              includeFontPadding: false,
              textAlignVertical: "center",
            }}
          >
            Swipe
          </AppText>
          <ArrowRight size={15} color={swipeTint} />
        </View>
      </View>

      <View>
        <FlatList
          data={meals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <FeaturedCard item={item} />}
          snapToInterval={CARD_WIDTH + gap}
          decelerationRate="fast"
          snapToAlignment="start"
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
};

export default HomeFeatured;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 15,
  },
});
