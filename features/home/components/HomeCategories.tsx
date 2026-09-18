import { AppText } from "@/components/AppText";
import { AlertCircle, RefreshCw } from "lucide-react-native";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFetchAllCategories } from "../../../api/hooks/useCategories";
import { Category } from "../../../api/model/categories-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { CategorySkeleton } from "../skeletons/HomeCategorySkeleton";
import { SectionHeading } from "./SectionHeading";

// ─────────────────────────────────────────────────────────────────
// Category item (existing)
// ─────────────────────────────────────────────────────────────────
const CategoryItem = ({ item }: { item: Category }) => {
  const { mutedText: catText } = useThemeColors();

  const handlePress = (category: string) => {
    console.log(category);
  };

  return (
    <Pressable onPress={() => handlePress(item.strCategory)}>
      {/* Thumbnail */}
      <View style={styles.categoryItem}>
        <Image
          source={{ uri: item.strCategoryThumb }}
          resizeMode="contain"
          style={styles.categoryImage}
        />
      </View>

      <Text style={[styles.categoryName, { color: catText }]} numberOfLines={1}>
        {item.strCategory}
      </Text>
    </Pressable>
  );
};

// ─────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────
const HomeCategories = () => {
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useFetchAllCategories();
  const { primary, danger, secondaryText, surfaceSecondary, muted } =
    useThemeColors();

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.titleRow}>
        <SectionHeading>Categories</SectionHeading>
        <Pressable onPress={() => {}}>
          <AppText style={{ color: primary, fontSize: 13 }}>See all</AppText>
        </Pressable>
      </View>

      {/* ── Loading: shimmer skeletons ── */}
      {isLoading && (
        <View style={styles.skeletonRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </View>
      )}

      {/* ── Error state ── */}
      {isError && !isLoading && (
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
              Couldn't load categories
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
      {!isLoading && !isError && (
        <FlatList
          data={categoriesData?.categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => <CategoryItem item={item} />}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 10, gap: 16 }}
        />
      )}
    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
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
  // ── Category item ──────────────────────────────────────
  categoryItem: {
    gap: 5,
  },
  categoryImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  categoryName: {
    fontSize: 12,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
});
