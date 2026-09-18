import { AppText } from "@/components/AppText";
import { AlertCircle, ArrowRight, RefreshCw } from "lucide-react-native";
import {
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { useFetchMealsByArea } from "../../../api/hooks/useFetchMealByArea";
import { useFetchMealsByIds } from "../../../api/hooks/useFetchMealsByIds";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { FeaturedSkeletonRow } from "../skeletons/FeaturedSkeleton";
import FeaturedCard from "./FeaturedCard";
import { SectionHeading } from "./SectionHeading";

const HomeFeatured = () => {
  const { orangeTint, isDarkMode, danger, secondaryText, surfaceSecondary } =
    useThemeColors();

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

  // Phase 1: area queries are still fetching → IDs not available yet
  const feturedLoading = italianLoading || chineseLoading || indianLoading;

  const { meals, isLoading, isError, error } =
    useFetchMealsByIds(featuredMealIds);

  // Single flag covering both loading phases:
  // Phase 1 = area queries, Phase 2 = per-meal detail queries
  const showLoading = feturedLoading || isLoading;

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

      {/* ── Loading: shimmer skeletons ── */}
      {showLoading && <FeaturedSkeletonRow count={3} />}

      {/* ── Error state ── */}
      {isError && !showLoading && (
        <View style={[styles.errorBox, { backgroundColor: surfaceSecondary }]}>
          <AlertCircle size={22} color={danger} />
          <View style={{ flex: 1, gap: 3 }}>
            <AppText
              style={{
                fontFamily: fonts.semibold,
                color: danger,
                fontSize: 13,
              }}
            >
              Couldn't load meals
            </AppText>
            <AppText
              style={{ color: secondaryText, fontSize: 12 }}
              numberOfLines={2}
            >
              {(error as Error)?.message ??
                "Something went wrong. Please try again."}
            </AppText>
          </View>
          <Pressable
            onPress={() => {}}
            style={[styles.retryBtn, { backgroundColor: danger }]}
            hitSlop={8}
          >
            <RefreshCw size={13} color="#fff" />
            <AppText
              style={{
                fontFamily: fonts.semibold,
                fontSize: 12,
                color: "#fff",
              }}
            >
              Retry
            </AppText>
          </Pressable>
        </View>
      )}

      {/* ── Data ── */}
      {!showLoading && !isError && (
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
      )}
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
  // ── Error ──────────────────────────────────────────────
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 50,
  },
});
