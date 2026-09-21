import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { AreaCardProps } from "../types/areaCardTypes";

const AreaCuisinesHomeCard = ({ area }: { area: AreaCardProps }) => {
  const { primary, card, mutedText, text: textColor } = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: card }]}>
      <Image
        source={{ uri: area.image }}
        style={styles.image}
        contentFit="contain"
      />
      <Text
        style={{ color: textColor, fontSize: 14, fontFamily: fonts.bold }}
        numberOfLines={1}
      >
        {area.title}
      </Text>
      <Text style={{ color: mutedText }}>{area.totalMealCount} recipes</Text>
    </View>
  );
};

export default AreaCuisinesHomeCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 12,
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
    width: 150,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 4,
  },
});
