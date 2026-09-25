import { AppText } from "@/components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import {
    ChevronDown,
    Lightbulb,
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { useSearchMealByFLetter } from "../../../api/hooks/useSearchMealByFletter";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import SearchFilterModal from "./SearchFilterModal";
import SearchMealCard from "./SearchMealCard";

const SearchInputWithFilter = ({
  query,
  onChangeQuery,
  setModalVisible,
  activeFilterCount,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
  setModalVisible: (visible: boolean) => void;
  activeFilterCount: number;
}) => {
  const { foreground, primary, mutedText, isDarkMode, orangeGlow } =
    useThemeColors();

  const iconMuted = isDarkMode ? "rgba(255, 255, 255, 0.12)" : "#ebe9e9ff";
  const filterIconWrapper = isDarkMode ? "#b57a42ff" : "#fdd1a4ff";
  const filterIconColor = isDarkMode ? "#FFF8F2" : "#000";

  const handleClear = () => {
    onChangeQuery("");
  };

  return (
    <View style={styles.searchRow}>
      {/* Search + Clear Input Box */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: foreground,
            shadowColor: isDarkMode ? "#000000" : "#C08060",
          },
        ]}
      >
        {/* Left Search Icon */}
        <Search
          color={primary}
          size={22}
          strokeWidth={2}
          style={styles.leftIcon}
        />

        {/* Text Input */}
        <TextInput
          style={[styles.input, { color: isDarkMode ? "#FFF8F2" : "#3D2B1F" }]}
          placeholder="Let's cook something..."
          placeholderTextColor={mutedText}
          value={query}
          onChangeText={onChangeQuery}
          returnKeyType="search"
        />

        {/* Clear Button */}
        {query.length > 0 && (
          <Pressable
            style={({ pressed }) => [
              styles.clearBtn,
              {
                backgroundColor: iconMuted,
                opacity: pressed ? 0.7 : 1,
                shadowColor: isDarkMode ? "#000000" : "#cdb0a2ff",
              },
            ]}
            onPress={handleClear}
            hitSlop={8}
          >
            <X size={20} color={isDarkMode ? "#fff" : "#595757ff"} />
          </Pressable>
        )}
      </View>

      {/* Filter Button */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [
          styles.filterBtn,
          {
            backgroundColor:
              activeFilterCount > 0 ? orangeGlow : filterIconWrapper,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <SlidersHorizontal
          size={20}
          strokeWidth={2}
          color={activeFilterCount > 0 ? "#FFFFFF" : filterIconColor}
        />
        {activeFilterCount > 0 && (
          <AppText style={styles.filterBadgeText}>{activeFilterCount}</AppText>
        )}
      </Pressable>
    </View>
  );
};

// ── Chef's Flavor Hack Footer Card Component ──
const ChefHackCard = () => {
  const {
    text: textColor,
    secondaryText,
    primary,
    isDarkMode,
  } = useThemeColors();

  const shadowStyle = useGenericShadow();

  const hackBg = "#2e211b";
  const iconBg = isDarkMode ? "#452d21" : "#f7d5be";

  const gradientColors = isDarkMode
    ? ([hackBg, "#3a1f0eff"] as const)
    : (["#fff8f4ff", "#ffe0c8ff"] as const);

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.hackCard,
        shadowStyle,
        { shadowColor: isDarkMode ? "#000000" : "#c17a4bff" },
      ]}
    >
      <View style={[styles.hackIconWrapper, { backgroundColor: iconBg }]}>
        <Lightbulb size={22} color={primary} />
      </View>
      <View style={styles.hackTextContent}>
        <AppText style={[styles.hackTitle, { color: textColor }]}>
          Chef's Flavor Hack
        </AppText>
        <AppText style={[styles.hackBody, { color: secondaryText }]}>
          Pat chicken dry with paper towels before searing to unlock unmatched
          crispiness!
        </AppText>
      </View>
    </LinearGradient>
  );
};

export const SearchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch data using searchMealByFLetter("c")
  const { data: DataByFLetter, isLoading } = useSearchMealByFLetter("c");
  const {
    text: textColor,
    secondaryText,
    primary,
    isDarkMode,
    surfaceHigh,
  } = useThemeColors();

  const sortBg = isDarkMode ? surfaceHigh : "#f4e7dc";

  // Filter list based on search query
  const meals = useMemo(() => {
    const list = DataByFLetter?.meals || [];
    if (!searchQuery.trim()) return list;
    return list.filter((m) =>
      m.strMeal.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [DataByFLetter?.meals, searchQuery]);

  return (
    <View style={{ flex: 1 }}>
      <SearchInputWithFilter
        query={searchQuery}
        onChangeQuery={setSearchQuery}
        setModalVisible={setIsModalVisible}
        activeFilterCount={0}
      />

      {/* ── Match Count Header & Dummy Sort Dropdown ── */}
      <View style={styles.resultsHeaderRow}>
        <View style={styles.countContainer}>
          <AppText style={[styles.countText, { color: textColor }]}>
            {meals.length} recipes found
          </AppText>
          <View style={[styles.bulletDot, { backgroundColor: primary }]} />
        </View>

        {/* Dummy Sort Dropdown */}
        <Pressable
          style={({ pressed }) => [
            styles.sortDropdown,
            {
              backgroundColor: sortBg,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <AppText style={[styles.sortTextLabel, { color: textColor }]}>
            Sort:{" "}
            <AppText style={[styles.sortTextValue, { color: textColor }]}>
              Most Popular
            </AppText>
          </AppText>
          <ChevronDown size={14} color={secondaryText} />
        </Pressable>
      </View>

      {/* ── 2-Column Grid List ── */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.gridItemWrapper}>
              <SearchMealCard mealDetails={item} />
            </View>
          )}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={<ChefHackCard />}
        />
      )}

      {isModalVisible && (
        <SearchFilterModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 6 : 0,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
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
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  filterBadgeText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: fonts.bold,
  },
  resultsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countText: {
    fontSize: 17,
    fontFamily: fonts.semibold,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sortDropdown: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sortTextLabel: {
    fontSize: 13,
    fontFamily: fonts.regular,
  },
  sortTextValue: {
    fontSize: 12,
    fontFamily: fonts.semibold,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingBottom: 90,
    gap: 12,
  },
  columnWrapper: {
    gap: 12,
  },
  gridItemWrapper: {
    flex: 1,
  },
  hackCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginTop: 22,
    marginHorizontal: 4,
    gap: 14,
  },
  hackIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  hackTextContent: {
    flex: 1,
    gap: 3,
  },
  hackTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  hackBody: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
  },
});
