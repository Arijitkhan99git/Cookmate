import { AppText } from "@/components/AppText";
import CommonBookmark from "@/components/CommonBookmark";
import NormalBadge from "@/components/NormalBadge";
import RatingBadge from "@/components/RatingBadge";
import { openExternalUrl } from "@/utils/openExternalUrl";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import {
    Bubbles,
    ChevronLeft,
    ExternalLink,
    Gauge,
    Timer,
    Users,
    Utensils,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchMealById } from "../../../api/hooks/useFetchMealById";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MealBlogLinkCard = ({
  blogUrl,
  cardBg,
  textColor,
  secondaryTextColor,
  successColor,
  isDarkMode,
  surfaceHighColor,
  shadowStyle,
}: {
  blogUrl: string;
  cardBg: string;
  textColor: string;
  secondaryTextColor?: string;
  successColor: string;
  isDarkMode: boolean;
  surfaceHighColor: string;
  shadowStyle: any;
}) => {
  const scale = useSharedValue(1);
  const iconTranslateX = useSharedValue(0);
  const iconTranslateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: iconTranslateX.value },
      { translateY: iconTranslateY.value },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 250 });
    iconTranslateX.value = withSpring(3, { damping: 12 });
    iconTranslateY.value = withSpring(-3, { damping: 12 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    iconTranslateX.value = withSpring(0, { damping: 15 });
    iconTranslateY.value = withSpring(0, { damping: 15 });
  };

  const getDomain = (url: string) => {
    try {
      const formatted = url.startsWith("http") ? url : `https://${url}`;
      return new URL(formatted).hostname.replace(/^www\./, "");
    } catch {
      return "Original source";
    }
  };

  return (
    <AnimatedPressable
      style={[
        styles.mealBlogWrapper,
        shadowStyle,
        {
          backgroundColor: cardBg,
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.05)",
          borderWidth: 1,
        },
        animatedStyle,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => openExternalUrl(blogUrl)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View
            style={{
              backgroundColor: isDarkMode
                ? "rgba(34, 197, 94, 0.15)"
                : "#e8f7ee",
              padding: 10,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bubbles size={22} color={successColor} />
          </View>
          <View style={{ gap: 2 }}>
            <AppText
              style={{
                fontFamily: fonts.bold,
                color: textColor,
                fontSize: 16,
              }}
            >
              See full recipe blog
            </AppText>
            <AppText
              style={{
                fontFamily: fonts.regular,
                color: secondaryTextColor ?? textColor,
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              {getDomain(blogUrl)}
            </AppText>
          </View>
        </View>

        <Animated.View
          style={[
            {
              backgroundColor: isDarkMode ? surfaceHighColor : "#FFE0CC",
              padding: 10,
              borderRadius: 100,
            },
            iconAnimatedStyle,
          ]}
        >
          <ExternalLink size={18} color={textColor} style={{ opacity: 0.9 }} />
        </Animated.View>
      </View>
    </AnimatedPressable>
  );
};

const RecipeStats = ({ cuisineType }: { cuisineType: string }) => {
  const {
    text: textColor,
    danger,
    primary,
    success,
    rating,
    isDarkMode,
  } = useThemeColors();
  const statBg = isDarkMode ? "#3e2f2fff" : "#faf2e3ff";

  const statData = [
    {
      icon: <Timer color={primary} />,
      title: "Time",
      description: "25-30m",
    },
    {
      icon: <Utensils color={rating} />,
      title: "Cuisine",
      description: cuisineType,
    },
    {
      icon: <Gauge color={success} />,
      title: "Level",
      description: "Easy",
    },
    {
      icon: <Users color={danger} />,
      title: "Servings",
      description: "2 Serves",
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      {statData.map((stat) => (
        <View
          key={stat.title}
          style={{
            backgroundColor: statBg,
            paddingHorizontal: 5,
            paddingVertical: 12,
            borderRadius: 20,
            gap: 4,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>{stat.icon}</View>
          <AppText
            style={{
              color: textColor,
              fontFamily: fonts.medium,
              opacity: 0.8,
              fontSize: 12,
            }}
          >
            {stat.title}
          </AppText>
          <AppText
            style={{ color: textColor, fontFamily: fonts.bold, fontSize: 12 }}
          >
            {stat.description}
          </AppText>
        </View>
      ))}
    </View>
  );
};

const MealDetailScreen = () => {
  const {
    text: textColor,
    background,
    card,
    danger,
    success,
    isDarkMode,
    surfaceHigh,
    secondaryText,
  } = useThemeColors();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError, error, isRefetching, refetch } =
    useFetchMealById(id);

  const mealDetails = data?.meals[0];
  const imageUrl = mealDetails?.strMealThumb;

  const blogUrl = mealDetails?.strSource;

  //get the generic shadow style
  const shadowStyle = useGenericShadow();

  const blogShadow = useGenericShadow(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {/* Navigation Header */}
          <View style={[styles.navigationHeader]}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.pressableHeader,
                {
                  opacity: pressed ? 0.6 : 1,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <ChevronLeft size={24} color={textColor} />
              <AppText
                style={{
                  color: textColor,
                  fontSize: 18,
                  fontFamily: fonts.bold,
                }}
              >
                Recipe Details
              </AppText>
            </Pressable>
            <CommonBookmark mealId={id} />
          </View>
          {/* Image section  */}
          <View
            style={{
              width: "100%",
              height: 280,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </View>

          {/* Meal info section */}
          <View
            style={{
              position: "relative",
            }}
          >
            {/* Meal Overview */}
            <View
              style={[
                styles.mealInfoWrapper,
                shadowStyle,
                {
                  backgroundColor: card,
                },
              ]}
            >
              {/* Rating row*/}

              <View style={styles.ratingRow}>
                <RatingBadge />
                <NormalBadge badgeTitle="EDITOR'S PICK" />
              </View>

              {/* Tags */}
              {/* <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                {tags.map((tag) => (
                  <NormalBadge badgeTitle={tag} key={tag} />
                ))}
              </View> */}

              {/* Title section  */}
              <View>
                <AppText
                  style={{
                    fontSize: 22,
                    fontWeight: "800",
                    color: textColor,
                  }}
                >
                  {mealDetails?.strMeal}
                </AppText>

                <View style={{ marginVertical: 8 }}>
                  <Text
                    style={[
                      styles.descriptionText,
                      {
                        color: textColor,
                      },
                    ]}
                    numberOfLines={3}
                  >
                    {mealDetails?.strInstructions}
                  </Text>
                  <Pressable>
                    <Text
                      style={[
                        styles.descriptionText,
                        {
                          color: danger,
                          fontFamily: fonts.medium,
                        },
                      ]}
                    >
                      Read more
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* stats section  */}
              <RecipeStats cuisineType={mealDetails?.strArea ?? ""} />
            </View>

            {/* Meal Blog Link */}
            {blogUrl?.trim() ? (
              <MealBlogLinkCard
                blogUrl={blogUrl}
                cardBg={card}
                textColor={textColor}
                secondaryTextColor={secondaryText}
                successColor={success}
                isDarkMode={isDarkMode}
                surfaceHighColor={surfaceHigh}
                shadowStyle={blogShadow}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  commonPadding: {
    paddingHorizontal: 20,
  },
  commonGap: {
    rowGap: 30,
  },
  normalFlexRow: {
    flexDirection: "row",
    gap: 12,
  },
  navigationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  pressableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  mealInfoWrapper: {
    marginHorizontal: 16,
    marginTop: -20,
    padding: 15,
    gap: 12,
    borderRadius: 20,
    overflow: "hidden",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionText: {
    opacity: 0.9,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  mealBlogWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
