import { AppText } from "@/components/AppText";
import EmptySearchState from "@/components/EmptySearchState";
import ErrorState from "@/components/ErrorState";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchAllCategories } from "../../../api/hooks/useCategories";
import { useFetchRandomMeal } from "../../../api/hooks/useRandomMeal";
import { Category } from "../../../api/model/categories-model";
import { MEAL_CATEGORIES } from "../../../constants/category-metadata";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import SearchModalSkeleton from "../../../features/search/components/SearchModalSkeleton";
import NormalBadge from "../../components/NormalBadge";

export default function AllCategoriesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    background,
    card,
    text: textColor,
    secondaryText,
    primary,
    isDarkMode,
    surfaceHigh,
  } = useThemeColors();

  const iconMuted = isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#ebe9e9ff";

  const shadowStyle = useGenericShadow(1);

  // Fetch categories from API
  const { data, isLoading, isError, refetch, isRefetching } =
    useFetchAllCategories();

  // Combine API categories with static recipeCount & tag metadata
  const categoriesList = useMemo(() => {
    const apiCategories = data?.categories || [];
    const metaMap = new Map(
      MEAL_CATEGORIES.map((item) => [item.strCategory.toLowerCase(), item]),
    );

    return apiCategories.map((cat) => {
      const meta = metaMap.get(cat.strCategory.toLowerCase());
      return {
        ...cat,
        recipeCount: meta?.recipeCount ?? 50,
        tag: meta?.tag ?? "Featured",
      };
    });
  }, [data?.categories]);

  // Total calculated recipes across all categories
  const totalRecipesCount = useMemo(() => {
    return categoriesList.reduce((acc, curr) => acc + curr.recipeCount, 0);
  }, [categoriesList]);

  // Filter categories by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categoriesList;
    const q = searchQuery.toLowerCase();
    return categoriesList.filter(
      (cat) =>
        cat.strCategory.toLowerCase().includes(q) ||
        cat.tag.toLowerCase().includes(q),
    );
  }, [categoriesList, searchQuery]);

  const borderColor = isDarkMode ? "#342822ff" : "#fbece0ff";
  const searchBg = isDarkMode ? "#29201c" : "#ffffff";
  const arrowBtnBg = isDarkMode ? surfaceHigh : "#f2e6db";

  //fetch a random meal
  const {
    data: randomMealData,
    refetch: randomMealRefetch,
    isFetching: isSurpriseLoading,
  } = useFetchRandomMeal();
  const randomMeal = randomMealData?.meals?.[0];

  // Handle Surprise Me action
  const handleSurpriseMe = async () => {
    try {
      const res = await randomMealRefetch();
      const mealId = res.data?.meals?.[0]?.idMeal || randomMeal?.idMeal;
      if (mealId) {
        router.push(`/meal/${mealId}`);
      }
    } catch (err) {
      console.error("Failed to fetch random meal", err);
    }
  };

  const renderCategoryCard = ({
    item,
  }: {
    item: Category & { recipeCount: number; tag: string };
  }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.cardContainer,
          shadowStyle,
          {
            backgroundColor: card,
            borderColor: borderColor,
            shadowColor: isDarkMode ? "#000000" : "#d89e77ff",
            opacity: pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
        onPress={() => {
          // Navigate to meal details or search list for category
          router.push(`/(tabs)/search`);
        }}
      >
        {/* Top Row: Thumbnail + Arrow Button */}
        <View style={styles.cardHeaderRow}>
          <View>
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={styles.thumbImage}
              contentFit="contain"
              transition={150}
            />
          </View>

          <View style={[styles.arrowBtn, { backgroundColor: arrowBtnBg }]}>
            <ArrowRight size={14} color={textColor} />
          </View>
        </View>

        {/* Category Tag Badge */}
        <View style={styles.tagWrapper}>
          <NormalBadge
            badgeTitle={item.tag}
            fontFamily={fonts.medium}
            lightBgColor="#faefe1ff"
            lightTextColor="#92400E"
          />
        </View>

        {/* Category Title & Recipe Count */}
        <View style={styles.cardContent}>
          <AppText
            style={[styles.categoryTitle, { color: textColor }]}
            numberOfLines={1}
          >
            {item.strCategory}
          </AppText>
          <AppText style={[styles.recipeCountText, { color: secondaryText }]}>
            {item.recipeCount} recipes
          </AppText>
        </View>
      </Pressable>
    );
  };

  const TopNavBarComponent = (
    <View style={styles.topNavBar}>
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
        onPress={() => router.back()}
        hitSlop={8}
      >
        <ArrowLeft size={18} color={textColor} />
      </Pressable>

      <AppText style={[styles.navTitle, { color: textColor }]}>
        All Categories
      </AppText>
    </View>
  );

  const HeaderComponent = (
    <View style={styles.headerContainer}>
      {/* Directory Title Section */}
      <View style={styles.directoryHeader}>
        <View style={styles.directoryTagRow}>
          <AppText style={[styles.directoryLabel, { color: primary }]}>
            CUISINE DIRECTORY
          </AppText>

          <View
            style={[
              styles.totalBadge,
              { backgroundColor: isDarkMode ? surfaceHigh : "#f7e8da" },
            ]}
          >
            <UtensilsCrossed size={12} color={primary} />
            <AppText style={[styles.totalBadgeText, { color: textColor }]}>
              {totalRecipesCount || 796} Total Recipes
            </AppText>
          </View>
        </View>

        <AppText style={[styles.subtitle, { color: secondaryText }]}>
          Explore {categoriesList.length || 14} curated recipe collections
          crafted for culinary joy
        </AppText>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: searchBg,
            borderColor: borderColor,
            shadowColor: isDarkMode ? "#000000" : "#C08060",
          },
        ]}
      >
        <Search size={18} color={primary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search categories or ingredients..."
          placeholderTextColor={secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable
            style={({ pressed }) => [
              styles.clearBtn,
              {
                backgroundColor: iconMuted,
                opacity: pressed ? 0.7 : 1,
                shadowColor: isDarkMode ? "#000000" : "#cdb0a2ff",
              },
            ]}
            onPress={() => setSearchQuery("")}
            hitSlop={8}
          >
            <X size={20} color={isDarkMode ? "#fff" : "#595757ff"} />
          </Pressable>
        )}
      </View>
    </View>
  );

  const FooterBanner = (
    <View
      style={[
        styles.bannerCard,
        {
          backgroundColor: isDarkMode ? "#2e211b" : "#faede2",
          borderColor: isDarkMode ? "#3d2b22" : "#f5dcd0",
        },
      ]}
    >
      <View style={[styles.bannerIconWrapper, { backgroundColor: primary }]}>
        <Sparkles size={20} color="#FFFFFF" />
      </View>

      <View style={styles.bannerTextContent}>
        <AppText style={[styles.bannerTitle, { color: textColor }]}>
          Need a recommendation?
        </AppText>
        <AppText
          style={[styles.bannerSubtitle, { color: secondaryText }]}
          numberOfLines={2}
        >
          Let Cookmate pick a dish for you
        </AppText>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.surpriseBtn,
          {
            backgroundColor: isDarkMode ? surfaceHigh : "#FFFFFF",
            opacity: pressed || isSurpriseLoading ? 0.75 : 1,
          },
        ]}
        onPress={handleSurpriseMe}
        disabled={isSurpriseLoading}
      >
        {isSurpriseLoading ? (
          <ActivityIndicator size="small" color={primary} />
        ) : (
          <AppText style={[styles.surpriseBtnText, { color: textColor }]}>
            Surprise Me
          </AppText>
        )}
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
      {TopNavBarComponent}
      {isLoading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
        >
          {HeaderComponent}
          <SearchModalSkeleton count={6} />
        </ScrollView>
      ) : isError ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
        >
          {HeaderComponent}
          <ErrorState
            fullScreen={false}
            title="Failed to load categories"
            message="Could not fetch category list. Please check your connection and try again."
            onRetry={refetch}
            isRetrying={isRefetching}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.idCategory}
          numColumns={2}
          columnWrapperStyle={
            filteredCategories.length > 0 ? styles.columnWrapper : undefined
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={HeaderComponent}
          ListEmptyComponent={
            <EmptySearchState
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
            />
          }
          ListFooterComponent={
            filteredCategories.length > 0 ? FooterBanner : undefined
          }
          contentContainerStyle={styles.listPadding}
          renderItem={renderCategoryCard}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
  },
  headerContainer: {
    paddingTop: 8,
    paddingBottom: 16,
    gap: 16,
  },
  topNavBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  profileAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  directoryHeader: {
    gap: 6,
  },
  directoryTagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  directoryLabel: {
    fontSize: 12,
    fontFamily: fonts.bold,
    letterSpacing: 0.8,
  },
  totalBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  totalBadgeText: {
    fontSize: 11.5,
    fontFamily: fonts.medium,
  },
  mainHeading: {
    fontSize: 26,
    fontFamily: fonts.bold,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 4 : 0,
    marginTop: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    paddingVertical: 10,
  },
  clearBtn: {
    padding: 6,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 6 : 0,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 8,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbImage: {
    width: 60,
    height: 60,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tagWrapper: {
    alignSelf: "flex-start",
  },
  cardContent: {
    gap: 2,
    marginTop: 2,
  },
  categoryTitle: {
    fontFamily: fonts.bold,
    fontSize: 17,
  },
  recipeCountText: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
  },
  bannerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    marginTop: 20,
    gap: 12,
  },
  bannerIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTextContent: {
    flex: 1,
    gap: 2,
  },
  bannerTitle: {
    fontFamily: fonts.bold,
    fontSize: 13.5,
  },
  bannerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
  },
  surpriseBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  surpriseBtnText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
});
