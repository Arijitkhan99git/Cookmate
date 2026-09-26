import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Flame, Timer } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CategoryMeal } from "../../../api/model/listMealsByCategory";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import RatingBadge from "../../../src/components/RatingBadge";
import BookmarkButton from "../../search/components/BookmarkButton";

type MealListCardProps = {
  item: CategoryMeal;
};

const deriveStats = (idMeal: string) => {
  let hash = 0;
  for (let i = 0; i < idMeal.length; i++) {
    hash = (hash * 31 + idMeal.charCodeAt(i)) % 10000;
  }
  const rating = (3.5 + (hash % 15) / 10).toFixed(1);
  const durationMin = 15 + (hash % 7) * 5;
  const kcal = 280 + (hash % 30) * 10;
  return { rating, durationMin, kcal };
};

export default function MealListCard({ item }: MealListCardProps) {
  const router = useRouter();
  const {
    card,
    text: textColor,
    secondaryText,
    primary,
    orangeTint,
    isDarkMode,
  } = useThemeColors();

  const shadowStyle = useGenericShadow(3);
  const borderColor = isDarkMode ? "#342822ff" : "#f5e8daff";

  const ratingBadgeBg = isDarkMode
    ? "rgba(23, 17, 14, 0.88)"
    : "rgba(255, 255, 255, 0.93)";

  const { rating, durationMin, kcal } = useMemo(
    () => deriveStats(item.idMeal ?? "0"),
    [item.idMeal],
  );

  const country = item.strCountry || item.strArea || "World";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        shadowStyle,
        {
          backgroundColor: card,
          borderColor,
          shadowColor: isDarkMode ? "#000" : "#c17a4b",
          opacity: pressed ? 0.94 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
      onPress={() => router.push(`/meal/${item.idMeal}`)}
    >
      {/* ── Image ── */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {/* Gradient scrim at bottom of image */}
        <LinearGradient
          colors={[card + "00", card]}
          style={styles.imageScrim}
          pointerEvents="none"
        />

        {/* Rating badge – top left */}
        <View style={styles.ratingPos}>
          <RatingBadge
            ratingValue={rating}
            backgroundColor={ratingBadgeBg}
            textColor={textColor}
            showCount={false}
            starSize={11}
          />
        </View>

        {/* Bookmark – top right */}
        <View style={styles.bookmarkPos}>
          <BookmarkButton mealId={item.idMeal} size={15} />
        </View>
      </View>

      {/* ── Content ── */}
      <View style={styles.content}>
        {/* Country chip */}
        <View
          style={[
            styles.countryChip,
            { backgroundColor: isDarkMode ? "#3D302A" : "#fdeee2" },
          ]}
        >
          <AppText
            style={[
              styles.countryText,
              { color: isDarkMode ? orangeTint : "#92400E" },
            ]}
            numberOfLines={1}
          >
            {country}
          </AppText>
        </View>

        {/* Meal name */}
        <AppText
          style={[styles.mealName, { color: textColor }]}
          numberOfLines={2}
        >
          {item.strMeal}
        </AppText>

        {/* Duration + kcal row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Timer size={11} color={secondaryText} />
            <AppText style={[styles.statText, { color: secondaryText }]}>
              {durationMin}m
            </AppText>
          </View>

          <View style={styles.dot} />

          <View style={styles.statItem}>
            <Flame size={11} color={secondaryText} />
            <AppText style={[styles.statText, { color: secondaryText }]}>
              {kcal} kcal
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    height: 140,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageScrim: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
  },
  ratingPos: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  bookmarkPos: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  content: {
    padding: 10,
    gap: 6,
  },
  countryChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
  },
  countryText: {
    fontSize: 11,
    fontFamily: fonts.semibold,
    letterSpacing: 0.3,
  },
  mealName: {
    fontSize: 14,
    fontFamily: fonts.bold,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  statText: {
    fontSize: 11,
    fontFamily: fonts.medium,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#c4b09e",
  },
});
