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
// Shimmer skeleton for a single category item
// ─────────────────────────────────────────────────────────────────
export const CategorySkeleton = () => {
  const { muted, surfaceHigh } = useThemeColors();
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
    <Animated.View style={[styles.skeletonItem, animStyle]}>
      <View style={[styles.skeletonCircle, { backgroundColor: surfaceHigh }]} />
      <View style={[styles.skeletonLabel, { backgroundColor: muted }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    alignItems: "center",
    gap: 8,
  },
  skeletonCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  skeletonLabel: {
    width: 64,
    height: 11,
    borderRadius: 6,
  },
});
