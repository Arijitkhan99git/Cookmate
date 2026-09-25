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

export const SearchMealCardSkeleton = () => {
  const { card, surfaceHigh, isDarkMode } = useThemeColors();

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
  const cardBorder = isDarkMode ? "#342822ff" : "#fbece0ff";

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { backgroundColor: card, borderColor: cardBorder },
        shimmerStyle,
      ]}
    >
      {/* Image Skeleton */}
      <View style={[styles.imageWrapper, { backgroundColor: placeholderBg }]}>
        <View
          style={[styles.ratingPill, { backgroundColor: surfaceHigh }]}
        />
        <View
          style={[styles.bookmarkCircle, { backgroundColor: surfaceHigh }]}
        />
      </View>

      {/* Content Skeleton */}
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.titleLine,
            { width: "90%", backgroundColor: placeholderBg },
          ]}
        />
        <View
          style={[
            styles.titleLine,
            { width: "60%", backgroundColor: placeholderBg },
          ]}
        />

        <View style={styles.metaRow}>
          <View
            style={[styles.badgePill, { backgroundColor: placeholderBg }]}
          />
          <View
            style={[styles.timePill, { backgroundColor: placeholderBg }]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export const SearchListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.gridItemWrapper}>
          <SearchMealCardSkeleton />
        </View>
      ))}
    </View>
  );
};

export default SearchListSkeleton;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingBottom: 40,
  },
  gridItemWrapper: {
    width: "48%",
  },
  cardContainer: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 145,
    borderRadius: 16,
  },
  ratingPill: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 48,
    height: 22,
    borderRadius: 12,
  },
  bookmarkCircle: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 2,
    gap: 8,
  },
  titleLine: {
    height: 14,
    borderRadius: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  badgePill: {
    width: 60,
    height: 20,
    borderRadius: 50,
  },
  timePill: {
    width: 46,
    height: 14,
    borderRadius: 6,
  },
});
