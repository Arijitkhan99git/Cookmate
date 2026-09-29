import { AppText } from "@/components/AppText";
import RatingBadge from "@/components/RatingBadge";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { Bookmark, Play, Timer } from "lucide-react-native";
import { useMemo } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Meal } from "../../../api/model/fetchMealById-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import { isSavedAtom, toggleSavedAtom } from "../../../store/saved-store";

type MealCardProps = {
  item: Meal;
};

const IMAGE_SECTION_HEIGHT = 220;
const MAIN_IMAGE_HEIGHT = 200;
const MAIN_IMAGE_WIDTH = 270;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ── Decorative only — card Pressable handles navigation ──
const DetailsButton = () => {
  const { card, text: headingColor, primary, isDarkMode } = useThemeColors();

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[styles.detailsBtn, { backgroundColor: primary }, animatedStyle]}
      pointerEvents="none"
    >
      <AppText style={{ color: "#fff", fontFamily: fonts.medium }}>
        Let's cook
      </AppText>
      <View
        style={{
          backgroundColor: isDarkMode ? headingColor : card,
          padding: 5,
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <Play size={15} color={primary} />
      </View>
    </AnimatedPressable>
  );
};

const SavedMealCard = ({ item }: MealCardProps) => {
  const mealId = item.idMeal;

  const [, toggleSaved] = useAtom(toggleSavedAtom);

  const isSaved = useAtomValue(isSavedAtom(mealId));

  const router = useRouter();

  const {
    card,
    orangeTint,
    secondaryText,
    text: headingColor,
    primary,
    isDarkMode,
    surfaceHigh,
  } = useThemeColors();

  const cardScale = useSharedValue(1);
  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

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
    return { rating: val, cookingTime: `${time} mins` };
  }, [item?.idMeal]);

  if (!item) return null;

  const ratingBadgeBg = isDarkMode
    ? "rgba(35, 28, 25, 0.85)"
    : "rgba(255, 255, 255, 0.95)";

  return (
    <AnimatedPressable
      style={[
        styles.shadowWrapper,
        { shadowColor: isDarkMode ? "#000000" : "#b48e7bff" },
        cardAnimStyle,
      ]}
      onPressIn={() => {
        cardScale.value = withTiming(0.97, { duration: 120 });
      }}
      onPressOut={() => {
        cardScale.value = withTiming(1, { duration: 180 });
      }}
      onPress={() => router.push(`/meal/${mealId}`)}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: card,
          },
        ]}
      >
        {/* ── Image Section ── */}
        <View style={[styles.imageSection, { height: IMAGE_SECTION_HEIGHT }]}>
          {/* Blurred background image – fills the entire upper section */}
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: item.strMealThumb }}
            blurRadius={8}
            contentFit="cover"
          />

          {/* Dark tint so the blur looks rich and not washed-out */}
          <View style={styles.darkOverlay} />

          {/* Sharp meal image centered on top */}
          <Image
            style={styles.mainImage}
            source={{ uri: item.strMealThumb }}
            contentFit="cover"
          />

          {/* Gradient fade – blends the bottom of the image into the card */}
          <LinearGradient
            colors={["transparent", card]}
            style={styles.fadeGradient}
            pointerEvents="none"
          />

          {/* ── Bookmark Button ── */}
          <Pressable
            style={({ pressed }) => [
              styles.bookmarkBtn,
              {
                backgroundColor: surfaceHigh,
                opacity: pressed ? 0.7 : 1,
                transform: [{ scale: pressed ? 0.92 : 1 }],
              },
            ]}
            onPress={() => toggleSaved(mealId)}
            hitSlop={8}
          >
            <Bookmark
              size={18}
              stroke={isSaved ? primary : headingColor}
              fill={isSaved ? primary : "none"}
            />
          </Pressable>

          {/* Rating Badge Overlay (Top-Left) */}
          <View style={styles.ratingBadgePosition}>
            <RatingBadge
              ratingValue={rating}
              backgroundColor={ratingBadgeBg}
              textColor={headingColor}
              showCount={false}
              starSize={12}
            />
          </View>
        </View>

        {/* ── Description Section ── */}
        <View style={styles.description}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            {/* Category */}
            <AppText
              style={[styles.cuisine, { color: orangeTint }]}
              numberOfLines={1}
            >
              {item.strCategory?.toUpperCase() ?? "FEATURED"}
            </AppText>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 50,
                overflow: "hidden",
                backgroundColor: orangeTint,
              }}
            />
            {/* Area */}
            <AppText
              style={[styles.cuisine, { color: orangeTint }]}
              numberOfLines={1}
            >
              {item.strArea?.toUpperCase() ?? "FEATURED"}
            </AppText>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 50,
                overflow: "hidden",
                backgroundColor: isDarkMode ? "#ed9d7cff" : "#db9d70ff",
                opacity: 0.8,
              }}
            />
            <Timer size={16} color={secondaryText} />
            <AppText style={[styles.timerRow, { color: secondaryText }]}>
              {cookingTime}
            </AppText>
          </View>

          <Text
            style={[styles.title, { color: headingColor }]}
            numberOfLines={2}
          >
            {item.strMeal}
          </Text>

          <Text
            style={[styles.body, { color: secondaryText }]}
            numberOfLines={2}
          >
            {item.strInstructions}
          </Text>

          {/* CTA Button section */}
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 3 }}>
              <AppText
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 18,
                  color: headingColor,
                  opacity: 0.8,
                }}
              >
                380
              </AppText>
              <AppText
                style={{
                  fontSize: 12,
                  color: secondaryText,
                  textAlignVertical: "bottom",
                }}
              >
                kcal
              </AppText>
            </View>

            <DetailsButton />
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default SavedMealCard;

const styles = StyleSheet.create({
  shadowWrapper: {
    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    // Android shadow
    elevation: Platform.OS === "android" ? 4 : 0,
  },
  container: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 5,
  },
  // ── Image section ──────────────────────────────────────
  imageSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.40)",
  },
  mainImage: {
    width: MAIN_IMAGE_WIDTH,
    height: MAIN_IMAGE_HEIGHT,
    borderRadius: 8,
    // subtle shadow so it "lifts" off the blurred background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 12,
  },
  fadeGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    // how tall the fade is
  },
  bookmarkBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 38,
    height: 38,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  ratingBadgePosition: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  // ── Description section ────────────────────────────────
  description: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop: 6,
    gap: 6,
  },
  cuisine: {
    fontSize: 11,
    fontFamily: fonts.medium,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
    includeFontPadding: false,
  },
  body: {
    fontSize: 13,
    fontFamily: fonts.regular,
    lineHeight: 19,
  },
  timerRow: {
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  detailsBtn: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 50,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#c17a4bff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 6 : 0,
  },
});
