import { AppText } from "@/components/AppText";
import ErrorState from "@/components/ErrorState";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react-native";
import { memo, useCallback, useMemo, useState } from "react";
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
import { useFetchMealsByAreasLists } from "../../../api/hooks/useListAllAreas";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import { VALID_MEAL_AREAS } from "../../../features/home/constants/validMealAreas";
import { useRandomValidAreas } from "../../../features/home/hooks/useRandomAreas";
import { AreaCardProps } from "../../../features/home/types/areaCardTypes";

// ─── Cuisine Card ─────────────────────────────────────────────────────────────

const CuisineGridCard = memo(({ area }: { area: AreaCardProps }) => {
  const router = useRouter();
  const { text: textColor, secondaryText, isDarkMode } = useThemeColors();
  const shadowStyle = useGenericShadow(2);

  const gradientColors = isDarkMode
    ? (["#3d2e26ff", "#1e2d38ff"] as const)
    : (["#ffffffff", "#faece5ff"] as const);

  const handlePress = useCallback(() => {
    router.push({
      pathname: `/cuisines/[name]`,
      params: {
        name: area.title,
        thumb: area.image ?? "",
      },
    });
  }, [router, area.title]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.cardPressable,
        shadowStyle,
        {
          shadowColor: isDarkMode ? "#000" : "#c8a18d",
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      onPress={handlePress}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.cardGradient,
          {
            borderColor: isDarkMode ? "#342822ff" : "#f8ece5ff",
          },
        ]}
      >
        {/* Flag / food image */}
        <View
          style={[
            styles.imageRing,
            { borderColor: isDarkMode ? "#4a3528" : "#f0d9cc" },
          ]}
        >
          <Image
            source={{ uri: area.image }}
            style={styles.cardImage}
            contentFit="cover"
          />
        </View>

        {/* Text */}
        <AppText
          style={[styles.cardTitle, { color: textColor }]}
          numberOfLines={1}
        >
          {area.title}
        </AppText>

        <View style={styles.cardMeta}>
          <MapPin size={11} color={secondaryText} />
          <AppText style={[styles.cardCount, { color: secondaryText }]}>
            {area.totalMealCount} recipes
          </AppText>
        </View>
      </LinearGradient>
    </Pressable>
  );
});

// ─── Top Nav ──────────────────────────────────────────────────────────────────

const TopNavBar = memo(({ onBack }: { onBack: () => void }) => {
  const { text: textColor, isDarkMode } = useThemeColors();
  return (
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
        onPress={onBack}
        hitSlop={8}
      >
        <ArrowLeft size={18} color={textColor} />
      </Pressable>

      <AppText style={[styles.navTitle, { color: textColor }]}>
        Explore Cuisines
      </AppText>
    </View>
  );
});

// ─── Header (title + search) ──────────────────────────────────────────────────

type CuisinesHeaderProps = {
  cuisinesCount: number;
  searchQuery: string;
  onSearchChange: (t: string) => void;
  onClearSearch: () => void;
};

