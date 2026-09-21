import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../constants/color-pallette";

// ─────────────────────────────────────────────────────────────────
// Shimmer skeleton for a single AreaCuisinesHomeCard
// Mirrors layout: [circle image] + [title line] + [recipe count line]
// ─────────────────────────────────────────────────────────────────
export const AreaCardSkeleton = () => {
  const { surfaceHigh, muted, card } = useThemeColors();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.35, { duration: 700 }),
        withTiming(1, { duration: 700 }),
      ),
      -1,
      true,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.card, animStyle, { backgroundColor: card }]}
    >
      {/* Circle image placeholder */}
      <View style={[styles.circle, { backgroundColor: surfaceHigh }]} />

      {/* Title line */}
      <View style={[styles.titleLine, { backgroundColor: surfaceHigh }]} />

      {/* "X recipes" line */}
      <View style={[styles.subLine, { backgroundColor: muted }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    gap: 8,
    width: 150,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 4,
  },
  titleLine: {
    width: 90,
    height: 13,
    borderRadius: 6,
  },
  subLine: {
    width: 60,
    height: 11,
    borderRadius: 5,
  },
});
