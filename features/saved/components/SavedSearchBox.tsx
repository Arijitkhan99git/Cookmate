import { AppText } from "@/components/AppText";
import { Search, SlidersHorizontal, X } from "lucide-react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";

export const SavedSearchBox = ({
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

  const shadowStyle = useGenericShadow(6);

  return (
    <View style={styles.searchRow}>
      {/* Search + Clear Input Box */}
      <View
        style={[
          styles.container,
          shadowStyle,
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
              shadowStyle,
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

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // marginTop: 4,
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
});
