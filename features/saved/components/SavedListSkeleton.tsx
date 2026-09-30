import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../constants/color-pallette";

const IMAGE_SECTION_HEIGHT = 220;

export const SavedMealCardSkeleton = () => {
  const { card, isDarkMode } = useThemeColors();

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 700 }),
        withTiming(1, { duration: 700 })
      ),
      -1,
      true
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const placeholderBg = isDarkMode
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(0, 0, 0, 0.06)";

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { backgroundColor: card },
        shimmerStyle,
      ]}
    >
      {/* Image Skeleton */}
      <View style={[styles.imageWrapper, { backgroundColor: placeholderBg }]} />

      {/* Description Skeleton */}
      <View style={styles.description}>
        {/* Cuisine / Timer Row */}
        <View style={styles.cuisineRow}>
          <View style={[styles.pill, { width: 60, backgroundColor: placeholderBg }]} />
          <View style={styles.dot} />
          <View style={[styles.pill, { width: 50, backgroundColor: placeholderBg }]} />
          <View style={[styles.pill, { width: 40, backgroundColor: placeholderBg, marginLeft: 'auto' }]} />
        </View>

        {/* Title */}
        <View style={[styles.line, { width: "85%", backgroundColor: placeholderBg }]} />
        <View style={[styles.line, { width: "65%", backgroundColor: placeholderBg }]} />

        {/* Body */}
        <View style={[styles.line, { width: "100%", height: 10, marginTop: 4, backgroundColor: placeholderBg }]} />
        <View style={[styles.line, { width: "90%", height: 10, backgroundColor: placeholderBg }]} />

        {/* Footer (Kcal + Button) */}
        <View style={styles.footerRow}>
          <View style={[styles.pill, { width: 60, height: 24, backgroundColor: placeholderBg }]} />
          <View style={[styles.pill, { width: 100, height: 36, borderRadius: 18, backgroundColor: placeholderBg }]} />
        </View>
      </View>
    </Animated.View>
  );
};

export const SavedListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <SavedMealCardSkeleton key={i} />
      ))}
    </View>
  );
};

export default SavedListSkeleton;

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
    paddingTop: 10,
    paddingBottom: 40,
  },
  cardContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 5,
  },
  imageWrapper: {
    width: "100%",
    height: IMAGE_SECTION_HEIGHT,
  },
  description: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop: 12,
    gap: 8,
  },
  cuisineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(150,150,150,0.5)",
  },
  pill: {
    height: 14,
    borderRadius: 4,
  },
  line: {
    height: 18,
    borderRadius: 6,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});
