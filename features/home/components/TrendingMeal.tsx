import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AlertCircle, Flame, RefreshCw, Timer } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFetchRandomMeal } from "../../../api/hooks/useRandomMeal";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { DiscoverySkeleton } from "../skeletons/DiscoverySkeleton";
import { SectionHeading } from "./SectionHeading";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TrendingMeal = () => {
  const {
    card,
    orangeTint,
    primary,
    isDarkMode,
    text: headingColor,
    secondaryText,
    surfaceHigh,
    danger,
    surfaceSecondary,
  } = useThemeColors();

  const router = useRouter();

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchRandomMeal();
  const meal = data?.meals?.[0];

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gradientColors = isDarkMode
    ? ([card, "#3a1f0eff"] as const)
    : (["#fff8f4ff", "#ffe0c8ff"] as const);

  const handleRandomCook = ({ mealId }: { mealId: string }) => {
    router.push(`/meal/${mealId}`);
  };

  return (
    <View style={styles.container}>
      {/* ── Section Header ── */}
      <View style={styles.titleRow}>
        <View style={{ gap: 0 }}>
          <AppText
            style={{
              color: orangeTint,
              fontSize: 11,
              fontFamily: fonts.medium,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Trending Right Now
          </AppText>
          <SectionHeading>Recipe of the Moment</SectionHeading>
        </View>

        <View style={[styles.badge, { backgroundColor: "#d2ae66ff" }]}>
          <Flame size={13} color="#2a2929ff" />
          <AppText
            style={{
              fontFamily: fonts.medium,
              fontSize: 11,
              color: "#2a2929ff",
            }}
          >
            Popular
          </AppText>
        </View>
      </View>

      {/* ── Loading: shimmer skeleton ── */}
      {isLoading && <DiscoverySkeleton />}

      {/* ── Error state ── */}
      {isError && !isLoading && (
        <View style={[styles.errorBox, { backgroundColor: surfaceSecondary }]}>
          <AlertCircle size={22} color={danger} />
          <View style={{ flex: 1, gap: 3 }}>
            <AppText
              style={{
                fontFamily: fonts.semibold,
                color: danger,
                fontSize: 13,
              }}
            >
              Couldn't load recipe
            </AppText>
            <AppText
              style={{ color: secondaryText, fontSize: 12 }}
              numberOfLines={2}
            >
              {(error as Error)?.message ??
                "Something went wrong. Please try again."}
            </AppText>
          </View>
          <Pressable
            onPress={() => refetch()}
            style={[styles.retryBtn, { backgroundColor: danger }]}
            hitSlop={8}
          >
            <RefreshCw size={13} color="#fff" />
            <AppText
              style={{
                fontFamily: fonts.semibold,
                fontSize: 12,
                color: "#fff",
              }}
            >
              {isRefetching ? "Retrying…" : "Retry"}
            </AppText>
          </Pressable>
        </View>
      )}

      {/* ── Random Meal Card ── */}
      {!isLoading && !isError && (
        <Pressable
          onPress={() => handleRandomCook({ mealId: meal?.idMeal ?? "" })}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.card,
              { shadowColor: isDarkMode ? "#000000" : "#c17a4bff" },
            ]}
          >
            {/* Circular meal image */}
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: meal?.strMealThumb }}
                style={styles.mealImage}
                contentFit="cover"
              />
            </View>

            {/* Right content */}
            <View style={styles.content}>
              {/* Level pill + time */}
              <View style={styles.metaRow}>
                <View
                  style={[
                    styles.levelPill,
                    { backgroundColor: isDarkMode ? surfaceHigh : "#e8d5c4ff" },
                  ]}
                >
                  <AppText
                    style={{
                      fontFamily: fonts.semibold,
                      fontSize: 11,
                      color: orangeTint,
                    }}
                  >
                    Easy
                  </AppText>
                </View>
                <View style={styles.timeRow}>
                  <Timer size={13} color={secondaryText} />
                  <AppText
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 12,
                      color: secondaryText,
                    }}
                  >
                    25 min
                  </AppText>
                </View>
              </View>

              {/* Meal title from API */}
              <AppText
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 20,
                  color: headingColor,
                  lineHeight: 26,
                  marginTop: 2,
                }}
                numberOfLines={2}
              >
                {meal?.strMeal}
              </AppText>

              {/* Kcal · Protein */}
              <View style={styles.statsRow}>
                <AppText style={{ fontSize: 13, color: secondaryText }}>
                  380 kcal
                </AppText>
                <View
                  style={[styles.dot, { backgroundColor: secondaryText }]}
                />
                <AppText style={{ fontSize: 13, color: secondaryText }}>
                  High Protein
                </AppText>
              </View>

              {/* CTA Button */}
              <AnimatedPressable
                style={[
                  styles.ctaBtn,
                  { backgroundColor: primary },
                  animatedStyle,
                ]}
                onPressIn={() => {
                  scale.value = withTiming(0.94, { duration: 100 });
                }}
                onPressOut={() => {
                  scale.value = withTiming(1, { duration: 150 });
                }}
                hitSlop={6}
              >
                <AppText
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  Let's cook 🍳
                </AppText>
              </AnimatedPressable>
            </View>
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

export default TrendingMeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 50,
  },
  // ── Card ──────────────────────────────────────────────────────────────
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },
  // ── Image ─────────────────────────────────────────────────────────────
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    flexShrink: 0,
  },
  mealImage: {
    width: "100%",
    height: "100%",
  },
  // ── Right content ──────────────────────────────────────────────────────
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  levelPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.5,
  },
  ctaBtn: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 50,
  },
  // ── Error ───────────────────────────────────────────
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 50,
  },
});
