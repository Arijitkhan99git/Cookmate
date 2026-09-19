import { AppText } from "@/components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import { Refrigerator, Sparkles } from "lucide-react-native";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { SectionHeading } from "./SectionHeading";

const HomeInspirations = () => {
  const {
    card,
    isDarkMode,
    rating,
    text: textColor,
    secondaryText,
  } = useThemeColors();

  const FirstGradientColors = isDarkMode
    ? ([card, "#554013ff"] as const)
    : (["#fffcf4ff", "#ffecc8ff"] as const);

  const secondGradientColors = isDarkMode
    ? ([card, "#4c3223ff"] as const)
    : (["#fff8f4ff", "#ffe0c8ff"] as const);

  return (
    <View style={styles.container}>
      <SectionHeading>Culinary Inspirations</SectionHeading>

      <View style={styles.wrapper}>
        <LinearGradient
          colors={FirstGradientColors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            { shadowColor: isDarkMode ? "#000000" : "#bda752ff" },
          ]}
        >
          {/* Icon */}
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: isDarkMode ? "#4f422aff" : "#f9ebebff" },
            ]}
          >
            <Sparkles size={18} stroke={rating} fill={rating} />
          </View>

          <View style={styles.textWrapper}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 18,
                color: textColor,
              }}
            >
              Surprise Me!
            </Text>
            <AppText style={{ color: secondaryText }}>
              Find a random dinner delight
            </AppText>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={secondGradientColors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.card,
            { shadowColor: isDarkMode ? "#000000" : "#be8057ff" },
          ]}
        >
          {/* Icon */}
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: isDarkMode ? "#6d3e1aff" : "#f9d5c7ff" },
            ]}
          >
            <Refrigerator
              size={22}
              stroke={isDarkMode ? "#6d3e1aff" : "#f9d5c7ff"}
              fill={rating}
            />
          </View>

          <View style={styles.textWrapper}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 18,
                color: textColor,
              }}
            >
              Pantry Cook
            </Text>
            <AppText style={{ color: secondaryText }}>
              Cook with what you already have
            </AppText>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomeInspirations;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },

  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  // ── Card ──────────────────────────────────────────────────────────────
  card: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: Platform.OS === "android" ? 4 : 0,
  },

  iconWrapper: {
    borderRadius: 50,
    padding: 8,
    alignSelf: "flex-start",
  },
  textWrapper: {
    flexDirection: "column",
    gap: 4,
    marginTop: 8,
  },
});
