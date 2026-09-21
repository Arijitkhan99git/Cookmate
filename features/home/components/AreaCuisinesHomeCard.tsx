import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { AreaCardProps } from "../types/areaCardTypes";

const AreaCuisinesHomeCard = ({ area }: { area: AreaCardProps }) => {
  const { primary, card, mutedText } = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: card }]}>
      <Image
        source={{ uri: area.image }}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={{ color: mutedText }}>{area.title}</Text>
      <Text style={{ color: mutedText }}>{area.totalMealCount}</Text>
    </View>
  );
};

export default AreaCuisinesHomeCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});
