import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import { AreaCardProps } from "../types/areaCardTypes";

const AreaCuisinesHomeCard = ({ area }: { area: AreaCardProps }) => {
  const router = useRouter();
  const shadowStyle = useGenericShadow(2);

  const { mutedText, text: textColor, isDarkMode } = useThemeColors();

  const cardColor = isDarkMode ? "#29201C" : "#faece5ff";

  const secondGradientColors = isDarkMode
    ? (["#533e33ff", "#1e303aff"] as const)
    : (["#fff", "#faece5ff"] as const);

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
        colors={secondGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.container,
          {
            backgroundColor: cardColor,
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
    </Pressable>
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
  },
  cardPressable: {
    flex: 1,
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 4,
  },
});
