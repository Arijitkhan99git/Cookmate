import { AppText } from "@/components/AppText";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../api/model/fetchMealById-model";
import { useThemeColors } from "../../constants/color-pallette";
import { useGenericShadow } from "../../constants/genericShadowStyle";
import { fonts } from "../../constants/typography";

interface IngredientItem {
  id: number;
  name: string;
  measure: string;
}

// Function to extract ingredients and measures from Meal object
const extractIngredients = (meal?: Meal | null): IngredientItem[] => {
  if (!meal) return [];
  const list: IngredientItem[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (
      ingredient &&
      typeof ingredient === "string" &&
      ingredient.trim() !== ""
    ) {
      list.push({
        id: list.length + 1,
        name: ingredient.trim(),
        measure: measure && typeof measure === "string" ? measure.trim() : "",
      });
    }
  }
  return list;
};

// Helper function to scale ingredient measurement values based on serving factor
const scaleMeasure = (measureStr: string, factor: number): string => {
  if (!measureStr || factor === 1) return measureStr;

  const parseNumericValue = (valStr: string): number | null => {
    valStr = valStr.trim();
    if (/^\d+\s+\d+\/\d+$/.test(valStr)) {
      const [whole, frac] = valStr.split(/\s+/);
      const [num, den] = frac.split("/").map(Number);
      return parseFloat(whole) + (den ? num / den : 0);
    }
    if (/^\d+\/\d+$/.test(valStr)) {
      const [num, den] = valStr.split("/").map(Number);
      return den ? num / den : null;
    }
    const parsed = parseFloat(valStr);
    return isNaN(parsed) ? null : parsed;
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num - Math.round(num)) < 0.02) {
      return Math.round(num).toString();
    }
    const whole = Math.floor(num);
    const frac = num - whole;
    const roundedFrac = Math.round(frac * 100) / 100;

    let fracStr = "";
    if (Math.abs(roundedFrac - 0.25) < 0.06) fracStr = "1/4";
    else if (Math.abs(roundedFrac - 0.33) < 0.06) fracStr = "1/3";
    else if (Math.abs(roundedFrac - 0.5) < 0.06) fracStr = "1/2";
    else if (Math.abs(roundedFrac - 0.67) < 0.06) fracStr = "2/3";
    else if (Math.abs(roundedFrac - 0.75) < 0.06) fracStr = "3/4";

    if (fracStr) {
      return whole > 0 ? `${whole} ${fracStr}` : fracStr;
    }

    if (num > 20) {
      return Math.round(num).toString();
    }
    return (Math.round(num * 10) / 10).toString();
  };

  return measureStr.replace(
    /(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)/g,
    (match) => {
      const val = parseNumericValue(match);
      if (val !== null) {
        return formatNumber(val * factor);
      }
      return match;
    },
  );
};

interface MealIngredientsProps {
  mealDetails?: Meal | null;
}

