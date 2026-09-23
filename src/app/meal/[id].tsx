import { AppText } from "@/components/AppText";
import CommonBookmark from "@/components/CommonBookmark";
import NormalBadge from "@/components/NormalBadge";
import RatingBadge from "@/components/RatingBadge";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchMealById } from "../../../api/hooks/useFetchMealById";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import { MealBlogLinkCard } from "../../../features/mealDeatils/MealBlogLinkCard";
import MealIngredients from "../../../features/mealDeatils/MealIngredients";
import PreparationSteps from "../../../features/mealDeatils/PreparationSteps";
import RecipeStats from "../../../features/mealDeatils/RecipeStats";
import WatchRecipe from "../../../features/mealDeatils/WatchRecipe";

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

          {/* Watch Recipe Section */}
          <WatchRecipe
            videoUrl={mealDetails?.strYoutube ?? null}
            imageUrl={mealDetails?.strMealThumb}
          />

          {/* Ingredients List */}
          <MealIngredients mealDetails={mealDetails} />

          {/* Preparation Steps */}
          <PreparationSteps instructions={mealDetails?.strInstructions ?? ""} />
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
});
