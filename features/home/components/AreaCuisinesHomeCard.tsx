import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, Text } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { AreaCardProps } from "../types/areaCardTypes";

const AreaCuisinesHomeCard = ({ area }: { area: AreaCardProps }) => {
  const { card, mutedText, text: textColor, isDarkMode } = useThemeColors();

  const cardColor = isDarkMode ? "#29201C" : "#faece5ff";

  const secondGradientColors = isDarkMode
    ? (["#533e33ff", "#1e303aff"] as const)
    : (["#fff", "#faece5ff"] as const);

  return (
    <LinearGradient
      colors={secondGradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        {
          backgroundColor: cardColor,
          shadowColor: isDarkMode ? "#000000" : "#c8a18dff",
        },
      ]}
    >
      <Image
        source={{ uri: area.image }}
        style={styles.image}
        contentFit="contain"
      />
      <Text
        style={{
          color: textColor,
          fontSize: 14,
          fontFamily: fonts.semibold,
          opacity: 0.8,
        }}
        numberOfLines={1}
      >
        {area.title}
      </Text>
      <Text style={{ color: mutedText }}>{area.totalMealCount} recipes</Text>
    </LinearGradient>
  );
};

export default AreaCuisinesHomeCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 12,
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    width: 150,
    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    // Android shadow
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 4,
  },
});
