import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Bookmark, Play, Timer } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Meal } from "../../../api/model/fetchMealById-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";

type MealCardProps = {
  item: Meal;
};

const CARD_WIDTH = Dimensions.get("window").width * 0.75;
const IMAGE_SECTION_HEIGHT = 220;
const MAIN_IMAGE_HEIGHT = 190;
const MAIN_IMAGE_WIDTH = 260;

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

const PopularCard = ({ item }: MealCardProps) => {
  const [saved, setSaved] = useState(false);
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
      onPress={() => router.push(`/meal/${item.idMeal}`)}
    >
      <View
        style={[
          styles.container,
          {
            width: CARD_WIDTH,
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
            onPress={() => setSaved((prev) => !prev)}
            hitSlop={8}
          >
            <Bookmark
              size={18}
              stroke={saved ? primary : headingColor}
              fill={saved ? primary : "none"}
            />
          </Pressable>
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
            <Timer size={16} color={orangeTint} />
            <AppText style={[styles.timerRow, { color: orangeTint }]}>
              29 mins
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
            <AppText
              style={[styles.cuisine, { color: orangeTint }]}
              numberOfLines={1}
            >
              {item.strArea?.toUpperCase() ?? "FEATURED"}
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

export default PopularCard;

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
    marginRight: 20,
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
