import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";

export const MealDetailsSkeleton = () => {
  const { background, card, surfaceHigh, muted, isDarkMode } =
    useThemeColors();

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
    : surfaceHigh;
  const cardBg = card;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <Animated.View style={[{ flex: 1 }, shimmerStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* Navigation Header Skeleton */}
          <View style={styles.navHeader}>
            <View
              style={[styles.circleBtn, { backgroundColor: placeholderBg }]}
            />
            <View
              style={[styles.circleBtn, { backgroundColor: placeholderBg }]}
            />
          </View>

          {/* Hero Image Skeleton */}
          <View
            style={[styles.heroImage, { backgroundColor: placeholderBg }]}
          >
            <View
              style={[styles.badgePlaceholder, { backgroundColor: muted }]}
            />
          </View>

          {/* Meal Main Info Container */}
          <View style={styles.mainContainer}>
            {/* Category Pill */}
            <View
              style={[styles.categoryPill, { backgroundColor: placeholderBg }]}
            />

            {/* Title Lines */}
            <View
              style={[styles.titleLine1, { backgroundColor: placeholderBg }]}
            />
            <View
              style={[styles.titleLine2, { backgroundColor: placeholderBg }]}
            />

            {/* Recipe Stats (4 Boxes) */}
            <View style={styles.statsRow}>
              {Array.from({ length: 4 }).map((_, i) => (
                <View
                  key={i}
                  style={[styles.statBox, { backgroundColor: placeholderBg }]}
                />
              ))}
            </View>

            {/* Blog Link / Watch Video Card Skeleton */}
            <View
              style={[styles.cardPlaceholder, { backgroundColor: cardBg }]}
            />
          </View>

          {/* Ingredients Section Skeleton */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionTitle,
                  { backgroundColor: placeholderBg },
                ]}
              />
              <View
                style={[
                  styles.pillSmall,
                  { backgroundColor: placeholderBg },
                ]}
              />
            </View>

            {Array.from({ length: 4 }).map((_, i) => (
              <View
                key={i}
                style={[styles.ingredientItem, { backgroundColor: cardBg }]}
              >
                <View
                  style={[
                    styles.orderCircle,
                    { backgroundColor: placeholderBg },
                  ]}
                />
                <View
                  style={[
                    styles.ingredientText,
                    { backgroundColor: placeholderBg },
                  ]}
                />
                <View
                  style={[
                    styles.measureText,
                    { backgroundColor: placeholderBg },
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Preparation Steps Section Skeleton */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionTitle,
                  { backgroundColor: placeholderBg },
                ]}
              />
              <View
                style={[
                  styles.pillSmall,
                  { backgroundColor: placeholderBg },
                ]}
              />
            </View>

            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepNumberCircle,
                    { backgroundColor: placeholderBg },
                  ]}
                />
                <View style={styles.stepLines}>
                  <View
                    style={[
                      styles.stepTitleLine,
                      { backgroundColor: placeholderBg },
                    ]}
                  />
                  <View
                    style={[
                      styles.stepBodyLine1,
                      { backgroundColor: placeholderBg },
                    ]}
                  />
                  <View
                    style={[
                      styles.stepBodyLine2,
                      { backgroundColor: placeholderBg },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default MealDetailsSkeleton;

const styles = StyleSheet.create({
  navHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  heroImage: {
    height: 280,
    width: "100%",
    position: "relative",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  badgePlaceholder: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 70,
    height: 32,
    borderRadius: 16,
  },
  mainContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 14,
  },
  categoryPill: {
    width: 90,
    height: 24,
    borderRadius: 12,
  },
  titleLine1: {
    height: 24,
    width: "85%",
    borderRadius: 8,
  },
  titleLine2: {
    height: 24,
    width: "55%",
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    height: 70,
    borderRadius: 16,
  },
  cardPlaceholder: {
    height: 64,
    borderRadius: 20,
    marginTop: 6,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    width: 140,
    height: 22,
    borderRadius: 6,
  },
  pillSmall: {
    width: 75,
    height: 20,
    borderRadius: 10,
  },
  ingredientItem: {
    height: 52,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 12,
  },
  orderCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  ingredientText: {
    flex: 1,
    height: 14,
    borderRadius: 4,
  },
  measureText: {
    width: 60,
    height: 14,
    borderRadius: 4,
  },
  stepItem: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
  },
  stepNumberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  stepLines: {
    flex: 1,
    gap: 8,
    marginTop: 2,
  },
  stepTitleLine: {
    width: "50%",
    height: 16,
    borderRadius: 4,
  },
  stepBodyLine1: {
    width: "100%",
    height: 12,
    borderRadius: 4,
  },
  stepBodyLine2: {
    width: "75%",
    height: 12,
    borderRadius: 4,
  },
});
