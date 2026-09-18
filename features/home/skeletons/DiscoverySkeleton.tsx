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
// Mirrors the DiscoverySection card layout:
//   [circle image]  [pill + time line]
//                   [title line 1]
//                   [title line 2]
//                   [stats line]
//                   [CTA pill]
// ─────────────────────────────────────────────────────────────────
export const DiscoverySkeleton = () => {
  const { surfaceHigh, muted, card } = useThemeColors();

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 650 }),
        withTiming(1, { duration: 650 }),
      ),
      -1,
      true,
    );
  }, []);

  const shimmer = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.card, shimmer, { backgroundColor: card }]}
    >
      {/* Circular image placeholder */}
      <View style={[styles.circle, { backgroundColor: surfaceHigh }]} />

      {/* Right content placeholders */}
      <View style={styles.content}>
        {/* Meta row: pill + time */}
        <View style={styles.metaRow}>
          <View style={[styles.pill, { backgroundColor: surfaceHigh, width: 46 }]} />
          <View style={[styles.pill, { backgroundColor: muted, width: 56 }]} />
        </View>

        {/* Title — two lines */}
        <View style={[styles.titleLine, { backgroundColor: surfaceHigh, width: "90%" }]} />
        <View style={[styles.titleLine, { backgroundColor: surfaceHigh, width: "65%" }]} />

        {/* Stats line */}
        <View style={[styles.statsLine, { backgroundColor: muted, width: "75%" }]} />

        {/* CTA button pill */}
        <View style={[styles.ctaBtn, { backgroundColor: surfaceHigh }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 14,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
  },
  pill: {
    height: 20,
    borderRadius: 50,
  },
  titleLine: {
    height: 16,
    borderRadius: 6,
  },
  statsLine: {
    height: 12,
    borderRadius: 5,
  },
  ctaBtn: {
    width: 120,
    height: 38,
    borderRadius: 50,
    marginTop: 4,
  },
});