const MealIngredients = ({ mealDetails }: MealIngredientsProps) => {
  const {
    text: textColor,
    primary,
    secondaryText,
    isDarkMode,
    surfaceSecondary,
  } = useThemeColors();
  const shadowStyle = useGenericShadow(1);

  // Default serving is 3 as requested
  const [servings, setServings] = useState<number>(3);
  const [showAll, setShowAll] = useState<boolean>(false);

  const defaultServings = 3;
  const servingFactor = servings / defaultServings;

  const ingredientsList = useMemo(
    () => extractIngredients(mealDetails),
    [mealDetails],
  );

  const visibleIngredients = useMemo(
    () => (showAll ? ingredientsList : ingredientsList.slice(0, 5)),
    [ingredientsList, showAll],
  );

  const hasMore = ingredientsList.length > 5;

  const handleDecrease = () => {
    if (servings > 1) {
      setServings((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setServings((prev) => prev + 1);
  };

  if (!ingredientsList || ingredientsList.length === 0) {
    return null;
  }

  const ingredientsCardBg = isDarkMode ? "#241b18ff" : "rgba(255, 251, 249, 1)";

  const pillBgLightColor = "rgba(251, 230, 226, 1)";

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        {/* Title & Item Count */}
        <View style={styles.titleContainer}>
          <AppText style={[styles.headingTitle, { color: textColor }]}>
            Ingredients
          </AppText>
          <AppText style={[styles.subtitle, { color: secondaryText }]}>
            {ingredientsList.length}{" "}
            {ingredientsList.length === 1 ? "item" : "items"} needed
          </AppText>
        </View>

        {/* Servings Control Pill */}
        <View
          style={[
            styles.servingsPill,
            {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.08)"
                : pillBgLightColor,
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.08)"
                : "#f8f8f8ff",
            },
          ]}
        >
          {/* Decrement Button */}
          <Pressable
            style={({ pressed }) => [
              styles.servingBtn,
              {
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(255, 255, 255, 0.8)",
                opacity: servings <= 1 ? 0.4 : pressed ? 0.7 : 1,
              },
            ]}
            onPress={handleDecrease}
            disabled={servings <= 1}
          >
            <Minus size={16} color={textColor} />
          </Pressable>

          {/* Servings Text */}
          <AppText style={[styles.servingsText, { color: textColor }]}>
            <Text style={{ color: primary }}>{servings}</Text> Servings
          </AppText>

          {/* Increment Button */}
          <Pressable
            style={({ pressed }) => [
              styles.servingBtn,
              {
                backgroundColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(255, 255, 255, 0.8)",
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={handleIncrease}
          >
            <Plus size={16} color={textColor} />
          </Pressable>
        </View>
      </View>

      {/* Ingredients Data List */}
      <View style={styles.listContainer}>
        {visibleIngredients.map((item, index) => {
          const scaledMeasure = scaleMeasure(item.measure, servingFactor);
          const orderNumber = (index + 1).toString().padStart(2, "0");

          return (
            <View
              key={`${item.name}-${index}`}
              style={[
                styles.ingredientCard,
                shadowStyle,
                {
                  backgroundColor: ingredientsCardBg,
                  //   borderColor: isDarkMode
                  //     ? "rgba(255, 255, 255, 0.06)"
                  //     : "rgba(0, 0, 0, 0.04)",
                },
              ]}
            >
              {/* Order Number Badge */}
              <View
                style={[
                  styles.orderBadge,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.08)"
                      : "#F6EFE9",
                  },
                ]}
              >
                <AppText
                  style={[
                    styles.orderText,
                    { color: secondaryText ?? textColor },
                  ]}
                >
                  {orderNumber}
                </AppText>
              </View>

              {/* Ingredient Name */}
              <AppText
                style={[styles.ingredientName, { color: textColor }]}
                numberOfLines={2}
              >
                {item.name}
              </AppText>

              {/* Measure Quantity */}
              {scaledMeasure ? (
                <AppText style={[styles.measureText, { color: primary }]}>
                  {scaledMeasure}
                </AppText>
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Show More / Show Less Button */}
      {hasMore && (
        <Pressable
          style={({ pressed }) => [
            styles.showMoreBtn,
            {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.06)"
                : "#ffffffff",
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => setShowAll((prev) => !prev)}
        >
          <AppText style={[styles.showMoreText, { color: primary }]}>
            {showAll
              ? "Show less"
              : `Show all (${ingredientsList.length - 5} more)`}
          </AppText>
          {showAll ? (
            <ChevronUp size={18} color={primary} />
          ) : (
            <ChevronDown size={18} color={primary} />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default MealIngredients;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  titleContainer: {
    gap: 2,
  },
  headingTitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 13,
    opacity: 0.7,
  },
  servingsPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 100,
    gap: 10,
    borderWidth: 1,
  },
  servingBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  servingsText: {
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  listContainer: {
    gap: 10,
  },
  ingredientCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  orderBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  orderText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    opacity: 0.8,
  },
  ingredientName: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 15,
    marginRight: 8,
  },
  measureText: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  showMoreBtn: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  showMoreText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
});
