import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useThemeColors } from "../../../constants/color-pallette";

const CARD_WIDTH = Dimensions.get("window").width * 0.75;
const IMAGE_SECTION_HEIGHT = 220;

// ─────────────────────────────────────────────────────────────────
// Hook: shared shimmer opacity animation
// ─────────────────────────────────────────────────────────────────
const useShimmer = () => {
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

  return useAnimatedStyle(() => ({ opacity: opacity.value }));
};

// ─────────────────────────────────────────────────────────────────
// Single skeleton card — mirrors FeaturedCard layout exactly
// ─────────────────────────────────────────────────────────────────
export const FeaturedCardSkeleton = () => {
  const { surfaceHigh, muted, card } = useThemeColors();
  const shimmer = useShimmer();

  return (
    <Animated.View
      style={[styles.card, shimmer, { width: CARD_WIDTH, backgroundColor: card }]}
    >
      {/* Image section placeholder */}
      <View
        style={[
          styles.imageSection,
          { backgroundColor: surfaceHigh, height: IMAGE_SECTION_HEIGHT },
        ]}
      >
        {/* Centred meal image rectangle */}
        <View style={[styles.imageRect, { backgroundColor: muted }]} />
      </View>

      {/* Description section placeholders */}
      <View style={styles.description}>
        {/* Cuisine tag */}
        <View style={[styles.tagLine, { backgroundColor: muted, width: 60 }]} />
        {/* Title — two lines */}
        <View style={[styles.titleLine, { backgroundColor: surfaceHigh, width: "90%" }]} />
        <View style={[styles.titleLine, { backgroundColor: surfaceHigh, width: "65%" }]} />
        {/* Body — two lines */}
        <View style={[styles.bodyLine, { backgroundColor: muted, width: "100%" }]} />
        <View style={[styles.bodyLine, { backgroundColor: muted, width: "80%" }]} />
        {/* CTA row */}
        <View style={styles.ctaRow}>
          <View style={[styles.calPill, { backgroundColor: muted }]} />
          <View style={[styles.btnPill, { backgroundColor: surfaceHigh }]} />
        </View>
      </View>
    </Animated.View>
  );
};

// ─────────────────────────────────────────────────────────────────
// Row of skeleton cards (used when loading)
// ─────────────────────────────────────────────────────────────────
export const FeaturedSkeletonRow = ({ count = 3 }: { count?: number }) => (
  <View style={styles.row}>
    {Array.from({ length: count }).map((_, i) => (
      <FeaturedCardSkeleton key={i} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 20,
  },
  // ── Card shell ────────────────────────────────────────
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
  },
  // ── Image section ─────────────────────────────────────
  imageSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageRect: {
    width: 220,
    height: 160,
    borderRadius: 8,
  },
  // ── Description section ───────────────────────────────
  description: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    gap: 8,
  },
  tagLine: {
    height: 10,
    borderRadius: 5,
  },
  titleLine: {
    height: 16,
    borderRadius: 6,
  },
  bodyLine: {
    height: 11,
    borderRadius: 5,
  },
  ctaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  calPill: {
    width: 60,
    height: 22,
    borderRadius: 8,
  },
  btnPill: {
    width: 110,
    height: 36,
    borderRadius: 50,
  },
});
