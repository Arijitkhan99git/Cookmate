import { AppText } from "@/components/AppText";
import { Image } from "expo-image";
import { Timer } from "lucide-react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../../api/model/fetchMealById-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
type MealCardProps = {
  item: Meal;
};

const FeaturedCard = ({ item }: MealCardProps) => {
  const CARD_WIDTH = Dimensions.get("window").width * 0.75;

  const {
    card,
    orangeTint,
    secondaryText,
    text: headingColor,
  } = useThemeColors();

  return (
    <View
      style={[styles.container, { width: CARD_WIDTH, backgroundColor: card }]}
    >
      {/* Image section */}
      <View>
        <Image style={styles.image} source={{ uri: item.strMealThumb }} />
      </View>
      {/* Description box */}
      <View style={{ padding: 15, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Timer size={16} color={orangeTint} />
          <AppText style={[styles.timerRow, { color: orangeTint }]}>
            29 mins
          </AppText>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 50,
              overflow: "hidden",
              backgroundColor: orangeTint,
            }}
          ></View>
          <AppText style={[styles.timerRow, { color: orangeTint }]}>
            Easy
          </AppText>
        </View>

        <Text
          style={{
            color: headingColor,
            fontFamily: fonts.bold,
            fontSize: 20,
            includeFontPadding: false,
            textAlignVertical: "center",
          }}
        >
          {item.strMeal}
        </Text>

        <Text
          style={{
            color: secondaryText,
            fontFamily: fonts.regular,
            fontSize: 13,
          }}
          numberOfLines={2}
        >
          {item.strInstructions}
        </Text>
      </View>
    </View>
  );
};

export default FeaturedCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    gap: 5,
    marginRight: 20,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "cover",
  },
  timerRow: {
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  sectionGap: {
    gap: 10,
  },
});
