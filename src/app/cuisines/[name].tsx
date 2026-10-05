import { AppText } from "@/components/AppText";
import ErrorState from "@/components/ErrorState";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Globe } from "lucide-react-native";
import { memo, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useFetchMealsByArea } from "../../../api/hooks/useFetchMealByArea";
import { Meal } from "../../../api/model/filterByArea-model";
import { CategoryMeal } from "../../../api/model/listMealsByCategory";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import MealListCard from "../../../features/mealList/components/MealListCard";

// ─── Adapter ──────────────────────────────────────────────────────────────────
// FilterByArea Meal → CategoryMeal shape so MealListCard works with no changes.
const toMealListItem = (m: Meal): CategoryMeal => ({
  idMeal: m.idMeal,
  strMeal: m.strMeal,
  strMealThumb: m.strMealThumb,
  strArea: m.strArea,
  strCountry: m.strCountry,
});

// ─── Header ───────────────────────────────────────────────────────────────────

type HeaderProps = {
  areaName: string;
  mealCount: number;
  thumbUri?: string;
  onBack: () => void;
};

const CuisineMealHeader = memo(
  ({ areaName, mealCount, onBack, thumbUri }: HeaderProps) => {
    const {
      text: textColor,
      secondaryText,
      primary,
      isDarkMode,
    } = useThemeColors();

    const thumbBg = isDarkMode ? "#3D302A" : "#fdeee2";

    return (
      <View style={styles.headerWrapper}>
        {/* Back button */}
        <Pressable
          style={({ pressed }) => [
            styles.backBtn,
            {
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.05)",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={onBack}
          hitSlop={8}
        >
          <ArrowLeft size={18} color={textColor} />
        </Pressable>

        {/* Hero block */}
        <View style={styles.heroBlock}>
          {/* Thumbnail */}
          <View
            style={[
              styles.thumbRing,
              { borderColor: isDarkMode ? "#3D302A" : "#f5dccb" },
            ]}
          >
            <View style={[styles.thumbBg, { backgroundColor: thumbBg }]}>
              {thumbUri ? (
                <Image
                  source={{ uri: thumbUri }}
                  style={styles.cuisinesThumb}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                <View style={[styles.thumbBg, { backgroundColor: thumbBg }]}>
                  <Globe size={30} color={primary} />
                </View>
              )}
            </View>
          </View>

          {/* Text */}
          <View style={styles.titleTextGroup}>
            <AppText style={[styles.cuisineLabel, { color: primary }]}>
              CUISINE
            </AppText>
            <AppText
              style={[styles.cuisineName, { color: textColor }]}
              numberOfLines={1}
            >
              {areaName}
            </AppText>
            <AppText style={[styles.mealCount, { color: secondaryText }]}>
              {mealCount} {mealCount === 1 ? "recipe" : "recipes"}
            </AppText>
          </View>
        </View>

        {/* Divider */}
        <View
          style={[
            styles.divider,
            { backgroundColor: isDarkMode ? "#342822" : "#f0e0d4" },
          ]}
        />
      </View>
    );
  },
);

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function CuisineMealsScreen() {
  const router = useRouter();
  const screenSafeArea = useScreenSafeArea();

  const { name, thumb } = useLocalSearchParams<{
    name: string;
    thumb?: string;
  }>();

  const { background, primary } = useThemeColors();

  const { data, isLoading, isError, refetch, isRefetching } =
    useFetchMealsByArea(name ?? "");

  const meals: CategoryMeal[] = (data?.meals ?? []).map(toMealListItem);

  const handleBack = useCallback(() => router.back(), [router]);

  const renderItem = useCallback(
    ({ item }: { item: CategoryMeal }) => <MealListCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: CategoryMeal) => item.idMeal, []);

  const listHeader = (
    <CuisineMealHeader
      areaName={name ?? ""}
      mealCount={isLoading ? 0 : meals.length}
      thumbUri={thumb}
      onBack={handleBack}
    />
  );

  return (
    <View style={screenSafeArea}>
      {isLoading ? (
        <View style={styles.flex}>
          <View style={styles.loadingHeaderWrapper}>{listHeader}</View>
          <ActivityIndicator
            size="large"
            color={primary}
            style={styles.loader}
          />
        </View>
      ) : isError ? (
        <View style={styles.flex}>
          <View style={styles.loadingHeaderWrapper}>{listHeader}</View>
          <ErrorState
            fullScreen={false}
            title="Couldn't load meals"
            message="Something went wrong while fetching recipes. Please try again."
            onRetry={refetch}
            isRetrying={isRefetching}
          />
        </View>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={listHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={6}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  loadingHeaderWrapper: { paddingHorizontal: 16 },
  loader: { marginTop: 48 },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 48,
  },
  columnWrapper: {
    gap: 14,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  // ── Header ──
  headerWrapper: {
    paddingTop: 8,
    paddingBottom: 0,
    gap: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  heroBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  thumbRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cuisinesThumb: {
    width: "100%",
    height: "100%",
  },
  titleTextGroup: {
    flex: 1,
    gap: 4,
  },
  cuisineLabel: {
    fontSize: 11,
    fontFamily: fonts.bold,
    letterSpacing: 1,
  },
  cuisineName: {
    fontSize: 24,
    fontFamily: fonts.extrabold,
    lineHeight: 28,
  },
  mealCount: {
    fontSize: 13,
    fontFamily: fonts.medium,
  },
  divider: {
    height: 1,
    borderRadius: 1,
    marginTop: 4,
  },
});
