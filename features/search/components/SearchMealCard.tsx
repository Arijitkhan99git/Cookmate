import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Clock } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Meal } from "../../../api/model/fetchMealById-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import NormalBadge from "../../../src/components/NormalBadge";
import RatingBadge from "../../../src/components/RatingBadge";
import BookmarkButton from "./BookmarkButton";

type SearchMealCardProps = {
  mealDetails?: Meal;
  mealDeatils?: Meal;
};

export default function SearchMealCard({
  mealDetails,
  mealDeatils,
}: SearchMealCardProps) {
  const item = mealDetails || mealDeatils;
  const router = useRouter();
  const { card, text: textColor, secondaryText, isDarkMode } = useThemeColors();

  const borderColor = isDarkMode ? "#342822ff" : "#fbece0ff";

  const shadowStyle = useGenericShadow(1);

  // Deterministically generate static rating (3.5 - 4.9) and cooking time (20 - 45 min) based on idMeal
  const { rating, cookingTime } = useMemo(() => {
    if (!item?.idMeal) {
      return { rating: "4.8", cookingTime: "25 min" };
    }
    let hash = 0;
    for (let i = 0; i < item.idMeal.length; i++) {
      hash = (hash * 31 + item.idMeal.charCodeAt(i)) % 1000;
    }
    const val = (3.5 + (hash % 15) / 10).toFixed(1);
    const time = 20 + (hash % 6) * 5;
    return { rating: val, cookingTime: `${time} min` };
  }, [item?.idMeal]);

  if (!item) return null;

  const ratingBadgeBg = isDarkMode
    ? "rgba(35, 28, 25, 0.85)"
    : "rgba(255, 255, 255, 0.95)";

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
      onPress={() => router.push(`/meal/${item.idMeal}`)}
    >
      {/* ── Image Section with Overlay Badges ── */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {/* Rating Badge Overlay (Top-Left) */}
        <View style={styles.ratingBadgePosition}>
          <RatingBadge
            ratingValue={rating}
            backgroundColor={ratingBadgeBg}
            textColor={textColor}
            showCount={false}
            starSize={12}
          />
        </View>

        {/* Bookmark Button Overlay (Top-Right) */}
        <View style={styles.bookmarkPosition}>
          <BookmarkButton mealId={item.idMeal} size={15} />
        </View>
      </View>

      {/* ── Content Section ── */}
      <View style={styles.contentContainer}>
        <AppText style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {item.strMeal}
        </AppText>

        {/* Meta Row: Cuisine Area Badge & Cooking Time */}
        <View style={styles.metaRow}>
          <NormalBadge badgeTitle={item.strArea || "Western"} />

          <View style={styles.timeRow}>
            <Clock size={13} color={secondaryText} />
            <AppText style={[styles.timeText, { color: secondaryText }]}>
              {cookingTime}
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    padding: 10,
    // margin: 6,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 145,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadgePosition: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  bookmarkPosition: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 2,
    gap: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});
