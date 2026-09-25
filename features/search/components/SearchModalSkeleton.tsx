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

export const CategoryCardSkeleton = () => {
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
  const cardBg = isDarkMode ? "#29201c" : "#ffffff";
  const cardBorderColor = isDarkMode ? "#3a2c26" : "#f0dfd2";

  return (
    <Animated.View
      style={[
        styles.categoryCard,
        { backgroundColor: cardBg, borderColor: cardBorderColor },
        shimmerStyle,
      ]}
    >
      {/* Top Right Check Circle Placeholder */}
      <View
        style={[styles.checkCircle, { backgroundColor: placeholderBg }]}
      />

      {/* Category Thumbnail Circle Placeholder */}
      <View
        style={[styles.categoryThumb, { backgroundColor: placeholderBg }]}
      />

      {/* Category Title Placeholder */}
      <View
        style={[styles.categoryTitle, { backgroundColor: placeholderBg }]}
      />
    </Animated.View>
  );
};

export const SearchModalSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.gridItemWrapper}>
          <CategoryCardSkeleton />
        </View>
      ))}
    </View>
  );
};

export default SearchModalSkeleton;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingVertical: 6,
  },
  gridItemWrapper: {
    width: "48%",
  },
  categoryCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 12,
    minHeight: 110,
    justifyContent: "space-between",
    position: "relative",
  },
  checkCircle: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  categoryThumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryTitle: {
    width: "70%",
    height: 16,
    borderRadius: 6,
    marginTop: 6,
  },
});
