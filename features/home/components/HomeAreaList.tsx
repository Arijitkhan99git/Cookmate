import { AppText } from "@/components/AppText";
import { AlertCircle, RefreshCw } from "lucide-react-native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFetchMealsByAreasLists } from "../../../api/hooks/useListAllAreas";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { VALID_MEAL_AREAS } from "../constants/validMealAreas";
import { useRandomValidAreas } from "../hooks/useRandomAreas";
import { AreaCardSkeleton } from "../skeletons/HomeAreaCardsSkeletons";
import AreaCuisinesHomeCard from "./AreaCuisinesHomeCard";
import { SectionHeading } from "./SectionHeading";

const HomeAreaList = () => {
  const { primary, danger, secondaryText, surfaceSecondary } = useThemeColors();

  const randomAreas = useRandomValidAreas(VALID_MEAL_AREAS, 10);

  const {
    areaData,
    isLoading: isMealsLoading,
    isError: isMealsError,
    error: mealsError,
    refetch,
    isRefetching,
  } = useFetchMealsByAreasLists(randomAreas);

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.titleRow}>
        <SectionHeading>Explore Cuisines</SectionHeading>
        <Pressable onPress={() => {}}>
          <AppText style={{ color: primary, fontSize: 13 }}>Explore</AppText>
        </Pressable>
      </View>

      {/* ── Loading: shimmer skeletons ── */}
      {isMealsLoading && (
        <View style={styles.skeletonRow}>
          {Array.from({ length: 4 }).map((_, i) => (
            <AreaCardSkeleton key={i} />
          ))}
        </View>
      )}

      {/* ── Error state ── */}
      {isMealsError && !isMealsLoading && (
        <View style={[styles.errorBox, { backgroundColor: surfaceSecondary }]}>
          <AlertCircle size={22} color={danger} />
          <View style={{ flex: 1, gap: 2 }}>
            <AppText
              style={{
                fontFamily: fonts.semibold,
                color: danger,
                fontSize: 13,
              }}
            >
              Couldn't load cuisines
            </AppText>
            <AppText
              style={{ color: secondaryText, fontSize: 12 }}
              numberOfLines={2}
            >
              {(mealsError as Error)?.message ??
                "Something went wrong. Please try again."}
            </AppText>
          </View>
          <Pressable
            onPress={() => refetch()}
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
              {isRefetching ? "Retrying…" : "Retry"}
            </AppText>
          </Pressable>
        </View>
      )}

      {/* ── Data ── */}
      {!isMealsLoading && !isMealsError && (
        <FlatList
          data={areaData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <AreaCuisinesHomeCard area={item} />}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 10, gap: 16 }}
        />
      )}
    </View>
  );
};

export default HomeAreaList;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 16,
  },
  // ── Skeleton ──────────────────────────────────────────
  skeletonRow: {
    flexDirection: "row",
    gap: 16,
    paddingBottom: 10,
  },
  // ── Error ─────────────────────────────────────────────
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