const CuisinesHeader = memo(
  ({
    cuisinesCount,
    searchQuery,
    onSearchChange,
    onClearSearch,
  }: CuisinesHeaderProps) => {
    const {
      text: textColor,
      secondaryText,
      primary,
      isDarkMode,
      surfaceHigh,
    } = useThemeColors();

    const borderColor = isDarkMode ? "#342822ff" : "#fbece0ff";
    const searchBg = isDarkMode ? "#29201c" : "#ffffff";
    const iconMuted = isDarkMode ? "rgba(255,255,255,0.12)" : "#ebe9e9ff";

    return (
      <View style={styles.headerContainer}>
        {/* Label row */}
        <View style={styles.directoryTagRow}>
          <AppText style={[styles.directoryLabel, { color: primary }]}>
            WORLD CUISINES
          </AppText>
          <View
            style={[
              styles.totalBadge,
              { backgroundColor: isDarkMode ? surfaceHigh : "#f7e8da" },
            ]}
          >
            <Globe size={12} color={primary} />
            <AppText style={[styles.totalBadgeText, { color: textColor }]}>
              {cuisinesCount} Cuisines
            </AppText>
          </View>
        </View>

        <AppText style={[styles.subtitle, { color: secondaryText }]}>
          Discover authentic recipes from around the world
        </AppText>

        {/* Search bar */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: searchBg,
              borderColor,
              shadowColor: isDarkMode ? "#000" : "#C08060",
            },
          ]}
        >
          <Search size={18} color={primary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search cuisine or country..."
            placeholderTextColor={secondaryText}
            value={searchQuery}
            onChangeText={onSearchChange}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.clearBtn,
                {
                  backgroundColor: iconMuted,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={onClearSearch}
              hitSlop={8}
            >
              <X size={18} color={isDarkMode ? "#fff" : "#595757ff"} />
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

// ─── Empty state ──────────────────────────────────────────────────────────────

const EmptyState = memo(
  ({ searchQuery, onClear }: { searchQuery: string; onClear: () => void }) => {
    const { text: textColor, secondaryText, primary } = useThemeColors();
    return (
      <View style={styles.emptyState}>
        <UtensilsCrossed size={40} color={secondaryText} />
        <AppText style={[styles.emptyTitle, { color: textColor }]}>
          No cuisines found
        </AppText>
        <AppText style={[styles.emptySubtitle, { color: secondaryText }]}>
          No results for "{searchQuery}"
        </AppText>
        <Pressable
          onPress={onClear}
          style={[styles.clearFilterBtn, { borderColor: primary }]}
        >
          <AppText style={[styles.clearFilterText, { color: primary }]}>
            Clear search
          </AppText>
        </Pressable>
      </View>
    );
  },
);

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function AllCuisinesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const screenSafeArea = useScreenSafeArea();

  const { background, primary } = useThemeColors();

  const randomAreas = useRandomValidAreas(VALID_MEAL_AREAS, 25);

  const {
    areaData,
    isLoading: isMealsLoading,
    isError: isMealsError,
    refetch,
    isRefetching,
  } = useFetchMealsByAreasLists(randomAreas);

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return areaData;
    const q = searchQuery.toLowerCase();
    return areaData.filter((a) => a.title.toLowerCase().includes(q));
  }, [areaData, searchQuery]);

  const handleBack = useCallback(() => router.back(), [router]);
  const handleClearSearch = useCallback(() => setSearchQuery(""), []);

  const renderItem = useCallback(
    ({ item }: { item: AreaCardProps }) => <CuisineGridCard area={item} />,
    [],
  );

  const keyExtractor = useCallback((item: AreaCardProps) => item.id, []);

  const listHeader = useMemo(
    () => (
      <CuisinesHeader
        cuisinesCount={isMealsLoading ? 0 : areaData.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
      />
    ),
    [areaData.length, isMealsLoading, searchQuery, handleClearSearch],
  );


  return (
    <View style={screenSafeArea}>
      <TopNavBar onBack={handleBack} />

      {isMealsLoading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
        >
          {listHeader}
          <ActivityIndicator
            size="large"
            color={primary}
            style={styles.loader}
          />
        </ScrollView>
      ) : isMealsError ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
        >
          {listHeader}
          <ErrorState
            fullScreen={false}
            title="Couldn't load cuisines"
            message="Something went wrong while fetching cuisines. Please try again."
            onRetry={refetch}
            isRetrying={isRefetching}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredAreas}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={
            filteredAreas.length > 0 ? styles.columnWrapper : undefined
          }
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={
            <EmptyState searchQuery={searchQuery} onClear={handleClearSearch} />
          }
          contentContainerStyle={styles.listPadding}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  loader: { marginTop: 48 },

  // ── Nav ──
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

  // ── Header ──
  headerContainer: {
    paddingTop: 4,
    paddingBottom: 18,
    gap: 10,
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
    marginTop: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    paddingVertical: 10,
  },
  clearBtn: {
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Grid ──
  columnWrapper: {
    gap: 14,
    marginBottom: 14,
  },

  // ── Card ──
  cardPressable: {
    flex: 1,
    borderRadius: 20,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 8,
  },
  imageRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cardImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  cardCount: {
    fontSize: 11.5,
    fontFamily: fonts.medium,
  },

  // ── Empty ──
  emptyState: {
    alignItems: "center",
    paddingTop: 48,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: fonts.bold,
  },
  emptySubtitle: {
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  clearFilterBtn: {
    marginTop: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1.5,
  },
  clearFilterText: {
    fontSize: 13,
    fontFamily: fonts.semibold,
  },
});
